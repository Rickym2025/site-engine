// src/components/Template_la_sorgente.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Check, Send, Mail, MapPin, ChevronDown, ArrowRight } from 'lucide-react';
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
    // ⚡ Aggiorna questo blocco dei servizi per accettare entrambi i tipi di dato
    servizi: Array<{
      titolo: string;
      descrizione?: string;
      description?: string;
    }>;
    social_proof: string;
    brand_color?: string;
    email?: string;
    indirizzo?: string;
    social_fb?: string;
    social_ig?: string;
    social_linkedin?: string;
    piva?: string;
    foto_profilo?: string;
    galleria?: string[];
    recensioni?: any[]; // (Aggiungi questo se decidi di inserire le recensioni scorrevoli anche qui)
  };
  nomeCliente: string;
  slug: string;
  hasBlog?: boolean;
}
export default function Template_la_sorgente({ data, nomeCliente, slug, hasBlog }: TemplateProps) {
  const { hero, social_proof, brand_color = '#0F172A', email, indirizzo, piva, foto_profilo } = data;
  const servizi = data.servizi || [];
  
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showCookies, setShowCookies] = useState(false);
  const [inviato, setInviato] = useState(false);
  
  // Stato interattivo per il filtro di autovalutazione del paziente
  const [selectedFocus, setSelectedFocus] = useState<number>(0);

  // IMMAGINI DI DEFAULT A TEMA NORDIC/ZEN
  const defaultFotoProfilo = foto_profilo || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop";

  // FALLBACK DIMOSTRATIVI
  const fallbackEmail = email || `contatto@${nomeCliente.toLowerCase().replace(/[^a-z0-9]/g, '')}.it`;
  const fallbackIndirizzo = indirizzo || "Viale Europa 8, Studio di Psicologia Clinica (RO)";
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
    '--brand-color-glow': `${brand_color}08`,
    '--brand-color-strong': `${brand_color}1a`,
  } as React.CSSProperties;

  return (
    <div 
      style={customStyles}
      className="min-h-screen bg-[#F8F9FA] text-slate-800 selection:bg-[var(--brand-color)] selection:text-white font-sans relative overflow-x-hidden text-left"
    >
      
      {/* BACKGROUND MINIMALE NORDIC ZEN CON GRIGLIA A LINEE GRIGIE FINISSIME */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Griglia a linee ortogonali finissime */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
        
        {/* Cerchio di luce fredda azzurra soffusa sullo sfondo */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-sky-200/20 blur-[150px]" />
      </div>

      {/* NAVBAR ULTRA-SLIM */}
      <header className="border-b border-gray-200/50 bg-[#F8F9FA]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-extrabold text-sm tracking-widest uppercase text-slate-900">{nomeCliente}</span>
          
          <nav className="hidden md:flex items-center space-x-8 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <a href="#percorso" className="hover:text-slate-900 transition-colors">Il Percorso</a>
            {/* ⚡ SE IL BLOG È ATTIVO, MOSTRA IL LINK ALLA LISTA ARTICOLI */}
            {hasBlog && (
              <Link href={`/${slug}/blog`} className="hover:text-slate-900 transition-colors">
                Blog
              </Link>
            )}
            <a href="#aree" className="hover:text-slate-900 transition-colors">Aree di Lavoro</a>
            <a href="#studio" className="hover:text-slate-900 transition-colors">Lo Studio</a>
            <a href="#contatto" className="hover:text-slate-900 transition-colors">Contatti</a>
          </nav>
          
          <a href="#contatto" className="border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 text-[10px] font-black uppercase tracking-wider px-5 py-2.5 rounded-none transition-all">
            Inizia Ora
          </a>
        </div>
      </header>

      {/* HERO SECTION IN SPLIT-SCREEN REALE (Elegante e Istituzionale) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)] items-stretch relative z-10 border-b border-gray-200/50">
        
        {/* Parte Sinistra: Copy Clinico ultra-minimale */}
        <div className="flex flex-col justify-center px-6 py-16 md:p-16 lg:p-24 space-y-8 text-left bg-white">
          <div className="inline-flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scienza • Empatia • Riservatezza</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            {hero.headline}
          </h1>

          <p className="text-base md:text-lg text-slate-500 font-light leading-relaxed max-w-lg">
            {hero.subheadline}
          </p>

          <div className="pt-4">
            <a 
              href="#contatto" 
              className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-8 py-4.5 transition-all shadow-md group"
            >
              <span>{hero.cta1}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Parte Destra: Foto a pieno schermo verticale */}
        <div className="relative min-h-[350px] lg:min-h-0 bg-slate-100 overflow-hidden">
          <img 
            src={defaultFotoProfilo} 
            alt={nomeCliente} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/5" />
        </div>

      </section>

      {/* SOCIAL PROOF MINIMALE */}
      <section id="percorso" className="py-20 px-6 max-w-4xl mx-auto text-center relative z-10">
        <Compass className="h-6 w-6 text-slate-400 mx-auto mb-6" />
        <h3 className="text-lg md:text-2xl font-light text-slate-600 leading-relaxed italic max-w-3xl mx-auto">
          "{social_proof}"
        </h3>
      </section>

      {/* SEZIONE RECENSIONI SCORREVOLI INTEGRATA */}
      <ReviewsMarquee recensioni={data.recensioni} brandColor={brand_color} />

      {/* BLOCCO INTERATTIVO "COSA STAI AFFRONTANDO?" */}
      <section id="aree" className="py-24 bg-white border-y border-gray-200/50 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest">Scegli il tuo punto di partenza</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Come impostiamo il lavoro</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Selettore dei Focus a Sinistra */}
            <div className="lg:col-span-5 space-y-3">
              {servizi.map((s: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFocus(idx)}
                  className={`w-full text-left p-6 transition-all border flex items-center justify-between group ${
                    selectedFocus === idx 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                      : 'bg-slate-50 border-gray-150 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="font-bold text-sm tracking-tight">{s.titolo}</span>
                  <ArrowRight className={`h-4 w-4 transition-transform ${selectedFocus === idx ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                </button>
              ))}
            </div>

            {/* Visualizzatore della descrizione a Destra */}
            <div className="lg:col-span-7 bg-slate-50 border border-gray-200/50 p-8 md:p-12 min-h-[250px] flex flex-col justify-between text-left">
              <div className="space-y-4">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Dettaglio Trattamento N. 0{selectedFocus + 1}</span>
                <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {servizi[selectedFocus]?.titolo}
                </h4>
                <p className="text-slate-500 font-light leading-relaxed text-sm">
                  {servizi[selectedFocus]?.descrizione || servizi[selectedFocus]?.description}
                </p>
              </div>
              <div className="pt-8 border-t border-gray-200 mt-6 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400">Sedute individuali e personalizzate</span>
                <a href="#contatto" className="text-xs font-black text-slate-900 uppercase tracking-wider hover:underline flex items-center gap-1.5">
                  Richiedi informazioni <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FORM DI CONTATTO RIGIDO NORDIC */}
      <section id="contatto" className="py-24 px-6 max-w-4xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Informazioni a sinistra */}
          <div className="md:col-span-5 space-y-6 text-left">
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">Prenota una consulenza</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Puoi inviare una richiesta per fissare un primo colloquio conoscitivo, in studio oppure online. Riceverai risposta in tempi brevi con totale riservatezza.
            </p>
            <div className="space-y-4 pt-4 text-xs font-bold text-slate-600">
              <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-slate-400" /> {fallbackEmail}</p>
              <p className="flex items-start gap-3"><MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" /> <span>{fallbackIndirizzo}</span></p>
            </div>
          </div>

          {/* Form a destra */}
          <div className="md:col-span-7 bg-white border border-gray-200/60 p-8 shadow-sm w-full">
            {inviato ? (
              <div className="py-12 text-center space-y-4">
                <Check className="h-10 w-10 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900">Richiesta registrata</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  La richiesta è stata elaborata. Verrai ricontattato via mail o telefono nel minor tempo possibile.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nominativo Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Esempio: Laura Bianchi"
                    className="w-full bg-slate-50 border border-gray-250 focus:border-slate-900 p-3.5 text-slate-800 placeholder-slate-400 transition-all outline-none text-xs rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Recapito Telefonico o Email</label>
                  <input
                    type="text"
                    required
                    placeholder="Esempio: +39 333 000000"
                    className="w-full bg-slate-50 border border-gray-250 focus:border-slate-900 p-3.5 text-slate-800 placeholder-slate-400 transition-all outline-none text-xs rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Tipo di percorso d'interesse</label>
                  <select className="w-full bg-slate-50 border border-gray-250 focus:border-slate-900 p-3.5 text-slate-800 transition-all outline-none text-xs rounded-none cursor-pointer">
                    <option value="studio">Sedute in Studio</option>
                    <option value="online">Sedute Online (Videoconferenza)</option>
                    <option value="consulenza">Consulenza Aziendale / Altro</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-none transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Invia Richiesta</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📍 LA SEDE & MAPPA DI GOOGLE (Stile Clean integrato) */}
      {/* ========================================================================= */}
      <section id="studio" className="py-20 px-6 max-w-6xl mx-auto border-t border-gray-200/50 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-mono text-[color:var(--brand-color)] uppercase tracking-widest font-black">Dove Riceviamo</span>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-slate-900 tracking-tight">Lo Studio Professionale</h2>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Riceviamo i nostri pazienti in un contesto professionale e conforme con i massimi requisiti di igiene, comfort e tutela della privacy.
            </p>
            <div className="space-y-4 pt-4 text-xs font-bold text-slate-600">
              <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-slate-400" /> {fallbackEmail}</p>
              <p className="flex items-start gap-3"><MapPin className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" /> <span>{fallbackIndirizzo}</span></p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* Componente mappa nativo e dinamico */}
            <GoogleMap address={indirizzo || fallbackIndirizzo} />
          </div>

        </div>
      </section>
      {/* ========================================================================= */}

      {/* GALLERIA FOTOGRAFICA CON TEMA CLEAN INTEGRATO */}
      <Gallery galleria={data.galleria} brandColor={brand_color} theme="clean" />

      {/* ACCORDION FAQ FISCALE & CODICE DEONTOLOGICO */}
      <section id="faq" className="py-24 px-6 max-w-3xl mx-auto border-t border-gray-200/50 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Domande Frequenti</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Chiarimenti sul Servizio</h2>
        </div>
        
        <div className="space-y-4 text-left">
          {[
            { q: "Le sedute sono coperte da segreto professionale?", a: "Sì. Ai sensi dell'articolo 11 del Codice Deontologico degli Psicologi Italiani, il professionista è strettamente tenuto al segreto professionale. Nessuna informazione emersa durante le sedute può essere rivelata a terzi senza il consenso scritto del paziente." },
            { q: "Qual è la politica di disdetta degli appuntamenti?", a: "Gli appuntamenti possono essere disdetti o riprogrammati senza alcun addebito fino a 24 ore prima dell'orario stabilito. Le disdette comunicate con un preavviso inferiore potrebbero comportare l'addebito della tariffa della seduta." },
            { q: "È necessaria l'impegnativa del medico curante?", a: "No. Per accedere alle sedute di supporto psicologico o psicoterapia in regime privato non è richiesta alcuna prescrizione o impegnativa da parte del medico di medicina generale." }
          ].map((faq, idx) => (
            <div key={idx} className="border-b border-gray-200/50 pb-4">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-base py-3 hover:text-slate-950 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-slate-500 font-light leading-relaxed text-xs pt-2 pb-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER NORDIC */}
      <footer className="border-t border-gray-200/60 bg-white py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-left">
          
          <div className="space-y-4">
            <span className="font-extrabold text-sm tracking-widest text-slate-900 uppercase">{nomeCliente}</span>
            <p className="text-xs text-slate-450 leading-relaxed font-light">
              Pratiche terapeutiche basate su evidenze scientifiche ed erogate in conformità alle norme di legge e al regolamento GDPR.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-450">Contatti Ufficiali</h4>
            <ul className="space-y-3 text-xs text-slate-500 font-light">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <a href={`mailto:${fallbackEmail}`} className="hover:text-slate-900 transition-colors">{fallbackEmail}</a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{fallbackIndirizzo}</span>
              </li>
            </ul>
          </div>

          {/* ⚡ CENTRALIZZAZIONE SOCIAL SISTEMATICA */}
          <div className="space-y-4">
            <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-450">Seguici</h4>
            <SocialLinks data={data} brandColor={brand_color} />
          </div>

          <div className="space-y-4 text-xs text-slate-450 font-light text-left">
            <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-450">Riferimenti Fiscali</h4>
            <p>P.IVA: {fallbackPiva}</p>
            <div className="flex flex-col space-y-1">
              <Link href={`/${slug}/privacy`} className="hover:text-slate-950 transition-colors">
                Privacy Policy
              </Link>
              {/* ⚡ SE IL BLOG È ATTIVO, MOSTRA IL LINK AL BLOG ANCHE NEL FOOTER */}
              {hasBlog && (
                <Link href={`/${slug}/blog`} className="hover:text-slate-950 transition-colors">
                  Blog
                </Link>
              )}
              <a href="#" className="hover:text-slate-950 transition-colors">Normativa Privacy GDPR</a>
              <a href="#" className="hover:text-slate-950 transition-colors">Note Legali Deontologiche</a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 text-center text-[10px] text-slate-400 font-mono tracking-widest">
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
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-xs bg-white border border-gray-200 p-6 rounded-none shadow-xl z-[100] backdrop-blur-xl flex flex-col gap-4 text-slate-800"
          >
            <p className="text-[11px] text-slate-500 leading-relaxed font-light text-left">
              Utilizziamo solo cookie tecnici per garantire la corretta fluidità della navigazione sul nostro portale.
            </p>
            <div className="flex items-center justify-end">
              <button 
                onClick={acceptCookies}
                className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-none hover:bg-slate-800 transition-all"
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
