async function run() {
  try {
    const response = await fetch('http://127.0.0.1:9222/json');
    const targets = await response.json();
    console.log('Targets found:', targets.length);
    for (const t of targets) {
      console.log(`- Title: "${t.title}", URL: "${t.url}", WebSocket: "${t.webSocketDebuggerUrl}"`);
    }
  } catch (err) {
    console.error('Error fetching targets:', err);
  }
}

run();
