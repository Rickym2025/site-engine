// src/app/page.tsx
"use client";

import { useState } from 'react';
import { 
  Shield, Sparkles, CheckCircle, Mail, MapPin, Share2, 
  Image as ImageIcon, Eye, ExternalLink, ArrowLeft, Play, 
  ArrowRight, Landmark, Heart, HeartPulse, Palette, Film, Lock, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// IMPORTIAMO I COMPONENTI DI TUTTI I 9 TEMPLATE REALI
import Template_il_guardiano from '@/components/Template_il_guardiano';
import Template_l_atelier from '@/components/Template_l_atelier';
import Template_il_chirurgo from '@/components/Template_il_chirurgo';
import Template_l_autorita from '@/components/Template_l_autorita';
import Template_il_creativo from '@/components/Template_il_creativo';
import Template_il_regista from '@/components/Template_il_regista';
import Template_l_empatico from '@/components/Template_l_empatico';
import Template_la_sorgente from '@/components/Template_la_sorgente';
import Template_il_sentiero from '@/components/Template_il_sentiero';

// DATI DI ESEMPIO NEUROMARKETING REALI PER LE DEMO LIVE
const mockDemoData = {
  hero: {
    headline: "Soluzioni Professionali Ottimizzate per il Tuo Business",
    subheadline: "Miglioriamo l'efficienza operativa e aumentiamo le tue conversioni con protocolli strategici certificati.",
    cta1: "Richiedi Consulenza Gratuita",
    cta2: "Scopri i Nostri Servizi"
  },
  servizi: [
    { titolo: "Analisi di Processo", descrizione: "Identifichiamo ed eliminiamo i colli di bottiglia per ottimizzare i tuoi flussi operativi." },
    { titolo: "Ingegneria di Vendita", descrizione: "Implementiamo protocolli di conversione ad altissimo rendimento studiati sul tuo target." },
    { titolo: "Monitoraggio e Supporto", descrizione: "Garantiamo continuità e controllo operativo costante con assistenza dedicata." }
  ],
  social_proof: "Già scelto da oltre 450 aziende leader nel settore in tutta Italia.",
  brand_color: "#06B6D4",
  logo_url: "",
  email: "info@azienda-demo.it",
  indirizzo: "Via dell'Innovazione 42, Milano (MI)",
  social_fb: "https://facebook.com",
  social_ig: "https://instagram.com"
};

export default function GeneratorHome() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // STATI DEL PREVIEW SANDBOX
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const [activeTemplateId, setActiveTemplateId] = useState(1);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // STATI DEL FORM
  const [slug, setSlug] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [settore, setSettore] = useState('');
  const [puntiForza, setPuntiForza] = useState('');
  const [templateId, setTemplateId] = useState(1);
  const [logoUrl, setLogoUrl] = useState('');
  const [email, setEmail] = useState('');
  const [indirizzo, setIndirizzo] = useState('');
  const [socialFb, setSocialFb] = useState('');
  const [socialIg, setSocialIg] = useState('');

  const handleViewDemo = (tId: number) => {
    let demoColor = '#06B6D4';
    let demoVideo = '';
    if (tId === 2) {
      demoColor = '#D97706';
      demoVideo = 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-drifting-at-night-42217-large.mp4';
    }
    if (tId === 3) demoColor = '#2563EB';
    if (tId === 4) demoColor = '#10B981';
    if (tId === 7) demoColor = '#5F6F52';
    if (tId === 8) demoColor = '#0F172A';
    if (tId === 9) demoColor = '#1E3F20';

    const customMockData = {
      ...mockDemoData,
      brand_color: demoColor,
      video_bg_url: demoVideo
    };

    setPreviewData(customMockData);
    setActiveTemplateId(tId);
    setIsDemoMode(true);
    setIsPreviewing(true);
  };

  const handleSelectTemplateFromPreview = (tId: number) => {
    setTemplateId(tId);
    setIsPreviewing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-_]/g, '-');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: cleanSlug,
          nome_cliente: nomeCliente,
          template_id: templateId,
          settore: settore,
          punti_forza: puntiForza,
          logo_url: logoUrl,
          email: email,
          indirizzo: indirizzo,
          social_fb: socialFb,
          social_ig: socialIg
        }),
      });

      if (!response.ok) throw new Error('Errore durante la generazione del sito.');

      const rawData = await response.json();
      const siteData = Array.isArray(rawData) ? rawData[0]?.site_data : rawData?.site_data;

      if (!siteData) throw new Error('I dati restituiti da n8n sono incompleti.');

      setPreviewData(siteData);
      setActiveTemplateId(templateId);
      setIsDemoMode(false);
      setIsPreviewing(true);
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Connessione fallita. Assicurati che n8n sia attivo.');
      setLoading(false);
    }
  };

  // SCHERMATA SANDBOX (ANTEPRIMA REALE O DEMO)
  if (isPreviewing && previewData) {
    return (
      <div className="min-h-screen bg-[#030306] flex flex-col">
        
        {/* BARRA DI CONTROLLO SANDBOX GLASSMORPHISM ELEGANTE */}
        <div className="bg-[#09090e]/95 border-b border-zinc-900/60 px-6 py-4 flex flex-col xl:flex-row items-center justify-between gap-4 sticky top-0 z-50 backdrop-blur-xl">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsPreviewing(false)}
              className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-2 bg-zinc-900/80 hover:bg-zinc-800 px-4 py-2.5 rounded-xl border border-zinc-800/60 transition-all font-mono shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" /> Torna al Modulo
            </button>
            <div className="h-5 w-[1px] bg-zinc-800 hidden md:block"></div>
            <div className="text-left">
              <p className="text-sm font-black text-white leading-tight">
                {isDemoMode ? "Sfoglia i Layout di Esempio" : "Anteprima dei tuoi Dati"}
              </p>
              <p className="text-[10px] font-mono text-cyan-400">
                {isDemoMode ? "Stai testando la demo con dati fittizi" : `Sito generato per: ${nomeCliente}`}
              </p>
            </div>
          </div>

          {/* SELETTORE LIVE DEI 9 TEMPLATE (CON SCROLL ORIZZONTALE SE SUPERANO LA LARGHEZZA) */}
          <div className="flex items-center bg-[#050508] border border-zinc-900/80 p-1.5 rounded-2xl gap-1 max-w-full overflow-x-auto no-scrollbar">
            {[
              { id: 1, label: 'Il Guardiano' },
              { id: 2, label: 'L\'Atelier' },
              { id: 3, label: 'Il Chirurgo' },
              { id: 4, label: 'L\'Autorità' },
              { id: 5, label: 'Il Creativo' },
              { id: 6, label: 'Il Regista' },
              { id: 7, label: 'L\'Empatico' },
              { id: 8, label: 'La Sorgente' },
              { id: 9, label: 'Il Sentiero' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  if (isDemoMode) {
                    handleViewDemo(t.id);
                  } else {
                    setActiveTemplateId(t.id);
                  }
                }}
                className={`text-[10px] sm:text-xs font-bold px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTemplateId === t.id 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black shadow-md shadow-cyan-500/10' 
                    : 'text-zinc-450 hover:text-white hover:bg-zinc-900/30'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* CONVERSION ACTION */}
          {isDemoMode ? (
            <button
              onClick={() => handleSelectTemplateFromPreview(activeTemplateId)}
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-black text-xs px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/15"
            >
              <span>Usa questo Layout</span>
              <CheckCircle className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => window.open(`/${slug.toLowerCase().replace(/[^a-z0-9-_]/g, '-')}`, '_blank')}
              className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-800/80 hover:border-zinc-700 font-extrabold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <span>Apri Sito Ufficiale</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* CONTAINER DINAMICO */}
        <div className="flex-grow relative z-10">
          {activeTemplateId === 1 && <Template_il_guardiano data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} slug={isDemoMode ? "azienda-demo" : (slug || "anteprima")} />}
          {activeTemplateId === 2 && <Template_l_atelier data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} slug={isDemoMode ? "azienda-demo" : (slug || "anteprima")} />}
          {activeTemplateId === 3 && <Template_il_chirurgo data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} slug={isDemoMode ? "azienda-demo" : (slug || "anteprima")} />}
          {activeTemplateId === 4 && <Template_l_autorita data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} slug={isDemoMode ? "azienda-demo" : (slug || "anteprima")} />}
          {activeTemplateId === 5 && <Template_il_creativo data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} slug={isDemoMode ? "azienda-demo" : (slug || "anteprima")} />}
          {activeTemplateId === 6 && <Template_il_regista data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} slug={isDemoMode ? "azienda-demo" : (slug || "anteprima")} />}
          {activeTemplateId === 7 && <Template_l_empatico data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} slug={isDemoMode ? "azienda-demo" : (slug || "anteprima")} />}
          {activeTemplateId === 8 && <Template_la_sorgente data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} slug={isDemoMode ? "azienda-demo" : (slug || "anteprima")} />}
          {activeTemplateId === 9 && <Template_il_sentiero data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} slug={isDemoMode ? "azienda-demo" : (slug || "anteprima")} />}
        </div>

      </div>
    );
  }

  // SCHERMATA DEL FORM GENERATORE TRADIZIONALE
  return (
    <main className="min-h-screen bg-[#06060c] text-white font-sans flex flex-col justify-between selection:bg-cyan-500 selection:text-black relative overflow-x-hidden">
      
      {/* 🌈 AURORE GRADIENTI FLUTTUANTI DI SFONDO (ReactBits style) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[130px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-purple-600/10 blur-[150px]" />
        <div className="absolute top-[40%] right-[30%] w-[500px] h-[500px] rounded-full bg-emerald-600/5 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="border-b border-zinc-900/60 bg-[#06060c]/40 backdrop-blur-md py-5 px-8 max-w-6xl mx-auto w-full flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="font-black text-sm tracking-widest uppercase">SiteEngine <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI</span></span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 border border-zinc-800/80 rounded-full px-3 py-1 bg-zinc-950/40">RM Studio Master Platform</span>
      </header>

      {/* Main Panel */}
      <section className="max-w-4xl w-full mx-auto px-6 py-12 flex-grow flex flex-col justify-center relative z-10">
        
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full">
            <Sparkles className="h-4.5 w-4.5 text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-widest">Siti d'Autore Pronti in 24 Ore</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-[1.1] text-white">
            Generatore di Landing Page <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">Ad Alta Conversione</span>
          </h1>
          <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Inserisci i dati del professionista. L'intelligenza artificiale di RM Studio mapperà l'intera struttura di vendita adattando il layout.
          </p>
        </div>

        <div className="bg-[#0b0b11]/90 border border-zinc-900/80 backdrop-blur-xl p-8 md:p-12 rounded-[32px] shadow-2xl relative">
          
          {loading && (
            <div className="absolute inset-0 bg-black/95 rounded-[32px] z-50 flex flex-col items-center justify-center p-6 text-center">
              <div className="h-12 w-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-6"></div>
              <h2 className="text-xl font-bold mb-2">Generazione dei Contenuti...</h2>
              <p className="text-sm text-zinc-400 max-w-xs font-mono">
                L'IA sta integrando i dati di contatto, i canali social e i trigger cognitivi nel layout prescelto.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* SEZIONE 1: IDENTITÀ BASE */}
            <div className="space-y-5">
              <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2.5">
                <ImageIcon className="h-4 w-4" /> 1. Identità & Brand
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-left">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Nome Azienda o Dottore</label>
                  <input
                    type="text"
                    required
                    placeholder="Es: Dott.ssa Valeria Cortese"
                    className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-700 transition-all outline-none text-sm"
                    value={nomeCliente}
                    onChange={(e) => setNomeCliente(e.target.value)}
                  />
                </div>

                <div className="text-left">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">URL Logo (Opzionale)</label>
                  <input
                    type="url"
                    placeholder="https://mio-sito.it/logo.png"
                    className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-700 transition-all outline-none text-sm"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-left">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Settore Operativo</label>
                  <input
                    type="text"
                    required
                    placeholder="Es: Psicologia Clinica e Psicoterapia"
                    className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-700 transition-all outline-none text-sm"
                    value={settore}
                    onChange={(e) => setSettore(e.target.value)}
                  />
                </div>

                <div className="text-left">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Slug desiderato (URL)</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-zinc-650 font-mono text-sm">/</span>
                    <input
                      type="text"
                      required
                      placeholder="valeria-cortese"
                      className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-cyan-400 rounded-xl p-4 pl-8 text-white placeholder-zinc-700 transition-all outline-none font-mono text-sm"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SEZIONE 2: CONTATTI E LOCALIZZAZIONE */}
            <div className="space-y-5 pt-6 border-t border-zinc-900/60">
              <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2.5">
                <Mail className="h-4 w-4" /> 2. Contatti & Localizzazione
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-left">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Email pubblica</label>
                  <input
                    type="email"
                    placeholder="info@mia-azienda.it"
                    className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-700 transition-all outline-none text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="text-left">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Indirizzo Fisico dello Studio</label>
                  <div className="relative flex items-center">
                    <MapPin className="absolute left-4 h-4 w-4 text-zinc-600" />
                    <input
                      type="text"
                      placeholder="Es: Viale delle Industrie 17b, Rovigo (RO)"
                      className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-cyan-400 rounded-xl p-4 pl-12 text-white placeholder-zinc-700 transition-all outline-none text-sm"
                      value={indirizzo}
                      onChange={(e) => setIndirizzo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SEZIONE 3: CANALI SOCIAL */}
            <div className="space-y-5 pt-6 border-t border-zinc-900/60">
              <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2.5">
                <Share2 className="h-4 w-4" /> 3. Canali Social (Opzionali)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-left">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Link Facebook</label>
                  <input
                    type="url"
                    placeholder="https://facebook.com/mia-pagina"
                    className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-700 transition-all outline-none text-sm"
                    value={socialFb}
                    onChange={(e) => setSocialFb(e.target.value)}
                  />
                </div>

                <div className="text-left">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Link Instagram</label>
                  <input
                    type="url"
                    placeholder="https://instagram.com/mio-profilo"
                    className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-700 transition-all outline-none text-sm"
                    value={socialIg}
                    onChange={(e) => setSocialIg(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* SEZIONE 4: CONTENUTI ED ELEMENTI DISTINTIVI */}
            <div className="space-y-5 pt-6 border-t border-zinc-900/60">
              <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2.5">
                <Sparkles className="h-4 w-4" /> 4. Punti di Forza e Metodologia
              </h3>
              <div className="text-left">
                <textarea
                  required
                  rows={3}
                  placeholder="Es: Primo colloquio conoscitivo gratuito, Sedute detraibili fiscalmente, Iscrizione Albo degli Psicologi, Terapia cognitivo-comportamentale focalizzata sul problema"
                  className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-700 transition-all outline-none text-sm leading-relaxed"
                  value={puntiForza}
                  onChange={(e) => setPuntiForza(e.target.value)}
                />
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 🪐 SELEZIONE TEMPLATE PRO: CARD INTERATTIVE STILE UIVERSE ED EDITORIALI */}
            {/* ========================================================================= */}
            <div className="space-y-6 pt-6 border-t border-zinc-900/60">
              <div className="text-left">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Ingegneria di Impaginazione</span>
                <h3 className="text-lg font-black text-white mt-1">Seleziona lo Scheletro del Layout</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. IL GUARDIANO */}
                <div 
                  onClick={() => setTemplateId(1)}
                  className={`border-2 p-5 rounded-2xl relative transition-all duration-300 cursor-pointer flex flex-col justify-between h-[230px] group overflow-hidden ${
                    templateId === 1 ? 'border-cyan-400 bg-cyan-950/5' : 'border-zinc-900 bg-zinc-950/40 hover:border-zinc-800'
                  }`}
                >
                  <div className="text-left z-10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="bg-cyan-500/10 text-cyan-400 text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border border-cyan-500/20 font-black">Vigilanza & Security</span>
                      {templateId === 1 && <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
                    </div>
                    <h4 className="font-extrabold text-sm text-white pt-1">01. Il Guardiano</h4>
                    <p className="text-[10px] text-zinc-500 font-light leading-relaxed">Struttura asimmetrica autoritaria. Sfondo satinato satin, headlines d'impatto a sinistra e immagine imponente a destra.</p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3 mt-4 z-10">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(1); }}
                      className="text-[9px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800"
                    >
                      <Eye className="h-3 w-3" /> Demo Live
                    </button>
                    <span className="text-[9px] font-mono text-zinc-600">Template #1</span>
                  </div>
                </div>

                {/* 2. L'ATELIER */}
                <div 
                  onClick={() => setTemplateId(2)}
                  className={`border-2 p-5 rounded-2xl relative transition-all duration-300 cursor-pointer flex flex-col justify-between h-[230px] group overflow-hidden ${
                    templateId === 2 ? 'border-amber-500 bg-amber-950/5' : 'border-zinc-900 bg-zinc-950/40 hover:border-zinc-800'
                  }`}
                >
                  <div className="text-left z-10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="bg-amber-500/10 text-amber-500 text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border border-amber-500/20 font-black">Lusso & Artigianato</span>
                      {templateId === 2 && <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
                    </div>
                    <h4 className="font-extrabold text-sm text-white pt-1">02. L'Atelier</h4>
                    <p className="text-[10px] text-zinc-500 font-light leading-relaxed">Fascino cinematografico. Texture pixelata dorata sovrapposta a video-background oscurato. Artigianato ad alto margine.</p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3 mt-4 z-10">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(2); }}
                      className="text-[9px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800"
                    >
                      <Eye className="h-3 w-3" /> Demo Live
                    </button>
                    <span className="text-[9px] font-mono text-zinc-600">Template #2</span>
                  </div>
                </div>

                {/* 3. IL CHIRURGO */}
                <div 
                  onClick={() => setTemplateId(3)}
                  className={`border-2 p-5 rounded-2xl relative transition-all duration-300 cursor-pointer flex flex-col justify-between h-[230px] group overflow-hidden ${
                    templateId === 3 ? 'border-blue-500 bg-blue-950/5' : 'border-zinc-900 bg-zinc-950/40 hover:border-zinc-800'
                  }`}
                >
                  <div className="text-left z-10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="bg-blue-500/10 text-blue-400 text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border border-blue-500/20 font-black">Medicina & Urgenze</span>
                      {templateId === 3 && <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />}
                    </div>
                    <h4 className="font-extrabold text-sm text-white pt-1">03. Il Chirurgo</h4>
                    <p className="text-[10px] text-zinc-500 font-light leading-relaxed">Sfondo chiaro pastello asettico con griglia a punti. Modulo di contatto immediato sopra la piega per azzerare l'attrito decisionale.</p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3 mt-4 z-10">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(3); }}
                      className="text-[9px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800"
                    >
                      <Eye className="h-3 w-3" /> Demo Live
                    </button>
                    <span className="text-[9px] font-mono text-zinc-600">Template #3</span>
                  </div>
                </div>

                {/* 4. L'AUTORITÀ */}
                <div 
                  onClick={() => setTemplateId(4)}
                  className={`border-2 p-5 rounded-2xl relative transition-all duration-300 cursor-pointer flex flex-col justify-between h-[230px] group overflow-hidden ${
                    templateId === 4 ? 'border-emerald-500 bg-emerald-950/5' : 'border-zinc-900 bg-zinc-950/40 hover:border-zinc-800'
                  }`}
                >
                  <div className="text-left z-10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="bg-emerald-500/10 text-emerald-400 text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border border-emerald-500/20 font-black">Consulenza & Legale</span>
                      {templateId === 4 && <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
                    </div>
                    <h4 className="font-extrabold text-sm text-white pt-1">04. L'Autorità</h4>
                    <p className="text-[10px] text-zinc-500 font-light leading-relaxed">Google-Friendly strutturato. Sfondo blu notte profondo, Shimmer metallico sui titoli principali ed effetto Spotlight sulle card.</p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3 mt-4 z-10">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(4); }}
                      className="text-[9px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800"
                    >
                      <Eye className="h-3 w-3" /> Demo Live
                    </button>
                    <span className="text-[9px] font-mono text-zinc-600">Template #4</span>
                  </div>
                </div>

                {/* 5. IL CREATIVO */}
                <div 
                  onClick={() => setTemplateId(5)}
                  className={`border-2 p-5 rounded-2xl relative transition-all duration-300 cursor-pointer flex flex-col justify-between h-[230px] group overflow-hidden ${
                    templateId === 5 ? 'border-stone-400 bg-stone-900/5' : 'border-zinc-900 bg-zinc-950/40 hover:border-zinc-800'
                  }`}
                >
                  <div className="text-left z-10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="bg-stone-500/10 text-stone-300 text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border border-stone-500/20 font-black">Design & Architettura</span>
                      {templateId === 5 && <div className="w-2 h-2 rounded-full bg-stone-300 animate-ping" />}
                    </div>
                    <h4 className="font-extrabold text-sm text-white pt-1">05. Il Creativo</h4>
                    <p className="text-[10px] text-zinc-500 font-light leading-relaxed">Layout asimmetrico "Bento Grid". Sfondo organico color carta chiaro con accenti verde salvia e nuvole pastello fluttuanti.</p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3 mt-4 z-10">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(5); }}
                      className="text-[9px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800"
                    >
                      <Eye className="h-3 w-3" /> Demo Live
                    </button>
                    <span className="text-[9px] font-mono text-zinc-600">Template #5</span>
                  </div>
                </div>

                {/* 6. IL REGISTA */}
                <div 
                  onClick={() => setTemplateId(6)}
                  className={`border-2 p-5 rounded-2xl relative transition-all duration-300 cursor-pointer flex flex-col justify-between h-[230px] group overflow-hidden ${
                    templateId === 6 ? 'border-purple-500 bg-purple-950/5' : 'border-zinc-900 bg-zinc-950/40 hover:border-zinc-800'
                  }`}
                >
                  <div className="text-left z-10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="bg-purple-500/10 text-purple-400 text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border border-purple-500/20 font-black">Video & Content Creator</span>
                      {templateId === 6 && <div className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />}
                    </div>
                    <h4 className="font-extrabold text-sm text-white pt-1">06. Il Regista</h4>
                    <p className="text-[10px] text-zinc-500 font-light leading-relaxed">Layout cinetico a forte impatto. Video Player interattivo sopra la piega, Marquee di testo infinito e blocchi in loop B-Roll.</p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3 mt-4 z-10">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(6); }}
                      className="text-[9px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800"
                    >
                      <Eye className="h-3 w-3" /> Demo Live
                    </button>
                    <span className="text-[9px] font-mono text-zinc-600">Template #6</span>
                  </div>
                </div>

                {/* 7. L'EMPATICO */}
                <div 
                  onClick={() => setTemplateId(7)}
                  className={`border-2 p-5 rounded-2xl relative transition-all duration-300 cursor-pointer flex flex-col justify-between h-[230px] group overflow-hidden ${
                    templateId === 7 ? 'border-emerald-600 bg-emerald-950/5' : 'border-zinc-900 bg-zinc-950/40 hover:border-zinc-800'
                  }`}
                >
                  <div className="text-left z-10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="bg-emerald-600/10 text-emerald-500 text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border border-emerald-500/20 font-black">Psicoterapia & Benessere</span>
                      {templateId === 7 && <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
                    </div>
                    <h4 className="font-extrabold text-sm text-white pt-1">07. L'Empatico</h4>
                    <p className="text-[10px] text-zinc-500 font-light leading-relaxed">Tonalità calde terra e verde salvia. Elegante font graziato Serif che comunica ascolto, etica e accoglienza emotiva.</p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3 mt-4 z-10">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(7); }}
                      className="text-[9px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800"
                    >
                      <Eye className="h-3 w-3" /> Demo Live
                    </button>
                    <span className="text-[9px] font-mono text-zinc-600">Template #7</span>
                  </div>
                </div>

                {/* 8. LA SORGENTE */}
                <div 
                  onClick={() => setTemplateId(8)}
                  className={`border-2 p-5 rounded-2xl relative transition-all duration-300 cursor-pointer flex flex-col justify-between h-[230px] group overflow-hidden ${
                    templateId === 8 ? 'border-sky-500 bg-sky-950/5' : 'border-zinc-900 bg-zinc-950/40 hover:border-zinc-800'
                  }`}
                >
                  <div className="text-left z-10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="bg-sky-500/10 text-sky-400 text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border border-sky-500/20 font-black">Nordic Zen & Clinica</span>
                      {templateId === 8 && <div className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />}
                    </div>
                    <h4 className="font-extrabold text-sm text-white pt-1">08. La Sorgente</h4>
                    <p className="text-[10px] text-zinc-500 font-light leading-relaxed">Spaziatura ultra-pulita per dare "respiro". Layout a schermo diviso (Split-Screen) e modulo interattivo di autovalutazione.</p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3 mt-4 z-10">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(8); }}
                      className="text-[9px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800"
                    >
                      <Eye className="h-3 w-3" /> Demo Live
                    </button>
                    <span className="text-[9px] font-mono text-zinc-600">Template #8</span>
                  </div>
                </div>

                {/* 9. IL SENTIERO */}
                <div 
                  onClick={() => setTemplateId(9)}
                  className={`border-2 p-5 rounded-2xl relative transition-all duration-300 cursor-pointer flex flex-col justify-between h-[230px] group overflow-hidden ${
                    templateId === 9 ? 'border-green-700 bg-green-950/5' : 'border-zinc-900 bg-zinc-950/40 hover:border-zinc-800'
                  }`}
                >
                  <div className="text-left z-10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="bg-green-700/10 text-green-500 text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border border-green-700/20 font-black">Forest & Introspezione</span>
                      {templateId === 9 && <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />}
                    </div>
                    <h4 className="font-extrabold text-sm text-white pt-1">09. Il Sentiero</h4>
                    <p className="text-[10px] text-zinc-500 font-light leading-relaxed">Layout cinematografico con Hero a pieno schermo. Integra un'elegante timeline verticale che illustra la crescita terapeutica.</p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3 mt-4 z-10">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(9); }}
                      className="text-[9px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800"
                    >
                      <Eye className="h-3 w-3" /> Demo Live
                    </button>
                    <span className="text-[9px] font-mono text-zinc-600">Template #9</span>
                  </div>
                </div>

              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400 font-mono text-center">{error}</p>
            )}

            {/* BOTTONE PRINCIPALE CON OMBRE PULSANTI (ReactBits style) */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:brightness-110 text-white font-extrabold text-base py-5 rounded-2xl flex items-center justify-center space-x-2.5 transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_rgba(6,182,212,0.4)]"
            >
              <span>Genera Landing Page Professionale</span>
              <Sparkles className="h-5 w-5 text-white" />
            </button>

          </form>
        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900/80 py-6 text-center text-xs text-zinc-600 font-mono relative z-10 bg-[#06060c]/40 backdrop-blur-md">
        © {new Date().getFullYear()} RM Studio • SiteEngine Pro Generator
      </footer>

    </main>
  );
}
