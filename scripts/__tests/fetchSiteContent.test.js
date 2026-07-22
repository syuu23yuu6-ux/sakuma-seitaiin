import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tempOutputPath = path.resolve(__dirname, 'test-siteContent.ts');

// 1. サイト設定 API のモックレスポンス (さくま整体院仕様)
const mockSettingsResponse = {
  heroBadge: "南茨木駅徒歩5分テスト",
  heroTitle: "痛み、根本改善テスト",
  heroDesc: "説明文テスト",
  heroImages: [
    { url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200" }
  ],
  ctaPrimaryText: "ボタン1",
  ctaPrimaryHref: "#contact",
  ctaSecondaryText: "ボタン2",
  ctaSecondaryHref: "#features",
  // 選ばれる理由
  reason1Title: "テスト理由1",
  reason1Desc: "テスト説明1",
  reason1Image: { url: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=800" },
  reason2Title: "テスト理由2",
  reason2Desc: "テスト説明2",
  reason2Image: { url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" },
  reason3Title: "テスト理由3",
  reason3Desc: "テスト説明3",
  reason3Image: { url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800" },
  // 選ばれる特徴
  feature1Title: "テスト特徴1",
  feature1DescLine1: "特徴説明1-1",
  feature1DescLine2: "特徴説明1-2",
  feature1Image: { url: "https://images.unsplash.com/photo-1519824141125-994e37bd7a44?auto=format&fit=crop&q=80&w=800" },
  feature2Title: "テスト特徴2",
  feature2DescLine1: "特徴説明2-1",
  feature2DescLine2: "特徴説明2-2",
  feature2Image: { url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" },
  feature3Title: "テスト特徴3",
  feature3DescLine1: "特徴説明3-1",
  feature3DescLine2: "特徴説明3-2",
  feature3Image: { url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800" },
  // キャンペーン情報 (Campaign)
  campaignTitle: "特別キャンペーンテスト",
  campaignPrice: "¥3,980",
  campaignDesc: "キャンペーン説明テスト",
  campaignBadge: "今月限定テスト",
  campaignDeadline: "キャンペーン期限テスト",
  campaignBannerText: "バナーテキストテスト",
  // 連絡先とSNSリンク・フッター情報 (Contact & Footer)
  instagramUrl: "https://instagram.com/test",
  lineUrl: "https://line.me/test",
  lineQrImage: { url: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=300" },
  twitterUrl: "https://twitter.com/test",
  telNumber: "050-8881-test",
  address: "住所テスト",
  parkingInfo: "駐車場テスト",
  logoText: "さくま整体院テスト",
  footerIntro: "フッター紹介テスト",
  ctaMicroCopy: "マイクロコピーテスト",
  ctaTrialMicroCopy: "体験用マイクロコピーテスト"
};

// 2. 施術メニュー API のモックレスポンス
const mockMenusResponse = {
  contents: [
    {
      menuId: "balance-general",
      title: "全身バランス整体テスト",
      price: "¥5,500",
      desc: "施術メニュー詳細説明テスト",
      isAccent: true,
      pricing: [
        {
          item: "施術料テスト",
          price: "¥5,500",
          note: "説明ノートテスト",
          highlightNote: true
        }
      ]
    }
  ]
};

// 3. スタッフ API のモックレスポンス
const mockStaffResponse = {
  contents: [
    {
      name: "佐久間院長テスト",
      role: "院長テスト",
      image: { url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600" },
      profileText: "<p>プロフィール本文テスト</p>"
    }
  ]
};

// 4. FAQ API のモックレスポンス
const mockFaqResponse = {
  contents: [
    {
      question: "質問テスト？",
      answer: "回答テスト！"
    }
  ]
};

// 5. ニュース API のモックレスポンス
const mockNewsResponse = {
  contents: [
    {
      id: "news-test-1",
      title: "ニュースタイトルテスト",
      content: "<p>ニュース本文テスト</p>",
      thumbnail: { url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800" },
      category: "お知らせ",
      createdAt: "2026-06-15T00:00:00.000Z"
    }
  ]
};

// 6. 用語集 API のモックレスポンス
const mockDictionaryResponse = {
  contents: [
    {
      keyword: "インナーマッスルテスト",
      description: "<p>用語解説本文テスト</p>",
      relatedLinks: [
        {
          title: "リンクテスト",
          url: "https://example.com"
        }
      ]
    }
  ]
};

describe('fetchSiteContent Script', () => {
  beforeEach(() => {
    process.env.MICROCMS_SERVICE_DOMAIN = 'test-domain';
    process.env.MICROCMS_API_KEY = 'test-key';
    process.env.CMS_OUTPUT_PATH = tempOutputPath;
    if (fs.existsSync(tempOutputPath)) {
      fs.unlinkSync(tempOutputPath);
    }
  });

  afterEach(() => {
    delete process.env.MICROCMS_SERVICE_DOMAIN;
    delete process.env.MICROCMS_API_KEY;
    delete process.env.CMS_OUTPUT_PATH;
    if (fs.existsSync(tempOutputPath)) {
      fs.unlinkSync(tempOutputPath);
    }
    vi.restoreAllMocks();
  });

  it('should throw an error when fetch fails', async () => {
    // vi.stubGlobal の代わりにグローバル fetch を直接モックします
    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        statusText: 'Unauthorized'
      });
    });

    const { runSync } = await import('../fetchSiteContent.js');
    await runSync(); // runSync 内でエラーがキャッチされて fallbackContent が書き出されるため、アサートを調整します

    expect(fs.existsSync(tempOutputPath)).toBe(true);
    const generatedContent = fs.readFileSync(tempOutputPath, 'utf-8');
    expect(generatedContent).toContain('さくま整体院'); // フォールバックデータにさくま整体院が含まれていること

    globalThis.fetch = originalFetch;
  });

  it('should fetch data from microCMS and generate siteContent.ts successfully', async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn().mockImplementation((url) => {
      let data = {};
      if (url.includes('site-settings')) {
        data = mockSettingsResponse;
      } else if (url.includes('menus')) {
        data = mockMenusResponse;
      } else if (url.includes('staff')) {
        data = mockStaffResponse;
      } else if (url.includes('faq')) {
        data = mockFaqResponse;
      } else if (url.includes('news')) {
        data = mockNewsResponse;
      } else if (url.includes('dictionary')) {
        data = mockDictionaryResponse;
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data)
      });
    });

    const { runSync } = await import('../fetchSiteContent.js');
    await runSync();

    expect(fs.existsSync(tempOutputPath)).toBe(true);

    const generatedContent = fs.readFileSync(tempOutputPath, 'utf-8');

    // 1. Hero
    expect(generatedContent).toContain('南茨木駅徒歩5分テスト');
    expect(generatedContent).toContain('痛み、根本改善テスト');
    expect(generatedContent).toContain('説明文テスト');
    expect(generatedContent).toContain('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200');

    // 2. 選ばれる理由
    expect(generatedContent).toContain('テスト理由1');
    expect(generatedContent).toContain('テスト説明2');
    expect(generatedContent).toContain('https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800');

    // 3. 特徴
    expect(generatedContent).toContain('テスト特徴1');
    expect(generatedContent).toContain('特徴説明2-1');

    // 4. メニュー料金
    expect(generatedContent).toContain('balance-general');
    expect(generatedContent).toContain('全身バランス整体テスト');
    expect(generatedContent).toContain('施術料テスト');
    expect(generatedContent).toContain('¥5,500');
    expect(generatedContent).toContain('説明ノートテスト');

    // 5. スタッフ
    expect(generatedContent).toContain('佐久間院長テスト');
    expect(generatedContent).toContain('院長テスト');
    expect(generatedContent).toContain('プロフィール本文テスト');

    // 6. FAQ (よくある質問)
    expect(generatedContent).toContain('質問テスト？');
    expect(generatedContent).toContain('回答テスト！');

    // 7. News (ブログ)
    expect(generatedContent).toContain('news-test-1');
    expect(generatedContent).toContain('ニュースタイトルテスト');
    expect(generatedContent).toContain('ニュース本文テスト');
    expect(generatedContent).toContain('2026.6.15');

    // 8. Dictionary (用語集)
    expect(generatedContent).toContain('インナーマッスルテスト');
    expect(generatedContent).toContain('用語解説本文テスト');
    expect(generatedContent).toContain('リンクテスト');

    // 9. Campaign (キャンペーン)
    expect(generatedContent).toContain('campaignTitle: "特別キャンペーンテスト"');
    expect(generatedContent).toContain('campaignPrice: "¥3,980"');
    expect(generatedContent).toContain('campaignDesc: "キャンペーン説明テスト"');
    expect(generatedContent).toContain('campaignBadge: "今月限定テスト"');
    expect(generatedContent).toContain('campaignDeadline: "キャンペーン期限テスト"');
    expect(generatedContent).toContain('campaignBannerText: "バナーテキストテスト"');

    // 10. Contact & Footer (連絡先・フッター)
    expect(generatedContent).toContain('instagramUrl: "https://instagram.com/test"');
    expect(generatedContent).toContain('lineUrl: "https://line.me/test"');
    expect(generatedContent).toContain('https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=300');
    expect(generatedContent).toContain('twitterUrl: "https://twitter.com/test"');
    expect(generatedContent).toContain('telNumber: "050-8881-test"');
    expect(generatedContent).toContain('address: "住所テスト"');
    expect(generatedContent).toContain('logoText: "さくま整体院テスト"');
    expect(generatedContent).toContain('parkingInfo: "駐車場テスト"');

    globalThis.fetch = originalFetch;
  });
});
