import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const targetUrlPrefix = 'https://en9nxdldc0.microcms.io/apis/site-settings/settings/model';

  // 1. expectedNames.json の読み込み
  const expectedNamesPath = path.resolve(__dirname, 'expectedNames.json');
  if (!fs.existsSync(expectedNamesPath)) {
    console.error('expectedNames.json not found');
    return;
  }
  const expectedNames = JSON.parse(fs.readFileSync(expectedNamesPath, 'utf8'));

  // 2. デバッグ対象のタブを見つける (microcms.io ドメインのタブを探す)
  let webSocketUrl = null;
  try {
    const response = await fetch('http://127.0.0.1:9222/json');
    const targets = await response.json();
    const target = targets.find(t => t.url && t.url.includes('microcms.io'));
    if (!target) {
      console.error('microcms.io tab not found.');
      return;
    }
    webSocketUrl = target.webSocketDebuggerUrl;
    console.log(`Found microCMS tab: "${target.title}" (URL: ${target.url})`);
  } catch (err) {
    console.error('Failed to fetch targets:', err);
    return;
  }


  const ws = new WebSocket(webSocketUrl);

  // 3. リロードと一括更新の実行
  const execute = () => {
    return new Promise((resolve, reject) => {
      let step = 0;

      ws.onopen = () => {
        console.log(`Connected. Navigating to schema settings page: ${targetUrlPrefix}`);
        // ページを目的のURLに遷移させる
        ws.send(JSON.stringify({
          id: 10,
          method: 'Page.navigate',
          params: { url: targetUrlPrefix }
        }));
        
        // 4秒待ってから入力と保存を実行する
        setTimeout(async () => {
          console.log('Navigation complete. Sending schema update script...');

          
          const browserScript = `
            (async () => {
              const expectedNames = ${JSON.stringify(expectedNames)};
              
              const setReactInputValue = (input, value) => {
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                  window.HTMLInputElement.prototype,
                  'value'
                ).set;
                nativeInputValueSetter.call(input, value);
                const event = new Event('input', { bubbles: true });
                input.dispatchEvent(event);
              };

              // 入力フィールドを取得
              const inputs = Array.from(document.querySelectorAll('input._input_1oba5_1'));
              if (inputs.length === 0) {
                return { success: false, message: '入力要素が見つかりませんでした。リロードが完了していないか、DOMが未完成です。' };
              }

              // 表示名を更新
              let updatedCount = 0;
              for (let i = 0; i < inputs.length - 1; i += 2) {
                const apiIdInput = inputs[i];
                const nameInput = inputs[i+1];
                
                if (apiIdInput && nameInput) {
                  const apiId = apiIdInput.value.trim();
                  const expectedName = expectedNames[apiId];
                  
                  if (expectedName !== undefined) {
                    if (nameInput.value !== expectedName) {
                      setReactInputValue(nameInput, expectedName);
                      updatedCount++;
                    }
                  }
                }
              }

              console.log(\`DOM上で \${updatedCount} 個の表示名を更新しました。\`);

              // 警告バーの「変更する」ボタンを取得
              const primaryChangeButton = Array.from(document.querySelectorAll('button'))
                .find(b => b.textContent && b.textContent.trim() === '変更する' && b.className.includes('ga-api-settings-schema'));
              
              if (!primaryChangeButton) {
                return { success: false, message: '「変更する」保存ボタンが見つかりませんでした。表示名に変更がない可能性があります。' };
              }

              primaryChangeButton.click();
              console.log('「変更する」をクリックしました。ダイアログの表示を待ちます...');
              
              // ダイアログのアニメーションを考慮して1秒待つ
              await new Promise(r => setTimeout(r, 1000));

              // 確認フォームを探す
              const confirmationInput = document.querySelector('input[placeholder="site-settings"]');
              if (!confirmationInput) {
                return { success: false, message: '確認用入力欄（placeholder="site-settings"）が見つかりませんでした。' };
              }

              // 「site-settings」を入力
              setReactInputValue(confirmationInput, 'site-settings');
              console.log('確認フォームに入力しました。');

              // 確定用「変更する」ボタンを取得
              const dangerConfirmButton = Array.from(document.querySelectorAll('button'))
                .find(b => b.textContent && b.textContent.trim() === '変更する' && b.className.includes('_danger_'));

              if (!dangerConfirmButton) {
                return { success: false, message: 'ダイアログ内の確定用「変更する」ボタンが見つかりませんでした。' };
              }

              dangerConfirmButton.click();
              console.log('確定用ボタンをクリックしました。');

              return {
                success: true,
                message: \`Successfully reloaded, updated \${updatedCount} fields, and saved changes.\`
              };
            })();
          `;

          ws.send(JSON.stringify({
            id: 20,
            method: 'Runtime.evaluate',
            params: {
              expression: browserScript,
              awaitPromise: true,
              returnByValue: true
            }
          }));
        }, 3000);
      };

      ws.onmessage = (event) => {
        const response = JSON.parse(event.data);
        if (response.id === 20) {
          resolve(response);
        }
      };

      ws.onerror = (err) => {
        reject(err);
      };
    });
  };

  try {
    const result = await execute();
    ws.close();
    
    if (result.error) {
      console.error('Execution error:', result.error);
    } else {
      console.log('Result:', result.result.result.value);
    }
  } catch (err) {
    console.error('Communication failed:', err);
    ws.close();
  }
}

run();
