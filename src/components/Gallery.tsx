import { motion } from 'motion/react';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Comfort Footwear',
    category: 'Dekit Slippers',
  },
  {
    src: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Office Stationery',
    category: 'Dekit Stationers',
  },
  {
    src: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Therapeutic Slippers',
    category: 'Dekit Slippers',
  },
  {
    src: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Bulk Paper Supplies',
    category: 'Dekit Stationers',
  },
  {
    src: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Non-slip Soles',
    category: 'Dekit Slippers',
  },
  {
    src: 'https://images.unsplash.com/photo-1503694978374-8a2fa686963a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Writing Instruments',
    category: 'Dekit Stationers',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">Our Work</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Gallery</h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            A glimpse into our high-quality products, from specialized comfort footwear to essential office stationery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden aspect-square bg-slate-200"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-blue-300 text-sm font-medium mb-1">{image.category}</span>
                <h4 className="text-white font-bold text-lg">{image.alt}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
