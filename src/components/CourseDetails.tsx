import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../config/siteContent';

interface CourseDetailsProps {
  initialCourseId?: string;
  activeCourseId?: string;
  onCourseChange?: (courseId: string) => void;
}

export function CourseDetails({ initialCourseId, activeCourseId, onCourseChange }: CourseDetailsProps) {
  const menus = siteContent.menus;
  const defaultTab = initialCourseId || (menus[0]?.id || "");
  
  // 外部からのタブ制御があれば優先、なければ内部状態を使用
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    if (activeCourseId) {
      setActiveTab(activeCourseId);
    }
  }, [activeCourseId]);

  useEffect(() => {
    if (initialCourseId) {
      setActiveTab(initialCourseId);
    }
  }, [initialCourseId]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const courseId = hash.replace('#', '');
        const exists = menus.some(m => m.id === courseId);
        if (exists) {
          setActiveTab(courseId);
          const element = document.getElementById('course-details');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [menus]);

  const handleTabChange = (courseId: string) => {
    setActiveTab(courseId);
    if (onCourseChange) {
      onCourseChange(courseId);
    }
  };

  const activeMenu = menus.find(m => m.id === activeTab) || menus[0];

  if (!activeMenu) return null;

  return (
    <section id="course-details" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-bold tracking-widest text-sm mb-2"
          >
            MENU DETAILS & PRICE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold text-dark"
          >
            施術コース詳細・料金案内
          </motion.h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        {/* Tab Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 border-b border-primary/10 pb-6 overflow-x-auto scrollbar-none">
          {menus.map((menu) => {
            const isActive = menu.id === activeTab;
            return (
              <button
                key={menu.id}
                onClick={() => handleTabChange(menu.id)}
                className={`px-6 py-3 rounded-full font-bold text-xs md:text-sm tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                    : 'bg-gray-50 text-gray-500 border border-primary/10 hover:bg-primary/5 hover:text-primary'
                }`}
              >
                {menu.title.split('（')[0]}
              </button>
            );
          })}
        </div>

        {/* Active Menu Card with Fade/Slide Animation */}
        <div className="min-h-[400px]">
          <motion.article
            key={activeMenu.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="border border-primary/10 rounded-3xl overflow-hidden bg-gray-50 shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
          >
            {/* Header */}
            <div className="bg-dark text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-3 ${activeMenu.isAccent ? 'bg-primary text-white' : 'bg-accent/20 text-accent border border-accent/30'}`}>
                  {activeMenu.isAccent ? 'おすすめ' : '標準プラン'}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-bold tracking-wide">
                  {activeMenu.title}
                </h3>
              </div>
              <p className="text-accent text-2xl font-bold font-serif shrink-0">
                {activeMenu.price}
              </p>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8">
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 font-light">
                {activeMenu.desc}
              </p>

              {activeMenu.pricing && activeMenu.pricing.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm md:text-base">
                    <thead>
                      <tr className="border-b border-primary/10 text-dark font-bold">
                        <th className="py-4 px-2">項目</th>
                        <th className="py-4 px-2">金額（税込）</th>
                        <th className="py-4 px-2">備考</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-600">
                      {activeMenu.pricing.map((row, rIdx) => (
                        <tr key={rIdx}>
                          <td className="py-4 px-2 font-medium text-dark">{row.item}</td>
                          <td className="py-4 px-2 font-bold text-primary">
                            {row.price}
                          </td>
                          <td className="py-4 px-2 text-xs md:text-sm font-light">
                            {row.highlightNote ? (
                              <span className="text-accent font-bold">{row.note}</span>
                            ) : (
                              row.note
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-8 text-center">
                <a
                  href={siteContent.contacts.ekitenRsvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-primary text-white rounded-full font-bold tracking-widest hover:bg-primary/95 transition-all text-sm shadow-md hover:shadow-lg btn-shimmer"
                >
                  このコースで予約・問合せする
                </a>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
