import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Compass, Briefcase, CheckCircle2 } from 'lucide-react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';

// You can easily change these images in the future by updating the URLs below
const fallbackCenterSlideshowImages = [
  "/dekit_stationery_3.webp",
  "/dekit_stationery_4.webp",
  "/dekit_slipper_3.webp",
  "/dekit_stationery_6.webp"
];

const fallbackGalleryImages = [
  "/dekit_stationery_7.webp", // Top Left
  "/dekit_stationery_8.webp", // Top Right
  "/dekit_stationery_9.webp", // Bottom Left
  "/dekit_slipper_7.webp", // Bottom Right
];

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [centerSlideshowImages, setCenterSlideshowImages] = useState(fallbackCenterSlideshowImages);
  const [galleryImages, setGalleryImages] = useState(fallbackGalleryImages);

  useEffect(() => {
    const q = query(collection(db, 'gallery'), where('category', '==', 'About'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const images = snapshot.docs.map(doc => doc.data().src);
        if (images.length >= 4) {
          setGalleryImages(images.slice(0, 4));
          if (images.length > 4) {
            setCenterSlideshowImages(images.slice(4));
          } else {
            setCenterSlideshowImages(images);
          }
        } else {
          setCenterSlideshowImages(images);
          setGalleryImages(fallbackGalleryImages);
        }
      } else {
        setCenterSlideshowImages(fallbackCenterSlideshowImages);
        setGalleryImages(fallbackGalleryImages);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % centerSlideshowImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, [centerSlideshowImages.length]);
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Dot Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold tracking-widest uppercase mb-6">
              About Us
            </div>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-[1.1]">
              Bridging the gap between <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                producers & consumers
              </span>
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Dekit Traders is a solution-oriented enterprise dedicated to streamlining the supply chain. By prioritizing quality and reliability, we ensure that high-standard products reach the end-user with efficiency and integrity.
            </p>

            <div className="bg-blue-50/50 border border-blue-200/50 p-6 rounded-2xl mb-8 shadow-sm">
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Dekit Traders has been duly registered pursuant to and in accordance with the provisions of the Business Names (Registration) Act and the Rules made thereunder, and has been entered in the Number 624105 in the Index of Registration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Business License No</span>
                  <span className="text-sm font-medium text-slate-900 font-mono">BL01396912025-2600025809</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">TIN No</span>
                  <span className="text-sm font-medium text-slate-900 font-mono">132-007-594</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 text-white shadow-lg shadow-blue-600/20">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h4>
                  <p className="text-slate-600 leading-relaxed">To provide high-quality products and exceptional service that empower businesses to thrive.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 text-white shadow-lg shadow-indigo-600/20">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Our Vision</h4>
                  <p className="text-slate-600 leading-relaxed">Emphasizing long-term client partnerships, operational excellence, and adapting to changing market needs.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative lg:ml-auto w-full max-w-lg"
          >
            {/* Realistic iPad Frame */}
            <div className="relative w-full aspect-[3/4] bg-slate-900 rounded-[2.5rem] p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.2),inset_0_0_0_1px_rgba(255,255,255,0.05)] border border-slate-800">
              
              {/* iPad Screen */}
              <div className="relative w-full h-full bg-black rounded-[1.75rem] overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                
                {/* Image Gallery / Collage */}
                <div className="relative w-full h-full bg-white">
                  {/* Center Hexagon (Slideshow) */}
                  <div 
                    className="absolute inset-0"
                    style={{ clipPath: 'polygon(50% 20%, 80% 35%, 80% 65%, 50% 80%, 20% 65%, 20% 35%)' }}
                  >
                    <AnimatePresence initial={false}>
                      <motion.img 
                        key={currentSlide}
                        src={centerSlideshowImages[currentSlide]} 
                        alt="Gallery Center Slideshow" 
                        className="absolute inset-0 w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    </AnimatePresence>
                  </div>
                  
                  {/* Top Left */}
                  <div 
                    className="absolute inset-0"
                    style={{ clipPath: 'polygon(0% 0%, 49% 0%, 49% 18.5%, 18% 34%, 0% 34%)' }}
                  >
                    <img src={galleryImages[0]} alt="Gallery Top Left" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>

                  {/* Top Right */}
                  <div 
                    className="absolute inset-0"
                    style={{ clipPath: 'polygon(51% 0%, 100% 0%, 100% 34%, 82% 34%, 51% 18.5%)' }}
                  >
                    <img src={galleryImages[1]} alt="Gallery Top Right" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>

                  {/* Bottom Left */}
                  <div 
                    className="absolute inset-0"
                    style={{ clipPath: 'polygon(0% 36%, 18% 36%, 18% 66%, 49% 81.5%, 49% 100%, 0% 100%)' }}
                  >
                    <img src={galleryImages[2]} alt="Gallery Bottom Left" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>

                  {/* Bottom Right */}
                  <div 
                    className="absolute inset-0"
                    style={{ clipPath: 'polygon(100% 36%, 82% 36%, 82% 66%, 51% 81.5%, 51% 100%, 100% 100%)' }}
                  >
                    <img src={galleryImages[3]} alt="Gallery Bottom Right" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none"></div>
                
                {/* iPad UI: Home Indicator (Bottom) */}
                <div className="absolute bottom-2 inset-x-0 flex justify-center z-30">
                  <div className="w-1/3 h-1 sm:h-1.5 bg-white/60 rounded-full backdrop-blur-md"></div>
                </div>
              </div>
              
              {/* iPad UI: Camera (Top Bezel) */}
              <div className="absolute left-1/2 top-1.5 sm:top-2 -translate-x-1/2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-950 rounded-full shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]"></div>
              </div>
              
              {/* iPad UI: Volume/Power Buttons (Edges) */}
              <div className="absolute top-16 -left-[1px] w-[2px] h-10 bg-slate-700 rounded-l-sm"></div>
              <div className="absolute top-32 -left-[1px] w-[2px] h-10 bg-slate-700 rounded-l-sm"></div>
              <div className="absolute top-12 -right-[1px] w-[2px] h-14 bg-slate-700 rounded-r-sm"></div>

              {/* Floating Quality Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 sm:-left-10 bg-white p-5 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-4 z-40"
              >
                <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Quality Assured</div>
                  <div className="text-xs text-slate-500">100% Verified Supply</div>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob -z-10"></div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-cyan-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000 -z-10"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
