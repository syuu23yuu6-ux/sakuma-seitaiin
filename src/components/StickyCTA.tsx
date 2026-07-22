import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { siteContent } from '../config/siteContent';

export function StickyCTA() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 500);
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] pb-safe"
        >
          <div className="flex gap-2 p-3">
            <a 
              href={siteContent.contacts.ekitenRsvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center justify-center py-3 bg-primary text-white rounded-xl font-bold transition-all duration-300 btn-shimmer hover:scale-105 active:scale-95"
            >
              <span className="text-[10px] opacity-90 mb-0.5 tracking-wider">{siteContent.contacts.ctaMicroCopy}</span>
              <span className="text-sm">ネット予約・お問合せ</span>
            </a>
            <a 
              href={`tel:${siteContent.contacts.telNumber.replace(/-/g, '')}`}
              className="flex-1 flex flex-col items-center justify-center py-3 bg-dark text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 text-center"
              aria-label="お電話でお問合せ"
            >
              <span className="text-[10px] opacity-90 mb-0.5 tracking-wider">お急ぎの方はこちら</span>
              <span className="text-sm">お電話でお問合せ</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
