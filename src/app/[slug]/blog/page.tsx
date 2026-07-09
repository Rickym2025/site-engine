// src/app/[slug]/blog/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Calendar, ArrowRight, Clock } from 'lucide-react';
import React from 'react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogIndexPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // 1. Recuperiamo i dettagli essenziali del sito
  const { data: site } = await supabase
    .from('omnia_sites')
    .select('nome_cliente, site_data')
    .eq('slug', slug)
    .single();

  if (!site) return notFound();

  // 2. Recuperiamo l'elenco degli articoli pubblicati da questo specifico professionista
  const { data: posts } = await supabase
    .from('omnia_posts')
    .select('*')
    .eq('site_slug', slug)
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  const siteData = site.site_data as any;
  const brandColor = siteData?.brand_color || '#5F6F52';

  const customStyles = {
    '--brand-color': brandColor,
    '--brand-color-glow': `${brandColor}0d`,
  } as React.CSSProperties;

  return (
    <div 
      style={customStyles}
      className="min-h-screen bg-[#FAF9F5] text-stone-800 py-16 px-6 font-sans relative"
    >
      {/* BACKGROUND DI DESIGN CON GRIGLIA SFUMATA */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e6e4dc_1.2px,transparent_1.2px)] bg-[size:24px_24px] opacity-40" />
      </div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* INTESTAZIONE FLUIDA ED EDITORIALE */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-stone-200 pb-8 text-left">
          <div className="space-y-3">
            <span className="bg-[var(--brand-color-glow)] text-[var(--brand-color)] text-[10px] font-mono font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[var(--brand-color)]/10">
              Articoli & Approfondimenti
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-black text-stone-900 tracking-tight leading-tight">
              Lo Spazio di {site.nome_cliente}
            </h1>
          </div>
          <Link 
            href={`/${slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-950 bg-white border border-stone-200 px-5 py-3 rounded-xl shadow-sm transition-all w-fit active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" /> Torna alla Home
          </Link>
        </div>

        {/* LISTATO ARTICOLI A GRIGLIA ASIMMETRICA */}
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white border border-stone-200/60 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between text-left"
              >
                <div>
                  {post.cover_image && (
                    <div className="w-full h-52 overflow-hidden border-b border-stone-100">
                      <img 
                        src={post.cover_image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                    </div>
                  )}
                  <div className="p-6 md:p-8 space-y-4">
                    <div className="flex items-center gap-4 text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.created_at).toLocaleDateString('it-IT')}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        3 min lettura
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-stone-900 leading-snug">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-xs md:text-sm text-stone-500 leading-relaxed font-light">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="p-6 md:p-8 pt-0">
                  <Link 
                    href={`/${slug}/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase text-stone-900 hover:text-[var(--brand-color)] transition-colors"
                  >
                    <span>Leggi Articolo Completo</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* SCHERMATA FALLBACK SE IL BLOG È VUOTO */
          <div className="py-24 text-center bg-white border border-stone-200 rounded-[36px] space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-[#FAF9F5] border border-stone-200/60 rounded-full flex items-center justify-center mx-auto text-stone-400 shadow-inner">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-stone-900">Nessun approfondimento pubblicato</h3>
              <p className="text-xs text-stone-500 font-light max-w-xs mx-auto">Lo studio sta redigendo i primi articoli informativi. Torna a trovarci presto!</p>
            </div>
            <div className="pt-2">
              <Link 
                href={`/${slug}`}
                className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md"
              >
                Torna alla Home
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
