import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const fallbackGalleryCategories = [
  {
    title: 'Dekit Stationery',
    description: 'High-quality office stationery, from paper and notebooks to robust office equipment.',
    images: [
      { src: '/dekit_stationery_1.webp', alt: 'Premium Office Stationery' },
      { src: '/dekit_stationery_2.webp', alt: 'Organizing Solutions' },
      { src: '/dekit_stationery_3.webp', alt: 'Notebooks & Paper' },
      { src: '/dekit_stationery_4.webp', alt: 'Pens & Writing Tools' },
      { src: '/dekit_stationery_5.webp', alt: 'Wholesale Office Supplies' },
      { src: '/dekit_stationery_6.webp', alt: 'Filing & Folders' },
      { src: '/dekit_stationery_7.webp', alt: 'Desk Accessories' },
      { src: '/dekit_stationery_8.webp', alt: 'Bulk Stationery Packs' },
      { src: '/dekit_stationery_9.webp', alt: 'Calculators & Tools' },
      { src: '/dekit_stationery_10.webp', alt: 'Complete Office Kits' }
    ]
  },
  {
    title: 'Dekit Slippers',
    description: 'Therapeutic, non-slip, and indoor slippers designed for everyday wellness.',
    images: [
      { src: '/dekit_slipper_2.webp', alt: 'Indoor Slippers' },
      { src: '/dekit_slipper_3.webp', alt: 'Non-slip Soles' },
      { src: '/dekit_slipper_4.webp', alt: 'Therapeutic Footwear' },
      { src: '/dekit_slipper_5.webp', alt: 'Cozy Indoor Slippers' },
      { src: '/dekit_slipper_6.webp', alt: 'Durable Footwear' },
      { src: '/dekit_slipper_7.webp', alt: 'Everyday Indoor Slippers' },
      { src: '/dekit_slipper_8.webp', alt: 'Warm Fit' },
      { src: '/slipper_1.webp', alt: 'Dekit Special' }
    ]
  }
];

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'gallery'), (snapshot) => {
      if (!snapshot.empty) {
        setGalleryItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else {
        setGalleryItems([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const displayCategories = useMemo(() => {
    if (galleryItems.length > 0) {
      const grouped = galleryItems.reduce((acc: any, item: any) => {
        const cat = item.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
      }, {});

      return Object.keys(grouped).map(cat => ({
        title: cat,
        description: `Explore our collection of ${cat}.`,
        images: grouped[cat]
      })).sort((a, b) => {
        if (a.title.includes('Stationery')) return -1;
        if (b.title.includes('Stationery')) return 1;
        if (a.title.includes('Slippers')) return -1;
        if (b.title.includes('Slippers')) return 1;
        return 0;
      });
    }
    return fallbackGalleryCategories;
  }, [galleryItems]);
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Product Gallery</h1>
          <p className="text-lg text-slate-600">
            Explore our wide range of products. From essential office stationery to specialized indoor slippers, we provide high-quality solutions for your needs.
          </p>
        </div>

        {/* Gallery Sections */}
        <div className="space-y-24">
          {displayCategories.map((category: any, catIndex: number) => (
            <div key={catIndex}>
              <div className="mb-10 text-center sm:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{category.title}</h2>
                <p className="text-slate-600 max-w-2xl">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {category.images.map((image: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                    className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200 border-2 border-transparent hover:border-blue-400 hover:ring-4 hover:ring-blue-400/20 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 cursor-pointer"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h4 className="text-white font-bold text-lg mb-2">{image.alt}</h4>
                        <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
