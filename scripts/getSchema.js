import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const serviceId = 'en9nxdldc0';
  const apiKey = '3IFnM98Y9zf3aZGG6dIAGACrReaPuaJHi53e';
  const apiEndpoint = 'site-settings';

  const url = `https://${serviceId}.microcms-management.io/api/v1/apis/${apiEndpoint}`;

  const response = await fetch(url, {
    headers: {
      'X-MICROCMS-API-KEY': apiKey
    }
  });

  if (!response.ok) {
    console.error('Failed to fetch:', response.status, await response.text());
    return;
  }

  const data = await response.json();
  const outputPath = path.resolve(__dirname, '../schema_current.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Saved schema to ${outputPath}`);
}

run();

