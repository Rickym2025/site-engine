// src/components/TemplateHeroVideo.tsx
"use client";

import { motion } from 'framer-motion';
import { Car, Wrench, Award, Phone, Calendar, ArrowRight, Star, Play } from 'lucide-react';
import React from 'react';

interface TemplateHeroVideoProps {
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
  };
  nomeCliente: string;
}

export default function TemplateHeroVideo({ data, nomeCliente }: TemplateHeroVideoProps) {
  const { hero, servizi, social_proof, brand_color = '#F59E0B', video_bg_url } = data;

  const icons = [Wrench, Car, Award];

  // Configurazione variabili di colore e profondità
  const customStyles = {
    '--brand-color': brand_color,
    '--brand-color-glow': `${brand_color}18`, // 10% opacità per aurore e bagliori soffusi
    '--brand-color-light': `${brand_color}55`, // 33% opacità per bordi attivi
  } as React.CSSProperties;

  return (
    <div 
      style={customStyles}
      className="min-h-screen bg-[#030303] text-stone-100 selection:bg-[var(--brand-color)] selection:text-black font-sans overflow-x-hidden relative"
    >
      
      {/* ========================================================================= */}
      {/* SFONDO TRIDIMENSIONALE PRO (STILE ACETERNITY / REFERO) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* 1. Vignetta Cromatica Satura di base (Tinge lo sfondo nero col colore del brand) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--brand-color-glow)_0%,#020202_100%)] opacity-80" />

        {/* 2. Doppia Aurora Danzante (Due bolle sfocate che fluttuano lentamente in loop) */}
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[color:var(--brand-color)]/5 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -60, 80, 0],
            y: [0, 40, -60, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-[color:var(--brand-color)]/5 blur-[120px]"
        />

        {/* 3. Griglia Geometrica ad alta precisione (sfuma verso i bordi dello schermo) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:45px_40px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

        {/* 4. Video Immersivo se caricato (con griglia di pixel sopra per uniformare) */}
        {video_bg_url && (
          <div className="absolute inset-0 h-[85vh] opacity-35 filter contrast-[1.1] mix-blend-screen">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src={video_bg_url}
            />
            <div className="absolute inset-0 bg-[#030303]/40" />
          </div>
        )}

        {/* Griglia a linee scure orizzontali (pixel-grid) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
        
        {/* Sfumatura finale verso il fondo nero profondo */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030303] h-[90vh]" />
      </div>
      {/* ========================================================================= */}

      {/* NAVBAR GLASSMORPHISM */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Car className="h-8 w-8 text-[color:var(--brand-color)] drop-shadow-[0_0_8px_var(--brand-color)]" />
            <span className="font-black text-lg tracking-widest uppercase bg-gradient-to-r from-white to-stone-400 bg-clip-text text-transparent">
              {nomeCliente}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <Star className="h-4 w-4 text-[color:var(--brand-color)] fill-[color:var(--brand-color)] animate-pulse" />
            <span className="text-[10px] font-mono text-stone-300 uppercase tracking-widest">Atelier Digitale</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 max-w-5xl mx-auto text-center z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 80 }}
          className="inline-flex items-center space-x-2 bg-black/60 border border-[color:var(--brand-color-light)] px-4 py-1.5 rounded-full mb-8 shadow-[0_0_15px_var(--brand-color-glow)] backdrop-blur-md"
        >
          <span className="h-2 w-2 rounded-full bg-[color:var(--brand-color)] animate-ping" />
          <span className="text-xs font-mono text-[color:var(--brand-color)] uppercase tracking-widest font-bold">Ingegneria d'eccellenza</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 60 }}
        >
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.05] mb-8 bg-gradient-to-b from-white via-stone-100 to-stone-500 bg-clip-text text-transparent">
            {hero.headline}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg md:text-2xl text-stone-300 max-w-3xl mx-auto font-light leading-relaxed mb-14 drop-shadow-md"
        >
          {hero.subheadline}
        </motion.p>

        {/* DOUBLE CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 max-w-lg mx-auto"
        >
          <a
            href="tel:+3904251675950"
            className="w-full sm:w-auto bg-[color:var(--brand-color)] text-black font-black text-lg px-10 py-5 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-300 transform hover:scale-[1.03] shadow-[0_0_20px_var(--brand-color-glow)]"
          >
            <Phone className="h-5 w-5 fill-black" />
            <span>{hero.cta1}</span>
          </a>
          
          <a
            href="#servizi"
            className="w-full sm:w-auto bg-black/40 hover:bg-white/5 text-stone-200 border border-white/15 hover:border-[color:var(--brand-color-light)] font-bold text-lg px-10 py-5 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300 backdrop-blur-md"
          >
            <span>{hero.cta2}</span>
            <ArrowRight className="h-5 w-5 text-zinc-500" />
          </a>
        </motion.div>
      </section>

      {/* SOCIAL PROOF VETRO SFOCATO */}
      <section className="relative z-10 px-6 mb-24">
        <div className="max-w-4xl mx-auto bg-white/[0.02] border border-white/5 backdrop-blur-lg p-10 rounded-3xl flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left shadow-2xl">
          <Star className="h-8 w-8 text-[color:var(--brand-color)] shrink-0 fill-[color:var(--brand-color)] drop-shadow-[0_0_10px_var(--brand-color)]" />
          <p className="text-lg md:text-xl font-medium text-stone-300 italic leading-relaxed">
            "{social_proof}"
          </p>
        </div>
      </section>

      {/* SEZIONE SERVIZI */}
      <section id="servizi" className="py-12 px-6 max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-16 tracking-widest uppercase text-stone-200">
          I Nostri Standard Operativi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servizi.map((servizio, idx) => {
            const IconComponent = icons[idx] || Car;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, type: "spring", stiffness: 80 }}
                whileHover={{ y: -8 }}
                className="bg-black/30 border border-white/5 hover:border-[color:var(--brand-color-light)] p-8 rounded-3xl transition-all duration-500 group relative backdrop-blur-md shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--brand-color-glow)] to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="bg-white/[0.02] p-4 rounded-2xl w-14 h-14 flex items-center justify-center mb-8 border border-white/10 group-hover:border-[color:var(--brand-color-light)] group-hover:shadow-[0_0_15px_var(--brand-color-glow)] transition-all duration-500">
                  <IconComponent className="h-7 w-7 text-[color:var(--brand-color)]" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-[color:var(--brand-color)] transition-colors duration-300">
                  {servizio.titolo}
                </h3>
                
                <p className="text-lg text-stone-400 font-light leading-relaxed">
                  {servizio.descrizione}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-black py-24 px-6 text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          <Car className="h-12 w-12 text-[color:var(--brand-color)] mx-auto mb-6 filter drop-shadow-[0_0_15px_var(--brand-color)]" />
          <p className="text-2xl md:text-3xl font-black mb-10 tracking-wide text-stone-100 uppercase">
            Eccellenza senza compromessi
          </p>
          <a
            href="tel:+3904251675950"
            className="inline-flex bg-[color:var(--brand-color)] text-black font-black text-xl px-12 py-6 rounded-2xl items-center space-x-4 transition-all duration-300 shadow-[0_0_20px_var(--brand-color-glow)]"
          >
            <Calendar className="h-6 w-6" />
            <span>Inizia il Tuo Progetto</span>
          </a>
          <p className="text-zinc-650 text-xs font-mono mt-16 tracking-widest">
            © {new Date().getFullYear()} {nomeCliente} • RM Studio HyperFrame Engine
          </p>
        </div>
      </footer>

    </div>
  );
}
