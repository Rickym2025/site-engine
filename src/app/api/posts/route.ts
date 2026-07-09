// src/app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Funzione per ripulire i numeri di telefono da spazi, trattini o prefissi per un confronto sicuro
function cleanPhoneNumber(phone: string): string {
  if (!phone) return "";
  return phone.replace(/[^0-9]/g, '');
}

// Funzione di utilità per trasformare il titolo in uno slug pulito compatibile con le URL
function stringToSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Funzione di utilità per convertire i ritorni a capo normali in tag HTML <p>
function formatTextToHtml(text: string): string {
  if (!text) return "";
  return text
    .split(/\n\s*\n/)
    .map(paragraph => {
      const cleanPara = paragraph.trim().replace(/\n/g, '<br />');
      return `<p>${cleanPara}</p>`;
    })
    .join('\n');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, slug, phone, title, excerpt, coverImage, rawContent } = body;

    if (!slug) {
      return NextResponse.json({ error: "Slug mancante" }, { status: 400 });
    }

    // 1. Recupero dati del sito da Supabase
    const { data: site, error: siteError } = await supabase
      .from('omnia_sites')
      .select('site_data')
      .eq('slug', slug)
      .single();

    if (siteError || !site) {
      return NextResponse.json({ error: "Sito non trovato" }, { status: 404 });
    }

    const siteData = site.site_data as any;
    const dbPhone = siteData?.telefono || siteData?.phone || "";

    // Verifica che i numeri di telefono corrispondano in modo pulito
    const isAuthorized = cleanPhoneNumber(dbPhone) === cleanPhoneNumber(phone) && cleanPhoneNumber(phone) !== "";

    if (!isAuthorized) {
      return NextResponse.json({ error: "Numero di telefono non autorizzato per questo studio" }, { status: 401 });
    }

    // Se l'azione richiesta è solo il controllo d'accesso (Login)
    if (action === "check-login") {
      return NextResponse.json({ success: true, authorized: true }, { status: 200 });
    }

    // Se l'azione è la pubblicazione dell'articolo
    if (action === "publish-post") {
      if (!title || !rawContent) {
        return NextResponse.json({ error: "Dati dell'articolo incompleti" }, { status: 400 });
      }

      const postSlug = stringToSlug(title);
      const htmlContent = formatTextToHtml(rawContent);

      const { data: newPost, error: postError } = await supabase
        .from('omnia_posts')
        .insert({
          site_slug: slug,
          title,
          slug: postSlug,
          excerpt: excerpt || title,
          content: htmlContent,
          cover_image: coverImage || null,
          is_published: true
        })
        .select()
        .single();

      if (postError) {
        console.error("Errore salvataggio post:", postError);
        return NextResponse.json({ error: "Impossibile salvare l'articolo" }, { status: 500 });
      }

      return NextResponse.json({ success: true, post: newPost }, { status: 200 });
    }

    return NextResponse.json({ error: "Azione non valida" }, { status: 400 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
