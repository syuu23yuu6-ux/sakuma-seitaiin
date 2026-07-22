async function run() {
  const serviceId = 'en9nxdldc0';
  const apiKey = '3IFnM98Y9zf3aZGG6dIAGACrReaPuaJHi53e';
  const apiEndpoint = 'site-settings';

  const url = `https://${serviceId}.microcms-management.io/api/v1/apis/${apiEndpoint}`;

  // 既存のスキーマを取得
  const getResponse = await fetch(url, {
    headers: { 'X-MICROCMS-API-KEY': apiKey }
  });

  if (!getResponse.ok) {
    console.error('Failed to GET schema:', getResponse.status, await getResponse.text());
    return;
  }

  const schema = await getResponse.json();

  // テスト用のフィールド「qualificationRate」(数字)を追加
  // すでにあれば追加しない
  const exists = schema.apiFields.some(f => f.fieldId === 'qualificationRate');
  if (!exists) {
    schema.apiFields.push({
      fieldId: 'qualificationRate',
      name: '資格合格率(数値)テスト',
      kind: 'number',
      required: false
    });
  }

  console.log('Sending PUT to update schema...');
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
