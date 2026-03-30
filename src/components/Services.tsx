import { motion } from 'motion/react';
import { Footprints, PenTool, CheckCircle2 } from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#0a0f1c] relative overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-3">What We Do</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Our Core Divisions</h3>
          <p className="text-lg text-slate-400 leading-relaxed">
            We specialize in two core divisions: Specialized Indoor Slippers and Wholesale Office Stationery Supply.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Dekit Slippers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative bg-[#111827]/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                <Footprints className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Dekit Slippers</h4>
              <p className="text-slate-400 leading-relaxed mb-8">
                Our footwear line, Dekit Indoor Slippers, is thoughtfully designed to provide therapeutic relief and safety. We prioritize the needs of diabetic patients and pregnant women by offering slippers with extra cushioning, non-slip soles, and seamless interiors.
              </p>
              
              <div className="bg-black/30 rounded-2xl p-6 border border-white/5">
                <h5 className="font-bold text-white mb-4">Why choose Our Slippers?</h5>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300"><strong className="font-semibold text-white">Non-Slip Safety:</strong> High traction soles for tiled floors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300"><strong className="font-semibold text-white">Circulation Support:</strong> Non-constricting fit for swollen feet</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300"><strong className="font-semibold text-white">Therapeutic Relief:</strong> Extra cushioning and seamless interiors</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Dekit Stationery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative bg-[#111827]/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/5 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500">
                <PenTool className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Dekit Stationery</h4>
              <p className="text-slate-400 leading-relaxed mb-8">
                In our stationery division, we serve as a dependable partner for corporate and educational environments. We focus on the wholesale supply of office stationery, providing businesses with a comprehensive range of high-quality tools.
              </p>

              <div className="bg-black/30 rounded-2xl p-6 border border-white/5">
                <h5 className="font-bold text-white mb-4">Our Stationery Solutions</h5>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300"><strong className="font-semibold text-white">Wholesale Supply:</strong> Bulk orders for corporate needs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300"><strong className="font-semibold text-white">Comprehensive Range:</strong> From writing instruments to paper</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300"><strong className="font-semibold text-white">Competitive Rates:</strong> High-quality tools at affordable prices</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 text-center relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <p className="relative inline-block bg-[#0a0f1c] px-8 text-xl font-medium text-slate-300 italic max-w-4xl mx-auto">
            "At Dekit Traders, we don't just move goods; we provide tailored solutions that enhance the well-being of our customers and the efficiency of their workplaces."
          </p>
        </div>
      </div>
    </section>
  );
}
