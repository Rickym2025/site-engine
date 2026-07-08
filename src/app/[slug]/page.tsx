// src/app/[slug]/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

// IMPORTAZIONE SEMPLICE E COERENTE DEI TEMPLATE IN ITALIANO
import Template_il_guardiano from '@/components/Template_il_guardiano'; // Template 1
import Template_l_atelier from '@/components/Template_l_atelier';       // Template 2
import Template_il_chirurgo from '@/components/Template_il_chirurgo';   // Template 3
import Template_l_autorita from '@/components/Template_l_autorita';     // Template 4 (Google-Approved)
import Template_il_creativo from '@/components/Template_il_creativo';   // Template 5
import Template_il_regista from '@/components/Template_il_regista';     // Template 6 (Showcase Video)
import Template_l_empatico from '@/components/Template_l_empatico';     // Template 7
import Template_la_sorgente from '@/components/Template_la_sorgente';   // Template 8
import Template_il_sentiero from '@/components/Template_il_sentiero';   // Template 9

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SitePage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // 1. Chiediamo i dati a Supabase
  const { data: site, error } = await supabase
    .from('omnia_sites')
    .select('*')
    .eq('slug', slug)
    .single();

  // 2. Se non esiste o non è attivo, 404
  if (error || !site || !site.is_active) {
    return notFound();
  }

  const siteData = site.site_data;

  // 3. SMISTAMENTO DEI TEMPLATE COERENTE IN ITALIANO
  if (site.template_id === 1) {
    return (
      <Template_il_guardiano 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
      />
    );
  }

  if (site.template_id === 2) {
    return (
      <Template_l_atelier 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
      />
    );
  }

  if (site.template_id === 3) {
    return (
      <Template_il_chirurgo 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
      />
    );
  }

  if (site.template_id === 4) {
    return (
      <Template_l_autorita 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
      />
    );
  }

  if (site.template_id === 5) {
    return (
      <Template_il_creativo 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
      />
    );
  }

  if (site.template_id === 6) {
    return (
      <Template_il_regista 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
      />
    );
  }

  if (site.template_id === 7) {
    return (
      <Template_l_empatico 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
      />
    );
  }

  if (site.template_id === 8) {
    return (
      <Template_la_sorgente 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
        slug={site.slug}
      />
    );
  }

  if (site.template_id === 9) {
    return (
      <Template_il_sentiero 
        data={siteData} 
        nomeCliente={site.nome_cliente}
        slug={site.slug}
      />
    );
  }

  // Fallback se nessun template corrisponde
  return (
    <Template_l_autorita 
      data={siteData} 
      nomeCliente={site.nome_cliente} 
    />
  );
}
