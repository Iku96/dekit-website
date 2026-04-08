import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Replace these with your actual EmailJS IDs from your dashboard
const EMAILJS_SERVICE_ID = 'service_xxxxxx'; // e.g. service_gmail
const EMAILJS_TEMPLATE_ID = 'template_xxxxxx';
const EMAILJS_PUBLIC_KEY = 'your_public_key_xxxxxx';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(formRef.current);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      timestamp: serverTimestamp(),
    };

    try {
      // 1. Save to Firestore (Database backup)
      await addDoc(collection(db, 'enquiries'), data);

      // 2. Send via EmailJS (Email notification)
      // Note: Make sure your EmailJS template variable names match the 'name' attributes in the form
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      formRef.current.reset();
    } catch (error: any) {
      console.error('Submission failed:', error);
      setSubmitStatus('error');
      setErrorMessage(error?.text || 'Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 border-l border-slate-100 hidden lg:block"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">Get in Touch</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Ready to partner with us or need more information about our products? Reach out to our team today.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-slate-900 rounded-[2rem] p-8 md:p-10 border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>
              
              <h4 className="text-2xl font-bold text-white mb-8 relative z-10">Contact Information</h4>

              <div className="space-y-8">
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/20">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white mb-1">Our Location</h5>
                    <p className="text-slate-400 leading-relaxed">
                      Noble Center Victoria<br />
                      Dar es Salaam, Tanzania<br />
                      P.O Box 14774
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/20">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white mb-1">Phone Number</h5>
                    <p className="text-slate-400">
                      <a href="tel:+255655270669" className="hover:text-blue-400 transition-colors">+255 655 270 669</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/20">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white mb-1">Email Address</h5>
                    <p className="text-slate-400">
                      <a href="mailto:info@dekit.co.tz" className="hover:text-blue-400 transition-colors">info@dekit.co.tz</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-200 relative"
          >
            <h4 className="text-2xl font-bold text-slate-900 mb-8">Send us a Message</h4>
            
            <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                  <input
                    required
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white disabled:opacity-50"
                    placeholder="John"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                  <input
                    required
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white disabled:opacity-50"
                    placeholder="Doe"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white disabled:opacity-50"
                  placeholder="john@example.com"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                <select
                  required
                  id="subject"
                  name="subject"
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white text-slate-700 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  <option value="">Select a subject...</option>
                  <option value="stationery">Dekit Stationery Inquiry</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white resize-none disabled:opacity-50"
                  placeholder="How can we help you?"
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3 text-emerald-700 font-medium"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    Message sent successfully! We'll get back to you soon.
                  </motion.div>
                ) : submitStatus === 'error' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-rose-50 border border-rose-100 flex items-center gap-3 text-rose-700 font-medium"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-500" />
                    {errorMessage}
                  </motion.div>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:bg-slate-400 disabled:shadow-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
