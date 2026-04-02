import { motion } from 'motion/react';
import { ArrowRight, Book, Package, PenTool, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickCategories = [
  { name: 'Organizers', icon: LayoutGrid },
  { name: 'Paper Solutions', icon: Book },
  { name: 'Storage & Filing', icon: Package },
  { name: 'Writing Tools', icon: PenTool },
];

export default function PricelistCTA() {
  return (
    <section id="pricelist" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column: Image Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative group"
          >
            <div className="absolute -inset-4 bg-cyan-100/50 rounded-[2.5rem] -rotate-2 scale-105 blur-xl transition-transform group-hover:rotate-0 duration-700"></div>
            <div className="relative aspect-square md:aspect-video lg:aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-white">
              <img 
                src="/stationery_hero.png" 
                alt="Premium Stationery Catalog" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-widest uppercase border border-white/30">
                  Premium Quality
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <div className="inline-block px-4 py-2 bg-cyan-50 rounded-full text-cyan-600 text-sm font-bold tracking-wide mb-6">
              Official Wholesale Pricelist
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              A Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Stationery Ecosystem</span>
            </h3>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              From corporate office essentials to specialized academic tools, browse our full 2024 catalog. We offer tiered wholesale pricing for bulk orders and institutional partners.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-12">
              {quickCategories.map((cat, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-cyan-200 transition-colors">
                  <div className="p-2 bg-white rounded-lg text-cyan-600 shadow-sm transition-transform group-hover:scale-110">
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{cat.name}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/pricelist" 
                className="inline-flex items-center justify-center gap-3 bg-cyan-600 text-white px-10 py-5 rounded-full font-bold hover:bg-cyan-700 transition-all shadow-xl shadow-cyan-600/20"
              >
                View Full Pricelist
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/gallery" 
                className="inline-flex items-center justify-center gap-3 bg-white text-slate-700 border border-slate-200 px-10 py-5 rounded-full font-bold hover:bg-slate-50 transition-all"
              >
                Visual Gallery
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
