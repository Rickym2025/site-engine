// src/app/api/generate/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Chiamiamo n8n lato server (Vercel -> Hetzner). Zero blocchi CORS!
    const response = await fetch('https://n8n.rmstudio.app/webhook/crea-sito-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Errore di risposta da n8n' }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Errore Proxy:', error);
    return NextResponse.json({ error: 'Errore interno del server proxy' }, { status: 500 });
  }
}
