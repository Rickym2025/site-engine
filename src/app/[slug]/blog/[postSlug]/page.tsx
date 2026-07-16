// src/app/[slug]/blog/[postSlug]/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import React from 'react';

interface PageProps {
  params: Promise<{ slug: string; postSlug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug, postSlug } = resolvedParams;

  // 1. Recuperiamo i dettagli del sito
  const { data: site } = await supabase
    .from('omnia_sites')
    .select('nome_cliente, site_data')
    .eq('slug', slug)
    .single();

  if (!site) return notFound();

  let siteData = site.site_data as any;
  if (typeof siteData === 'string') {
    try { siteData = JSON.parse(siteData); } catch (e) {}
  }

  // 2. Cerchiamo il post direttamente nell'array del JSON unico
  const post = siteData?.blog_posts?.find((p: any) => p.slug === postSlug);

  if (!post) return notFound();

  const brandColor = siteData?.brand_color || '#5F6F52';

  const customStyles = {
    '--brand-color': brandColor,
    '--brand-color-glow': `${brandColor}0d`,
  } as React.CSSProperties;

  return (
    <div style={customStyles} className="min-h-screen bg-[#FAF9F5] text-stone-800 py-16 px-6 font-sans relative text-left">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e6e4dc_1.2px,transparent_1.2px)] bg-[size:24px_24px] opacity-40" />
      </div>

      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        <Link 
          href={`/${slug}/blog`}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-900 bg-white border border-stone-200 px-4 py-2.5 rounded-xl shadow-sm transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Vedi tutti gli articoli
        </Link>

        <article className="bg-white border border-stone-200/80 rounded-[40px] p-6 md:p-12 shadow-xl space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-xs font-mono text-stone-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {post.created_at || "Articolo"}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                3 min lettura
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-black text-stone-900 tracking-tight leading-tight">
              {post.title}
            </h1>
          </div>

          {post.cover_image && (
            <div className="w-full h-80 md:h-[400px] rounded-3xl overflow-hidden border border-stone-100 shadow-inner">
              <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Formattazione automatica del testo con Tailwind Typography */}
          <div className="prose prose-stone max-w-none prose-p:text-stone-600 prose-p:leading-relaxed prose-headings:font-serif">
            {post.content.split('\n').map((para: string, idx: number) => (
              <p key={idx} className="mb-6 font-light text-base leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
