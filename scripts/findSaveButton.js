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
      const browserScript = `
        (() => {
          const elements = Array.from(document.querySelectorAll('*'))
            .filter(el => {
              const text = el.textContent || '';
              const isVisible = el.offsetWidth > 0 && el.offsetHeight > 0;
              return isVisible && text.length < 200 && (text.includes('更新') || text.includes('保存') || text.includes('変更'));
            })
            .map(el => ({
              tagName: el.tagName,
              className: el.className,
              textContent: el.textContent.trim(),
              id: el.id,
              outerHTML: el.outerHTML.substring(0, 150)
            }));
          return elements;
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
    const outputPath = path.resolve(__dirname, 'button_elements.json');
    fs.writeFileSync(outputPath, JSON.stringify(result.result.result.value, null, 2), 'utf8');
    console.log(`Saved output to ${outputPath}`);
  } catch (err) {
    console.error('Failed to find button:', err);
    ws.close();
  }
}

run();

