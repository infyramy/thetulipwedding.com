import React from 'react';
import Section from '../components/Section';
import GalleryGrid from '../components/GalleryGrid';
import { GALLERY_ITEMS } from '../constants';

const Gallery: React.FC = () => {
  return (
    <>
      {/* Header - Hero Style */}
      <div className="relative h-[60vh] flex items-center justify-center bg-charcoal overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/hero/hero-wedding-10.jpg"
            alt="Gallery Header Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/35"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in-up">
          <span className="text-pink-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3 block">
            Portfolio
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-md">
            Galeri Kenangan
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Detik indah yang telah kami realisasikan. Inspirasi untuk majlis anda.
          </p>
        </div>
      </div>

      <Section bgColor="silver" padding="none" className="pb-32 pt-12">
        <div className="container mx-auto px-4">
          <GalleryGrid items={GALLERY_ITEMS} />
        </div>
      </Section>
    </>
  );
};

export default Gallery;