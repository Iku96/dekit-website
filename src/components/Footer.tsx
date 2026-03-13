import { Globe, Facebook, Twitter, Instagram, Linkedin, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 group mb-6 inline-flex">
              <div className="bg-blue-600 text-white p-2 rounded-full group-hover:bg-blue-500 transition-colors">
                <Globe className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-none tracking-tight text-white">DEKIT</span>
                <span className="text-[10px] font-medium tracking-widest text-slate-400 uppercase">Traders</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Bridging the gap between producers and consumers with dependable service solutions.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/#about" className="text-sm hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/#services" className="text-sm hover:text-blue-400 transition-colors">Our Services</Link></li>
              <li><Link to="/#values" className="text-sm hover:text-blue-400 transition-colors">Core Values</Link></li>
              <li><Link to="/pricelist" className="text-sm hover:text-blue-400 transition-colors">Pricelist</Link></li>
              <li><Link to="/#gallery" className="text-sm hover:text-blue-400 transition-colors">Gallery</Link></li>
              <li><Link to="/#contact" className="text-sm hover:text-blue-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Divisions */}
          <div>
            <h4 className="text-white font-bold mb-6">Our Divisions</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/#services" className="text-sm hover:text-blue-400 transition-colors flex flex-col">
                  <span className="font-medium text-slate-300">Dekit Slippers</span>
                  <span className="text-xs text-slate-500">Specialized Comfort Footwear</span>
                </Link>
              </li>
              <li>
                <Link to="/#services" className="text-sm hover:text-blue-400 transition-colors flex flex-col mt-2">
                  <span className="font-medium text-slate-300">Dekit Stationers</span>
                  <span className="text-xs text-slate-500">Wholesale Office Supply</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legality Status & Bank Details */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Official Details
            </h4>
            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 mb-4">
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Dekit Traders has been duly registered pursuant to and in accordance with the provisions of the Business Names (Registration) Act and the Rules made thereunder, and has been entered in the Number 624105 in the Index of Registration.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Business License No:</span>
                  <span className="text-slate-300 font-mono">BL01396912025-2600025809</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">TIN No:</span>
                  <span className="text-slate-300 font-mono">132-007-594</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
              <h5 className="text-sm font-bold text-white mb-3">Bank Details</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Bank:</span>
                  <span className="text-slate-300 font-medium">NBC Bank</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Acc Name:</span>
                  <span className="text-slate-300 font-medium">Dekit Traders</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Acc No:</span>
                  <span className="text-slate-300 font-mono">074174089818</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Dekit Traders. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
