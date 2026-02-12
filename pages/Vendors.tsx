import React from 'react';
import Section from '../components/Section';
import Button from '../components/Button';
import { VENDORS } from '../constants';

const Vendors: React.FC = () => {
  return (
    <>
      {/* Header - Hero Style */}
      <div className="relative h-[60vh] flex items-center justify-center bg-charcoal overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/dtulips 2.jpg"
            alt="Vendors Header Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/35"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in-up">
          <span className="text-pink-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3 block">
            Partners
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-md">
            Rakan Vendor Kami
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Kami bekerjasama dengan yang terbaik di industri untuk memastikan majlis anda berjalan lancar.
          </p>
        </div>
      </div>

      <Section bgColor="silver">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VENDORS.map(vendor => (
              <div key={vendor.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100">
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 text-center">
                  <span className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-3 block">{vendor.type}</span>
                  <h3 className="font-serif text-xl font-bold mb-3 text-charcoal">{vendor.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">{vendor.description}</p>
                  <p className="font-semibold text-charcoal mb-6 bg-gray-50 py-2 rounded-lg">Dari {vendor.startPrice}</p>
                  <Button size="sm" variant="outline" className="w-full border-gray-300 hover:border-charcoal hover:bg-charcoal hover:text-white">View Portfolio</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};

export default Vendors;