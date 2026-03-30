import { motion } from 'motion/react';
import { Shield, Heart, Clock, Eye } from 'lucide-react';

const values = [
  {
    title: 'Honesty & Integrity',
    icon: Shield,
    description: 'We conduct our business with the highest ethical standards, ensuring trust in every transaction.',
  },
  {
    title: 'Customer-Centric',
    icon: Heart,
    description: 'Our customers are at the heart of everything we do. We tailor our solutions to meet your specific needs.',
  },
  {
    title: 'Reliability',
    icon: Clock,
    description: 'You can count on us to deliver high-quality products on time, every time.',
  },
  {
    title: 'Transparency',
    icon: Eye,
    description: 'We maintain open and clear communication throughout our supply chain processes.',
  },
];

export default function Values() {
  return (
    <section id="values" className="py-24 bg-gradient-to-b from-white to-slate-100 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-rose-100/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">Our Core Principles</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">What We Value</h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            These core values guide our decisions, shape our culture, and define how we interact with our partners and customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bento Box Layout */}
          
          {/* Large Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-blue-50/50 rounded-3xl p-8 sm:p-10 border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-white text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-blue-100">
              <Shield className="w-7 h-7" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-4">Honesty & Integrity</h4>
            <p className="text-slate-600 leading-relaxed text-lg max-w-xl">
              We conduct our business with the highest ethical standards, ensuring trust in every transaction. Transparency and honesty are the foundation of our long-term partnerships.
            </p>
          </motion.div>

          {/* Regular Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-rose-50/50 rounded-3xl p-8 border border-rose-100 shadow-md hover:shadow-xl transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-white text-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-rose-100">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3">Customer-Centric</h4>
            <p className="text-slate-600 leading-relaxed">
              Our customers are at the heart of everything we do. We tailor our solutions to meet your specific needs.
            </p>
          </motion.div>

          {/* Regular Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-100 shadow-md hover:shadow-xl transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-white text-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-emerald-100">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3">Reliability</h4>
            <p className="text-slate-600 leading-relaxed">
              You can count on us to deliver high-quality products on time, every time, without compromise.
            </p>
          </motion.div>

          {/* Wide Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-10 shadow-lg group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                <Eye className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">Transparency</h4>
              <p className="text-slate-300 leading-relaxed text-lg max-w-xl">
                We maintain open and clear communication throughout our supply chain processes, ensuring you always know where your business stands with us.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
