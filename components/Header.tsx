import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Gem } from 'lucide-react';
import { NAV_LINKS, WHATSAPP_NUMBER, APP_NAME } from '../constants';
import Button from './Button';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const isHome = location.pathname === '/';

  // Header logic: Transparent on top of home, White/Glass on scroll or other pages
  // Header logic: Transparent on top for ALL pages, White/Glass on scroll
  const headerClass = `fixed w-full z-[100] transition-all duration-500 ${scrolled
    ? 'bg-white/90 backdrop-blur-lg border-b border-gray-100 py-3 shadow-sm'
    : 'bg-transparent py-6'
    }`;

  const logoColor = scrolled ? 'text-charcoal' : 'text-white';
  const navLinkColor = scrolled ? 'text-gray-600 hover:text-primaryDark' : 'text-white/90 hover:text-white';
  const navLinkActive = scrolled ? 'text-primaryDark font-semibold' : 'text-white font-semibold';

  return (
    <>
      <nav className={headerClass}>
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 z-[110] group relative">
            <img
              src={scrolled
                ? "/assets/images/logo/logo-tulip-full.svg" // Light Mode (Color)
                : "/assets/images/logo/logo-tulip-icon.svg" // Dark Mode (White)
              }
              alt={APP_NAME}
              className="h-12 w-auto transition-all duration-300 drop-shadow-md"
            />
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-all duration-300 relative group ${isActive ? navLinkActive : navLinkColor}`
                }
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primaryDark transition-all duration-300 group-hover:w-full`}></span>
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
              <Button
                size="sm"
                variant={scrolled ? "primary" : "outline"}
                className={!scrolled ? "border-white text-white hover:bg-white hover:text-black" : ""}
              >
                WhatsApp Kami
              </Button>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden z-[110] p-2 focus:outline-none transition-colors ${isOpen ? 'text-charcoal' : logoColor
              }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Full Screen Menu */}
      <div className={`fixed inset-0 z-[100] bg-white transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'
        }`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-6">
          {NAV_LINKS.map((link, idx) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `font-serif text-4xl font-medium transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } ${isActive ? 'text-primaryDark' : 'text-charcoal hover:text-primaryDark'}`
              }
              style={{ transitionDelay: `${100 + idx * 50}ms` }}
            >
              {link.name}
            </NavLink>
          ))}

          <div className={`pt-8 transform transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
              <Button size="lg" variant="primary" className="shadow-xl shadow-pink-200 w-64 justify-center">
                WhatsApp Sekarang
              </Button>
            </a>
          </div>

          {/* Decorative */}
          <div className="absolute bottom-10 left-0 w-full text-center text-gray-400 text-xs uppercase tracking-widest">
            Batu Pahat, Johor
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;