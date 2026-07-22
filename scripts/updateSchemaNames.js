import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const serviceId = 'en9nxdldc0';
  const apiKey = '3IFnM98Y9zf3aZGG6dIAGACrReaPuaJHi53e';
  const apiEndpoint = 'site-settings';

  const expectedNamesPath = path.resolve(__dirname, 'expectedNames.json');
  const schemaPath = path.resolve(__dirname, '../schema_current.json');

  if (!fs.existsSync(expectedNamesPath)) {
    console.error('expectedNames.json not found');
    return;
  }
  if (!fs.existsSync(schemaPath)) {
    console.error('schema_current.json not found. Run node scripts/getSchema.js first.');
    return;
  }

  const expectedNames = JSON.parse(fs.readFileSync(expectedNamesPath, 'utf8'));
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

  if (!schema.apiFields) {
    console.error('Invalid schema: apiFields not found');
    return;
  }

  let updateCount = 0;
  // apiFields 内のフィールド名を更新
  schema.apiFields = schema.apiFields.map(field => {
    if (expectedNames[field.fieldId] !== undefined) {
      if (field.name !== expectedNames[field.fieldId]) {
        console.log(`Updating fieldId "${field.fieldId}": "${field.name}" -> "${expectedNames[field.fieldId]}"`);
        field.name = expectedNames[field.fieldId];
        updateCount++;
      }
    }
    return field;
  });

  if (updateCount === 0) {
    console.log('No fields need to be updated. Schema matches expectedNames.');
    return;
  }

  console.log(`Total fields to update: ${updateCount}`);
  console.log('Sending PUT request to microCMS Management API to update schema...');

  const url = `https://${serviceId}.microcms-management.io/api/v1/apis/${apiEndpoint}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'X-MICROCMS-API-KEY': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      apiFields: schema.apiFields,
      customFields: schema.customFields
    })
  });

  if (response.ok) {
    console.log('Successfully updated schema on microCMS!');
    // ローカルの schema_current.json も更新版で上書き
    fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2), 'utf8');
    console.log(`Saved updated schema to ${schemaPath}`);
  } else {
    console.error('Failed to update schema:', response.status, await response.text());
  }
}

run();
