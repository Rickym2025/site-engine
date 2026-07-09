// src/app/[slug]/blog/[postSlug]/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import React from 'react';

interface PageProps {
  params: Promise<{ slug: string; postSlug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug, postSlug } = resolvedParams;

  // 1. Recupera l'articolo completo legato allo studio del cliente
  const { data: post, error } = await supabase
    .from('omnia_posts')
    .select('*, omnia_sites(nome_cliente)')
    .eq('site_slug', slug)
    .eq('slug', postSlug)
    .eq('is_published', true)
    .single();

  if (error || !post) {
    return notFound();
  }

  // Cast per accedere al join di Supabase in modo sicuro
  const site = post.omnia_sites as any;
  const nomeAutore = site?.nome_cliente || "Lo Studio";

  return (
    <article className="min-h-screen bg-[#FAF9F5] text-stone-850 py-16 px-6 font-sans">
      <div className="max-w-3xl mx-auto space-y-8 bg-white border border-stone-200 p-8 md:p-12 rounded-[36px] shadow-sm">
        
        {/* Pulsante Torna Indietro */}
        <Link 
          href={`/${slug}/blog`}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-900 bg-stone-50 border border-stone-200 px-4 py-2 rounded-xl transition-all w-fit"
        >
          <ArrowLeft className="h-4 w-4" /> Torna alla Lista
        </Link>

        {/* Intestazione dell'Articolo */}
        <div className="space-y-4 text-left">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {new Date(post.created_at).toLocaleDateString('it-IT')}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Scritto da: {nomeAutore}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-black text-stone-950 leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-sm md:text-base text-stone-500 font-light leading-relaxed italic">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Immagine di Copertina */}
        {post.cover_image && (
          <div className="w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden border border-stone-150">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Corpo dell'Articolo (Formattato) */}
        <div className="pt-6 border-t border-stone-200/80 text-left">
          <div 
            className="prose prose-stone lg:prose-lg max-w-none text-stone-700 leading-relaxed font-light space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>

      </div>
    </article>
  );
}
