// src/app/[slug]/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

// IMPORTAZIONE SEMPLICE E COERENTE DEI TEMPLATE IN ITALIANO
import Template_il_guardiano from '@/components/Template_il_guardiano'; // Template 1
import Template_l_atelier from '@/components/Template_l_atelier';       // Template 2
import Template_il_chirurgo from '@/components/Template_il_chirurgo';   // Template 3
import TemplateSEO from '@/components/TemplateSEO';                     // Template 4

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
      />
    );
  }

  if (site.template_id === 2) {
    return (
      <Template_l_atelier 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
      />
    );
  }

  if (site.template_id === 3) {
    return (
      <Template_il_chirurgo 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
      />
    );
  }

  if (site.template_id === 4) {
    return (
      <TemplateSEO 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
      />
    );
  }

  // Fallback
  return (
    <Template_l_atelier 
      data={siteData} 
      nomeCliente={site.nome_cliente} 
    />
  );
}
