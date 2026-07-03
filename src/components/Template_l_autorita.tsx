// src/components/Template_l_autorita.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Star, Phone, Mail, MapPin, ChevronDown, Check } from 'lucide-react';
import React from 'react';

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
    logo_url?: string;
    email?: string;
    indirizzo?: string;
    social_fb?: string;
    social_ig?: string;
  };
  nomeCliente: string;
}

export default function Template_l_autorita({ data, nomeCliente }: TemplateProps) {
  const { hero, social_proof, brand_color = '#6366F1', logo_url, email, indirizzo, social_fb, social_ig } = data;
  const servizi = data.servizi || [];
  
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showCookies, setShowCookies] = useState(false);

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

  const customStyles = {
    '--brand-color': brand_color,
    '--brand-color-glow': `${brand_color}18`,
    '--brand-color-strong': `${brand_color}44`,
    '--brand-color-light': `${brand_color}bb`,
  } as React.CSSProperties;

  const imageLeft = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600";
  const imageRight = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600";
  const fallbackEmail = email || `direzione@${nomeCliente.toLowerCase().replace(/[^a-z0-9]/g, '')}.it`;
  const fallbackIndirizzo = indirizzo || "Via dei Professionisti 42, Milano (MI)";
  const fallbackFb = social_fb || "https://facebook.com";
  const fallbackIg = social_ig || "https://instagram.com";

  return (
    <div 
      style={customStyles}
      className="min-h-screen bg-[#030308] text-zinc-150 selection:bg-[var(--brand-color)] selection:text-white font-sans antialiased relative"
    >
      {/* 1. Stile di animazione CSS per l'effetto di Shimmer Metallico del testo */}
      <style jsx global>{`
        @keyframes shine {
          to { background-position: 200% center; }
        }
        .text-shimmer {
          background: linear-gradient(to right, #ffffff 20%, var(--brand-color) 40%, #ffffff 60%, var(--brand-color) 80%, #ffffff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 6s linear infinite;
        }
      `}</style>

      {/* Sfondo geometrico minimale senza particelle (Griglia semitrasparante statica) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,var(--brand-color-glow)_0%,rgba(0,0,0,0)_60%)] z-1" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)] z-1" />
      </div>

      {/* NAVBAR */}
      <header className="border-b border-zinc-900 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {logo_url ? (
              <img src={logo_url} alt={`${nomeCliente} Logo`} className="h-10 max-w-[150px] object-contain" />
            ) : (
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-[color:var(--brand-color)]" />
                <span className="font-black text-lg tracking-widest uppercase text-white">{nomeCliente}</span>
              </div>
            )}
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-zinc-450">
            <a href="#recensioni" className="hover:text-white transition-colors">Dicono di noi</a>
            <a href="#servizi" className="hover:text-white transition-colors">Competenze</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#contatto" className="hover:text-white transition-colors">Ufficio</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION CON SHIMMER METALLICO SUL TITOLO */}
      <section className="relative py-28 px-6 text-center max-w-4xl mx-auto z-10">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-8 text-shimmer">
          {hero.headline}
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          {hero.subheadline}
        </p>
        
        <div className="flex justify-center">
          <a
            href="tel:+3904251675950"
            className="bg-[color:var(--brand-color)] text-white font-extrabold text-lg px-10 py-5 rounded-2xl flex items-center justify-center space-x-3 shadow-[0_0_30px_var(--brand-color-glow)] hover:brightness-110 transition-all transform hover:scale-[1.02]"
          >
            <Phone className="h-5 w-5" />
            <span>{hero.cta1}</span>
          </a>
        </div>
      </section>

      {/* RECENSIONI AFFIANCATE */}
      <section id="recensioni" className="bg-zinc-950/60 border-y border-zinc-900/60 py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-zinc-900/30 border border-zinc-900 p-6 rounded-2xl flex flex-col justify-between shadow-xl">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star key={starIdx} className="h-4 w-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm font-light leading-relaxed italic mb-6">
                  {i === 0 ? social_proof : i === 1 ? "La consulenza ha chiarito ogni nostro dubbio. Un servizio strutturato e altamente consigliato per chi cerca affidabilità." : "Standard di esecuzione eccezionali. Hanno saputo guidarci con competenza lungo tutto il percorso."}
                </p>
                <span className="text-xs font-semibold text-zinc-550">— Cliente Certificato</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCCO ALTERNATO 1 */}
      <section id="servizi" className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="rounded-3xl overflow-hidden border border-zinc-900 shadow-2xl relative h-[360px]">
          <img src={imageLeft} alt="Descrizione Servizi" className="w-full h-full object-cover filter brightness-[0.8]" />
        </div>
        <div className="space-y-6 text-left">
          <span className="text-xs font-mono text-[color:var(--brand-color)] uppercase tracking-wider font-bold">Standard Metodologici</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">{servizi[0]?.titolo || "Inquadramento Strategico"}</h2>
          <p className="text-zinc-400 font-light leading-relaxed text-lg">
            {servizi[0]?.descrizione || "Ogni operazione viene pianificata studiando le normative vigenti e i trigger decisionali, minimizzando i rischi e aumentando l'efficienza."}
          </p>
        </div>
      </section>

      {/* BLOCCO ALTERNATO 2 */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10 border-t border-zinc-900/50">
        <div className="space-y-6 text-left order-2 md:order-1">
          <span className="text-xs font-mono text-[color:var(--brand-color)] uppercase tracking-wider font-bold">Trasparenza ed Etica</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">{servizi[1]?.titolo || "Tracciamento Risultati"}</h2>
          <p className="text-zinc-400 font-light leading-relaxed text-lg">
            {servizi[1]?.descrizione || "Garantiamo una reportistica costante per darti il pieno controllo sullo stato di avanzamento del progetto, in ogni singola fase."}
          </p>
        </div>
        <div className="rounded-3xl overflow-hidden border border-zinc-900 shadow-2xl relative h-[360px] order-1 md:order-2">
          <img src={imageRight} alt="Descrizione Dettagli" className="w-full h-full object-cover filter brightness-[0.8]" />
        </div>
      </section>

      {/* ACCORDION FAQ */}
      <section id="faq" className="py-24 px-6 max-w-3xl mx-auto border-t border-zinc-900/50 relative z-10">
        <h2 className="text-3xl font-black text-center mb-12 uppercase tracking-wide text-white">Domande Frequenti</h2>
        <div className="space-y-4">
          {[
            { q: "Quali sono le modalità di ingaggio?", a: "Dopo una prima analisi preliminare, formuliamo un preventivo chiaro e dettagliato con tempi di consegna certi e tracciabili." },
            { q: "Fornite contratti di garanzia sul servizio?", a: "Sì, ogni nostra prestazione è regolata da un accordo scritto che tutela la riservatezza e garantisce la conformità dei risultati." },
            { q: "È possibile richiedere modifiche in corso d'opera?", a: "Sì, i nostri protocolli sono agili e flessibili per adattarsi a cambiamenti o imprevisti durante lo sviluppo del progetto." }
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

      {/* FOOTER SEMANTICO COMPLETO */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 text-left">
            <span className="font-black text-lg tracking-wider text-[color:var(--brand-color)] uppercase">{nomeCliente}</span>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Infrastrutture digitali certificate progettate secondo i più rigidi protocolli di indicizzazione e usabilità mobile.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-450">Contatti Diretti</h4>
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
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-450">Seguici</h4>
            <div className="flex items-center space-x-3">
              <a href={fallbackFb} target="_blank" className="p-3 bg-zinc-900 rounded-full border border-zinc-850 hover:border-[color:var(--brand-color-strong)] text-zinc-500 hover:text-white transition-all" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href={fallbackIg} target="_blank" className="p-3 bg-zinc-900 rounded-full border border-zinc-850 hover:border-[color:var(--brand-color-strong)] text-zinc-500 hover:text-white transition-all" aria-label="Instagram">
                <svg className="h-4 w-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-4 text-xs text-stone-500 font-light text-left">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-450">Trasparenza</h4>
            <p>P.IVA: IT01234567890</p>
            <div className="flex flex-col space-y-2">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Termini e Condizioni</a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-zinc-900/60 text-center text-xs text-zinc-650 font-mono tracking-widest">
          © {new Date().getFullYear()} {nomeCliente} • RM Studio Master Engine
        </div>
      </footer>

      {/* COOKIE BANNER */}
      <AnimatePresence>
        {showCookies && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-[#030308]/95 border border-zinc-900 p-6 rounded-3xl shadow-2xl z-100 backdrop-blur-xl flex flex-col gap-4 text-zinc-100"
          >
            <p className="text-xs text-zinc-450 leading-relaxed font-light text-left">
              Questo sito web utilizza cookie tecnici necessari per il corretto funzionamento e l'ottimizzazione dell'esperienza utente. Cliccando su "Accetto", acconsenti al loro utilizzo.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <a href="#" className="text-[10px] font-mono text-zinc-500 hover:text-zinc-400 underline transition-colors">Maggiori info</a>
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
