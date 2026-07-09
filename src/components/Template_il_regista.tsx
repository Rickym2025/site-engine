// src/components/Template_il_regista.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Phone, Mail, MapPin, ChevronDown, Check, Star, ArrowRight, Shield, Film, Video } from 'lucide-react';
import React from 'react';
import GoogleMap from './GoogleMap';
import Link from 'next/link';

interface TemplateProps {
  data: {
    hero: {
      headline: string;
      subheadline: string;
      cta1: string;
      cta2: string;
    };
    servizi: Array<{
      titolo: string;
      descrizione: string;
    }>;
    social_proof: string;
    brand_color?: string;
    video_bg_url?: string;
    email?: string;
    indirizzo?: string;
    social_fb?: string;
    social_ig?: string;
    piva?: string;
  };
  nomeCliente: string;
  slug: string;
  hasBlog?: boolean;
}

export default function Template_il_regista({ data, nomeCliente, slug, hasBlog }: TemplateProps) {
  const { hero, social_proof, brand_color = '#8B5CF6', video_bg_url, email, indirizzo, social_fb, social_ig, piva } = data;
  const servizi = data.servizi || [];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showCookies, setShowCookies] = useState(false);
  const [inviato, setInviato] = useState(false);

  // SORGENTI VIDEO E IMMAGINI CINEMATICHE REALI (VIVE)
  const defaultHeroVideo = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";
  const defaultPhotoLeft = "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop"; // Macchina da presa d'autore
  const defaultPhotoRight = "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop"; // Set luci e registrazione

  const fallbackEmail = email || `produzioni@${nomeCliente.toLowerCase().replace(/[^a-z0-9]/g, '')}.it`;
  const fallbackIndirizzo = indirizzo || "Via dei Registi 10, Cinecittà (RM)";
  const fallbackFb = social_fb || "https://facebook.com";
  const fallbackIg = social_ig || "https://instagram.com";
  const fallbackPiva = piva || "IT01234567890";

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShowCookies(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowCookies(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInviato(true);
  };

  const customStyles = {
    '--brand-color': brand_color,
    '--brand-color-glow': `${brand_color}18`,
    '--brand-color-strong': `${brand_color}55`,
    '--brand-color-light': `${brand_color}bb`,
  } as React.CSSProperties;

  return (
    <div 
      style={customStyles}
      className="min-h-screen bg-[#030308] text-zinc-100 selection:bg-[var(--brand-color)] selection:text-black font-sans antialiased relative overflow-x-hidden"
    >
      {/* Animazione CSS per il testo gigante che scorre in background (Infinite Marquee) */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 25s linear infinite;
        }
      `}</style>

      {/* NAVBAR */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-black text-lg tracking-widest uppercase text-[color:var(--brand-color)]">{nomeCliente}</span>
          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-wider text-zinc-300">
            <a href="#recensioni" className="hover:text-white transition-colors">Testimonianze</a>
            <a href="#progetto" className="hover:text-white transition-colors">Il Progetto</a>
             {/* ⚡ SE IL BLOG È ATTIVO, MOSTRA IL LINK ALLA LISTA ARTICOLI */}
              {hasBlog && (
                <Link href={`/${slug}/blog`} className="hover:text-zinc-950 transition-colors">
                  Blog
                </Link>
              )}
            <a href="#studio" className="hover:text-white transition-colors">Sede</a>
            <a href="#contatto" className="hover:text-white transition-colors">Contatto</a>
          </nav>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 🚀 MODIFICA: HERO SECTION CON VIDEO DI SFONDO ATTIVO (A TUTTA PAGINA) */}
      {/* ========================================================================= */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b border-zinc-900">
        
        {/* Elemento Video in Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35]"
          src={video_bg_url || defaultHeroVideo}
        />
        
        {/* Overlay a gradiente per amalgamare la fine della sezione */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030308]" />

        {/* Testo in sovrapposizione centrato */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-white/10 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md"
          >
            <Video className="h-4 w-4 text-[color:var(--brand-color)]" />
            <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest font-black">Video Production d'Autore</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1] text-white"
          >
            {hero.headline}
          </motion.h1>

          <p className="text-base md:text-xl text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            {hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="#contatto"
              className="bg-[color:var(--brand-color)] text-black font-black text-sm px-8 py-4.5 rounded-2xl flex items-center justify-center space-x-3 shadow-[0_0_25px_var(--brand-color-glow)] hover:brightness-110 transition-all uppercase tracking-wider"
            >
              <Phone className="h-4 w-4" />
              <span>{hero.cta1}</span>
            </a>
            <a
              href="#progetto"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm px-8 py-4.5 rounded-2xl transition-all uppercase tracking-wider"
            >
              <span>{hero.cta2}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🟢 MODIFICA: RIGAS DI 3 RECENSIONI ORIZZONTALI (Layout approvato Google) */}
      {/* ========================================================================= */}
      <section id="recensioni" className="py-16 px-6 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#10B981]/10 border border-[#10B981]/25 p-6 rounded-2xl flex flex-col justify-between text-left relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center space-x-1 text-amber-500 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-500" />)}
            </div>
            <p className="text-sm text-zinc-200 font-light leading-relaxed mb-4">
              "{social_proof}"
            </p>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">— Partner Consigliato</span>
          </div>

          <div className="bg-[#10B981]/10 border border-[#10B981]/25 p-6 rounded-2xl flex flex-col justify-between text-left relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center space-x-1 text-amber-500 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-500" />)}
            </div>
            <p className="text-sm text-zinc-200 font-light leading-relaxed mb-4">
              "Professionalità rara. Hanno saputo ascoltare le nostre esigenze trasformando la visione dello studio in una storia visiva di grandissimo impatto."
            </p>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">— Professionista Sanitario</span>
          </div>

          <div className="bg-[#10B981]/10 border border-[#10B981]/25 p-6 rounded-2xl flex flex-col justify-between text-left relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center space-x-1 text-amber-500 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-500" />)}
            </div>
            <p className="text-sm text-zinc-200 font-light leading-relaxed mb-4">
              "Il design asimmetrico e i contenuti visivi dinamici tengono incollati gli utenti sul nostro sito, raddoppiando le richieste di prenotazione."
            </p>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">— Clinica Privata</span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🖼️ MODIFICA: BLOCCHI ALTERNATI VIVI CON IMMAGINI REALI (Mosaico alternato) */}
      {/* ========================================================================= */}
      <section id="progetto" className="py-12 relative z-10">
        
        {/* Blocco 1: Immagine Viva a SX, Testo a DX */}
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative h-[380px] bg-black">
            <img src={defaultPhotoLeft} alt="Dettagli e Finiture" className="w-full h-full object-cover filter brightness-[0.8]" />
          </div>
          <div className="space-y-6 text-left">
            <span className="text-xs font-mono text-[color:var(--brand-color)] uppercase tracking-wider font-bold">Impatto Cinetico</span>
            <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-b from-white to-stone-450 bg-clip-text text-transparent leading-tight">
              La Forza dei Dettagli in Movimento
            </h2>
            <p className="text-lg text-zinc-400 font-light leading-relaxed">
              I contenuti statici non bastano più per l'algoritmo visivo del cervello umano. Questo layout sostituisce la freddezza delle landing tradizionali con b-roll cinematografici in loop e foto vive, studiati per trattenere l'attenzione del potenziale cliente.
            </p>
          </div>
        </div>

        {/* Blocco 2: Testo a SX, Immagine Viva a DX */}
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-white/5">
          <div className="space-y-6 text-left order-2 md:order-1">
            <span className="text-xs font-mono text-[color:var(--brand-color)] uppercase tracking-wider font-bold">Ingegneria Visiva</span>
            <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-b from-white to-stone-450 bg-clip-text text-transparent leading-tight">
              Dettagli e Finiture in Alta Definizione
            </h2>
            <p className="text-lg text-zinc-400 font-light leading-relaxed">
              Fai percepire la materia prima, la precisione di esecuzione o la grinta dei tuoi progetti in tempo reale. Ogni elemento grafico è leggero e ottimizzato per caricarsi all'istante anche sotto rete mobile 4G/5G.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative h-[380px] order-1 md:order-2 bg-black">
            <img src={defaultPhotoRight} alt="Lavoro in studio" className="w-full h-full object-cover filter brightness-[0.8]" />
          </div>
        </div>

      </section>

      {/* MARQUEE INFINITO */}
      <div className="w-full overflow-hidden bg-zinc-950 py-8 border-y border-zinc-900 relative z-10 pointer-events-none">
        <div className="animate-marquee flex whitespace-nowrap text-6xl md:text-8xl font-black uppercase tracking-widest text-white/[0.015]">
          <span className="mx-4">{nomeCliente} • MOTION • CINEMATIC • EMOTION • ATELIER •</span>
          <span className="mx-4">{nomeCliente} • MOTION • CINEMATIC • EMOTION • ATELIER •</span>
        </div>
      </div>

      {/* SEZIONE VANTAGGI */}
      <section className="py-20 px-6 max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-16 tracking-widest uppercase text-zinc-200">
          I Vantaggi Inclusi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servizi.map((servizio: any, idx: number) => {
            const IconComponent = Shield;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="bg-black/40 border border-white/5 hover:border-[color:var(--brand-color-strong)] p-8 rounded-3xl transition-all duration-500 group relative backdrop-blur-md shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--brand-color-glow)] to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="bg-white/[0.02] p-4 rounded-2xl w-14 h-14 flex items-center justify-center mb-8 border border-white/10 group-hover:border-[color:var(--brand-color-strong)] group-hover:shadow-[0_0_15px_var(--brand-color-glow)] transition-all duration-500">
                  <IconComponent className="h-7 w-7 text-[color:var(--brand-color)]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-[color:var(--brand-color)] transition-colors duration-300">
                  {servizio.titolo}
                </h3>
                <p className="text-lg text-zinc-400 font-light leading-relaxed">
                  {servizio.descrizione}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📍 LA SEDE DEL REGISTA & MAPPA DI GOOGLE (Allineamento Standard) */}
      {/* ========================================================================= */}
      <section id="studio" className="py-24 px-6 max-w-5xl mx-auto relative z-10 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-mono text-[color:var(--brand-color)] uppercase tracking-widest font-black">Presidio Fisico</span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none">La Sede Operativa</h2>
            <p className="text-sm text-zinc-450 font-light leading-relaxed">
              Riceviamo ed operiamo all'interno di una sede d'eccellenza, strutturata per offrire la massima riservatezza, sicurezza strutturale e conformità con i protocolli operativi in vigore.
            </p>
            <div className="space-y-4 pt-2 text-xs font-bold text-zinc-300">
              <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-[color:var(--brand-color)]" /> {fallbackEmail}</p>
              <p className="flex items-start gap-3"><MapPin className="h-4 w-4 text-[color:var(--brand-color)] shrink-0 mt-0.5" /> <span>{fallbackIndirizzo}</span></p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <GoogleMap address={indirizzo || fallbackIndirizzo} />
          </div>

        </div>
      </section>
      {/* ========================================================================= */}

      {/* ACCORDION FAQ */}
      <section id="faq" className="py-24 px-6 max-w-3xl mx-auto border-t border-white/5 relative z-10">
        <h2 className="text-3xl font-black text-center mb-12 uppercase tracking-wide text-white">Domande Frequenti</h2>
        <div className="space-y-4 text-left">
          {[
            { q: "Quali formati video sono raccomandati?", a: "Accettiamo video ottimizzati .mp4 e .webm a basso bitrate, caricabili direttamente nel tuo Supabase Storage gratuito ad altissima velocità." },
            { q: "I video rallentano il caricamento della pagina?", a: "No. Tutti i nostri loop B-Roll utilizzano algoritmi di compressione avanzati e attributi di pre-caricamento differito per mantenere il caricamento istantaneo." },
            { q: "Come posso modificare i video di default?", a: "Puoi incollare il link del tuo video direttamente nel campo `video_bg_url` all'interno della riga Supabase del cliente." }
          ].map((faq, idx) => (
            <div key={idx} className="border-b border-white/5 pb-4">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-lg py-3 hover:text-[color:var(--brand-color)] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-zinc-500 transition-transform ${activeFaq === idx ? 'rotate-180 text-[color:var(--brand-color)]' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-zinc-400 font-light leading-relaxed text-sm pt-2 pb-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* MODULO DI CONTATTO */}
      <section id="contatto" className="py-20 px-6 max-w-xl mx-auto relative z-10 border-t border-white/5">
        <div className="bg-black/40 border border-white/5 p-8 rounded-3xl shadow-2xl backdrop-blur-md">
          {inviato ? (
            <div className="py-12 text-center space-y-4">
              <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Richiesta Ricevuta!</h3>
              <p className="text-stone-400 text-sm max-w-xs mx-auto">
                Ti ricontatteremo entro i prossimi 15 minuti.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-1">Entra in Contatto</h3>
                <p className="text-xs text-stone-500 font-mono">Consulenza preliminare senza impegno</p>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-stone-450 uppercase tracking-wider mb-2">Nome e Cognome</label>
                <input
                  type="text"
                  required
                  placeholder="Es: Mario Rossi"
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-[color:var(--brand-color)] rounded-xl p-4 text-white placeholder-zinc-600 transition-all outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-stone-450 uppercase tracking-wider mb-2">Telefono o Email</label>
                <input
                  type="text"
                  required
                  placeholder="Es: info@mio-sito.it"
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-[color:var(--brand-color)] rounded-xl p-4 text-white placeholder-zinc-600 transition-all outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[color:var(--brand-color)] text-black font-black text-sm py-4.5 rounded-xl flex items-center justify-center space-x-2 shadow-[0_0_20px_var(--brand-color-glow)] hover:brightness-110 transition-all"
              >
                <span>Avvia Progetto</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER SEMANTICO COMPLETO */}
      <footer className="border-t border-white/5 bg-black py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4 text-left">
            <span className="font-black text-lg tracking-widest text-[color:var(--brand-color)] uppercase">{nomeCliente}</span>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Soluzioni ad alta conversione basate sui più rigidi standard di neuromarketing e ingegneria visiva.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500">Contatti Diretti</h4>
            <ul className="space-y-3 text-xs text-zinc-500 font-light">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[color:var(--brand-color)]" />
                <a href={`mailto:${fallbackEmail}`} className="hover:text-white transition-colors">{fallbackEmail}</a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-[color:var(--brand-color)] shrink-0 mt-0.5" />
                <span>{fallbackIndirizzo}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 text-left">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500">Seguici</h4>
            <div className="flex items-center space-x-3">
              <a href={fallbackFb} target="_blank" className="p-3 bg-white/[0.02] rounded-full border border-white/5 hover:border-[color:var(--brand-color-strong)] text-[#8B5CF6] hover:text-white transition-all" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href={fallbackIg} target="_blank" className="p-3 bg-white/[0.02] rounded-full border border-white/5 hover:border-[color:var(--brand-color-strong)] text-[#8B5CF6] hover:text-white transition-all" aria-label="Instagram">
                <svg className="h-4 w-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-4 text-xs text-stone-500 font-light text-left">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500">Trasparenza</h4>
            <p>P.IVA: {fallbackPiva}</p>
            <div className="flex flex-col space-y-2">
              <Link href={`/${slug}/privacy`} className="hover:text-white transition-colors">
                Privacy Policy
              </Link>

                  {/* ⚡ SE IL BLOG È ATTIVO, MOSTRA IL LINK AL BLOG ANCHE NEL FOOTER */}
                {hasBlog && (
                  <Link href={`/${slug}/blog`} className="hover:text-zinc-950 transition-colors">
                    Blog
                  </Link>
                )}
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Termini e Condizioni</a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-xs text-stone-600 font-mono tracking-widest">
          © {new Date().getFullYear()} {nomeCliente} • RM Studio HyperFrame Engine
        </div>
      </footer>

      {/* COOKIE BANNER */}
      <AnimatePresence>
        {showCookies && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-[#09090E]/95 border border-zinc-900 p-6 rounded-3xl shadow-2xl z-100 backdrop-blur-xl flex flex-col gap-4 text-zinc-100 animate-none"
          >
            <p className="text-xs text-stone-450 leading-relaxed font-light text-left">
              Questo sito web utilizza cookie tecnici necessari per il corretto funzionamento e l'ottimizzazione dell'esperienza utente. Cliccando su "Accetto", acconsenti al loro utilizzo.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <a href="#" className="text-[10px] font-mono text-stone-400 underline transition-colors">Maggiori info</a>
              <button 
                onClick={acceptCookies}
                className="bg-[color:var(--brand-color)] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:brightness-110 transition-all flex items-center space-x-2"
              >
                <span>Accetto</span>
                <Check className="h-3.5 w-3.5 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
