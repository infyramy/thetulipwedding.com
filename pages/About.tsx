import React, { useState, useEffect } from 'react';
import Section from '../components/Section';
import Button from '../components/Button';
import { Award, Heart, Users, Star, Smile, Calendar, Coffee, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { WHATSAPP_NUMBER } from '../constants';

const About: React.FC = () => {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Assalamualaikum, saya nak set appointment untuk konsultasi. Bila masa yang sesuai?`;

  const [currentImage, setCurrentImage] = useState(0);
  const showcaseImages = [
    "/assets/images/contact/boutique-exterior-01.jpg",
    "/assets/images/contact/boutique-exterior-02.jpg"
  ];

  const teamImages = [
    "/assets/images/bridal/bridal-showcase-01.jpg",
    "/assets/images/bridal/bridal-showcase-02.jpg",
    "/assets/images/bridal/bridal-showcase-03.jpg",
    "/assets/images/contact/boutique-indoor.jpg",
    "/assets/images/bridal/bridal-onsite-01.jpg",
    "/assets/images/contact/boutique-frontstore.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % showcaseImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* HEADER SECTION - Hero Style */}
      <div className="relative h-[60vh] flex items-center justify-center bg-charcoal overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/hero/about-team-bg.jpg"
            alt="About Header Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/35"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center decoration-clone animate-fade-in-up">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-pink-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3 block">
              B & J SOUTHERN SDN BHD (1557712-P)
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-white leading-tight drop-shadow-md">
              Kenali Kami
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              Menyempurnakan Perjalanan Hari Bahagia Anda
            </p>
          </motion.div>
        </div>
      </div>

      {/* STORY SECTION - Focus on Customer Journey */}
      <Section bgColor="silver" className="relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 relative">
            {/* Main Image Slideshow */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500 border-4 border-white h-[400px] md:h-[500px] bg-white group">
              {showcaseImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Suasana Butik The Tulip"
                  className={`absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-1000 ${idx === currentImage ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <span className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-3 block">Tentang Kami</span>
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-6 tracking-tight">Siapa Kami?</h3>
            <div className="text-gray-600 leading-relaxed text-lg space-y-6 text-justify font-light">
              <p>
                Selamat datang ke <strong className="text-charcoal font-medium">The Tulip Wedding & Events</strong> (dahulu dikenali sebagai D'Tulip). Perjalanan kami bermula pada tahun 2015 secara kecil-kecilan, bermula dengan penyediaan buku tetamu dan servis 'Mini Pelamin'.
              </p>
              <p>
                Atas kepercayaan anda, kami berkembang tahun demi tahun. Dari sekadar hiasan pelamin, kini kami adalah <strong>"One Stop Wedding Centre"</strong> yang lengkap di Batu Pahat, Johor. Kami faham, menguruskan majlis perkahwinan boleh menjadi satu tekanan.
              </p>
              <p>
                Oleh itu, misi kami mudah: <strong>Memudahkan urusan anda.</strong> Kami gabungkan semua servis penting—Butik Pengantin, Katering, Jurugambar, dan Dewan—di bawah satu bumbung supaya anda boleh fokus untuk menikmati hari bahagia anda bersama keluarga.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* STATS & ACHIEVEMENTS - COMPACT VERSION */}
      <Section bgColor="white" padding="none" className="py-12 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
            {/* Item 1 */}
            <div className="flex flex-row items-center justify-center gap-4 p-4 rounded-2xl hover:bg-pink-50/50 transition-colors">
              <span className="text-pink-600 font-bold text-4xl font-serif shrink-0">10+</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold text-left leading-tight">Tahun<br className="block" /> Pengalaman</span>
            </div>
            {/* Item 2 */}
            <div className="flex flex-row items-center justify-center gap-4 p-4 rounded-2xl hover:bg-pink-50/50 transition-colors">
              <span className="text-pink-600 font-bold text-4xl font-serif shrink-0">10k</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold text-left leading-tight">Pasangan<br className="block" /> Dirai</span>
            </div>
            {/* Item 3 */}
            <div className="flex flex-row items-center justify-center gap-4 p-4 rounded-2xl hover:bg-pink-50/50 transition-colors">
              <span className="text-pink-600 font-bold text-4xl font-serif shrink-0">100+</span>
              <div className="flex flex-col text-left">
                <span className="text-xs uppercase tracking-widest text-gray-500 font-bold leading-tight">Dulang<br className="block" /> Hantaran</span>
              </div>
            </div>
            {/* Item 4 */}
            <div className="flex flex-row items-center justify-center gap-4 p-4 rounded-2xl hover:bg-pink-50/50 transition-colors">
              <span className="text-pink-600 font-bold text-4xl font-serif shrink-0">100%</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold text-left leading-tight">Komited &<br className="block" /> Amanah</span>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-[10px] text-gray-400 italic">*Rekod Tertinggi Kami</p>
          </div>
        </div>
      </Section>

      {/* TEAM & CULTURE */}
      <Section bgColor="white" padding="lg">
        <div className="container mx-auto px-4">

          {/* TEAM GALLERY MARQUEE */}
          <div className="mb-20 overflow-hidden relative w-full" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
              {[...teamImages, ...teamImages].map((img, idx) => (
                <div key={idx} className="w-64 h-64 md:w-80 md:h-80 shrink-0 pr-4 md:pr-6 cursor-pointer">
                  <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-gray-100">
                    <img src={img} alt={`Kenangan Bersama The Tulip ${idx}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-3 block">Pasukan Kami</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-6 tracking-tight">Santai Tapi Professional</h2>
            <p className="text-gray-600 text-lg font-light leading-relaxed">
              Kami bukan sekadar 'vendor', kami adalah kawan anda sepanjang perjalanan menuju hari bahagia. Team kami terlatih untuk mengendalikan majlis dengan senyuman dan ketelitian.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 text-center border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-20 h-20 bg-pink-50 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:bg-pink-600 transition-colors duration-300">
                <Smile size={32} className="text-pink-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-charcoal">Consultant Mesra</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Sedia mendengar bajet dan impian anda tanpa prejudis. Kami beri nasihat jujur.</p>
            </div>
            <div className="bg-white rounded-3xl p-8 text-center border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-20 h-20 bg-pink-50 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:bg-pink-600 transition-colors duration-300">
                <CheckCircle size={32} className="text-pink-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-charcoal">Pengurusan Cekap</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Dari fitting baju hingga susunan tentatif majlis, semuanya direkod dengan teliti.</p>
            </div>
            <div className="bg-white rounded-3xl p-8 text-center border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-20 h-20 bg-pink-50 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:bg-pink-600 transition-colors duration-300">
                <Users size={32} className="text-pink-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-charcoal">Crew Terlatih</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Crew event dan katering yang menjaga adab dan keselesaan tetamu anda.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* NEW CTA SECTION - Premium Card Style */}
      <Section bgColor="silver" padding="lg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-[#1A1A1A] rounded-[3rem] overflow-hidden max-w-5xl mx-auto shadow-2xl shadow-black/20"
          >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 p-10 md:p-16">
              <div className="w-full md:w-2/3 text-center md:text-left">
                <span className="text-pink-400 font-bold tracking-widest uppercase text-xs mb-3 block">Mulakan Langkah Pertama</span>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Jom Bincang Tentang <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-white italic">Majlis Anda?</span>
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto md:mx-0 font-light">
                  Jom set appointment untuk sesi konsultasi santai. Kita bincang idea, tengok koleksi, dan rancang majlis impian anda bersama-sama.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <a href={waLink} target="_blank" rel="noreferrer">
                    <Button size="lg" variant="white" className="shadow-xl shadow-pink-900/20 w-full sm:w-auto">
                      <Calendar size={18} className="mr-2 text-pink-600" /> Set Temujanji
                    </Button>
                  </a>
                </div>
              </div>

              <div className="hidden md:block w-1/3 relative">
                <div className="relative w-full aspect-square rounded-full border border-white/10 flex items-center justify-center">
                  <div className="absolute inset-0 border border-white/5 rounded-full animate-ping opacity-20"></div>
                  <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center transform rotate-6 hover:rotate-0 transition-transform duration-500">
                    <Coffee size={40} className="text-pink-400 mx-auto mb-3" />
                    <p className="text-white font-serif text-xl italic">"Konsultasi tanpa tekanan, janji mesra."</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default About;