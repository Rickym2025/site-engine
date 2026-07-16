// src/components/Template_il_creativo.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Star, Check, Sparkles, Mail, MapPin, ChevronDown, ArrowUpRight, ArrowRight } from 'lucide-react';
import React from 'react';
import GoogleMap from './GoogleMap';
import Link from 'next/link';
import Gallery from './Gallery';
import SocialLinks from './SocialLinks'; // ⚡ Importato il componente globale sistematico

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
  };
  nomeCliente: string;
  slug: string;
  hasBlog?: boolean;
}

export default function Template_il_creativo({ data, nomeCliente, slug, hasBlog }: TemplateProps) {
  const { hero, social_proof, brand_color = '#5F6F52', email, indirizzo, piva } = data;
  const servizi = data.servizi || [];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showCookies, setShowCookies] = useState(false);
  const [inviato, setInviato] = useState(false);

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

  const fallbackEmail = email || `atelier@${nomeCliente.toLowerCase().replace(/[^a-z0-9]/g, '')}.it`;
  const fallbackIndirizzo = indirizzo || "Viale dei Cipressi 8, colline Toscane (FI)";
  const fallbackPiva = piva || "IT01234567890";

  // Foto d'atmosfera organica per le card del bento grid
  const bentoImg1 = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600"; // Interno minimale
  const bentoImg2 = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600"; // Architettura/mosaico

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-zinc-800 selection:bg-[#5F6F52] selection:text-white font-sans antialiased relative overflow-x-hidden text-left">
      
      {/* Texture di carta pressata di sfondo (Sottilissimo rumore organico) */}
      <div className="fixed inset-0 z-40 opacity-[0.025] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4xNSIvPgo8L3N2Zz4=')] bg-repeat" />

      {/* NAVBAR */}
      <header className="border-b border-zinc-200/50 bg-[#F4F3EF]/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-lg tracking-widest uppercase text-zinc-900">{nomeCliente}</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold text-zinc-500">
            <a href="#bento" className="hover:text-zinc-900 transition-colors">Il Progetto</a>
            {/* ⚡ SE IL BLOG È ATTIVO, MOSTRA IL LINK AL BLOG */}
            {hasBlog && (
              <Link href={`/${slug}/blog`} className="hover:text-zinc-900 transition-colors">
                Blog
              </Link>
            )}
            <a href="#recensioni" className="hover:text-zinc-900 transition-colors">Dicono di noi</a>
            <a href="#faq" className="hover:text-zinc-900 transition-colors">FAQ</a>
            <a href="#contatto" className="hover:text-zinc-900 transition-colors">Contatti</a>
          </nav>

          <div className="flex items-center space-x-2 bg-zinc-900/5 border border-zinc-900/10 px-4 py-2 rounded-full">
            <span className="h-2 w-2 rounded-full bg-[#5F6F52] animate-pulse"></span>
            <span className="text-[10px] font-mono text-[#5F6F52] uppercase tracking-widest font-bold">Atelier Creativo</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION EDITORIALE */}
      <section className="relative pt-24 pb-16 px-6 max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 bg-[#E6E4DC] border border-zinc-300 px-4 py-1.5 rounded-full mb-8"
        >
          <Sparkles className="h-4 w-4 text-[#5F6F52]" />
          <span className="text-xs font-mono text-zinc-700 uppercase tracking-widest font-semibold">Progetto d'Autore</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 60 }}
          className="text-4xl md:text-7xl font-light tracking-tight leading-[1.1] mb-8 text-zinc-900 font-serif italic"
        >
          {hero.headline}
        </motion.h1>

        <p className="text-lg md:text-xl text-zinc-650 max-w-2xl mx-auto font-light leading-relaxed mb-12">
          {hero.subheadline}
        </p>

        <div className="flex justify-center">
          <a
            href="#contatto"
            className="bg-[#5F6F52] hover:bg-[#4a583e] text-white font-bold text-lg px-10 py-5 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-300 shadow-md"
          >
            <Phone className="h-5 w-5" />
            <span>{hero.cta1}</span>
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE BENTO GRID SECTION (ASIMMETRIA MOZZAFIATO) */}
      {/* ========================================================================= */}
      <section id="bento" className="py-12 px-6 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]">
          
          {/* Card 1: Grande Mosaico Visivo */}
          <motion.div 
            whileHover={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="md:col-span-2 md:row-span-2 bg-[#E6E4DC] border border-zinc-200 p-8 flex flex-col justify-between rounded-3xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-500"
          >
            <div className="absolute inset-0 z-0">
              <img src={bentoImg1} alt="Concept Design" className="w-full h-full object-cover filter brightness-[0.8] group-hover:scale-105 transition-transform duration-[1.2s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
            </div>
            <div className="relative z-10 text-left">
              <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">La Filosofia</span>
            </div>
            <div className="relative z-10 text-left text-white space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold font-serif italic">{servizi[0]?.titolo || "Inquadramento"}</h3>
              <p className="text-sm font-light text-stone-300 max-w-md">{servizi[0]?.descrizione || "Ogni progetto è unico. Uniamo materiali nobili a geometrie moderne per creare qualcosa che dura nel tempo."}</p>
            </div>
          </motion.div>

          {/* Card 2: Social Proof / Testimonial */}
          <div className="bg-[#E6E4DC]/50 border border-zinc-200/80 p-6 rounded-3xl flex flex-col justify-between text-left shadow-sm">
            <div className="flex items-center space-x-1 text-amber-600">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-600" />
              ))}
            </div>
            <p className="text-zinc-650 text-sm italic font-light">
              "{social_proof}"
            </p>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">— Recensione</span>
          </div>

          {/* Card 3: Servizio 2 */}
          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="bg-[#5F6F52] text-white border border-[#4a583e] p-6 rounded-3xl flex flex-col justify-between text-left shadow-sm hover:brightness-105 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-white/10 rounded-xl">
                <Check className="h-5 w-5 text-white" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-white/50" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg font-serif italic">{servizi[1]?.titolo || "Dettaglio"}</h4>
              <p className="text-xs text-stone-200 font-light leading-relaxed">{servizi[1]?.descrizione || servizi[1]?.description || "Perfezione artigianale maniacale applicata ad ogni millimetro di superficie."}</p>
            </div>
          </motion.div>

          {/* Card 4: Servizio 3 */}
          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="bg-white border border-zinc-200 p-6 rounded-3xl flex flex-col justify-between text-left shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-zinc-100 rounded-xl">
                <Check className="h-5 w-5 text-[#5F6F52]" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-zinc-400" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg font-serif italic">{servizi[2]?.titolo || "Spedizione"}</h4>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">{servizi[2]?.descrizione || servizi[2]?.description || "Spedizioni assicurate in tutta Europa con perizie tecniche dedicate."}</p>
            </div>
          </motion.div>

          {/* Card 5: Mosaico Fotografico Piccolo */}
          <div className="md:col-span-2 bg-[#E6E4DC] border border-zinc-200 rounded-3xl relative overflow-hidden group shadow-sm">
            <img src={bentoImg2} alt="Atelier Detail" className="w-full h-full object-cover filter brightness-[0.85] group-hover:scale-102 transition-transform duration-[1.2s]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
            <div className="absolute left-6 bottom-6 text-white text-left max-w-xs">
              <p className="text-xs font-mono text-white/70 uppercase tracking-widest mb-1">Materia Prima</p>
              <h4 className="text-lg font-bold font-serif italic">Solo Componenti Nobili</h4>
            </div>
          </div>

        </div>
      </section>
      {/* ========================================================================= */}

      {/* GALLERIA FOTOGRAFICA CON TEMA WARM INTEGRATO */}
      <Gallery galleria={data.galleria} brandColor={brand_color} theme="warm" />

      {/* ACCORDION FAQ CHIARO */}
      <section id="faq" className="py-24 px-6 max-w-3xl mx-auto border-t border-zinc-200 relative z-10">
        <h2 className="text-3xl font-bold font-serif italic text-center mb-12 text-zinc-900">Domande Frequenti</h2>
        
        <div className="space-y-4 text-left">
          {[
            { q: "Quali sono i tempi di attesa per un progetto?", a: "Essendo lavorazioni interamente artigianali d'autore, i tempi dipendono dalla complessità. Forniamo un cronoprogramma preciso in fase di preventivo." },
            { q: "Accettate progetti su disegno del cliente?", a: "Sì, realizziamo opere personalizzate collaborando strettamente con i progettisti o con il cliente stesso per interpretare ogni visione." },
            { q: "Fornite assistenza e perizia a domicilio?", a: "Sì, per i progetti più sensibili offriamo una consulenza tecnica sul posto gestita direttamente dai nostri maestri d'atelier." }
          ].map((faq, idx) => (
            <div key={idx} className="border-b border-zinc-200 pb-4">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-lg py-3 hover:text-[#5F6F52] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-zinc-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-[#5F6F52]' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-zinc-550 font-light leading-relaxed text-sm pt-2 pb-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📍 SEZIONE CONTATTO EDITORIALE CON MAPPA SPLIT-SCREEN COERENTE */}
      {/* ========================================================================= */}
      <section id="contatto" className="py-24 px-6 max-w-6xl mx-auto relative z-10 border-t border-zinc-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Colonna Sinistra: Mappa ed Indirizzi ad alto contrasto */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-mono text-[#5F6F52] uppercase tracking-widest font-bold">La nostra posizione</span>
            <h3 className="text-3xl md:text-4xl font-light font-serif italic text-zinc-900 leading-none">Vieni a trovarci in Atelier</h3>
            <p className="text-sm text-zinc-650 font-light leading-relaxed">
              Il nostro atelier riceve esclusivamente su appuntamento, al fine di garantire l'integrità e la riservatezza delle consulenze e delle opere in esposizione.
            </p>
            
            {/* Componente Mappa dinamico */}
            <GoogleMap address={indirizzo || fallbackIndirizzo} />

            <div className="space-y-3 text-xs font-mono text-zinc-500 uppercase tracking-wider pt-2">
              <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-[#5F6F52]" /> {fallbackEmail}</p>
              <p className="flex items-start gap-3"><MapPin className="h-4 w-4 text-[#5F6F52] shrink-0 mt-0.5" /> <span>{fallbackIndirizzo}</span></p>
            </div>
          </div>

          {/* Colonna Destra: Modulo Contatto raffinato */}
          <div className="lg:col-span-6 bg-white border border-zinc-200 p-8 rounded-3xl shadow-xl w-full">
            {inviato ? (
              <div className="py-12 text-center space-y-4">
                <div className="h-16 w-16 bg-[#5F6F52]/10 border border-[#5F6F52]/30 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-8 w-8 text-[#5F6F52]" />
                </div>
                <h3 className="text-2xl font-bold font-serif italic text-zinc-900">Richiesta Ricevuta!</h3>
                <p className="text-zinc-500 text-sm max-w-xs mx-auto">
                  Ti risponderemo personalmente via mail o recapito telefonico entro le prossime 24 ore.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold font-serif italic text-zinc-900 mb-1">Mettiti in Contatto</h3>
                  <p className="text-xs text-zinc-500 font-mono">Inizia il tuo percorso creativo</p>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Nome e Cognome</label>
                  <input
                    type="text"
                    required
                    placeholder="Es: Mario Rossi"
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-[#5F6F52] rounded-xl p-4 text-zinc-800 placeholder-zinc-400 transition-all outline-none text-sm shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Telefono o Email</label>
                  <input
                    type="text"
                    required
                    placeholder="Es: info@mio-sito.it"
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-[#5F6F52] rounded-xl p-4 text-white placeholder-zinc-400 transition-all outline-none text-sm shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#5F6F52] hover:bg-[#4a583e] text-white font-extrabold text-sm py-4.5 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md animate-none"
                >
                  <span>Invia Messaggio</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
      {/* ========================================================================= */}

      {/* FOOTER ORGANICO */}
      <footer className="border-t border-zinc-200 bg-white py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-left">
          
          <div className="space-y-4">
            <span className="font-extrabold text-lg tracking-widest text-zinc-900 uppercase">{nomeCliente}</span>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Mosaici digitali asimmetrici ottimizzati per la scansione visiva e l'esperienza d'autore.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400">Contatti Diretti</h4>
            <ul className="space-y-3 text-xs text-zinc-500 font-light">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#5F6F52]" />
                <a href={`mailto:${fallbackEmail}`} className="hover:text-zinc-900 transition-colors">{fallbackEmail}</a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-[#5F6F52]" shrink-0 mt-0.5" />
                <span>{fallbackIndirizzo}</span>
              </li>
            </ul>
          </div>

          {/* ⚡ CENTRALIZZAZIONE SOCIAL SISTEMATICA */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400">Seguici</h4>
            <SocialLinks data={data} brandColor={brand_color} />
          </div>

          <div className="space-y-4 text-xs text-zinc-500 font-light">
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

      {/* COOKIE BANNER GDPR CHIARO COMPLIANT */}
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
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
