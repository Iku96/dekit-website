import { useState, useEffect } from 'react';
import { Menu, X, Globe, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'What We Do', href: '/#about' },
  { name: 'Pricelist', href: '/pricelist' },
  { name: 'Gallery', href: '/gallery' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  // Check if we are on a page where the top section is dark (like home page hero)
  const isDarkTopPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to hash on route change if needed
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const navTextColor = !isScrolled && isDarkTopPage ? 'text-white/90 hover:text-white' : 'text-slate-600 hover:text-blue-600';
  const iconColor = !isScrolled && isDarkTopPage ? 'text-white/90 hover:text-white' : 'text-slate-600 hover:text-blue-600';
  const logoBg = !isScrolled && isDarkTopPage ? 'bg-white/10 backdrop-blur-md p-1.5 rounded-xl' : '';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className={`flex items-center gap-2 group transition-all duration-300 ${logoBg}`}>
            <img src="/logo.png" alt="Dekit Traders Logo" className="h-14 md:h-20 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors ${navTextColor}`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className={`flex items-center gap-4 border-l pl-8 transition-colors ${!isScrolled && isDarkTopPage ? 'border-white/20' : 'border-slate-200'}`}>
              <Link to="/cart" className={`relative p-2 transition-colors ${iconColor}`}>
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1 shadow-sm">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>
              <Link
                to="/#contact"
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md ${
                  !isScrolled && isDarkTopPage 
                    ? 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Get in Touch
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <Link to="/cart" className={`relative p-2 transition-colors ${iconColor}`}>
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1 shadow-sm">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
            <button
              className={`p-2 transition-colors ${iconColor}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-700 hover:text-blue-600"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
