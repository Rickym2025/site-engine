// src/components/Gallery.tsx
"use client";

import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, X } from 'lucide-react';

interface GalleryProps {
  galleria?: string[];
  brandColor?: string;
  theme?: 'warm' | 'clean' | 'dark'; // Tre varianti grafiche che si adattano ai 9 template
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function Gallery({ 
  galleria, 
  brandColor = '#5F6F52', 
  theme = 'warm',
  title,
  subtitle,
  description
}: GalleryProps) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // Se non ci sono foto caricate, il componente si auto-distrugge istantaneamente con impatto visivo pari a zero
  if (!galleria || galleria.length === 0) return null;

  const customStyles = {
    '--gallery-brand': brandColor,
    '--gallery-brand-glow': `${brandColor}0d`,
    '--gallery-brand-strong': `${brandColor}26`,
  } as React.CSSProperties;

  // Renderizza il Lightbox sovrapposto quando un'immagine è selezionata
  const renderLightbox = () => {
    if (!selectedImg) return null;
    return (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm transition-all duration-300"
        onClick={() => setSelectedImg(null)}
      >
        <button
          className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-[10000] p-2 bg-neutral-900/50 rounded-full focus:outline-none"
          onClick={() => setSelectedImg(null)}
          aria-label="Chiudi galleria"
        >
          <X className="h-8 w-8" />
        </button>

        <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center">
          <img
            src={selectedImg}
            alt="Visualizzazione ingrandita"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    );
  };

  // 1. TEMA WARM (Serif, organico, bordi ultra-morbidi) - Es: L'Empatico, Il Sentiero, Il Creativo
  if (theme === 'warm') {
    const activeSubtitle = subtitle || "Accoglienza & Spazio";
    const activeTitle = title || "Uno Spazio Pensato per Sentirsi al Sicuro";
    const activeDesc = description || "Le immagini dello studio privato e dei nostri incontri divulgativi sul territorio. Ogni dettaglio è pensato con cura per garantire il massimo livello di comfort emotivo, riservatezza e accoglienza fin dal primo colloquio.";

    return (
      <section style={customStyles} className="py-24 bg-[#FAF9F5] border-t border-stone-200/50 px-6 relative z-10 text-left font-sans">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-mono text-[var(--gallery-brand)] uppercase tracking-widest font-black flex items-center gap-1.5">
              <Sparkles className="h-4.5 w-4.5 text-[var(--gallery-brand)]" />
              {activeSubtitle}
            </span>
            <h2 className="text-3xl font-serif font-black text-stone-900 tracking-tight leading-tight">
              {activeTitle}
            </h2>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              {activeDesc}
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {galleria.map((url, idx) => (
              <div 
                key={idx} 
                className="h-60 rounded-[32px] overflow-hidden border border-stone-200/60 shadow-sm hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                onClick={() => setSelectedImg(url)}
              >
                <img src={url} alt={`Dettaglio galleria ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
        {renderLightbox()}
      </section>
    );
  }

  // 2. TEMA CLEAN (Sans-Serif, geometrico, bordi squadrati) - Es: La Sorgente, Il Chirurgo, L'Autorità
  if (theme === 'clean') {
    const activeSubtitle = subtitle || "La Struttura";
    const activeTitle = title || "Sede e Strumentazione Medica";
    const activeDesc = description || "Esplora la nostra sede professionale e i nostri spazi dedicati. Sviluppiamo percorsi diagnostici e terapeutici avvalendoci di tecnologie e strumentazioni conformi ai massimi standard medici e sanitari vigenti.";

    return (
      <section style={customStyles} className="py-24 bg-white border-t border-gray-200/50 px-6 relative z-10 text-left font-sans">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest flex items-center gap-1.5">
              <ImageIcon className="h-4.5 w-4.5 text-sky-400" />
              {activeSubtitle}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {activeTitle}
            </h2>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              {activeDesc}
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {galleria.map((url, idx) => (
              <div 
                key={idx} 
                className="h-60 rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                onClick={() => setSelectedImg(url)}
              >
                <img src={url} alt={`Dettaglio galleria ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
        {renderLightbox()}
      </section>
    );
  }

  // 3. TEMA DARK (Obsidian, satinato, bordi traslucidi) - Es: L'Atelier, Il Regista, Il Guardiano, Il Sentiero
  const activeSubtitle = subtitle || "Atelier & Opere";
  const activeTitle = title || "I Nostri Spazi ed Esposizioni";
  const activeDesc = description || "Una galleria fotografica dei dettagli del nostro atelier e dei percorsi creativi. Diamo forma a opere originali attraverso la selezione di componenti nobili e una precisione artigianale maniacale.";

  return (
    <section style={customStyles} className="py-24 bg-[#0a0a0f] border-t border-zinc-900/60 px-6 relative z-10 text-left font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-4 space-y-4">
          <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-black flex items-center gap-1.5">
            <Sparkles className="h-4.5 w-4.5 text-purple-400 animate-pulse" />
            {activeSubtitle}
          </span>
          <h2 className="text-3xl font-serif font-black text-white tracking-tight leading-tight">
            {activeTitle}
          </h2>
          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            {activeDesc}
          </p>
        </div>
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {galleria.map((url, idx) => (
            <div 
              key={idx} 
              className="h-60 rounded-2xl overflow-hidden border border-zinc-800/80 shadow-lg hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
              onClick={() => setSelectedImg(url)}
            >
              <img src={url} alt={`Dettaglio galleria ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      {renderLightbox()}
    </section>
  );
}
