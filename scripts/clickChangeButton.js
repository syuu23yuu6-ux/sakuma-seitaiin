import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const targetUrlPrefix = 'https://en9nxdldc0.microcms.io/apis/site-settings/settings/model';

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
  } catch (err) {
    console.error('Failed to fetch targets:', err);
    return;
  }

  const ws = new WebSocket(webSocketUrl);

  const executePromise = new Promise((resolve, reject) => {
    ws.onopen = () => {
      // ブラウザで「変更する」をクリックして、モーダルが表示されるのを待って要素を探す
      const browserScript = `
        (async () => {
          // 最初の「変更する」ボタンを見つける
          const buttons = Array.from(document.querySelectorAll('button'));
          const changeButton = buttons.find(b => b.textContent && b.textContent.trim() === '変更する');
          if (!changeButton) {
            return { success: false, message: '「変更する」ボタンが見つかりませんでした。' };
          }

          // クリックする
          changeButton.click();

          // 500ms待つ
          await new Promise(r => setTimeout(r, 500));

          // 現在表示されているダイアログやその中のボタンを確認する
          const dialogElements = Array.from(document.querySelectorAll('*'))
            .filter(el => {
              const text = el.textContent || '';
              const isVisible = el.offsetWidth > 0 && el.offsetHeight > 0;
              return isVisible && text.length < 200 && (
                text.includes('変更') || 
                text.includes('更新') || 
                text.includes('OK') || 
                text.includes('送信') ||
                text.includes('キャンセル')
              );
            })
            .map(el => ({
              tagName: el.tagName,
              className: el.className,
              textContent: el.textContent.trim(),
              outerHTML: el.outerHTML.substring(0, 150)
            }));

          return {
            success: true,
            message: '「変更する」をクリックしました。500ms後の要素をリストします。',
            elements: dialogElements
          };
        })();
      `;

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
      const response = JSON.parse(event.data);
      if (response.id === 1) {
        resolve(response);
      }
    };

    ws.onerror = (err) => {
      reject(err);
    };
  });

  try {
    const result = await executePromise;
    ws.close();
    const outputPath = path.resolve(__dirname, 'modal_elements.json');
    fs.writeFileSync(outputPath, JSON.stringify(result.result.result.value, null, 2), 'utf8');
    console.log(`Saved modal elements to ${outputPath}`);
  } catch (err) {
    console.error('Failed execution:', err);
    ws.close();
  }
}

run();
