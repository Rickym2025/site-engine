// src/app/page.tsx
"use client";

import { useState } from 'react';
import { Shield, Sparkles, CheckCircle, Mail, MapPin, Share2, Image as ImageIcon, Eye, ExternalLink, ArrowLeft } from 'lucide-react';

// IMPORTIAMO I 4 TEMPLATE REALI CON I NUOVI NOMI IN ITALIANO
import Template_il_guardiano from '@/components/Template_il_guardiano';
import Template_l_atelier from '@/components/Template_l_atelier';
import Template_il_chirurgo from '@/components/Template_il_chirurgo';
import Template_l_autorita from '@/components/Template_l_autorita';

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
          <h1 classNam
