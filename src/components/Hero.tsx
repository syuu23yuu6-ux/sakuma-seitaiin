import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import { siteContent } from '../config/siteContent';

const { images, badge, title, desc, ctaPrimary, ctaSecondary } = siteContent.hero;

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  
  // パララックス効果: スクロールに応じて背景がゆっくり下がる
  const yBg = useTransform(scrollY, [0, 800], ["0%", "20%"]);
  // コンテンツのフェードアウト効果
  const opacityContent = useTransform(scrollY, [0, 300], [1, 0]);

  // 背景の自動切り替え
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // タイピングアニメーション設定（改行に対応）
  const displayTitle = title.replace(/\\n/g, '\n');
  const lines = displayTitle.split('\n');

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.startsWith('http://') || href.startsWith('https://')) {
      // 外部リンクの場合はブラウザ標準の遷移に任せる
      return;
    } else {
      e.preventDefault();
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen min-h-[650px] flex items-center justify-center overflow-hidden bg-dark">
      {/* Background Slideshow with Parallax */}
      <motion.div 
        style={{ y: yBg }} 
        className="absolute inset-0 z-0"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${images[currentSlide]}')` }}
          />
        </AnimatePresence>
        {/* Dark overlay with elegant gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/40 to-dark/80" />
      </motion.div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          style={{ opacity: opacityContent }}
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          {/* Subtitle with fade-up */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-accent font-bold tracking-[0.2em] mb-6 text-[10px] sm:text-xs md:text-sm bg-dark/30 px-5 py-2 rounded-full backdrop-blur-sm border border-accent/20"
          >
            {badge}
          </motion.span>

          {/* Title with line breaks */}
          <motion.h1
            className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-extrabold mb-8 leading-tight drop-shadow-xl select-none"
          >
            {lines.map((line, lineIndex) => (
              <motion.span
                key={lineIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + lineIndex * 0.15 }}
                className="block whitespace-nowrap"
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-white/95 text-base md:text-lg lg:text-xl mb-12 tracking-widest font-light drop-shadow max-w-2xl text-balance leading-relaxed"
          >
            {desc}
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a 
              href={ctaPrimary.href} 
              onClick={(e) => handleCtaClick(e, ctaPrimary.href)}
              target={ctaPrimary.href.startsWith('http') ? "_blank" : undefined}
              rel={ctaPrimary.href.startsWith('http') ? "noopener noreferrer" : undefined}
              className="px-8 py-4 bg-primary text-white rounded-full font-bold tracking-widest hover:bg-white hover:text-primary transition-colors shadow-lg hover:shadow-xl text-center text-sm md:text-base btn-shimmer"
            >
              {ctaPrimary.text}
            </a>
            <a 
              href={ctaSecondary.href} 
              onClick={(e) => handleCtaClick(e, ctaSecondary.href)}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/40 rounded-full font-bold tracking-widest hover:bg-white hover:text-dark transition-colors text-center text-sm md:text-base"
            >
              {ctaSecondary.text}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-white/60 text-[9px] tracking-[0.3em] font-medium font-serif">SCROLL</span>
        <div className="w-[1.5px] h-12 bg-white/20 relative overflow-hidden rounded-full">
          <motion.div 
            animate={{ 
              y: ["-100%", "100%"] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent via-accent to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}

