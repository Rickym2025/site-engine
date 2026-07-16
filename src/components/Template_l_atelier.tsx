// src/components/Template_l_atelier.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, Mail, MapPin, ChevronDown } from 'lucide-react';
import React from 'react';
import GoogleMap from './GoogleMap';
import Link from 'next/link';
import Gallery from './Gallery';
import SocialLinks from './SocialLinks'; // ⚡ Importato il componente globale sistematico
import ReviewsMarquee from './ReviewsMarquee';

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
    email?: string;
    indirizzo?: string;
    social_fb?: string;
    social_ig?: string;
    social_linkedin?: string;
    piva?: string;
    video_bg_url?: string; // Video di sfondo cinematico
    galleria?: string[];
    recensioni?: any[];
  };
  nomeCliente: string;
  slug: string;
  hasBlog?: boolean;
}

export default function Template_l_atelier({ data, nomeCliente, slug, hasBlog }: TemplateProps) {
  const { hero, social_proof, brand_color = '#D97706', email, indirizzo, piva, video_bg_url } = data;
  const servizi = data.servizi || [];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showCookies, setShowCookies] = useState(false);
  const [inviato, setInviato] = useState(false);

  // FALLBACK DIMOSTRATIVI
  const fallbackEmail = email || `atelier@${nomeCliente.toLowerCase().replace(/[^a-z0-9]/g, '')}.it`;
  const fallbackIndirizzo = indirizzo || "Viale dei Cipressi 12, Area Artigianale (FI)";
  const fallbackPiva = piva || "IT01234567890";
  const defaultVideoBg = video_bg_url || "https://assets.mixkit.co/videos/preview/mixkit-sports-car-drifting-at-night-42217-large.mp4";

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
    '--brand-color-glow': `${brand_color}1a`,
    '--brand-color-strong': `${brand_color}4d`,
  } as React.CSSProperties;

  return (
    <div 
      style={customStyles}
      className="min-h-screen bg-[#060608] text-zinc-300 selection:bg-[var(--brand-color)] selection:text-black font-sans antialiased relative overflow-x-hidden"
    >
      
      {/* Texture di carta pressata di sfondo (Sottilissimo rumore organico) */}
      <div className="fixed inset-0 z-40 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4xNSIvPgo8L3N2Zz4=')] bg-repeat" />

      {/* NAVBAR GLASSMORPHISM OSCURATA */}
      <header className="border-b border-zinc-900 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-serif font-black text-lg tracking-widest uppercase text-white">{nomeCliente}</span>
          
          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <a href="#atelier" className="hover:text-white transition-colors">L'Atelier</a>
            {/* ⚡ SE IL BLOG È ATTIVO, MOSTRA IL LINK ALLA LISTA ARTICOLI */}
            {hasBlog && (
              <Link href={`/${slug}/blog`} className="hover:text-white transition-colors">
                Blog
              </Link>
            )}
            <a href="#recensioni" className="hover:text-white transition-colors">Dicono di noi</a>
            <a href="#studio" className="hover:text-white transition-colors">La Sede</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <span className="h-2 w-2 rounded-full bg-[var(--brand-color)] animate-pulse"></span>
            <span className="text-[10px] font-mono text-[var(--brand-color)] uppercase tracking-widest font-bold">Progetto d'Autore</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION CINEMATICA CON VIDEO BACKGROUND */}
      <section className="relative h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
        
        {/* Video Player in background */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.1]"
          >
            <source src={defaultVideoBg} type="video/mp4" />
          </video>
          {/* Sfumatura scura dal basso per fondersi con il contenuto */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060608]/40 to-[#060608]" />
        </div>

        {/* Contenuto editoriale fluttuante */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-[var(--brand-color)]" />
            <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest font-semibold">Consulenza d'Atelier • Su Appuntamento</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-light tracking-tight leading-[1.15] text-white font-serif italic"
          >
            {hero.headline}
          </motion.h1>

          <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            {hero.subheadline}
          </p>

          <div className="pt-6">
            <a
              href="#contatto"
              className="inline-block bg-[var(--brand-color)] hover:brightness-105 text-black font-extrabold text-xs uppercase tracking-widest px-10 py-5 rounded-2xl transition-all shadow-lg shadow-[var(--brand-color-strong)]"
            >
              {hero.cta1}
            </a>
          </div>
        </div>

      </section>

      {/* DETTAGLIO ATELIER (SERVIZI) */}
      <section id="atelier" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servizi.map((servizio: any, idx: number) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="bg-black/40 border border-zinc-900 p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between text-left h-[260px] shadow-lg relative group overflow-hidden"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-[var(--brand-color)] uppercase tracking-wider block">Dettaglio {idx + 1}</span>
                <h3 className="text-2xl font-serif font-bold text-white italic">{servizio.titolo}</h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">{servizio.descrizione || servicio.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIANZE (SOCIAL PROOF CON STILE OSCURATO) */}
      <section id="recensioni" className="bg-black/30 border-y border-zinc-900 py-16 px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6">
          <svg className="h-6 w-6 text-amber-500 fill-amber-500 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          <p className="text-lg md:text-xl font-serif font-medium text-zinc-300 italic leading-relaxed">
            "{social_proof}"
          </p>
        </div>
      </section>

      {/* SEZIONE RECENSIONI SCORREVOLI INTEGRATA */}
      <ReviewsMarquee recensioni={data.recensioni} brandColor={brand_color} />

      {/* ========================================================================= */}
      {/* 📍 LA SEDE & MAPPA DI GOOGLE (Stile Dark integrato) */}
      {/* ========================================================================= */}
      <section id="studio" className="py-20 px-6 max-w-6xl mx-auto border-b border-zinc-900 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-mono text-[color:var(--brand-color)] uppercase tracking-widest font-black">Dove Operiamo</span>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-white italic">La Sede dell'Atelier</h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Il nostro atelier riceve esclusivamente su appuntamento, al fine di garantire l'integrità e la riservatezza delle consulenze e delle opere in esposizione.
            </p>
            <div className="space-y-4 pt-4 text-xs font-bold text-zinc-500">
              <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-zinc-600" /> {fallbackEmail}</p>
              <p className="flex items-start gap-3"><MapPin className="h-5 w-5 text-zinc-600 shrink-0 mt-0.5" /> <span>{fallbackIndirizzo}</span></p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* Componente mappa nativo e dinamico */}
            <GoogleMap address={indirizzo || fallbackIndirizzo} />
          </div>

        </div>
      </section>
      {/* ========================================================================= */}

      {/* GALLERIA FOTOGRAFICA CON TEMA DARK INTEGRATO */}
      <Gallery galleria={data.galleria} brandColor={brand_color} theme="dark" />

      {/* ACCORDION FAQ CHIARO */}
      <section id="faq" className="py-24 px-6 max-w-3xl mx-auto border-t border-zinc-900 relative z-10">
        <h2 className="text-3xl font-bold font-serif italic text-center mb-12 text-white">Domande Frequenti</h2>
        
        <div className="space-y-4 text-left">
          {[
            { q: "Quali sono i tempi di attesa per un progetto?", a: "Essendo lavorazioni interamente artigianali d'autore, i tempi dipendono dalla complessità. Forniamo un cronoprogramma preciso in fase di preventivo." },
            { q: "Accettate progetti su disegno del cliente?", a: "Sì, realizziamo opere personalizzate collaborando strettamente con i progettisti o con il cliente stesso per interpretare ogni visione." },
            { q: "Fornite assistenza e perizia a domicilio?", a: "Sì, per i progetti più sensibili offriamo una consulenza tecnica sul posto gestita direttamente dai nostri maestri d'atelier." }
          ].map((faq, idx) => (
            <div key={idx} className="border-b border-zinc-900 pb-4">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-lg py-3 hover:text-[var(--brand-color)] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-zinc-650 transition-transform ${activeFaq === idx ? 'rotate-180 text-[var(--brand-color)]' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-zinc-500 font-light leading-relaxed text-sm pt-2 pb-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* MODULO CONTATTO MINIMALE */}
      <section id="contatto" className="py-20 px-6 max-w-xl mx-auto relative z-10 border-t border-zinc-900">
        <div className="bg-[#0b0b0f] border border-zinc-900 p-8 rounded-3xl shadow-xl">
          {inviato ? (
            <div className="py-12 text-center space-y-4">
              <div className="h-16 w-16 bg-[var(--brand-color-glow)] border border-[var(--brand-color-strong)] rounded-full flex items-center justify-center mx-auto text-[var(--brand-color)]">
                <svg className="h-8 w-8 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h3 className="text-2xl font-bold font-serif italic text-white">Richiesta Ricevuta!</h3>
              <p className="text-zinc-500 text-sm max-w-xs mx-auto">
                Ti risponderemo personalmente via mail o recapito telefonico entro le prossime 24 ore.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold font-serif italic text-white mb-1">Mettiti in Contatto</h3>
                <p className="text-xs text-zinc-500 font-mono">Inizia il tuo percorso creativo</p>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Nome e Cognome</label>
                <input
                  type="text"
                  required
                  placeholder="Es: Mario Rossi"
                  className="w-full bg-[#15151a] border border-zinc-800 focus:border-[var(--brand-color)] rounded-xl p-4 text-white placeholder-zinc-700 transition-all outline-none text-sm shadow-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Telefono o Email</label>
                <input
                  type="text"
                  required
                  placeholder="Es: info@mio-sito.it"
                  className="w-full bg-[#15151a] border border-zinc-800 focus:border-[var(--brand-color)] rounded-xl p-4 text-white placeholder-zinc-700 transition-all outline-none text-sm shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--brand-color)] hover:brightness-105 text-black font-extrabold text-sm py-4.5 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <span>Avvia Progetto</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER ORGANICO */}
      <footer className="border-t border-zinc-900 bg-[#060608] py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-left">
          
          <div className="space-y-4">
            <span className="font-extrabold text-lg tracking-widest text-white uppercase">{nomeCliente}</span>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Mosaici digitali asimmetrici ottimizzati per la scansione visiva e l'esperienza d'autore.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500">Contatti Diretti</h4>
            <ul className="space-y-3 text-xs text-zinc-500 font-light">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[var(--brand-color)]" />
                <a href={`mailto:${fallbackEmail}`} className="hover:text-white transition-colors">{fallbackEmail}</a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-[var(--brand-color)] shrink-0 mt-0.5" />
                <span>{fallbackIndirizzo}</span>
              </li>
            </ul>
          </div>

          {/* ⚡ CENTRALIZZAZIONE SOCIAL SISTEMATICA */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500">Seguici</h4>
            <SocialLinks data={data} brandColor={brand_color} />
          </div>

          <div className="space-y-4 text-xs text-zinc-500 font-light">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500">Trasparenza</h4>
            <p>P.IVA: {fallbackPiva}</p>
            <div className="flex flex-col space-y-2">
              <Link href={`/${slug}/privacy`} className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              {/* ⚡ SE IL BLOG È ATTIVO, MOSTRA IL LINK AL BLOG ANCHE NEL FOOTER */}
              {hasBlog && (
                <Link href={`/${slug}/blog`} className="hover:text-white transition-colors">
                  Blog
                </Link>
              )}
              <a href="#" className="hover:text-zinc-500 transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-zinc-500 transition-colors">Termini e Condizioni</a>
            </div>
          </div>

        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-zinc-900 text-center text-xs text-zinc-550 font-mono tracking-widest">
          © {new Date().getFullYear()} {nomeCliente} • Sviluppato da RM Studio Master Engine
        </div>
      </footer>

      {/* COOKIE BANNER GDPR CHIARO COMPLIANT */}
      <AnimatePresence>
        {showCookies && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-black/95 border border-zinc-800 p-6 rounded-3xl shadow-2xl z-100 backdrop-blur-xl flex flex-col gap-4 text-zinc-300 animate-none"
          >
            <p className="text-xs text-zinc-450 leading-relaxed font-light text-left">
              Questo sito web utilizza cookie tecnici necessari per il corretto funzionamento e l'ottimizzazione dell'esperienza utente. Cliccando su "Accetto", acconsenti al loro utilizzo.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button 
                onClick={acceptCookies}
                className="bg-white text-black text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-zinc-200 transition-all flex items-center space-x-2"
              >
                <span>Accetto</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
