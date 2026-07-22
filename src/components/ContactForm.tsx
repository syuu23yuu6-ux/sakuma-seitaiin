import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../config/siteContent';

interface ContactFormProps {}

export function ContactForm({}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    kana: '',
    email: '',
    tel: '',
    symptom: '',
    menu: '',
    preferredDate: '',
    message: '',
    policy: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(formData.name && formData.kana && formData.email && formData.symptom && formData.menu && formData.policy)) {
      return;
    }

    const gasUrl = import.meta.env.VITE_GAS_URL;
    if (gasUrl && gasUrl !== 'undefined' && gasUrl !== 'null' && gasUrl.trim() !== '') {
      setIsSubmitting(true);
      try {
        await fetch(gasUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify({
            name: formData.name,
            kana: formData.kana,
            email: formData.email,
            tel: formData.tel,
            symptom: formData.symptom,
            menu: formData.menu,
            preferredDate: formData.preferredDate,
            message: formData.message,
          }),
        });
        setIsSubmitted(true);
      } catch (error) {
        console.error('Form submission error:', error);
        setIsSubmitted(true);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const { telNumber } = siteContent.contacts;

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 bg-soft">
        <div className="container mx-auto px-4 max-w-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-primary/10 text-center shadow-lg"
          >
            <h2 className="text-2xl font-display font-bold text-dark mb-4">送信が完了しました</h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light mb-6">
              ご予約・お問合せいただきありがとうございます。内容を確認の上、折り返しご連絡いたします。
            </p>
            <button
              onClick={() => {
                setFormData({
                  name: '',
                  kana: '',
                  email: '',
                  tel: '',
                  symptom: '',
                  menu: '',
                  preferredDate: '',
                  message: '',
                  policy: false
                });
                setIsSubmitted(false);
              }}
              className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/95 transition-colors text-sm cursor-pointer"
            >
              閉じる
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-soft">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-bold tracking-widest text-sm mb-2"
          >
            RESERVE & CONTACT
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold text-dark"
          >
            ネット予約・お問い合わせ
          </motion.h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        {/* Tel Board */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 border border-primary/10 shadow-lg mb-8 text-center max-w-xl mx-auto"
        >
          <h3 className="text-lg font-display font-bold text-dark mb-4">お電話でのご連絡</h3>
          <p className="text-gray-500 text-xs md:text-sm font-light mb-6">
            ご予約やご相談は、お電話からも承っております。
          </p>
          {/* Phone */}
          <a
            href={`tel:${telNumber.replace(/-/g, '')}`}
            className="block p-6 bg-soft hover:bg-primary/5 rounded-2xl border border-primary/5 transition-colors cursor-pointer group"
          >
            <span className="text-xs text-accent font-bold mb-2 block group-hover:text-primary transition-colors">お電話でのご予約・お問合せ</span>
            <span className="text-2xl md:text-3xl font-extrabold text-dark tracking-wider block">{telNumber}</span>
            <span className="text-xxs text-gray-400 mt-2 block">受付時間：9:00〜13:00 / 14:00〜20:00（水曜・第2日曜定休）</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 border border-primary/10 shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="frm-name" className="block text-sm font-bold text-dark mb-2">
                お名前 <span className="text-accent text-xs ml-1">*必須</span>
              </label>
              <input
                type="text"
                id="frm-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="例：山田 花子"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label htmlFor="frm-kana" className="block text-sm font-bold text-dark mb-2">
                フリガナ <span className="text-accent text-xs ml-1">*必須</span>
              </label>
              <input
                type="text"
                id="frm-kana"
                name="kana"
                value={formData.kana}
                onChange={handleChange}
                required
                placeholder="例：ヤマダ ハナコ"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label htmlFor="frm-email" className="block text-sm font-bold text-dark mb-2">
                メールアドレス <span className="text-accent text-xs ml-1">*必須</span>
              </label>
              <input
                type="email"
                id="frm-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="例：mail@example.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label htmlFor="frm-tel" className="block text-sm font-bold text-dark mb-2">
                電話番号 <span className="text-gray-400 text-xs font-light ml-1">任意</span>
              </label>
              <input
                type="tel"
                id="frm-tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                placeholder="例：090-1234-5678"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label htmlFor="frm-symptom" className="block text-sm font-bold text-dark mb-2">
                お悩みの症状 <span className="text-accent text-xs ml-1">*必須</span>
              </label>
              <div className="relative">
                <select
                  id="frm-symptom"
                  name="symptom"
                  value={formData.symptom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option value="" disabled>選択してください</option>
                  <option value="肩こり">肩こり</option>
                  <option value="腰痛">腰痛</option>
                  <option value="頭痛">頭痛</option>
                  <option value="しびれ">しびれ</option>
                  <option value="姿勢・ゆがみ">姿勢・ゆがみ</option>
                  <option value="その他">その他</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="frm-menu" className="block text-sm font-bold text-dark mb-2">
                ご希望のメニュー <span className="text-accent text-xs ml-1">*必須</span>
              </label>
              <div className="relative">
                <select
                  id="frm-menu"
                  name="menu"
                  value={formData.menu}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option value="" disabled>選択してください</option>
                  {siteContent.menus.map(m => (
                    <option key={m.id} value={m.title}>{m.title}</option>
                  ))}
                  <option value="その他・相談して決める">その他・相談して決める</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="frm-preferredDate" className="block text-sm font-bold text-dark mb-2">
                ご希望の日時 <span className="text-gray-400 text-xs font-light ml-1">任意</span>
              </label>
              <input
                type="text"
                id="frm-preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                placeholder="例：第一希望: 6月20日 10:00頃、第二希望: 6月21日 午後"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label htmlFor="frm-message" className="block text-sm font-bold text-dark mb-2">
                ご質問・ご要望など <span className="text-gray-400 text-xs font-light ml-1">任意</span>
              </label>
              <textarea
                id="frm-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="お身体の状況で気になることなどがあればご記入ください。"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="frm-policy"
                name="policy"
                checked={formData.policy}
                onChange={handleChange}
                required
                className="mt-1"
              />
              <label htmlFor="frm-policy" className="text-xs text-gray-500 leading-relaxed font-light">
                <a
                  href="/privacy_policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-bold"
                >
                  プライバシーポリシー
                </a>
                に同意する
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 bg-primary text-white text-center rounded-xl font-bold tracking-widest hover:bg-primary/95 transition-colors shadow-md text-sm md:text-base cursor-pointer btn-shimmer ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? '送信中...' : '入力内容を確認する'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
