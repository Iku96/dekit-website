import { motion } from 'motion/react';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PricelistCTA() {
  return (
    <section id="pricelist" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">Pricing</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Our Pricelist</h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            We offer competitive rates for both our specialized comfort footwear and wholesale office stationery. Browse our comprehensive catalog online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Slippers Pricelist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-3">Dekit Slippers</h4>
            <p className="text-slate-600 mb-8">
              Detailed pricing for our therapeutic, non-slip, and comfort footwear range.
            </p>
            <Link to="/pricelist" className="mt-auto inline-flex items-center justify-center gap-2 bg-white text-blue-600 border border-blue-200 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors w-full">
              View Full Pricelist
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Stationery Pricelist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-3">Dekit Stationers</h4>
            <p className="text-slate-600 mb-8">
              Wholesale rates for our comprehensive range of office and educational supplies.
            </p>
            <Link to="/pricelist" className="mt-auto inline-flex items-center justify-center gap-2 bg-white text-blue-600 border border-blue-200 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors w-full">
              View Full Pricelist
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
