// src/components/TemplateAutomotive.tsx
"use client";

import { motion } from 'framer-motion';
import { Car, Wrench, Award, Phone, Calendar, ArrowRight, Star } from 'lucide-react';

interface TemplateAutomotiveProps {
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
  };
  nomeCliente: string;
}

export default function TemplateAutomotive({ data, nomeCliente }: TemplateAutomotiveProps) {
  const { hero, servizi, social_proof } = data;

  // Icone specifiche per l'automotive in ordine
  const icons = [Wrench, Car, Award];

  return (
    <div className="min-h-screen bg-zinc-950 text-stone-100 selection:bg-amber-500 selection:text-black font-sans">
      
      {/* NAVBAR ELEGANTE */}
      <header className="border-b border-zinc-900 bg-zinc-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Car className="h-8 w-8 text-amber-500" />
            <span className="font-extrabold text-lg tracking-wider uppercase text-amber-500">{nomeCliente}</span>
          </div>
          <div className="flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="text-xs font-mono text-amber-500 uppercase tracking-widest">Restauro Certificato</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION - NOSTALGICA E DI PRESTIGIO */}
      <section className="relative pt-24 pb-20 px-6 max-w-5xl mx-auto text-center">
        {/* Glow ambrato morbido sullo sfondo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 bg-gradient-to-b from-stone-100 to-stone-400 bg-clip-text text-transparent">
            {hero.headline}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed mb-12"
        >
          {hero.subheadline}
        </motion.p>

        {/* DOUBLE CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <a
            href="tel:+3904251675950"
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-lg px-8 py-5 rounded-xl flex items-center justify-center space-x-3 transition-all duration-300 transform hover:scale-[1.03]"
          >
            <Phone className="h-5 w-5" />
            <span>{hero.cta1}</span>
          </a>
          
          <a
            href="#servizi"
            className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-stone-300 border border-zinc-850 font-bold text-lg px-8 py-5 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300"
          >
            <span>{hero.cta2}</span>
            <ArrowRight className="h-5 w-5 text-zinc-600" />
          </a>
        </motion.div>
      </section>

      {/* SOCIAL PROOF VINTAGE */}
      <section className="bg-zinc-900/50 border-y border-zinc-900 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
          <Star className="h-8 w-8 text-amber-500 shrink-0 fill-amber-500" />
          <p className="text-lg md:text-xl font-medium text-stone-300 italic">
            "{social_proof}"
          </p>
        </div>
      </section>

      {/* SEZIONE SERVIZI */}
      <section id="servizi" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-wide text-stone-200">
          Servizi di Officina Storica
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servizi.map((servizio, idx) => {
            const IconComponent = icons[idx] || Car;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="bg-zinc-900/40 border border-zinc-900 hover:border-amber-500/30 p-8 rounded-2xl transition-all duration-500 group relative"
              >
                <div className="bg-zinc-900 p-4 rounded-xl w-14 h-14 flex items-center justify-center mb-6 border border-zinc-800 group-hover:border-amber-500/20 transition-colors duration-500">
                  <IconComponent className="h-7 w-7 text-amber-500" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-amber-400 transition-colors duration-300">
                  {servizio.titolo}
                </h3>
                
                <p className="text-zinc-400 font-light leading-relaxed">
                  {servizio.descrizione}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FOOTER AUTOMOTIVE */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <Car className="h-12 w-12 text-amber-500 mx-auto mb-6" />
          <p className="text-xl font-bold mb-8 uppercase tracking-wider text-stone-300">
            Fai rivivere la leggenda della tua vettura
          </p>
          <a
            href="tel:+3904251675950"
            className="inline-flex bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-lg px-10 py-6 rounded-xl items-center space-x-3 transition-all duration-300"
          >
            <Calendar className="h-6 w-6" />
            <span>Prenota una Consulenza Tecnica</span>
          </a>
          <p className="text-zinc-600 text-xs font-mono mt-12">
            © {new Date().getFullYear()} {nomeCliente}. Tutti i diritti riservati. • Eccellenza Artigianale
          </p>
        </div>
      </footer>

    </div>
  );
}
