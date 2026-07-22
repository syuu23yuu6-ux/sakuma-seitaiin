import { motion } from 'framer-motion';
import { siteContent } from '../config/siteContent';

export function CampaignBanner() {
  const { campaignBadge, campaignBannerText } = siteContent.campaign;

  return (
    <aside id="campaign" className="py-6 bg-soft/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.a 
          href="#campaign-section" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative block w-full bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer"
        >
          {/* Shine effect overlay using Framer Motion */}
          <motion.div 
            animate={{ 
              x: ["-100%", "300%"] 
            }}
            transition={{ 
              duration: 2.2, 
              repeat: Infinity, 
              repeatDelay: 2.5, 
              ease: "easeInOut" 
            }}
            className="absolute top-0 bottom-0 left-0 w-36 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-20 pointer-events-none"
          />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 relative z-10 text-center lg:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
              <span className="px-3.5 py-1 bg-amber-400 text-dark font-extrabold text-xs md:text-sm rounded-full tracking-wider shrink-0 shadow-sm">
                {campaignBadge}
              </span>
              <h3 className="font-display font-bold text-base md:text-lg lg:text-xl tracking-wide text-white leading-snug">
                {campaignBannerText.includes('3,000円') ? (
                  <>
                    {campaignBannerText.split('3,000円')[0]}
                    <span className="text-amber-300 font-extrabold text-lg md:text-2xl mx-1 underline decoration-amber-300/60 underline-offset-4">
                      3,000円
                    </span>
                    {campaignBannerText.split('3,000円')[1]}
                  </>
                ) : (
                  campaignBannerText
                )}
              </h3>
            </div>
            <span className="px-6 py-2.5 bg-white text-primary group-hover:bg-amber-300 group-hover:text-dark rounded-full text-xs md:text-sm font-bold tracking-widest transition-all duration-300 shrink-0 shadow-md flex items-center gap-1">
              ご予約・詳細はこちら &rarr;
            </span>
          </div>
        </motion.a>
      </div>
    </aside>
  );
}
