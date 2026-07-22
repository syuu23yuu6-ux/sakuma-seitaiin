import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const expectedNamesPath = path.resolve(__dirname, 'expectedNames.json');
  const schemaPath = path.resolve(__dirname, '../schema_current.json');
  const manualPath = path.resolve(__dirname, '../CMS_MANUAL.md');

  if (!fs.existsSync(expectedNamesPath) || !fs.existsSync(schemaPath) || !fs.existsSync(manualPath)) {
    console.error('Required files (expectedNames.json, schema_current.json, CMS_MANUAL.md) not found.');
    return;
  }

  const expectedNames = JSON.parse(fs.readFileSync(expectedNamesPath, 'utf8'));
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const manualText = fs.readFileSync(manualPath, 'utf8');

  const schemaFields = schema.apiFields || [];
  const schemaFieldIds = schemaFields.map(f => f.fieldId);
  const expectedFieldIds = Object.keys(expectedNames);

  console.log('=== Consistency Check Result ===\n');

  // 1. スキーマ（本番） vs expectedNames（テスト定義）
  console.log('--- 1. Schema vs Expected Mapping ---');
  
  // スキーマにあって expectedNames にないもの（日本語化漏れ）
  const missingInExpected = schemaFieldIds.filter(id => !expectedFieldIds.includes(id));
  if (missingInExpected.length > 0) {
    console.warn('⚠️  以下のフィールドが本番スキーマに存在しますが、expectedNames.json に定義されていません（日本語化マッピング漏れ）:');
    missingInExpected.forEach(id => {
      const field = schemaFields.find(f => f.fieldId === id);
      console.warn(`  - ${id} (現在の表示名: "${field.name}")`);
    });
  } else {
    console.log('✅ すべての本番フィールドが expectedNames.json にマッピングされています。');
  }

  // expectedNames にあってスキーマにないもの（不要な古い定義）
  const missingInSchema = expectedFieldIds.filter(id => !schemaFieldIds.includes(id));
  if (missingInSchema.length > 0) {
    console.warn('\n⚠️  以下のフィールドが expectedNames.json に存在しますが、本番スキーマには存在しません（不要な定義、またはスペルミス）:');
    missingInSchema.forEach(id => {
      console.warn(`  - ${id} ("${expectedNames[id]}")`);
    });
  } else {
    console.log('✅ expectedNames.json にあるすべてのキーが本番スキーマに存在します。');
  }

  // 2. マニュアル (CMS_MANUAL.md) のチェック
  console.log('\n--- 2. Manual (CMS_MANUAL.md) Check ---');

  // マニュアルに登場する `fieldId` を抽出 (バッククォートで囲まれた英数字)
  // 例: `heroImages` 
  const manualFieldIds = [];
  const regex = /`([a-zA-Z0-9_]+)`/g;
  let match;
  while ((match = regex.exec(manualText)) !== null) {
    const id = match[1];
    // site-settingsのフィールドIDとして有効そうなものを判定
    // (一般的に小文字で始まり、技術セクション以外の箇所に登場するもの)
    if (schemaFieldIds.includes(id) && !manualFieldIds.includes(id)) {
      manualFieldIds.push(id);
    }
  }

  // 本番スキーマにあって、マニュアルに書かれていないもの（マニュアル漏れ）
  const missingInManual = schemaFieldIds.filter(id => !manualFieldIds.includes(id));
  if (missingInManual.length > 0) {
    console.warn('⚠️  以下のフィールドが本番スキーマに存在しますが、マニュアルに記載されていません（マニュアル漏れ）:');
    missingInManual.forEach(id => {
      const field = schemaFields.find(f => f.fieldId === id);
      console.warn(`  - ${id} ("${field.name}")`);
    });
  } else {
    console.log('✅ すべての本番フィールドがマニュアルに記載されています。');
  }

  // 重複チェック (expectedNames の値などの重複)
  console.log('\n--- 3. Value Duplicate Check ---');
  const values = Object.values(expectedNames);
  const duplicates = values.filter((val, index) => values.indexOf(val) !== index);
  if (duplicates.length > 0) {
    console.warn('⚠️  以下の日本語表示名が expectedNames.json 内で重複して定義されています（表示名かぶりの可能性）:');
    const uniqueDuplicates = [...new Set(duplicates)];
    uniqueDuplicates.forEach(val => {
      const keys = Object.keys(expectedNames).filter(k => expectedNames[k] === val);
      console.warn(`  - "${val}" (重複キー: ${keys.join(', ')})`);
    });
  } else {
    console.log('✅ 日本語表示名の重複はありません。');
  }

  console.log('\n================================');
}

run();
