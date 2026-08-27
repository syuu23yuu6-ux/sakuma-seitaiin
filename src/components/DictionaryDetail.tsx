import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import { siteContent } from '../config/siteContent';
import { updateHeadMetadata, insertJsonLd, removeJsonLd } from '../utils/seoUtils';
import { Breadcrumbs } from './Breadcrumbs';

interface DictionaryDetailProps {
  keyword: string;
}

export function DictionaryDetail({ keyword }: DictionaryDetailProps) {
  const dictionaryList = siteContent.dictionary;
  const item = dictionaryList.find(d => d.keyword === keyword);

  // メタデータ (Title / Description / OGP) 及び DefinedTerm 構造化データの動的更新
  useEffect(() => {
    if (item) {
      const canonicalUrl = `${window.location.origin}/dictionary/${encodeURIComponent(item.keyword)}`;
      const plainText = item.description.replace(/<[^>]*>/g, '').substring(0, 120);

      updateHeadMetadata({
        title: `${item.keyword}とは？原因と施術解説 | 用語集 | さくま整体院`,
        description: plainText,
        canonicalUrl,
        ogType: 'article'
      });

      insertJsonLd('defined-term-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'DefinedTerm',
        name: item.keyword,
        description: plainText,
        url: canonicalUrl,
        inDefinedTermSet: 'さくま整体院 症状・用語辞典'
      });
    }

    return () => {
      removeJsonLd('defined-term-jsonld');
    };
  }, [item, keyword]);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/dictionary');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // 予約フォームへの遷移先を、エキテン簡単ネット予約に揃える
    window.open(siteContent.contacts.ekitenRsvUrl, '_blank', 'noopener,noreferrer');
  };

  const handleInternalLinkClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!item) {
    return (
      <div className="py-32 text-center min-h-screen">
        <p className="text-gray-500 mb-6">用語が見つかりませんでした。</p>
        <a href="/dictionary" onClick={handleBack} className="text-primary font-bold">
          用語集一覧に戻る
        </a>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-32 bg-white min-h-screen">
      <Breadcrumbs
        items={[
          { name: '症状・用語辞典', url: '/dictionary' },
          { name: item.keyword, url: `/dictionary/${encodeURIComponent(item.keyword)}` }
        ]}
      />
      <div className="container mx-auto px-4 max-w-3xl pt-8">
        {/* Back Link */}
        <a
          href="/dictionary"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>用語集一覧に戻る</span>
        </a>

        <motion.article
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <header className="mb-8 border-b border-gray-100 pb-8 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-soft text-primary flex items-center justify-center shrink-0">
              <BookOpen size={24} />
            </div>
            <div>
              <span className="text-primary font-bold tracking-widest text-xs uppercase">用語解説</span>
              <h1 className="text-3xl md:text-4xl font-bold font-display mt-1 text-dark">
                {item.keyword}
              </h1>
            </div>
          </header>

          {/* Description Content */}
          <div
            className="prose prose-emerald max-w-none text-gray-700 leading-relaxed font-light space-y-6 mb-12"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />

          {/* Related Links */}
          {item.relatedLinks && item.relatedLinks.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-12">
              <h3 className="font-display font-bold text-dark text-base mb-4">関連リンク</h3>
              <ul className="space-y-3">
                {item.relatedLinks.map((link, lIdx) => {
                  const isInternal = link.url.startsWith('/');
                  return (
                    <li key={lIdx}>
                      {isInternal ? (
                        <a
                          href={link.url}
                          onClick={(e) => handleInternalLinkClick(e, link.url)}
                          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-bold"
                        >
                          <span>{link.title}</span>
                          <span className="text-xs font-normal text-gray-400">(関連ページへ)</span>
                        </a>
                      ) : (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                        >
                          <span>{link.title}</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* CTA Box */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 text-center border border-primary/10">
            <h3 className="font-display font-bold text-dark text-lg mb-2">
              身体のゆがみや長引く痛みについて相談してみませんか？
            </h3>
            <p className="text-gray-500 text-sm mb-6 font-light leading-relaxed">
              さくま整体院では、バキバキしない優しいソフト施術でお身体の不調を根本から改善します。
            </p>
            <a
              href={siteContent.contacts.ekitenRsvUrl}
              onClick={handleCtaClick}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-primary text-white rounded-full font-bold tracking-widest hover:bg-primary/95 transition-all text-sm shadow-md hover:shadow-lg btn-shimmer"
            >
              ネット予約・お問合せはこちら
            </a>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
