import { describe, it, expect, beforeEach } from 'vitest';
import { updateHeadMetadata, insertJsonLd, removeJsonLd } from '../seoUtils';

describe('seoUtils', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    document.title = '';
  });

  describe('updateHeadMetadata', () => {
    it('should set default metadata when empty object is passed', () => {
      updateHeadMetadata({});

      expect(document.title).toContain('さくま整体院');

      const metaDesc = document.querySelector('meta[name="description"]');
      expect(metaDesc?.getAttribute('content')).toContain('大阪府茨木市');

      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical?.getAttribute('href')).toBeDefined();

      const ogTitle = document.querySelector('meta[property="og:title"]');
      expect(ogTitle?.getAttribute('content')).toContain('さくま整体院');
    });

    it('should set custom title, description, and canonical URL', () => {
      updateHeadMetadata({
        title: 'カスタムタイトル | テスト',
        description: 'カスタム説明文です。',
        canonicalUrl: 'https://sakuma-seitaiin.jp/test-path',
        ogImage: 'https://example.com/test.jpg',
        ogType: 'article'
      });

      expect(document.title).toBe('カスタムタイトル | テスト');

      const metaDesc = document.querySelector('meta[name="description"]');
      expect(metaDesc?.getAttribute('content')).toBe('カスタム説明文です。');

      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical?.getAttribute('href')).toBe('https://sakuma-seitaiin.jp/test-path');

      const ogType = document.querySelector('meta[property="og:type"]');
      expect(ogType?.getAttribute('content')).toBe('article');
    });
  });

  describe('insertJsonLd & removeJsonLd', () => {
    it('should insert and remove script tag with id', () => {
      const testSchema = { '@context': 'https://schema.org', '@type': 'Thing', name: 'Test' };
      insertJsonLd('test-jsonld', testSchema);

      const script = document.getElementById('test-jsonld');
      expect(script).not.toBeNull();
      expect(script?.getAttribute('type')).toBe('application/ld+json');
      expect(script?.innerHTML).toContain('Test');

      removeJsonLd('test-jsonld');
      expect(document.getElementById('test-jsonld')).toBeNull();
    });
  });
});
