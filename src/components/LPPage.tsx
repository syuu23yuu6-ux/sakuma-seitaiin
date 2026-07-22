import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { lpContent } from '../config/lpContent';
import { FAQ } from './FAQ';
import { AccessTabs } from './AccessTabs';
import { ContactForm } from './ContactForm';
import { CourseDetails } from './CourseDetails';
import { CampaignSection } from './CampaignSection';
import { SelectionReasons } from './SelectionReasons';
import { siteContent } from '../config/siteContent';

interface LPPageProps {
  lpId: string;
}

export function LPPage({ lpId }: LPPageProps) {
  const content = lpContent[lpId];

  // メタデータ (Title / Description) の動的更新
  useEffect(() => {
    if (content) {
      document.title = content.title;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', content.description);
      }
    }
  }, [content]);

  // 万が一データが存在しない場合は404風の表示
  if (!content) {
    return (
      <div className="py-40 text-center min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-dark mb-4">ページが見つかりません</h2>
        <p className="text-gray-500 text-sm mb-8">指定された症状別LPデータが存在しません。</p>
        <a href="/" className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow hover:bg-primary/95 transition-all text-sm">
          ホームに戻る
        </a>
      </div>
    );
  }

  // 関連コラム (ブログ) を抽出 (この症状LPのIDにマッチするもの)
  const relatedArticles = siteContent.news
    .filter(item => item.relatedLpId === lpId)
    .slice(0, 2);

  const handleArticleClick = (id: string) => {
    window.history.pushState({}, '', `/new_page/${id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20 bg-gray-50 overflow-x-hidden">
      {/* 1. Hero / First View */}
      <section className="relative min-h-[75vh] flex items-center bg-dark text-white py-20">
        <div className="absolute inset-0 z-0">
          <img src={content.heroImage} alt={content.title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-transparent" />
        </div>

        <div className="container mx-auto px-4 z-10 relative max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full mb-6 tracking-widest">
              さくま整体院 症状別特別LP
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6">
              {content.mainCatch}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-8">
              {content.subCatch}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={siteContent.contacts.ekitenRsvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary text-white rounded-full font-bold tracking-widest hover:bg-primary/95 text-center transition-all text-sm shadow-md btn-shimmer"
              >
                初回限定体験を申し込む
              </a>
              <a
                href="#points"
                className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-bold tracking-widest hover:bg-white/20 text-center transition-all text-sm"
              >
                施術の特徴を見る
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Prejudice / Concept */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent font-bold tracking-widest text-sm mb-2"
          >
            OUR CONCEPT
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-display font-bold text-dark mb-6"
          >
            {content.prejudiceH2}
          </motion.h2>
          <div className="w-12 h-1 bg-primary mx-auto mb-8 rounded-full" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto"
          >
            {content.prejudiceText}
          </motion.p>
        </div>
      </section>

      {/* 3. Points 1-3 */}
      <section id="points" className="py-24 bg-gray-50 border-t border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-accent font-bold tracking-widest text-sm mb-2">FEATURES</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dark">施術が選ばれる3つの理由</h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid gap-12">
            {content.points.map((point, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <motion.article
                  key={point.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col lg:flex-row gap-8 items-center bg-white rounded-3xl p-6 md:p-8 shadow-sm ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="lg:w-1/2">
                    <span className="text-5xl md:text-6xl font-serif font-bold text-primary/10 block mb-2">
                      Point {point.number}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-dark mb-4">
                      {point.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-light text-sm md:text-base">
                      {point.desc}
                    </p>
                  </div>
                  <div className="lg:w-1/2 w-full aspect-video rounded-2xl overflow-hidden bg-gray-100">
                    <img
                      src={point.image}
                      alt={point.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <SelectionReasons />

      {/* 4. Campaign */}
      <CampaignSection />

      {/* 5. Menu Details */}
      <CourseDetails />

      {/* 6. FAQ */}
      <FAQ />

      {/* 7. 関連コラム (内的リンク) */}
      {relatedArticles.length > 0 && (
        <section className="py-24 bg-white border-t border-b border-gray-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <span className="text-primary font-bold tracking-widest text-xs uppercase">Related Column</span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-dark mt-2">この症状に関する専門コラム</h2>
              <div className="w-12 h-1 bg-accent mx-auto mt-4 rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => handleArticleClick(article.id)}
                  className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer group"
                >
                  <div className="aspect-video overflow-hidden bg-gray-200">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-xs text-gray-400 mb-2 font-mono">{article.dateText}</span>
                    <h3 className="font-display font-bold text-base text-dark group-hover:text-primary transition-colors mb-3 leading-snug">
                      {article.title}
                    </h3>
                    <span className="text-xs font-bold text-accent group-hover:translate-x-1 transition-transform mt-auto inline-flex items-center gap-1">
                      続きを読む ➔
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Access */}
      <AccessTabs />

      {/* 9. Contact Form */}
      <section id="contact">
        <ContactForm />
      </section>
    </div>
  );
}
