import { motion } from 'motion/react';
import { ArrowRight, PackageOpen, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-slate-50"></div>
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-20 blur-3xl rounded-full bg-blue-400 w-[600px] h-[600px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
              Bridging Producers & Consumers
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">
              Dependable <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Service Solutions</span> for Your Business
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
              Dekit Traders streamlines the supply chain, prioritizing quality and reliability to ensure high-standard products reach you with efficiency and integrity.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-full font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40"
              >
                Explore Our Services
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3.5 rounded-full font-medium hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                Contact Us
              </a>
            </div>

            <div className="mt-10 pt-10 border-t border-slate-200 flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-sm font-medium text-slate-700">Quality Assured</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <PackageOpen className="w-5 h-5" />
                </div>
                <div className="text-sm font-medium text-slate-700">Reliable Supply</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:ml-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 bg-white p-2">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Logistics and Supply Chain"
                className="rounded-xl w-full h-auto object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce-slow">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  100%
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Commitment</div>
                  <div className="text-xs text-slate-500">To Quality & Reliability</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
