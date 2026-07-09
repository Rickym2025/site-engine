// src/app/[slug]/blog/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Calendar, ArrowRight } from 'lucide-react';
import React from 'react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogIndexPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // 1. Carica le info base dello studio
  const { data: site } = await supabase
    .from('omnia_sites')
    .select('nome_cliente')
    .eq('slug', slug)
    .single();

  if (!site) return notFound();

  // 2. Carica l'elenco degli articoli pubblicati per questo slug
  const { data: posts } = await supabase
    .from('omnia_posts')
    .select('*')
    .eq('site_slug', slug)
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-800 py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Intestazione */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-8 text-left">
          <div className="space-y-2">
            <span className="bg-stone-200/60 text-stone-700 text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full font-black">Spazio Approfondimenti</span>
            <h1 className="text-3xl font-serif font-black text-stone-950">Il Blog di {site.nome_cliente}</h1>
          </div>
          <Link 
            href={`/${slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-900 bg-white border border-stone-200 px-4 py-2.5 rounded-xl shadow-sm transition-all w-fit"
          >
            <ArrowLeft className="h-4 w-4" /> Torna al Sito
          </Link>
        </div>

        {/* Lista degli articoli */}
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white border border-stone-200/60 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left">
                <div>
                  {post.cover_image && (
                    <img src={post.cover_image} alt={post.title} className="w-full h-48 object-cover border-b border-stone-100" />
                  )}
                  <div className="p-6 md:p-8 space-y-4">
                    <p className="text-[10px] font-mono text-stone-400 uppercase tracking-wider flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.created_at).toLocaleDateString('it-IT')}
                    </p>
                    <h3 className="text-xl font-serif font-bold text-stone-950 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed font-light">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
                
                <div className="p-6 md:p-8 pt-0">
                  <Link 
                    href={`/${slug}/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase text-stone-900 hover:underline"
                  >
                    <span>Leggi Articolo</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-3">
            <BookOpen className="h-10 w-10 text-stone-300 mx-auto" />
            <h3 className="text-lg font-bold text-stone-800">Nessun articolo disponibile</h3>
            <p className="text-xs text-stone-500">Torna a trovarci presto, stiamo preparando i nostri approfondimenti.</p>
          </div>
        )}

      </div>
    </div>
  );
}
