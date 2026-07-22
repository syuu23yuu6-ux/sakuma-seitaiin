import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { siteContent } from '../config/siteContent';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  const { logoText, telNumber } = siteContent.contacts;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay Background */}
          <motion.div
            data-testid="privacy-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between shrink-0">
              <h2 className="text-lg font-bold text-dark font-display">個人情報保護方針 (プライバシーポリシー)</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                aria-label="閉じる"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="px-8 py-6 overflow-y-auto text-sm text-gray-600 leading-relaxed font-light space-y-6">
              <p>
                {logoText}（以下、「当スクール」といいます。）は、受講生、卒業生、およびお問い合わせいただいた皆様（以下、「お客様」といいます。）からお預かりする個人情報の重要性を認識し、その保護に関する法令を遵守するとともに、以下のプライバシーポリシーに従って適正な管理・運用に努めます。
              </p>

              <div>
                <h3 className="font-bold text-dark mb-2 text-base">1. 個人情報の収集・利用目的</h3>
                <p className="mb-2">当スクールは、お客様の個人情報を以下の目的の範囲内で収集し、適切に利用いたします。</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>資料請求、スクール見学、説明会のご案内および資料の送付</li>
                  <li>受講申し込み手続き、教材の発送、講義運営のための事務連絡</li>
                  <li>アンケート調査、卒業後の進路サポート、各種イベント・セミナー等のご案内</li>
                  <li>当スクールのサービス改善や、お客様からのお問い合わせに対する回答</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-dark mb-2 text-base">2. 個人情報の管理・安全対策</h3>
                <p>
                  当スクールは、お預かりした個人情報の漏洩、紛失、破壊、改ざん、または不正アクセスを防止するため、合理的な安全管理措置を実施し、適切な監督の下で厳重に管理いたします。
                </p>
              </div>

              <div>
                <h3 className="font-bold text-dark mb-2 text-base">3. 第三者への開示・提供の禁止</h3>
                <p className="mb-2">当スクールは、お預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>お客様ご本人の同意がある場合</li>
                  <li>お客様が希望されるサービスを行なうために当スクールが業務を委託する業者に対して開示する場合</li>
                  <li>法令に基づき開示することが必要である場合</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-dark mb-2 text-base">4. 個人情報の照会・修正・削除</h3>
                <p>
                  お客様がご本人の個人情報の照会・修正・削除などをご希望される場合には、ご本人であることを確認の上、速やかに対応させていただきます。
                </p>
              </div>

              <div>
                <h3 className="font-bold text-dark mb-2 text-base">5. 法令、規範の遵守と見直し</h3>
                <p>
                  当スクールは、保有する個人情報に関して適用される日本の法令、その他規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="font-bold text-dark mb-1">【個人情報に関するお問い合わせ窓口】</h4>
                <p>{logoText}</p>
                <p>電話番号：{telNumber}（受付時間：スクール営業時間に準ずる）</p>
              </div>
            </div>

            {/* Footer button */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/95 transition-colors text-xs cursor-pointer"
                aria-label="閉じる"
              >
                閉じる
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
