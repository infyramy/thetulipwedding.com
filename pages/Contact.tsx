import React from 'react';
import Section from '../components/Section';
import FAQ from '../components/FAQ';
import { Phone, Mail, MapPin } from 'lucide-react';
import { CONTACT_EMAIL } from '../constants';

const Contact: React.FC = () => {
  return (
    <>
      {/* Header - Hero Style */}
      <div className="relative h-[60vh] flex items-center justify-center bg-charcoal overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/hero/hero-contact-bg.jpg"
            alt="Contact Header Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/35"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in-up">
          <span className="text-pink-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3 block">
            Hubungi Kami
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-md">
            Mari Bincang
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Ada soalan atau sedia untuk menempah? Kami sedia membantu merealisasikan impian anda di Batu Pahat dan seluruh Johor.
          </p>
        </div>
      </div>

      <Section bgColor="silver">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:w-5/12 space-y-8">
            <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100">
              <h3 className="font-serif text-2xl font-bold mb-8 text-charcoal">Info The Tulip</h3>
              <ul className="space-y-8">
                <li className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-primaryDark rounded-full flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-charcoal text-lg mb-2">
                      Lokasi Operasi
                    </p>
                    <iframe
                      src="https://maps.google.com/maps?q=The%20Tulip%20Wedding%20%26%20Events,%20Parit%20Raja,%20Batu%20Pahat&t=&z=14&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-xl border border-gray-100 shadow-sm mb-4"
                    ></iframe>
                    <p className="text-gray-500 text-sm leading-relaxed mb-1">
                      Pusat Perniagaan Parit Raja,<br />
                      Mukim 11, Jalan Parit Botak,<br />
                      86400 Batu Pahat, Johor
                    </p>
                    <a
                      href="https://share.google/bI6q4Xwu6g96qfxzy"
                      target="_blank"
                      rel="noreferrer"
                      className="text-pink-600 font-semibold text-sm hover:underline inline-flex items-center gap-1 mb-2"
                    >
                      Buka di Google Maps &rarr;
                    </a>
                    <p className="text-gray-400 text-xs italic">
                      * Meliputi seluruh Johor (kecuali Mersing)
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-primaryDark rounded-full flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-charcoal text-lg">Telefon / WhatsApp</p>
                    <p className="text-gray-500 text-base">+60 12 770 7912</p>
                  </div>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-primaryDark rounded-full flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-charcoal text-lg">Email</p>
                    <p className="text-gray-500 text-base">{CONTACT_EMAIL}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="lg:w-7/12">
            <FAQ />
          </div>
        </div>
      </Section>
    </>
  );
};

export default Contact;