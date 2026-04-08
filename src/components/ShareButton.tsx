import { useState } from 'react';
import { Share2, Copy, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: 'Dekit Traders - Stationery & Office Supplies',
    text: 'Check out Dekit Traders for premium office stationery and supply solutions in Tanzania.',
    url: window.location.origin
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareData.url).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 2000);
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xl flex flex-col gap-3 min-w-[200px]"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Share Website</span>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group w-full"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </div>
              <span className="text-sm font-medium text-slate-700">
                {copied ? 'Link Copied!' : 'Copy Link'}
              </span>
            </button>

            {/* WhatsApp Fallback */}
            <a 
              href={`https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors group w-full"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.43 0 9.856-4.426 9.858-9.855.002-5.43-4.425-9.856-9.855-9.856-5.431 0-9.856 4.426-9.858 9.855-.001 1.902.482 3.86 1.398 5.585l-.973 3.548 3.644-.956zm11.411-5.405c-.324-.162-1.916-.946-2.213-1.054-.297-.107-.513-.162-.729.162-.216.324-.837 1.054-1.026 1.27-.189.216-.378.243-.702.081-.324-.162-1.368-.504-2.607-1.61-.963-.859-1.613-1.921-1.802-2.245-.189-.324-.02-.499.141-.659.145-.145.324-.378.486-.567.162-.189.216-.324.324-.54.108-.216.054-.405-.027-.567-.081-.162-.729-1.756-.999-2.405-.262-.634-.53-.549-.729-.559-.189-.009-.405-.011-.621-.011s-.567.081-.865.405c-.297.324-1.135 1.108-1.135 2.703 0 1.594 1.162 3.134 1.324 3.35.162.216 2.288 3.494 5.542 4.9.774.335 1.378.535 1.849.684.777.247 1.485.212 2.044.129.623-.092 1.916-.784 2.187-1.54.27-.756.27-1.405.189-1.54-.081-.135-.297-.216-.621-.378z"/>
                  </svg>
                </motion.div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 leading-none">WhatsApp</span>
                <span className="text-[10px] text-slate-500 mt-1">Share with contacts</span>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShare}
        className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/30 border border-white/20 hover:bg-blue-700 transition-colors"
      >
        <Share2 className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
