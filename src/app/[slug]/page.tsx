// src/app/[slug]/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import React from 'react';

// IMPORTAZIONE SEMPLICE E COERENTE DEI TEMPLATE IN ITALIANO
import Template_il_guardiano from '@/components/Template_il_guardiano'; // Template 1
import Template_l_atelier from '@/components/Template_l_atelier';       // Template 2
import Template_il_chirurgo from '@/components/Template_il_chirurgo';   // Template 3
import Template_l_autorita from '@/components/Template_l_autorita';     // Template 4 (Google-Approved)
import Template_il_creativo from '@/components/Template_il_creativo';   // Template 5
import Template_il_regista from '@/components/Template_il_regista';     // Template 6 (Showcase Video)
import Template_l_empatico from '@/components/Template_l_empatico';     // Template 7 (Psicologi Verde)
import Template_la_sorgente from '@/components/Template_la_sorgente';   // Template 8 (Psicologi Zen)
import Template_il_sentiero from '@/components/Template_il_sentiero';   // Template 9 (Psicologi Forest)

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SitePage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // 1. Chiediamo i dati del sito a Supabase
  const { data: site, error } = await supabase
    .from('omnia_sites')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !site || !site.is_active) {
    return notFound();
  }

  // =========================================================================
  // ⚡ PARSING DIFENSIVO DI SITE_DATA (Risolve il crash del 'headline')
  // =========================================================================
  let siteData = site.site_data;
  if (typeof siteData === 'string') {
    try {
      siteData = JSON.parse(siteData);
    } catch (e) {
      console.error("Errore durante il parsing JSON di site_data:", e);
    }
  }
  // =========================================================================

  // =========================================================================
  // ⚡ CONTROLLO AUTOMATICO PRESENZA ARTICOLI BLOG (Coercizione booleana pura)
  // =========================================================================
  const hasBlog = !!(siteData?.blog_posts && siteData.blog_posts.length > 0);
  // =========================================================================

  // =========================================================================
  // 🪐 GENERAZIONE AUTOMATICA E SISTEMATICA DEL JSON-LD (Dati Strutturati SEO)
  // =========================================================================
  let schemaType = "LocalBusiness"; 
  const settoreLower = (siteData?.settore || "").toLowerCase();
  
  if (
    settoreLower.includes("psicolog") || 
    settoreLower.includes("psicoter") || 
    settoreLower.includes("medic") || 
    settoreLower.includes("terap") ||
    [3, 7, 8, 9].includes(site.template_id)
  ) {
    schemaType = "MedicalBusiness";
  } else if (
    settoreLower.includes("avvocat") || 
    settoreLower.includes("legale") || 
    settoreLower.includes("studio leg")
  ) {
    schemaType = "Attorney";
  } else if (
    settoreLower.includes("consul") || 
    settoreLower.includes("coach") || 
    site.template_id === 4
  ) {
    schemaType = "ProfessionalService";
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": site.nome_cliente,
    "description": siteData?.hero?.subheadline || siteData?.punti_forza || "",
    "url": `https://${site.slug}.rmstudio.app`, 
    "address": siteData?.indirizzo ? {
      "@type": "PostalAddress",
      "streetAddress": siteData.indirizzo,
      "addressCountry": "IT"
    } : undefined,
    "telephone": siteData?.telefono || undefined,
    "email": siteData?.email || undefined,
    "image": siteData?.logo_url || siteData?.foto_profilo || undefined
  };

  // Funzione di utilità per incapsulare il template scelto mantenendo intatto il tag script invisibile e il pulsante magico
  const renderWithSeo = (templateComponent: React.ReactNode) => {
    return (
      <>
        {/* Iniettiamo il tag script richiesto da Google per la SEO locale */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* 🪄 SCRIPT E BOTTONE MAGIC LINK: Sblocca il pulsante Scrivi Blog invisibile agli utenti comuni */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                
                // Se la URL contiene ?editor=true, sblocchiamo per sempre l'editor su questo browser
                if (window.location.search.includes('editor=true')) {
                  localStorage.setItem('is_editor', 'true');
                }
                
                // Controlla la presenza del pulsante nel DOM con un sondaggio rapido (evita i problemi di asincronia di React)
                if (localStorage.getItem('is_editor') === 'true') {
                  var checkExist = setInterval(function() {
                    var btn = document.getElementById('magic-scrivi-blog-btn');
                    if (btn) {
                      btn.classList.remove('hidden');
                      clearInterval(checkExist);
                    }
                  }, 50);
                  
                  // Timeout di sicurezza dopo 4 secondi per evitare cicli infiniti
                  setTimeout(function() { clearInterval(checkExist); }, 4000);
                }
              })();
            `
          }}
        />

        {templateComponent}

        {/* Pulsante magico fluttuante invisibile di default */}
        <a
          id="magic-scrivi-blog-btn"
          href={`/${slug}/admin`}
          className="hidden fixed bottom-6 right-6 z-[999] bg-[#0d0f17] text-white hover:bg-stone-900 border border-zinc-800/80 px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all scale-100 hover:scale-105 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pen-line"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          <span>Scrivi Blog</span>
        </a>
      </>
    );
  };
  // =========================================================================

  // 3. SMISTAMENTO DEI TEMPLATE COERENTE IN ITALIANO
  if (site.template_id === 1) {
    return renderWithSeo(
      <Template_il_guardiano 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
        hasBlog={hasBlog}
      />
    );
  }

  if (site.template_id === 2) {
    return renderWithSeo(
      <Template_l_atelier 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
        hasBlog={hasBlog}
      />
    );
  }

  if (site.template_id === 3) {
    return renderWithSeo(
      <Template_il_chirurgo 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
        hasBlog={hasBlog}
      />
    );
  }

  if (site.template_id === 4) {
    return renderWithSeo(
      <Template_l_autorita 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
        hasBlog={hasBlog}
      />
    );
  }

  if (site.template_id === 5) {
    return renderWithSeo(
      <Template_il_creativo 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
        hasBlog={hasBlog}
      />
    );
  }

  if (site.template_id === 6) {
    return renderWithSeo(
      <Template_il_regista 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
        hasBlog={hasBlog}
      />
    );
  }

  if (site.template_id === 7) {
    return renderWithSeo(
      <Template_l_empatico 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
        hasBlog={hasBlog}
      />
    );
  }

  if (site.template_id === 8) {
    return renderWithSeo(
      <Template_la_sorgente 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
        hasBlog={hasBlog}
      />
    );
  }

  if (site.template_id === 9) {
    return renderWithSeo(
      <Template_il_sentiero 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
        hasBlog={hasBlog}
      />
    );
  }

  // Fallback se nessun template corrisponde
  return renderWithSeo(
    <Template_l_autorita 
      data={siteData} 
      nomeCliente={site.nome_cliente} 
      slug={site.slug}
      hasBlog={hasBlog}
    />
  );
}
