import { motion } from 'motion/react';
import { Target, Compass, Briefcase } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">About Us</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">What We Are</h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Dekit Traders is a solution-oriented enterprise dedicated to bridging the gap between producers and consumers. By streamlining the supply chain and prioritizing quality and reliability, we ensure that high-standard products reach the end-user with efficiency and integrity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all group"
          >
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Target className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-4">Our Mission</h4>
            <p className="text-slate-600 leading-relaxed">
              To provide high-quality products and exceptional service that empower businesses to thrive.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all group"
          >
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Compass className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-4">What We Envision</h4>
            <p className="text-slate-600 leading-relaxed">
              Emphasizing long-term client partnerships, operational excellence, and adapting to changing market needs to foster growth and profitability.
            </p>
          </motion.div>

          {/* Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all group"
          >
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Briefcase className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-4">Our Focus</h4>
            <p className="text-slate-600 leading-relaxed">
              Not just moving goods, but providing dependable service solutions that create value for both our partners and our customers.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
