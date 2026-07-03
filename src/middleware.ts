// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'; // CORRETTO: da 'next/server' e non 'next/request'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get('host') || '';

  // 1. Definiamo i domini principali di RM Studio da ignorare (devono comportarsi normalmente)
  const systemDomains = [
    'localhost:3000',
    'sitengine.rmstudio.app',
    'site-engine-flame.vercel.app'
  ];

  const isSystemDomain = systemDomains.some(domain => host.includes(domain));

  // Se la richiesta arriva dai nostri domini di gestione, non facciamo modifiche
  if (isSystemDomain) {
    return NextResponse.next();
  }

  // 2. Se è un dominio personalizzato, puliamo il "www." se presente
  const cleanHost = host.replace('www.', '');

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Chiamata REST ultra-rapida compatibile con l'ambiente Edge di Vercel
    const res = await fetch(
      `${supabaseUrl}/rest/v1/omnia_sites?custom_domain=eq.${cleanHost}&select=slug`,
      {
        headers: {
          apikey: supabaseKey!,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    const data = await res.json();

    // Se troviamo un'associazione tra il dominio e lo slug nel database, facciamo il Rewrite silente
    if (data && data.length > 0) {
      const slug = data[0].slug;
      
      // Riscriviamo internamente l'URL verso /[slug] mantenendo il dominio del cliente visibile
      return NextResponse.rewrite(new URL(`/${slug}${url.pathname}`, request.url));
    }
  } catch (err) {
    console.error('Errore di routing nel Middleware:', err);
  }

  // Se non troviamo nessuna associazione, procediamo normalmente
  return NextResponse.next();
}

// Configurazione dei percorsi su cui deve agire il middleware
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
