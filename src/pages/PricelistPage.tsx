import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Check, ChevronLeft, ChevronRight, Package, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products as fallbackProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { getSmartCategory, OFFICIAL_CATEGORIES } from '../utils/categoryMapper';

export default function PricelistPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [rawProducts, setRawProducts] = useState<any[]>(fallbackProducts.map((p, i) => ({ id: `fallback-${i}`, ...p, name: p.item })));
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      if (!snapshot.empty) {
        setRawProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else {
        setRawProducts(fallbackProducts.map((p, i) => ({ id: `fallback-${i}`, ...p, name: p.item })));
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, itemsPerPage]);

  const products = useMemo(() => {
    return rawProducts.map(p => {
      const smartCat = getSmartCategory(p.name || p.item || '', p.category || '');
      return { ...p, name: p.name || p.item, smartCategory: smartCat };
    }).filter(p => p.smartCategory !== null); // Hide Slippers & Hidden items
  }, [rawProducts]);

  const categories = OFFICIAL_CATEGORIES;

  const filteredProducts = useMemo(() => {
    if (!selectedCategory && !searchTerm) return [];
    
    return products.filter(product => {
      const productName = (product.name || '').toLowerCase();
      const matchesSearch = productName.includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === null || product.smartCategory === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, products]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS' }).format(amount);
  };

  const handleQuantityChange = (productId: string, value: number, moq: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(moq, value)
    }));
  };

  const getQuantity = (product: any) => {
    return quantities[product.id] || product.moq;
  };

  const handleAddToCart = (product: any) => {
    const qty = getQuantity(product);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      moq: product.moq,
      quantity: qty
    });
    
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            Product Catalog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg"
          >
            Select a category from the filters below to explore our wholesale pricelist.
          </motion.p>
        </div>

        {/* Filter Bar */}
        <div className="sticky top-24 z-30 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-white mb-12 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Quick search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 text-slate-700 placeholder-slate-400 transition-all shadow-inner"
            />
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 text-slate-700 font-bold appearance-none transition-all cursor-pointer shadow-inner"
              >
                <option value="">Select Category (Deselect)</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronRight className="w-4 h-4 text-slate-400 rotate-90" />
              </div>
            </div>

            {(selectedCategory || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm('');
                }}
                className="px-6 py-3.5 bg-white border border-red-100 text-red-500 hover:bg-red-50 rounded-2xl text-sm font-bold transition-all shadow-sm flex items-center gap-2 group"
              >
                <X className="w-4 h-4" />
                Clear Selection
              </button>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          {!selectedCategory && !searchTerm ? (
            /* Empty State */
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-32 text-center"
            >
              <div className="w-24 h-24 bg-blue-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Package className="w-12 h-12 text-blue-500" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-3">Welcome to our Catalog</h2>
              <p className="text-slate-500 text-lg max-w-md mx-auto">
                Please choose a category from the filter above to begin browsing our items and current wholesale rates.
              </p>
            </motion.div>
          ) : (
            /* Product List View */
            <motion.div 
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between px-4 mb-6">
                <h3 className="text-xl font-bold text-slate-800">
                  {selectedCategory || 'Search Results'} 
                  <span className="ml-3 text-sm font-medium text-slate-400">{filteredProducts.length} items</span>
                </h3>
              </div>

              <div className="grid gap-4">
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product) => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider rounded-full">
                              {product.category}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                              <ShoppingCart className="w-3 h-3" /> MOQ: {product.moq} {product.unit}s
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h4>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 md:gap-12">
                          <div className="text-right">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Unit Price</div>
                            <div className="text-xl font-black text-slate-900">
                              {formatCurrency(product.price)}
                              <span className="ml-1 text-xs font-bold text-slate-400 lowercase">/ {product.unit}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bulk Value</div>
                            <div className="text-xl font-black text-blue-600">
                              {formatCurrency(product.bulkPrice)}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center bg-slate-100 rounded-2xl p-1 shadow-inner">
                              <button 
                                onClick={() => handleQuantityChange(product.id, getQuantity(product) - product.moq, product.moq)}
                                className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-white hover:text-blue-600 rounded-xl transition-all shadow-none hover:shadow-sm"
                              >
                                -
                              </button>
                              <span className="w-12 text-center text-sm font-black text-slate-900">
                                {Math.floor(getQuantity(product) / product.moq)}
                              </span>
                              <button 
                                onClick={() => handleQuantityChange(product.id, getQuantity(product) + product.moq, product.moq)}
                                className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-white hover:text-blue-600 rounded-xl transition-all shadow-none hover:shadow-sm"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => handleAddToCart(product)}
                              className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all shadow-lg active:scale-95 ${
                                addedItems[product.id] 
                                  ? 'bg-emerald-500 text-white shadow-emerald-200' 
                                  : 'bg-slate-900 text-white hover:bg-blue-600 shadow-slate-200'
                              }`}
                            >
                              {addedItems[product.id] ? <Check className="w-6 h-6 stroke-[3]" /> : <ShoppingCart className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-20 text-center bg-white rounded-[3rem] border border-slate-100 italic text-slate-400">
                    No items found matching your filter...
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-4">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                    disabled={currentPage === 1}
                    className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-2xl text-slate-600 disabled:opacity-30 transition-all hover:border-blue-500 shadow-sm"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-black text-slate-900 shadow-sm">
                    {currentPage} / {totalPages}
                  </div>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                    disabled={currentPage === totalPages}
                    className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-2xl text-slate-600 disabled:opacity-30 transition-all hover:border-blue-500 shadow-sm"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
