// src/components/ReviewsMarquee.tsx
"use client";

import React from 'react';

interface Review {
  autore: string;
  testo: string;
  ruolo?: string;
}

interface ReviewsMarqueeProps {
  recensioni?: Review[];
  brandColor?: string;
}

export default function ReviewsMarquee({ recensioni, brandColor = '#5F6F52' }: ReviewsMarqueeProps) {
  if (!recensioni || recensioni.length === 0) return null;

  // Genera un background a contrasto e un bordo basati sul brand color del lead
  const customStyles = {
    '--marquee-brand': brandColor,
    '--marquee-bg': `${brandColor}0d`, // Sfondo morbido e leggermente colorato
    '--marquee-border': `${brandColor}20`,
  } as React.CSSProperties;

  // Triplichiamo l'array per garantire una transizione infinita e fluida senza scatti
  const tripledReviews = [...recensioni, ...recensioni, ...recensioni];

  return (
    <section 
      style={customStyles} 
      className="py-20 bg-[var(--marquee-bg)] border-y border-[var(--marquee-border)] overflow-hidden relative z-10 text-left font-sans"
    >
      <div className="max-w-6xl mx-auto px-6 mb-10 text-center sm:text-left">
        <span className="text-[10px] font-mono text-[var(--marquee-brand)] uppercase tracking-widest font-black">
          Dicono di me
        </span>
        <h2 className="text-3xl font-serif font-black text-stone-900 tracking-tight leading-tight mt-1">
          Le Esperienze dei Pazienti
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="relative flex w-full overflow-x-hidden">
        <div className="flex gap-6 animate-[marquee_45s_linear_infinite] whitespace-nowrap hover:[animation-play-state:paused] py-2">
          {tripledReviews.map((rev, idx) => (
            <div 
              key={idx} 
              className="inline-block w-[300px] md:w-[420px] bg-white border border-stone-200/60 p-6 rounded-[28px] shadow-sm whitespace-normal text-left shrink-0 transition-transform duration-300 hover:scale-[1.01]"
            >
              <p className="text-sm text-stone-600 font-light leading-relaxed mb-6">
                "{rev.testo}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--marquee-bg)] text-[var(--marquee-brand)] font-serif font-black text-sm flex items-center justify-center border border-[var(--marquee-border)]">
                  {rev.autore.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{rev.autore}</h4>
                  {rev.ruolo && <p className="text-[10px] text-stone-400 font-mono mt-0.5">{rev.ruolo}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Definizione dei fotogrammi chiave per l'animazione infinita */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.3333%); }
        }
      `}</style>
    </section>
  );
}
