// analytics.ts - GA4 (Google Analytics) 及び Search Console 連携ユーティリティ

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-E06Z7T6B4S';

/**
 * GA4 (Google Analytics 4) gtag.js スクリプトを初期化する
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return;

  // すでに gtag が存在する場合は重複ロードしない
  if (document.getElementById('ga4-script')) return;

  const script = document.createElement('script');
  script.id = 'ga4-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
}

/**
 * SPAのルート切り替え時にページビュー (PV) を手動送信する
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href
    });
  }
}

/**
 * Google Search Console 所有権確認メタタグを挿入する
 */
export function setGoogleSiteVerification(token?: string): void {
  const verificationToken = token || import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
  if (!verificationToken) return;

  let meta = document.querySelector<HTMLMetaElement>('meta[name="google-site-verification"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'google-site-verification';
    document.head.appendChild(meta);
  }
  meta.content = verificationToken;
}
