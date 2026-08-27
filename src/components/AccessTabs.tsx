import { motion } from 'framer-motion';
import { siteContent } from '../config/siteContent';

export function AccessTabs() {
  const campus = {
    name: siteContent.contacts.logoText || "さくま整体院",
    address: siteContent.contacts.address,
    tel: siteContent.contacts.telNumber,
    access: siteContent.contacts.accessRoute || "阪急京都線・大阪モノレール 南茨木駅より徒歩5分",
    hours: siteContent.contacts.businessHours || "9:00 〜 13:00 / 14:00 〜 20:00（土日祝も対応 ※第2日曜を除く）",
    closed: siteContent.contacts.closedDays || "毎週水曜、第２日曜",
    parking: siteContent.contacts.parkingInfo || "無料専用駐車場あり",
    mapUrl: siteContent.contacts.googleMapUrl || "https://maps.app.goo.gl/Fcr4mYza3wd5tcUZA"
  };

  return (
    <section id="access" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-center text-dark mb-16"
        >
          当院へのアクセス
        </motion.h2>

        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-primary/5 flex flex-col md:flex-row items-start justify-between gap-8 shadow-sm"
          >
            <div className="space-y-6 flex-grow">
              <h3 className="text-xl md:text-2xl font-display font-bold text-dark border-l-4 border-primary pl-3">
                {campus.name}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-accent tracking-widest uppercase mb-1">住所</h4>
                  <p className="text-gray-600 text-sm md:text-base whitespace-pre-line leading-relaxed font-light">
                    {campus.address}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-accent tracking-widest uppercase mb-1">電話番号</h4>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light">
                    {campus.tel}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-accent tracking-widest uppercase mb-1">最寄り駅からのアクセス</h4>
                  <p className="text-gray-600 text-sm md:text-base whitespace-pre-line leading-relaxed font-light">
                    {campus.access}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-accent tracking-widest uppercase mb-1">営業時間</h4>
                  <p className="text-gray-600 text-sm md:text-base whitespace-pre-line leading-relaxed font-light">
                    {campus.hours}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-accent tracking-widest uppercase mb-1">定休日</h4>
                  <p className="text-gray-600 text-sm md:text-base whitespace-pre-line leading-relaxed font-light">
                    {campus.closed}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-accent tracking-widest uppercase mb-1">駐車場のご案内</h4>
                  <p className="text-gray-600 text-sm md:text-base whitespace-pre-line leading-relaxed font-light">
                    {campus.parking}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto shrink-0 self-center md:self-end">
              <a
                href={campus.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full md:w-auto px-8 py-4 bg-primary text-white text-center rounded-xl font-bold tracking-widest hover:bg-primary/95 transition-all text-sm shadow-md hover:shadow-lg btn-shimmer"
              >
                Google Mapで開く
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
