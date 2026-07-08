// src/components/GoogleMap.tsx
import React from 'react';

interface GoogleMapProps {
  address?: string;
  zoom?: number;
}

export default function GoogleMap({ address, zoom = 14 }: GoogleMapProps) {
  if (!address) return null;

  // Codifica l'indirizzo per renderlo sicuro all'interno di un URL
  const encodedAddress = encodeURIComponent(address);
  
  // URL dell'Iframe di Google Maps ufficiale e gratuito
  const embedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-zinc-200/50 shadow-inner relative z-10">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={embedUrl}
      ></iframe>
    </div>
  );
}
