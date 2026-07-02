// src/components/TemplateBooking.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, Star, Check, Send, Sparkles } from 'lucide-react';
import React from 'react';

interface TemplateBookingProps {
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
  };
  nomeCliente: string;
}

export default function TemplateBooking({ data, nomeCliente }: TemplateBookingProps) {
  const { hero, servizi, social_proof, brand_color = '#3B82F6' } = data;
  const [inviato, setInviato] = useState(false);

  const customStyles = {
    '--brand-color': brand_color,
    '--brand-color-glow': `${brand_color}22`,
    '--brand-color-light': `${brand_color}55`,
  } as React.CSSProperties;

  const handleFakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInviato(true);
  };

  return (
    <div 
      style={customStyles}
      className="min-h-screen bg-black text-zinc-100 selection:bg-[var(--brand-color)] selection:text-black font-sans"
    >
      
      {/* NAVBAR */}
      <header className="border-b border-zinc-900 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-black text-lg tracking-widest uppercase text-[color:var(--brand-color)]">{nomeCliente}</span>
          <div className="flex items-center space-x-2 bg-zinc-900 border border-zinc-850 px-4 py-2 rounded-full">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Disponibilità Immediata</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION CON MODULO DI CONVERSIONE INTEGRATO */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[color:var(--brand-color)]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Sinistra: Testo e punti di forza */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full"
          >
            <Sparkles className="h-4 w-4 text-[color:var(--brand-color)]" />
            <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider">Zero Attesa • Contatto Diretto</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
            {hero.headline}
          </h1>

          <p className="text-lg text-zinc-400 font-light leading-relaxed">
            {hero.subheadline}
          </p>

          {/* Elenco vantaggi rapidi per spingere l'azione */}
          <div className="space-y-3 pt-4">
            {servizi.map((servizio, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="bg-[color:var(--brand-color-glow)] p-1 rounded-full mt-1">
                  <Check className="h-4 w-4 text-[color:var(--brand-color)]" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-200">{servizio.titolo}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Destra: Modulo di Contatto Interattivo (L'esca psicologica) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 90 }}
          className="lg:col-span-6 bg-zinc-950 border border-zinc-900 p-8 rounded-3xl shadow-2xl relative z-10 backdrop-blur-md"
        >
          {inviato ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center space-y-4"
            >
              <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Richiesta Ricevuta!</h3>
              <p className="text-zinc-400 text-sm max-w-xs mx-auto">
                Il nostro team sta analizzando i dati. Ti contatteremo entro 15 minuti.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleFakeSubmit} className="space-y-5">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-1">Richiedi Informazioni</h3>
                <p className="text-xs text-zinc-500 font-mono">Risposta garantita in giornata</p>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Il tuo Nome</label>
                <input
                  type="text"
                  required
                  placeholder="Es: Mario Rossi"
                  className="w-full bg-zinc-900 border border-zinc-850 focus:border-[color:var(--brand-color)] rounded-xl p-4 text-white placeholder-zinc-650 transition-all outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Telefono o Email</label>
                <input
                  type="text"
                  required
                  placeholder="Es: +39 333 123456"
                  className="w-full bg-zinc-900 border border-zinc-850 focus:border-[color:var(--brand-color)] rounded-xl p-4 text-white placeholder-zinc-650 transition-all outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Seleziona Servizio d'interesse</label>
                <select className="w-full bg-zinc-900 border border-zinc-850 focus:border-[color:var(--brand-color)] rounded-xl p-4 text-white transition-all outline-none text-sm appearance-none">
                  {servizi.map((s, idx) => (
                    <option key={idx} value={idx}>{s.titolo}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[color:var(--brand-color)] text-black font-extrabold text-sm py-4.5 rounded-xl flex items-center justify-center space-x-2 shadow-[0_0_20px_var(--brand-color-glow)] hover:brightness-110 transition-all"
              >
                <span>Invia Richiesta</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </motion.div>

      </section>

      {/* TRUST PROOF BANNER */}
      <section className="bg-zinc-950 border-y border-zinc-900 py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6">
          <Star className="h-8 w-8 text-[color:var(--brand-color)] fill-[color:var(--brand-color)] shrink-0 animate-pulse" />
          <p className="text-lg md:text-xl font-medium text-zinc-300 italic">
            "{social_proof}"
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 px-6 text-center">
        <div className="max-w-lg mx-auto space-y-4">
          <p className="text-zinc-600 text-[10px] font-mono tracking-widest uppercase">
            © {new Date().getFullYear()} {nomeCliente} • SiteEngine Template 3 (Direct Lead)
          </p>
        </div>
      </footer>

    </div>
  );
}
