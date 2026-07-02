// src/components/TemplateHeroImage.tsx
"use client";

import { motion } from 'framer-motion';
import { Phone, ArrowRight, Star, CheckCircle } from 'lucide-react';
import React from 'react';

interface TemplateHeroImageProps {
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
    hero_image_url?: string; // Immagine principale scelta dall'IA o inserita
  };
  nomeCliente: string;
}

export default function TemplateHeroImage({ data, nomeCliente }: TemplateHeroImageProps) {
  const { hero, servizi, social_proof, brand_color = '#06B6D4', hero_image_url } = data;

  const customStyles = {
    '--brand-color': brand_color,
    '--brand-color-glow': `${brand_color}22`,
    '--brand-color-light': `${brand_color}55`,
  } as React.CSSProperties;

  return (
    <div 
      style={customStyles}
      className="min-h-screen bg-black text-zinc-100 selection:bg-[var(--brand-color)] selection:text-black font-sans"
    >
      
      {/* NAVBAR */}
      <header className="border-b border-zinc-900 bg-black/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-black text-lg tracking-widest uppercase text-[color:var(--brand-color)]">{nomeCliente}</span>
          <div className="flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full">
            <span className="h-2 w-2 rounded-full bg-[color:var(--brand-color)] animate-ping"></span>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Servizio Attivo</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION CON LAYOUT AD IMMAGINE LATERALE/CENTRALE */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Sinistra: Copy Persuasivo */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]"
          >
            {hero.headline}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <a
              href="tel:+3904251675950"
              className="bg-[color:var(--brand-color)] text-black font-extrabold text-lg px-8 py-5 rounded-2xl flex items-center justify-center space-x-3 shadow-[0_0_25px_var(--brand-color-glow)] hover:brightness-110 transition-all"
            >
              <Phone className="h-5 w-5" />
              <span>{hero.cta1}</span>
            </a>
            <a
              href="#servizi"
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 text-white font-bold text-lg px-8 py-5 rounded-2xl flex items-center justify-center space-x-2 transition-all"
            >
              <span>{hero.cta2}</span>
              <ArrowRight className="h-5 w-5 text-zinc-500" />
            </a>
          </motion.div>
        </div>

        {/* Destra: Immagine Hero con Glow di Contorno (Parallasse finto) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 80 }}
          className="lg:col-span-5 relative"
        >
          <div className="absolute inset-0 bg-[color:var(--brand-color)] rounded-3xl blur-[40px] opacity-15 pointer-events-none" />
          <img 
            src={hero_image_url || 'https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=600'} 
            alt="Hero Visual" 
            className="w-full h-[400px] object-cover rounded-3xl border border-white/10 shadow-2xl relative z-10"
          />
        </motion.div>

      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-zinc-950 border-y border-zinc-900 py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
          <Star className="h-8 w-8 text-[color:var(--brand-color)] fill-[color:var(--brand-color)] shrink-0" />
          <p className="text-lg md:text-xl font-medium text-zinc-300 italic">
            "{social_proof}"
          </p>
        </div>
      </section>

      {/* GRID SERVIZI */}
      <section id="servizi" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-16 uppercase tracking-wider">Servizi Dedicati</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servizi.map((servizio, idx) => (
            <div 
              key={idx}
              className="bg-zinc-950 border border-zinc-900 hover:border-[color:var(--brand-color-light)] p-8 rounded-2xl transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-4">{servizio.titolo}</h3>
              <p className="text-zinc-400 font-light leading-relaxed">{servizio.descrizione}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-16 px-6 text-center">
        <div className="max-w-lg mx-auto">
          <p className="text-zinc-500 text-xs font-mono">
            © {new Date().getFullYear()} {nomeCliente} • SiteEngine Template 1 (Hero Image)
          </p>
        </div>
      </footer>

    </div>
  );
}
