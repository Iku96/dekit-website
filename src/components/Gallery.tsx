import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const images = [
  {
    src: '/dekit_stationery_1.webp',
    alt: 'Premium Office Stationery',
    category: 'Dekit Stationery',
  },
  {
    src: '/dekit_stationery_3.webp',
    alt: 'Notebooks & Paper',
    category: 'Dekit Stationery',
  },
  {
    src: '/dekit_slipper_2.webp',
    alt: 'Indoor Slippers',
    category: 'Dekit Slippers',
  }
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-[#030303] relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-3">Our Work</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Gallery</h3>
          <p className="text-lg text-slate-400 leading-relaxed">
            A glimpse into our high-quality products, from specialized indoor slippers to essential office stationery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-[#111827] border border-white/5"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-blue-300 text-xs font-bold tracking-wider uppercase mb-3 w-max border border-white/10">{image.category}</span>
                <h4 className="text-white font-bold text-2xl">{image.alt}</h4>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link 
            to="/gallery" 
            className="inline-flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full font-semibold hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md"
          >
            View Full Gallery
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
