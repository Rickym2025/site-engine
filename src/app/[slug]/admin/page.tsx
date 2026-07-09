// src/app/[slug]/admin/page.tsx
"use client";

import { useState, useEffect, use } from 'react';
import { supabase } from '@/lib/supabase';
import { Send, FileText, Image, Check, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function AdminBlogPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [token, setToken] = useState<string>('');
  const [nomeStudio, setNomeStudio] = useState<string>('');
  
  // STATI DEL FORM DI SCRITTURA
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function checkAuthorization() {
      if (typeof window === 'undefined') return;
      
      const searchParams = new URLSearchParams(window.location.search);
      const urlToken = searchParams.get('token') || '';
      setToken(urlToken);

      if (!urlToken) {
        setAuthorized(false);
        return;
      }

      // Interroga Supabase per verificare se esiste un sito attivo con questo slug e questo token segreto
      const { data, error } = await supabase
        .from('omnia_sites')
        .select('nome_cliente, site_data')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        setAuthorized(false);
        return;
      }

      const siteData = data.site_data as any;
      if (siteData?.admin_token === urlToken) {
        setAuthorized(true);
        setNomeStudio(data.nome_cliente);
      } else {
        setAuthorized(false);
      }
    }

    checkAuthorization();
  }, [slug]);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // API Route sicura per gestire la conversione del testo ed evitare l'iniezione di codice
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          slug,
          title,
          excerpt,
          coverImage,
          rawContent: content // Testo semplice scritto dall'utente
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Errore durante la pubblicazione");
      }

      setSuccess(true);
      setTitle('');
      setExcerpt('');
      setCoverImage('');
      setContent('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 1. Schermata di caricamento autorizzazione
  if (authorized === null) {
    return (
      <div className="min-h-screen bg-[#0d0f17] flex items-center justify-center text-white font-sans">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  // 2. Schermata di blocco se il token non è valido
  if (authorized === false) {
    return (
      <div className="min-h-screen bg-[#0d0f17] text-white flex items-center justify-center p-6 font-sans">
        <div className="bg-[#131622] border border-red-500/20 max-w-md p-8 rounded-3xl text-center space-y-4 shadow-xl">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-black">Accesso Non Autorizzato</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Non hai le credenziali necessarie per accedere a questa area di scrittura. Contatta il supporto tecnico all'indirizzo <span className="text-purple-400">info@rmstudio.app</span> per richiedere il tuo link d'accesso personalizzato.
          </p>
        </div>
      </div>
    );
  }

  // 3. Pannello di scrittura reale sbloccato
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-800 py-16 px-6 font-sans text-left">
      <div className="max-w-3xl mx-auto space-y-8 bg-white border border-stone-200 p-8 md:p-12 rounded-[36px] shadow-sm">
        
        {/* Intestazione */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div className="space-y-1">
            <span className="bg-purple-100 text-purple-800 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-purple-200">
              Area Riservata Scrittura
            </span>
            <h1 className="text-2xl font-serif font-black text-stone-900">
              Crea un Articolo per {nomeStudio}
            </h1>
          </div>
          <Link 
            href={`/${slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-900 bg-stone-50 border border-stone-200 px-4 py-2 rounded-xl transition-all w-fit"
          >
            <ArrowLeft className="h-4 w-4" /> Torna al Sito
          </Link>
        </div>

        {/* FEEDBACK DELL'INVIO */}
        {success && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-start gap-3">
            <Check className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-emerald-900 text-sm">Articolo Pubblicato con Successo!</h4>
              <p className="text-xs text-emerald-700 mt-0.5">La scheda "Blog" si è attivata ed è ora visibile sul tuo sito web. Puoi vederlo direttamente nella lista degli approfondimenti.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-2xl text-left text-xs text-red-700 font-bold">
            {error}
          </div>
        )}

        {/* FORM DI SCRITTURA */}
        <form onSubmit={handlePublish} className="space-y-6">
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-2">Titolo dell'Articolo</label>
            <input
              type="text"
              required
              placeholder="Es: Come gestire l'ansia da prestazione lavorativa"
              className="w-full bg-[#FAF9F5] border border-stone-200 focus:border-stone-400 rounded-xl p-4 text-stone-900 placeholder-stone-400 transition-all outline-none text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-2">Riassunto Breve (Excerpt - apparirà nell'anteprima)</label>
            <input
              type="text"
              required
              placeholder="Es: Alcune strategie pratiche e comportamentali per affrontare il burnout..."
              className="w-full bg-[#FAF9F5] border border-stone-200 focus:border-stone-400 rounded-xl p-4 text-stone-900 placeholder-stone-400 transition-all outline-none text-sm"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-2">URL Immagine di Copertina</label>
            <div className="relative flex items-center">
              <Image className="absolute left-4 h-4 w-4 text-stone-400" />
              <input
                type="url"
                placeholder="Incolla l'indirizzo di un'immagine (Es: da Unsplash o archivio)"
                className="w-full bg-[#FAF9F5] border border-stone-200 focus:border-stone-400 rounded-xl p-4 pl-12 text-stone-900 placeholder-stone-400 transition-all outline-none text-sm"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-2">Testo dell'Articolo (Andare a capo normalmente per creare i paragrafi)</label>
            <textarea
              required
              rows={12}
              placeholder="Scrivi qui il tuo articolo. Vai a capo normalmente per separare i paragrafi. Il sistema formatterà e impaginerà tutto in modo automatico."
              className="w-full bg-[#FAF9F5] border border-stone-200 focus:border-stone-400 rounded-xl p-4 text-stone-900 placeholder-stone-400 transition-all outline-none text-sm leading-relaxed"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-sm py-4.5 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md active:scale-[0.99]"
          >
            <FileText className="h-4 w-4" />
            <span>{loading ? "Pubblicazione in corso..." : "Pubblica l'Articolo sul Sito"}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
