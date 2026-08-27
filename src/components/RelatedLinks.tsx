import { motion } from 'framer-motion';
import { ExternalLink, Mail, Store, Award, Star, MapPin } from 'lucide-react';
import { siteContent } from '../config/siteContent';

export function RelatedLinks() {
  const { mailMagazineUrl, tsuku2Url, ekitenUrl, suisoIryouUrl, googleMapUrl } = siteContent.contacts;

  const links = [
    {
      title: 'Google マップ（ルート案内）',
      desc: '南茨木駅徒歩5分。経路・現在地からのルート確認',
      href: googleMapUrl || 'https://maps.app.goo.gl/Fcr4mYza3wd5tcUZA',
      icon: MapPin,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-600 hover:text-white',
    },
    {
      title: 'エキテン公式掲載ページ',
      desc: '全国最大級の口コミ・店舗情報サイト',
      href: ekitenUrl,
      icon: Star,
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-500 hover:text-white',
    },
    {
      title: 'ツクツク公式ショップ',
      desc: 'おすそわけマーケットプレイス店はこちら',
      href: tsuku2Url,
      icon: Store,
      color: 'bg-accent/10 text-accent border-accent/20 hover:bg-accent hover:text-white',
    },
    {
      title: '無料メルマガ・ヘルスケア通信',
      desc: 'セルフケア情報・お得なニュースを無料配信',
      href: mailMagazineUrl,
      icon: Mail,
      color: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white',
    },
    {
      title: '一般社団法人 水素医療研究所',
      desc: '最先端の水素医療研究についてはこちら',
      href: suisoIryouUrl,
      icon: Award,
      color: 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-700 hover:text-white',
    },
  ];

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-dark font-display">
            関連リンク・外部サービス
          </h2>
          <div className="w-10 h-0.5 bg-primary mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-6 rounded-2xl border flex flex-col justify-between h-full transition-all duration-300 group cursor-pointer ${link.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-white/80 group-hover:bg-white shadow-sm transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{link.title}</h3>
                  <p className="text-xs opacity-80 leading-relaxed font-light">
                    {link.desc}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
