import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Compass, Briefcase, CheckCircle2 } from 'lucide-react';

// You can easily change these images in the future by updating the URLs below
const centerSlideshowImages = [
  "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
];

const galleryImages = [
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Top Left
  "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Top Right
  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Bottom Left
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Bottom Right
];

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % centerSlideshowImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, []);
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
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h4>
                  <p className="text-slate-600 leading-relaxed">To provide high-quality products and exceptional service that empower businesses to thrive.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600">
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
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={currentSlide}
                        src={centerSlideshowImages[currentSlide]} 
                        alt="Gallery Center Slideshow" 
                        className="absolute inset-0 w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
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
                className="absolute -bottom-6 -left-6 sm:-left-10 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 z-40"
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
