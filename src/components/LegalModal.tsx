import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { siteContent } from '../config/siteContent';

interface LegalModalProps {
  isOpen: boolean;
  type: 'tokusho' | 'guarantee';
  onClose: () => void;
}

export function LegalModal({ isOpen, type, onClose }: LegalModalProps) {
  const { logoText, address, telNumber } = siteContent.contacts;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay Background */}
          <motion.div
            data-testid="legal-overlay"
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
              <h2 className="text-lg font-bold text-dark font-display">
                {type === 'tokusho' ? '特定商取引法に基づく表記' : '保証制度の適用条件細則'}
              </h2>
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
              {type === 'tokusho' ? (
                // 特定商取引法に基づく表記
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="font-bold text-dark mb-1">運営事業者</h3>
                    <p>{logoText}</p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="font-bold text-dark mb-1">運営責任者</h3>
                    <p>佐久間 邦浩</p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="font-bold text-dark mb-1">所在地</h3>
                    <p>{address}</p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="font-bold text-dark mb-1">お問い合わせ先</h3>
                    <p>電話番号：{telNumber}</p>
                    <p>メールアドレス：syuu23yuu6@gmail.com</p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="font-bold text-dark mb-1">役務の対価</h3>
                    <p>施術メニュー・料金ページに記載の通り（回数券を含む）。</p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="font-bold text-dark mb-1">お支払い方法とお支払いの時期</h3>
                    <p>店頭での現金払い、クレジットカード決済、電子マネー、QRコード決済。施術完了時または回数券等の購入時にお支払いいただきます。</p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="font-bold text-dark mb-1">キャンセルについて</h3>
                    <p>
                      ご予約の変更・キャンセルは、前日の営業時間内までにご連絡をお願いしております。やむを得ない事情を除き、無断キャンセルの場合は施術料金の100%をキャンセル料として申し受ける場合がございます。
                    </p>
                  </div>
                </div>
              ) : (
                // 保証制度の適用条件細則
                <div className="space-y-4">
                  <p>
                    当院で提供している「初回施術全額返金保証」の適用に関する具体的な細則は以下の通りです。皆様に安心して施術を受けていただくための制度となります。
                  </p>
 
                  <div>
                    <h3 className="font-bold text-dark mb-1 text-base">1. 対象と保証内容</h3>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                      <li><strong>初回施術全額返金保証</strong>：当院の施術を初めて受けるお客様を対象とし、初回の施術にご満足いただけなかった場合、初回施術料を全額返金いたします。</li>
                    </ul>
                  </div>
 
                  <div>
                    <h3 className="font-bold text-dark mb-1 text-base">2. 適用条件</h3>
                    <ul className="list-disc list-inside space-y-1 pl-2 mb-2">
                      <li>初回施術終了から24時間以内に、お電話またはメールにて返金希望の旨をご連絡いただくこと。</li>
                      <li>お名前、施術日時、ご不満点および返金口座情報をお知らせいただくこと。</li>
                      <li>初回カウンセリング時にご説明したアドバイスや、セルフケアに関する指導を全く実行する意思がないと判断される場合は適用外となることがあります。</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-dark mb-1 text-base">3. 保証の適用除外について</h3>
                    <p>
                      同業者、冷やかし目的のご来院、または明らかな虚偽の申告があった場合は、本保証制度の適用対象外とさせていただきます。
                    </p>
                  </div>
                </div>
              )}
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
