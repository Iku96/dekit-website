import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { getSmartCategory, OFFICIAL_CATEGORIES } from '../utils/categoryMapper';

export const fallbackGalleryCategories = [
  {
    title: 'ORGANIZERS',
    description: 'Smart solutions for a tidy and efficient workspace.',
    images: [{ src: '/dekit_stationery_2.webp', alt: 'Organizing Solutions' }, { src: '/dekit_stationery_7.webp', alt: 'Desk Accessories' }]
  },
  {
    title: 'STORAGE & FILLING',
    description: 'Secure and accessible filing systems for every document.',
    images: [{ src: '/dekit_stationery_6.webp', alt: 'Filing & Folders' }, { src: '/dekit_stationery_8.webp', alt: 'Bulk Stationery Packs' }]
  },
  {
    title: 'PAPERS STATIONERY',
    description: 'Premium paper solutions for printing, writing, and commercial use.',
    images: [{ src: '/dekit_stationery_3.webp', alt: 'Notebooks & Paper' }, { src: '/dekit_stationery_1.webp', alt: 'Premium Office Stationery' }]
  },
  {
    title: 'WRITING STATIONERY',
    description: 'Precision tools for handwriting and professional marking.',
    images: [{ src: '/dekit_stationery_4.webp', alt: 'Pens & Writing Tools' }]
  },
  {
    title: 'OTHER STATIONERIES',
    description: 'Essential office tools and specialized accessories.',
    images: [{ src: '/dekit_stationery_5.webp', alt: 'Wholesale Office Supplies' }, { src: '/dekit_stationery_9.webp', alt: 'Calculators & Tools' }, { src: '/dekit_stationery_10.webp', alt: 'Complete Office Kits' }]
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
    // Build a set of src values that are already in the database
    const dbSrcSet = new Set(galleryItems.map(item => item.src));

    // Start with all database items
    const allItems = [...galleryItems];

    // Add fallback items that aren't already in the database
    fallbackGalleryCategories.forEach(category => {
      category.images.forEach(img => {
        if (!dbSrcSet.has(img.src)) {
          allItems.push({ src: img.src, alt: img.alt, category: category.title });
        }
      });
    });

    // Map each item to its smart category and filter hidden ones
    const mappedItems = allItems.map(item => {
      const smartCat = getSmartCategory(item.alt || item.name || '', item.category || '');
      return { ...item, smartCategory: smartCat };
    }).filter(item => item.smartCategory !== null);

    // Group items by their smart category
    const grouped = mappedItems.reduce((acc: any, item: any) => {
      const cat = item.smartCategory;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {});

    return Object.keys(grouped).map(cat => ({
      title: cat,
      description: `Explore our collection of ${cat}.`,
      images: grouped[cat]
    })).sort((a, b) => OFFICIAL_CATEGORIES.indexOf(a.title) - OFFICIAL_CATEGORIES.indexOf(b.title));
  }, [galleryItems]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Product Gallery</h1>
          <p className="text-lg text-slate-600">
            Explore our wide range of products. From essential office stationery to comprehensive business solutions, we provide high-quality tools for your needs.
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
