// src/app/api/generate/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Log di sicurezza nel terminale di Vercel per tracciare cosa sta arrivando
    console.log('Avvio generazione sito per slug:', body.slug);

    // Chiamata di produzione a n8n su Hetzner (immune al blocco CORS)
    const response = await fetch('https://n8n.rmstudio.app/webhook/crea-sito-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug: body.slug,
        nome_cliente: body.nome_cliente,
        template_id: body.template_id,
        settore: body.settore,
        punti_forza: body.punti_forza,
        logo_url: body.logo_url || null,
        email: body.email || null,
        indirizzo: body.indirizzo || null,
        social_fb: body.social_fb || null,
        social_ig: body.social_ig || null
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('n8n ha risposto con un errore:', errorText);
      return NextResponse.json(
        { error: 'n8n non ha elaborato correttamente la richiesta.', details: errorText }, 
        { status: response.status }
      );
    }

    // LEGGE I DATI REALI CHE N8N HA SALVATO E LI RESTITUISCE AL BROWSER
    const responseData = await response.json();
    return NextResponse.json(responseData);

  } catch (error: any) {
    console.error('Errore critico nel Proxy Vercel:', error);
    return NextResponse.json(
      { error: 'Errore interno del server proxy.', message: error.message }, 
      { status: 500 }
    );
  }
}
