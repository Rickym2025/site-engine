// src/app/page.tsx
"use client";

import { useState } from 'react';
import { Shield, Sparkles, CheckCircle, Mail, MapPin, Share2, Image as ImageIcon, Eye, Layout, ExternalLink, ArrowLeft, ArrowLeftCircle } from 'lucide-react';

// IMPORTIAMO I 4 TEMPLATE REALI
import TemplateHeroImage from '@/components/TemplateHeroImage';
import TemplateHeroVideo from '@/components/TemplateHeroVideo';
import TemplateBooking from '@/components/TemplateBooking';
import TemplateSEO from '@/components/TemplateSEO';

// DATI DI ESEMPIO GENERICI PER LE DEMO PRE-GENERAZIONE (NEUROMARKETING MOCK)
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
  brand_color: "#06B6D4", // Colore ciano neon di default
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
  const [isDemoMode, setIsDemoMode] = useState(false); // Traccia se sta guardando una demo fittizia

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

  // AVVIA LA PREVIEW DI UN TEMPLATE CON I DATI DI ESEMPIO
  const handleViewDemo = (tId: number) => {
    // Configura i colori specifici per rendere le demo stupende
    let demoColor = '#06B6D4'; // T1: Ciano
    let demoVideo = '';
    if (tId === 2) {
      demoColor = '#D97706'; // T2: Oro caldo
      demoVideo = 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-drifting-at-night-42217-large.mp4';
    }
    if (tId === 3) demoColor = '#2563EB'; // T3: Blu medico/professionale
    if (tId === 4) demoColor = '#10B981'; // T4: Smeraldo SEO

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

  // QUANDO L'UTENTE SELEZIONA IL TEMPLATE DALLA PREVIEW
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
        headers: {
          'Content-Type': 'application/json',
        },
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

      if (!response.ok) {
        throw new Error('Errore durante la generazione del sito.');
      }

      const rawData = await response.json();
      const siteData = Array.isArray(rawData) ? rawData[0]?.site_data : rawData?.site_data;

      if (!siteData) {
        throw new Error('I dati restituiti da n8n sono incompleti.');
      }

      setPreviewData(siteData);
      setActiveTemplateId(templateId);
      setIsDemoMode(false); // Questa è una preview REALE con i suoi dati
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
      <div className="min-h-screen bg-black flex flex-col">
        
        {/* BARRA DI CONTROLLO SANDBOX */}
        <div className="bg-zinc-950/90 border-b border-zinc-900 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-100 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsPreviewing(false)}
              className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 px-4 py-2.5 rounded-xl border border-zinc-800 transition-all font-mono"
            >
              <ArrowLeft className="h-4 w-4" /> Torna al Modulo
            </button>
            <div className="h-4 w-[1px] bg-zinc-800 hidden md:block"></div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">
                {isDemoMode ? "Sfoglia i Template di Esempio" : "Anteprima dei tuoi Dati"}
              </p>
              <p className="text-[10px] font-mono text-zinc-500">
                {isDemoMode ? "Stai guardando una demo con dati fittizi" : `Sito generato per: ${nomeCliente}`}
              </p>
            </div>
          </div>

          {/* SELETTORE LIVE DEI 4 TEMPLATE */}
          <div className="flex items-center bg-black border border-zinc-900 p-1.5 rounded-2xl gap-1">
            {[
              { id: 1, label: 'T1: Hero Image' },
              { id: 2, label: 'T2: Hero Video' },
              { id: 3, label: 'T3: Direct Lead' },
              { id: 4, label: 'T4: SEO Approved' },
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
                className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
                  activeTemplateId === t.id 
                    ? 'bg-cyan-500 text-black font-extrabold shadow-lg' 
                    : 'text-zinc-450 hover:text-white hover:bg-zinc-900/50'
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
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/15"
            >
              <span>Usa questo Layout</span>
              <CheckCircle className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => window.open(`/${slug.toLowerCase().replace(/[^a-z0-9-_]/g, '-')}`, '_blank')}
              className="bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-800 hover:border-zinc-700 font-extrabold text-xs px-5 py-3 rounded-xl flex items-center gap-2 transition-all"
            >
              <span>Apri Sito Ufficiale</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* CONTAINER DINAMICO */}
        <div className="flex-grow">
          {activeTemplateId === 1 && <TemplateHeroImage data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} />}
          {activeTemplateId === 2 && <TemplateHeroVideo data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} />}
          {activeTemplateId === 3 && <TemplateBooking data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} />}
          {activeTemplateId === 4 && <TemplateSEO data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} />}
        </div>

      </div>
    );
  }

  // SCHERMATA DEL FORM GENERATORE TRADIZIONALE
  return (
    <main className="min-h-screen bg-black text-white font-sans flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      
      {/* Header */}
      <header className="border-b border-zinc-900 py-6 px-8 max-w-6xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="h-7 w-7 text-cyan-400" />
          <span className="font-black text-lg tracking-widest uppercase">SiteEngine <span className="text-cyan-400">AI</span></span>
        </div>
        <span className="text-xs font-mono text-zinc-500">RM Studio Configurator</span>
      </header>

      {/* Main Panel */}
      <section className="max-w-4xl w-full mx-auto px-6 py-12 flex-grow flex flex-col justify-center">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Crea la tua Landing Page <span className="text-cyan-400">Pro</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto font-light">
            Inserisci i dati del brand. L'intelligenza artificiale mapperà l'intera struttura di vendita.
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 p-8 md:p-10 rounded-3xl shadow-2xl relative">
          
          {loading && (
            <div className="absolute inset-0 bg-black/95 rounded-3xl z-50 flex flex-col items-center justify-center p-6 text-center">
              <div className="h-12 w-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-6"></div>
              <h2 className="text-xl font-bold mb-2">Generazione dei Contenuti...</h2>
              <p className="text-sm text-zinc-450 max-w-xs font-mono">
                L'IA sta integrando i dati di contatto, i canali social e i trigger cognitivi nel layout prescelto.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* SEZIONE 1: IDENTITÀ BASE */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> 1. Identità & Brand
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Nome Azienda</label>
                  <input
                    type="text"
                    required
                    placeholder="Es: Anni d'Oro Classiche"
                    className="w-full bg-zinc-900 border border-zinc-850 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-600 transition-all outline-none text-sm"
                    value={nomeCliente}
                    onChange={(e) => setNomeCliente(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">URL Logo (Opzionale)</label>
                  <input
                    type="url"
                    placeholder="https://mio-sito.it/logo.png"
                    className="w-full bg-zinc-900 border border-zinc-850 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-600 transition-all outline-none text-sm"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Settore Operativo</label>
                  <input
                    type="text"
                    required
                    placeholder="Es: Restauro e compravendita auto storiche"
                    className="w-full bg-zinc-900 border border-zinc-850 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-600 transition-all outline-none text-sm"
                    value={settore}
                    onChange={(e) => setSettore(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Slug desiderato (URL)</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-zinc-600 font-mono text-sm">/</span>
                    <input
                      type="text"
                      required
                      placeholder="auto-retro"
                      className="w-full bg-zinc-900 border border-zinc-850 focus:border-cyan-400 rounded-xl p-4 pl-8 text-white placeholder-zinc-600 transition-all outline-none font-mono text-sm"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SEZIONE 2: CONTATTI E LOCALIZZAZIONE */}
            <div className="space-y-4 pt-4 border-t border-zinc-900">
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Mail className="h-4 w-4" /> 2. Contatti & Localizzazione
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Email pubblica</label>
                  <input
                    type="email"
                    placeholder="info@mia-azienda.it"
                    className="w-full bg-zinc-900 border border-zinc-850 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-600 transition-all outline-none text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Indirizzo Fisico</label>
                  <div className="relative flex items-center">
                    <MapPin className="absolute left-4 h-4 w-4 text-zinc-600" />
                    <input
                      type="text"
                      placeholder="Es: Via Roma 12, Chioggia (VE)"
                      className="w-full bg-zinc-900 border border-zinc-850 focus:border-cyan-400 rounded-xl p-4 pl-12 text-white placeholder-zinc-600 transition-all outline-none text-sm"
                      value={indirizzo}
                      onChange={(e) => setIndirizzo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SEZIONE 3: CANALI SOCIAL */}
            <div className="space-y-4 pt-4 border-t border-zinc-900">
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Share2 className="h-4 w-4" /> 3. Canali Social (Opzionali)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Link Facebook</label>
                  <input
                    type="url"
                    placeholder="https://facebook.com/mia-pagina"
                    className="w-full bg-zinc-900 border border-zinc-850 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-600 transition-all outline-none text-sm"
                    value={socialFb}
                    onChange={(e) => setSocialFb(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Link Instagram</label>
                  <input
                    type="url"
                    placeholder="https://instagram.com/mio-profilo"
                    className="w-full bg-zinc-900 border border-zinc-850 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-600 transition-all outline-none text-sm"
                    value={socialIg}
                    onChange={(e) => setSocialIg(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* SEZIONE 4: CONTENUTI ED ELEMENTI DISTINTIVI */}
            <div className="space-y-4 pt-4 border-t border-zinc-900">
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> 4. Punti di Forza dell'attività
              </h3>
              <div>
                <textarea
                  required
                  rows={3}
                  placeholder="Es: Restauro con materiali originali, Spedizione in tutta Italia, Garanzia scritta di 24 mesi"
                  className="w-full bg-zinc-900 border border-zinc-850 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-600 transition-all outline-none text-sm leading-relaxed"
                  value={puntiForza}
                  onChange={(e) => setPuntiForza(e.target.value)}
                />
              </div>
            </div>

            {/* SELEZIONE TEMPLATE CON PREVIEW "GUARDA DEMO" (MODULARE PRO) */}
            <div className="space-y-4 pt-4 border-t border-zinc-900">
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">Seleziona Scheletro Layout Iniziale</label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* TEMPLATE 1 */}
                <div className={`border-2 p-6 rounded-2xl relative transition-all ${
                  templateId === 1 ? 'border-cyan-400 bg-cyan-950/5' : 'border-zinc-900 bg-zinc-900/40 hover:border-zinc-800'
                }`}>
                  <h4 className="font-extrabold text-sm mb-1">T1: Hero Image</h4>
                  <p className="text-xs text-zinc-450 leading-relaxed mb-6">
                    Layout con una grande immagine d'impatto affiancata al testo. Perfetto per catturare l'attenzione in settori commerciali tradizionali.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTemplateId(1)}
                      className={`text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
                        templateId === 1 ? 'bg-cyan-500 text-black font-black' : 'bg-zinc-900 hover:bg-zinc-850 text-white'
                      }`}
                    >
                      {templateId === 1 ? 'Selezionato' : 'Seleziona'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleViewDemo(1)}
                      className="text-xs font-bold text-zinc-400 hover:text-white bg-zinc-950 hover:bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-900 flex items-center gap-1.5 transition-all"
                    >
                      <Eye className="h-4 w-4" /> Guarda Demo
                    </button>
                  </div>
                </div>

                {/* TEMPLATE 2 */}
                <div className={`border-2 p-6 rounded-2xl relative transition-all ${
                  templateId === 2 ? 'border-cyan-400 bg-cyan-950/5' : 'border-zinc-900 bg-zinc-900/40 hover:border-zinc-800'
                }`}>
                  <h4 className="font-extrabold text-sm mb-1">T2: Hero Video</h4>
                  <p className="text-xs text-zinc-450 leading-relaxed mb-6">
                    Layout d'atmosfera con video di sfondo in loop coperto da una griglia pixelata. Massima emozione visiva per automotive o lusso.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTemplateId(2)}
                      className={`text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
                        templateId === 2 ? 'bg-cyan-500 text-black font-black' : 'bg-zinc-900 hover:bg-zinc-850 text-white'
                      }`}
                    >
                      {templateId === 2 ? 'Selezionato' : 'Seleziona'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleViewDemo(2)}
                      className="text-xs font-bold text-zinc-400 hover:text-white bg-zinc-950 hover:bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-900 flex items-center gap-1.5 transition-all"
                    >
                      <Eye className="h-4 w-4" /> Guarda Demo
                    </button>
                  </div>
                </div>

                {/* TEMPLATE 3 */}
                <div className={`border-2 p-6 rounded-2xl relative transition-all ${
                  templateId === 3 ? 'border-cyan-400 bg-cyan-950/5' : 'border-zinc-900 bg-zinc-900/40 hover:border-zinc-800'
                }`}>
                  <h4 className="font-extrabold text-sm mb-1">T3: Direct Lead Capture</h4>
                  <p className="text-xs text-zinc-450 leading-relaxed mb-6">
                    Mette in evidenza un modulo interattivo direttamente sopra la piega. Massimizza le conversioni per servizi d'urgenza o studi medici.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTemplateId(3)}
                      className={`text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
                        templateId === 3 ? 'bg-cyan-500 text-black font-black' : 'bg-zinc-900 hover:bg-zinc-850 text-white'
                      }`}
                    >
                      {templateId === 3 ? 'Selezionato' : 'Seleziona'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleViewDemo(3)}
                      className="text-xs font-bold text-zinc-400 hover:text-white bg-zinc-950 hover:bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-900 flex items-center gap-1.5 transition-all"
                    >
                      <Eye className="h-4 w-4" /> Guarda Demo
                    </button>
                  </div>
                </div>

                {/* TEMPLATE 4 */}
                <div className={`border-2 p-6 rounded-2xl relative transition-all ${
                  templateId === 4 ? 'border-cyan-400 bg-cyan-950/5' : 'border-zinc-900 bg-zinc-900/40 hover:border-zinc-800'
                }`}>
                  <h4 className="font-extrabold text-sm mb-1">T4: Google-Approved Layout</h4>
                  <p className="text-xs text-zinc-450 leading-relaxed mb-6">
                    Struttura ad alta indicizzazione con recensioni sopra la piega, sezioni a scorrimento alternato e fisarmonica FAQ.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTemplateId(4)}
                      className={`text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
                        templateId === 4 ? 'bg-cyan-500 text-black font-black' : 'bg-zinc-900 hover:bg-zinc-850 text-white'
                      }`}
                    >
                      {templateId === 4 ? 'Selezionato' : 'Seleziona'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleViewDemo(4)}
                      className="text-xs font-bold text-zinc-400 hover:text-white bg-zinc-950 hover:bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-900 flex items-center gap-1.5 transition-all"
                    >
                      <Eye className="h-4 w-4" /> Guarda Demo
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400 font-mono text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-lg py-5 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-[1.01]"
            >
              <span>Genera Landing Page AI</span>
              <Sparkles className="h-5 w-5" />
            </button>

          </form>
        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-600 font-mono">
        © {new Date().getFullYear()} RM Studio • SiteEngine Pro Generator
      </footer>

    </main>
  );
}
