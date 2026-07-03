// src/app/page.tsx
"use client";

import { useState } from 'react';
import { Shield, Sparkles, CheckCircle, Mail, MapPin, Share2, Image as ImageIcon, Eye, Layout, ExternalLink, ArrowLeft } from 'lucide-react';

// IMPORTIAMO I 4 TEMPLATE REALI PER L'ANTEPRIMA ISTANTANEA
import TemplateHeroImage from '@/components/TemplateHeroImage';
import TemplateHeroVideo from '@/components/TemplateHeroVideo';
import TemplateBooking from '@/components/TemplateBooking';
import TemplateSEO from '@/components/TemplateSEO';

export default function GeneratorHome() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // STATI DEL PREVIEW SANDBOX (ZERO CLUTTER ENGINE)
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const [activeTemplateId, setActiveTemplateId] = useState(1);

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

      // Riceviamo i dati reali salvati da n8n
      const rawData = await response.json();
      
      // Estrazione sicura dei dati (gestisce sia oggetti singoli che array di Supabase)
      const siteData = Array.isArray(rawData) ? rawData[0]?.site_data : rawData?.site_data;

      if (!siteData) {
        throw new Error('I dati restituiti da n8n sono incompleti.');
      }

      // Salviamo i dati generati in memoria per l'anteprima istantanea
      setPreviewData(siteData);
      setActiveTemplateId(templateId);
      setIsPreviewing(true); // ATTIVA IL SANDBOX DI ANTEPRIMA
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Connessione fallita. Assicurati che n8n sia attivo.');
      setLoading(false);
    }
  };

  // SE IL LEAD È IN MODALITÀ ANTEPRIMA, RENDERIZZIAMO LA SANDBOX
  if (isPreviewing && previewData) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        
        {/* BARRA DI CONTROLLO SANDBOX (STILE SAAS DI LUSSO) */}
        <div className="bg-zinc-950/90 border-b border-zinc-900 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-100 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsPreviewing(false)}
              className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 px-4 py-2.5 rounded-xl border border-zinc-800 transition-all"
            >
              <ArrowLeft className="h-4 w-4" /> Modifica Dati
            </button>
            <div className="h-4 w-[1px] bg-zinc-800 hidden md:block"></div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">Anteprima Interattiva</p>
              <p className="text-[10px] font-mono text-zinc-500">Stai visualizzando i testi generati per: {nomeCliente}</p>
            </div>
          </div>

          {/* SELETTORE LIVE DEI 4 TEMPLATE (ZERO SCRITTURE DATABASE) */}
          <div className="flex items-center bg-black border border-zinc-900 p-1.5 rounded-2xl gap-1">
            {[
              { id: 1, label: 'T1: Hero Image' },
              { id: 2, label: 'T2: Hero Video' },
              { id: 3, label: 'T3: Direct Lead' },
              { id: 4, label: 'T4: SEO Approved' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTemplateId(t.id)}
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

          {/* PULSANTE DI PUBBLICAZIONE REALE */}
          <a
            href={`/api/generate?slug=${slug}`} // Link per visualizzare l'URL reale
            onClick={(e) => {
              e.preventDefault();
              window.open(`/${slug.toLowerCase().replace(/[^a-z0-9-_]/g, '-')}`, '_blank');
            }}
            className="bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-800 hover:border-zinc-700 font-extrabold text-xs px-5 py-3 rounded-xl flex items-center gap-2 transition-all"
          >
            <span>Apri Sito Ufficiale</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* CONTAINER DINAMICO CHE MONTA IL LAYOUT SCELTO IN TEMPO REALE */}
        <div className="flex-grow">
          {activeTemplateId === 1 && <TemplateHeroImage data={previewData} nomeCliente={nomeCliente} />}
          {activeTemplateId === 2 && <TemplateHeroVideo data={previewData} nomeCliente={nomeCliente} />}
          {activeTemplateId === 3 && <TemplateBooking data={previewData} nomeCliente={nomeCliente} />}
          {activeTemplateId === 4 && <TemplateSEO data={previewData} nomeCliente={nomeCliente} />}
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

            {/* SELEZIONE TEMPLATE */}
            <div className="space-y-4 pt-4 border-t border-zinc-900">
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Seleziona Scheletro Layout Iniziale</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setTemplateId(1)}
                  className={`border-2 p-5 rounded-2xl cursor-pointer transition-all ${
                    templateId === 1 
                      ? 'border-cyan-400 bg-cyan-950/10' 
                      : 'border-zinc-900 bg-zinc-900/50 hover:border-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm">Template 1: Hero Image</span>
                    {templateId === 1 && <CheckCircle className="h-5 w-5 text-cyan-400" />}
                  </div>
                  <p className="text-xs text-zinc-400 font-light">
                    Layout classico ed elegante. Massima attenzione ad un'immagine rappresentativa affiancata al testo.
                  </p>
                </div>

                <div
                  onClick={() => setTemplateId(2)}
                  className={`border-2 p-5 rounded-2xl cursor-pointer transition-all ${
                    templateId === 2 
                      ? 'border-cyan-400 bg-cyan-950/10' 
                      : 'border-zinc-900 bg-zinc-900/50 hover:border-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm">Template 2: Hero Video</span>
                    {templateId === 2 && <CheckCircle className="h-5 w-5 text-cyan-400" />}
                  </div>
                  <p className="text-xs text-zinc-400 font-light">
                    Sfondo video immersivo a pieno schermo in stile "Atelier". Massima emozione visiva per automotive o lusso.
                  </p>
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
