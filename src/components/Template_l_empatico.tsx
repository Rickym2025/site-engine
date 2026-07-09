// src/components/Template_l_empatico.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Compass, Check, Send, Mail, MapPin, ChevronDown, Calendar, Smile, ShieldAlert } from 'lucide-react';
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
    brand_color?: string; // Di default useremo un verde salvia rilassante (#5F6F52)
    email?: string;
    indirizzo?: string;
    social_fb?: string;
    social_ig?: string;
    foto_profilo?: string; // Nuova chiave opzionale per la foto dello psicologo
    piva?: string;
  };
  nomeCliente: string;
  slug: string;
  hasBlog?: boolean;
}

export default function Template_l_empatico({ data, nomeCliente, slug }: TemplateProps) {
  const { hero, social_proof, brand_color = '#5F6F52', email, indirizzo, social_fb, social_ig, foto_profilo, piva } = data;
  const servizi = data.servizi || [];
  
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showCookies, setShowCookies] = useState(false);
  const [inviato, setInviato] = useState(false);

  // IMMAGINI DI DEFAULT A TEMA PSICOLOGIA (Qualora non fornite da Supabase)
  const defaultFotoProfilo = foto_profilo || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop";

  // FALLBACK DIMOSTRATIVI
  const fallbackEmail = email || `studio@${nomeCliente.toLowerCase().replace(/[^a-z0-9]/g, '')}.it`;
  const fallbackIndirizzo = indirizzo || "Via della Pace 15, Studio Professionale (RO)";
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
    '--brand-color-glow': `${brand_color}0d`,
    '--brand-color-strong': `${brand_color}26`,
  } as React.CSSProperties;

  return (
    <div 
      style={customStyles}
      className="min-h-screen bg-[#FAF9F5] text-stone-800 selection:bg-[var(--brand-color)] selection:text-white font-sans relative overflow-x-hidden"
    >
      
      {/* BACKGROUND ORGANICO CON SFUMATURE MORBIDE SAGE-GREEN & SABBIA */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Micro-trama satinata morbida */}
        <div className="absolute inset-0 bg-[radial-gradient(#e6e4dc_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
        
        {/* Cerchi sfumati pastello rilassanti */}
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] rounded-full bg-[#8F9779]/10 blur-[130px]"
        />
        <motion.div
          animate={{ x: [0, -20, 30, 0], y: [0, 20, -30, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#D4C3B3]/20 blur-[140px]"
        />
      </div>

      {/* NAVBAR MINIMALISTA */}
      <header className="border-b border-stone-200/50 bg-[#FAF9F5]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-serif font-bold text-xl tracking-tight text-stone-900">{nomeCliente}</span>
          
          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-wider text-stone-500">
            <a href="#approccio" className="hover:text-stone-900 transition-colors">Il mio Approccio</a>
            <a href="#servizi" className="hover:text-stone-900 transition-colors">Aree di Intervento</a>
              {/* ⚡ SE IL BLOG È ATTIVO, MOSTRA IL LINK ALLA LISTA ARTICOLI */}
              {hasBlog && (
                <Link href={`/${slug}/blog`} className="hover:text-zinc-950 transition-colors">
                  Blog
                </Link>
              )}
            <a href="#contatto" className="hover:text-stone-900 transition-colors">Prenota un Colloquio</a>
            <a href="#faq" className="hover:text-stone-900 transition-colors">FAQ</a>
          </nav>
          
          <a href="#contatto" className="bg-[var(--brand-color)] hover:opacity-90 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full transition-all shadow-sm">
            Scrivimi
          </a>
        </div>
      </header>

      {/* HERO SECTION EMPATICA */}
      <section className="max-w-6xl mx-auto px-6 pt-12 lg:pt-20 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Testo a Sinistra */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 bg-white border border-stone-200/80 px-4 py-1.5 rounded-full shadow-sm">
            <Heart className="h-4 w-4 text-[var(--brand-color)]" />
            <span className="text-[10px] font-mono text-stone-600 uppercase tracking-widest font-black">Uno spazio protetto e senza giudizio</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight leading-[1.15] text-stone-900">
            {hero.headline}
          </h1>

          <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-xl">
            {hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="#contatto" 
              className="bg-[var(--brand-color)] hover:brightness-95 text-white font-bold text-sm px-8 py-4.5 rounded-2xl transition-all text-center shadow-lg shadow-[var(--brand-color-strong)]"
            >
              {hero.cta1}
            </a>
            <a 
              href="#approccio" 
              className="bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-sm px-8 py-4.5 rounded-2xl transition-all text-center"
            >
              {hero.cta2}
            </a>
          </div>
        </div>

        {/* Immagine Personale a Destra (Forma organica e morbida) */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="absolute inset-0 bg-[#E6E4DC]/60 rounded-[45px] transform rotate-3 scale-95 -z-10" />
          <img 
            src={defaultFotoProfilo} 
            alt={nomeCliente} 
            className="w-full max-w-sm h-[420px] md:h-[480px] object-cover rounded-[45px] border border-stone-200/80 shadow-2xl"
          />
        </div>

      </section>

      {/* FRASE D'EMPATIA (SOCIAL PROOF) */}
      <section id="approccio" className="bg-white/50 border-y border-stone-200/40 py-16 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Compass className="h-8 w-8 text-[var(--brand-color)] mx-auto" />
          <p className="text-xl md:text-2xl font-serif font-medium text-stone-800 italic leading-relaxed max-w-3xl mx-auto">
            "{social_proof}"
          </p>
        </div>
      </section>

      {/* AREE DI INTERVENTO (SERVIZI) */}
      <section id="servizi" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-mono text-[var(--brand-color)] uppercase tracking-widest font-black">Come posso aiutarti</span>
          <h2 className="text-3xl md:text-4xl font-serif font-black text-stone-900">Le mie aree di intervento</h2>
          <p className="text-sm text-stone-500 font-light">Percorsi terapeutici personalizzati per ritrovare equilibrio e benessere nella tua vita quotidiana.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servizi.map((servizio: any, idx: number) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="bg-white border border-stone-200/60 p-8 rounded-[32px] transition-all duration-300 shadow-sm hover:shadow-xl text-left"
            >
              <div className="bg-[#FAF9F5] p-3 rounded-2xl w-12 h-12 flex items-center justify-center mb-6 border border-stone-200/30">
                <Smile className="h-6 w-6 text-[var(--brand-color)]" />
              </div>
              
              <h3 className="text-xl font-serif font-bold mb-3 text-stone-900">
                {servizio.titolo}
              </h3>
              
              <p className="text-sm text-stone-500 font-light leading-relaxed">
                {servizio.descrizione}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BLOCCO DI PRENOTAZIONE E PREVENZIONE ATTRITO */}
      <section id="contatto" className="max-w-5xl mx-auto px-6 pb-24 relative z-10">
        <div className="bg-[#FAF9F5] border border-stone-200 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Sinistra: Rassicurazioni, Etica e MAPPA DI GOOGLE */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h3 className="text-2xl md:text-3xl font-serif font-black text-stone-900 leading-tight">Fai il primo passo nel totale rispetto dei tuoi tempi</h3>
            
            {/* 📍 Google Map perfettamente integrata a dimensione ideale */}
            <GoogleMap address={indirizzo || fallbackIndirizzo} />

            <p className="text-sm text-stone-500 font-light leading-relaxed">
              Il primo colloquio conoscitivo serve ad inquadrare la tua situazione, definire i tuoi obiettivi e capire se la mia metodologia di lavoro si adatta alle tue necessità.
            </p>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3 text-xs text-stone-600 font-semibold">
                <Check className="h-4 w-4 text-[var(--brand-color)] shrink-0" />
                <span>Segreto professionale garantito</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-stone-600 font-semibold">
                <Check className="h-4 w-4 text-[var(--brand-color)] shrink-0" />
                <span>In linea con il codice deontologico degli psicologi</span>
              </div>
            </div>
          </div>

          {/* Destra: Modulo soft */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-stone-200/60 shadow-md">
            {inviato ? (
              <div className="py-12 text-center space-y-4">
                <div className="h-14 w-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold text-stone-900">Richiesta inviata con cura</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Grazie per avermi scritto. Leggerò il tuo messaggio e ti ricontatterò personalmente con la massima delicatezza.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-stone-500 uppercase tracking-wider mb-1.5">Il tuo Nome</label>
                    <input
                      type="text"
                      required
                      placeholder="Mario"
                      className="w-full bg-[#FAF9F5] border border-stone-200 focus:border-stone-400 rounded-xl p-3 text-stone-800 placeholder-stone-400 transition-all outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-stone-500 uppercase tracking-wider mb-1.5">Recapito (Tel o Email)</label>
                    <input
                      type="text"
                      required
                      placeholder="mario@email.it"
                      className="w-full bg-[#FAF9F5] border border-stone-200 focus:border-stone-400 rounded-xl p-3 text-stone-800 placeholder-stone-400 transition-all outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-stone-500 uppercase tracking-wider mb-1.5">Lascia un breve messaggio (Opzionale)</label>
                  <textarea
                    rows={3}
                    placeholder="Se preferisci, accenna brevemente al motivo del contatto..."
                    className="w-full bg-[#FAF9F5] border border-stone-200 focus:border-stone-400 rounded-xl p-3 text-stone-800 placeholder-stone-400 transition-all outline-none text-sm leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--brand-color)] hover:brightness-95 text-white font-bold text-sm py-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md"
                >
                  <span>Invia messaggio</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ACCORDION FAQ E DETRAIBILITÀ FISCALE */}
      <section id="faq" className="py-24 px-6 max-w-3xl mx-auto border-t border-stone-200/50 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-[10px] font-mono text-[var(--brand-color)] uppercase tracking-widest font-black">Informazioni pratiche</span>
          <h2 className="text-3xl font-serif font-black text-stone-900">Risposte alle tue domande</h2>
        </div>
        
        <div className="space-y-4 text-left">
          {[
            { q: "Le sedute sono detraibili fiscalmente?", a: "Sì, assolutamente. In Italia le prestazioni psicologiche e psicoterapeutiche sono classificate come prestazioni sanitarie e sono quindi detraibili dalle tasse al 19% nella dichiarazione dei redditi (modello 730)." },
            { q: "Come si svolge il primo incontro?", a: "Il primo colloquio è principalmente conoscitivo e dura circa 50 minuti. Avremo modo di parlare delle motivazioni che ti spingono a cercare un supporto e capiremo insieme se strutturare un percorso terapeutico." },
            { q: "Si effettuano anche sedute online?", a: "Sì. Molti percorsi vengono svolti interamente online tramite piattaforme protette e conformi al regolamento GDPR sulla privacy, garantendo lo stesso livello di riservatezza e professionalità dello studio." }
          ].map((faq, idx) => (
            <div key={idx} className="border-b border-stone-200/50 pb-4">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-serif font-bold text-lg py-3 hover:text-stone-950 transition-colors"
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
                    <p className="text-stone-500 font-light leading-relaxed text-sm pt-2 pb-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER ISTITUZIONALE */}
      <footer className="border-t border-stone-200/50 bg-white py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4 text-left">
            <span className="font-serif font-bold text-lg text-stone-900">{nomeCliente}</span>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Prestazioni sanitarie protette ed erogate in conformità alle direttive dell'Ordine Nazionale degli Psicologi.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-400">Studio & Contatti</h4>
            <ul className="space-y-3 text-xs text-stone-500 font-light">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-stone-400" />
                <a href={`mailto:${fallbackEmail}`} className="hover:text-stone-900 transition-colors">{fallbackEmail}</a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-stone-400 shrink-0 mt-0.5" />
                <span>{fallbackIndirizzo}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 text-left">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-400">Seguici</h4>
            <div className="flex items-center space-x-3">
              <a href={fallbackFb} target="_blank" className="p-3 bg-stone-50 rounded-full border border-stone-200 hover:border-stone-400 text-stone-400 hover:text-stone-900 transition-all" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href={fallbackIg} target="_blank" className="p-3 bg-stone-50 rounded-full border border-stone-200 hover:border-stone-400 text-stone-400 hover:text-stone-900 transition-all" aria-label="Instagram">
                <svg className="h-4 w-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-4 text-xs text-stone-500 font-light text-left">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-400">Normative</h4>
            <p>Iscrizione Albo Psicologi N. [Inserire Numero]</p>
            <p>P.IVA: {fallbackPiva}</p>
            <div className="flex flex-col space-y-2">
              <Link href={`/${slug}/privacy`} className="hover:text-stone-950 transition-colors">
                Privacy Policy
              </Link>
                  {/* ⚡ SE IL BLOG È ATTIVO, MOSTRA IL LINK AL BLOG ANCHE NEL FOOTER */}
              {hasBlog && (
                <Link href={`/${slug}/blog`} className="hover:text-zinc-950 transition-colors">
                  Blog
                </Link>
              )}
              <a href="#" className="hover:text-stone-950 transition-colors">Deontologia Sanitaria</a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-stone-100 text-center text-xs text-stone-400 font-mono tracking-widest">
          © {new Date().getFullYear()} {nomeCliente} • RM Studio Web Engine
        </div>
      </footer>

      {/* COOKIE BANNER */}
      <AnimatePresence>
        {showCookies && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-white/95 border border-stone-200 p-6 rounded-3xl shadow-2xl z-100 backdrop-blur-xl flex flex-col gap-4 text-zinc-800 animate-none"
          >
            <p className="text-xs text-stone-600 leading-relaxed font-light text-left">
              Questo sito web utilizza solo cookie tecnici necessari per il corretto funzionamento. Cliccando su "Accetto", acconsenti al loro utilizzo.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button 
                onClick={acceptCookies}
                className="bg-stone-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-stone-800 transition-all flex items-center space-x-2"
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
