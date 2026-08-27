import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { siteContent } from '../src/config/siteContent.ts';
import { lpContent } from '../src/config/lpContent.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateSitemapXML(content = siteContent, lps = lpContent) {
  const domain = 'https://sakuma-seitaiin.jp';
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/menu', priority: '0.8', changefreq: 'monthly' },
    { url: '/staff', priority: '0.6', changefreq: 'monthly' },
    { url: '/faq', priority: '0.5', changefreq: 'monthly' },
    { url: '/access', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/privacy_policy', priority: '0.3', changefreq: 'yearly' },
    { url: '/new_page', priority: '0.8', changefreq: 'weekly' },
    { url: '/dictionary', priority: '0.7', changefreq: 'monthly' }
  ];

  // 症状別LP
  const lpPages = Object.keys(lps).map(id => ({
    url: `/lp/${id}`,
    priority: '0.9',
    changefreq: 'monthly'
  }));

  // ブログ記事詳細
  const newsPages = (content.news || []).map(article => ({
    url: `/new_page/${article.id}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: article.dateValue || today
  }));

  // 用語集詳細
  const dictionaryPages = (content.dictionary || []).map(dict => ({
    url: `/dictionary/${encodeURIComponent(dict.keyword)}`,
    priority: '0.6',
    changefreq: 'monthly'
  }));

  const allUrls = [...staticPages, ...lpPages, ...newsPages, ...dictionaryPages];

  const xmlUrls = allUrls.map(item => `  <url>
    <loc>${domain}${item.url}</loc>
    <lastmod>${item.lastmod || today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
}

export function writeSitemap() {
  const xml = generateSitemapXML();
  const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`Successfully generated sitemap.xml at ${outputPath}`);
}

if (process.argv[1] && process.argv[1].endsWith('generateSitemap.js')) {
  writeSitemap();
}
