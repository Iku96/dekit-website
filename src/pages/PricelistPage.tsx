import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Check, Image as ImageIcon } from 'lucide-react';
import { products as fallbackProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function PricelistPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState<any[]>(fallbackProducts.map((p, i) => ({ id: `fallback-${i}`, ...p, name: p.item })));
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      if (!snapshot.empty) {
        setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else {
        setProducts(fallbackProducts.map((p, i) => ({ id: `fallback-${i}`, ...p, name: p.item })));
      }
    });
    return () => unsubscribe();
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, products]);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(0, itemsPerPage);
  }, [filteredProducts, itemsPerPage]);

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
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Product Pricelist</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Browse our comprehensive catalog of office stationery and supplies. Use the search and filters below to find exactly what you need.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6 mb-8">
          {/* Category Tabs */}
          <div className="flex bg-slate-200 p-1.5 rounded-xl self-start w-full sm:w-auto overflow-x-auto shadow-inner">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-1 sm:flex-none px-6 sm:px-8 py-3 rounded-lg text-sm sm:text-base font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-white text-blue-700 shadow border border-slate-100' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/50'
                }`}
              >
                {cat === 'All' ? 'All Products' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search for an item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl leading-5 bg-white shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-16">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Category & Item
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Unit
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Price Per Unit
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                    MOQ
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Wholesale Bulk Price
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product, index) => (
                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded-lg border border-slate-200" />
                        ) : (
                          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-blue-600 mb-1">{product.category}</span>
                          <span className="text-sm font-medium text-slate-900 truncate max-w-md" title={product.name}>
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">
                          {product.unit}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 text-right font-medium">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 text-right">
                        {product.moq}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right font-bold">
                        {formatCurrency(product.bulkPrice)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-3">
                          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-1">
                            <button 
                              onClick={() => handleQuantityChange(product.id, getQuantity(product) - product.moq, product.moq)}
                              className="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm transition-all"
                            >
                              -
                            </button>
                            <span className="w-10 text-center text-sm font-medium text-slate-700" title={`${getQuantity(product)} ${product.unit}s`}>
                              {Math.floor(getQuantity(product) / product.moq)}
                            </span>
                            <button 
                              onClick={() => handleQuantityChange(product.id, getQuantity(product) + product.moq, product.moq)}
                              className="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm transition-all"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                              addedItems[product.id] 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'
                            }`}
                          >
                            {addedItems[product.id] ? (
                              <><Check className="w-4 h-4" /> Added</>
                            ) : (
                              <><ShoppingCart className="w-4 h-4" /> Add</>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      <ShoppingCart className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                      <p className="text-lg font-medium text-slate-900">No products found</p>
                      <p className="text-sm">Try adjusting your search or filters.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-slate-100">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <div key={product.id} className="p-4 hover:bg-slate-50">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <div className="flex items-center gap-3">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded-lg border border-slate-200 flex-shrink-0" />
                      ) : (
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 flex-shrink-0">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <span className="text-xs font-medium text-blue-600 mb-1 block">{product.category}</span>
                        <h3 className="font-bold text-slate-900">{product.name}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 mt-3 mb-4">
                    <div>
                      <span className="block text-xs text-slate-400">Price Per Unit</span>
                      <span className="font-bold text-slate-900">{formatCurrency(product.price)}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400">Unit</span>
                      <span className="inline-flex px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-800">{product.unit}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400">MOQ</span>
                      <span className="font-medium text-slate-900">{product.moq}</span>
                    </div>
                    {product.bulkPrice > 0 && (
                      <div>
                        <span className="block text-xs text-slate-400">Wholesale Bulk Price</span>
                        <span className="font-medium text-slate-900">{formatCurrency(product.bulkPrice)}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-1">
                      <button 
                        onClick={() => handleQuantityChange(product.id, getQuantity(product) - product.moq, product.moq)}
                        className="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm transition-all"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-medium text-slate-700" title={`${getQuantity(product)} ${product.unit}s`}>
                        {Math.floor(getQuantity(product) / product.moq)}
                      </span>
                      <button 
                        onClick={() => handleQuantityChange(product.id, getQuantity(product) + product.moq, product.moq)}
                        className="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm transition-all"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        addedItems[product.id] 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      {addedItems[product.id] ? (
                        <><Check className="w-4 h-4" /> Added</>
                      ) : (
                        <><ShoppingCart className="w-4 h-4" /> Add</>
                      )}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500">
                <ShoppingCart className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                <p className="text-lg font-medium text-slate-900">No products found</p>
                <p className="text-sm">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
          
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-900">{paginatedProducts.length}</span> of <span className="font-medium text-slate-900">{filteredProducts.length}</span> products
            </span>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="pl-3 pr-8 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
              >
                {[10, 25, 50, 100].map(val => (
                  <option key={val} value={val}>{val} items</option>
                ))}
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
