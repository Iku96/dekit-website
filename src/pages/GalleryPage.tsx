import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const fallbackGalleryCategories = [
  {
    title: 'Organizers, Storage & Filling',
    description: 'Keep your workspace tidy with our premium desk organizers, file boxes, and document trays.',
    images: [
      { src: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=800&q=80', alt: 'Metal Desk Organizer' },
      { src: 'https://images.unsplash.com/photo-1585408463514-996160166271?auto=format&fit=crop&w=800&q=80', alt: 'Filing and Folders' },
      { src: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=800&q=80', alt: 'Work Desk Storage' },
      { src: 'https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&w=800&q=80', alt: 'Ring Binders & Shelves' },
      { src: 'https://images.unsplash.com/photo-1568225367111-44052cb6b221?auto=format&fit=crop&w=800&q=80', alt: 'Office Cabinets' },
      { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80', alt: 'Document Trays' },
    ]
  },
  {
    title: 'Paper & Notebooks',
    description: 'High-quality A4 reams, photo paper, spiral notebooks, and ledgers for all your documentation needs.',
    images: [
      { src: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=80', alt: 'Stack of Notebooks' },
      { src: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80', alt: 'Bulk Paper Supplies' },
      { src: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80', alt: 'Open Spiral Notebook' },
      { src: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80', alt: 'Blank Paper & Clipboard' },
      { src: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80', alt: 'Ledgers and Journals' },
      { src: 'https://images.unsplash.com/photo-1603484477859-abe6a73f9366?auto=format&fit=crop&w=800&q=80', alt: 'Sticky Notes & Pads' },
    ]
  },
  {
    title: 'Writing & Pin Stationery',
    description: 'Professional pens, markers, highlighters, clips, and pins to keep your ideas flowing.',
    images: [
      { src: 'https://images.unsplash.com/photo-1503694978374-8a2fa686963a?auto=format&fit=crop&w=800&q=80', alt: 'Premium Pens and Markers' },
      { src: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=800&q=80', alt: 'Paper Clips and Pins' },
      { src: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80', alt: 'Assorted Pencils' },
      { src: 'https://images.unsplash.com/photo-1520085601670-ee14aa5fa3e8?auto=format&fit=crop&w=800&q=80', alt: 'Highlighters & Colors' },
      { src: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=800&q=80', alt: 'Executive Pens' },
      { src: 'https://images.unsplash.com/photo-1596443686812-2f45229eebc3?auto=format&fit=crop&w=800&q=80', alt: 'Writing Instruments' },
    ]
  },
  {
    title: 'Machine & Whiteboard Accessories',
    description: 'Heavy-duty staplers, punchers, laminators, and essential whiteboard supplies.',
    images: [
      { src: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=800&q=80', alt: 'Calculators & Tools' },
      { src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80', alt: 'Whiteboard Markers' },
      { src: 'https://images.unsplash.com/photo-1528747008803-f9f5cc8f1a64?auto=format&fit=crop&w=800&q=80', alt: 'Staplers & Punchers' },
      { src: 'https://images.unsplash.com/photo-1598791318878-10e76d178023?auto=format&fit=crop&w=800&q=80', alt: 'Office Equipment' },
      { src: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80', alt: 'Printers & Laminators' },
      { src: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=800&q=80', alt: 'Whiteboard Erasers' },
    ]
  },
  {
    title: 'Dekit Slippers',
    description: 'Therapeutic, non-slip, and comfort footwear designed for everyday wellness.',
    images: [
      { src: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80', alt: 'Comfort Slippers' },
      { src: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80', alt: 'Non-slip Soles' },
      { src: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=800&q=80', alt: 'Therapeutic Footwear' },
      { src: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80', alt: 'Cozy Indoor Slippers' },
      { src: 'https://images.unsplash.com/photo-1573309463318-c2b40e32626e?auto=format&fit=crop&w=800&q=80', alt: 'Durable Footwear' },
      { src: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80', alt: 'Everyday Comfort' },
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
      }));
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
            Explore our wide range of products. From essential office stationery to specialized comfort footwear, we provide high-quality solutions for your needs.
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
