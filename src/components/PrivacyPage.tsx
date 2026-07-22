import { motion } from 'framer-motion';

export function PrivacyPage() {
  return (
    <div className="pt-28 pb-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-primary/10"
        >
          <div className="text-center mb-10">
            <span className="text-accent font-bold tracking-widest text-xs block mb-2">PRIVACY POLICY</span>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-dark">プライバシーポリシー</h1>
            <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
          </div>

          <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-8 font-light">
            <p>
              さくま整体院（以下「当院」）は、以下のとおり個人情報保護方針を定め、個人情報保護の仕組みを構築し、全従業員に個人情報保護の重要性の認識と取組みを徹底させることにより、個人情報の保護を推進致します。
            </p>

            <section>
              <h2 className="text-lg font-bold text-dark mb-3 border-l-4 border-primary pl-3">個人情報の管理</h2>
              <p>
                当院は、お客さまの個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、セキュリティシステムの維持・管理体制の整備・院員教育の徹底等の必要な措置を講じ、安全対策を実施し個人情報の厳重な管理を行ないます。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-dark mb-3 border-l-4 border-primary pl-3">個人情報の利用目的</h2>
              <p>
                お客さまからお預かりした個人情報は、当院からのご連絡や業務のご案内やご質問に対する回答として、電子メールや資料のご送付に利用いたします。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-dark mb-3 border-l-4 border-primary pl-3">個人情報の第三者への開示・提供の禁止</h2>
              <p>
                当院は、お客さまよりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                <li>お客さまの同意がある場合</li>
                <li>お客さまが希望されるサービスを行なうために当院が業務を委託する業者に対して開示する場合</li>
                <li>法令に基づき開示することが必要である場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-dark mb-3 border-l-4 border-primary pl-3">個人情報の安全対策</h2>
              <p>
                当院は、個人情報の正確性及び安全性確保のために、セキュリティに万全の対策を講じています。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-dark mb-3 border-l-4 border-primary pl-3">ご本人の照会</h2>
              <p>
                お客さまがご本人の個人情報の照会・修正・削除などをご希望される場合には、ご本人であることを確認の上、対応させていただきます。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-dark mb-3 border-l-4 border-primary pl-3">法令、規範の遵守と見直し</h2>
              <p>
                当院は、保有する個人情報に関して適用される日本の法令、その他規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。
              </p>
            </section>

            <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mt-10">
              <h2 className="text-base font-bold text-dark mb-3">お問い合わせ</h2>
              <p className="text-xs md:text-sm">当院の個人情報の取扱に関するお問い合せは下記までご連絡ください。</p>
              <address className="not-italic mt-3 text-xs md:text-sm space-y-1 font-medium text-dark">
                <p>運営：さくま整体院</p>
                <p>住所：大阪府茨木市天王2-9-12 スミエール21 1階</p>
                <p>電話番号：050-8881-4880</p>
              </address>
            </section>
          </div>

          <div className="text-center mt-12">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block px-8 py-3.5 border border-primary text-primary rounded-full font-bold tracking-widest hover:bg-primary/5 transition-all text-sm"
            >
              ホームに戻る
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
