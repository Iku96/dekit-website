import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ShareButton from './components/ShareButton';
import Home from './pages/Home';
import PricelistPage from './pages/PricelistPage';
import GalleryPage from './pages/GalleryPage';
import CartPage from './pages/CartPage';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pricelist" element={<PricelistPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
            <ShareButton />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
