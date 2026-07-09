// src/app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Shield, Sparkles, CheckCircle, Mail, MapPin, Share2, Image as ImageIcon, Eye, ExternalLink, ArrowLeft, Play, Heart, Star, Check, Phone, Layers, ArrowRight } from 'lucide-react';

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
    headline: "Prenditi cura del tuo equilibrio emotivo in uno spazio protetto",
    subheadline: "Un percorso di ascolto empatico e supporto psicologico focalizzato sulle tue necessità, nel rispetto dei tuoi tempi.",
    cta1: "Prenota Primo Colloquio",
    cta2: "Scopri il mio approccio"
  },
  servizi: [
    { titolo: "Gestione di Ansia e Stress", descrizione: "Strumenti terapeutici mirati per comprendere l'origine delle tue tensioni e ritrovare la serenità quotidiana." },
    { titolo: "Sostegno alle Relazioni", descrizione: "Percorsi individuali o di coppia per superare conflitti, migliorare la comunicazione e sanare i legami." },
    { titolo: "Crescita e Autoefficacia", descrizione: "Accompagnamento per superare fasi di stallo, aumentare l'autostima e riscoprire le proprie risorse personali." }
  ],
  social_proof: "Consigliato da decine di pazienti che hanno ritrovato il loro benessere emotivo e la propria autonomia.",
  brand_color: "#5F6F52",
  logo_url: "",
  email: "contatti@studio-psicologia.it",
  indirizzo: "Viale delle Industrie 17b, Rovigo (RO)",
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
  const [templateId, setTemplateId] = useState(7); // Impostiamo "L'Empatico" come default
  const [logoUrl, setLogoUrl] = useState('');
  const [email, setEmail] = useState('');
  const [indirizzo, setIndirizzo] = useState('');
  const [socialFb, setSocialFb] = useState('');
  const [socialIg, setSocialIg] = useState('');

  // STATI PER IL PANNELLO SEGRETO ADMIN (SBLOCCATO VIA ?admin=riccardo)
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminJson, setAdminAdminJson] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);

  // Controlla la URL all'avvio senza rompere il build-time SSR di Next.js
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('admin=riccardo')) {
      setIsAdmin(true);
    }
  }, []);

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoading(true);
    try {
      const parsedData = JSON.parse(adminJson);
      
      const response = await fetch('https://n8n.rmstudio.app/webhook/omnia-quick-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: adminPhone.replace(/[^0-9+]/g, ''),
          nome_cliente: parsedData.nome_cliente,
          slug: parsedData.slug,
          template_id: parsedData.template_id || 7,
          site_data: parsedData.site_data
        }),
      });

      if (response.ok) {
        alert("Dati inviati a n8n con successo! Controlla l'alert su Telegram.");
        setShowAdminModal(false);
        setAdminAdminJson('');
        setAdminPhone('');
      } else {
        alert("Errore durante l'invio dei dati a n8n.");
      }
    } catch (err: any) {
      alert("JSON non valido. Verifica il formato e riprova. Errore: " + err.message);
    } finally {
      setAdminLoading(false);
    }
  };

  const handleViewDemo = (tId: number) => {
    let demoColor = '#5F6F52';
    let demoVideo = '';
    if (tId === 1) demoColor = '#06B6D4';
    if (tId === 2) {
      demoColor = '#D97706';
      demoVideo = 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-drifting-at-night-42217-large.mp4';
    }
    if (tId === 3) demoColor = '#2563EB';
    if (tId === 4) demoColor = '#10B981';
    if (tId === 5) demoColor = '#5F6F52';
    if (tId === 6) demoColor = '#8B5CF6';
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
      <div className="min-h-screen bg-[#0d0f17] flex flex-col">
        
        {/* BARRA DI CONTROLLO SANDBOX DARK CON BACKDROP BLUR ELEGANTE */}
        <div className="bg-[#0e1017]/95 border-b border-zinc-800/80 px-6 py-4 flex flex-col xl:flex-row items-center justify-between gap-4 sticky top-0 z-50 backdrop-blur-xl">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsPreviewing(false)}
              className="text-xs font-bold text-zinc-300 hover:text-white flex items-center gap-2 bg-zinc-900/80 hover:bg-zinc-800 px-4 py-2.5 rounded-xl border border-zinc-800/60 transition-all font-mono shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" /> Torna al Modulo
            </button>
            <div className="h-5 w-[1px] bg-zinc-850 hidden md:block"></div>
            <div className="text-left">
              <p className="text-sm font-black text-white leading-tight">
                {isDemoMode ? "Sfoglia i Template di Esempio" : "Anteprima dei tuoi Dati"}
              </p>
              <p className="text-[10px] font-mono text-cyan-400">
                {isDemoMode ? "Stai testando la demo con dati reali" : `Sito generato per: ${nomeCliente}`}
              </p>
            </div>
          </div>

          {/* SELETTORE LIVE DEI 9 TEMPLATE COERENTE IN ITALIANO */}
          <div className="flex items-center bg-[#050508] border border-zinc-800/80 p-1.5 rounded-2xl gap-1 max-w-full overflow-x-auto no-scrollbar">
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
                className={`text-[10px] sm:text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  activeTemplateId === t.id 
                    ? 'bg-zinc-900 text-white font-extrabold shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40'
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
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-extrabold text-xs px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>Usa questo Layout</span>
              <CheckCircle className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => window.open(`/${slug.toLowerCase().replace(/[^a-z0-9-_]/g, '-')}`, '_blank')}
              className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <span>Apri Sito Ufficiale</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* CONTAINER DINAMICO */}
        <div className="flex-grow">
          {activeTemplateId === 1 && <Template_il_guardiano data={previewData} nomeCliente={isDemoMode ? "Dott. ssa Valeria Cortese" : nomeCliente} slug={isDemoMode ? "azienda-demo" : (slug || "anteprima")} />}
          {activeTemplateId === 2 && <Template_l_atelier data={previewData} nomeCliente={isDemoMode ? "Dott. ssa Valeria Cortese" : nomeCliente} slug={isDemoMode ? "azienda-demo" : (slug || "anteprima")} />}
          {activeTemplateId === 3 && <Template_il_chirurgo data={previewData} nomeCliente={isDemoMode ? "Dott. ssa Valeria Cortese" : nomeCliente} slug={isDemoMode ? "azienda-demo" : (slug || "anteprima")} />}
          {activeTemplateId === 4 && <Template_l_autorita data={previewData} nomeCliente={isDemoMode ? "Dott. ssa Valeria Cortese" : nomeCliente} slug={isDemoMode ? "azienda-demo" : (slug || "anteprima")} />}
          {activeTemplateId === 5 && <Template_il_creativo data={previewData} nomeCliente={isDemoMode ? "Dott. ssa Valeria Cortese" : nomeCliente} slug={isDemoMode ? "azienda-demo" : (slug || "anteprima")} />}
          {activeTemplateId === 6 && <Template_il_regista data={previewData} nomeCliente={isDemoMode ? "Dott. ssa Valeria Cortese" : nomeCliente} slug={isDemoMode ? "azienda-demo" : (slug || "anteprima")} />}
          {activeTemplateId === 7 && <Template_l_empatico data={previewData} nomeCliente={isDemoMode ? "Dott. ssa Valeria Cortese" : nomeCliente} slug={isDemoMode ? "azienda-demo" : (slug || "anteprima")} />}
          {activeTemplateId === 8 && <Template_la_sorgente data={previewData} nomeCliente={isDemoMode ? "Dott. ssa Valeria Cortese" : nomeCliente} slug={isDemoMode ? "azienda-demo" : (slug || "anteprima")} />}
          {activeTemplateId === 9 && <Template_il_sentiero data={previewData} nomeCliente={isDemoMode ? "Dott. ssa Valeria Cortese" : nomeCliente} slug={isDemoMode ? "azienda-demo" : (slug || "anteprima")} />}
        </div>

      </div>
    );
  }

  // SCHERMATA DEL FORM GENERATORE TRADIZIONALE
  return (
    <main className="min-h-screen bg-[#0d0f17] text-[#e2e8f0] font-sans flex flex-col justify-between selection:bg-cyan-500 selection:text-white relative overflow-x-hidden">
      
      {/* 🌈 AURORE GRADIENTI LUMINOSE DI SFONDO SULLA PALETTE BLU NOTTE SLATE */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#9333ea]/10 blur-[150px]" />
        <div className="absolute top-[30%] right-[30%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="border-b border-zinc-800/80 bg-transparent backdrop-blur-md py-5 px-8 max-w-6xl mx-auto w-full flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-md">
            <Shield className="h-4.5 w-4.5 text-cyan-400" />
          </div>
          <span className="font-serif font-black text-base tracking-widest uppercase text-white">SiteEngine <span className="text-cyan-400">AI</span></span>
        </div>
        <span className="text-[10px] font-mono text-zinc-400 border border-zinc-800 rounded-full px-3 py-1 bg-zinc-950/40 font-bold">RM Studio Creator v2.1</span>
      </header>

      {/* Main Panel */}
      <section className="max-w-5xl w-full mx-auto px-6 py-12 flex-grow flex flex-col justify-center relative z-10">
        
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full">
            <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-widest">Siti d'Autore in 24 Ore</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-black mb-4 tracking-tight leading-[1.1] text-white">
            Crea la tua Landing Page <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">Ad Alta Conversione</span>
          </h1>
          <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Inserisci i dati essenziali del professionista. Il nostro algoritmo compilerà la struttura strategica di vendita generando l'anteprima.
          </p>
        </div>

        {/* CONTENITORE FORM PRINCIPALE GLASSMORPHISM DI COLORE INTEGRATO */}
        <div className="bg-[#131622]/90 border border-zinc-800/80 p-8 md:p-12 rounded-[40px] shadow-2xl backdrop-blur-xl relative">
          
          {loading && (
            <div className="absolute inset-0 bg-black/95 rounded-[40px] z-50 flex flex-col items-center justify-center p-6 text-center">
              <div className="h-10 w-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6"></div>
              <h2 className="text-xl font-bold mb-2 text-white">Generazione della struttura terapeutica...</h2>
              <p className="text-sm text-zinc-400 max-w-xs font-mono">
                Sincronizzazione della mappa, della privacy policy compliant GDPR e inserimento dei trigger cognitivi.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* SEZIONE 1: IDENTITÀ BASE */}
            <div className="space-y-5">
              <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2.5 text-left">
                <ImageIcon className="h-4 w-4 text-cyan-400" /> 1. Identità & Brand
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-left">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Nome Professionista o Studio</label>
                  <input
                    type="text"
                    required
                    placeholder="Es: Dott.ssa Valeria Cortese"
                    className="w-full bg-[#151722] border border-zinc-800 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-550 transition-all outline-none text-sm"
                    value={nomeCliente}
                    onChange={(e) => setNomeCliente(e.target.value)}
                  />
                </div>

                <div className="text-left">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">URL Logo (Opzionale)</label>
                  <input
                    type="url"
                    placeholder="https://mio-sito.it/logo.png"
                    className="w-full bg-[#151722] border border-zinc-800 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-550 transition-all outline-none text-sm"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-left">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Settore Operativo specifico</label>
                  <input
                    type="text"
                    required
                    placeholder="Es: Psicologia Clinica e Psicoterapia"
                    className="w-full bg-[#151722] border border-zinc-800 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-550 transition-all outline-none text-sm"
                    value={settore}
                    onChange={(e) => setSettore(e.target.value)}
                  />
                </div>

                <div className="text-left">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Slug desiderato (Indirizzo web)</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-zinc-500 font-mono text-sm">/</span>
                    <input
                      type="text"
                      required
                      placeholder="valeria-cortese"
                      className="w-full bg-[#151722] border border-zinc-800 focus:border-cyan-400 rounded-xl p-4 pl-8 text-white placeholder-zinc-550 transition-all outline-none font-mono text-sm"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SEZIONE 2: CONTATTI E LOCALIZZAZIONE */}
            <div className="space-y-5 pt-6 border-t border-zinc-800/80">
              <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2.5 text-left">
                <Mail className="h-4 w-4 text-cyan-400" /> 2. Contatti & Localizzazione
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-left">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Email pubblica principale</label>
                  <input
                    type="email"
                    placeholder="info@mia-azienda.it"
                    className="w-full bg-[#151722] border border-zinc-800 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-550 transition-all outline-none text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="text-left">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Indirizzo Fisico (Attiva Google Map in automatico!)</label>
                  <div className="relative flex items-center">
                    <MapPin className="absolute left-4 h-4 w-4 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Es: Viale delle Industrie 17b, Rovigo (RO)"
                      className="w-full bg-[#151722] border border-zinc-800 focus:border-cyan-400 rounded-xl p-4 pl-12 text-white placeholder-zinc-550 transition-all outline-none text-sm"
                      value={indirizzo}
                      onChange={(e) => setIndirizzo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SEZIONE 3: CANALI SOCIAL */}
            <div className="space-y-5 pt-6 border-t border-zinc-800/80">
              <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2.5 text-left">
                <Share2 className="h-4 w-4 text-cyan-400" /> 3. Canali Social (Opzionali)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-left">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Link Facebook</label>
                  <input
                    type="url"
                    placeholder="https://facebook.com/mia-pagina"
                    className="w-full bg-[#151722] border border-zinc-800 focus:border-[#5F6F52] rounded-xl p-4 text-[#e2e8f0] placeholder-stone-550 transition-all outline-none text-sm"
                    value={socialFb}
                    onChange={(e) => setSocialFb(e.target.value)}
                  />
                </div>

                <div className="text-left">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Link Instagram</label>
                  <input
                    type="url"
                    placeholder="https://instagram.com/mio-profilo"
                    className="w-full bg-[#151722] border border-zinc-800 focus:border-[#5F6F52] rounded-xl p-4 text-[#e2e8f0] placeholder-stone-550 transition-all outline-none text-sm"
                    value={socialIg}
                    onChange={(e) => setSocialIg(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* SEZIONE 4: CONTENUTI ED ELEMENTI DISTINTIVI */}
            <div className="space-y-5 pt-6 border-t border-zinc-800/80">
              <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2.5 text-left">
                <Sparkles className="h-4 w-4 text-cyan-400" /> 4. Punti di Forza e Metodologia
              </h3>
              <div className="text-left">
                <textarea
                  required
                  rows={3}
                  placeholder="Es: Primo colloquio conoscitivo gratuito, Sedute detraibili fiscalmente, Terapia cognitivo-comportamentale focalizzata sul problema"
                  className="w-full bg-[#151722] border border-zinc-800 focus:border-cyan-400 rounded-xl p-4 text-white placeholder-zinc-550 transition-all outline-none text-sm leading-relaxed"
                  value={puntiForza}
                  onChange={(e) => setPuntiForza(e.target.value)}
                />
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 🪐 SELEZIONE TEMPLATE CON PRE-VISUALIZZAZIONI GIGANTI E TESTI AD ALTO CONTRASTO */}
            {/* ========================================================================= */}
            <div className="space-y-8 pt-6 border-t border-zinc-800/80">
              <div className="text-left">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Ingegneria di Impaginazione</span>
                <h3 className="text-2xl font-serif font-black text-white mt-1">Seleziona lo Scheletro del Layout</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                
                {/* 1. IL GUARDIANO */}
                <div 
                  onClick={() => setTemplateId(1)}
                  className={`border-2 p-6 rounded-[28px] relative transition-all duration-300 cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                    templateId === 1 ? 'border-cyan-400 bg-[#161a25] shadow-lg shadow-black/30' : 'border-zinc-800/80 bg-[#12141c]/90 hover:border-zinc-700 shadow-sm'
                  }`}
                >
                  <div className="space-y-3 flex-grow text-left">
                    <div className="flex items-center gap-2">
                      <span className="bg-cyan-500/10 text-cyan-400 text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full font-mono border border-cyan-500/20">Vigilanza & Cantieri</span>
                      {templateId === 1 && <span className="bg-cyan-500 text-white text-[8px] font-bold uppercase px-2 py-0.5 rounded-full">Selezionato</span>}
                    </div>
                    <h4 className="font-serif font-black text-xl text-white">01. Il Guardiano</h4>
                    <p className="text-sm text-zinc-350 font-light leading-relaxed max-w-lg">Impaginazione asimmetrica autoritaria di impatto. Spazio predominante a sinistra per headlines aggressive e blocco immagine satinato a destra.</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(1); }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-white bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 transition-all"
                    >
                      <Eye className="h-4 w-4" /> Esplora Anteprima Live
                    </button>
                  </div>
                  
                  {/* ANTEPRIMA VISIVA GIGANTE (MOCKUP 3:4) */}
                  <div className="w-36 h-48 shrink-0 bg-[#020204] border border-zinc-800 rounded-2xl overflow-hidden p-3 flex flex-col justify-between shadow-md relative z-10">
                    <div className="flex items-center justify-between border-b border-zinc-850 pb-1.5">
                      <div className="h-2 w-10 bg-cyan-400 rounded"></div>
                      <div className="h-2 w-2 bg-stone-800 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 flex-grow items-center py-2">
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-12 bg-stone-850 rounded"></div>
                        <div className="h-1.5 w-8 bg-stone-850 rounded"></div>
                        <div className="h-3 w-10 bg-cyan-400 rounded-sm mt-1"></div>
                      </div>
                      <div className="h-20 bg-stone-900 rounded-lg border border-stone-850"></div>
                    </div>
                    <div className="h-2 bg-stone-850 rounded-full w-full"></div>
                  </div>
                </div>

                {/* 2. L'ATELIER */}
                <div 
                  onClick={() => setTemplateId(2)}
                  className={`border-2 p-6 rounded-[28px] relative transition-all duration-300 cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                    templateId === 2 ? 'border-amber-500 bg-[#161a25] shadow-lg shadow-black/30' : 'border-zinc-800/80 bg-[#12141c]/90 hover:border-zinc-700 shadow-sm'
                  }`}
                >
                  <div className="space-y-3 flex-grow text-left">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-500/10 text-amber-500 text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full font-mono border border-amber-500/20">Lusso & Boutique</span>
                      {templateId === 2 && <span className="bg-amber-500 text-white text-[8px] font-bold uppercase px-2 py-0.5 rounded-full">Selezionato</span>}
                    </div>
                    <h4 className="font-serif font-black text-xl text-white">02. L'Atelier</h4>
                    <p className="text-sm text-zinc-350 font-light leading-relaxed max-w-lg">Fascino cinematico oscuro. Texture pixelata dorata sovrapposta a video-background oscurato. Perfetto per creazioni d'arte e immobili ad alto margine.</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(2); }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-white bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 transition-all"
                    >
                      <Eye className="h-4 w-4" /> Esplora Anteprima Live
                    </button>
                  </div>
                  
                  {/* ANTEPRIMA VISIVA GIGANTE (MOCKUP 3:4) */}
                  <div className="w-36 h-48 shrink-0 bg-stone-950 border border-zinc-800 rounded-2xl overflow-hidden p-3 flex flex-col justify-between shadow-md relative z-10">
                    <div className="flex items-center justify-between border-b border-zinc-850 pb-1.5">
                      <div className="h-2 w-10 bg-amber-500 rounded"></div>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-grow py-2 space-y-1">
                      <div className="h-2 w-16 bg-stone-850 rounded"></div>
                      <div className="h-2 w-12 bg-stone-850 rounded"></div>
                      <div className="h-3 w-8 bg-amber-500 rounded-sm mt-1"></div>
                    </div>
                    <div className="h-2 bg-stone-800 rounded-full w-full"></div>
                  </div>
                </div>

                {/* 3. IL CHIRURGO */}
                <div 
                  onClick={() => setTemplateId(3)}
                  className={`border-2 p-6 rounded-[28px] relative transition-all duration-300 cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                    templateId === 3 ? 'border-blue-500 bg-[#161a25] shadow-lg shadow-black/30' : 'border-zinc-800/80 bg-[#12141c]/90 hover:border-zinc-700 shadow-sm'
                  }`}
                >
                  <div className="space-y-3 flex-grow text-left">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-550/10 text-blue-400 text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full font-mono border border-blue-500/20">Medicina & Cliniche</span>
                      {templateId === 3 && <span className="bg-blue-500 text-white text-[8px] font-bold uppercase px-2 py-0.5 rounded-full">Selezionato</span>}
                    </div>
                    <h4 className="font-serif font-black text-xl text-white">03. Il Chirurgo</h4>
                    <p className="text-sm text-zinc-350 font-light leading-relaxed max-w-lg">Sfondo chiaro pastello asettico con griglia a punti di precisione. Riduce l'attrito decisionale posizionando il modulo di contatto in primo piano.</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(3); }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-white bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 transition-all"
                    >
                      <Eye className="h-4 w-4" /> Esplora Anteprima Live
                    </button>
                  </div>
                  
                  {/* ANTEPRIMA VISIVA GIGANTE (MOCKUP 3:4) */}
                  <div className="w-36 h-48 shrink-0 bg-white border border-stone-200 rounded-2xl overflow-hidden p-3 flex flex-col justify-between shadow-md relative z-10">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-1.5">
                      <div className="h-2 w-10 bg-blue-500 rounded"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 flex-grow items-center py-2">
                      <div className="space-y-1">
                        <div className="h-1.5 w-10 bg-stone-200 rounded"></div>
                        <div className="h-1.5 w-6 bg-stone-100 rounded"></div>
                      </div>
                      <div className="h-20 bg-stone-50 border border-stone-100 rounded-md p-1 space-y-1.5 flex flex-col justify-center">
                        <div className="h-1 bg-stone-200 rounded"></div>
                        <div className="h-1 bg-stone-200 rounded"></div>
                        <div className="h-2 bg-blue-500 rounded-sm"></div>
                      </div>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full w-full"></div>
                  </div>
                </div>

                {/* 4. L'AUTORITÀ */}
                <div 
                  onClick={() => setTemplateId(4)}
                  className={`border-2 p-6 rounded-[28px] relative transition-all duration-300 cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                    templateId === 4 ? 'border-emerald-500 bg-[#161a25] shadow-lg shadow-black/30' : 'border-zinc-800/80 bg-[#12141c]/90 hover:border-zinc-700 shadow-sm'
                  }`}
                >
                  <div className="space-y-3 flex-grow text-left">
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-500/10 text-emerald-450 text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full font-mono border border-emerald-500/20">Consulenti & Legali</span>
                      {templateId === 4 && <span className="bg-emerald-500 text-white text-[8px] font-bold uppercase px-2 py-0.5 rounded-full">Selezionato</span>}
                    </div>
                    <h4 className="font-serif font-black text-xl text-white">04. L'Autorità</h4>
                    <p className="text-sm text-zinc-350 font-light leading-relaxed max-w-lg">Struttura autoritaria con effetto shimmer metallico sui titoli principali ed effetto Spotlight luminoso al tocco sulle card dei servizi.</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(4); }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-white bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 transition-all"
                    >
                      <Eye className="h-4 w-4" /> Esplora Anteprima Live
                    </button>
                  </div>
                  
                  {/* ANTEPRIMA VISIVA GIGANTE (MOCKUP 3:4) */}
                  <div className="w-36 h-48 shrink-0 bg-stone-950 border border-zinc-800 rounded-2xl overflow-hidden p-3 flex flex-col justify-between shadow-md relative z-10">
                    <div className="border-b border-zinc-850 pb-1.5">
                      <div className="h-2 w-10 bg-emerald-500 rounded"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-1 py-1">
                      <div className="h-4 bg-stone-900 rounded-sm"></div>
                      <div className="h-4 bg-stone-900 rounded-sm"></div>
                      <div className="h-4 bg-stone-900 rounded-sm"></div>
                    </div>
                    <div className="space-y-1 flex-grow">
                      <div className="flex gap-1 items-center">
                        <div className="h-3 w-5 bg-stone-800 rounded-sm"></div>
                        <div className="h-1 w-8 bg-stone-750 rounded-sm"></div>
                      </div>
                    </div>
                    <div className="h-2 bg-[#12141c] rounded-full w-full"></div>
                  </div>
                </div>

                {/* 5. IL CREATIVO */}
                <div 
                  onClick={() => setTemplateId(5)}
                  className={`border-2 p-6 rounded-[28px] relative transition-all duration-300 cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                    templateId === 5 ? 'border-[#5F6F52] bg-[#161a25] shadow-lg shadow-black/30' : 'border-zinc-800/80 bg-[#12141c]/90 hover:border-zinc-700 shadow-sm'
                  }`}
                >
                  <div className="space-y-3 flex-grow text-left">
                    <div className="flex items-center gap-2">
                      <span className="bg-stone-500/10 text-stone-300 text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full font-mono border border-stone-500/20">Bento & Designer</span>
                      {templateId === 5 && <span className="bg-[#5F6F52] text-white text-[8px] font-bold uppercase px-2 py-0.5 rounded-full">Selezionato</span>}
                    </div>
                    <h4 className="font-serif font-black text-xl text-white">05. Il Creativo</h4>
                    <p className="text-sm text-zinc-350 font-light leading-relaxed max-w-lg">Layout asimmetrico "Bento Grid". Sfondo organico color carta chiaro con accenti verde salvia e nuvole pastello fluttuanti per stimolare la memoria visiva.</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(5); }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-white bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 transition-all"
                    >
                      <Eye className="h-4 w-4" /> Esplora Anteprima Live
                    </button>
                  </div>
                  
                  {/* ANTEPRIMA VISIVA GIGANTE (MOCKUP 3:4) */}
                  <div className="w-36 h-48 shrink-0 bg-[#FAF9F5] border border-stone-200 rounded-2xl overflow-hidden p-3 flex flex-col justify-between shadow-md relative z-10 gap-1">
                    <div className="border-b border-stone-200 pb-1">
                      <div className="h-2 w-10 bg-[#5F6F52] rounded"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-1 flex-grow">
                      <div className="col-span-2 row-span-2 bg-[#E6E4DC] rounded-md"></div>
                      <div className="bg-[#E6E4DC]/50 rounded-md"></div>
                      <div className="bg-[#5F6F52] rounded-md"></div>
                      <div className="col-span-2 bg-[#E6E4DC]/50 rounded-md"></div>
                    </div>
                    <div className="h-2 bg-[#E6E4DC] rounded-full w-full"></div>
                  </div>
                </div>

                {/* 6. IL REGISTA */}
                <div 
                  onClick={() => setTemplateId(6)}
                  className={`border-2 p-6 rounded-[28px] relative transition-all duration-300 cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                    templateId === 6 ? 'border-purple-500 bg-[#161a25] shadow-lg shadow-black/30' : 'border-zinc-800/80 bg-[#12141c]/90 hover:border-zinc-700 shadow-sm'
                  }`}
                >
                  <div className="space-y-3 flex-grow text-left">
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-555/10 text-purple-400 text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full font-mono border border-purple-500/20">Video & UGC</span>
                      {templateId === 6 && <span className="bg-purple-600 text-white text-[8px] font-bold uppercase px-2 py-0.5 rounded-full">Selezionato</span>}
                    </div>
                    <h4 className="font-serif font-black text-xl text-white">06. Il Regista</h4>
                    <p className="text-sm text-zinc-350 font-light leading-relaxed max-w-lg">Layout cinetico a forte impatto. Video Player interattivo sopra la piega, Marquee di testo infinito e blocchi in loop B-Roll automatico.</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(6); }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-white bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 transition-all"
                    >
                      <Eye className="h-4 w-4" /> Esplora Anteprima Live
                    </button>
                  </div>
                  
                  {/* ANTEPRIMA VISIVA GIGANTE (MOCKUP 3:4) */}
                  <div className="w-36 h-48 shrink-0 bg-[#09090E] border border-[#1b1e2e] rounded-2xl overflow-hidden p-3 flex flex-col justify-between shadow-md relative z-10 gap-1.5">
                    <div className="border-b border-stone-850 pb-1">
                      <div className="h-2 w-10 bg-purple rounded"></div>
                    </div>
                    <div className="flex-grow flex flex-col justify-center items-center relative space-y-1">
                      <div className="h-16 w-full bg-stone-900 border border-stone-800 rounded-md flex items-center justify-center relative">
                        <Play className="h-4 w-4 text-purple-500 fill-purple-500" />
                      </div>
                      <div className="h-2 w-full bg-[#1b1e2e] rounded"></div>
                    </div>
                    <div className="h-2 bg-[#1b1e2e] rounded-full w-full"></div>
                  </div>
                </div>

                {/* 7. L'EMPATICO */}
                <div 
                  onClick={() => setTemplateId(7)}
                  className={`border-2 p-6 rounded-[28px] relative transition-all duration-300 cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                    templateId === 7 ? 'border-emerald-600 bg-[#161a25] shadow-lg shadow-black/30' : 'border-zinc-800/80 bg-[#12141c]/90 hover:border-zinc-700 shadow-sm'
                  }`}
                >
                  <div className="space-y-3 flex-grow text-left">
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-500/10 text-emerald-450 text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full font-mono border border-[#10b981]/20">Psicologi & Benessere</span>
                      {templateId === 7 && <span className="bg-[#10b981] text-white text-[8px] font-bold uppercase px-2 py-0.5 rounded-full">Selezionato</span>}
                    </div>
                    <h4 className="font-serif font-black text-xl text-white">07. L'Empatico</h4>
                    <p className="text-sm text-zinc-350 font-light leading-relaxed max-w-lg">Tonalità calde terra e verde salvia. Font graziato Serif che comunica accoglienza emotiva e trigger focalizzati sulla detrazione delle spese sanitarie.</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(7); }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-white bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 transition-all"
                    >
                      <Eye className="h-4 w-4" /> Esplora Anteprima Live
                    </button>
                  </div>
                  
                  {/* ANTEPRIMA VISIVA GIGANTE (MOCKUP 3:4) */}
                  <div className="w-36 h-48 shrink-0 bg-[#FAF9F5] border border-stone-200 rounded-2xl overflow-hidden p-3 flex flex-col justify-between shadow-md relative z-10 gap-1.5">
                    <div className="border-b border-stone-200 pb-1">
                      <div className="h-2 w-10 bg-[#5F6F52] rounded"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 flex-grow items-center py-1">
                      <div className="space-y-1">
                        <div className="h-1.5 w-10 bg-stone-350 rounded"></div>
                        <div className="h-1.5 w-8 bg-stone-250 rounded"></div>
                      </div>
                      <div className="h-20 bg-[#FAF9F5] rounded-full border border-stone-200 shadow-sm flex items-center justify-center">
                        <Heart className="h-4 w-4 text-[#5F6F52]" />
                      </div>
                    </div>
                    <div className="h-2 bg-[#E6E4DC] rounded-full w-full"></div>
                  </div>
                </div>

                {/* 8. LA SORGENTE */}
                <div 
                  onClick={() => setTemplateId(8)}
                  className={`border-2 p-6 rounded-[28px] relative transition-all duration-300 cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                    templateId === 8 ? 'border-sky-500 bg-[#161a25] shadow-lg shadow-black/30' : 'border-zinc-800/80 bg-[#12141c]/90 hover:border-zinc-700 shadow-sm'
                  }`}
                >
                  <div className="space-y-3 flex-grow text-left">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#0ea5e9]/10 text-[#38bdf8] text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full font-mono border border-[#0ea5e9]/20">Nordic Zen & Clinica</span>
                      {templateId === 8 && <span className="bg-sky-500 text-white text-[8px] font-bold uppercase px-2 py-0.5 rounded-full">Selezionato</span>}
                    </div>
                    <h4 className="font-serif font-black text-xl text-white">08. La Sorgente</h4>
                    <p className="text-sm text-zinc-350 font-light leading-relaxed max-w-lg">Spaziatura ultra-pulita "Airy". Layout a schermo diviso (Split-Screen) a forte impatto grafico e un modulo interattivo di autovalutazione del problema.</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(8); }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-white bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 transition-all"
                    >
                      <Eye className="h-4 w-4" /> Esplora Anteprima Live
                    </button>
                  </div>
                  
                  {/* ANTEPRIMA VISIVA GIGANTE (MOCKUP 3:4) */}
                  <div className="w-36 h-48 shrink-0 bg-[#F8F9FA] border border-[#1b1e2e] rounded-2xl overflow-hidden p-3 flex flex-col justify-between shadow-md relative z-10 gap-1.5">
                    <div className="border-b border-[#1b1e2e] pb-1">
                      <div className="h-2 w-10 bg-slate-900 rounded"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 flex-grow items-stretch py-1">
                      <div className="space-y-1.5 flex flex-col justify-center">
                        <div className="h-1.5 w-10 bg-stone-300 rounded"></div>
                        <div className="h-2 w-8 bg-slate-900 rounded-sm"></div>
                      </div>
                      <div className="bg-slate-250 rounded-lg border border-stone-200"></div>
                    </div>
                    <div className="h-2 bg-stone-200 rounded-full w-full"></div>
                  </div>
                </div>

                {/* 9. IL SENTIERO */}
                <div 
                  onClick={() => setTemplateId(9)}
                  className={`border-2 p-6 rounded-[28px] relative transition-all duration-300 cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                    templateId === 9 ? 'border-emerald-700 bg-[#161a25] shadow-lg shadow-black/30' : 'border-zinc-800/80 bg-[#12141c]/90 hover:border-zinc-700 shadow-sm'
                  }`}
                >
                  <div className="space-y-3 flex-grow text-left">
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-500/10 text-emerald-450 text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full font-mono border border-emerald-500/20">Cinematic & Introspezione</span>
                      {templateId === 9 && <span className="bg-emerald-700 text-white text-[8px] font-bold uppercase px-2 py-0.5 rounded-full">Selezionato</span>}
                    </div>
                    <h4 className="font-serif font-black text-xl text-white">09. Il Sentiero</h4>
                    <p className="text-sm text-zinc-350 font-light leading-relaxed max-w-lg">Immagine Hero a tutto schermo ad altissimo impatto d'atmosfera. Integra una raffinata timeline di crescita terapeutica verticale.</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleViewDemo(9); }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-white bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 transition-all"
                    >
                      <Eye className="h-4 w-4" /> Esplora Anteprima Live
                    </button>
                  </div>
                  
                  {/* ANTEPRIMA VISIVA GIGANTE (MOCKUP 3:4) */}
                  <div className="w-36 h-48 shrink-0 bg-stone-900 border border-stone-300/40 rounded-2xl overflow-hidden p-3 flex flex-col justify-between shadow-md relative z-10">
                    <div className="absolute inset-0 bg-[#1E3F20]/50 z-0 flex items-center justify-center p-2">
                      <div className="bg-black/60 border border-white/10 w-full h-24 rounded-lg flex flex-col justify-center items-center gap-1.5 shadow-md">
                        <div className="h-1.5 w-16 bg-white rounded-full"></div>
                        <div className="h-1.5 w-10 bg-white/55 rounded-full"></div>
                        <div className="h-3 w-12 bg-[#D4AF37] rounded-sm mt-1"></div>
                      </div>
                    </div>
                    <div className="h-2 bg-[#D4AF37] rounded relative z-10 w-6"></div>
                    <div className="h-2 bg-stone-200/40 rounded relative z-10 w-full"></div>
                  </div>
                </div>

              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 font-mono text-center font-bold">{error}</p>
            )}

            {/* BOTTONE PRINCIPALE CON OMBRE PULSANTI */}
            <button
              type="submit"
              className="w-full bg-[#1b1e2e] hover:bg-[#23273a] text-white font-extrabold text-base py-5 rounded-2xl flex items-center justify-center space-x-2.5 transition-all duration-300 shadow-lg shadow-black/10 active:scale-[0.99]"
            >
              <span>Genera Landing Page Professionale</span>
              <Sparkles className="h-5 w-5 text-white" />
            </button>

          </form>
        </div>

      </section>

      {/* 🔧 PANNELLO SEGRETO ADMIN RICCARDO (Visibile solo con ?admin=riccardo nella URL) */}
      {isAdmin && (
        <>
          {/* Pulsante galleggiante */}
          <button
            onClick={() => setShowAdminModal(true)}
            className="fixed bottom-6 right-6 z-[999] bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 text-white font-black p-4 rounded-full shadow-2xl flex items-center justify-center transition-all scale-100 hover:scale-105"
            title="Sblocca Caricamento Rapido Lead"
          >
            <Layers className="h-6 w-6" />
          </button>

          {/* Modal di caricamento JSON */}
          <AnimatePresence>
            {showAdminModal && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                <div
                  className="bg-[#0e1017] border border-zinc-800 p-6 md:p-8 rounded-3xl w-full max-w-lg shadow-2xl relative text-left"
                >
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-400" />
                      Iniezione Rapida Lead • RM Studio
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">Incolla il JSON strutturato generato dall'AI per compilare istantaneamente il database e attivare n8n.</p>
                  </div>

                  <form onSubmit={handleAdminSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Numero WhatsApp del Lead (Con prefisso internazionale)</label>
                      <input
                        type="text"
                        required
                        placeholder="Es: +393357401206"
                        className="w-full bg-[#151722] border border-zinc-800 focus:border-purple-500 rounded-xl p-3 text-white placeholder-zinc-650 transition-all outline-none text-xs"
                        value={adminPhone}
                        onChange={(e) => setAdminPhone(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Incolla il JSON del sito</label>
                      <textarea
                        required
                        rows={8}
                        placeholder="Incolla il codice JSON qui..."
                        className="w-full bg-[#151722] border border-zinc-800 focus:border-purple-500 rounded-xl p-3 text-white placeholder-zinc-650 font-mono text-[11px] leading-relaxed transition-all outline-none"
                        value={adminJson}
                        onChange={(e) => setAdminAdminJson(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAdminModal(false)}
                        className="text-xs font-bold text-zinc-400 hover:text-white bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-800 transition-all"
                      >
                        Annulla
                      </button>
                      <button
                        type="submit"
                        disabled={adminLoading}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-105 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-purple-500/10"
                      >
                        {adminLoading ? "Iniezione in corso..." : "Carica & Genera Bozza"}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 py-6 text-center text-xs text-zinc-500 font-mono relative z-10 bg-[#0d0f17]/40 backdrop-blur-md">
        © {new Date().getFullYear()} RM Studio • SiteEngine Pro Generator
      </footer>

    </main>
  );
}
