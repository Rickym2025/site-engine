// src/components/Template_l_autorita.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check, Mail, MapPin, ChevronDown, Globe } from 'lucide-react';
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
    brand_color?: string; // Di default useremo uno smeraldo istituzionale (#10B981)
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

export default function Template_l_autorita({ data, nomeCliente, slug, hasBlog }: TemplateProps) {
  const { hero, social_proof, brand_color = '#10B981', email, indirizzo, piva } = data;
  const servizi = data.servizi || [];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showCookies, setShowCookies] = useState(false);
  const [inviato, setInviato] = useState(false);

  // FALLBACK DIMOSTRATIVI
  const fallbackEmail = email || `consulenza@${nomeCliente.toLowerCase().replace(/[^a-z0-9]/g, '')}.it`;
  const fallbackIndirizzo = indirizzo || "Via dell'Ingegneria 42, Centro Direzionale (RO)";
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
    '--brand-color-glow': `${brand_color}1a`,
    '--brand-color-strong': `${brand_color}4d`,
  } as React.CSSProperties;

  return (
    <div 
      style={customStyles}
      className="min-h-screen bg-gradient-to-b from-[#030712] via-[#030712] to-[var(--brand-color-glow)] text-slate-300 selection:bg-[var(--brand-color)] selection:text-black font-sans antialiased relative overflow-x-hidden text-left"
    >
      
      {/* BACKGROUND DEEP BLUE/INDIAGO CON SFUMATURE METALLICHE */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Griglia pixelata fine a puntini */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
        
        {/* Cerchi di luce indaco/blu notte soffusa */}
        <div className="absolute top-[-10%] left-1/4 w-[700px] h-[700px] rounded-full bg-indigo-900/15 blur-[140px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-[130px]" />
      </div>

      {/* NAVBAR GLASSMORPHISM ULTRA-PULITA */}
      <header className="border-b border-slate-900 bg-slate-950/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-extrabold text-sm tracking-widest uppercase text-white">{nomeCliente}</span>
          
          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#metodo" className="hover:text-white transition-colors">Il Metodo</a>
            {/* ⚡ SE IL BLOG È ATTIVO, MOSTRA IL LINK ALLA LISTA ARTICOLI */}
            {hasBlog && (
              <Link href={`/${slug}/blog`} className="hover:text-white transition-colors">
                Blog
              </Link>
            )}
            <a href="#servizi" className="hover:text-white transition-colors">Servizi</a>
            <a href="#studio" className="hover:text-white transition-colors">Sede</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          
          <a href="#contatto" className="bg-[var(--brand-color)] hover:brightness-105 text-black text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-xl transition-all shadow-md">
            Consulenza H24
          </a>
        </div>
      </header>

      {/* HERO SECTION CON EFFETTO LUCE SHIMMER SUI TITOLI */}
      <section id="metodo" className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Sinistra: Copy Autoritario con effetto Shimmer */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">
            <Globe className="h-4 w-4 text-[var(--brand-color)]" />
            <span className="text-[10px] font-mono text-[var(--brand-color)] uppercase tracking-widest font-black">Struttura Certificata Google</span>
          </div>

          {/* Effetto Shimmer Metallico sul titolo */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              {hero.headline}
            </span>
          </h1>

          <p className="text-lg text-slate-400 font-light leading-relaxed max-w-xl">
            {hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="#contatto" 
              className="bg-[var(--brand-color)] hover:brightness-105 text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4.5 rounded-xl transition-all text-center shadow-lg shadow-[var(--brand-color-strong)]"
            >
              {hero.cta1}
            </a>
            <a 
              href="#servizi" 
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest px-8 py-4.5 rounded-xl transition-all text-center"
            >
              {hero.cta2}
            </a>
          </div>
        </div>

        {/* Destra: Card Spotlight con dati statistici / di forza */}
        <div className="lg:col-span-5 relative flex justify-center">
          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="w-full max-w-sm bg-slate-950 border border-slate-900 p-8 rounded-3xl shadow-2xl relative overflow-hidden text-left space-y-8"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--brand-color-glow)] rounded-full blur-xl" />
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[var(--brand-color)] uppercase tracking-widest font-bold">Ingegneria di Processo</span>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">I nostri standard di rendimento</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[var(--brand-color)] shrink-0">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Integrazione dei Dati H24</h4>
                  <p className="text-xs text-slate-400 font-light">Architettura cloud ridondata e protetta.</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[var(--brand-color)] shrink-0">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Conformità Legale Totale</h4>
                  <p className="text-xs text-slate-400 font-light">Siti blindati e aderenti al GDPR UE.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </section>

      {/* RECENT REVIEWS (METALLIC LOOK) */}
      <section id="percorso" className="bg-slate-950/40 border-y border-slate-900 py-16 px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6">
          <svg className="h-6 w-6 text-amber-500 fill-amber-500 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          <p className="text-lg md:text-xl font-medium text-slate-350 italic leading-relaxed text-center sm:text-left">
            "{social_proof}"
          </p>
        </div>
      </section>

      {/* SEZIONE RECENSIONI SCORREVOLI INTEGRATA */}
      <ReviewsMarquee recensioni={data.recensioni} brandColor={brand_color} />

      {/* GRID DEI SERVIZI CON EFFETTO SPOTLIGHT */}
      <section id="servizi" className="py-24 px-8 max-w-6xl mx-auto bg-slate-950/40 border border-[var(--brand-color-strong)] rounded-[40px] relative z-10 my-12 text-left">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-[10px] font-mono text-[var(--brand-color)] uppercase tracking-widest font-black">Ambiti Operativi</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">I Servizi di Consulenza</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servizi.map((servizio: any, idx: number) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="bg-slate-950/80 border border-slate-900 p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between text-left h-[260px] shadow-lg relative group overflow-hidden"
            >
              <div className="space-y-4">
                <div className="bg-slate-900 p-3 rounded-xl w-12 h-12 flex items-center justify-center border border-slate-800">
                  <Shield className="h-6 w-6 text-[var(--brand-color)]" />
                </div>
                <h3 className="text-xl font-bold text-white">{servizio.titolo}</h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">{servizio.descrizione || servizio.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📍 LA SEDE & MAPPA DI GOOGLE (Stile Dark integrato) */}
      {/* ========================================================================= */}
      <section id="studio" className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-900 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-mono text-[color:var(--brand-color)] uppercase tracking-widest font-black">Dove Riceviamo</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">La Sede Istituzionale</h2>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              Riceviamo i clienti all'interno della nostra sede direzionale, strutturata per ospitare vertici aziendali, consulenze e incontri d'affari nel massimo rispetto della riservatezza e della tutela dei dati.
            </p>
            <div className="space-y-4 pt-4 text-xs font-bold text-slate-500">
              <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-slate-650" /> {fallbackEmail}</p>
              <p className="flex items-start gap-3"><MapPin className="h-5 w-5 text-slate-650 shrink-0 mt-0.5" /> <span>{fallbackIndirizzo}</span></p>
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

      {/* ACCORDION FAQ */}
      <section id="faq" className="py-24 px-6 max-w-3xl mx-auto border-t border-slate-900 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Domande Frequenti</h2>
        
        <div className="space-y-4 text-left">
          {[
            { q: "Quali sono le modalità di contatto?", a: "Dopo aver inviato il modulo, un nostro tecnico analizzerà la tua richiesta e ti contatterà via telefono o email entro 15 minuti." },
            { q: "Il servizio di consulenza ha un costo?", a: "No. La prima chiamata conoscitiva e l'analisi tecnica di fattibilità sono totalmente gratuite e non vincolanti." },
            { q: "Posso annullare o modificare una richiesta?", a: "Sì. Ti basterà comunicarlo direttamente al consulente che ti contatterà, senza alcuna penale o intoppo." }
          ].map((faq, idx) => (
            <div key={idx} className="border-b border-slate-900 pb-4">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-lg py-3 hover:text-[var(--brand-color)] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-slate-650 transition-transform ${activeFaq === idx ? 'rotate-180 text-[var(--brand-color)]' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-slate-500 font-light leading-relaxed text-sm pt-2 pb-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* MODULO CONTATTO (VETRO SATINATO DARK) */}
      <section id="contatto" className="py-20 px-6 max-w-xl mx-auto relative z-10 border-t border-zinc-900">
        <div className="bg-[#0b0b0f] border border-zinc-900 p-8 rounded-3xl shadow-xl">
          {inviato ? (
            <div className="py-12 text-center space-y-4">
              <div className="h-16 w-16 bg-[var(--brand-color-glow)] border border-[var(--brand-color-strong)] rounded-full flex items-center justify-center mx-auto text-[var(--brand-color)]">
                <svg className="h-8 w-8 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white font-serif">Richiesta Ricevuta!</h3>
              <p className="text-zinc-500 text-sm max-w-xs mx-auto">
                Verrai ricontattato via mail o recapito telefonico con la massima urgenza dal nostro consulente di turno.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-1">Mettiti in Contatto</h3>
                <p className="text-xs text-zinc-500 font-mono">Inizia il tuo percorso creativo</p>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Nome o Brand</label>
                <input
                  type="text"
                  required
                  placeholder="Es: Mario Rossi"
                  className="w-full bg-[#15151a] border border-zinc-800 focus:border-[var(--brand-color)] rounded-xl p-4 text-white placeholder-zinc-700 transition-all outline-none text-sm shadow-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Telefono o Email di Contatto</label>
                <input
                  type="text"
                  required
                  placeholder="Es: info@mio-sito.it"
                  className="w-full bg-[#15151a] border border-zinc-800 focus:border-[var(--brand-color)] rounded-xl p-4 text-white placeholder-zinc-700 transition-all outline-none text-sm shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--brand-color)] hover:brightness-105 text-black font-extrabold text-sm py-4.5 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md animate-none"
              >
                <span>Invia Candidatura</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER COERENTE */}
      <footer className="border-t border-zinc-900 bg-[#060608] py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-left">
          
          <div className="space-y-4">
            <span className="font-extrabold text-lg tracking-widest text-white uppercase">{nomeCliente}</span>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Mosaici digitali asimmetrici ottimizzati per la scansione visiva e l'esperienza d'autore.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500">Contatti Ufficiali</h4>
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

          <div className="space-y-4 text-xs text-zinc-550 font-light">
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

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-zinc-900 text-center text-xs text-zinc-650 font-mono tracking-widest">
          © {new Date().getFullYear()} {nomeCliente} • RM Studio Master Engine
        </div>
      </footer>

      {/* COOKIE BANNER COMPLIANT */}
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
