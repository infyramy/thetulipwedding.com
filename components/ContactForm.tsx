import React, { useState } from 'react';
import Button from './Button';
import { Calendar, Users, Send, ArrowRight, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    guests: '',
    packageType: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleWhatsAppSubmit = () => {
    const text = `
*Pertanyaan Baru dari Website Dtulips* 🌷
    
Hi, saya berminat nak tahu lebih lanjut.
    
👤 *Nama:* ${formData.name}
📅 *Tarikh Cadangan:* ${formData.date}
👥 *Anggaran Tetamu:* ${formData.guests}
📦 *Minat Pakej:* ${formData.packageType}
    
Boleh saya dapatkan quotation? Terima kasih.
    `.trim();

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const inputClasses = "w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-roseGold focus:border-transparent outline-none transition-all text-charcoal placeholder-gray-400 font-medium text-lg";

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-white relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-roseGold/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-50 rounded-full blur-2xl pointer-events-none"></div>
      
      {/* Stepper Indicator */}
      <div className="flex justify-between mb-12 relative px-4 max-w-xs mx-auto md:mx-0">
        <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-100 -z-10 rounded-full"></div>
        <div 
          className="absolute top-1/2 left-4 h-1 bg-roseGold -z-10 transition-all duration-500 rounded-full" 
          style={{ width: `calc(${((step - 1) / 2) * 100}% - 2rem)` }}
        ></div>
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 border-4 ${
              step >= i ? 'bg-roseGold border-roseGold text-white scale-110 shadow-lg' : 'bg-white border-gray-200 text-gray-300'
            }`}
          >
            {i}
          </div>
        ))}
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="relative z-10 min-h-[350px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="mb-6">
                <h3 className="font-serif text-3xl font-bold mb-2 text-charcoal">Jom Mula!</h3>
                <p className="text-gray-500">Siapa nama bakal raja sehari?</p>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">Nama Penuh / Pasangan</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Contoh: Amir & Sarah"
                  autoFocus
                />
              </div>
              
              <Button 
                fullWidth 
                onClick={nextStep} 
                disabled={!formData.name} 
                className="mt-4 py-4 text-lg shadow-xl shadow-roseGold/20 hover:shadow-roseGold/40"
              >
                Seterusnya <ArrowRight size={20} className="ml-2" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
               <div className="mb-6">
                <h3 className="font-serif text-3xl font-bold mb-2 text-charcoal">Butiran Majlis</h3>
                <p className="text-gray-500">Supaya kami boleh check kekosongan tarikh.</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">Tarikh Cadangan</label>
                <div className="relative">
                  <input 
                    type="date" 
                    name="date" 
                    value={formData.date}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  <Calendar className="absolute right-5 top-5 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">Anggaran Tetamu</label>
                <div className="relative">
                  <select 
                    name="guests" 
                    value={formData.guests}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none cursor-pointer`}
                  >
                    <option value="">Sila Pilih</option>
                    <option value="<500">Kurang 500 Pax</option>
                    <option value="500-800">500 - 800 Pax</option>
                    <option value="800-1000">800 - 1000 Pax</option>
                    <option value=">1000">Lebih 1000 Pax</option>
                  </select>
                  <Users className="absolute right-5 top-5 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>

               <div className="flex gap-3 mt-6">
                <Button variant="ghost" onClick={prevStep} className="flex-1">Kembali</Button>
                <Button onClick={nextStep} disabled={!formData.date || !formData.guests} className="flex-[2]">Seterusnya</Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="mb-6">
                <h3 className="font-serif text-3xl font-bold mb-2 text-charcoal">Minat Pakej?</h3>
                <p className="text-gray-500">Pilih yang paling sesuai dengan anda.</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {['Pakej Lengkap (Diamond/Gold)', 'Sewaan Dewan Sahaja', 'Baju Sanding / Nikah', 'Lain-lain'].map((opt) => (
                  <label key={opt} className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all duration-200 group ${formData.packageType === opt ? 'border-roseGold bg-roseGold/5 shadow-md ring-1 ring-roseGold' : 'border-gray-100 hover:border-roseGold/50 hover:bg-gray-50'}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-colors ${formData.packageType === opt ? 'border-roseGold bg-roseGold' : 'border-gray-300 group-hover:border-roseGold'}`}>
                       {formData.packageType === opt && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <input 
                      type="radio" 
                      name="packageType" 
                      value={opt}
                      checked={formData.packageType === opt}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className={`font-medium text-lg ${formData.packageType === opt ? 'text-charcoal' : 'text-gray-600'}`}>{opt}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-3 mt-8">
                <Button variant="ghost" onClick={prevStep} className="flex-1">Kembali</Button>
                <Button 
                  onClick={handleWhatsAppSubmit} 
                  disabled={!formData.packageType} 
                  className="flex-[2] bg-[#25D366] hover:bg-[#128C7E] border-none text-white shadow-xl shadow-green-200 hover:shadow-green-300/50"
                >
                  <Send size={18} className="mr-2" /> WhatsApp Kami
                </Button>
              </div>
              <p className="text-xs text-center text-gray-400 mt-4">Anda akan dibawa terus ke aplikasi WhatsApp.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default ContactForm;