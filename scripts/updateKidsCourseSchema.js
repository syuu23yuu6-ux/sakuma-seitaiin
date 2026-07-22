import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const serviceId = 'en9nxdldc0';
  const apiKey = '3IFnM98Y9zf3aZGG6dIAGACrReaPuaJHi53e';
  const apiEndpoint = 'site-settings';

  const schemaPath = path.resolve(__dirname, '../schema_current.json');
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

  // kidsCourseカスタムフィールドを探す
  const kidsCourseCf = schema.customFields.find(cf => cf.fieldId === 'kidsCourse');
  if (!kidsCourseCf) {
    console.error('kidsCourse custom field not found in schema');
    return;
  }

  // すでに存在するかチェック
  const hasDesc = kidsCourseCf.fields.some(f => f.fieldId === 'desc');
  const hasImage = kidsCourseCf.fields.some(f => f.fieldId === 'image');

  const descIdValue = 'kidsCourseDesc';
  const imageIdValue = 'kidsCourseImage';

  if (!hasDesc) {
    kidsCourseCf.fields.push({
      idValue: descIdValue,
      fieldId: 'desc',
      name: 'Description',
      kind: 'textArea',
      required: false
    });
  }

  if (!hasImage) {
    kidsCourseCf.fields.push({
      idValue: imageIdValue,
      fieldId: 'image',
      name: 'Image',
      kind: 'media',
      required: false
    });
  }

  // position配列を更新
  // position[0] に新しく追加したidValueが含まれているか確認
  if (kidsCourseCf.position && kidsCourseCf.position[0]) {
    const row = kidsCourseCf.position[0];
    if (!row.includes(descIdValue) && !hasDesc) {
      row.push(descIdValue);
    }
    if (!row.includes(imageIdValue) && !hasImage) {
      row.push(imageIdValue);
    }
  }

  const url = `https://${serviceId}.microcms-management.io/api/v1/apis/${apiEndpoint}`;

  console.log('Sending PUT to update schema with modified customFields...');
  const putResponse = await fetch(url, {
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

  console.log('PUT Response Status:', putResponse.status);
  const responseText = await putResponse.text();
  console.log('PUT Response Body:', responseText);
}

run();
