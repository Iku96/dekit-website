import { Globe, Instagram, MessageCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-slate-300 py-16 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:max-w-sm xl:max-w-md">
            <Link to="/" className="flex items-center gap-2 group mb-6 inline-flex">
              <img src="/logo.png" alt="Dekit Traders Logo" className="h-20 w-auto bg-white p-2 rounded-xl shadow-lg" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-8">
              Bridging the gap between producers and consumers with dependable service solutions.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/dekitslippers" target="_blank" rel="noopener noreferrer" title="@dekitslippers" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/dekitstationers" target="_blank" rel="noopener noreferrer" title="@dekitstationers" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://wa.me/255655270669" target="_blank" rel="noopener noreferrer" title="WhatsApp Us" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all duration-300">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Space */}
          <div className="flex flex-col sm:flex-row gap-12 md:gap-24 xl:gap-32">
            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-4">
                <li><Link to="/#about" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span> About Us</Link></li>
                <li><Link to="/#services" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span> Our Services</Link></li>
                <li><Link to="/#values" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span> Core Values</Link></li>
                <li><Link to="/pricelist" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span> Pricelist</Link></li>
                <li><Link to="/#gallery" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span> Gallery</Link></li>
                <li><Link to="/#contact" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span> Contact Us</Link></li>
              </ul>
            </div>

            {/* Divisions */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Our Divisions</h4>
              <ul className="space-y-6">
                <li>
                  <Link to="/#services" className="group flex flex-col">
                    <span className="font-medium text-slate-300 group-hover:text-blue-400 transition-colors">Dekit Slippers</span>
                    <span className="text-xs text-slate-500 mt-1">Specialized Indoor Slippers</span>
                  </Link>
                </li>
                <li>
                  <Link to="/#services" className="group flex flex-col">
                    <span className="font-medium text-slate-300 group-hover:text-blue-400 transition-colors">Dekit Stationers</span>
                    <span className="text-xs text-slate-500 mt-1">Wholesale Office Supply</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Dekit Traders. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/admin/login" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Admin Login</Link>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
