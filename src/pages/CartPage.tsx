import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, CheckCircle2, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import emailjs from '@emailjs/browser';

// Replace these with your actual EmailJS IDs (Same as Contact form or a different template)
const EMAILJS_SERVICE_ID = 'service_xxxxxx';
const EMAILJS_ORDER_TEMPLATE_ID = 'template_xxxxxx'; // Recommendation: Use a different template for orders
const EMAILJS_PUBLIC_KEY = 'your_public_key_xxxxxx';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalItems, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    try {
      const orderItems = items.map(i => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
        total: i.price * i.quantity
      }));

      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        address: formData.address,
        status: 'pending',
        items: orderItems,
        totalAmount: totalPrice,
        createdAt: serverTimestamp()
      };

      // 1. Save to Firestore
      await addDoc(collection(db, 'orders'), orderData);

      // 2. Send Email Notification via EmailJS
      // Formatting items for the email template
      const itemsListString = orderItems
        .map(i => `${i.name} (x${i.quantity}) - TZS ${i.total.toLocaleString()}`)
        .join('\n');

      const templateParams = {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        delivery_address: formData.address,
        total_amount: `TZS ${totalPrice.toLocaleString()}`,
        items_list: itemsListString,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ORDER_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("There was an error submitting your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-12 flex items-center justify-center px-4">
        <div className="max-w-md w-full mx-auto p-8 bg-white rounded-3xl shadow-xl text-center border border-emerald-50">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Order Placed!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thank you for your order. We've received your request and an email notification has been sent. Our team will contact you shortly to confirm delivery.
          </p>
          <Link to="/" className="w-full inline-flex justify-center items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Your Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8">Looks like you haven't added any items yet.</p>
            <Link to="/pricelist" className="inline-flex px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-6 group hover:border-blue-200 transition-colors">
                  <div className="flex-grow">
                    <h3 className="font-bold text-slate-900 text-lg">{item.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">MOQ: {item.moq} • TZS {item.price.toLocaleString()} each</p>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - item.moq)}
                        disabled={item.quantity <= item.moq}
                        className="p-2 text-slate-500 hover:text-blue-600 disabled:opacity-30 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-bold text-slate-900" title={`${item.quantity} pieces`}>
                        {Math.floor(item.quantity / item.moq)}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + item.moq)}
                        className="p-2 text-slate-500 hover:text-blue-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-right min-w-[120px]">
                      <span className="font-bold text-blue-600 text-lg">TZS {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
 
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-50 text-center">Order Checkout</h3>
                
                <div className="space-y-4 mb-8 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="text-sm">Subtotal ({totalItems} bundles)</span>
                    <span className="font-medium">TZS {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold text-slate-900 pt-2 border-t border-slate-200">
                    <span>Total Amount</span>
                    <span className="text-blue-600">TZS {totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your name"
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="email@example.com"
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      placeholder="e.g. 0655270669"
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Delivery Address</label>
                    <textarea 
                      required
                      rows={3}
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                      placeholder="Where should we deliver?"
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none transition-all focus:bg-white"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:bg-slate-300 disabled:shadow-none mt-6"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      <>
                        Confirm & Place Order
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
