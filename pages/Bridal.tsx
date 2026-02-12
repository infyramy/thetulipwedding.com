import React from 'react';
import Section from '../components/Section';
import Button from '../components/Button';
import { GALLERY_ITEMS, WHATSAPP_NUMBER } from '../constants';

const Bridal: React.FC = () => {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Assalamualaikum, saya nak buat appointment untuk fitting baju pengantin. Bila available?`;

  return (
    <>
      {/* Header - Hero Style */}
      <div className="relative h-[60vh] flex items-center justify-center bg-charcoal overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/MSY_9586.jpg"
            alt="Bridal Header Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/35"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in-up">
          <span className="text-pink-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3 block">
            Busana & MUA
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-md">
            Koleksi Busana
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Songket tradisional, dress moden, dan persalinan nikah yang memukau.
          </p>
        </div>
      </div>

      <Section bgColor="silver">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-charcoal">Songket Eksklusif</h2>
              <p className="text-gray-600 leading-loose text-lg mb-8">
                Koleksi songket tenun tangan kami direka khas untuk menaikkan seri raja sehari.
                Dengan perincian manik yang teliti dan potongan yang 'flattering', anda pasti kelihatan segak dan jelita.
              </p>
              <a href={waLink} target="_blank" rel="noreferrer">
                <Button variant="primary" className="shadow-lg shadow-pink-200">Book Fitting Appointment</Button>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://placehold.co/600x800/fae8ff/86198f?text=Songket+1" className="rounded-3xl w-full h-80 object-cover shadow-2xl" alt="Songket 1" />
              <img src="https://placehold.co/600x800/f5d0fe/a21caf?text=Songket+2" className="rounded-3xl w-full h-80 object-cover mt-12 shadow-2xl" alt="Songket 2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
            <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
              <img src="https://placehold.co/600x800/fff1f2/9f1239?text=Modern+Dress+1" className="rounded-3xl w-full h-80 object-cover mt-12 shadow-2xl" alt="Dress 1" />
              <img src="https://placehold.co/600x800/ffe4e6/be123c?text=Modern+Dress+2" className="rounded-3xl w-full h-80 object-cover shadow-2xl" alt="Dress 2" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-charcoal">Dress & Modern Wear</h2>
              <p className="text-gray-600 leading-loose text-lg mb-8">
                Untuk gaya yang lebih kontemporari, pilihan dress dan suit kami menggabungkan elemen minimalis dengan sentuhan mewah.
              </p>
              <a href={waLink} target="_blank" rel="noreferrer">
                <Button variant="outline" className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white">Lihat Katalog</Button>
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Bridal;