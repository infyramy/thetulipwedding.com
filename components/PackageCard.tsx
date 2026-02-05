import React from 'react';
import { Package } from '../types';
import Button from './Button';
import { Check, Star, MessageCircle, Info } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

interface PackageCardProps {
  pkg: Package;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Dtulips,%20saya%20berminat%20dengan%20${encodeURIComponent(pkg.name)}.`;
  const isVilla = pkg.name.toLowerCase().includes('villa');
  const isFeatured = pkg.featured;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/1000x800/e2e8f0/64748b?text=Image+Not+Found';
  };

  // UX Improvement: Distinct visual separation between Premium (Villa) and Standard packages
  // Villa = Dark Luxury (Evening Vibe). Others = Clean White (Brochure Vibe).
  
  return (
    <div className={`group relative flex flex-col h-full rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
      isVilla 
        ? 'bg-[#1A1A1A] text-white ring-1 ring-white/10 shadow-2xl shadow-black/50' 
        : 'bg-white text-charcoal ring-1 ring-gray-200 shadow-xl hover:shadow-2xl hover:shadow-pink-100'
    }`}>
      
      {/* Texture Overlay for Premium Feel */}
      {isVilla && <div className="absolute inset-0 bg-noise opacity-[0.08] pointer-events-none z-0"></div>}

      {/* Header / Image Section */}
      <div className="relative h-72 overflow-hidden z-10">
        <div className={`absolute inset-0 z-10 ${isVilla ? 'bg-gradient-to-t from-[#1A1A1A] to-transparent' : 'bg-gradient-to-t from-black/60 via-transparent to-transparent'}`}></div>
        <img 
          src={pkg.image} 
          alt={pkg.name} 
          onError={handleImageError}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        
        {/* Category Badge */}
        <div className="absolute top-5 left-5 z-20">
           <span className={`inline-block px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md shadow-sm ${
             isVilla 
               ? 'text-white border border-white/20 bg-black/30' 
               : 'text-charcoal bg-white/90'
           }`}>
            {pkg.category} Series
           </span>
        </div>

        {/* Featured Ribbon */}
        {isFeatured && (
          <div className="absolute top-5 right-5 z-20">
            <span className="bg-pink-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1 ring-2 ring-pink-500 ring-offset-1">
              <Star size={10} fill="currentColor" /> Pilihan Ramai
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full p-6 z-20">
           <h3 className={`font-serif text-3xl font-medium leading-none mb-1 ${isVilla ? 'text-white' : 'text-white'}`}>
             {pkg.name}
           </h3>
           <div className={`h-1 w-12 rounded-full ${isVilla ? 'bg-pink-500' : 'bg-white'}`}></div>
        </div>
      </div>

      {/* Pricing & Content */}
      <div className="p-8 flex-grow flex flex-col relative z-10">
        
        {/* Pricing Block - Styled like a menu */}
        <div className={`mb-6 pb-6 border-b border-dashed ${isVilla ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="flex items-baseline gap-1">
             <span className={`text-lg font-light ${isVilla ? 'text-gray-400' : 'text-gray-500'}`}>Harga:</span>
             <h4 className={`font-sans text-2xl lg:text-[1.75rem] font-bold tracking-tight ${isVilla ? 'text-pink-400' : 'text-charcoal'}`}>
               {pkg.price}
             </h4>
          </div>
          <p className={`text-sm mt-3 leading-relaxed font-light ${isVilla ? 'text-gray-300' : 'text-gray-600'}`}>
            {pkg.description}
          </p>
        </div>

        {/* Features List - Checklist Style */}
        <div className="space-y-3 mb-10 flex-grow">
          <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${isVilla ? 'text-gray-500' : 'text-gray-400'}`}>Apa yang termasuk:</p>
          {pkg.features.slice(0, 8).map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 group/item">
              <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                isVilla 
                  ? 'bg-white/10 text-pink-400 group-hover/item:bg-pink-600 group-hover/item:text-white' 
                  : 'bg-pink-50 text-pink-600 group-hover/item:bg-pink-600 group-hover/item:text-white'
              }`}>
                <Check size={12} strokeWidth={3} />
              </span>
              <span className={`text-sm font-medium leading-snug ${isVilla ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
            </div>
          ))}
        </div>

        {/* Action Button - Full Width */}
        <div className="mt-auto">
           <a href={waLink} target="_blank" rel="noreferrer" className="block w-full group/btn">
            <Button 
              fullWidth 
              variant={isVilla ? 'white' : 'outline'} 
              className={`py-4 text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                isVilla 
                  ? 'border-none shadow-lg hover:bg-pink-600 hover:text-white' 
                  : 'border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white hover:border-charcoal'
              }`}
            >
              <MessageCircle size={18} /> Dapatkan Quotation
            </Button>
          </a>
          <p className={`text-[10px] text-center mt-3 ${isVilla ? 'text-gray-500' : 'text-gray-400'}`}>
            *Klik untuk perbincangan lanjut di WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;