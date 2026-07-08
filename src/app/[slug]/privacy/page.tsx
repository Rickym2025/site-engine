// src/app/[slug]/privacy/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import React from 'react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PrivacyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // 1. Recuperiamo le info del cliente da Supabase
  const { data: site, error } = await supabase
    .from('omnia_sites')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !site || !site.is_active) {
    return notFound();
  }

  const siteData = site.site_data;
  const nome = site.nome_cliente || "Il Professionista";
  const email = siteData.email || "info@studio.it";
  const indirizzo = siteData.indirizzo || "Indirizzo dello Studio";
  const piva = siteData.piva || "IT01234567890 (Inserire P.IVA)";

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-850 py-16 px-6 font-sans">
      <div className="max-w-3xl mx-auto space-y-8 bg-white border border-stone-200 p-8 md:p-12 rounded-3xl shadow-sm">
        
        {/* Intestazione */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div className="flex items-center space-x-3 text-[color:var(--brand-color)]">
            <ShieldCheck className="h-8 w-8 text-emerald-600" />
            <div>
              <h1 className="text-xl font-bold text-stone-900 leading-none">Informativa sulla Privacy</h1>
              <p className="text-xs text-stone-500 font-mono mt-1">Conforme al Regolamento UE 2016/679 (GDPR)</p>
            </div>
          </div>
          <Link 
            href={`/${slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-900 bg-stone-50 border border-stone-200 px-4 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="h-4 w-4" /> Torna al Sito
          </Link>
        </div>

        {/* CONTENUTO INFORMATIVA LEGALE DINAMICA */}
        <div className="prose prose-stone max-w-none text-sm leading-relaxed space-y-6 text-left">
          
          <section>
            <h2 className="text-lg font-bold text-stone-950 mb-2">1. Titolare del Trattamento dei Dati</h2>
            <p className="text-stone-600">
              Il Titolare del trattamento dei dati personali raccolti attraverso questo sito web è <strong>{nome}</strong>, 
              con sede legale in <strong>{indirizzo}</strong>, P.IVA <strong>{piva}</strong> (di seguito denominato "Titolare"), 
              contattabile per qualsiasi chiarimento in merito alla privacy all'indirizzo email: <strong className="underline">{email}</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-950 mb-2">2. Tipologia di Dati Raccolti</h2>
            <p className="text-stone-600">
              I dati personali trattati tramite questo sito includono:
            </p>
            <ul className="list-disc pl-5 text-stone-600 space-y-1 mt-2">
              <li><strong>Dati di contatto:</strong> Nome, indirizzo email e/o numero di telefono inviati volontariamente dall'utente tramite il modulo di contatto o di prenotazione.</li>
              <li><strong>Dati di navigazione:</strong> Indirizzo IP, dati relativi al browser e tempi di permanenza sulle pagine, raccolti in forma aggregata e anonima per soli fini statistici e di sicurezza del server.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-950 mb-2">3. Finalità e Base Giuridica del Trattamento</h2>
            <p className="text-stone-600">
              Il trattamento dei dati è finalizzato esclusivamente a:
            </p>
            <ul className="list-disc pl-5 text-stone-600 space-y-1 mt-2">
              <li>Rispondere alle richieste di informazioni inviate dall'utente tramite il modulo del sito.</li>
              <li>Fornire il servizio di prenotazione per un primo colloquio conoscitivo o per appuntamenti terapeutici.</li>
            </ul>
            <p className="text-stone-600 mt-2">
              La base giuridica del trattamento si fonda sul <strong>consenso esplicito</strong> espresso dall'utente prima dell'invio dei moduli e sull'esecuzione di misure precontrattuali su richiesta dell'interessato.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-950 mb-2">4. Modalità di Trattamento e Conservazione</h2>
            <p className="text-stone-600">
              I dati personali sono trattati con strumenti informatici idonei a garantirne la massima riservatezza e sicurezza, in conformità alle misure di sicurezza del GDPR. I dati non saranno comunicati a terzi né trasferiti fuori dall'Unione Europea.
            </p>
            <p className="text-stone-600 mt-2">
              I dati saranno conservati per il tempo strettamente necessario a gestire la richiesta di contatto dell'utente o in conformità agli obblighi previsti dalla legge (es. cartella clinica o fatturazione sanitaria).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-950 mb-2">5. Diritti dell'Interessato</h2>
            <p className="text-stone-600">
              In ogni momento, l'utente può esercitare i diritti previsti dagli articoli 15-22 del GDPR, tra cui il diritto di accedere ai propri dati, richiederne la rettifica, la cancellazione ("diritto all'oblio"), la limitazione del trattamento o l'opposizione al trattamento stesso. Le richieste vanno indirizzate via email al Titolare del Trattamento a: <strong className="underline">{email}</strong>.
            </p>
          </section>

          <section className="border-t border-stone-200 pt-6">
            <p className="text-xs text-stone-400">
              Ultimo aggiornamento della presente informativa sulla privacy: luglio 2026.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
