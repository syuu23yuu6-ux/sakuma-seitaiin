import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initAnalytics, trackPageView, setGoogleSiteVerification } from '../analytics';

describe('analytics.ts', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    delete window.gtag;
    delete (window as any).dataLayer;
  });

  it('should initialize GA4 script tag and window.gtag', () => {
    initAnalytics();

    const script = document.getElementById('ga4-script');
    expect(script).not.toBeNull();
    expect(window.dataLayer).toBeDefined();
    expect(typeof window.gtag).toBe('function');
  });

  it('should track page view with path and title', () => {
    initAnalytics();
    const spy = vi.spyOn(window, 'gtag');

    trackPageView('/menu', '施術メニュー・料金 | さくま整体院');

    expect(spy).toHaveBeenCalledWith('event', 'page_view', expect.objectContaining({
      page_path: '/menu',
      page_title: '施術メニュー・料金 | さくま整体院'
    }));
  });

  it('should set google-site-verification meta tag', () => {
    setGoogleSiteVerification('test-verification-token-123');

    const meta = document.querySelector('meta[name="google-site-verification"]');
    expect(meta).not.toBeNull();
    expect(meta?.getAttribute('content')).toBe('test-verification-token-123');
  });
});
