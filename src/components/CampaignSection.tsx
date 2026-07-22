import { motion } from 'framer-motion';
import { Calendar, CheckCircle } from 'lucide-react';
import { siteContent } from '../config/siteContent';

export function CampaignSection() {
  const { campaignTitle, campaignPrice, campaignDesc, campaignBadge, campaignDeadline } = siteContent.campaign;

  return (
    <section id="campaign-section" className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-primary/10 relative overflow-hidden"
        >
          {/* Badge */}
          <div className="absolute top-0 right-0 bg-accent text-white px-6 py-2 rounded-bl-3xl font-display font-bold text-sm tracking-wider shadow-sm animate-pulse">
            {campaignBadge}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-3/5">
              <h3 className="text-2xl md:text-3xl font-bold font-display text-dark mb-4 leading-snug">
                {campaignTitle}
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed font-light">
                {campaignDesc}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-sm text-dark font-medium">
                  <CheckCircle size={18} className="text-primary" />
                  <span>全身のバランスを整え、痛みの根本に施術</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-dark font-medium">
                  <CheckCircle size={18} className="text-primary" />
                  <span>姿勢・セルフケアのアドバイス付き</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-dark font-medium">
                  <Calendar size={18} className="text-primary" />
                  <span className="text-red-600 font-bold">期限：{campaignDeadline}</span>
                </div>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="w-full md:w-2/5 bg-soft/60 rounded-2xl p-6 text-center border border-primary/5 flex flex-col justify-between h-full">
              <div>
                <p className="text-xs text-gray-500 font-semibold tracking-wider mb-2">初回体験特別価格</p>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl md:text-5xl font-extrabold text-accent font-serif">{campaignPrice}</span>
                  <span className="text-xs text-gray-500 font-semibold">（税込）</span>
                </div>
                <p className="text-xs text-gray-400 line-through mb-4">通常料金: ¥5,000</p>
              </div>

              <a
                href={siteContent.contacts.ekitenRsvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-primary text-white hover:bg-primary/95 text-center font-bold rounded-xl transition-all duration-300 shadow-md btn-shimmer hover:scale-105 active:scale-95 text-sm"
              >
                キャンペーン価格で予約する
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
