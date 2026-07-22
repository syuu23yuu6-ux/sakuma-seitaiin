import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CampaignBanner } from './components/CampaignBanner';
import { SymptomIcons } from './components/SymptomIcons';
import { BrandFeatures } from './components/BrandFeatures';
import { Courses } from './components/Courses';
import { CourseDetails } from './components/CourseDetails';
import { CampaignSection } from './components/CampaignSection';
import { AccessTabs } from './components/AccessTabs';
import { FAQ } from './components/FAQ';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { StickyCTA } from './components/StickyCTA';
import { SelectionReasons } from './components/SelectionReasons';
import { FloatingLPCTA } from './components/FloatingLPCTA';
import { ScrollToTop } from './components/ScrollToTop';

// 新規 SPA ページコンポーネント
import { NewsList } from './components/NewsList';
import { NewsDetail } from './components/NewsDetail';
import { DictionaryList } from './components/DictionaryList';
import { DictionaryDetail } from './components/DictionaryDetail';
import { StaffPage } from './components/StaffPage';
import { LPPage } from './components/LPPage';
import { PrivacyPage } from './components/PrivacyPage';

function App() {
  const [path, setPath] = useState(window.location.pathname);

  // SPA ルーティングの監視
  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Google 構造化データ (JSON-LD) の動的適用
  useEffect(() => {
    const existingScript = document.getElementById('local-business-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'local-business-jsonld';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "さくま整体院",
      "alternateName": "さくませいたいいん",
      "image": "https://sakuma-seitaiin.jp/_img/ja/cms/44736/image/___//",
      "@id": "https://sakuma-seitaiin.jp/#website",
      "url": "https://sakuma-seitaiin.jp",
      "telephone": "050-8881-4880",
      "priceRange": "¥3000-¥5000",
      "address": {
        "@type": "PostalAddress",
        "postalCode": "567-0876",
        "addressRegion": "大阪府",
        "addressLocality": "茨木市",
        "streetAddress": "天王2-9-12 スミエール21 1階"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 34.802111,
        "longitude": 135.578643
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "09:00",
          "closes": "20:00"
        }
      ],
      "sameAs": [
        "https://s.ekiten.jp/shop_55884485"
      ]
    });
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('local-business-jsonld');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  const renderPage = () => {
    // 末尾のスラッシュを取り除いて統一的に判定する
    const cleanPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;

    // 症状別LP (/lp/:id)
    if (cleanPath.startsWith('/lp/')) {
      const id = cleanPath.substring('/lp/'.length);
      return <LPPage lpId={id} />;
    }

    // 旧サイト sakuma_seitaiin1 / sakuma_seitaiin2 互換ルーティング (ローマ字・ID)
    if (cleanPath.startsWith('/sakuma_seitaiin1/') || cleanPath.startsWith('/sakuma_seitaiin2/')) {
      const prefix = cleanPath.startsWith('/sakuma_seitaiin1/') ? '/sakuma_seitaiin1/' : '/sakuma_seitaiin2/';
      const subPath = cleanPath.substring(prefix.length);
      
      if (subPath.startsWith('lp')) {
        return <LPPage lpId={subPath} />;
      }
      
      const romanMapping: Record<string, string> = {
        katakori: 'lp1',
        yotsu: 'lp2',
        hizatsu: 'lp3',
        zakotsushinkeitsu: 'lp4',
        shibire: 'lp5',
        shijuka: 'lp6',
        gojuka: 'lp6',
        zutsu: 'lp7',
        zutsutsu: 'lp7',
        straightneck: 'lp8',
        shisei: 'lp9',
        kotsubankyosei: 'lp10',
        kotsuban: 'lp10'
      };
      
      const mappedId = romanMapping[subPath];
      if (mappedId) {
        return <LPPage lpId={mappedId} />;
      }

      // 該当しない旧パスはトップページへフォールバック (SEO最適化)
      return (
        <>
          <Hero />
          <CampaignBanner />
          <SymptomIcons />
          <SelectionReasons />
          <BrandFeatures />
          <Courses />
          <CampaignSection />
          <FAQ />
          <AccessTabs />
          <ContactForm />
        </>
      );
    }

    // ブログ詳細 (/new_page/:id)
    if (cleanPath.startsWith('/new_page/')) {
      const id = cleanPath.substring('/new_page/'.length);
      return <NewsDetail articleId={id} />;
    }

    // 用語集詳細 (/dictionary/:keyword)
    if (cleanPath.startsWith('/dictionary/')) {
      const rawKeyword = cleanPath.substring('/dictionary/'.length);
      const keyword = decodeURIComponent(rawKeyword);
      return <DictionaryDetail keyword={keyword} />;
    }

    switch (cleanPath) {
      case '/':
        return (
          <>
            <Hero />
            <CampaignBanner />
            <SymptomIcons />
            <SelectionReasons />
            <BrandFeatures />
            <Courses />
            <CampaignSection />
            <FAQ />
            <AccessTabs />
            <ContactForm />
          </>
        );
      case '/menu':
        return (
          <div className="pt-20">
            <Courses />
            <CourseDetails />
          </div>
        );
      case '/staff':
        return <StaffPage />;
      case '/faq':
        return (
          <div className="pt-20">
            <FAQ />
          </div>
        );
      case '/access':
        return (
          <div className="pt-20">
            <AccessTabs />
          </div>
        );
      case '/contact':
        return (
          <div className="pt-20">
            <ContactForm />
          </div>
        );
      case '/new_page':
        return <NewsList />;
      case '/dictionary':
        return <DictionaryList />;
      case '/privacy_policy':
        return <PrivacyPage />;
      default:
        return (
          <div className="py-40 text-center min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-dark mb-4">404 - ページが見つかりません</h2>
            <p className="text-gray-500 text-sm mb-8 font-light">お探しのページは一時的にアクセスできないか、移動した可能性があります。</p>
            <a href="/" onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow hover:bg-primary/95 transition-all text-sm">
              ホームに戻る
            </a>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      <Header />
      <main>
        {renderPage()}
      </main>
      <Footer />
      <FloatingLPCTA />
      <StickyCTA />
      <ScrollToTop />
    </div>
  );
}

export default App;
