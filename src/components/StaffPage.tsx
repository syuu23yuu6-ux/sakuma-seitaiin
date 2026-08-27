import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../config/siteContent';
import { updateHeadMetadata } from '../utils/seoUtils';
import { Breadcrumbs } from './Breadcrumbs';

export function StaffPage() {
  const staffList = siteContent.staff;

  // メタデータ (Title / Description / OGP) の動的更新
  useEffect(() => {
    updateHeadMetadata({
      title: 'スタッフ・院長紹介 | さくま整体院',
      description: 'さくま整体院の院長・スタッフ紹介。整体歴16年以上のベテラン院長がお客様のお悩みに寄り添った丁寧な手技施術を行います。',
      canonicalUrl: `${window.location.origin}/staff`
    });
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState({}, '', '/contact');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20 pb-32 bg-gray-50 min-h-screen">
      <Breadcrumbs items={[{ name: 'スタッフ・院長紹介', url: '/staff' }]} />
      <div className="container mx-auto px-4 max-w-4xl pt-8">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest text-xs uppercase">Our Staff</span>
          <h1 className="text-3xl md:text-4xl font-bold font-display mt-2 text-dark">スタッフ・院長紹介</h1>
          <div className="w-12 h-1 bg-accent mx-auto mt-4 rounded-full" />
        </div>

        <div className="space-y-12">
          {staffList.map((person, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-primary/5 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12"
            >
              {/* Profile Photo */}
              <div className="w-full md:w-1/3 max-w-[280px] shrink-0">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md relative">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                    {person.role}
                  </div>
                </div>
              </div>

              {/* Bio Detail */}
              <div className="w-full md:w-2/3 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-display text-dark mb-2">{person.name}</h2>
                  <span className="text-xs text-primary font-bold tracking-wider block mb-6">{person.role}</span>
                  
                  {/* Rich text intro */}
                  <div
                    className="prose prose-sm prose-emerald text-gray-600 leading-relaxed font-light space-y-4 mb-8"
                    dangerouslySetInnerHTML={{ __html: person.profileText }}
                  />
                </div>

                <a
                  href="/contact"
                  onClick={handleCtaClick}
                  className="inline-block self-start px-6 py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl transition-all duration-300 shadow-md text-sm btn-shimmer hover:scale-105 active:scale-95"
                >
                  院長に相談・予約する
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
