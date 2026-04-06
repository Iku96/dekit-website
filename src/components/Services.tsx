import { motion } from 'motion/react';
import { PenTool, CheckCircle2, Building2, BookOpen, ScrollText } from 'lucide-react';

const services = [
  {
    title: "Corporate Wholesale",
    description: "Tailored bulk supply solutions for modern office environments, ensuring your team has the tools they need to excel.",
    icon: Building2,
    color: "cyan",
    features: ["Bulk Procurement", "Contract Supply", "Custom Stationery Kits"]
  }
];

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
          <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-3 text-center">What We Do</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 text-center">Wholesale Expertise</h3>
          <p className="text-lg text-slate-400 leading-relaxed text-center">
            We specialize in high-volume stationery supply, serving as a pillar for corporate efficiency and academic growth across the region.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-[#111827]/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/5 hover:border-blue-500/30 transition-all duration-500"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{service.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500/60" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <p className="relative inline-block bg-[#0a0f1c] px-8 text-lg font-medium text-slate-400 italic max-w-2xl mx-auto">
            "Tailored solutions that enhance workplace efficiency and academic well-being."
          </p>
        </div>
      </div>
    </section>
  );
}
