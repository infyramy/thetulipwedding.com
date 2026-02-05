import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Home as HomeIcon, Gift, Armchair, Camera, MessageCircle, ArrowRight, Check, Star, CalendarCheck, MapPin } from 'lucide-react';
import Section from '../components/Section';
import Hero from '../components/Hero';
import TestimonialSlider from '../components/TestimonialSlider';
import Button from '../components/Button';
import { TESTIMONIALS, WHATSAPP_NUMBER } from '../constants';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20The%20Tulip%20Weddings,%20saya%20nak%20tanya%20pakej%20ikut%20bajet.`;

  const services = [
    { icon: Utensils, label: "Katering", sub: "Menu Beriani & Lauk Pengantin" },
    { icon: HomeIcon, label: "Dewan", sub: "Dewan Eksklusif di Batu Pahat" },
    { icon: Gift, label: "Dulang Hantaran", sub: "Gubahan Exclusive" },
    { icon: Armchair, label: "Pelamin", sub: "Moden & Tradisional" },
  ];

  const summaryPackages = [
    {
      title: "Pakej Bridal Sahaja",
      price: "RM 2,000",
      pax: null,
      description: "Nikah, sanding kecil, majlis rumah atau kanopi.",
      features: [
        "Pelamin (Rumah/Kanopi/Dewan)",
        "Makeup Nikah & Sanding",
        "Baju Sanding L&P",
        "Hiasan Makan Beradab",
        "Aksesori & Kelengkapan"
      ],
      link: "/packages",
      linkText: "Lihat Detail",
      locations: ["Rumah", "Kanopi", "Dewan"]
    },
    {
      title: "Bridal + Katering",
      price: "RM 15,200",
      pax: "500 Pax",
      description: "Majlis rumah atau kanopi dengan katering lengkap.",
      features: [
        "Pelamin & Hiasan Lengkap",
        "Makeup & Baju Sanding L&P",
        "Fotografi (Nikah & Sanding)",
        "Katering Menu Lengkap",
        "Set Makan Beradab",
        "Kanopi, Meja & Kerusi"
      ],
      link: "/packages",
      linkText: "Lihat Pakej",
      locations: ["Rumah", "Kanopi"]
    },
    {
      title: "Bridal + Katering + Dewan",
      price: "RM 17,500",
      pax: "500 Pax",
      description: "Harga pakej tertakluk kepada dewan pilihan anda.",
      features: [
        "Pelamin Dewan Grand",
        "Makeup & Baju Sanding L&P",
        "Fotografi Event Lengkap",
        "Katering & Buffet Line",
        "Set Makan Beradab VIP",
        "Pintu Gerbang & Walkway"
      ],
      link: "/hall",
      linkText: "Lihat Dewan",
      locations: ["Dewan"]
    }
  ];

  return (
    <>
      <Hero />

      {/* SERVICE HIGHLIGHTS (Replaces Bento) */}
      <Section bgColor="transparent" padding="none" className="-mt-24 md:-mt-32 relative z-40 pb-12 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] shadow-2xl shadow-black/10 p-12 md:p-16 max-w-6xl mx-auto border border-gray-100"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
              {services.map((s, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <s.icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-charcoal mb-2">{s.label}</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{s.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* NEW PACKAGES SECTION (MOVED HERE) */}
      <Section bgColor="silver" padding="lg" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.05]"></div>
        <div className="container mx-auto px-4 relative z-10">

          <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto mb-16">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <span className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-3 block">Koleksi Pakej 2026</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4 tracking-tight">Pakej Perkahwinan Lengkap & Fleksibel</h2>
              <p className="text-gray-600 text-lg font-light leading-relaxed">
                Untuk rumah, kanopi & dewan — ikut bajet dan jumlah tetamu.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-10"></div>
                <img
                  src="/assets/MSY_9586.jpg"
                  alt="Wedding Decoration"
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="bg-white/90 backdrop-blur text-charcoal text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Featured
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {summaryPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col rounded-[2rem] overflow-hidden transition-all duration-300 group hover:-translate-y-2 ${index === 1 // Center card highlight
                  ? 'bg-[#1A1A1A] text-white shadow-2xl shadow-black/20 ring-4 ring-pink-500/20'
                  : 'bg-white text-charcoal shadow-xl border border-gray-100 hover:shadow-2xl hover:shadow-pink-100'
                  }`}
              >
                {/* Header */}
                <div className="p-8 pb-0">
                  <h3 className={`font-serif text-2xl font-bold leading-tight mb-4 ${index === 1 ? 'text-white' : 'text-charcoal'}`}>
                    {pkg.title}
                  </h3>
                  <div className="mb-6">
                    <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${index === 1 ? 'text-gray-400' : 'text-gray-400'}`}>Bermula Dari</p>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl font-bold ${index === 1 ? 'text-pink-400' : 'text-pink-600'}`}>
                        {pkg.price}
                      </span>
                      {pkg.pax && <span className={`text-sm ${index === 1 ? 'text-gray-400' : 'text-gray-500'}`}>({pkg.pax})</span>}
                    </div>
                  </div>
                  <div className={`h-px w-full ${index === 1 ? 'bg-white/10' : 'bg-gray-100'}`}></div>
                </div>

                {/* Body */}
                <div className="p-8 flex-grow">
                  <p className={`text-sm mb-6 italic ${index === 1 ? 'text-gray-300' : 'text-gray-500'}`}>
                    Sesuai untuk: {pkg.description}
                  </p>

                  <ul className="space-y-3">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${index === 1 ? 'bg-pink-600/20 text-pink-400' : 'bg-pink-50 text-pink-600'
                          }`}>
                          <Check size={10} strokeWidth={3} />
                        </div>
                        <span className={`text-sm font-medium ${index === 1 ? 'text-gray-200' : 'text-gray-700'}`}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Locations */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {pkg.locations.map((loc, i) => (
                      <span key={i} className={`px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md ${index === 1 ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-500'
                        }`}>
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer / CTA */}
                <div className={`p-8 pt-0 mt-auto`}>
                  <div className="flex flex-col gap-3">
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20The%20Tulip%20Weddings,%20saya%20berminat%20dengan%20${pkg.title}`} target="_blank" rel="noreferrer">
                      <Button
                        fullWidth
                        size="sm"
                        variant={index === 1 ? 'white' : 'primary'}
                        className="shadow-lg"
                      >
                        <MessageCircle size={16} className="mr-2" /> Tanya di WhatsApp
                      </Button>
                    </a>
                    <Link to={pkg.link}>
                      <Button
                        fullWidth
                        size="sm"
                        variant="ghost"
                        className={index === 1 ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-charcoal hover:bg-gray-50'}
                      >
                        {pkg.linkText}
                      </Button>
                    </Link>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm mb-4">Tak pasti pakej mana sesuai? Jangan risau.</p>
            <a href={waLink} target="_blank" rel="noreferrer" className="inline-flex items-center text-charcoal font-bold hover:text-pink-600 transition-colors border-b-2 border-pink-200 hover:border-pink-600 pb-1">
              WhatsApp kami untuk cadangan ikut bajet <ArrowRight size={16} className="ml-2" />
            </a>
          </div>

        </div>
      </Section>

      {/* TRUST INDICATORS - RESPONSIVE GRID */}
      <Section padding="sm" className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 divide-x-0 md:divide-x divide-gray-100 max-w-6xl mx-auto">
            {/* Item 1 */}
            <div className="flex flex-row items-center justify-center gap-3 p-4">
              <span className="text-pink-600 font-bold text-3xl font-serif shrink-0">10+</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold text-left leading-tight">Tahun<br className="md:hidden" /> Pengalaman</span>
            </div>
            {/* Item 2 */}
            <div className="flex flex-row items-center justify-center gap-3 p-4">
              <span className="text-pink-600 font-bold text-3xl font-serif shrink-0">500+</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold text-left leading-tight">Majlis<br className="md:hidden" /> Dijayakan</span>
            </div>
            {/* Item 3 */}
            <div className="flex flex-row items-center justify-center gap-3 p-4">
              <span className="text-pink-600 font-bold text-3xl font-serif shrink-0">100%</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold text-left leading-tight">Bumiputera<br className="md:hidden" /> Muslim</span>
            </div>
            {/* Item 4 */}
            <div className="flex flex-row items-center justify-center gap-3 p-4">
              <span className="text-pink-600 font-bold text-3xl font-serif shrink-0">4.9</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold text-left leading-tight">Google<br className="md:hidden" /> Review</span>
            </div>
          </div>
        </div>
      </Section>

      {/* About / Intro */}
      <Section bgColor="white" padding="lg">
        {/* CHANGED: md:flex-row instead of lg:flex-row to ensure side-by-side on tablets */}
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
              <img
                src="https://placehold.co/1000x800/f3f4f6/be185d?text=Dewan+Wedding"
                alt="Dewan Wedding"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg border border-white/50 max-w-xs">
                <p className="font-serif italic text-charcoal text-lg">"Servis tiptop, makanan sedap. Tetamu puji."</p>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="#DB2777" className="text-pink-600" />)}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="w-full md:w-1/2 space-y-6">
            <div>
              <span className="text-pink-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block flex items-center gap-2">
                <span className="w-8 h-[1px] bg-pink-600"></span> The Tulip Standard
              </span>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-charcoal leading-[1.1] mb-6">
                Majlis Mewah,<br />
                <span className="text-pink-600">Tanpa Was-Was.</span>
              </h2>
            </div>
            <p className="text-gray-600 text-xl leading-relaxed font-light">
              Sebagai perancang perkahwinan yang dipercayai di Batu Pahat, kami memastikan setiap sen yang anda laburkan memberikan pulangan nilai terbaik. <strong className="text-charcoal font-medium">Tiada caj tersembunyi.</strong>
            </p>

            {/* Features & CTA - One Line Side by Side on Large Screens */}
            <div className="flex flex-col xl:flex-row items-start xl:items-center gap-6 mt-8">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 shrink-0"><CalendarCheck size={16} /></div>
                  <span className="text-sm font-bold text-gray-700 whitespace-nowrap">Pengurusan Masa & Tentatif Tersusun</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 shrink-0"><MapPin size={16} /></div>
                  <span className="text-sm font-bold text-gray-700 whitespace-nowrap">Cover Seluruh Johor</span>
                </div>
              </div>

              <div className="xl:ml-auto mt-4 xl:mt-0">
                <a href={waLink} target="_blank" rel="noreferrer">
                  <Button size="md" className="bg-[#121212] text-white hover:bg-pink-600 border-none px-6 py-3 rounded-full shadow-lg">
                    <MessageCircle size={18} className="mr-2" /> Hubungi Konsultan Kami
                  </Button>
                </a>
              </div>
            </div>

          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section padding="lg" className="relative bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/assets/MSY_9182.jpg')" }}>
        <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Testimoni</h2>
            <div className="w-16 h-1 bg-pink-500 mx-auto mt-4"></div>
            <p className="text-white/80 mt-4 max-w-xl mx-auto font-light">
              Apa kata pengantin kami yang telah merealisasikan impian mereka.
            </p>
          </div>
          <TestimonialSlider testimonials={TESTIMONIALS} />
        </div>
      </Section>
    </>
  );
};

export default Home;