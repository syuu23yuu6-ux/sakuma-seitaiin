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

  // 2. デバッグ対象のタブを見つける
  let webSocketUrl = null;
  try {
    const response = await fetch('http://127.0.0.1:9222/json');
    const targets = await response.json();
    const target = targets.find(t => t.url && t.url.startsWith(targetUrlPrefix));
    if (!target) {
      console.error(`Target tab starting with "${targetUrlPrefix}" not found.`);
      return;
    }
    webSocketUrl = target.webSocketDebuggerUrl;
    console.log(`Found target page: "${target.title}"`);
    console.log(`Connecting to WebSocket: ${webSocketUrl}`);
  } catch (err) {
    console.error('Failed to fetch targets:', err);
    return;
  }

  // 3. ブラウザで実行する JavaScript を作成
  // Reactの状態を更新しつつ、表示名を日本語に変更し、最後に「更新する」ボタンをクリックする
  const browserScript = `
    (() => {
      const expectedNames = ${JSON.stringify(expectedNames)};
      const inputs = Array.from(document.querySelectorAll('input._input_1oba5_1'));
      if (inputs.length === 0) {
        return { success: false, message: '入力要素（input._input_1oba5_1）が見つかりませんでした。クラス名が変わっている可能性があります。' };
      }

      const setReactInputValue = (input, value) => {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        ).set;
        nativeInputValueSetter.call(input, value);
        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
      };

      let updatedCount = 0;
      let skippedCount = 0;
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
            } else {
              skippedCount++;
            }
          }
        }
      }

      // 最後に「更新する」ボタンをクリックする
      let clickedUpdate = false;
      if (updatedCount > 0) {
        const buttons = Array.from(document.querySelectorAll('button'));
        const updateButton = buttons.find(b => b.textContent && b.textContent.includes('更新する'));
        if (updateButton) {
          updateButton.click();
          clickedUpdate = true;
        }
      }

      return {
        success: true,
        updatedCount,
        skippedCount,
        clickedUpdate,
        message: \`Updated \${updatedCount} fields, skipped \${skippedCount} fields. Clicked update button: \${clickedUpdate}\`
      };
    })();
  `;

  // 4. WebSocket を使ってコマンドを送信
  const ws = new WebSocket(webSocketUrl);

  const executePromise = new Promise((resolve, reject) => {
    ws.onopen = () => {
      console.log('WebSocket connection opened. Sending evaluation request...');
      const message = {
        id: 1,
        method: 'Runtime.evaluate',
        params: {
          expression: browserScript,
          awaitPromise: true,
          returnByValue: true
        }
      };
      ws.send(JSON.stringify(message));
    };

    ws.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        if (response.id === 1) {
          resolve(response);
        }
      } catch (err) {
        reject(err);
      }
    };

    ws.onerror = (err) => {
      reject(err);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };
  });

  try {
    const result = await executePromise;
    ws.close();

    if (result.error) {
      console.error('CDP Error:', result.error);
    } else {
      const evaluationResult = result.result.result;
      if (evaluationResult.type === 'object' && evaluationResult.value) {
        console.log('Execution Result:', evaluationResult.value);
      } else {
        console.log('Raw Result:', evaluationResult);
      }
    }
  } catch (err) {
    console.error('Execution failed:', err);
    ws.close();
  }
}

run();
