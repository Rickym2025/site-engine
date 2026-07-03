// src/components/TemplateSEO.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Star, Phone, Mail, MapPin, Facebook, Instagram, ChevronDown, Check, ArrowRight } from 'lucide-react';
import React from 'react';

interface TemplateSEOProps {
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

export default function TemplateSEO({ data, nomeCliente }: TemplateSEOProps) {
  const { hero, servizi, social_proof, brand_color = '#06B6D4', logo_url, email, indirizzo, social_fb, social_ig } = data;
  
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showCookies, setShowCookies] = useState(false);

  // Mostra il banner dei cookie dopo 1 secondo per non infastidire subito l'utente
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
    '--brand-color-glow': `${brand_color}15`,
    '--brand-color-light': `${brand_color}44`,
  } as React.CSSProperties;

  // Immagini di fallback professionali basate sullo stile
  const imageLeft = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600";
  const imageRight = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600";

  return (
    <div 
      style={customStyles}
      className="min-h-screen bg-black text-zinc-100 selection:bg-[var(--brand-color)] selection:text-black font-sans antialiased"
    >
      
      {/* 1. NAVBAR SEMANTICA */}
      <header className="border-b border-zinc-900 bg-black/80 backdrop-blur-md sticky top-0 z-45">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {logo_url ? (
              <img src={logo_url} alt={`${nomeCliente} Logo`} className="h-10 max-w-[150px] object-contain" />
            ) : (
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-[color:var(--brand-color)]" />
                <span className="font-black text-lg tracking-widest uppercase">{nomeCliente}</span>
              </div>
            )}
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-zinc-400">
            <a href="#servizi" className="hover:text-white transition-colors">Servizi</a>
            <a href="#recensioni" className="hover:text-white transition-colors">Recensioni</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            {email && <a href={`mailto:${email}`} className="hover:text-white transition-colors">Contattaci</a>}
          </nav>
        </div>
      </header>

      {/* 2. HERO SECTION (SLIDE INIZIALE) */}
      <section className="relative py-24 px-6 text-center max-w-4xl mx-auto">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[color:var(--brand-color)]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          {hero.headline}
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto mb-10">
          {hero.subheadline}
        </p>
        
        <div className="flex justify-center">
          <a
            href="tel:+3904251675950"
            className="bg-[color:var(--brand-color)] text-black font-extrabold text-lg px-10 py-5 rounded-2xl flex items-center justify-center space-x-3 shadow-[0_0_20px_var(--brand-color-glow)] hover:brightness-110 transition-all transform hover:scale-[1.02]"
          >
            <Phone className="h-5 w-5" />
            <span>{hero.cta1}</span>
          </a>
        </div>
      </section>

      {/* 3. SEZIONE RECENSIONI (SOCIAL PROOF IN LINEA) */}
      <section id="recensioni" className="bg-zinc-950 border-y border-zinc-900 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs font-mono text-[color:var(--brand-color)] uppercase tracking-widest text-center mb-10 font-bold">
            Cosa dicono i nostri clienti
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-zinc-900/50 border border-zinc-850 p-6 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star key={starIdx} className="h-4 w-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm font-light leading-relaxed italic mb-6">
                  {i === 0 ? social_proof : i === 1 ? "Professionalità estrema, tempi di risposta rapidissimi e serietà garantita. Consigliato!" : "Ottima esperienza. Hanno soddisfatto pienamente le nostre aspettative con un servizio impeccabile."}
                </p>
                <span className="text-xs font-semibold text-zinc-500">— Cliente Certificato</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BLOCCO ALTERNATO 1 (IMMAGINE A SINISTRA, TESTO A DESTRA) */}
      <section id="servizi" className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="rounded-3xl overflow-hidden border border-zinc-900 shadow-2xl relative h-[350px]">
          <img src={imageLeft} alt="Descrizione Servizi" className="w-full h-full object-cover filter brightness-[0.9]" />
        </div>
        <div className="space-y-6">
          <span className="text-xs font-mono text-[color:var(--brand-color)] uppercase tracking-wider font-bold">Massima Competenza</span>
          <h2 className="text-3xl font-extrabold">{servizi[0]?.titolo || "Soluzioni Su Misura"}</h2>
          <p className="text-zinc-400 font-light leading-relaxed text-lg">
            {servizi[0]?.descrizione || "Offriamo un servizio completo e dettagliato, strutturato per proteggere il tuo business e ottimizzare i flussi operativi."}
          </p>
        </div>
      </section>

      {/* 5. BLOCCO ALTERNATO 2 (TESTO A SINISTRA, IMMAGINE A DESTRA) */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-zinc-950">
        <div className="space-y-6 order-2 md:order-1">
          <span className="text-xs font-mono text-[color:var(--brand-color)] uppercase tracking-wider font-bold">Tecnologia e Strategia</span>
          <h2 className="text-3xl font-extrabold">{servizi[1]?.titolo || "Standard Elevati"}</h2>
          <p className="text-zinc-400 font-light leading-relaxed text-lg">
            {servizi[1]?.descrizione || "Ogni processo viene monitorato e gestito secondo le normative vigenti, garantendo affidabilità e sicurezza in ogni circostanza."}
          </p>
        </div>
        <div className="rounded-3xl overflow-hidden border border-zinc-900 shadow-2xl relative h-[350px] order-1 md:order-2">
          <img src={imageRight} alt="Descrizione Dettagli" className="w-full h-full object-cover filter brightness-[0.9]" />
        </div>
      </section>

      {/* 6. ACCORDION FAQ */}
      <section id="faq" className="py-24 px-6 max-w-3xl mx-auto border-t border-zinc-900">
        <h2 className="text-3xl font-extrabold text-center mb-12 uppercase tracking-wide">Domande Frequenti</h2>
        
        <div className="space-y-4">
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

      {/* 7. FOOTER SEMANTICO COMPLETO */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo e Intro */}
          <div className="space-y-4">
            <span className="font-black text-lg tracking-wider text-[color:var(--brand-color)] uppercase">{nomeCliente}</span>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Soluzioni B2B ottimizzate basate su protocolli di neuromarketing e conversioni ad alto rendimento.
            </p>
          </div>

          {/* Contatti Diretti */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400">Contatti Diretti</h4>
            <ul className="space-y-3 text-xs text-zinc-500 font-light">
              {email && (
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-[color:var(--brand-color)]" />
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
                </li>
              )}
              {indirizzo && (
                <li className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-[color:var(--brand-color)] shrink-0 mt-0.5" />
                  <span>{indirizzo}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Canali Social */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400">Seguici</h4>
            <div className="flex items-center space-x-4">
              {social_fb && (
                <a href={social_fb} target="_blank" className="p-3 bg-zinc-900 rounded-full border border-zinc-850 hover:border-[color:var(--brand-color-light)] text-zinc-400 hover:text-white transition-all">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {social_ig && (
                <a href={social_ig} target="_blank" className="p-3 bg-zinc-900 rounded-full border border-zinc-850 hover:border-[color:var(--brand-color-light)] text-zinc-400 hover:text-white transition-all">
                  <Instagram className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Dati Legali / Links */}
          <div className="space-y-4 text-xs text-zinc-500 font-light">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400">Trasparenza</h4>
            <p>P.IVA: IT01234567890</p>
            <div className="flex flex-col space-y-2">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>

        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-zinc-900/60 text-center text-xs text-zinc-650 font-mono">
          © {new Date().getFullYear()} {nomeCliente} • RM Studio Master Web Architecture compliant
        </div>
      </footer>

      {/* 8. GDPR COOKIE BANNER COMPLIANT */}
      <AnimatePresence>
        {showCookies && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-zinc-950/95 border border-zinc-900 p-6 rounded-2xl shadow-2xl z-100 backdrop-blur-md flex flex-col gap-4"
          >
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Questo sito web utilizza cookie tecnici necessari per il corretto funzionamento e l'ottimizzazione del caricamento. Continuando la navigazione o cliccando su "Accetto", acconsenti al loro utilizzo.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <a href="#" className="text-[10px] font-mono text-zinc-500 hover:text-zinc-400 underline transition-colors">Più info</a>
              <button 
                onClick={acceptCookies}
                className="bg-[color:var(--brand-color)] text-black text-xs font-bold px-4 py-2.5 rounded-lg hover:brightness-110 transition-all flex items-center space-x-2"
              >
                <span>Accetto</span>
                <Check className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
