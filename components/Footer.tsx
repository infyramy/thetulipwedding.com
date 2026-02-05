import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin, MessageCircle, User, Calendar } from 'lucide-react';
import { APP_NAME, CONTACT_EMAIL, NAV_LINKS, WHATSAPP_NUMBER, SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  const [form, setForm] = useState({ name: '', date: '', type: 'Pakej Lengkap' });
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20The%20Tulip%20Weddings,%20saya%20berminat%20dengan%20servis%20anda.`;

  const handleExpressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;

    const text = `*Enquiry Dari Footer Website* 👇%0A%0A👤 Nama: ${form.name}%0A📅 Tarikh: ${form.date || 'Belum ada'}%0A📦 Minat: ${form.type}%0A%0ABoleh check kekosongan?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <>
      {/* COMPACT FOOTER FORM & CTA */}
      <section className="relative py-10 bg-charcoal overflow-hidden border-t border-white/5">
        {/* Enhanced Graphic Backgrounds */}
        <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-pink-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-6 items-center">

            {/* Text Side - Compact */}
            <div className="lg:w-5/12 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-2 justify-center lg:justify-start">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-pink-400 text-[10px] font-bold uppercase tracking-widest">
                  Tempahan 2026 Kini Dibuka
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                Realitikan <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-white italic">Impian Anda.</span>
              </h2>

            </div>

            {/* Express Form Side - Compact Horizontal */}
            <div className="lg:w-7/12 w-full">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-xl relative">
                <p className="text-white text-sm mb-4 font-medium opacity-90">
                  Terus semak kekosongan tarikh majlis anda:
                </p>
                <form onSubmit={handleExpressSubmit} className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 space-y-3 md:space-y-0 md:flex md:gap-3">
                    <div className="relative flex-1">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Nama Anda"
                        className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white placeholder-gray-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="relative flex-1">
                      <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Tarikh"
                        className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white placeholder-gray-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
                        value={form.date}
                        onChange={e => setForm({ ...form, date: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="md:w-auto bg-[#25D366] hover:bg-[#1EBE57] text-white font-bold py-2.5 px-6 rounded-lg shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 text-sm whitespace-nowrap">
                    <MessageCircle size={16} fill="white" /> Check Tarikh
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN FOOTER LINKS */}
      <footer className="bg-[#0F0F0F] text-white pt-10 pb-6 border-t border-white/5 relative z-40">
        <div className="absolute inset-0 bg-noise opacity-[0.07] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

            {/* Brand */}
            <div className="space-y-4">
              <Link to="/" className="block">
                <img
                  src="/assets/LOGO THE TULIP AI (2).svg"
                  alt={APP_NAME}
                  className="h-12 w-auto opacity-90 hover:opacity-100 transition-opacity"
                />
              </Link>
              <p className="text-gray-400 text-xs leading-relaxed max-w-xs font-light">
                Premium Wedding Planner & Hall di Batu Pahat. Mencipta memori abadi dengan sentuhan elegan moden untuk seluruh warga Johor.
              </p>
              <div className="flex space-x-3 pt-1">
                <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-600 hover:border-pink-600 hover:text-white transition-all text-gray-400">
                  <Instagram size={14} />
                </a>
                <a href={SOCIAL_LINKS.FACEBOOK} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-600 hover:border-pink-600 hover:text-white transition-all text-gray-400">
                  <Facebook size={14} />
                </a>
                <a href={SOCIAL_LINKS.TIKTOK} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-600 hover:border-pink-600 hover:text-white transition-all text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-base font-bold mb-4 text-white tracking-wide">Menu</h4>
              <ul className="space-y-2">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-gray-400 hover:text-pink-400 text-xs transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif text-base font-bold mb-4 text-white tracking-wide">Hubungi</h4>
              <ul className="space-y-3 text-xs text-gray-400 font-light">
                <li className="flex items-start gap-3">
                  <MapPin size={14} className="text-pink-600 shrink-0 mt-0.5" />
                  <span>Jalan Parit Botak, Parit Daun, Parit Raja,<br />Batu Pahat, Malaysia, 86400</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={14} className="text-pink-600 shrink-0" />
                  <span>+6012 770 7912</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={14} className="text-pink-600 shrink-0" />
                  <span>{CONTACT_EMAIL}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600">
            <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <Link to="#" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* FIXED FLOATING WHATSAPP CTA */}
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
      >
        <div className="hidden md:flex flex-col items-end mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-white text-charcoal px-3 py-1.5 rounded-lg shadow-xl text-[10px] font-bold mb-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Online
          </span>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-40"></div>
          <div className="w-14 h-14 bg-[#25D366] hover:bg-[#1dbf57] rounded-full flex items-center justify-center text-white shadow-[0_10px_20px_rgba(37,211,102,0.3)] transition-all duration-300 transform hover:scale-110 border-4 border-white/20">
            <MessageCircle size={28} fill="white" />
          </div>
        </div>
      </a>
    </>
  );
};

export default Footer;