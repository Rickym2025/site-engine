// src/components/Template_il_chirurgo.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Star, Check, Send, Sparkles, Mail, MapPin, ChevronDown } from 'lucide-react';
import React from 'react';
import GoogleMap from './GoogleMap';
import Link from 'next/link';
import Gallery from './Gallery';
import SocialLinks from './SocialLinks';
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
    galleria?: string[];
    recensioni?: any[];
  };
  nomeCliente: string;
  slug: string;
  hasBlog?: boolean;
}

export default function Template_il_chirurgo({ data, nomeCliente, slug, hasBlog }: TemplateProps) {
  const { hero, social_proof, brand_color = '#3B82F6', email, indirizzo, piva } = data;
  const servizi = data.servizi || [];
  
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showCookies, setShowCookies] = useState(false);
  const [inviato, setInviato] = useState(false);

  // FALLBACK DIMOSTRATIVI
  const fallbackEmail = email || `prenotazioni@${nomeCliente.toLowerCase().replace(/[^a-z0-9]/g, '')}.it`;
  const fallbackIndirizzo = indirizzo || "Viale della Costituzione 40, Centro Medico (VE)";
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
    '--brand-color-glow': `${brand_color}12`,
    '--brand-color-strong': `${brand_color}33`,
    '--brand-color-light': `${brand_color}aa`,
  } as React.CSSProperties;

  return (
    <div 
      style={customStyles}
      className="min-h-screen bg-gradient-to-b from-[#FAF9F5] via-[#FAF9F5] to-[var(--brand-color-glow)] text-zinc-800 selection:bg-[var(--brand-color)] selection:text-white font-sans relative overflow-x-hidden"
    >
      
      {/* ========================================================================= */}
      {/* TECNOLOGIA VISIVA: GRIGLIA A PUNTI E AURORE PASTELLO FLUTTUANTI */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* 1. Sfondo a micro-punti grigi finissimi (Dot-Matrix di precisione) */}
        <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1.2px,transparent_1.2px)] bg-[size:24px_24px] opacity-70" />

        {/* 2. Sfumature Aurora Pastello fluttuanti */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-5%] left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-400/5 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -30, 50, 0],
            y: [0, 30, -40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] right-1/4 w-[450px] h-[450px] rounded-full bg-rose-300/5 blur-[120px]"
        />

        {/* Gradiente luminoso dal basso per amalgamare lo scroll */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF9F5]/40 to-[#FAF9F5]" />
      </div>
      {/* ========================================================================= */}

      {/* NAVBAR GLASSMORPHISM CHIARA */}
      <header className="border-b border-zinc-200/60 bg-white/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-black text-lg tracking-widest uppercase text-zinc-900">{nomeCliente}</span>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold text-zinc-500">
            <a href="#contatto" className="hover:text-zinc-950 transition-colors">Prenota</a>
            <a href="#servizi" className="hover:text-zinc-950 transition-colors">Trattamenti</a>
            {/* ⚡ SE IL BLOG È ATTIVO, MOSTRA IL LINK AL BLOG */}
            {hasBlog && (
              <Link href={`/${slug}/blog`} className="hover:text-zinc-950 transition-colors">
                Blog
              </Link>
            )}
            <a href="#recensioni" className="hover:text-zinc-950 transition-colors">Testimonianze</a>
            <a href="#studio" className="hover:text-zinc-950 transition-colors">Sede</a>
            <a href="#faq" className="hover:text-zinc-950 transition-colors">FAQ</a>
          </nav>
          
          <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-mono text-emerald-700 uppercase tracking-widest font-bold">Disponibile</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION CON MODULO INTEGRATO */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Sinistra: Copy Clinico ad altissima leggibilità */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 bg-white border border-zinc-200 px-4 py-1.5 rounded-full shadow-sm">
            <Sparkles className="h-4 w-4 text-[color:var(--brand-color)]" />
            <span className="text-xs font-mono text-zinc-600 uppercase tracking-wider font-bold">Consulenza Diretta • Risposta Rapida</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-zinc-900">
            {hero.headline}
          </h1>

          <p className="text-lg md:text-xl text-zinc-500 font-light leading-relaxed">
            {hero.subheadline}
          </p>

          <div className="space-y-4 pt-4">
            {servizi.map((servizio: any, idx: number) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="bg-white p-1 rounded-full mt-1 border border-zinc-200 shadow-sm shrink-0">
                  <Check className="h-4 w-4 text-emerald-500 font-bold" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-800 text-lg">{servizio.titolo}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed font-light mt-1">{servizio.descrizione || servizio.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Destra: Modulo di Contatto */}
        <motion.div 
          id="contatto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-6 bg-white/70 border border-zinc-200/80 p-8 rounded-3xl shadow-xl backdrop-blur-md relative"
        >
          {inviato ? (
            <div className="py-16 text-center space-y-4">
              <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black text-zinc-900">Richiesta Ricevuta!</h3>
              <p className="text-zinc-550 text-sm max-w-xs mx-auto">
                La tua prenotazione è andata a buon fine. Ti contatteremo entro 15 minuti.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-extrabold text-zinc-900 mb-1">Invia la tua Richiesta</h3>
                <p className="text-xs text-zinc-500 font-mono">Consulenza preliminare protetta</p>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Il tuo Nome</label>
                <input
                  type="text"
                  required
                  placeholder="Es: Mario Rossi"
                  className="w-full bg-white border border-zinc-200 focus:border-zinc-400 rounded-xl p-4 text-zinc-800 placeholder-zinc-400 transition-all outline-none text-sm shadow-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Telefono o Email</label>
                <input
                  type="text"
                  required
                  placeholder="Es: +39 333 123456"
                  className="w-full bg-white border border-zinc-200 focus:border-zinc-400 rounded-xl p-4 text-zinc-800 placeholder-zinc-400 transition-all outline-none text-sm shadow-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Seleziona Servizio d'interesse</label>
                <select className="w-full bg-white border border-zinc-200 focus:border-zinc-400 rounded-xl p-4 text-zinc-800 transition-all outline-none text-sm appearance-none cursor-pointer shadow-sm">
                  {servizi.map((s: any, idx: number) => (
                    <option key={idx} value={idx}>{s.titolo}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-sm py-4.5 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <span>Invia Richiesta</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </motion.div>

      </section>

      {/* RECENT REVIEWS */}
      <section id="recensioni" className="bg-[#FAF9F5] border-y border-zinc-200/60 py-16 px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6">
          <svg className="h-8 w-8 text-amber-500 fill-amber-500 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          <p className="text-lg md:text-xl font-medium text-zinc-700 italic leading-relaxed">
            "{social_proof}"
          </p>
        </div>
      </section>

      {/* DETTAGLIO SERVIZI */}
      <section id="servizi" className="py-20 px-8 max-w-6xl mx-auto bg-[var(--brand-color-glow)] border border-[var(--brand-color-strong)] rounded-[40px] relative z-10 my-12 text-left">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-16 tracking-widest uppercase text-zinc-900">
          I Vantaggi del Nostro Servizio
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servizi.map((servizio: any, idx: number) => {
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="bg-white border border-zinc-200/60 p-8 rounded-3xl transition-all duration-500 group relative shadow-md hover:shadow-xl overflow-hidden text-left"
              >
                <div className="bg-zinc-50 p-4 rounded-2xl w-14 h-14 flex items-center justify-center mb-8 border border-zinc-150">
                  <Calendar className="h-7 w-7 text-zinc-700" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-zinc-900">
                  {servizio.titolo}
                </h3>
                
                <p className="text-lg text-zinc-500 font-light leading-relaxed">
                  {servizio.descrizione || servizio.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SEZIONE RECENSIONI SCORREVOLI INTEGRATA */}
      <ReviewsMarquee recensioni={data.recensioni} brandColor={brand_color} />

      {/* ========================================================================= */}
      {/* 📍 LA SEDE CLINICA & MAPPA DI GOOGLE */}
      {/* ========================================================================= */}
      <section id="studio" className="py-20 px-6 max-w-6xl mx-auto border-t border-zinc-200/60 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-mono text-[color:var(--brand-color)] uppercase tracking-widest font-black">Dove Riceviamo</span>
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">Lo Studio Professionale</h2>
            <p className="text-sm text-zinc-500 font-light leading-relaxed">
              Riceviamo i pazienti su appuntamento all'interno di una struttura medica moderna, protetta e completamente compliant con le norme di sicurezza igienico-sanitaria vigenti.
            </p>
            <div className="space-y-4 pt-4 text-xs font-bold text-zinc-600">
              <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-zinc-400" /> {fallbackEmail}</p>
              <p className="flex items-start gap-3"><MapPin className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" /> <span>{fallbackIndirizzo}</span></p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* Componente mappa nativo e dinamico */}
            <GoogleMap address={indirizzo || fallbackIndirizzo} />
          </div>

        </div>
      </section>
      {/* ========================================================================= */}

      <Gallery galleria={data.galleria} brandColor={brand_color} theme="clean" />
      
      {/* ACCORDION FAQ */}
      <section id="faq" className="py-24 px-6 max-w-3xl mx-auto border-t border-zinc-200/60 relative z-10">
        <h2 className="text-3xl font-black text-center mb-12 uppercase tracking-wide text-zinc-900">Domande Frequenti</h2>
        
        <div className="space-y-4 text-left">
          {[
            { q: "Quali sono le modalità di contatto?", a: "Dopo aver inviato il modulo, un nostro tecnico analizzerà la tua richiesta e ti contatterà via telefono o email entro 15 minuti." },
            { q: "Il servizio di consulenza ha un costo?", a: "No. La prima chiamata conoscitiva e l'analisi tecnica di fattibilità sono totalmente gratuite e non vincolanti." },
            { q: "Posso annullare o modificare una richiesta?", a: "Sì. Ti basterà comunicarlo direttamente al consulente che ti contatterà, senza alcuna penale o intoppo." }
          ].map((faq, idx) => (
            <div key={idx} className="border-b border-zinc-200/60 pb-4">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-lg py-3 hover:text-zinc-950 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-zinc-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
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

      {/* FOOTER CHIARO */}
      <footer className="border-t border-zinc-200/60 bg-white py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4 text-left">
            <span className="font-black text-lg tracking-widest text-zinc-900 uppercase">{nomeCliente}</span>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Soluzioni ad alta conversione basate sui più rigidi standard di neuromarketing e ingegneria visiva.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400">Contatti Diretti</h4>
            <ul className="space-y-3 text-xs text-zinc-500 font-light">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-zinc-600" />
                <a href={`mailto:${fallbackEmail}`} className="hover:text-zinc-900 transition-colors">{fallbackEmail}</a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-zinc-600 shrink-0 mt-0.5" />
                <span>{fallbackIndirizzo}</span>
              </li>
            </ul>
          </div>

          {/* ⚡ CENTRALIZZAZIONE SOCIAL SISTEMATICA */}
          <div className="space-y-4 text-left">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400">Seguici</h4>
            <SocialLinks data={data} brandColor={brand_color} />
          </div>

          <div className="space-y-4 text-xs text-zinc-500 font-light text-left">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400">Trasparenza</h4>
            <p>P.IVA: {fallbackPiva}</p>
            <div className="flex flex-col space-y-2">
              <Link href={`/${slug}/privacy`} className="hover:text-zinc-950 transition-colors">
                Privacy Policy
              </Link>
              {/* ⚡ SE IL BLOG È ATTIVO, MOSTRA IL LINK AL BLOG ANCHE NEL FOOTER */}
              {hasBlog && (
                <Link href={`/${slug}/blog`} className="hover:text-zinc-950 transition-colors">
                  Blog
                </Link>
              )}
              <a href="#" className="hover:text-zinc-950 transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-zinc-950 transition-colors">Termini e Condizioni</a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-zinc-100 text-center text-xs text-zinc-400 font-mono tracking-widest">
          © {new Date().getFullYear()} {nomeCliente} • Sviluppato da RM Studio Master Engine
        </div>
      </footer>

      {/* COOKIE BANNER COMPLIANT */}
      <AnimatePresence>
        {showCookies && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-white/95 border border-zinc-200 p-6 rounded-3xl shadow-2xl z-100 backdrop-blur-xl flex flex-col gap-4 text-zinc-800 animate-none"
          >
            <p className="text-xs text-zinc-650 leading-relaxed font-light text-left">
              Questo sito web utilizza cookie tecnici necessari per il corretto funzionamento e l'ottimizzazione dell'esperienza utente. Cliccando su "Accetto", acconsenti al loro utilizzo.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <a href="#" className="text-[10px] font-mono text-zinc-500 hover:text-zinc-800 underline transition-colors">Maggiori info</a>
              <button 
                onClick={acceptCookies}
                className="bg-zinc-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-zinc-200 transition-all flex items-center space-x-2"
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
