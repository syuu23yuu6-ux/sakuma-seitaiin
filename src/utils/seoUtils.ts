// seoUtils.ts - SEOメタタグ更新およびJSON-LD構造化データの動的制御ユーティリティ

export interface SEOMetadata {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
}

const DEFAULT_SITE_TITLE = 'さくま整体院 | 茨木市で体内から健康を整える根本改善整体';
const DEFAULT_SITE_DESC = '大阪府茨木市のさくま整体院。インナーマッスルを徹底的に緩めることで、慢性的な肩こり・腰痛・頭痛などを短期間で根本改善します。南茨木駅近く、無料駐車場あり。';
const DEFAULT_OG_IMAGE = 'https://sakuma-seitaiin.jp/_img/ja/cms/44736/image/___//';

/**
 * ページの Head メタタグ (Title, Description, Canonical, OGP, Twitter Card) を動的に一括更新する
 */
export function updateHeadMetadata(metadata: SEOMetadata): void {
  const title = metadata.title || DEFAULT_SITE_TITLE;
  const description = metadata.description || DEFAULT_SITE_DESC;
  const canonical = metadata.canonicalUrl || (window.location.origin + window.location.pathname);
  const ogImage = metadata.ogImage || DEFAULT_OG_IMAGE;
  const ogType = metadata.ogType || 'website';

  // 1. Document Title
  document.title = title;

  // 2. Meta Description
  let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = description;

  // 3. Canonical Link
  let linkCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.rel = 'canonical';
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.href = canonical;

  // 4. OGP Tags
  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:url', canonical);
  setMetaTag('property', 'og:image', ogImage);
  setMetaTag('property', 'og:type', ogType);

  // 5. Twitter Card Tags
  setMetaTag('name', 'twitter:title', title);
  setMetaTag('name', 'twitter:description', description);
  setMetaTag('name', 'twitter:image', ogImage);

  // 6. GEO Regional / MEO Meta Tags (Google / Yahoo / Apple Maps 全対応)
  setGeoMetaTags();
}

/**
 * MEO・ローカルSEO用 GEO地域メタタグを設置する
 */
export function setGeoMetaTags(): void {
  setMetaTag('name', 'geo.position', '34.802111;135.578643');
  setMetaTag('name', 'geo.region', 'JP-27');
  setMetaTag('name', 'geo.placename', '大阪府茨木市天王2-9-12');
  setMetaTag('name', 'ICBM', '34.802111, 135.578643');
}

function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string): void {
  let element = document.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.content = content;
}

/**
 * JSON-LD 構造化データを動的に head 内へ追加/更新する
 */
export function insertJsonLd(id: string, schemaData: object): void {
  removeJsonLd(id);

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(schemaData);
  document.head.appendChild(script);
}

/**
 * 指定した ID の JSON-LD 構造化データを削除する
 */
export function removeJsonLd(id: string): void {
  const existing = document.getElementById(id);
  if (existing) {
    existing.remove();
  }
}
