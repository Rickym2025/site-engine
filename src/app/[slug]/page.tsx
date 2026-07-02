// src/app/[slug]/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import TemplateHeroImage from '@/components/TemplateHeroImage'; // Template 1
import TemplateHeroVideo from '@/components/TemplateHeroVideo'; // Template 2

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

  if (error || !site || !site.is_active) {
    return notFound();
  }

  const siteData = site.site_data;

  // 2. SMISTAMENTO DEI TEMPLATE STRUTTURALI
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

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p>Sito configurato, ma nessun template visivo è assegnato a questo ID.</p>
    </div>
  );
}
