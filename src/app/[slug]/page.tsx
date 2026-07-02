// src/app/[slug]/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import TemplateSecurity from '@/components/TemplateSecurity';
import TemplateAutomotive from '@/components/TemplateAutomotive'; // Importa il nuovo template

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SitePage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // 1. Chiediamo a Supabase i dati del sito
  const { data: site, error } = await supabase
    .from('omnia_sites')
    .select('*')
    .eq('slug', slug)
    .single();

  // 2. Se non esiste o non è attivo, restituiamo 404
  if (error || !site || !site.is_active) {
    return notFound();
  }

  const siteData = site.site_data;

  // 3. SWITCH ROUTER: Smista in base al template_id
  if (site.template_id === 1) {
    return (
      <TemplateSecurity 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
      />
    );
  }

  if (site.template_id === 2) {
    return (
      <TemplateAutomotive 
        data={siteData} 
        nomeCliente={site.nome_cliente} 
      />
    );
  }

  // Fallback se nessun template corrisponde
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p>Sito configurato, ma nessun template visivo è assegnato a questo ID.</p>
    </div>
  );
}
