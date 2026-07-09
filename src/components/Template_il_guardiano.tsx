// src/components/Template_il_guardiano.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowRight, Star, Check, Mail, MapPin, ChevronDown, Shield, ShieldCheck } from 'lucide-react';
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
    hero_image_url?: string;
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

export default function Template_il_guardiano({ data, nomeCliente, slug }: TemplateProps) {
  const { hero, social_proof, brand_color = '#06B6D4', hero_image_url, email, indirizzo, social_fb, social_ig, piva } = data;
  const servizi = data.servizi || [];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showCookies, setShowCookies] = useState(false);
  const [inviato, setInviato] = useState(false);

  // ROTAZIONE CARD 3D TILT AL MOVIMENTO DEL MOUSE
  const handleMouseMove3D = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    card.style.setProperty('--x-rotation', `${-y / 12}deg`);
    card.style.setProperty('--y-rotation', `${x / 12}deg`);
  };

  const handleMouseLeave3D = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--x-rotation', '0deg');
    card.style.setProperty('--y-rotation', '0deg');
  };

  const fallbackEmail = email || `direzione@${nomeCliente.toLowerCase().replace(/[^a-z0-9]/g, '')}.it`;
  const fallbackIndirizzo = indirizzo || "Corso Garibaldi 280, Milano (MI)";
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
      className="min-h-screen bg-[#070708] text-zinc-100 selection:bg-[var(--brand-color)] selection:text-black font-sans relative overflow-x-hidden"
    >
      
      {/* EFFETTO PELLICOLA SATINATA */}
      <div className="fixed inset-0 z-40 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4xNSIvPgo8L3N2Zz4=')] bg-repeat" />

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Sorgente di luce radiale fissa pulsante dietro la foto */}
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,var(--brand-color-glow)_0%,rgba(0,0,0,0)_70%)] animate-pulse duration-[8s]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#070708] h-[90vh] z-1" />
      </div>

      {/* NAVBAR CON ANCORAGGI DI NAVIGAZIONE COMPLETI */}
      <header className="border-b border-zinc-900 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-black text-lg tracking-widest uppercase text-[color:var(--brand-color)]">{nomeCliente}</span>
          
          {/* MENU ANCORAGGI COMPLETO */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-zinc-400">
            <a href="#servizi" className="hover:text-white transition-colors">Servizi</a>
            <a href="#recensioni" className="hover:text-white transition-colors">Dicono di noi</a>
            <a href="#contatto" className="hover:text-white transition-colors">Sede e Contatti</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center space-x-2 bg-zinc-950 border border-zinc-850 px-4 py-2 rounded-full">
            <span className="h-2 w-2 rounded-full bg-[color:var(--brand-color)] animate-ping"></span>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Attivo</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION SPLIT LAYOUT CON CARD 3D TILT */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        <div className="lg:col-span-7 space-y-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center bg-zinc-900/50 border border-zinc-855 px-4 py-1.5 rounded-full"
          >
            <span className="text-xs font-mono text-[color:var(--brand-color)] uppercase tracking-widest font-bold">Standard Certificato B2B</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1] bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent"
          >
            {hero.headline}
          </motion.h1>

          <p className="text-lg md:text-xl text-zinc-450 font-light leading-relaxed">
            {hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#contatto"
              className="bg-[color:var(--brand-color)] text-black font-black text-lg px-8 py-5 rounded-2xl flex items-center justify-center space-x-3 shadow-[0_0_25px_var(--brand-color-glow)] hover:brightness-110 transition-all"
            >
              <Phone className="h-5 w-5" />
              <span>{hero.cta1}</span>
            </a>
            <a
              href="#servizi"
              className="bg-zinc-955 hover:bg-zinc-900 border border-zinc-900 text-white font-bold text-lg px-8 py-5 rounded-2xl flex items-center justify-center space-x-2 transition-all"
            >
              <span>{hero.cta2}</span>
              <ArrowRight className="h-5 w-5 text-zinc-500" />
            </a>
          </div>
        </div>

        {/* L'IMMAGINE HERO CON TILT 3D ATTIVO */}
        <div className="lg:col-span-5 relative">
          <div className="absolute inset-0 bg-[color:var(--brand-color)] rounded-3xl blur-[40px] opacity-10 pointer-events-none" />
          
          <div 
            onMouseMove={handleMouseMove3D}
            onMouseLeave={handleMouseLeave3D}
            style={{
              transform: 'perspective(1000px) rotateX(var(--x-rotation, 0deg)) rotateY(var(--y-rotation, 0deg))',
              transition: 'transform 0.15s ease-out'
            }}
            className="w-full h-[400px] rounded-3xl border border-white/10 shadow-2xl relative z-10 overflow-hidden cursor-pointer group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none z-1" />
            
            <img 
              src={hero_image_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600'} 
              alt="Hero Visual" 
              className="w-full h-full object-cover filter brightness-[0.8] scale-102"
            />
          </div>
        </div>

      </section>

      {/* RECENSIONI (SOCIAL PROOF CON ANCORAGGIO ID) */}
      <section id="recensioni" className="bg-zinc-950 border-y border-zinc-900 py-12 px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
          <Star className="h-8 w-8 text-[color:var(--brand-color)] fill-[color:var(--brand-color)] shrink-0" />
          <p className="text-lg md:text-xl font-medium text-zinc-350 italic leading-relaxed">
            "{social_proof}"
          </p>
        </div>
      </section>

      {/* GRID SERVIZI */}
      <section id="servizi" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl font-extrabold text-center mb-16 uppercase tracking-wider">Servizi Dedicati</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servizi.map((servizio: any, idx: number) => (
            <div 
              key={idx}
              className="bg-zinc-950/40 border border-zinc-900 hover:border-[color:var(--brand-color-strong)] p-8 rounded-2xl transition-all duration-300 text-left"
            >
              <h3 className="text-xl font-bold mb-4">{servizio.titolo}</h3>
              <p className="text-zinc-400 font-light leading-relaxed">{servizio.descrizione}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📍 LA SEDE OPERATIVA & MAPPA DI GOOGLE (Layout split ad alto livello tecnologico) */}
      {/* ========================================================================= */}
      <section id="studio" className="py-24 px-6 max-w-5xl mx-auto relative z-10 border-t border-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Informazioni fisiche e dettagliate */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-mono text-[color:var(--brand-color)] uppercase tracking-widest font-black">Presidio Fisico</span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none">La Sede Operativa</h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Riceviamo ed operiamo all'interno di una sede d'eccellenza, strutturata per offrire la massima riservatezza, sicurezza strutturale e conformità con i protocolli operativi in vigore.
            </p>
            
            <div className="space-y-4 pt-2 text-xs font-bold text-zinc-300">
              <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-[color:var(--brand-color)]" /> {fallbackEmail}</p>
              <p className="flex items-start gap-3"><MapPin className="h-4 w-4 text-[color:var(--brand-color)] shrink-0 mt-0.5" /> <span>{fallbackIndirizzo}</span></p>
            </div>
          </div>

          {/* Componente mappa responsive integrato nativamente */}
          <div className="lg:col-span-7">
            <GoogleMap address={indirizzo || fallbackIndirizzo} />
          </div>

        </div>
      </section>
      {/* ========================================================================= */}

      {/* ACCORDION FAQ */}
      <section id="faq" className="py-24 px-6 max-w-3xl mx-auto border-t border-zinc-900 relative z-10">
        <h2 className="text-3xl font-extrabold text-center mb-12 uppercase tracking-wide">Domande Frequenti</h2>
        <div className="space-y-4 text-left">
          {[
            { q: "Come posso richiedere un preventivo?", a: "Puoi cliccare sul pulsante di chiamata principale o scriverci direttamente tramite email. Rispondiamo in tempi rapidissimi." },
            { q: "Il servizio è attivo anche nei giorni festivi?", a: "Sì, garantiamo operatività costante e continuità del servizio 365 giorni all'anno, festività incluse." },
            { q: "Quali sono le modalità di attivazione?", a: "Dopo un rapido consulto conoscitivo, attiviamo il protocollo operativo concordato entro 24/48 ore." }
          ].map((faq, idx) => (
            <div key={idx} className="border-b border-zinc-900 pb-4">
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
                    <p className="text-zinc-450 font-light leading-relaxed text-sm pt-2 pb-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* MODULO CONTATTI */}
      <section id="contatto" className="py-20 px-6 max-w-xl mx-auto relative z-10 border-t border-zinc-900">
        <div className="bg-zinc-950/80 border border-zinc-900 p-8 rounded-3xl shadow-2xl backdrop-blur-md">
          {inviato ? (
            <div className="py-12 text-center space-y-4">
              <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Richiesta Ricevuta!</h3>
              <p className="text-zinc-400 text-sm max-w-xs mx-auto">
                Ti ricontatteremo entro i prossimi 15 minuti.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-1">Mettiti in Contatto</h3>
                <p className="text-xs text-zinc-650 font-mono">Consulenza preliminare senza impegno</p>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-450 uppercase tracking-wider mb-2">Nome e Cognome</label>
                <input
                  type="text"
                  required
                  placeholder="Es: Mario Rossi"
                  className="w-full bg-white/[0.02] border border-zinc-900 focus:border-[color:var(--brand-color)] rounded-xl p-4 text-white placeholder-zinc-600 transition-all outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-450 uppercase tracking-wider mb-2">Telefono o Email</label>
                <input
                  type="text"
                  required
                  placeholder="Es: info@mio-sito.it"
                  className="w-full bg-white/[0.02] border border-zinc-900 focus:border-[color:var(--brand-color)] rounded-xl p-4 text-white placeholder-zinc-600 transition-all outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[color:var(--brand-color)] text-black font-black text-sm py-4.5 rounded-xl flex items-center justify-center space-x-2 shadow-[0_0_20px_var(--brand-color-glow)] hover:brightness-110 transition-all"
              >
                <span>Invia Messaggio</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 text-left">
            <span className="font-black text-lg tracking-widest text-[color:var(--brand-color)] uppercase">{nomeCliente}</span>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Soluzioni ad alta conversione basate sui più rigidi standard di neuromarketing e ingegneria visiva.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-400">Contatti Diretti</h4>
            <ul className="space-y-3 text-xs text-stone-500 font-light">
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
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-400">Seguici</h4>
            <div className="flex items-center space-x-3">
              <a href={fallbackFb} target="_blank" className="p-3 bg-white/[0.02] rounded-full border border-white/5 hover:border-[color:var(--brand-color-strong)] text-stone-400 hover:text-white transition-all" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href={fallbackIg} target="_blank" className="p-3 bg-white/[0.02] rounded-full border border-white/5 hover:border-[color:var(--brand-color-strong)] text-stone-400 hover:text-white transition-all" aria-label="Instagram">
                <svg className="h-4 w-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-4 text-xs text-stone-500 font-light text-left">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-400">Trasparenza</h4>
            <p>P.IVA: {fallbackPiva}</p>
            <div className="flex flex-col space-y-2">
              <Link href={`/${slug}/privacy`} className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Termini e Condizioni</a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-zinc-900 text-center text-xs text-zinc-650 font-mono tracking-widest">
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
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-[#060606]/95 border border-zinc-900 p-6 rounded-3xl shadow-2xl z-100 backdrop-blur-xl flex flex-col gap-4 text-zinc-100 animate-none"
          >
            <p className="text-xs text-stone-450 leading-relaxed font-light text-left">
              Questo sito web utilizza cookie tecnici necessari per il corretto funzionamento e l'ottimizzazione dell'esperienza utente. Cliccando su "Accetto", acconsenti al loro utilizzo.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <a href="#" className="text-[10px] font-mono text-zinc-500 hover:text-stone-400 underline transition-colors">Maggiori info</a>
              <button 
                onClick={acceptCookies}
                className="bg-[color:var(--brand-color)] text-black text-xs font-bold px-4 py-2.5 rounded-xl hover:brightness-110 transition-all flex items-center space-x-2"
              >
                <span>Accetto</span>
                <Check className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
