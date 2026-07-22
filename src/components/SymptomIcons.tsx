import { motion } from 'framer-motion';
import { Activity, Heart, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

interface Symptom {
  name: string;
  keyword: string;
  lpId: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
}

const symptoms: Symptom[] = [
  { name: '肩こり', keyword: '肩こり', lpId: 'lp1', icon: Activity, desc: '頑固な肩の緊張と重みを緩和' },
  { name: '腰痛', keyword: '腰痛', lpId: 'lp2', icon: ShieldAlert, desc: '日常生活に支障をきたす腰の痛みに' },
  { name: '頭痛', keyword: '頭痛', lpId: 'lp7', icon: Sparkles, desc: '目の奥の痛みや慢性的な頭の重さ' },
  { name: 'しびれ', keyword: 'しびれ', lpId: 'lp5', icon: HelpCircle, desc: '手先や足の慢性的なしびれ感' },
  { name: '姿勢・ゆがみ', keyword: '姿勢', lpId: 'lp9', icon: Heart, desc: '骨盤のゆがみや猫背の根本改善' }
];

export function SymptomIcons() {
  const handleSymptomClick = (lpId: string) => {
    // SPA遷移: 症状別LPへ
    window.history.pushState({}, '', `/lp/${lpId}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-soft/50 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary font-bold tracking-widest text-xs uppercase"
          >
            Symptom Treatment
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold font-display mt-2 text-dark"
          >
            このような症状でお悩みではありませんか？
          </motion.h2>
          <div className="w-12 h-1 bg-accent mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {symptoms.map((symptom, index) => {
            const IconComponent = symptom.icon;
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                onClick={() => handleSymptomClick(symptom.lpId)}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-primary/5 text-center flex flex-col items-center justify-between transition-all duration-300 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-soft text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <IconComponent className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-dark mb-2 group-hover:text-primary transition-colors">
                    {symptom.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    {symptom.desc}
                  </p>
                </div>
                <div className="mt-4 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  詳しく見る ➔
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
