
import React, { useState } from 'react';
import { Hall } from '../types';
import { MapPin, Users, ArrowRight, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';
import { WHATSAPP_NUMBER } from '../constants';

interface HallCardProps {
  hall: Hall;
}

const HallCard: React.FC<HallCardProps> = ({ hall }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Assalamualaikum, saya berminat dengan dewan ${encodeURIComponent(hall.name)}. Boleh check tarikh kosong dan harga pakej?`;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % hall.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + hall.images.length) % hall.images.length);
  };

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col md:flex-row group border border-gray-100 relative md:h-[550px]">

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

      {/* Image Side - Fixed Height/Width Ratio */}
      <div className="md:w-1/2 h-72 md:h-full relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>

        <img
          src={hall.images[currentImageIndex]}
          alt={`${hall.name} - View ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
        />

        {/* Slider Navigation */}
        {hall.images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={prevImage}
              className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-charcoal transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-charcoal transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Slider Dots */}
        {hall.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {hall.images.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Side */}
      <div className="md:w-1/2 p-8 md:p-12 flex flex-col relative z-10 bg-white/80 backdrop-blur-sm md:h-full">
        {/* Decorative icon behind */}
        <div className="absolute right-6 top-6 opacity-5 text-charcoal pointer-events-none">
          <MapPin size={140} />
        </div>

        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-charcoal leading-tight group-hover:text-pink-600 transition-colors">
          {hall.name}
        </h3>

        <div className="flex items-start text-gray-500 mb-6 text-sm md:text-base font-medium">
          <MapPin size={18} className="mr-2 mt-1 text-pink-500 shrink-0" />
          <div className="flex flex-col">
            <span className="text-charcoal font-bold">{hall.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 content-start">
          {hall.facilities.map((fac, idx) => (
            <span key={idx} className="px-3 py-1.5 bg-gray-50 text-charcoal text-[10px] md:text-xs font-bold uppercase tracking-wide rounded-lg border border-gray-200">
              {fac}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Anggaran Harga</p>
            <p className="text-xl md:text-2xl font-bold text-charcoal">{hall.priceRange}</p>
          </div>
          <a href={waLink} target="_blank" rel="noreferrer" className="w-full xl:w-auto">
            <Button size="md" className="bg-charcoal text-white hover:bg-[#25D366] hover:border-[#25D366] hover:shadow-lg hover:shadow-green-500/30 w-full transition-all text-sm md:text-base">
              <MessageCircle size={18} className="mr-2" /> Tahu Lebih Laju
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HallCard;