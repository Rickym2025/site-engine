// src/app/[slug]/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

// IMPORTAZIONE DEI 4 TEMPLATE
import TemplateHeroImage from '@/components/TemplateHeroImage'; // Template 1
import TemplateHeroVideo from '@/components/TemplateHeroVideo'; // Template 2
import TemplateBooking from '@/components/TemplateBooking';   // Template 3
import TemplateSEO from '@/components/TemplateSEO font';       // Template 4 (Google-Approved)

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

  // 2. Se il sito non esiste o non è attivo, mostriamo la pagina 404
  if (error || !site || !site.is_active) {
    return notFound();
  }

  const siteData = site.site_data;

  // 3. SMISTAMENTO DEI TEMPLATE STRUTTURALI
  if (site.template_id === 1) {
    return (
      <TemplateHeroImage 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
      />
    );
  }

  if (site.template_id === 2) {
    return (
      <TemplateHeroVideo 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
      />
    );
  }

  if (site.template_id === 3) {
    return (
      <TemplateBooking 
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

  // Fallback predefinito se nessun ID corrisponde (usa la struttura SEO completa)
  return (
    <TemplateSEO 
      data={siteData} 
      nomeCliente={site.nome_cliente} 
    />
  );
}
