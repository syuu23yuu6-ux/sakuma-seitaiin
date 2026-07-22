import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { siteContent } from '../config/siteContent';

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CampaignModal({ isOpen, onClose }: CampaignModalProps) {
  const { campaignTitle, campaignDesc, campaignDeadline } = siteContent.campaign;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
          />
          {/* Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-white rounded-3xl max-w-lg w-full p-8 md:p-10 shadow-2xl z-10 border border-gold/10"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-dark transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-serif font-bold text-dark mb-6 whitespace-pre-wrap">
              {campaignTitle}
            </h2>
            <div className="text-gray-600 space-y-4 mb-8 leading-relaxed">
              <p className="text-sm font-light whitespace-pre-wrap">
                {campaignDesc}
              </p>
              {campaignDeadline && (
                <p className="text-xs text-primary font-bold">
                  【期限】{campaignDeadline}
                </p>
              )}
            </div>
            
            <a
              href={siteContent.contacts.ekitenRsvUrl}
              onClick={onClose}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 bg-primary text-white text-center rounded-xl font-bold tracking-widest hover:bg-primary/90 transition-colors shadow-md text-sm md:text-base"
            >
              今すぐ予約する
            </a>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
