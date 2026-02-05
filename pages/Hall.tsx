import React from 'react';
import Section from '../components/Section';
import HallCard from '../components/HallCard';
import Map from '../components/Map';
import { HALLS } from '../constants';

const Hall: React.FC = () => {
  return (
    <>
      {/* Header - Hero Style */}
      <div className="relative h-[60vh] flex items-center justify-center bg-charcoal overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/MSY_9176.jpg"
            alt="Hall Header Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in-up">
          <span className="text-pink-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3 block">
            Lokasi Majlis
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-md">
            Dewan Eksklusif
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Ruang yang sempurna untuk meraikan cinta anda bersama keluarga dan sahabat handai di Batu Pahat.
          </p>
        </div>
      </div>

      <Section bgColor="silver">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16">
            {HALLS.map(hall => (
              <HallCard key={hall.id} hall={hall} />
            ))}
          </div>
        </div>
      </Section>

      <Section bgColor="white" className="text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-charcoal">Lokasi Strategik</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-xl font-light">
            Dewan kami terletak di lokasi strategik Batu Pahat, mudah diakses dari lebuhraya dan dikelilingi kemudahan penginapan untuk tetamu jauh.
          </p>
          <div className="w-full h-96 bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-200 relative">
            <Map halls={HALLS} />
          </div>
        </div>
      </Section>
    </>
  );
};

export default Hall;