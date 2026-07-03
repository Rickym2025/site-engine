// src/components/TemplateHeroVideo.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Wrench, Award, Phone, Calendar, ArrowRight, Star, Mail, MapPin, ChevronDown, Check } from 'lucide-react';
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
    email?: string;
    indirizzo?: string;
    social_fb?: string;
    social_ig?: string;
  };
  nomeCliente: string;
}

export default function TemplateHeroVideo({ data, nomeCliente }: TemplateHeroVideoProps) {
  const { hero, servizi, social_proof, brand_color = '#F59E0B', video_bg_url, email, indirizzo, social_fb, social_ig } = data;

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showCookies, setShowCookies] = useState(false);
  const [inviato, setInviato] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. TRACCIAMENTO DEL MOUSE PER IL FARO DI LUCE (SPOTLIGHT EFFECT)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.documentElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      document.documentElement.style.setProperty('--mouse-x', `${x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. CANVAS PARTICELLE ATMOSFERICHE (POLVERE FLUTTUANTE INTERATTIVA)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; size: number; speedX: number; speedY: number; alpha: number }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Inizializza 25 particelle fluttuanti di polvere luminosa
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2 - 0.1, // Fluttuazione verso l'alto
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = brand_color;

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Se esce dallo schermo, riposizionalo
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0 || p.x > canvas.width) p.x = Math.random() * canvas.width;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [brand_color]);

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

  const icons = [Wrench, Car, Award];

  // Configurazione dei colori e dei BAGLIORI (GLOW) ad altissimo contrasto
  const customStyles = {
    '--brand-color': brand_color,
    '--brand-color-glow': `${brand_color}25`, // 15% opacità per l'orbita del mouse
    '--brand-color-strong': `${brand_color}55`, // 33% per i contorni attivi
    '--brand-color-light': `${brand_color}aa`, // 66% per i bagliori dei bottoni
  } as React.CSSProperties;

  // Immagini di fallback professionali
  const imgFallbackLeft = "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=600"; // Foto auto sportiva di profilo
  const imgFallbackRight = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600"; // Foto dettagli carrozzeria/fari

  const defaultVideo = "https://assets.mixkit.co/videos/preview/mixkit-fast-driving-in-a-tunnel-at-night-42220-large.mp4";

  return (
    <div 
      style={customStyles}
      className="min-h-screen bg-[#030303] text-stone-100 selection:bg-[var(--brand-color)] selection:text-black font-sans overflow-x-hidden relative"
    >
      
      {/* ========================================================================= */}
      {/* SFONDO DINAMICO INTERATTIVO (GRIGLIA, PARTICELLE FLUTTUANTI E MOUSE SPOTLIGHT) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* 1. Vignetta Cromatica di base molto scura */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,#030303_100%)] z-1" />

        {/* 2. IL FARO DI LUCE CHE SEGUE IL MOUSE (MOUSE SPOTLIGHT - STILE REFERO) */}
        <div className="absolute inset-0 bg-[radial-gradient(600px_at_var(--mouse-x)_var(--mouse-y),var(--brand-color-glow),transparent_50%)] z-1" />

        {/* 3. CANVAS DELLE PARTICELLE FLUTTUANTI (ATMO-DUST) */}
        <canvas ref={canvasRef} className="absolute inset-0 z-1 opacity-70" />

        {/* 4. Griglia Geometrica fine a maschera radiale */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_90%)] z-1" />

        {/* 5. Player Video di Sfondo leggero */}
        <div className="absolute inset-0 h-[85vh] opacity-30 mix-blend-screen z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.2]"
            src={video_bg_url || defaultVideo}
          />
        </div>

        {/* Sfumatura finale verso il fondo scuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030303] h-[90vh] z-1" />
      </div>
      {/* ========================================================================= */}

      {/* NAVBAR GLASSMORPHISM */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Car className="h-8 w-8 text-[color:var(--brand-color)] drop-shadow-[0_0_12px_var(--brand-color)]" />
            <span className="font-black text-lg tracking-widest uppercase bg-gradient-to-r from-white to-stone-450 bg-clip-text text-transparent">
              {nomeCliente}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[color:var(--brand-color)] animate-ping" />
            <span className="text-[10px] font-mono text-stone-300 uppercase tracking-widest">Atelier Attivo</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 max-w-5xl mx-auto text-center z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 bg-black/60 border border-[color:var(--brand-color-strong)] px-4 py-1.5 rounded-full mb-8 shadow-[0_0_20px_var(--brand-color-glow)] backdrop-blur-md"
        >
          <span className="text-xs font-mono text-[color:var(--brand-color)] uppercase tracking-widest font-bold">Standard d'Eccellenza</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-black tracking-tight leading-[1.05] mb-8 bg-gradient-to-b from-white via-stone-100 to-stone-500 bg-clip-text text-transparent"
        >
          {hero.headline}
        </motion.h1>

        <p className="text-lg md:text-2xl text-stone-350 max-w-3xl mx-auto font-light leading-relaxed mb-14 drop-shadow-md">
          {hero.subheadline}
        </p>

        {/* DOUBLE CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 max-w-lg mx-auto">
          <a
            href="#contatto"
            className="w-full sm:w-auto bg-[color:var(--brand-color)] text-black font-black text-lg px-10 py-5 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-300 transform hover:scale-[1.03] shadow-[0_0_30px_var(--brand-color-light)]"
          >
            <Phone className="h-5 w-5 fill-black" />
            <span>{hero.cta1}</span>
          </a>
          
          <a
            href="#servizi"
            className="w-full sm:w-auto bg-black/40 hover:bg-white/5 text-stone-200 border border-white/15 hover:border-[color:var(--brand-color-strong)] font-bold text-lg px-10 py-5 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300 backdrop-blur-md"
          >
            <span>{hero.cta2}</span>
            <ArrowRight className="h-5 w-5 text-zinc-500" />
          </a>
        </div>
      </section>

      {/* RECENSIONI SOPRA LA PIEGA */}
      <section className="relative z-10 px-6 mb-24 max-w-5xl mx-auto">
        <div className="bg-white/[0.01] border border-white/5 backdrop-blur-xl p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--brand-color-glow)] to-transparent rounded-3xl pointer-events-none" />
          <div className="flex items-center space-x-2 text-amber-500 shrink-0 relative z-10">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-amber-500" />
            ))}
          </div>
          <p className="text-lg text-stone-300 italic leading-relaxed relative z-10 text-center md:text-left">
            "{social_proof}"
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEZIONE COMPLEMENTARE 1: ALTERNATA - IMMAGINE A SX, TESTO A DX */}
      {/* ========================================================================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative h-[380px]"
        >
          {/* Un gradiente di riflesso luminoso sull'immagine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[color:var(--brand-color-glow)] via-transparent to-transparent pointer-events-none z-1" />
          <img src={imgFallbackLeft} alt="Precisione Artigianale" className="w-full h-full object-cover filter brightness-[0.8] hover:scale-105 transition-transform duration-700" />
        </motion.div>
        
        <div className="space-y-6 text-left">
          <span className="text-xs font-mono text-[color:var(--brand-color)] uppercase tracking-wider font-bold">Standard Artigianali</span>
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-b from-white to-stone-400 bg-clip-text text-transparent">
            Ripristino Totale e Cura dei Dettagli
          </h2>
          <p className="text-lg text-stone-400 font-light leading-relaxed">
            Ogni progetto viene approcciato analizzandone l'originalità e la conservazione storica. Smontiamo completamente ogni componente per eseguire trattamenti dedicati di altissimo livello.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEZIONE COMPLEMENTARE 2: ALTERNATA - TESTO A SX, IMMAGINE A DX */}
      {/* ========================================================================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10 border-t border-white/5">
        <div className="space-y-6 text-left order-2 md:order-1">
          <span className="text-xs font-mono text-[color:var(--brand-color)] uppercase tracking-wider font-bold">Unicità Garantita</span>
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-b from-white to-stone-400 bg-clip-text text-transparent">
            Una Storia che Merita di essere Tramandata
          </h2>
          <p className="text-lg text-stone-400 font-light leading-relaxed">
            Salvaguardiamo il valore storico e collezionistico della tua vettura, effettuando ricerche certosine dei ricambi originali d'epoca nei canali più esclusivi a livello europeo.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative h-[380px] order-1 md:order-2"
        >
          <div className="absolute inset-0 bg-gradient-to-tl from-[color:var(--brand-color-glow)] via-transparent to-transparent pointer-events-none z-1" />
          <img src={imgFallbackRight} alt="Materiali e Finiture" className="w-full h-full object-cover filter brightness-[0.8] hover:scale-105 transition-transform duration-700" />
        </motion.div>
      </section>
      {/* ========================================================================= */}

      {/* SEZIONE SERVIZI */}
      <section id="servizi" className="py-20 px-6 max-w-6xl mx-auto relative z-10 border-t border-white/5">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-16 tracking-widest uppercase text-stone-200">
          I Nostri Standard Operativi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servizi.map((servizio, idx) => {
            const IconComponent = icons[idx] || Car;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="bg-black/40 border border-white/5 hover:border-[color:var(--brand-color-strong)] p-8 rounded-3xl transition-all duration-500 group relative backdrop-blur-md shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--brand-color-glow)] to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="bg-white/[0.02] p-4 rounded-2xl w-14 h-14 flex items-center justify-center mb-8 border border-white/10 group-hover:border-[color:var(--brand-color-strong)] group-hover:shadow-[0_0_15px_var(--brand-color-glow)] transition-all duration-500">
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

      {/* ACCORDION FAQ */}
      <section id="faq" className="py-24 px-6 max-w-3xl mx-auto border-t border-white/5 relative z-10">
        <h2 className="text-3xl font-black text-center mb-12 uppercase tracking-wide">Domande Frequenti</h2>
        
        <div className="space-y-4">
          {[
            { q: "Quali sono le tempistiche d'intervento?", a: "Ogni progetto viene pianificato meticolosamente. Le tempistiche variano in base al tipo di restauro, ma sarai costantemente aggiornato con report fotografici settimanali." },
            { q: "Fornite certificati di originalità?", a: "Sì, ogni nostra perizia ed ogni nostro restauro storico viene corredato da un book fotografico completo e da certificato ufficiale di conformità storica." },
            { q: "Posso concordare un ritiro con carroattrezzi protetto?", a: "Assolutamente sì. Disponiamo di mezzi di trasporto coperti e protetti per il ritiro e la consegna della vettura in totale sicurezza ovunque in Europa." }
          ].map((faq, idx) => (
            <div key={idx} className="border-b border-white/5 pb-4">
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
                    <p className="text-stone-400 font-light leading-relaxed text-sm pt-2 pb-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* MODULO DI CONTATTO */}
      <section id="contatto" className="py-20 px-6 max-w-xl mx-auto relative z-10 border-t border-white/5">
        <div className="bg-black/40 border border-white/5 p-8 rounded-3xl shadow-2xl backdrop-blur-md">
          {inviato ? (
            <div className="py-12 text-center space-y-4">
              <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Richiesta Ricevuta!</h3>
              <p className="text-stone-400 text-sm max-w-xs mx-auto">
                Ti ricontatteremo entro i prossimi 15 minuti.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-1">Mettiti in Contatto</h3>
                <p className="text-xs text-stone-500 font-mono">Consulenza preliminare senza impegno</p>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-stone-450 uppercase tracking-wider mb-2">Nome e Cognome</label>
                <input
                  type="text"
                  required
                  placeholder="Es: Mario Rossi"
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-[color:var(--brand-color)] rounded-xl p-4 text-white placeholder-stone-600 transition-all outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-stone-450 uppercase tracking-wider mb-2">Telefono o Email</label>
                <input
                  type="text"
                  required
                  placeholder="Es: info@mio-sito.it"
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-[color:var(--brand-color)] rounded-xl p-4 text-white placeholder-stone-600 transition-all outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[color:var(--brand-color)] text-black font-black text-sm py-4.5 rounded-xl flex items-center justify-center space-x-2 shadow-[0_0_20px_var(--brand-color-glow)] hover:brightness-110 transition-all"
              >
                <span>Invia Messaggio</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER SEMANTICO */}
      <footer className="border-t border-white/5 bg-black py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo e Mission */}
          <div className="space-y-4 text-left">
            <span className="font-black text-lg tracking-widest text-[color:var(--brand-color)] uppercase">{nomeCliente}</span>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Soluzioni ad alta conversione basate sui più rigidi standard di neuromarketing e ingegneria visiva.
            </p>
          </div>

          {/* Contatti Diretti */}
          <div className="space-y-4 text-left">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-400">Contatti Diretti</h4>
            <ul className="space-y-3 text-xs text-stone-500 font-light">
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
          <div className="space-y-4 text-left">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-400">Seguici</h4>
            <div className="flex items-center space-x-3">
              {social_fb && (
                <a href={social_fb} target="_blank" className="p-3 bg-white/[0.02] rounded-full border border-white/5 hover:border-[color:var(--brand-color-strong)] text-stone-400 hover:text-white transition-all">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
              )}
              {social_ig && (
                <a href={social_ig} target="_blank" className="p-3 bg-white/[0.02] rounded-full border border-white/5 hover:border-[color:var(--brand-color-strong)] text-stone-400 hover:text-white transition-all">
                  <svg className="h-4 w-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Trasparenza */}
          <div className="space-y-4 text-xs text-stone-500 font-light text-left">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400">Trasparenza</h4>
            <p>P.IVA: IT01234567890</p>
            <div className="flex flex-col space-y-2">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Termini e Condizioni</a>
            </div>
          </div>

        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-xs text-stone-600 font-mono tracking-widest">
          © {new Date().getFullYear()} {nomeCliente} • RM Studio HyperFrame Engine
        </div>
      </footer>

      {/* COOKIE BANNER GDPR COMPLIANT */}
      <AnimatePresence>
        {showCookies && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-[#080808]/95 border border-white/5 p-6 rounded-3xl shadow-2xl z-100 backdrop-blur-xl flex flex-col gap-4"
          >
            <p className="text-xs text-stone-400 leading-relaxed font-light text-left">
              Questo sito web utilizza cookie tecnici necessari per il corretto funzionamento e l'ottimizzazione dell'esperienza utente. Cliccando su "Accetto", acconsenti al loro utilizzo.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <a href="#" className="text-[10px] font-mono text-stone-500 hover:text-stone-400 underline transition-colors">Maggiori info</a>
              <button 
                onClick={acceptCookies}
                className="bg-[color:var(--brand-color)] text-black text-xs font-bold px-4 py-2.5 rounded-xl hover:brightness-110 transition-all flex items-center space-x-2"
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
