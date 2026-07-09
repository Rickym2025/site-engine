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

  const siteData = site.site_data;

  // =========================================================================
  // ⚡ CONTROLLO AUTOMATICO PRESENZA ARTICOLI BLOG
  // =========================================================================
  const { data: posts } = await supabase
    .from('omnia_posts')
    .select('id')
    .eq('site_slug', slug)
    .eq('is_published', true)
    .limit(1);

  const hasBlog = !!(posts && posts.length > 0);
  // =========================================================================

  // =========================================================================
  // 🪐 GENERAZIONE AUTOMATICA E SISTEMATICA DEL JSON-LD (Dati Strutturati SEO)
  // =========================================================================
  let schemaType = "LocalBusiness"; 
  const settoreLower = (siteData.settore || "").toLowerCase();
  
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
    "description": siteData.hero?.subheadline || siteData.punti_forza || "",
    "url": `https://${site.slug}.rmstudio.app`, 
    "address": siteData.indirizzo ? {
      "@type": "PostalAddress",
      "streetAddress": siteData.indirizzo,
      "addressCountry": "IT"
    } : undefined,
    "telephone": siteData.telefono || undefined,
    "email": siteData.email || undefined,
    "image": siteData.logo_url || siteData.foto_profilo || undefined
  };

  const renderWithSeo = (templateComponent: React.ReactNode) => {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {templateComponent}
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
        hasBlog={hasBlog} // <--- Passiamo il flag del blog
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
        hasBlog={hasBlog} // <--- Passiamo il flag del blog
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
        hasBlog={hasBlog} // <--- Passiamo il flag del blog
      />
    );
  }

  if (site.template_id === 8) {
    return renderWithSeo(
      <Template_la_sorgente 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
        hasBlog={hasBlog} // <--- Passiamo il flag del blog
      />
    );
  }

  if (site.template_id === 9) {
    return renderWithSeo(
      <Template_il_sentiero 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
        hasBlog={hasBlog} // <--- Passiamo il flag del blog
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
