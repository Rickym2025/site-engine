// src/app/page.tsx
"use client";

import { useState } from 'react';
import { Shield, Sparkles, CheckCircle, Mail, MapPin, Share2, Image as ImageIcon, Eye, ExternalLink, ArrowLeft, Play } from 'lucide-react';

// IMPORTIAMO I 4 TEMPLATE REALI CON I NUOVI NOMI IN ITALIANO
import Template_il_guardiano from '@/components/Template_il_guardiano';
import Template_l_atelier from '@/components/Template_l_atelier';
import Template_il_chirurgo from '@/components/Template_il_chirurgo';
import Template_l_autorita from '@/components/Template_l_autorita';
import Template_il_creativo from '@/components/Template_il_creativo';
import Template_il_regista from '@/components/Template_il_regista';
import Template_l_empatico from '@/components/Template_l_empatico';
import Template_la_sorgente from '@/components/Template_la_sorgente';
import Template_il_sentiero from '@/components/Template_il_sentiero';

// DATI DI ESEMPIO PER LE DEMO (NEUROMARKETING MOCK)
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

          {/* SELETTORE LIVE DEI 4 TEMPLATE (AGGIORNATI COERENTI) */}
          <div className="flex items-center bg-black border border-zinc-900 p-1.5 rounded-2xl gap-1">
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
          {activeTemplateId === 1 && <Template_il_guardiano data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} />}
          {activeTemplateId === 2 && <Template_l_atelier data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} />}
          {activeTemplateId === 3 && <Template_il_chirurgo data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} />}
          {activeTemplateId === 4 && <Template_l_autorita data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} />}
          {activeTemplateId === 5 && <Template_il_creativo data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} />}
          {activeTemplateId === 6 && <Template_il_regista data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} />}
          {activeTemplateId === 7 && <Template_l_empatico data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} />}
          {activeTemplateId === 8 && <Template_la_sorgente data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} />}
          {activeTemplateId === 9 && <Template_il_sentiero data={previewData} nomeCliente={isDemoMode ? "Azienda Demo S.r.l." : nomeCliente} />}
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

            {/* SELEZIONE TEMPLATE CON MINI-FINESTRE GRAPHIC 3:4 */}
            <div className="space-y-4 pt-4 border-t border-zinc-900">
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">Seleziona Scheletro Layout</label>
              
              <div className="grid grid-cols-1 gap-6">
                
                {/* TEMPLATE 1: IL GUARDIANO */}
                <div 
                  onClick={() => setTemplateId(1)}
                  className={`border-2 p-6 rounded-3xl relative transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                    templateId === 1 ? 'border-cyan-400 bg-cyan-950/10' : 'border-zinc-900 bg-zinc-900/30 hover:border-zinc-800'
                  }`}
                >
                  <div className="space-y-2 flex-grow text-left">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-lg text-white">"Il Guardiano"</h4>
                      {templateId === 1 && <span className="bg-cyan-500 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Selezionato</span>}
                    </div>
                    <p className="text-sm font-bold text-cyan-400">Ideale per: Vigilanza, Sicurezza, Cantieri, Investigazioni</p>
                    <p className="text-xs text-zinc-450 leading-relaxed max-w-lg">
                      Impaginazione autoritaria. Spazio imponente a sinistra per headlines di impatto e immagine di forza a destra. Comunica protezione e controllo immediato con grana satinata.
                    </p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(1); }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white bg-zinc-950 hover:bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-900 transition-all mt-4"
                    >
                      <Eye className="h-4 w-4" /> Esplora Anteprima Live
                    </button>
                  </div>

                  {/* MINI FINESTRA 3:4 VISIVA */}
                  <div className="w-24 h-32 md:w-28 md:h-36 shrink-0 bg-black border border-zinc-800 rounded-xl overflow-hidden p-2 flex flex-col justify-between relative group shadow-lg">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-1">
                      <div className="h-1.5 w-6 bg-cyan-500 rounded"></div>
                      <div className="h-1.5 w-1.5 bg-zinc-800 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-1 flex-grow items-center py-2">
                      <div className="space-y-1">
                        <div className="h-1 w-8 bg-zinc-700 rounded"></div>
                        <div className="h-1 w-6 bg-zinc-800 rounded"></div>
                        <div className="h-2 w-7 bg-cyan-500 rounded-sm mt-1"></div>
                      </div>
                      <div className="h-12 bg-zinc-900 rounded-md border border-zinc-800"></div>
                    </div>
                    <div className="h-1.5 bg-zinc-950 rounded"></div>
                  </div>
                </div>

                {/* TEMPLATE 2: L'ATELIER */}
                <div 
                  onClick={() => setTemplateId(2)}
                  className={`border-2 p-6 rounded-3xl relative transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                    templateId === 2 ? 'border-cyan-400 bg-cyan-950/10' : 'border-zinc-900 bg-zinc-900/30 hover:border-zinc-800'
                  }`}
                >
                  <div className="space-y-2 flex-grow text-left">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-lg text-white">"L'Atelier"</h4>
                      {templateId === 2 && <span className="bg-cyan-500 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Selezionato</span>}
                    </div>
                    <p className="text-sm font-bold text-amber-500">Ideale per: Officine di Lusso, Yacht, Immobiliari, Moda</p>
                    <p className="text-xs text-zinc-450 leading-relaxed max-w-lg">
                      Fascino cinematico. Sfondo video oscurato coperto da texture pixelata e sparkles di polvere dorata. Comunica artigianalità ad alto margine.
                    </p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(2); }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white bg-zinc-950 hover:bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-900 transition-all mt-4"
                    >
                      <Eye className="h-4 w-4" /> Esplora Anteprima Live
                    </button>
                  </div>

                  {/* MINI FINESTRA 3:4 VISIVA */}
                  <div className="w-24 h-32 md:w-28 md:h-36 shrink-0 bg-black border border-zinc-800 rounded-xl overflow-hidden p-2 flex flex-col justify-between relative group shadow-lg">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-1 relative z-10">
                      <div className="h-1.5 w-6 bg-amber-500 rounded"></div>
                    </div>
                    <div className="flex flex-col justify-center items-center flex-grow py-2 space-y-1 relative z-10">
                      <div className="h-1 w-10 bg-zinc-400 rounded"></div>
                      <div className="h-1 w-8 bg-zinc-500 rounded"></div>
                      <div className="h-2 w-6 bg-amber-500 rounded-sm mt-1"></div>
                    </div>
                    <div className="h-1.5 bg-zinc-950 rounded relative z-10"></div>
                  </div>
                </div>

                {/* TEMPLATE 3: IL CHIRURGO */}
                <div 
                  onClick={() => setTemplateId(3)}
                  className={`border-2 p-6 rounded-3xl relative transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                    templateId === 3 ? 'border-cyan-400 bg-cyan-950/10' : 'border-zinc-900 bg-zinc-900/30 hover:border-zinc-800'
                  }`}
                >
                  <div className="space-y-2 flex-grow text-left">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-lg text-white">"Il Chirurgo"</h4>
                      {templateId === 3 && <span className="bg-cyan-500 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Selezionato</span>}
                    </div>
                    <p className="text-sm font-bold text-blue-500">Ideale per: Studi Medici, Pronto Intervento, Avvocati d'Urgenza</p>
                    <p className="text-xs text-zinc-450 leading-relaxed max-w-lg">
                      Sfondo bianco/beige chiaro pastello asettico con griglia a punti. Riduce l'attrito decisionale posizionando il modulo di contatto sopra la piega.
                    </p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(3); }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white bg-zinc-950 hover:bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-900 transition-all mt-4"
                    >
                      <Eye className="h-4 w-4" /> Esplora Anteprima Live
                    </button>
                  </div>

                  {/* MINI FINESTRA 3:4 VISIVA */}
                  <div className="w-24 h-32 md:w-28 md:h-36 shrink-0 bg-white border border-zinc-200 rounded-xl overflow-hidden p-2 flex flex-col justify-between relative group shadow-lg">
                    <div className="flex items-center justify-between border-b border-zinc-150 pb-1">
                      <div className="h-1.5 w-6 bg-blue-500 rounded"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-1 flex-grow items-center py-2">
                      <div className="space-y-1">
                        <div className="h-1.5 w-8 bg-zinc-300 rounded"></div>
                        <div className="h-1 w-6 bg-zinc-200 rounded"></div>
                      </div>
                      <div className="h-14 bg-zinc-50 border border-zinc-150 rounded p-1 space-y-1 flex flex-col justify-center">
                        <div className="h-1 bg-zinc-200 rounded"></div>
                        <div className="h-1 bg-zinc-200 rounded"></div>
                        <div className="h-1.5 bg-blue-500 rounded-sm"></div>
                      </div>
                    </div>
                    <div className="h-1.5 bg-zinc-100 rounded"></div>
                  </div>
                </div>

                {/* TEMPLATE 4: L'AUTORITÀ */}
                <div 
                  onClick={() => setTemplateId(4)}
                  className={`border-2 p-6 rounded-3xl relative transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                    templateId === 4 ? 'border-cyan-400 bg-cyan-950/10' : 'border-zinc-900 bg-zinc-900/30 hover:border-zinc-800'
                  }`}
                >
                  <div className="space-y-2 flex-grow text-left">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-lg text-white">"L'Autorità"</h4>
                      {templateId === 4 && <span className="bg-cyan-500 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Selezionato</span>}
                    </div>
                    <p className="text-sm font-bold text-emerald-500">Ideale per: Consulenti, Agenzie, Scuole, Studi Legali Strutturati</p>
                    <p className="text-xs text-zinc-450 leading-relaxed max-w-lg">
                      La struttura amata da Google. Sfondo blu notte-indaco con effetto luce text-shimmer metallico sui titoli e Spotlight al tocco sulle card dei servizi.
                    </p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(4); }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white bg-zinc-950 hover:bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-900 transition-all mt-4"
                    >
                      <Eye className="h-4 w-4" /> Esplora Anteprima Live
                    </button>
                  </div>                  

                  {/* MINI FINESTRA 3:4 VISIVA */}
                  <div className="w-24 h-32 md:w-28 md:h-36 shrink-0 bg-black border border-zinc-800 rounded-xl overflow-hidden p-2 flex flex-col justify-between relative group shadow-lg space-y-1">
                    <div className="border-b border-zinc-900 pb-1">
                      <div className="h-1.5 w-6 bg-emerald-500 rounded"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-0.5 py-0.5">
                      <div className="h-3 bg-zinc-900 rounded-sm"></div>
                      <div className="h-3 bg-zinc-900 rounded-sm"></div>
                      <div className="h-3 bg-zinc-900 rounded-sm"></div>
                    </div>
                    <div className="space-y-1 flex-grow">
                      <div className="flex gap-1 items-center">
                        <div className="h-3 w-5 bg-zinc-800 rounded-sm"></div>
                        <div className="h-1 w-6 bg-zinc-700 rounded-sm"></div>
                      </div>
                    </div>
                    <div className="h-1.5 bg-zinc-950 rounded"></div>
                  </div>
                </div>

                {/* TEMPLATE 5: IL CREATIVO */}
                  <div 
                    onClick={() => setTemplateId(5)}
                    className={`border-2 p-6 rounded-3xl relative transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                      templateId === 5 ? 'border-cyan-400 bg-cyan-950/10' : 'border-zinc-900 bg-zinc-900/30 hover:border-zinc-800'
                    }`}
                  >
                    <div className="space-y-2 flex-grow text-left">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-lg text-white">"Il Creativo"</h4>
                        {templateId === 5 && <span className="bg-cyan-500 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Selezionato</span>}
                      </div>
                      <p className="text-sm font-bold text-stone-400">Ideale per: Architetti, Designer, Artisti, Prodotti Biologici, Cosmetica</p>
                      <p className="text-xs text-zinc-450 leading-relaxed max-w-lg">
                        Layout asimmetrico "Bento Grid". Sfondo organico color carta chiaro con accenti verde salvia e nuvole pastello. Costringe il cervello a scansionare attivamente il sito per memorizzare i servizi.
                      </p>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleViewDemo(5); }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white bg-zinc-950 hover:bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-900 transition-all mt-4"
                      >
                        <Eye className="h-4 w-4" /> Esplora Anteprima Live
                      </button>
                    </div>
  
                    {/* MINI FINESTRA 3:4 VISIVA ASIMMETRICA BENTO */}
                    <div className="w-24 h-32 md:w-28 md:h-36 shrink-0 bg-[#FAF9F5] border border-zinc-200 rounded-xl overflow-hidden p-2 flex flex-col justify-between relative group shadow-lg gap-1">
                      <div className="border-b border-zinc-150 pb-0.5">
                        <div className="h-1.5 w-6 bg-[#5F6F52] rounded"></div>
                      </div>
                      {/* Rappresentazione Bento Grid asimmetrica */}
                      <div className="grid grid-cols-3 gap-1 flex-grow">
                        <div className="col-span-2 row-span-2 bg-[#E6E4DC] rounded-md"></div>
                        <div className="bg-[#E6E4DC]/50 rounded-md"></div>
                        <div className="bg-[#5F6F52] rounded-md"></div>
                        <div className="col-span-2 bg-[#E6E4DC]/50 rounded-md"></div>
                      </div>
                      <div className="h-1 bg-zinc-150 rounded"></div>
                    </div>
                  </div>

                  {/* TEMPLATE 6: IL REGISTA */}
                  <div 
                    onClick={() => setTemplateId(6)}
                    className={`border-2 p-6 rounded-3xl relative transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                      templateId === 6 ? 'border-cyan-400 bg-cyan-950/10' : 'border-zinc-900 bg-zinc-900/30 hover:border-zinc-800'
                    }`}
                  >
                    <div className="space-y-2 flex-grow text-left">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-lg text-white">"Il Regista"</h4>
                        {templateId === 6 && <span className="bg-cyan-500 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Selezionato</span>}
                      </div>
                      <p className="text-sm font-bold text-purple-400">Ideale per: Video Productions, Palestre, Centri Estetici, Monoprodotto, SaaS</p>
                      <p className="text-xs text-zinc-450 leading-relaxed max-w-lg">
                        Layout cinetico a forte impatto. Presenta un Video Player interattivo sopra la piega, un Marquee infinito di testo scorrevole in background e blocchi alternati alimentati da clip B-Roll in loop automatico.
                      </p>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleViewDemo(6); }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white bg-zinc-950 hover:bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-900 transition-all mt-4"
                      >
                        <Eye className="h-4 w-4" /> Esplora Anteprima Live
                      </button>
                    </div>
  
                    {/* MINI FINESTRA 3:4 VISIVA CINEMATICA VIDEO */}
                    <div className="w-24 h-32 md:w-28 md:h-36 shrink-0 bg-[#09090E] border border-zinc-800 rounded-xl overflow-hidden p-2 flex flex-col justify-between relative group shadow-lg gap-1">
                      <div className="border-b border-zinc-900 pb-0.5">
                        <div className="h-1.5 w-6 bg-purple-500 rounded"></div>
                      </div>
                      {/* Rappresentazione Video Player e Marquee */}
                      <div className="flex-grow flex flex-col justify-center items-center relative space-y-1">
                        <div className="h-12 w-full bg-zinc-900 border border-zinc-800 rounded-md flex items-center justify-center relative">
                          <Play className="h-3 w-3 text-purple-500 fill-purple-500" />
                        </div>
                        <div className="h-1 w-full bg-zinc-900 rounded"></div>
                      </div>
                      <div className="h-1.5 bg-zinc-950 rounded"></div>
                    </div>
                  </div>

                  {/* TEMPLATE 7: L'EMPATICO */}
                  <div 
                    onClick={() => setTemplateId(7)}
                    className={`border-2 p-6 rounded-3xl relative transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                      templateId === 7 ? 'border-cyan-400 bg-cyan-950/10' : 'border-zinc-900 bg-zinc-900/30 hover:border-zinc-800'
                    }`}
                  >
                    <div className="space-y-2 flex-grow text-left">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-lg text-white">"L'Empatico"</h4>
                        {templateId === 7 && <span className="bg-cyan-500 text-black text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">Selezionato</span>}
                      </div>
                      <p className="text-sm font-bold text-[#8F9779]">Ideale per: Psicologi, Psicoterapeuti, Coach, Consulenti del Benessere</p>
                      <p className="text-xs text-zinc-450 leading-relaxed max-w-lg">
                        Tonalità calde terra e verde salvia. Font graziato serif che comunica ascolto, etica e accoglienza. Struttura basata sulla riduzione delle barriere d'ingresso del paziente e trigger sulla detraibilità fiscale.
                      </p>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleViewDemo(7); }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white bg-zinc-950 hover:bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-900 transition-all mt-4"
                      >
                        <Eye className="h-4 w-4" /> Esplora Anteprima Live
                      </button>
                    </div>
                  
                    {/* MINI FINESTRA 3:4 VISIVA */}
                    <div className="w-24 h-32 md:w-28 md:h-36 shrink-0 bg-[#FAF9F5] border border-zinc-200 rounded-xl overflow-hidden p-2 flex flex-col justify-between relative group shadow-lg gap-1">
                      <div className="border-b border-zinc-150 pb-0.5">
                        <div className="h-1.5 w-6 bg-[#5F6F52] rounded"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-1 flex-grow items-center py-2">
                        <div className="space-y-1">
                          <div className="h-1 w-8 bg-zinc-350 rounded"></div>
                          <div className="h-1 w-6 bg-zinc-400 rounded"></div>
                        </div>
                        <div className="h-12 bg-zinc-200/50 rounded-md border border-zinc-150"></div>
                      </div>
                      <div className="h-1.5 bg-zinc-150 rounded"></div>
                    </div>
                  </div>


                {/* TEMPLATE 8: LA SORGENTE */}
                  <div 
                    onClick={() => setTemplateId(8)}
                    className={`border-2 p-6 rounded-3xl relative transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                      templateId === 8 ? 'border-cyan-400 bg-cyan-950/10' : 'border-zinc-900 bg-zinc-900/30 hover:border-zinc-800'
                    }`}
                  >
                    <div className="space-y-2 flex-grow text-left">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-lg text-white">"La Sorgente"</h4>
                        {templateId === 8 && <span className="bg-cyan-500 text-black text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">Selezionato</span>}
                      </div>
                      <p className="text-sm font-bold text-[#7DD3FC]">Ideale per: Studi Medici Strutturati, Psicologi ad alto posizionamento, Centri di Ricerca</p>
                      <p className="text-xs text-zinc-450 leading-relaxed max-w-lg">
                        Stile Nordic Zen con spaziatura molto ampia per dare "respiro". Struttura a schermo diviso (Split-Screen) ad alto impatto grafico e un modulo di autovalutazione del paziente interattivo integrato nella pagina.
                      </p>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleViewDemo(8); }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white bg-zinc-950 hover:bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-900 transition-all mt-4"
                      >
                        <Eye className="h-4 w-4" /> Esplora Anteprima Live
                      </button>
                    </div>
                  
                    {/* MINI FINESTRA 3:4 VISIVA SPLIT */}
                    <div className="w-24 h-32 md:w-28 md:h-36 shrink-0 bg-[#F8F9FA] border border-zinc-200 rounded-xl overflow-hidden p-2 flex flex-col justify-between relative group shadow-lg gap-1">
                      <div className="border-b border-zinc-150 pb-0.5">
                        <div className="h-1.5 w-6 bg-slate-900 rounded"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-1 flex-grow items-stretch py-1">
                        <div className="space-y-1 flex flex-col justify-center">
                          <div className="h-1 w-8 bg-slate-400 rounded"></div>
                          <div className="h-1.5 w-7 bg-slate-900 rounded-sm"></div>
                        </div>
                        <div className="bg-slate-300 rounded-md border border-zinc-200"></div>
                      </div>
                      <div className="h-1.5 bg-zinc-150 rounded"></div>
                    </div>
                  </div>
                
                  {/* TEMPLATE 9: IL SENTIERO */}
                  <div 
                    onClick={() => setTemplateId(9)}
                    className={`border-2 p-6 rounded-3xl relative transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                      templateId === 9 ? 'border-cyan-400 bg-cyan-950/10' : 'border-zinc-900 bg-zinc-900/30 hover:border-zinc-800'
                    }`}
                  >
                    <div className="space-y-2 flex-grow text-left">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-lg text-white">"Il Sentiero"</h4>
                        {templateId === 9 && <span className="bg-cyan-500 text-black text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">Selezionato</span>}
                      </div>
                      <p className="text-sm font-bold text-[#D4AF37]">Ideale per: Psicoterapeuti, Centri di Cura, Cliniche di Salute Mentale ad alto valore</p>
                      <p className="text-xs text-zinc-450 leading-relaxed max-w-lg">
                        Struttura cinematografica con immagine Hero a tutto schermo e pannello in vetro satinato. Integra un'elegante timeline verticale passo-passo che illustra il percorso terapeutico per guidare visivamente il paziente.
                      </p>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleViewDemo(9); }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white bg-zinc-950 hover:bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-900 transition-all mt-4"
                      >
                        <Eye className="h-4 w-4" /> Esplora Anteprima Live
                      </button>
                    </div>
                  
                    {/* MINI FINESTRA 3:4 VISIVA FULL-BLEED */}
                    <div className="w-24 h-32 md:w-28 md:h-36 shrink-0 bg-stone-900 border border-zinc-800 rounded-xl overflow-hidden p-2 flex flex-col justify-between relative group shadow-lg gap-1">
                      {/* Rappresentazione Hero a tutto schermo con box centrale */}
                      <div className="absolute inset-0 bg-[#1E3F20]/40 z-0 flex items-center justify-center p-2">
                        <div className="bg-black/50 border border-white/10 w-full h-16 rounded-md flex flex-col justify-center items-center gap-1">
                          <div className="h-1 w-10 bg-white rounded"></div>
                          <div className="h-1 w-6 bg-white/55 rounded"></div>
                        </div>
                      </div>
                      <div className="h-1.5 bg-[#D4AF37] rounded relative z-10 w-4"></div>
                      <div className="h-1 bg-zinc-150 rounded relative z-10 w-full"></div>
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
