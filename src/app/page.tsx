// src/app/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Sparkles, Layout, CheckCircle, ArrowRight } from 'lucide-react';

export default function GeneratorHome() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Campi del Form
  const [slug, setSlug] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [settore, setSettore] = useState('');
  const [puntiForza, setPuntiForza] = useState('');
  const [templateId, setTemplateId] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validazione base dello slug
    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-_]/g, '-');

    try {
      // Chiamata diretta al tuo n8n su Hetzner (usiamo il webhook-test per ora)
      const response = await fetch('https://n8n.rmstudio.app/webhook/crea-sito-ai', {
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
        }),
      });

      if (!response.ok) {
        throw new Error('Errore durante la generazione del sito.');
      }

      // Se n8n risponde con successo, reindirizziamo l'utente alla sua nuova pagina dinamica!
      router.push(`/${cleanSlug}`);
    } catch (err) {
      console.error(err);
      setError('Si è verificato un errore di connessione con n8n. Controlla che il flusso sia attivo.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      
      {/* Header */}
      <header className="border-b border-zinc-900 py-6 px-8 max-w-6xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="h-7 w-7 text-cyan-400" />
          <span className="font-black text-lg tracking-widest uppercase">SiteEngine <span className="text-cyan-400">AI</span></span>
        </div>
        <span className="text-xs font-mono text-zinc-500">RM Studio Master Engine</span>
      </header>

      {/* Main Panel */}
      <section className="max-w-4xl w-full mx-auto px-6 py-12 flex-grow flex flex-col justify-center">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Generatore di Landing Page <span className="text-cyan-400">Neuromarketing</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto font-light">
            Inserisci i dettagli del business e lascia che la nostra IA costruisca una struttura psicologica di vendita in 15 secondi.
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 p-8 md:p-10 rounded-3xl shadow-2xl relative">
          
          {loading && (
            <div className="absolute inset-0 bg-black/90 rounded-3xl z-50 flex flex-col items-center justify-center p-6 text-center">
              <div className="h-12 w-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-6"></div>
              <h2 className="text-xl font-bold mb-2">Creazione del Copy Persuasivo...</h2>
              <p className="text-sm text-zinc-400 max-w-xs font-mono">
                L'intelligenza artificiale sta analizzando i punti di forza del settore e inserendo i trigger cognitivi nel database.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Nome Azienda</label>
                <input
                  type="text"
                  required
                  placeholder="Es: Anni d'Oro Classiche"
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl p-4 text-white placeholder-zinc-600 transition-all outline-none"
                  value={nomeCliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Slug desiderato (URL)</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-zinc-600 font-mono text-sm">/</span>
                  <input
                    type="text"
                    required
                    placeholder="auto-retro"
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl p-4 pl-8 text-white placeholder-zinc-600 transition-all outline-none font-mono"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Settore Operativo</label>
              <input
                type="text"
                required
                placeholder="Es: Restauro e compravendita di auto storiche d'epoca"
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl p-4 text-white placeholder-zinc-600 transition-all outline-none"
                value={settore}
                onChange={(e) => setSettore(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">I 3 Punti di forza principali (Unicità)</label>
              <textarea
                required
                rows={3}
                placeholder="Es: Restauro artigianale con pezzi rari, spedizione assicurata in tutta Europa, perizia storica inclusa"
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl p-4 text-white placeholder-zinc-600 transition-all outline-none leading-relaxed"
                value={puntiForza}
                onChange={(e) => setPuntiForza(e.target.value)}
              />
            </div>

            {/* SELEZIONE TEMPLATE */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Seleziona Template Visivo</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setTemplateId(1)}
                  className={`border-2 p-5 rounded-2xl cursor-pointer transition-all ${
                    templateId === 1 
                      ? 'border-cyan-400 bg-cyan-950/20' 
                      : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm">Template 1: Dark Tech</span>
                    {templateId === 1 && <CheckCircle className="h-5 w-5 text-cyan-400" />}
                  </div>
                  <p className="text-xs text-zinc-400 font-light">
                    Sfondo nero assoluto, contrasto verde/ciano neon. Ottimo per Sicurezza, Agenzie, Consulenza, Automotive.
                  </p>
                </div>

                <div className="border border-zinc-900 p-5 rounded-2xl opacity-40 cursor-not-allowed bg-zinc-950">
                  <span className="text-xs font-mono uppercase bg-zinc-800 px-2 py-1 rounded text-zinc-400">Prossimamente</span>
                  <p className="font-bold text-sm mt-2 mb-1">Template 2: Luxury Minimale</p>
                  <p className="text-xs text-zinc-500">Ottimo per alberghi, architetti, prodotti fisici di lusso.</p>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400 font-mono text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-lg py-5 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-[1.01] shadow-lg shadow-cyan-400/10"
            >
              <span>Genera Landing Page AI</span>
              <Sparkles className="h-5 w-5" />
            </button>

          </form>
        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-600 font-mono">
        © {new Date().getFullYear()} RM Studio. All rights reserved. • Powered by n8n & Vercel
      </footer>

    </main>
  );
}
