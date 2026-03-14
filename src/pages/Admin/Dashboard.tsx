import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { LogOut, Package, Image as ImageIcon, ShoppingCart, Trash2, Edit2, Plus, X, Upload } from 'lucide-react';

export default function AdminDashboard() {
  const { user, isAdmin, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'gallery'>('orders');
  
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form states
  const [productForm, setProductForm] = useState({ name: '', category: '', unit: '', price: 0, moq: 1, bulkPrice: 0 });
  const [galleryForm, setGalleryForm] = useState({ src: '', alt: '', category: '' });
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAdmin) return;

    const unsubOrders = onSnapshot(query(collection(db, 'orders'), orderBy('createdAt', 'desc')), (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubGallery = onSnapshot(collection(db, 'gallery'), (snapshot) => {
      setGallery(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubOrders();
      unsubProducts();
      unsubGallery();
    };
  }, [isAdmin]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    await updateDoc(doc(db, 'orders', orderId), { status });
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      await deleteDoc(doc(db, 'orders', orderId));
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        name: productForm.name,
        category: productForm.category,
        unit: productForm.unit,
        price: Number(productForm.price),
        moq: Number(productForm.moq),
        ...(productForm.bulkPrice > 0 ? { bulkPrice: Number(productForm.bulkPrice) } : {})
      };

      if (editingItem) {
        await updateDoc(doc(db, 'products', editingItem.id), data);
      } else {
        await addDoc(collection(db, 'products'), data);
      }
      setIsProductModalOpen(false);
      setEditingItem(null);
      setProductForm({ name: '', category: '', unit: '', price: 0, moq: 1, bulkPrice: 0 });
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Check console for details.");
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteDoc(doc(db, 'products', productId));
    }
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDoc(doc(db, 'gallery', editingItem.id), galleryForm);
      } else {
        await addDoc(collection(db, 'gallery'), galleryForm);
      }
      setIsGalleryModalOpen(false);
      setEditingItem(null);
      setGalleryForm({ src: '', alt: '', category: '' });
    } catch (error) {
      console.error("Error saving gallery image:", error);
      alert("Failed to save image. Check console for details.");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setGalleryForm({ ...galleryForm, src: url });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDeleteGallery = async (imageId: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      await deleteDoc(doc(db, 'gallery', imageId));
    }
  };

  const openProductModal = (product: any = null) => {
    if (product) {
      setEditingItem(product);
      setProductForm({
        name: product.name,
        category: product.category,
        unit: product.unit,
        price: product.price,
        moq: product.moq,
        bulkPrice: product.bulkPrice || 0
      });
    } else {
      setEditingItem(null);
      setProductForm({ name: '', category: '', unit: '', price: 0, moq: 1, bulkPrice: 0 });
    }
    setIsProductModalOpen(true);
  };

  const openGalleryModal = (image: any = null) => {
    if (image) {
      setEditingItem(image);
      setGalleryForm({
        src: image.src,
        alt: image.alt,
        category: image.category
      });
    } else {
      setEditingItem(null);
      setGalleryForm({ src: '', alt: '', category: '' });
    }
    setIsGalleryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 text-white flex flex-col pt-24 pb-6 px-4">
        <div className="mb-8 px-4">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <p className="text-sm text-slate-400 truncate">{user.email}</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <ShoppingCart className="w-5 h-5" />
            Orders
            {orders.filter(o => o.status === 'pending').length > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {orders.filter(o => o.status === 'pending').length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'products' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <Package className="w-5 h-5" />
            Products
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'gallery' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <ImageIcon className="w-5 h-5" />
            Gallery
          </button>
        </nav>

        <button 
          onClick={logout}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 pt-24 overflow-y-auto">
        
        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Manage Orders</h2>
            <div className="space-y-4">
              {orders.length === 0 ? (
                <p className="text-slate-500">No orders found.</p>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                      <div>
                        <h3 className="font-bold text-lg">{order.customerName}</h3>
                        <p className="text-sm text-slate-500">{order.customerEmail} • {order.customerPhone}</p>
                        <p className="text-sm text-slate-500 mt-1">{order.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <select 
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium border-0 outline-none ring-1 ring-inset ${
                            order.status === 'pending' ? 'bg-amber-50 text-amber-700 ring-amber-200' :
                            order.status === 'processing' ? 'bg-blue-50 text-blue-700 ring-blue-200' :
                            order.status === 'completed' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' :
                            'bg-red-50 text-red-700 ring-red-200'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button onClick={() => handleDeleteOrder(order.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="border-t border-slate-100 pt-4">
                      <h4 className="text-sm font-bold text-slate-900 mb-2">Order Items</h4>
                      <ul className="space-y-2">
                        {order.items.map((item: any, idx: number) => (
                          <li key={idx} className="flex justify-between text-sm text-slate-600">
                            <span>{item.quantity}x {item.name}</span>
                            <span>Ksh {(item.price * item.quantity).toLocaleString()}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between font-bold text-slate-900">
                        <span>Total Amount</span>
                        <span>Ksh {order.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Manage Products</h2>
              <button onClick={() => openProductModal()} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-900 font-medium border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Unit</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">MOQ</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map(product => (
                      <tr key={product.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">{product.name}</td>
                        <td className="px-6 py-4">{product.category}</td>
                        <td className="px-6 py-4">{product.unit}</td>
                        <td className="px-6 py-4">Ksh {product.price.toLocaleString()}</td>
                        <td className="px-6 py-4">{product.moq}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => openProductModal(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-2">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Manage Gallery</h2>
              <button onClick={() => openGalleryModal()} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" /> Add Image
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map(image => (
                <div key={image.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group">
                  <div className="aspect-video relative">
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button onClick={() => openGalleryModal(image)} className="p-2 bg-white text-blue-600 rounded-full hover:bg-blue-50">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDeleteGallery(image.id)} className="p-2 bg-white text-red-600 rounded-full hover:bg-red-50">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 truncate">{image.alt}</h3>
                    <p className="text-sm text-slate-500">{image.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">{editingItem ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input type="text" required value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <input type="text" required value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
                  <input type="text" required value={productForm.unit} onChange={e => setProductForm({...productForm, unit: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">MOQ</label>
                  <input type="number" min="1" required value={productForm.moq} onChange={e => setProductForm({...productForm, moq: Number(e.target.value)})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price (Ksh)</label>
                  <input type="number" min="0" required value={productForm.price} onChange={e => setProductForm({...productForm, price: Number(e.target.value)})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Bulk Price (Optional)</label>
                  <input type="number" min="0" value={productForm.bulkPrice} onChange={e => setProductForm({...productForm, bulkPrice: Number(e.target.value)})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsProductModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">{editingItem ? 'Edit Image' : 'Add Image'}</h3>
              <button onClick={() => setIsGalleryModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSaveGallery} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Image</label>
                <div className="flex items-center gap-4">
                  <input type="url" required value={galleryForm.src} onChange={e => setGalleryForm({...galleryForm, src: e.target.value})} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" placeholder="https://..." />
                  <span className="text-sm text-slate-500">or</span>
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                  <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage} className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors disabled:opacity-50">
                    <Upload className="w-4 h-4" />
                    {uploadingImage ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
                {galleryForm.src && (
                  <div className="mt-4 aspect-video rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                    <img src={galleryForm.src} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Alt Text / Title</label>
                <input type="text" required value={galleryForm.alt} onChange={e => setGalleryForm({...galleryForm, alt: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <input type="text" required value={galleryForm.category} onChange={e => setGalleryForm({...galleryForm, category: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsGalleryModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Save Image</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
