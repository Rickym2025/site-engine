// src/app/[slug]/admin/page.tsx
"use client";

import { useState, useEffect, use } from 'react';
import { Phone, Check, ArrowLeft, KeyRound, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function AdminBlogPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  // STATI AUTENTICAZIONE
  const [phone, setPhone] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // STATI DEL FORM DI SCRITTURA
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Controlla se l'utente ha già effettuato l'accesso in questa sessione
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPhone = sessionStorage.getItem('admin_phone');
      if (savedPhone) {
        verifyPhoneSilently(savedPhone);
      }
    }
  }, [slug]);

  // Esegue un login silenzioso se il telefono è già memorizzato nella sessione
  async function verifyPhoneSilently(savedPhone: string) {
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: "check-login", slug, phone: savedPhone })
      });
      if (res.ok) {
        setPhone(savedPhone);
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: "check-login",
          slug,
          phone
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Numero di telefono non riconosciuto");
      }

      // Salva la sessione di accesso
      sessionStorage.setItem('admin_phone', phone);
      setIsAuthenticated(true);
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: "publish-post",
          phone,
          slug,
          title,
          excerpt,
          coverImage,
          rawContent: content
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

  // 1. SCHERMATA ACCEDI (Se non ancora autenticato)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d0f17] text-white flex items-center justify-center p-6 font-sans text-left">
        <div className="bg-[#131622] border border-zinc-800 p-8 rounded-3xl w-full max-w-md shadow-2xl space-y-6 relative">
          
          <div className="text-center space-y-2">
            <div className="h-12 w-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto text-purple-400">
              <KeyRound className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-black tracking-tight pt-2">Area Riservata Scrittura</h2>
            <p className="text-xs text-zinc-400">Inserisci il numero di telefono con cui ti sei registrato per accedere all'editor del tuo Blog.</p>
          </div>

          {authError && (
            <div className="bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl text-xs text-red-400 font-bold leading-relaxed">
              {authError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Numero di Cellulare</label>
              <div className="relative flex items-center">
                <Phone className="absolute left-4 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  required
                  placeholder="Es: +39 3288662283"
                  className="w-full bg-[#1b1e2e]/60 border border-zinc-800 focus:border-purple-500 rounded-xl p-3.5 pl-12 text-white placeholder-zinc-600 transition-all outline-none text-sm"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 text-white font-extrabold text-sm py-4 rounded-xl transition-all shadow-lg shadow-purple-500/10 active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>{authLoading ? "Verifica in corso..." : "Accedi all'Editor"}</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href={`/${slug}`} className="text-xs text-zinc-500 hover:text-white transition-colors inline-flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Torna al sito pubblico
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // 2. SCHERMATA EDITOR SBLOCCATO (Se l'autenticazione ha avuto successo)
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-850 py-16 px-6 font-sans text-left">
      <div className="max-w-3xl mx-auto space-y-8 bg-white border border-stone-200 p-8 md:p-12 rounded-[36px] shadow-sm">
        
        {/* Intestazione */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div className="space-y-1">
            <span className="bg-purple-100 text-purple-800 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-purple-200">
              Sessione Editor Attiva ✅
            </span>
            <h1 className="text-2xl font-serif font-black text-stone-900">
              Crea un Articolo per il tuo Blog
            </h1>
          </div>
          <Link 
            href={`/${slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-900 bg-stone-50 border border-stone-200 px-4 py-2 rounded-xl transition-all w-fit"
          >
            <ArrowLeft className="h-4 w-4" /> Vedi Sito
          </Link>
        </div>

        {/* FEEDBACK DELL'INVIO */}
        {success && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-start gap-3">
            <Check className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-emerald-900 text-sm">Articolo Pubblicato con Successo!</h4>
              <p className="text-xs text-emerald-700 mt-0.5">La scheda &ldquo;Blog&rdquo; si è attivata ed è ora visibile sul tuo sito web. Puoi vederlo direttamente nella lista degli approfondimenti.</p>
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
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-2">URL Immagine di Copertina (Opzionale)</label>
            <div className="relative flex items-center">
              <ImageIcon className="absolute left-4 h-4 w-4 text-stone-400" />
              <input
                type="url"
                placeholder="Incolla l'indirizzo di un'immagine (Es: da Unsplash)"
                className="w-full bg-[#FAF9F5] border border-stone-200 focus:border-stone-400 rounded-xl p-4 pl-12 text-stone-900 placeholder-stone-400 transition-all outline-none text-sm"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
              />
            </div>
          </div>

          {/* ⚡ TEXTAREA OTTIMIZZATA: SPAZIOSA, INTEGRATA E RIDIMENSIONABILE TRASCINANDO IL BORDO */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-2">
              Testo dell&apos;Articolo (Andare a capo normalmente per creare i paragrafi)
            </label>
            <textarea
              required
              rows={22}
              placeholder="Scrivi qui il tuo articolo. Vai a capo normalmente per separare i paragrafi. Il sistema formatterà e impaginerà tutto in modo automatico."
              className="w-full min-h-[450px] bg-[#FAF9F5] border border-stone-200 focus:border-stone-400 rounded-xl p-5 text-stone-900 placeholder-stone-400 transition-all outline-none text-sm leading-relaxed resize-y shadow-inner"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone-150">
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem('admin_phone');
                setIsAuthenticated(false);
              }}
              className="text-xs font-bold text-stone-400 hover:text-red-650 transition-colors"
            >
              Disconnetti sessione
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-sm px-8 py-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md active:scale-[0.99]"
            >
              <Check className="h-4 w-4" />
              <span>{loading ? "Pubblicazione in corso..." : "Pubblica sul Sito"}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
