import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { siteContent } from '../config/siteContent';
import { updateHeadMetadata } from '../utils/seoUtils';
import { Breadcrumbs } from './Breadcrumbs';

export function DictionaryList() {
  const dictionaryList = siteContent.dictionary;

  // メタデータ (Title / Description / OGP) の動的更新
  useEffect(() => {
    updateHeadMetadata({
      title: '症状・専門用語集 | さくま整体院',
      description: 'さくま整体院で用いる用語や、身体の痛み・ゆがみの原因に関する解説の一覧です。肩こり・腰痛・膝痛・しびれなどの症状原因を詳しく説明します。',
      canonicalUrl: `${window.location.origin}/dictionary`
    });
  }, []);

  const handleKeywordClick = (keyword: string) => {
    window.history.pushState({}, '', `/dictionary/${encodeURIComponent(keyword)}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20 pb-32 bg-gray-50 min-h-screen">
      <Breadcrumbs items={[{ name: '症状・用語辞典', url: '/dictionary' }]} />
      <div className="container mx-auto px-4 max-w-4xl pt-8">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest text-xs uppercase">Chiropractic Dictionary</span>
          <h1 className="text-3xl md:text-4xl font-bold font-display mt-2 text-dark">専門用語集</h1>
          <p className="text-gray-500 text-sm mt-3 font-light leading-relaxed max-w-lg mx-auto">
            さくま整体院で用いる用語や、身体の痛み・ゆがみの原因に関する解説の一覧です。
          </p>
          <div className="w-12 h-1 bg-accent mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {dictionaryList.map((item, index) => (
            <motion.div
              key={item.keyword}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => handleKeywordClick(item.keyword)}
              className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm hover:shadow-lg transition-all duration-300 flex items-start gap-4 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-soft text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <BookOpen size={20} />
              </div>
              <div className="flex-grow">
                <h2 className="font-display font-bold text-lg text-dark group-hover:text-primary transition-colors mb-2">
                  {item.keyword}
                </h2>
                <div
                  className="text-gray-500 text-xs md:text-sm font-light line-clamp-2 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                <span className="text-xs font-bold text-accent group-hover:translate-x-1 transition-transform mt-3 inline-flex items-center gap-1">
                  詳しく見る ➔
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
