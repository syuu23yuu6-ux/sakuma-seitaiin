import { useState } from 'react';
import { siteContent } from '../config/siteContent';

interface FooterProps {
  onOpenLegal?: (type: 'tokusho' | 'guarantee') => void;
}

// 簡易 SPA リンクコンポーネント
function NavLink({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
    
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

export function Footer({}: FooterProps) {
  const [logoError, setLogoError] = useState(false);
  const { logoText, address, telNumber, footerIntro, parkingInfo } = siteContent.contacts;

  return (
    <footer className="bg-dark text-white pt-20 pb-24 md:pb-10 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <NavLink to="/" className="font-display text-2xl md:text-3xl font-bold tracking-wider mb-6 block text-white hover:text-primary transition-colors">
              {!logoError ? (
                <img
                  src="https://sakuma-seitaiin.jp/_img/ja/resource/3/logo/"
                  alt={logoText}
                  className="h-10 md:h-12 w-auto object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                logoText
              )}
            </NavLink>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light whitespace-pre-line">
              {footerIntro}
            </p>
            <div className="text-gray-400 text-sm leading-relaxed font-light space-y-2">
              <p>{address}</p>
              <p>TEL: {telNumber}</p>
              <p>営業時間: {siteContent.contacts.businessHours || '9:00〜13:00 / 14:00〜20:00（水曜・第2日曜定休）'}</p>
              <p className="text-xs text-gray-500">{parkingInfo}</p>
            </div>
          </div>
          
          {/* Navigation Groups */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h3 className="font-display font-bold text-accent text-sm md:text-base mb-6 tracking-widest border-l-2 border-primary pl-2">院のご案内</h3>
              <ul className="space-y-4 text-sm text-gray-400 font-light">
                <li><NavLink to="/" className="hover:text-primary transition-colors">ホーム</NavLink></li>
                <li><NavLink to="/#features" className="hover:text-primary transition-colors">当院の特徴</NavLink></li>
                <li><NavLink to="/menu" className="hover:text-primary transition-colors">施術メニュー・料金</NavLink></li>
                <li><NavLink to="/staff" className="hover:text-primary transition-colors">スタッフ紹介</NavLink></li>
                <li><NavLink to="/access" className="hover:text-primary transition-colors">アクセス</NavLink></li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-bold text-accent text-sm md:text-base mb-6 tracking-widest border-l-2 border-primary pl-2">インフォメーション</h3>
              <ul className="space-y-4 text-sm text-gray-400 font-light">
                <li><NavLink to="/new_page" className="hover:text-primary transition-colors">新着ブログ</NavLink></li>
                <li><NavLink to="/dictionary" className="hover:text-primary transition-colors">用語集（症状・対策）</NavLink></li>
                <li><NavLink to="/faq" className="hover:text-primary transition-colors">よくある質問</NavLink></li>
                <li><NavLink to="/contact" className="hover:text-primary transition-colors">ネット予約・お問合せ</NavLink></li>
                <li>
                  <NavLink to="/privacy_policy" className="hover:text-primary transition-colors">
                    プライバシーポリシー
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="pt-8 mb-4 text-center text-[10px] text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
          ※当院の提供するバランス整体および各施術は、身体のバランスを整え自然治癒力を高めることを目的とした医療類似行為であり、特定の医療的効果や症状の完治を保証するものではありません。施術による効果や体感には個人差があります。
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-white/10 text-center text-xs text-gray-500 font-light">
          &copy; {new Date().getFullYear()} {logoText}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
