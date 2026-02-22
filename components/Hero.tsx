import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { ArrowDown, MessageCircle, Award } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';
import BlurText from './BlurText';

const HERO_IMAGES = [
  "/assets/images/bridal/decoration-pelamin-01.jpg",
  "/assets/images/hero/hero-hall-bg.jpg",
  "/assets/images/hero/kanopi-setup-04.jpg",
  "/assets/images/hero/hero-wedding-04.jpg"
];

const Hero: React.FC = () => {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Assalamualaikum, saya nak check tarikh kosong untuk majlis tahun 2026. Boleh?`;

  // Initialize with a randomized order
  const [shuffledImages] = useState(() => [...HERO_IMAGES].sort(() => Math.random() - 0.5));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % shuffledImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [shuffledImages]);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center bg-charcoal pb-32 md:pb-40">
      {/* Cinematic Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {/* Dark overlay for perfect text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-20"></div>

        {shuffledImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          >
            <img
              src={src}
              alt="The Tulip Wedding Moment"
              className="w-full h-full object-cover object-center animate-zoom-slow"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-30 container mx-auto px-4 pt-24 md:pt-28 lg:pt-32 text-center text-white">
        <div className="max-w-5xl mx-auto flex flex-col items-center animate-fade-in-up">

          {/* Authority Tagline - Slightly smaller vertical padding */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] md:text-xs tracking-[0.15em] uppercase font-semibold text-white mb-6 hover:bg-white/20 transition-colors cursor-default shadow-lg">
            <Award size={14} className="text-pink-400" />
            <span>Pakar Perkahwinan Premium Johor</span>
          </div>

          {/* Headline - Scaled Down (was 5xl/7xl/9xl -> now 4xl/6xl/8xl) */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl font-bold leading-[1.1] tracking-tight drop-shadow-2xl mb-6 flex flex-col items-center justify-center">
            <BlurText
              text="Pesona Cinta"
              delay={200}
              globalDelay={0.8}
              animateBy="words"
              direction="bottom"
              className="flex justify-center flex-wrap"
            />
            <BlurText
              text="Raja Sehari"
              delay={200}
              globalDelay={1.4}
              animateBy="words"
              direction="bottom"
              className="flex justify-center flex-wrap mt-2 italic"
              textClassName="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-pink-200"
            />
          </h1>

          {/* Subheadline - Scaled Down & tighter margin */}
          <p className="font-sans text-sm md:text-lg text-gray-100 leading-relaxed max-w-2xl mx-auto font-light tracking-wide drop-shadow-lg mb-10 opacity-95">
            Pakar pengurusan majlis perkahwinan lengkap di Batu Pahat & seluruh Johor. <br className="hidden md:block" />
            <span className="font-semibold text-pink-200">Dewan • Katering • Busana • Pelamin</span> — Semua di bawah satu bumbung.
          </p>

          {/* CTA Buttons - Slightly reduced padding */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto pb-8 md:pb-10">
            <a href={waLink} target="_blank" rel="noreferrer" className="w-full sm:w-auto group">
              <Button
                size="md"
                variant="white"
                className="w-full sm:w-auto sm:min-w-[200px] border-none shadow-lg hover:shadow-xl font-semibold tracking-wide"
              >
                <MessageCircle className="mr-2 inline-block" size={18} />
                Semak Tarikh 2026
              </Button>
            </a>
            <Link to="/packages" className="w-full sm:w-auto">
              <Button
                size="md"
                variant="outline"
                className="w-full sm:w-auto sm:min-w-[200px] border-white/50 text-white hover:bg-white/10 hover:border-white backdrop-blur-sm font-semibold tracking-wide"
              >
                Lihat Katalog Pakej
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Moved higher to avoid overlap with the next section card */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 animate-bounce text-white/70">
        <ArrowDown size={28} strokeWidth={1} />
      </div>
    </div>
  );
};

export default Hero;
