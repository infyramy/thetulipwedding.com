import { Package, Testimonial, Vendor, Hall, GalleryItem } from './types';

export const APP_NAME = "The Tulip Weddings";
export const WHATSAPP_NUMBER = "60127707912";
export const CONTACT_EMAIL = "dtulipdeco@gmail.com";

export const SOCIAL_LINKS = {
  INSTAGRAM: "https://www.instagram.com/dtulip_wedding/?__d=1%2F", // Keep ID if username is same, update if changed
  TIKTOK: "https://www.tiktok.com/@dtulip_wedding",
  FACEBOOK: "https://www.facebook.com/p/Dtulip-Bridal-Events-100042830275870/"
};

export const NAV_LINKS = [
  { name: "Utama", path: "/" },
  { name: "Tentang Kami", path: "/about" },
  { name: "Pakej", path: "/packages" },
  { name: "Dewan", path: "/hall" },
  // { name: "Busana", path: "/bridal" }, // Hidden
  // { name: "Galeri", path: "/gallery" }, // Hidden
  { name: "Hubungi", path: "/contact" },
];

// Reliable Placeholder Images
const IMG_HERO = "https://placehold.co/1920x1080/1a1a1a/ffffff?text=The+Tulip+Weddings";
const IMG_VILLA = "https://placehold.co/1000x800/2d2d2d/ffffff?text=Villa+Kemboja+Hall";
const IMG_DEWAN = "/assets/images/hero/hero-wedding-03.jpg";
const IMG_KANOPI = "/assets/images/hero/kanopi-setup-02.jpg";
const IMG_BRIDAL = "/assets/images/bridal/bridal-boutique-02.jpg";
const IMG_CATERING = "https://placehold.co/1000x800/ffedd5/9a3412?text=Premium+Catering";
const IMG_PELAMIN = "https://placehold.co/800x600/fce7f3/9d174d?text=Pelamin+Decor";

// New Hall Placeholders
const IMG_LAMAN = "https://placehold.co/1000x800/fdf2f8/db2777?text=Laman+Puteri";
const IMG_GLASS = "https://placehold.co/1000x800/f0f9ff/0284c7?text=Glasshouse+Kluang";
const IMG_BAROKAH = "https://placehold.co/1000x800/ecfccb/65a30d?text=Barokah+Sri+Village";

export const PACKAGES: Package[] = [
  // --- FULL PACKAGES (HALL/VILLA) ---
  {
    id: 'p_villa',
    name: 'HALL BAROKAH SRI VILLAGE',
    price: 'Bermula RM 22,000',
    description: 'Pakej Premium "All-in" termasuk Penginapan Keluarga.',
    features: [
      'Sewa Dewan & Homestay',
      'Catering Mengikut Jumlah Tetamu',
      'Lauk Pengantin: Siakap, Udang, Ayam, Sayur',
      'Pelamin Dewan Standard (30x16ft)',
      'Busana L&P + Makeup (Nikah & Sanding)',
      'Photography (Nikah & Sanding Same Day)',
      'PERCUMA: Outdoor Session & Softcopy'
    ],
    image: '/assets/images/hall/barokah-village/barokah-village-01.jpg',
    category: 'Full',
    featured: true,
  },
  {
    id: 'p_dewan_f',
    name: 'Pakej Dewan Intimate',
    price: 'Bermula RM 14,600',
    description: 'Pilihan popular untuk majlis resepsi meriah di Laman Puteri.',
    features: [
      'Catering Mengikut Jumlah Tetamu',
      '2 Set Buffet Line + Makan Berdamai VIP',
      'Pelamin Dewan Sahaja',
      'Makeup Nikah & Sanding',
      'Busana Sanding L&P',
      'Photography 2 Event (Same Day)',
      'EMCEE, PA System & Kek Pengantin 2 Tingkat'
    ],
    image: '/assets/images/hall/laman-puteri/laman-puteri-01.jpg',
    category: 'Full',
    featured: true,
  },
  {
    id: 'p_dewan_e',
    name: 'GRAND GLASS HALL',
    price: 'Bermula RM 21,500',
    description: 'Sesuai untuk majlis sederhana dengan kelengkapan penuh.',
    features: [
      'Katering Lengkap',
      '1 Set Buffet Line',
      'Pelamin Dewan Standard (30x16ft)',
      'Makeup Nikah & Sanding',
      'Busana Sanding L&P',
      'Photography 2 Event',
      'PA System, DJ & Kek'
    ],
    image: '/assets/images/hall/kluang-glasshouse/kluang-glasshouse-01.jpg',
    category: 'Full',
  },

  // --- KANOPI ---
  {
    id: 'p_kanopi_d',
    name: 'Pakej D (Kanopi/Rumah)',
    price: 'RM 20,600 - RM 22,300',
    description: 'Majlis di rumah atau khemah? Kami sediakan kelengkapan kanopi scallop penuh.',
    features: [
      '5 Set Kanopi + Kerusi + Meja Beradab',
      'Katering 800-1000 Pax',
      'Pelamin Kanopi Eksklusif',
      'Busana L&P + Makeup (Nikah & Sanding)',
      'Photography 2 Event',
      'PA System, DJ & Kek'
    ],
    image: IMG_KANOPI,
    category: 'Full',
  },

  // --- BRIDAL & COMBO ---
  {
    id: 'b_combo_3',
    name: 'Combo: Bridal + Photo + Catering',
    price: 'Hubungi untuk Harga',
    description: 'Anda sediakan tempat, kami uruskan baju, gambar dan makanan.',
    features: [
      'Busana Sanding L&P',
      'Makeup Sanding',
      'Photography Event',
      'Katering Buffet (Min 500 pax)',
      'Lauk Pengantin'
    ],
    image: IMG_CATERING,
    category: 'Bridal',
    featured: true,
  },
  {
    id: 'b_combo_2',
    name: 'Combo: Bridal + Photo',
    price: 'Bermula RM 2,xxx',
    description: 'Pakej asas penting untuk kelihatan cantik dan kenangan abadi.',
    features: [
      'Busana Sanding L&P (Ready Made)',
      'Makeup Sanding Professional',
      'Aksesori Lengkap',
      'Photographer (Unlimited Shoot)',
      'Custom Album & Frame'
    ],
    image: IMG_BRIDAL,
    category: 'Bridal',
  },
  {
    id: 'b_only',
    name: 'Bridal Sahaja',
    price: 'Bermula RM 1,xxx',
    description: 'Sewaan busana dan solekan sahaja.',
    features: [
      'Sepasang Busana Sanding L&P',
      'Makeup Sanding (1x)',
      'Aksesori & Bunga Tangan',
      'Fitting & Alteration'
    ],
    image: IMG_BRIDAL,
    category: 'Bridal',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Nurul & Hafiz',
    role: 'Villa Kemboja (Nov 2024)',
    text: 'Ambil pakej Villa Kemboja memang berbaloi. Family dari KL semua tidur situ, senang tak payah cari homestay lain. Makanan sedap sangat!',
    image: 'https://placehold.co/200x200/db2777/ffffff?text=N&H',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Puan Rahimah',
    role: 'Ibu Pengantin',
    text: 'Saya suka The Tulip Weddings ni sebab urusan mudah. Owner baik, boleh bincang. Dewan selesa aircond sejuk.',
    image: 'https://placehold.co/200x200/be185d/ffffff?text=PR',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Syafiq',
    role: 'Pakej Tunang',
    text: 'Pelamin tunang simple tapi nampak mahal. Gambar photographer pun cantik. Recommended orang Johor.',
    image: 'https://placehold.co/200x200/831843/ffffff?text=S',
    rating: 5,
  }
];

export const HALLS: Hall[] = [
  {
    id: 'h_laman',
    name: 'Laman Puteri',
    capacity: 'Max 800 Pax',
    location: 'Batu Pahat',
    address: 'No 2 jalan siswa Jaya 1 taman siswa Jaya 86400 parit raja, Batu Pahat, Johor',
    priceRange: 'Pakej Bermula RM 14,600',
    facilities: ['Dewan Terbuka Eksklusif', 'Ruang Makan Selesa', 'Parking Tetamu', 'Bilik Pengantin'],
    images: [
      '/assets/images/hall/laman-puteri/laman-puteri-01.jpg',
      '/assets/images/hall/laman-puteri/laman-puteri-02.jpg',
      '/assets/images/hall/laman-puteri/laman-puteri-03.jpg',
      '/assets/images/hall/laman-puteri/laman-puteri-04.jpg',
      '/assets/images/hall/laman-puteri/laman-puteri-05.jpg',
      '/assets/images/hall/laman-puteri/laman-puteri-06.jpg',
      '/assets/images/hall/laman-puteri/laman-puteri-07.jpg',
    ],
    coordinates: { lat: 1.8548, lng: 102.9229 },
  },
  {
    id: 'h_glass',
    name: 'Kluang Container Glasshouse',
    capacity: 'Max 600 Pax',
    location: 'Kluang',
    address: 'Lot 10943, Jalan 2, Taman Bersatu, 86000 Kluang, Johor',
    priceRange: 'Pakej Bermula RM 26,000',
    facilities: ['Konsep Unik & Moden', 'Bilik Pengantin', 'Lighting Ambience', 'Spot OOTD Viral'],
    images: [
      '/assets/images/hall/kluang-glasshouse/kluang-glasshouse-01.jpg',
      '/assets/images/hall/kluang-glasshouse/kluang-glasshouse-02.jpg',
      '/assets/images/hall/kluang-glasshouse/kluang-glasshouse-03.jpg',
      '/assets/images/hall/kluang-glasshouse/kluang-glasshouse-04.jpg',
      '/assets/images/hall/kluang-glasshouse/kluang-glasshouse-05.jpg',
      '/assets/images/hall/kluang-glasshouse/kluang-glasshouse-06.jpg',
      '/assets/images/hall/kluang-glasshouse/kluang-glasshouse-07.jpg',
      '/assets/images/hall/kluang-glasshouse/kluang-glasshouse-08.jpg',
    ],
    coordinates: { lat: 2.0305, lng: 103.3168 },
  },
  {
    id: 'h_barokah',
    name: 'Barokah Sri Village',
    capacity: 'Max 1000 Pax',
    location: 'Batu Pahat',
    address: "Lot 6548 Lor Muda (T/L JKB 316) PT Karjo, 86400 Parit Raja, Batu Pahat, Johor Darul Ta'zim",
    priceRange: 'Pakej Bermula RM 19,500',
    facilities: ['Suasana Desa Damai', 'Dewan Luas', 'Parking Mudah', 'Surau'],
    images: [
      '/assets/images/hall/barokah-village/barokah-village-01.jpg',
      '/assets/images/hall/barokah-village/barokah-village-02.jpg',
      '/assets/images/hall/barokah-village/barokah-village-03.jpg',
      '/assets/images/hall/barokah-village/barokah-village-04.jpg',
      '/assets/images/hall/barokah-village/barokah-village-05.jpg',
      '/assets/images/hall/barokah-village/barokah-village-06.jpg',
      '/assets/images/hall/barokah-village/barokah-village-07.jpg',
      '/assets/images/hall/barokah-village/barokah-village-08.jpg',
      '/assets/images/hall/barokah-village/barokah-village-09.jpg',
      '/assets/images/hall/barokah-village/barokah-village-10.jpg',
      '/assets/images/hall/barokah-village/barokah-village-11.jpg',
      '/assets/images/hall/barokah-village/barokah-village-12.jpg',
    ],
    coordinates: { lat: 1.8500, lng: 102.9300 },
  },
  {
    id: 'h_villa',
    name: 'Villa Kemboja',
    capacity: 'Max 1000 Pax',
    location: 'Batu Pahat',
    address: '6A, Jalan Kampung Parit Lapis / Peserai, Kampung Peserai Pantai, 83000 Batu Pahat, Johor',
    priceRange: 'Pakej Bermula RM 21,700',
    facilities: ['Bilik Pengantin', 'Parking Luas', 'Surau', 'Bilik Persalinan'],
    images: [
      '/assets/images/hall/villa-kemboja/villa-kemboja-01.jpg',
      '/assets/images/hall/villa-kemboja/villa-kemboja-02.jpg',
      '/assets/images/hall/villa-kemboja/villa-kemboja-03.jpg',
      '/assets/images/hall/villa-kemboja/villa-kemboja-04.jpg',
      '/assets/images/hall/villa-kemboja/villa-kemboja-05.jpg',
      '/assets/images/hall/villa-kemboja/villa-kemboja-06.jpg',
      '/assets/images/hall/villa-kemboja/villa-kemboja-07.jpg',
      '/assets/images/hall/villa-kemboja/villa-kemboja-08.jpg',
      '/assets/images/hall/villa-kemboja/villa-kemboja-09.jpg',
      '/assets/images/hall/villa-kemboja/villa-kemboja-10.jpg',
    ],
    coordinates: { lat: 1.8494, lng: 102.9288 },
  },
];

export const VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'The Tulip Official MUA',
    type: 'Makeup',
    startPrice: 'RM 600+',
    description: "Sentuhan 'Natural Glow' & 'Bold' mengikut permintaan.",
    image: 'https://placehold.co/800x800/fbcfe8/be185d?text=Makeup+Artist',
  },
  {
    id: 'v2',
    name: 'LensWorks (Partner)',
    type: 'Photo',
    startPrice: 'RM 1,500',
    description: 'Official partner photographer.',
    image: 'https://placehold.co/800x800/e5e7eb/374151?text=Photographer',
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', src: IMG_BRIDAL, category: 'Baju', caption: 'Songket Tenun Royal Blue' },
  { id: 'g2', src: IMG_PELAMIN, category: 'Pelamin', caption: 'Pelamin Pastel' },
  { id: 'g3', src: 'https://placehold.co/800x1200/fdf4ff/86198f?text=Modern+Dress', category: 'Baju', caption: 'Dress Sanding Moden' },
  { id: 'g4', src: IMG_DEWAN, category: 'Dewan', caption: 'Grand Hall Setup' },
  { id: 'g5', src: 'https://placehold.co/800x1200/ecfccb/365314?text=Outdoor+Shoot', category: 'Outdoor', caption: 'Outdoor Portrait' },
  { id: 'g6', src: 'https://placehold.co/800x600/fff1f2/9f1239?text=Makan+Beradab', category: 'Majlis', caption: 'Makan Beradab' },
];
