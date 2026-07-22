import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../config/siteContent';

export function NewsList() {
  const newsList = siteContent.news;

  // メタデータ (Title / Description) の動的更新
  useEffect(() => {
    document.title = "新着ブログ・お知らせ | さくま整体院";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'さくま整体院の新着ブログ・お知らせ一覧です。各症状に対するストレッチ対策や根本的な治療法について分かりやすく解説します。'
      );
    }
  }, []);

  const handleArticleClick = (id: string) => {
    window.history.pushState({}, '', `/new_page/${id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-32 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest text-xs uppercase">News & Blog</span>
          <h1 className="text-3xl md:text-4xl font-bold font-display mt-2 text-dark">新着ブログ・お知らせ</h1>
          <div className="w-12 h-1 bg-accent mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsList.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleArticleClick(item.id)}
              className="bg-white rounded-2xl overflow-hidden border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group"
            >
              <div className="aspect-video overflow-hidden bg-gray-100 relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs text-gray-400 mb-2 font-mono">{item.dateText}</span>
                <h2 className="font-display font-bold text-lg text-dark group-hover:text-primary transition-colors mb-3 leading-snug">
                  {item.title}
                </h2>
                <div
                  className="text-gray-500 text-sm font-light line-clamp-3 mb-4 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
                <span className="text-xs font-bold text-accent group-hover:translate-x-1 transition-transform mt-auto inline-flex items-center gap-1">
                  続きを読む ➔
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
