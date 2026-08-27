import { describe, it, expect } from 'vitest';
import { generateSitemapXML } from '../generateSitemap.js';

describe('generateSitemap.js', () => {
  it('should generate valid sitemap XML including static and dynamic pages', () => {
    const xml = generateSitemapXML();
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<loc>https://sakuma-seitaiin.jp/</loc>');
    expect(xml).toContain('<loc>https://sakuma-seitaiin.jp/lp/lp1</loc>');
    expect(xml).toContain('<loc>https://sakuma-seitaiin.jp/new_page</loc>');
    expect(xml).toContain('<loc>https://sakuma-seitaiin.jp/dictionary</loc>');
  });
});
