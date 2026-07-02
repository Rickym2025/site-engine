// src/components/TemplateSecurity.tsx
"use client";

import { motion } from 'framer-motion';
import { Shield, Eye, Activity, PhoneCall, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TemplateSecurityProps {
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

export default function TemplateSecurity({ data, nomeCliente }: TemplateSecurityProps) {
  const { hero, servizi, social_proof } = data;

  // Icone per i servizi in ordine
  const icons = [Activity, Eye, Shield];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black font-sans">
      
      {/* HEADER / NAVBAR PERSUASIVA */}
      <header className="border-b border-zinc-900 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-emerald-500" />
            <span className="font-extrabold text-xl tracking-tight uppercase">{nomeCliente}</span>
          </div>
          <div className="flex items-center space-x-2 bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-full">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Centrale Attiva H24</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION - MASSIVE TYPOGRAPHY & ZERO FRICTION */}
      <section className="relative pt-24 pb-20 px-6 max-w-5xl mx-auto text-center overflow-hidden">
        {/* Sfondo luminoso soffuso dietro il testo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            {hero.headline}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed mb-12"
        >
          {hero.subheadline}
        </motion.p>

        {/* DOUBLE CTA - RIDUZIONE MASSIMA ATTRITO DECISIONALE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <a
            href="tel:+3904251675950" // Numero demo per simulare la chiamata
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-8 py-5 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-300 transform hover:scale-[1.03] shadow-lg shadow-emerald-500/20"
          >
            <PhoneCall className="h-5 w-5" />
            <span>{hero.cta1}</span>
          </a>
          
          <a
            href="#servizi"
            className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700 font-bold text-lg px-8 py-5 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300"
          >
            <span>{hero.cta2}</span>
            <ArrowRight className="h-5 w-5 text-zinc-500" />
          </a>
        </motion.div>
      </section>

      {/* SOCIAL PROOF VELOCE */}
      <section className="bg-zinc-950 border-y border-zinc-900 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
          <CheckCircle2 className="h-10 w-10 text-emerald-500 shrink-0" />
          <p className="text-xl md:text-2xl font-semibold text-zinc-300 italic">
            "{social_proof}"
          </p>
        </div>
      </section>

      {/* SEZIONE SERVIZI - GLOWING EFFECT */}
      <section id="servizi" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16 uppercase tracking-wider">
          Protocolli di Sicurezza Attivi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servizi.map((servizio, idx) => {
            const IconComponent = icons[idx] || Shield;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="bg-zinc-950 border border-zinc-900 hover:border-emerald-500/50 p-8 rounded-3xl transition-all duration-500 group relative"
              >
                {/* Micro-glow sul retro della card */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="bg-zinc-900 p-4 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 border border-zinc-800 group-hover:border-emerald-500/30 transition-colors duration-500">
                  <IconComponent className="h-7 w-7 text-emerald-500" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                  {servizio.titolo}
                </h3>
                
                <p className="text-lg text-zinc-400 font-light leading-relaxed">
                  {servizio.descrizione}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FOOTER DI CONVERSIONE FINALE */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <Shield className="h-12 w-12 text-emerald-500 mx-auto mb-6" />
          <p className="text-2xl font-extrabold mb-8 uppercase tracking-wide">
            Non lasciare la tua sicurezza al caso
          </p>
          <a
            href="tel:+3904251675950"
            className="inline-flex bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xl px-10 py-6 rounded-2xl items-center space-x-3 transition-all duration-300 shadow-lg shadow-emerald-500/20"
          >
            <PhoneCall className="h-6 w-6" />
            <span>Chiama la Centrale Operativa</span>
          </a>
          <p className="text-zinc-600 text-xs font-mono mt-12">
            © {new Date().getFullYear()} {nomeCliente}. Tutti i diritti riservati. • P.IVA 0123456789
          </p>
        </div>
      </footer>

    </div>
  );
}