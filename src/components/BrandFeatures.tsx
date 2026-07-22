import { motion } from 'framer-motion';
import { siteContent } from '../config/siteContent';

const features = siteContent.brandFeatures.features;

export function BrandFeatures() {
  const { logoText } = siteContent.contacts;

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-bold tracking-widest text-sm mb-2"
          >
            FEATURES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold text-dark leading-tight break-keep"
          >
            {logoText}ならではの{features.length}つの特徴
          </motion.h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg group">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-6 left-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center font-display font-bold text-xl shadow-md">
                    {feature.number}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-dark mb-6 whitespace-pre-line leading-snug">
                  {feature.title}
                </h3>
                <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed font-light">
                  {feature.desc.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
