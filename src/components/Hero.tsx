import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, PackageOpen, ShieldCheck, TrendingUp, Sparkles, Layers } from 'lucide-react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const fallbackHeroImages = [
  {
    url: "/dekit slippers.png",
    alt: "Comfortable Footwear and Slippers"
  },
  {
    url: "/slipper 1.png",
    alt: "Premium Comfort Slippers"
  },
  {
    url: "/dekit slipper 4.png",
    alt: "Dekit Therapeutic Footwear"
  }
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroImages, setHeroImages] = useState(fallbackHeroImages);

  useEffect(() => {
    const q = query(collection(db, 'gallery'), where('category', '==', 'Hero'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setHeroImages(snapshot.docs.map(doc => ({
          url: doc.data().src,
          alt: doc.data().alt || 'Hero Image'
        })));
      } else {
        setHeroImages(fallbackHeroImages);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[#030303]">
      {/* Deep Space Glowing Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50 pointer-events-none"></div>

      {/* Floating 3D-like Abstract Shapes */}
      <motion.div 
        animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-md border border-white/10 backdrop-blur-3xl z-0"
      />
      <motion.div 
        animate={{ y: [20, -20, 20], rotate: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-gradient-to-tr from-cyan-400/10 to-blue-600/10 rounded-2xl blur-sm border border-white/10 backdrop-blur-2xl z-0 transform rotate-12"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 text-blue-300 text-sm font-medium mb-8 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Premium B2B Supply
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tighter mb-6 leading-[1.05]">
              Equip Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                Workspace
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-xl font-light">
              Dekit Traders streamlines the supply chain, prioritizing quality and reliability to ensure high-standard products reach you with efficiency and integrity.
            </p>
            
            <div className="flex flex-wrap items-center gap-5">
              <a
                href="#services"
                className="group relative inline-flex items-center justify-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                Explore Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full font-semibold hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md"
              >
                Contact Us
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-blue-400 backdrop-blur-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-white font-semibold">Quality Assured</div>
                  <div className="text-sm text-slate-400">100% Verified</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-indigo-400 backdrop-blur-sm">
                  <PackageOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-white font-semibold">Reliable Supply</div>
                  <div className="text-sm text-slate-400">On-time Delivery</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: -5, y: [0, -15, 0] }}
            transition={{ 
              opacity: { duration: 1, delay: 0.2, ease: "easeOut" },
              scale: { duration: 1, delay: 0.2, ease: "easeOut" },
              rotateY: { duration: 1, delay: 0.2, ease: "easeOut" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative lg:ml-auto w-full max-w-2xl perspective-1000"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            {/* Realistic Tablet */}
            <div className="relative w-full aspect-[4/3] bg-[#1a1a1a] rounded-[2rem] sm:rounded-[2.5rem] p-3 sm:p-4 shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.1)] transform-gpu border border-white/5">
              
              {/* Tablet Screen */}
              <div className="relative w-full h-full bg-black rounded-[1.25rem] sm:rounded-[1.75rem] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={heroImages[currentImageIndex].url}
                    alt={heroImages[currentImageIndex].alt}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="w-full h-full object-cover absolute inset-0 opacity-90"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                
                {/* Overlay Gradient for Image Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-[#030712]/20 to-transparent"></div>
                
                {/* Image Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20">
                  <motion.div 
                    key={`text-${currentImageIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{heroImages[currentImageIndex].alt}</h3>
                    <div className="flex items-center gap-2 text-blue-300 text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      High Demand
                    </div>
                  </motion.div>
                </div>

                {/* Slider Indicators inside screen */}
                <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-6 flex flex-col gap-3 z-30">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-1.5 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-blue-400 h-8 shadow-[0_0_10px_rgba(96,165,250,0.8)]' : 'bg-white/40 h-3 hover:bg-white/80'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Tablet UI: Home Indicator (Bottom) */}
                <div className="absolute bottom-2 inset-x-0 flex justify-center z-30">
                  <div className="w-1/3 h-1 sm:h-1.5 bg-white/40 rounded-full backdrop-blur-md"></div>
                </div>
              </div>
              
              {/* Tablet UI: Camera (Top Bezel) */}
              <div className="absolute left-1/2 top-1.5 sm:top-2 -translate-x-1/2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]"></div>
                <div className="w-1 h-1 bg-green-500/50 rounded-full shadow-[0_0_4px_rgba(34,197,94,0.8)]"></div>
              </div>
              
              {/* Tablet UI: Volume/Power Buttons (Edges) */}
              <div className="absolute top-16 -left-[2px] w-[2px] h-10 bg-[#444] rounded-l-sm"></div>
              <div className="absolute top-32 -left-[2px] w-[2px] h-10 bg-[#444] rounded-l-sm"></div>
              <div className="absolute top-12 -right-[2px] w-[2px] h-14 bg-[#444] rounded-r-sm"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
