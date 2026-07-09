// src/components/Template_il_sentiero.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Milestone, Compass, Check, Send, Mail, MapPin, ChevronDown, Sparkles, ArrowDown, Shield, ShieldCheck } from 'lucide-react';
import React from 'react';
import GoogleMap from './GoogleMap';
import Link from 'next/link';

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
    brand_color?: string; // Di default useremo un verde foresta profondo (#1E3F20)
    email?: string;
    indirizzo?: string;
    social_fb?: string;
    social_ig?: string;
    immagine_hero?: string;
    piva?: string;
  };
  nomeCliente: string;
  slug: string;
  hasBlog?: boolean;
}

export default function Template_il_sentiero({ data, nomeCliente, slug }: TemplateProps) {
  const { hero, social_proof, brand_color = '#1E3F20', email, indirizzo, social_fb, social_ig, immagine_hero, piva } = data;
  const servizi = data.servizi || [];
  
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showCookies, setShowCookies] = useState(false);
  const [inviato, setInviato] = useState(false);

  // IMMAGINE DI DEFAULT A TUTTO SCHERMO (Bosco nebbioso o sentiero rilassante)
  const defaultImmagineHero = immagine_hero || "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1600&auto=format&fit=crop";

  // FALLBACK DIMOSTRATIVI
  const fallbackEmail = email || `contatti@${nomeCliente.toLowerCase().replace(/[^a-z0-9]/g, '')}.it`;
  const fallbackIndirizzo = indirizzo || "Via dei Pioppi 24, Presso Centro Olistico (RO)";
  const fallbackFb = social_fb || "https://facebook.com";
  const fallbackIg = social_ig || "https://instagram.com";
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
      className="min-h-screen bg-[#FAF9F5] text-stone-800 selection:bg-[var(--brand-color)] selection:text-white font-sans relative overflow-x-hidden"
    >

      {/* NAVBAR TRASPARENTE IN SOVRAPPOSIZIONE */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/60 to-transparent">
        <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
          <span className="font-serif font-black text-xl tracking-tight text-white">{nomeCliente}</span>
          
          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest text-stone-200/90">
            <a href="#tappe" className="hover:text-white transition-colors">Il Metodo</a>
            <a href="#specializzazioni" className="hover:text-white transition-colors">Specializzazioni</a>
            <a href="#studio" className="hover:text-white transition-colors">Dove Ricevo</a>
            <a href="#prenota" className="hover:text-white transition-colors">Prenotazioni</a>
          </nav>
          
          <a href="#prenota" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-[10px] font-bold uppercase tracking-widest px-5 py-3 rounded-xl transition-all backdrop-blur-sm">
            Scrivimi
          </a>
        </div>
      </header>

      {/* HERO SECTION A TUTTO SCHERMO (FULL-BLEED) CON IMMAGINE DI SFONDO */}
      <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        
        {/* Immagine di Sfondo fissa */}
        <div className="absolute inset-0">
          <img 
            src={defaultImmagineHero} 
            alt="Sentiero Terapeutico" 
            className="w-full h-full object-cover transform scale-105"
          />
          {/* Overlay scuro per garantire leggibilità assoluta del testo */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-[#FAF9F5]" />
        </div>

        {/* Box in vetro satinato (Glassmorphism) centrale e fluttuante */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-black/40 border border-white/10 p-8 md:p-12 rounded-[36px] backdrop-blur-xl shadow-2xl text-white space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full">
              <Compass className="h-4 w-4 text-[#D4AF37] animate-spin" style={{ animationDuration: '20s' }} />
              <span className="text-[10px] font-mono text-stone-200 uppercase tracking-widest font-black">Inizia il tuo cammino di rinascita</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-tight">
              {hero.headline}
            </h1>

            <p className="text-sm md:text-base text-stone-300 font-light leading-relaxed max-w-xl mx-auto">
              {hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a 
                href="#prenota" 
                className="bg-gradient-to-r from-[var(--brand-color)] to-[#4B6F44] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-2xl transition-all shadow-lg hover:brightness-110"
              >
                {hero.cta1}
              </a>
              <a 
                href="#tappe" 
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-2xl transition-all"
              >
                {hero.cta2}
              </a>
            </div>
          </motion.div>

          {/* Icona indicatore per scorrere verso il basso */}
          <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 hidden md:block">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center shadow-lg text-stone-600"
            >
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </div>
        </div>

      </section>

      {/* CITAZIONE CHIAVE (SOCIAL PROOF CON UN LOOK PREMIUM) */}
      <section className="py-24 bg-[#FAF9F5] px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-3xl font-serif text-[#D4AF37]">“</span>
          <p className="text-2xl md:text-3xl font-serif font-bold text-[var(--brand-color)] leading-snug max-w-3xl mx-auto">
            {social_proof}
          </p>
          <span className="text-3xl font-serif text-[#D4AF37]">”</span>
        </div>
      </section>

      {/* 🚀 LE TRE TAPPE DEL SENTIERO (TIMELINE VERTICALE) */}
      <section id="tappe" className="py-24 bg-white border-y border-stone-200/50 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-20 space-y-2">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-black">Il metodo di lavoro</span>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-stone-900">Le Tappe del Percorso</h2>
            <p className="text-sm text-stone-500 font-light">Come si sviluppa concretamente il cammino terapeutico, passo dopo passo.</p>
          </div>

          {/* Contenitore Timeline */}
          <div className="relative border-l border-stone-200 max-w-3xl mx-auto pl-8 md:pl-12 space-y-16">
            
            {/* TAPPA 1 */}
            <div className="relative text-left">
              {/* Cerchio numerato */}
              <div className="absolute left-[-44px] md:left-[-60px] top-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--brand-color)] text-white font-serif font-black text-sm flex items-center justify-center border-4 border-white shadow-md z-20">
                1
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold">Fase 1: Accoglienza e Ascolto</span>
                <h3 className="text-2xl font-serif font-black text-stone-950">Il Primo Colloquio Conoscitivo</h3>
                <p className="text-sm text-stone-500 font-light leading-relaxed max-w-2xl mt-1">
                  Uno spazio iniziale dedicato a comprendere quali sono le tue fatiche attuali. Non è richiesto alcun tipo di preparazione: parlerai unicamente di ciò che ti senti di condividere, nel totale rispetto dei tuoi tempi e della tua privacy.
                </p>
              </div>
            </div>

            {/* TAPPA 2 */}
            <div className="relative text-left">
              {/* Cerchio numerato */}
              <div className="absolute left-[-44px] md:left-[-60px] top-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--brand-color)] text-white font-serif font-black text-sm flex items-center justify-center border-4 border-white shadow-md z-20">
                2
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold">Fase 2: Consapevolezza ed Elaborazione</span>
                <h3 className="text-2xl font-serif font-black text-stone-950">L'Inquadramento dei Blocchi Emotivi</h3>
                <p className="text-sm text-stone-500 font-light leading-relaxed max-w-2xl mt-1">
                  Insieme indagheremo i nodi irrisolti o i pattern comportamentali ripetitivi che ti causano ansia, stress o insoddisfazione. Comincerai a vedere le tue problematiche da un punto di vista differente e ad accogliere le tue risorse sopite.
                </p>
              </div>
            </div>

            {/* TAPPA 3 */}
            <div className="relative text-left">
              {/* Cerchio numerato */}
              <div className="absolute left-[-44px] md:left-[-60px] top-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--brand-color)] text-white font-serif font-black text-sm flex items-center justify-center border-4 border-white shadow-md z-20">
                3
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold">Fase 3: Autonomia e Nuovi Orizzonti</span>
                <h3 className="text-2xl font-serif font-black text-stone-950">Il Consolidamento del Cambiamento</h3>
                <p className="text-sm text-stone-500 font-light leading-relaxed max-w-2xl mt-1">
                  L'obiettivo finale del percorso è renderti autonomo. Svilupperemo strategie pratiche e strumenti psicologici concreti per affrontare le difficoltà future in modo indipendente, ritrovando un senso profondo di autoefficacia.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SPECIALIZZAZIONI (AREE DI INTERVENTO) */}
      <section id="specializzazioni" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-black">Aree di competenza clinica</span>
          <h2 className="text-3xl md:text-4xl font-serif font-black text-stone-900">Ambiti di Intervento</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servizi.map((s: any, idx: number) => (
            <div 
              key={idx}
              className="bg-white border border-stone-200/60 p-8 rounded-[24px] shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300 text-left"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-color-glow)] border border-[var(--brand-color-strong)] flex items-center justify-center text-[var(--brand-color)]">
                  <Milestone className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-950">{s.titolo}</h3>
                <p className="text-xs text-stone-500 font-light leading-relaxed">{s.descrizione}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📍 LA SEDE CLINICA & MAPPA DI GOOGLE (Visualizzazione organica sopra le prenotazioni) */}
      {/* ========================================================================= */}
      <section id="studio" className="py-24 px-6 max-w-6xl mx-auto border-t border-stone-200/50 relative z-10 animate-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-black">La Sede</span>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-stone-900 tracking-tight">Lo Studio Clinico</h2>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              Le sedute in presenza si svolgono in un ambiente accogliente, silenzioso e strutturato per garantirti la massima serenità e il totale rispetto del segreto professionale e terapeutico.
            </p>
            <div className="space-y-4 pt-2 text-xs font-bold text-stone-600">
              <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-[var(--brand-color)]" /> {fallbackEmail}</p>
              <p className="flex items-start gap-3"><MapPin className="h-4 w-4 text-[var(--brand-color)] shrink-0 mt-0.5" /> <span>{fallbackIndirizzo}</span></p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* Componente mappa responsive nativo */}
            <GoogleMap address={indirizzo || fallbackIndirizzo} />
          </div>

        </div>
      </section>
      {/* ========================================================================= */}

      {/* MODULO PRENOTAZIONI CON DETTAGLI CLINICI ED ETICI */}
      <section id="prenota" className="max-w-4xl mx-auto px-6 pb-24 relative z-10">
        <div className="bg-[#1E3F20] text-stone-100 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-white/10">
          
          {/* Cerchio ornamentale di sfondo */}
          <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-white/5 rounded-full blur-2xl" />

          {inviato ? (
            <div className="py-12 text-center space-y-4 relative z-10">
              <div className="h-14 w-14 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                <Check className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold font-serif text-white">Messaggio consegnato</h4>
              <p className="text-xs text-stone-300 max-w-xs mx-auto">
                La tua richiesta è stata registrata con la massima cura. Ti ricontatterò personalmente per pianificare la nostra prima telefonata conoscitiva.
              </p>
            </div>
          ) : (
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Copy a sinistra */}
              <div className="lg:col-span-5 space-y-4 text-left">
                <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest font-black">Riservatezza & Sicurezza</span>
                <h3 className="text-2xl md:text-3xl font-serif font-black text-white leading-tight">Richiedi un Primo Incontro</h3>
                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  Invia una richiesta preliminare. Sarà mia cura risponderti via mail o telefonicamente per concordare giorno e orario del primo colloquio conoscitivo.
                </p>
                <div className="space-y-2 pt-2 text-[10px] text-stone-300 font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Shield className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span>Conforme alle direttive CNOP</span>
                  </div>
                </div>
              </div>

              {/* Form a destra */}
              <div className="lg:col-span-7 bg-[#0D2511]/60 p-6 rounded-2xl border border-white/10">
                <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold text-stone-300 uppercase tracking-wider mb-1">Nome Completo</label>
                      <input
                        type="text"
                        required
                        placeholder="Es. Mario Rossi"
                        className="w-full bg-[#112d15] border border-white/10 focus:border-[#D4AF37] rounded-xl p-3.5 text-xs text-white placeholder-stone-500 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-stone-300 uppercase tracking-wider mb-1">Recapito preferito</label>
                      <input
                        type="text"
                        required
                        placeholder="Telefono o Email"
                        className="w-full bg-[#112d15] border border-white/10 focus:border-[#D4AF37] rounded-xl p-3.5 text-xs text-white placeholder-stone-500 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-stone-300 uppercase tracking-wider mb-1">Note o Motivo di contatto (Opzionale)</label>
                    <textarea
                      rows={2}
                      placeholder="Scrivi qui brevemente..."
                      className="w-full bg-[#112d15] border border-white/10 focus:border-[#D4AF37] rounded-xl p-3.5 text-xs text-white placeholder-stone-500 transition-all outline-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D4AF37] hover:bg-[#c29c2d] text-stone-900 font-black text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Richiedi Disponibilità</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* ACCORDION FAQ DETRAIBILITÀ & PRESTAZIONI */}
      <section id="faq" className="py-24 px-6 max-w-3xl mx-auto border-t border-stone-200/50 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-black">Informazioni legali e pratiche</span>
          <h2 className="text-3xl font-serif font-black text-stone-900">Domande e Risposte</h2>
        </div>
        
        <div className="space-y-4 text-left">
          {[
            { q: "Quali sono le modalità di pagamento accettate?", a: "Per poter beneficiare della detrazione fiscale del 19%, i pagamenti delle prestazioni sanitarie devono essere effettuati con metodi tracciabili (bancomat, carta di credito, bonifico bancario). I pagamenti in contanti sono comunque ammessi ma non danno diritto alla detrazione fiscale." },
            { q: "La prestazione psicologica necessita di prescrizione?", a: "No. Lo psicologo psicoterapeuta è un professionista sanitario che opera in totale autonomia diagnostica e terapeutica. Non è necessaria alcuna prescrizione del medico di base per iniziare un percorso." },
            { q: "Come posso modificare o annullare un appuntamento?", a: "È possibile riprogrammare o cancellare un appuntamento inviando una comunicazione (via email o telefono) con almeno 24 ore di anticipo, senza alcun addebito." }
          ].map((faq, idx) => (
            <div key={idx} className="border-b border-stone-200/50 pb-4">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-serif font-bold text-lg py-3 hover:text-zinc-950 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-stone-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-stone-500 font-light leading-relaxed text-xs pt-2 pb-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER PREMIUM IN VERDE FORESTA */}
      <footer className="border-t border-stone-800 bg-[#0E1F11] text-stone-300 py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-left">
          
          <div className="space-y-4">
            <span className="font-serif font-bold text-lg text-white">{nomeCliente}</span>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Interventi clinici di psicoterapia erogati ai sensi della L. 56/89 con la massima riservatezza ed etica professionale.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-[10px] text-white uppercase tracking-wider">Studio Clinico</h4>
            <ul className="space-y-3 text-xs text-stone-400 font-light">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#D4AF37]" />
                <a href={`mailto:${fallbackEmail}`} className="hover:text-white transition-colors">{fallbackEmail}</a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{fallbackIndirizzo}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-[10px] text-white uppercase tracking-wider">Social Media</h4>
            <div className="flex items-center space-x-3">
              <a href={fallbackFb} target="_blank" className="p-2.5 bg-white/5 rounded-xl border border-white/10 hover:border-white text-stone-300 hover:text-white transition-all" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href={fallbackIg} target="_blank" className="p-2.5 bg-white/5 rounded-xl border border-white/10 hover:border-white text-stone-300 hover:text-white transition-all" aria-label="Instagram">
                <svg className="h-4 w-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-4 text-xs text-stone-400 font-light">
            <h4 className="font-bold text-[10px] text-white uppercase tracking-wider">Trasparenza Fiscale</h4>
            <p>P.IVA: {fallbackPiva}</p>
            <div className="flex flex-col space-y-1">
              <Link href={`/${slug}/privacy`} className="hover:text-white transition-colors">
                Normativa Privacy GDPR
              </Link>
              <a href="#" className="hover:text-white transition-colors">Consenso Informato Sanitario</a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-[10px] text-stone-500 font-mono tracking-widest">
          © {new Date().getFullYear()} {nomeCliente} • Sviluppato da RM Studio Engine
        </div>
      </footer>

      {/* COOKIE BANNER MINIMAL */}
      <AnimatePresence>
        {showCookies && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-xs bg-[#0E1F11]/95 border border-white/10 p-6 rounded-2xl shadow-xl z-100 backdrop-blur-xl flex flex-col gap-4 text-stone-200 animate-none"
          >
            <p className="text-[11px] text-stone-300 leading-relaxed font-light text-left">
              Ospitiamo solo cookie tecnici per permettere la navigazione fluida e proteggere l'invio dei moduli sanitarie.
            </p>
            <div className="flex items-center justify-end">
              <button 
                onClick={acceptCookies}
                className="bg-[#D4AF37] text-stone-900 text-[10px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-xl hover:brightness-105 transition-all"
              >
                Accetto
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
