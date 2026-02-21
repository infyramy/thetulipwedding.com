import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin, MessageCircle, User, Calendar, Heart, Play } from 'lucide-react';
import { APP_NAME, CONTACT_EMAIL, NAV_LINKS, WHATSAPP_NUMBER, SOCIAL_LINKS } from '../constants';

// ─── CONFIG ──────────────────────────────────────────────
// Replace with your deployed Cloudflare Worker URL after running:
// cd social-api && wrangler deploy
const SOCIAL_API_URL = import.meta.env.VITE_SOCIAL_API_URL || 'https://tulip-social-api.YOUR-SUBDOMAIN.workers.dev';

// ─── TYPES ───────────────────────────────────────────────
interface IGPost {
  id: string;
  shortcode: string;
  url: string;
  thumbnail: string;
  isVideo: boolean;
  likes: number;
  caption: string;
  timestamp: number;
}

interface TTVideo {
  id: string;
  url: string;
  thumbnail: string;
  description: string;
  likes: number;
  plays: number;
  duration: number;
}

interface SocialData {
  instagram?: { posts: IGPost[]; username: string; profilePic: string; followers: number; error?: string };
  tiktok?: { videos: TTVideo[]; username: string; profilePic: string; followers: number; error?: string };
}

// ─── SKELETON ────────────────────────────────────────────
const PostSkeleton = () => (
  <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-2xl bg-gray-200 animate-pulse" />
);

// ─── IG POST CARD ─────────────────────────────────────────
const IGCard: React.FC<{ post: IGPost }> = ({ post }) => (
  <a
    href={post.url}
    target="_blank"
    rel="noreferrer"
    className="relative group w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-2xl overflow-hidden cursor-pointer block shadow-sm hover:shadow-xl transition-all duration-300"
  >
    <img
      src={post.thumbnail}
      alt={post.caption?.slice(0, 60) || 'Instagram post'}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      loading="lazy"
      onError={(e) => {
        // fallback if thumbnail fails (CORS or expired)
        (e.target as HTMLImageElement).src = `https://placehold.co/400x400/fdf2f8/db2777?text=IG`;
      }}
    />
    {/* Instagram overlay */}
    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
      <div className="flex items-center gap-2 text-white text-sm font-semibold">
        <Heart size={14} fill="white" />
        <span>{post.likes?.toLocaleString() ?? '—'}</span>
      </div>
      {post.isVideo && <Play size={20} className="text-white" fill="white" />}
      {post.caption && (
        <p className="text-white text-[10px] text-center line-clamp-2 leading-snug">
          {post.caption.slice(0, 60)}…
        </p>
      )}
    </div>
    {/* Platform badge */}
    <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
      <Instagram size={10} className="text-white" />
    </div>
    {post.isVideo && (
      <div className="absolute top-2 right-2">
        <Play size={14} className="text-white drop-shadow" fill="white" />
      </div>
    )}
  </a>
);

// ─── TIKTOK CARD ──────────────────────────────────────────
const TTCard: React.FC<{ video: TTVideo }> = ({ video }) => (
  <a
    href={video.url}
    target="_blank"
    rel="noreferrer"
    className="relative group w-32 h-48 md:w-36 md:h-56 shrink-0 rounded-2xl overflow-hidden cursor-pointer block shadow-sm hover:shadow-xl transition-all duration-300"
  >
    <img
      src={video.thumbnail}
      alt={video.description?.slice(0, 60) || 'TikTok video'}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      loading="lazy"
      onError={(e) => {
        (e.target as HTMLImageElement).src = `https://placehold.co/300x500/000000/ffffff?text=TikTok`;
      }}
    />
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
      <Play size={24} className="text-white" fill="white" />
      <div className="flex items-center gap-1 text-white text-xs">
        <Heart size={10} fill="white" />
        <span>{video.likes?.toLocaleString() ?? '—'}</span>
      </div>
      {video.plays && (
        <p className="text-white/70 text-[9px]">{(video.plays / 1000).toFixed(1)}k views</p>
      )}
    </div>
    {/* TikTok badge */}
    <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black flex items-center justify-center border border-white/30">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    </div>
    {/* Play icon always visible */}
    <div className="absolute bottom-2 right-2">
      <Play size={12} className="text-white/80 drop-shadow" fill="white" />
    </div>
  </a>
);

// ─── MAIN FOOTER ──────────────────────────────────────────
const Footer: React.FC = () => {
  const [form, setForm] = useState({ name: '', date: '', type: 'Pakej Lengkap' });
  const [social, setSocial] = useState<SocialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'instagram' | 'tiktok'>('instagram');
  const marqueeRef = useRef<HTMLDivElement>(null);

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Assalamualaikum, saya nak tanya tentang servis The Tulip Weddings`;

  // Fetch social data from worker
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${SOCIAL_API_URL}/`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        setSocial(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const handleExpressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;
    const text = `*Enquiry Dari Footer Website* 👇%0A%0A👤 Nama: ${form.name}%0A📅 Tarikh: ${form.date || 'Belum ada'}%0A📦 Minat: ${form.type}%0A%0ABoleh check kekosongan?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Assalamualaikum, saya nak check tarikh kosong untuk majlis. ${text}`, '_blank');
  };

  // Build combined items for marquee
  const igPosts = social?.instagram?.posts ?? [];
  const ttVideos = social?.tiktok?.videos ?? [];
  // Interleave IG and TT for a mixed feed marquee
  const feedItems: Array<{ type: 'ig'; data: IGPost } | { type: 'tt'; data: TTVideo }> = [];
  const maxLen = Math.max(igPosts.length, ttVideos.length);
  for (let i = 0; i < maxLen; i++) {
    if (igPosts[i]) feedItems.push({ type: 'ig', data: igPosts[i] });
    if (ttVideos[i]) feedItems.push({ type: 'tt', data: ttVideos[i] });
  }

  // Duplicate for seamless loop
  const marqueeItems = [...feedItems, ...feedItems];

  return (
    <>
      {/* ── SOCIAL FEED SECTION ── */}
      <div className="w-full bg-white py-12 border-t border-gray-100 overflow-hidden pb-40 relative z-40">
        {/* Header */}
        <div className="container mx-auto px-4 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                <span className="text-pink-400 text-[10px] font-bold uppercase tracking-widest">Live Feed</span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-charcoal mb-1">Ikuti Perkembangan Kami</h3>
              <p className="text-gray-500 text-sm font-light max-w-lg">Post & video terkini terus dari Instagram dan TikTok @dtulip_wedding.</p>
            </div>

            {/* Tab switcher + profile stats */}
            <div className="flex flex-col items-end gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('instagram')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'instagram'
                      ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                >
                  <Instagram size={14} /> Instagram
                </button>
                <button
                  onClick={() => setActiveTab('tiktok')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'tiktok'
                      ? 'bg-black text-white shadow-lg'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                  TikTok
                </button>
              </div>

              {/* Profile preview */}
              {!loading && social && (
                <div className="flex items-center gap-3">
                  {activeTab === 'instagram' && social.instagram && !social.instagram.error && (
                    <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-pink-500 transition-colors">
                      {social.instagram.profilePic && (
                        <img src={social.instagram.profilePic} alt="IG profile" className="w-7 h-7 rounded-full object-cover border-2 border-pink-300" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      )}
                      <span className="font-medium">@{social.instagram.username}</span>
                      {social.instagram.followers && (
                        <span className="text-gray-400 text-xs">{(social.instagram.followers / 1000).toFixed(1)}k followers</span>
                      )}
                    </a>
                  )}
                  {activeTab === 'tiktok' && social.tiktok && !social.tiktok.error && (
                    <a href={SOCIAL_LINKS.TIKTOK} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors">
                      {social.tiktok.profilePic && (
                        <img src={social.tiktok.profilePic} alt="TT profile" className="w-7 h-7 rounded-full object-cover border-2 border-gray-300" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      )}
                      <span className="font-medium">@{social.tiktok.username}</span>
                      {social.tiktok.followers && (
                        <span className="text-gray-400 text-xs">{(social.tiktok.followers / 1000).toFixed(1)}k followers</span>
                      )}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scrolling feed */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          {loading ? (
            // Skeleton
            <div className="flex gap-4 px-8">
              {Array.from({ length: 8 }).map((_, i) => <PostSkeleton key={i} />)}
            </div>
          ) : feedItems.length > 0 ? (
            // Real posts marquee
            <div
              ref={marqueeRef}
              className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused] px-8 items-center"
            >
              {marqueeItems.map((item, i) =>
                item.type === 'ig'
                  ? <IGCard key={`ig-${i}`} post={item.data} />
                  : <TTCard key={`tt-${i}`} video={item.data} />
              )}
            </div>
          ) : (
            // Fallback: worker not yet deployed or errors
            <div className="flex gap-4 px-8">
              <div className="flex flex-col items-center justify-center w-full py-8 text-center text-gray-400 gap-3">
                <Instagram size={32} className="opacity-40" />
                <p className="text-sm max-w-sm">
                  Deploy the Cloudflare Worker to show live posts.<br />
                  See <code className="bg-gray-100 px-1 rounded text-xs">social-api/README.md</code> for instructions.
                </p>
                <div className="flex gap-3">
                  <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium">
                    <Instagram size={14} /> @dtulip_wedding
                  </a>
                  <a href={SOCIAL_LINKS.TIKTOK} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-sm font-medium">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                    @dtulip_wedding
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── CTA FORM (OVERLAPPING FOOTER) ── */}
      <section className="relative bg-charcoal">
        <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-50">
          <div className="bg-[#1A1A1A] border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden -mt-32 sm:-mt-40 mb-16 max-w-6xl mx-auto">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center justify-between">
              <div className="lg:w-5/12 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 mb-2 justify-center lg:justify-start">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-pink-400 text-[10px] font-bold uppercase tracking-widest">Tempahan 2026 Kini Dibuka</span>
                </div>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
                  Realitikan <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-white italic">Impian Anda.</span>
                </h2>
              </div>
              <div className="lg:w-7/12 w-full">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                  <p className="text-gray-300 text-sm mb-4 font-medium opacity-90">Terus semak kekosongan tarikh majlis anda:</p>
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

        {/* ── MAIN FOOTER LINKS ── */}
        <footer className="w-full pt-10 pb-6 border-t border-white/5 relative z-40">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="space-y-4">
                <Link to="/" className="block">
                  <img src="/assets/LOGO THE TULIP AI (2).svg" alt={APP_NAME} className="h-12 w-auto opacity-90 hover:opacity-100 transition-opacity" />
                </Link>
                <p className="text-gray-400 text-xs leading-relaxed max-w-xs font-light">
                  Premium Wedding Planner & Hall di Batu Pahat. Mencipta memori abadi dengan sentuhan elegan moden untuk seluruh warga Johor.
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

      {/* ── FLOATING WHATSAPP ── */}
      <a href={waLink} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group">
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