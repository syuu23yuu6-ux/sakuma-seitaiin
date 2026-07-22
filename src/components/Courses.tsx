import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { siteContent } from '../config/siteContent';

const menus = siteContent.menus;

export function Courses() {
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="courses" className="py-24 bg-soft relative">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-bold tracking-widest text-sm mb-2"
          >
            MENU & PRICING
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold text-dark"
          >
            施術メニュー・料金
          </motion.h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {menus.map((menu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-primary/5 transition-all duration-300 flex flex-col"
            >
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full ${menu.isAccent ? 'bg-primary shadow-sm shadow-primary/30' : 'bg-dark'}`}>
                    {menu.isAccent ? 'おすすめ' : '標準コース'}
                  </span>
                  <span className="text-2xl font-bold text-accent font-serif">{menu.price}</span>
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl mb-4 text-dark leading-snug">{menu.title}</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed font-light">{menu.desc}</p>
                <a 
                  href="#course-details" 
                  onClick={(e) => handleCtaClick(e, '#course-details')}
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-primary/80 transition-colors mt-auto group/link cursor-pointer"
                >
                  料金詳細・内訳を見る <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-primary to-primary/95 rounded-3xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden"
        >
          {/* Decorative Blur Backgrounds */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

          <div className="relative z-10 text-center md:text-left">
            <h3 className="font-display font-bold text-xl md:text-2xl mb-2 tracking-wide drop-shadow-sm">
              ご新規様向けの割引プランを開催中
            </h3>
            <p className="text-white/90 text-sm md:text-base font-light tracking-wider drop-shadow-sm">
              初めての方でも安心してお試しいただけるよう、特別価格での体験コースをご用意しています。
            </p>
          </div>
          <a 
            href={siteContent.contacts.ekitenRsvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 px-8 py-4 bg-accent text-white rounded-full font-bold tracking-widest hover:bg-white hover:text-accent hover:shadow-xl transition-all duration-300 shadow-md text-sm md:text-base shrink-0 btn-shimmer"
          >
            ご予約・お問い合わせはこちら
          </a>
        </motion.div>
      </div>
    </section>
  );
}
