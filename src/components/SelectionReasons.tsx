import { motion } from 'framer-motion';
import { siteContent } from '../config/siteContent';
import { Award, Heart, Clock } from 'lucide-react';

const iconMap = {
  award: Award,
  handshake: Heart,
  clock: Clock,
};

export function SelectionReasons() {
  const { reasons } = siteContent.selectionReasons;
  const { logoText } = siteContent.contacts;

  return (
    <section id="reasons" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-bold tracking-widest text-sm mb-2"
          >
            WHY US
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold text-dark leading-tight"
          >
            {logoText}が選ばれる3つの理由
          </motion.h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = iconMap[reason.iconType] || Award;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col h-full"
              >
                {/* Image & Icon Overlay */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={reason.image}
                    alt={reason.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white p-3 rounded-2xl shadow-md">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-primary tracking-wider uppercase block mb-2 whitespace-nowrap">
                      REASON 0{index + 1}
                    </span>
                    <h3 className="text-xl font-bold text-dark mb-4 leading-snug">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
