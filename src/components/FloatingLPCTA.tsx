import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Phone, Calendar } from 'lucide-react';
import { siteContent } from '../config/siteContent';

export function FloatingLPCTA() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 300);
  });

  const { telNumber, ekitenRsvUrl } = siteContent.contacts;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-8 right-8 z-50 hidden md:flex flex-col gap-3 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-primary/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-64"
        >
          <div className="text-center pb-2 border-b border-primary/5">
            <span className="text-[10px] text-accent font-bold tracking-widest block uppercase mb-1">Reservation</span>
            <h4 className="text-xs font-bold text-dark">ご相談・ご予約はこちら</h4>
          </div>

          <div className="flex flex-col gap-2">
            {/* エキテン簡単ネット予約 */}
            <a
              href={ekitenRsvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 btn-shimmer"
            >
              <Calendar size={14} />
              <span>エキテン簡単ネット予約</span>
            </a>

            {/* 電話でお問合せ */}
            <a
              href={`tel:${telNumber.replace(/-/g, '')}`}
              className="flex items-center justify-center gap-2 py-3 bg-dark text-white text-xs font-bold rounded-xl hover:bg-dark/95 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <Phone size={14} />
              <span>お電話でお問合せ</span>
            </a>
          </div>

          <div className="text-center mt-1">
            <p className="text-[10px] text-gray-500 font-medium">TEL: {telNumber}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
