import { motion } from 'motion/react';
import { Target, Compass, Shield, Heart, Clock, Eye, Building2, CheckCircle2 } from 'lucide-react';

const values = [
  { title: 'Honesty', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'Customer-Centric', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
  { title: 'Reliability', icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { title: 'Transparency', icon: Eye, color: 'text-indigo-500', bg: 'bg-indigo-50' },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-100/40 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-100 shadow-sm mb-6"
            >
              <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">What We Do</span>
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.1]"
            >
              Bridging the gap between <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                producers & consumers
              </span>
            </motion.h3>
          </div>

          {/* Registration Mini-Badge */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm border border-slate-200/60 p-4 rounded-xl shadow-sm text-left flex flex-col gap-2 shrink-0 max-w-xs"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Reg No</span>
              <span className="text-xs font-bold text-slate-700 font-mono leading-none">624105</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">License</span>
              <span className="text-xs font-bold text-slate-900 font-mono leading-none">BL01396912025</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">TIN</span>
              <span className="text-xs font-bold text-slate-900 font-mono leading-none">132-007-594</span>
            </div>
          </motion.div>
        </div>

        {/* 3-Column Horizontal Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Column 1: Mission & Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Mission Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To provide high-quality products and exceptional service that empower businesses to thrive and achieve operational excellence.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-5">
                  <Compass className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Emphasizing long-term partnerships, operational excellence, and adapting to changing market needs with innovative solutions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-full"
          >
            <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
              Core Values
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              The foundational principles that guide our decisions, shape our culture, and drive our commitment to excellence.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-auto">
              {values.map((value) => (
                <div key={value.title} className={`${value.bg} p-4 rounded-2xl border border-white/50 relative overflow-hidden group`}>
                  <div className={`absolute -right-2 -bottom-2 opacity-5 ${value.color} group-hover:scale-125 transition-transform duration-500`}>
                    <value.icon className="w-16 h-16" />
                  </div>
                  <div className="relative z-10 flex flex-col gap-3">
                    <value.icon className={`w-5 h-5 ${value.color}`} />
                    <span className="font-bold text-slate-900 text-sm">{value.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Services (Corporate Wholesale) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden flex flex-col h-full shadow-lg shadow-slate-900/10"
          >
            {/* Subtle Inner Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 self-start">
                <span className="text-blue-400 text-[10px] font-bold uppercase tracking-wider">Service Highlight</span>
              </div>
              
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-5 backdrop-blur-sm border border-white/5">
                <Building2 className="w-6 h-6" />
              </div>
              
              <h4 className="text-2xl font-bold mb-3">Corporate Wholesale</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                Tailored bulk supply solutions for modern office environments, ensuring your team has the tools they need to excel. We specialize in high-volume efficiency.
              </p>
              
              <div className="space-y-3 mt-auto pt-6 border-t border-white/10">
                {["Bulk Procurement", "Contract Supply", "Custom Stationery Kits"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="text-sm text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
