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
    <section id="values" className="py-24 bg-blue-600 text-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-blue-200 uppercase mb-3">Our Core Principles</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold mb-6">What We Value</h3>
          <p className="text-lg text-blue-100 leading-relaxed">
            These core values guide our decisions, shape our culture, and define how we interact with our partners and customers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-colors"
            >
              <div className="w-12 h-12 bg-white text-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <value.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-3">{value.title}</h4>
              <p className="text-blue-100 leading-relaxed text-sm">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
