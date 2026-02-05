import React from 'react';
import { Hall } from '../types';
import { MapPin, Users, ArrowRight, MessageCircle } from 'lucide-react';
import Button from './Button';
import { WHATSAPP_NUMBER } from '../constants';

interface HallCardProps {
  hall: Hall;
}

const HallCard: React.FC<HallCardProps> = ({ hall }) => {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Dtulips,%20saya%20nak%20tanya%20kekosongan%20untuk%20${encodeURIComponent(hall.name)}.`;

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col md:flex-row group border border-gray-100 relative">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

      {/* Image Side */}
      <div className="md:w-1/2 min-h-[360px] relative overflow-hidden">
        <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
        <img 
          src={hall.image} 
          alt={hall.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
        />
        
        {/* Floating Capacity Badge */}
        <div className="absolute top-6 left-6 z-20">
           <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg flex items-center gap-3 text-charcoal">
             <div className="bg-pink-100 p-2 rounded-full">
               <Users size={16} className="text-pink-600" />
             </div>
             <span className="text-sm font-bold uppercase tracking-wider">{hall.capacity}</span>
           </div>
        </div>
      </div>

      {/* Content Side */}
      <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center relative z-10 bg-white/80 backdrop-blur-sm">
        {/* Decorative icon behind */}
        <div className="absolute right-6 top-6 opacity-5 text-charcoal">
          <MapPin size={140} />
        </div>

        <h3 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-charcoal leading-none group-hover:text-pink-600 transition-colors">
          {hall.name}
        </h3>
        
        <div className="flex items-start text-gray-500 mb-8 text-base font-medium">
          <MapPin size={18} className="mr-2 mt-1 text-pink-500 shrink-0" />
          <div className="flex flex-col">
            <span className="text-charcoal font-bold">{hall.location}</span>
            {hall.address && (
              <span className="text-sm font-light mt-1 text-gray-400">{hall.address}</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {hall.facilities.map((fac, idx) => (
            <span key={idx} className="px-4 py-2 bg-gray-50 text-charcoal text-xs font-bold uppercase tracking-wide rounded-lg border border-gray-200">
              {fac}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold mb-1">Anggaran Harga</p>
            <p className="text-2xl font-bold text-charcoal">{hall.priceRange}</p>
          </div>
          <a href={waLink} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
            <Button size="md" className="bg-charcoal text-white hover:bg-[#25D366] hover:border-[#25D366] hover:shadow-lg hover:shadow-green-500/30 w-full transition-all">
              <MessageCircle size={18} className="mr-2"/> Check Tarikh
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HallCard;