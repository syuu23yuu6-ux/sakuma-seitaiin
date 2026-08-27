import { useEffect } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { insertJsonLd, removeJsonLd } from '../utils/seoUtils';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [
    { name: 'ホーム', url: '/' },
    ...items
  ];

  useEffect(() => {
    const origin = window.location.origin;
    const jsonLdData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: allItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${origin}${item.url}`
      }))
    };

    insertJsonLd('breadcrumb-jsonld', jsonLdData);

    return () => {
      removeJsonLd('breadcrumb-jsonld');
    };
  }, [items]);

  const handleLinkClick = (url: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav aria-label="パンくずリスト" className="py-4 bg-gray-50/80 border-b border-gray-100 text-xs md:text-sm">
      <div className="container mx-auto px-4 max-w-6xl">
        <ol className="flex items-center flex-wrap gap-1.5 text-gray-500 font-light">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={index} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />}
                {isLast ? (
                  <span className="font-medium text-dark font-display truncate max-w-[200px] md:max-w-[350px]" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <a
                    href={item.url}
                    onClick={(e) => handleLinkClick(item.url, e)}
                    className="hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {index === 0 && <Home className="w-3.5 h-3.5 text-primary shrink-0" />}
                    <span>{item.name}</span>
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
