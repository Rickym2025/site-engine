// src/proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Next.js 16 richiede l'esportazione della funzione nominata "proxy"
export async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get('host') || '';

  const systemDomains = [
    'localhost:3000',
    'sitengine.rmstudio.app',
    'site-engine-flame.vercel.app'
  ];

  const isSystemDomain = systemDomains.some(domain => host.includes(domain));

  if (isSystemDomain) {
    return NextResponse.next();
  }

  const cleanHost = host.replace('www.', '');

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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

    if (data && data.length > 0) {
      const slug = data[0].slug;
      return NextResponse.rewrite(new URL(`/${slug}${url.pathname}`, request.url));
    }
  } catch (err) {
    console.error('Errore di routing nel Proxy:', err);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
