import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { siteContent } from '../config/siteContent';
import { lpContent } from '../config/lpContent';
import { updateHeadMetadata, insertJsonLd, removeJsonLd } from '../utils/seoUtils';
import { Breadcrumbs } from './Breadcrumbs';

interface NewsDetailProps {
  articleId: string;
}

export function NewsDetail({ articleId }: NewsDetailProps) {
  const newsList = siteContent.news;
  const article = newsList.find(item => item.id === articleId);

  // メタデータ (Title / Description / OGP) 及び BlogPosting 構造化データの動的更新
  useEffect(() => {
    if (article) {
      const canonicalUrl = `${window.location.origin}/new_page/${article.id}`;
      const plainText = article.content.replace(/<[^>]*>/g, '').substring(0, 120);

      updateHeadMetadata({
        title: `${article.title} | さくま整体院`,
        description: plainText,
        canonicalUrl,
        ogImage: article.thumbnail,
        ogType: 'article'
      });

      insertJsonLd('blog-posting-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: plainText,
        image: article.thumbnail,
        datePublished: article.dateValue || '2022-01-01',
        author: {
          '@type': 'Person',
          name: siteContent.staff[0]?.name || '佐久ま 院長'
        },
        publisher: {
          '@type': 'Organization',
          name: 'さくま整体院',
          logo: {
            '@type': 'ImageObject',
            url: 'https://sakuma-seitaiin.jp/_img/ja/resource/3/logo/'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl
        }
      });
    }

    return () => {
      removeJsonLd('blog-posting-jsonld');
    };
  }, [article, articleId]);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/new_page');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLpNavigate = (lpId: string) => {
    window.history.pushState({}, '', `/lp/${lpId}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArticleClick = (id: string) => {
    window.history.pushState({}, '', `/new_page/${id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!article) {
    return (
      <div className="py-32 text-center min-h-screen">
        <p className="text-gray-500 mb-6">記事が見つかりませんでした。</p>
        <a href="/new_page" onClick={handleBack} className="text-primary font-bold">
          ブログ一覧に戻る
        </a>
      </div>
    );
  }

  // 関連するLP情報の取得
  const relatedLp = article.relatedLpId ? lpContent[article.relatedLpId] : null;

  // おすすめの記事 (同一IDを除く他記事から最大2件抽出)
  const recommendedArticles = newsList
    .filter(item => item.id !== articleId)
    .slice(0, 2);

  return (
    <div className="pt-20 pb-32 bg-white min-h-screen">
      <Breadcrumbs
        items={[
          { name: '新着ブログ・コラム', url: '/new_page' },
          { name: article.title, url: `/new_page/${article.id}` }
        ]}
      />
      <div className="container mx-auto px-4 max-w-3xl pt-8">
        {/* Back Link */}
        <a
          href="/new_page"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>ブログ一覧に戻る</span>
        </a>

        <motion.article
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <header className="mb-8 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                {article.category}
              </span>
              <span className="text-sm text-gray-400 font-mono">{article.dateText}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold font-display text-dark leading-snug">
              {article.title}
            </h1>
          </header>

          {/* Thumbnail */}
          {article.thumbnail && (
            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-10 shadow-sm">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Content Body */}
          <div
            className="prose prose-emerald max-w-none text-gray-700 leading-relaxed font-light space-y-6 mb-16"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* 1. 関連LPへの誘導バナーカード (内的リンク) */}
          {relatedLp && article.relatedLpId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => handleLpNavigate(article.relatedLpId!)}
              className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-8 border border-primary/10 mb-16 cursor-pointer hover:shadow-md transition-all group flex flex-col md:flex-row justify-between items-center gap-6"
            >
              <div className="flex-1">
                <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">根本改善コースのご案内</span>
                <h3 className="font-display font-bold text-dark text-lg md:text-xl mb-2 group-hover:text-primary transition-colors">
                  {relatedLp.mainCatch}
                </h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">
                  痛みやシビレを再発させないお身体へ。当院の専門コースはこちら。
                </p>
              </div>
              <span className="shrink-0 px-6 py-3 bg-primary text-white text-sm font-bold rounded-full group-hover:bg-primary/95 transition-all shadow-sm">
                詳しく見る ➔
              </span>
            </motion.div>
          )}

          {/* 2. おすすめコラム紹介セクション (内的リンク) */}
          {recommendedArticles.length > 0 && (
            <div className="border-t border-gray-100 pt-16 mb-8">
              <h3 className="font-display font-bold text-dark text-xl mb-8 text-center">こちらのコラムもおすすめ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recommendedArticles.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleArticleClick(item.id)}
                    className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer group"
                  >
                    <div className="aspect-video overflow-hidden bg-gray-200">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-xs text-gray-400 mb-2 font-mono">{item.dateText}</span>
                      <h4 className="font-display font-bold text-base text-dark group-hover:text-primary transition-colors mb-3 leading-snug">
                        {item.title}
                      </h4>
                      <span className="text-xs font-bold text-accent group-hover:translate-x-1 transition-transform mt-auto inline-flex items-center gap-1">
                        続きを読む ➔
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.article>
      </div>
    </div>
  );
}
