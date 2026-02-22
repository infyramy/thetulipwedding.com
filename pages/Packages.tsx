import React, { useState } from 'react';
import Section from '../components/Section';
import Button from '../components/Button';
import { WHATSAPP_NUMBER } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  MessageCircle,
  Star,
  Sparkles,
  Home,
  Tent,
  Crown
} from 'lucide-react';

// Categories for Tabs
const CATEGORIES = [
  {
    id: 'hall',
    label: 'Pakej Dewan & Villa',
    icon: Home,
    subtitle: 'Pakej mengikut lokasi dewan',
    description: "Kami menawarkan pilihan dewan eksklusif yang selesa dan lengkap dengan penghawa dingin. Sesuai untuk majlis resepsi yang gah dan dihadiri ramai tetamu.",
  },
  {
    id: 'catering',
    label: 'Pakej Rumah/Kanopi',
    icon: Tent,
    subtitle: 'Katering & Kelengkapan Khemah',
    description: "Raikan hari bahagia di halaman rumah sendiri dengan pakej kanopi lengkap. Kami sediakan segalanya dari khemah Arabian, katering, hingga ke pelamin.",
  },
  {
    id: 'bridal',
    label: 'Bridal & Mekap',
    icon: Crown,
    subtitle: 'Busana, Mekap & Pelamin',
    description: "Serlahkan seri pengantin anda dengan koleksi busana terkini dan sentuhan mekap dari MUA berpengalaman kami. Pakej bajet hingga premium tersedia.",
  },
];

// Specific Package Data for "Ideas"
const PACKAGES_LIST = [
  // --- HALL PACKAGES (Based on Dewan) ---
  {
    id: 'h1',
    category: 'hall',
    title: 'HALL BAROKAH SRI VILLAGE',
    price: 'RM 22,000',
    pax: '',
    featured: true,
    image: '/assets/images/hall/barokah-village/barokah-village-01.jpg',
    desc: 'Pakej "All-in" paling popular. Termasuk penginapan homestay keluarga.',
    includes: [
      'Sewa Dewan & Homestay',
      'Catering (Beriani/Minyak)',
      'Lauk Pengantin & Dome VIP',
      'Pelamin Grand 30ft',
      'Busana Sanding L&P + Makeup',
      'Full Photography + Outdoor',
      'PA System, DJ & Karaoke'
    ]
  },
  {
    id: 'h2',
    category: 'hall',
    title: 'Pakej Dewan Intimate',
    price: 'RM 14,600',
    pax: '',
    image: '/assets/images/hall/laman-puteri/laman-puteri-01.jpg',
    desc: 'Untuk majlis resepsi formal dan selesa di dewan berhawa dingin sepenuhnya.',
    includes: [
      'Sewa Dewan (Aircond)',
      'Catering Mengikut Jumlah Tetamu',
      'Pelamin Dewan Sahaja',
      'Busana Songket/Moden & Makeup',
      'Set Meja Beradab VIP',
      'Photography (Nikah & Sanding)',
      'Kek Pengantin 2 Tingkat',
      'EMCEE & PA System'
    ]
  },
  {
    id: 'h3',
    category: 'hall',
    title: 'GRAND GLASS HALL',
    price: 'RM 21,500',
    pax: '',
    image: '/assets/images/hall/kluang-glasshouse/kluang-glasshouse-01.jpg',
    desc: 'Sesuai untuk majlis sederhana dengan bajet yang berpatutan namun tetap nampak mewah.',
    includes: [
      'Katering Lengkap',
      '1 Set Buffet Line',
      'Pelamin Dewan Standard',
      'Busana Sanding L&P',
      'Makeup Sanding',
      'Photography Event',
      'PA System Basic'
    ]
  },

  // --- CATERING / KANOPI PACKAGES ---
  {
    id: 'c1',
    category: 'catering',
    title: 'Pakej Rumah Meriah',
    price: 'RM 20,500',
    pax: '1000 Pax',
    featured: true,
    image: '/assets/images/hero/kanopi-setup-02.jpg',
    desc: 'Pakej lengkap untuk majlis besar di laman rumah. Kami sediakan segalanya dari A-Z.',
    includes: [
      '6 Set Khemah Arabian (Scallop)',
      'Katering 1000 Pax',
      'Pelamin Rumah/Khemah',
      'Busana & Makeup Sanding',
      'Kerusi & Meja Tetamu (Sarung)',
      'Photography Same Day',
      'Teh Tarik Corner (Free Gift)'
    ]
  },
  {
    id: 'c2',
    category: 'catering',
    title: 'Pakej Rumah Standard',
    price: 'RM 18,500',
    pax: '800 Pax',
    image: '/assets/images/hero/kanopi-setup-04.jpg',
    desc: 'Pilihan ideal untuk majlis sederhana meriah dengan kelengkapan yang cukup selesa.',
    includes: [
      '5 Set Khemah Arabian',
      'Katering 800 Pax',
      'Pelamin Rumah',
      'Busana & Makeup',
      'Meja Makan Beradab',
      'PA System & DJ',
      'Kek Pengantin'
    ]
  },
  {
    id: 'c3',
    category: 'catering',
    title: 'Pakej Ekonomi',
    price: 'RM 15,200',
    pax: '500 Pax',
    image: '/assets/images/hero/hero-wedding-11.jpg',
    desc: 'Bajet rendah? Tiada masalah. Pakej ini lengkap keperluan asas majlis.',
    includes: [
      '4 Set Khemah Arabian',
      'Katering 500 Pax',
      'Pelamin Mini / Rumah',
      'Busana Sanding L&P',
      'Makeup Sanding',
      'Set Meja Pengantin',
      'Photography'
    ]
  },

  // --- BRIDAL PACKAGES ---
  {
    id: 'b1',
    category: 'bridal',
    title: 'Bridal + Photo Combo',
    price: 'RM 2,500',
    pax: 'Combo',
    featured: true,
    image: '/assets/images/bridal/bridal-boutique-02.jpg',
    desc: 'Gabungan servis paling penting. Anda cari tempat & makanan, kami uruskan penampilan & kenangan.',
    includes: [
      'Sepasang Baju Sanding (L&P)',
      'Makeup Sanding Professional',
      'Aksesori Lengkap (Tanjak/Sampin)',
      'Photographer (Unlimited Shoot)',
      'Custom Album & Frame',
      'Softcopy Pendrive'
    ]
  },
  {
    id: 'b2',
    category: 'bridal',
    title: 'Bridal Basic',
    price: 'RM 1,500',
    pax: 'Starter',
    image: '/assets/images/hero/hero-wedding-04.jpg',
    desc: 'Untuk pasangan yang mahukan busana & solekan sahaja tanpa pening kepala.',
    includes: [
      'Sepasang Baju Sanding (L&P)',
      'Makeup Sanding (1x)',
      'Aksesori & Bunga Tangan',
      'Fitting & Alteration',
      'Kasut Pengantin (P)'
    ]
  },
  {
    id: 'b3',
    category: 'bridal',
    title: 'Pelamin Tunang / Nikah',
    price: 'RM 800+',
    pax: 'Decor',
    image: '/assets/images/bridal/decoration-pelamin-01.jpg',
    desc: 'Hiasan pelamin mini untuk majlis pertunangan atau akad nikah di rumah.',
    includes: [
      'Pelamin Mini (8-10ft)',
      'Kerusi/Bantal Nikah',
      'Hiasan Bunga Artificial',
      'Spotlight Pencahayaan',
      'Carpet Bulu/Ambal'
    ]
  }
];

const Packages: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hall');

  const filteredPackages = PACKAGES_LIST.filter(pkg => pkg.category === activeTab);
  const activeCategory = CATEGORIES.find(c => c.id === activeTab);

  const handleWhatsApp = (pkgName: string) => {
    const text = `Assalamualaikum, saya nak tanya pasal ${pkgName} ni. Boleh explain lebih detail tak?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      {/* Header */}
      {/* Header - Hero Style */}
      <div className="relative h-[60vh] flex items-center justify-center bg-charcoal overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/hero/packages-header.jpg"
            alt="Packages Header Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/35"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in-up">
          <span className="text-pink-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3 block">
            Katalog 2026
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-md">
            Pakej & Harga
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Sedia merancang mengikut bajet anda? Kami menawarkan pelbagai pilihan pakej lengkap untuk majlis di Batu Pahat dan seluruh Johor.
          </p>
        </div>
      </div>

      <Section bgColor="silver" padding="none" className="pb-24 pt-16 min-h-screen">
        <div className="container mx-auto px-4">



          {/* Filter Section Header */}
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-4">Pilih Kategori Majlis</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Setiap kategori direka khusus untuk memenuhi keperluan lokasi dan saiz majlis yang berbeza.
            </p>
          </div>

          {/* Custom Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-300 border ${activeTab === cat.id
                  ? 'bg-charcoal text-white border-charcoal shadow-xl scale-105'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-pink-300 hover:text-pink-600'
                  }`}
              >
                <cat.icon size={20} className={activeTab === cat.id ? 'text-pink-400' : 'text-gray-400'} />
                <div className="text-left flex flex-col justify-center">
                  <span className="block font-bold text-sm md:text-base leading-none mb-0.5">{cat.label}</span>
                  <span className={`text-[10px] uppercase tracking-wider leading-none ${activeTab === cat.id ? 'text-gray-400' : 'text-gray-400 hidden md:block'}`}>
                    {activeTab === cat.id ? 'Sedang Dilihat' : cat.subtitle}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Footer Note - Moved Here */}
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="bg-pink-50/50 border border-pink-100 p-4 rounded-xl shadow-sm flex items-start gap-3 text-left md:items-center">
              <Sparkles className="w-5 h-5 text-pink-400 shrink-0 mt-0.5 md:mt-0" />
              <p className="text-gray-600 text-xs leading-relaxed">
                <strong className="text-pink-600">Nota:</strong> Harga tertera adalah harga permulaan (starting price). Pakej boleh diubah suai mengikut bajet & impian anda. Hubungi kami untuk sebut harga rasmi.
              </p>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPackages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`relative flex flex-col bg-white rounded-[2.5rem] overflow-hidden border transition-all duration-500 group hover:-translate-y-2 ${pkg.featured
                    ? 'border-pink-200 shadow-2xl shadow-pink-100/50'
                    : 'border-gray-100 shadow-xl'
                    }`}
                >
                  {pkg.featured && (
                    <div className="absolute top-4 left-4 bg-pink-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-20 shadow-lg flex items-center gap-1">
                      <Sparkles size={10} /> Popular
                    </div>
                  )}

                  {/* Image Area */}
                  <div className="h-56 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60 z-10"></div>
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {pkg.pax && (
                      <div className="absolute bottom-4 left-4 z-20">
                        <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-md text-[10px] font-bold uppercase tracking-wider">
                          {pkg.pax}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-8 pb-0">
                    <h3 className="font-serif text-2xl font-bold text-charcoal leading-tight mb-2 min-h-[3.5rem]">
                      {pkg.title}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-sm text-gray-400 font-medium">Bermula</span>
                      <span className="text-2xl font-bold text-pink-600">{pkg.price}</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 min-h-[3rem]">
                      {pkg.desc}
                    </p>
                    <div className="h-px w-full bg-gray-100"></div>
                  </div>

                  <div className="p-8 pt-6 flex-grow">
                    <p className="text-xs font-bold uppercase text-gray-400 mb-4 tracking-widest">Apa Yang Termasuk:</p>
                    <ul className="space-y-3 mb-8">
                      {pkg.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                          <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${pkg.featured ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-400'}`}>
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 pt-0 mt-auto">
                    <Button
                      fullWidth
                      variant={pkg.featured ? 'primary' : 'outline'}
                      onClick={() => handleWhatsApp(pkg.title)}
                      className={pkg.featured ? 'shadow-lg shadow-pink-200' : ''}
                    >
                      <MessageCircle size={18} className="mr-2" /> Tanya Pakej Ini
                    </Button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </Section>
    </>
  );
};

export default Packages;