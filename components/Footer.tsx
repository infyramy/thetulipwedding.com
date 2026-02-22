import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin, MessageCircle, User, Calendar, Play } from 'lucide-react';
import { APP_NAME, CONTACT_EMAIL, NAV_LINKS, WHATSAPP_NUMBER, SOCIAL_LINKS } from '../constants';

type SocialPost = {
  id: string;
  url: string;
  thumbnail?: string;
  caption?: string;
  likes?: number;
  views?: number;
  isVideo?: boolean;
  type: 'instagram' | 'tiktok';
  timestamp?: number;
};

type SocialFeedCache = {
  lastUpdated: string | null;
  instagram: SocialPost[];
  tiktok: SocialPost[];
};

const Footer: React.FC = () => {
  const [form, setForm] = useState({ name: '', date: '', type: 'Pakej Lengkap' });
  const [feedPosts, setFeedPosts] = useState<SocialPost[]>([]);
  const [feedLoading, setFeedLoading] = useState(true);
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Assalamualaikum, saya nak tanya tentang servis The Tulip Weddings`;

  useEffect(() => {
    fetch('/social-feed.json')
      .then((r) => r.json())
      .then((data: SocialFeedCache) => {
        // Merge IG + TikTok posts, interleaved for variety in marquee
        const ig = (data.instagram || []).slice(0, 8);
        const tt = (data.tiktok || []).slice(0, 4);
        const merged: SocialPost[] = [];
        const maxLen = Math.max(ig.length, tt.length);
        for (let i = 0; i < maxLen; i++) {
          if (ig[i]) merged.push(ig[i]);
          if (tt[i]) merged.push(tt[i]);
        }
        setFeedPosts(merged);
      })
      .catch(() => setFeedPosts([]))
      .finally(() => setFeedLoading(false));
  }, []);

  const handleExpressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;

    const text = `*Enquiry Dari Footer Website* 👇%0A%0A👤 Nama: ${form.name}%0A📅 Tarikh: ${form.date || 'Belum ada'}%0A📦 Minat: ${form.type}%0A%0ABoleh check kekosongan?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Assalamualaikum, saya nak check tarikh kosong untuk majlis. ${text}`, '_blank');
  };

  return (
    <>
      {/* SOCIAL MEDIA FEED (SCROLLING GRID) */}
      <div className="w-full bg-white py-12 border-t border-gray-100 overflow-hidden pb-32 relative z-40">
        <div className="container mx-auto px-4 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-2 justify-center lg:justify-start">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                <span className="text-pink-400 text-[10px] font-bold uppercase tracking-widest">
                  Live Feed
                </span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-charcoal mb-2">Ikuti Perkembangan Kami</h3>
              <p className="text-gray-500 text-sm font-light max-w-lg">Lihat hasil kerja terkini, video di sebalik tabir dan inspirasi majlis secara langsung dari studio.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <a
                href={SOCIAL_LINKS.INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-pink-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                <Instagram size={18} />
                <span>@dtulip_wedding</span>
              </a>
              <a
                href={SOCIAL_LINKS.TIKTOK}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                <span>@dtulip_wedding</span>
              </a>
            </div>
          </div>
        </div>

        {/* SCROLLING FEED PREVIEW — reads from /social-feed.json (scraped cache) */}
        {feedLoading ? (
          <div className="flex gap-4 px-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : feedPosts.length > 0 ? (
          <div
            className="relative w-full overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}
          >
            {/* Duplicate array for seamless infinite loop */}
            <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused] px-4">
              {[...feedPosts, ...feedPosts].map((post, idx) => {
                const isIG = post.type === 'instagram';
                const link = post.url;
                const thumb = post.thumbnail;
                return (
                  <a
                    key={`${post.id}-${idx}`}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="relative group w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-gray-100 block shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    {/* Thumbnail */}
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={post.caption || 'Social post'}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                        {isIG ? <Instagram className="text-pink-400 w-10 h-10" /> : <Play className="text-black w-10 h-10" />}
                      </div>
                    )}

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-3">
                      {isIG ? (
                        <Instagram className="text-white w-7 h-7" />
                      ) : (
                        <svg className="text-white w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" /></svg>
                      )}
                      {post.caption && (
                        <p className="text-white text-[10px] text-center leading-tight line-clamp-2 opacity-90">{post.caption}</p>
                      )}
                    </div>

                    {/* Platform badge */}
                    <div className={`absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center ${isIG ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600' : 'bg-black'
                      }`}>
                      {isIG
                        ? <Instagram className="text-white" size={10} />
                        : <svg className="text-white" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" /></svg>
                      }
                    </div>

                    {/* Video indicator */}
                    {post.isVideo && (
                      <div className="absolute top-2 right-2">
                        <Play className="text-white drop-shadow" size={14} fill="white" />
                      </div>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        ) : (
          /* Feed not scraped yet — show a prompt to run the scraper */
          <div className="container mx-auto px-4">
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center">
              <Instagram className="text-gray-300 mx-auto mb-3" size={40} />
              <p className="text-gray-500 text-sm font-medium">Feed belum dimuatkan.</p>
              <p className="text-gray-400 text-xs mt-1">Jalankan <code className="bg-gray-100 px-1.5 py-0.5 rounded text-pink-600">npm run scrape</code> untuk memuatkan post Instagram & TikTok.</p>
            </div>
          </div>
        )}
      </div>

      {/* COMPACT FOOTER FORM & CTA (OVERLAPPING PREVIOUS SECTIONS) */}
      <section className="relative bg-charcoal">
        <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-50">
          {/* Overlapping Container */}
          <div className="bg-[#1A1A1A] border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden -mt-16 sm:-mt-20 mb-16 max-w-6xl mx-auto">

            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center justify-between">

              {/* Text Side - Compact */}
              <div className="lg:w-5/12 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 mb-2 justify-center lg:justify-start">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-pink-400 text-[10px] font-bold uppercase tracking-widest">
                    Tempahan 2026 Kini Dibuka
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
                  Realitikan <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-white italic">Impian Anda.</span>
                </h2>
              </div>

              {/* Express Form Side - Compact Horizontal */}
              <div className="lg:w-7/12 w-full">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl relative">
                  <p className="text-gray-300 text-sm mb-4 font-medium opacity-90">
                    Terus semak kekosongan tarikh majlis anda:
                  </p>
                  <form onSubmit={handleExpressSubmit} className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 space-y-3 md:space-y-0 md:flex md:gap-3">
                      <div className="relative flex-1">
                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Nama"
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="relative flex-1">
                        <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Tarikh Majlis"
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
                          value={form.date}
                          onChange={e => setForm({ ...form, date: e.target.value })}
                        />
                      </div>
                    </div>

                    <button type="submit" className="md:w-auto bg-[#25D366] hover:bg-[#1EBE57] text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 text-sm whitespace-nowrap">
                      <MessageCircle size={18} fill="white" /> Semak Tarikh
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* MAIN FOOTER LINKS */}
        <footer className="w-full pt-10 pb-6 border-t border-white/5 relative z-40">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Brand */}
              <div className="space-y-4">
                <Link to="/" className="block">
                  <img
                    src="/assets/images/logo/logo-tulip-icon.svg"
                    alt={APP_NAME}
                    className="h-12 w-auto opacity-90 hover:opacity-100 transition-opacity"
                  />
                </Link>
                <p className="text-gray-400 text-xs leading-relaxed max-w-xs font-light">
                  Premium Wedding Planner & Hall di Johor. Mencipta memori abadi dengan sentuhan elegan moden untuk seluruh warga Johor.
                </p>
                <div className="flex space-x-3 pt-1">
                  <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-600 hover:border-pink-600 hover:text-white transition-all text-gray-400">
                    <Instagram size={14} />
                  </a>
                  <a href={SOCIAL_LINKS.FACEBOOK} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-600 hover:border-pink-600 hover:text-white transition-all text-gray-400">
                    <Facebook size={14} />
                  </a>
                  <a href={SOCIAL_LINKS.TIKTOK} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-600 hover:border-pink-600 hover:text-white transition-all text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-serif text-base font-bold mb-4 text-white tracking-wide">Menu</h4>
                <ul className="space-y-2">
                  {NAV_LINKS.map(link => (
                    <li key={link.name}>
                      <Link to={link.path} className="text-gray-400 hover:text-pink-400 text-xs transition-colors flex items-center gap-2 group">
                        <span className="w-1 h-1 bg-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-serif text-base font-bold mb-4 text-white tracking-wide">Hubungi</h4>
                <ul className="space-y-3 text-xs text-gray-400 font-light">
                  <li className="flex items-start gap-3">
                    <MapPin size={14} className="text-pink-600 shrink-0 mt-0.5" />
                    <span>Jalan Parit Botak, Parit Daun, Parit Raja,<br />Batu Pahat, Malaysia, 86400</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone size={14} className="text-pink-600 shrink-0" />
                    <span>+6012 770 7912</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail size={14} className="text-pink-600 shrink-0" />
                    <span>{CONTACT_EMAIL}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600">
              <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
              <div className="flex space-x-6 mt-2 md:mt-0">
                <Link to="#" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
                <Link to="#" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>
      </section>

      {/* FIXED FLOATING WHATSAPP CTA */}
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
      >
        <div className="hidden md:flex flex-col items-end mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-white text-charcoal px-3 py-1.5 rounded-lg shadow-xl text-[10px] font-bold mb-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Online
          </span>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-40"></div>
          <div className="w-14 h-14 bg-[#25D366] hover:bg-[#1dbf57] rounded-full flex items-center justify-center text-white shadow-[0_10px_20px_rgba(37,211,102,0.3)] transition-all duration-300 transform hover:scale-110 border-4 border-white/20">
            <MessageCircle size={28} fill="white" />
          </div>
        </div>
      </a>
    </>
  );
};

export default Footer;
