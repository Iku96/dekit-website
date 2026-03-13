import { motion } from 'motion/react';
import { Footprints, PenTool, CheckCircle2 } from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">What We Do</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Our Core Divisions</h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            We specialize in two core divisions: Specialized Comfort Footwear and Wholesale Office Stationery Supply.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Dekit Slippers */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100"
          >
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
              <Footprints className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-4">Dekit Slippers</h4>
            <p className="text-slate-600 leading-relaxed mb-8">
              Our footwear line, Dekit Indoor Slippers, is thoughtfully designed to provide therapeutic relief and safety. We prioritize the needs of diabetic patients and pregnant women by offering slippers with extra cushioning, non-slip soles, and seamless interiors to prevent irritation. Additionally, we offer cozy, protective options for children and individuals who suffer from cold feet, ensuring warmth and stability across all age groups.
            </p>
            
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h5 className="font-bold text-slate-900 mb-4">Why choose Our Slippers?</h5>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700"><strong className="font-semibold text-slate-900">Non-Slip Safety:</strong> High traction soles for tiled floors</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700"><strong className="font-semibold text-slate-900">Circulation Support:</strong> Non-constricting fit for swollen feet (Edema)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700"><strong className="font-semibold text-slate-900">Therapeutic Relief:</strong> Extra cushioning and seamless interiors</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Dekit Stationers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100"
          >
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
              <PenTool className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-4">Dekit Stationers</h4>
            <p className="text-slate-600 leading-relaxed mb-8">
              In our stationery division, we serve as a dependable partner for corporate and educational environments. We focus on the wholesale supply of office stationery, providing businesses with a comprehensive range of high-quality tools from essential writing instruments to bulk paper supplies at competitive rates.
            </p>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h5 className="font-bold text-slate-900 mb-4">Our Stationery Solutions</h5>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700"><strong className="font-semibold text-slate-900">Wholesale Supply:</strong> Bulk orders for corporate needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700"><strong className="font-semibold text-slate-900">Comprehensive Range:</strong> From writing instruments to paper</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700"><strong className="font-semibold text-slate-900">Competitive Rates:</strong> High-quality tools at affordable prices</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl font-medium text-slate-800 italic max-w-4xl mx-auto">
            "At Dekit Traders, we don't just move goods; we provide tailored solutions that enhance the well-being of our customers and the efficiency of their workplaces."
          </p>
        </div>
      </div>
    </section>
  );
}
