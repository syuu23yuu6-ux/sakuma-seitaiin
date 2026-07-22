import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 期待する表示名マッピングを読み込む
const expectedNamesPath = path.resolve(__dirname, '../expectedNames.json');
const expectedNames = JSON.parse(fs.readFileSync(expectedNamesPath, 'utf8'));


describe('microCMS Schema Field Names', () => {
  it('should have all site-settings fields mapped to clear Japanese display names', () => {
    const schemaPath = path.resolve(__dirname, '../../schema_current.json');
    if (!fs.existsSync(schemaPath)) {
      throw new Error('schema_current.json not found');
    }

    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    let fields = [];
    if (schema.apiFields) {
      fields = schema.apiFields;
    } else if (Array.isArray(schema)) {
      fields = schema;
    }

    // 期待するフィールドが正しい日本語名になっているかをチェック
    Object.keys(expectedNames).forEach(fieldId => {
      const field = fields.find(f => f.fieldId === fieldId);
      if (!field) {
        console.warn(`Field not found in schema: ${fieldId}`);
      }
      expect(field).toBeDefined();
      expect(field.name).toBe(expectedNames[fieldId]);
    });
  });
});
