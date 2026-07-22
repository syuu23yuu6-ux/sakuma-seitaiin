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
      // ダイアログが開いていると想定（さきほどのクリックで開いたままのはず）
      // もし閉じていたらもう一度「変更する」ボタンをクリックする
      const browserScript = `
        (() => {
          // もしダイアログが開いていなければ開く
          const isDialogOpen = !!document.querySelector('h2._title_17k5k_47');
          if (!isDialogOpen) {
            const changeButton = Array.from(document.querySelectorAll('button'))
              .find(b => b.textContent && b.textContent.trim() === '変更する');
            if (changeButton) changeButton.click();
          }

          // すべての input 要素をリストアップ
          const inputs = Array.from(document.querySelectorAll('input'))
            .map(el => ({
              className: el.className,
              placeholder: el.placeholder,
              value: el.value,
              outerHTML: el.outerHTML.substring(0, 150),
              // ダイアログの中にあるかどうか
              inDialog: !!el.closest('[role="dialog"]') || !!el.closest('[id^="radix-"]')
            }));

          return inputs;
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
    console.log('Inputs on page:');
    console.log(JSON.stringify(result.result.result.value, null, 2));
  } catch (err) {
    console.error('Failed execution:', err);
    ws.close();
  }
}

run();
