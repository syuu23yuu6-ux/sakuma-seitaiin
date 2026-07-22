import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { siteContent } from '../config/siteContent';

// 簡易 SPA リンクコンポーネント
function NavLink({ to, children, onClick, className }: { to: string; children: React.ReactNode; onClick?: () => void; className?: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
    if (onClick) onClick();
    
    // アンカーリンクの処理
    if (to.includes('#')) {
      const id = to.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const { logoText, telNumber } = siteContent.contacts;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // モバイルメニュー展開時のスクロールロック
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-md border-b border-primary/10"
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <NavLink to="/" className="font-serif text-2xl font-bold text-dark tracking-wider flex items-center gap-2">
            {!logoError ? (
              <img
                src="https://sakuma-seitaiin.jp/_img/ja/resource/3/logo/"
                alt={logoText}
                className="h-10 md:h-12 w-auto object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-primary text-xl md:text-2xl font-display font-extrabold flex items-center gap-1.5">
                <span className="inline-block w-3 h-6 bg-accent rounded-full transform rotate-12"></span>
                {logoText}
              </span>
            )}
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-6 xl:gap-8 items-center font-medium text-xs xl:text-sm tracking-widest text-dark">
            <NavLink to="/" className="hover:text-primary transition-colors py-2">ホーム</NavLink>
            <NavLink to="/#features" className="hover:text-primary transition-colors py-2">特徴</NavLink>
            <NavLink to="/menu" className="hover:text-primary transition-colors py-2">施術メニュー・料金</NavLink>
            <NavLink to="/staff" className="hover:text-primary transition-colors py-2">スタッフ紹介</NavLink>
            <NavLink to="/faq" className="hover:text-primary transition-colors py-2">よくある質問</NavLink>
            <NavLink to="/dictionary" className="hover:text-primary transition-colors py-2">用語集</NavLink>
            <NavLink to="/access" className="hover:text-primary transition-colors py-2">アクセス</NavLink>
            <NavLink to="/new_page" className="hover:text-primary transition-colors py-2">新着ブログ</NavLink>
            
            <a href={`tel:${telNumber}`} className="flex items-center gap-1.5 text-primary font-bold hover:scale-105 transition-transform">
              <Phone size={16} className="text-accent" />
              <span>{telNumber}</span>
            </a>
            
            <NavLink to="/contact" className="px-5 py-2.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 shadow-md text-center btn-shimmer hover:scale-105 active:scale-95 text-xs xl:text-sm">
              ネット予約・お問合せ
            </NavLink>
          </nav>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <a href={`tel:${telNumber}`} className="p-2.5 rounded-full bg-soft text-primary hover:bg-primary hover:text-white transition-colors" aria-label="電話をかける">
              <Phone size={20} />
            </a>
            <button 
              className="p-2 text-dark focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              id="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 left-0 right-0 bg-white shadow-lg p-6 flex flex-col gap-4 lg:hidden border-t border-gray-100 max-h-[calc(100vh-80px)] overflow-y-auto z-50"
            >
              <NavLink to="/" onClick={() => setMenuOpen(false)} className="block py-2 text-dark font-medium border-b border-gray-50">ホーム</NavLink>
              <NavLink to="/#features" onClick={() => setMenuOpen(false)} className="block py-2 text-dark font-medium border-b border-gray-50">特徴</NavLink>
              <NavLink to="/menu" onClick={() => setMenuOpen(false)} className="block py-2 text-dark font-medium border-b border-gray-50">施術メニュー・料金</NavLink>
              <NavLink to="/staff" onClick={() => setMenuOpen(false)} className="block py-2 text-dark font-medium border-b border-gray-50">スタッフ紹介</NavLink>
              <NavLink to="/faq" onClick={() => setMenuOpen(false)} className="block py-2 text-dark font-medium border-b border-gray-50">よくある質問</NavLink>
              <NavLink to="/dictionary" onClick={() => setMenuOpen(false)} className="block py-2 text-dark font-medium border-b border-gray-50">用語集</NavLink>
              <NavLink to="/access" onClick={() => setMenuOpen(false)} className="block py-2 text-dark font-medium border-b border-gray-50">アクセス</NavLink>
              <NavLink to="/new_page" onClick={() => setMenuOpen(false)} className="block py-2 text-dark font-medium border-b border-gray-50">新着ブログ</NavLink>
              
              <div className="py-2 border-b border-gray-50">
                <a href={`tel:${telNumber}`} className="flex items-center gap-2 text-primary font-bold text-lg">
                  <Phone size={18} className="text-accent" />
                  <span>{telNumber}</span>
                </a>
                <p className="text-xs text-gray-500 mt-1">受付時間: 9:00〜13:00 / 14:00〜20:00 (水曜・第2日曜定休)</p>
              </div>
              
              <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="block py-3 text-center rounded-full bg-primary text-white font-semibold shadow-md btn-shimmer hover:scale-105 active:scale-95 transition-all duration-300">
                ネット予約・お問合せ
              </NavLink>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Background Overlay for Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            style={{ top: '80px' }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
