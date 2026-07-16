import React from 'react';

interface SocialLinksProps {
  data: {
    social_fb?: string;
    social_ig?: string;
    social_linkedin?: string;
    social_youtube?: string; // per sviluppi futuri
  };
  brandColor?: string;
}

export default function SocialLinks({ data, brandColor = '#5F6F52' }: SocialLinksProps) {
  const { social_fb, social_ig, social_linkedin, social_youtube } = data;

  // Stile hover dinamico basato sul brand color
  const hoverStyle = {
    '--brand-color': brandColor,
  } as React.CSSProperties;

  return (
    <div style={hoverStyle} className="flex items-center space-x-3">
      {/* Facebook */}
      {social_fb && (
        <a href={social_fb} target="_blank" rel="noopener noreferrer" className="p-3 bg-stone-50 rounded-full border border-stone-200 text-stone-400 hover:text-stone-900 hover:border-[var(--brand-color)] transition-all" aria-label="Facebook">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
        </a>
      )}

      {/* Instagram */}
      {social_ig && (
        <a href={social_ig} target="_blank" rel="noopener noreferrer" className="p-3 bg-stone-50 rounded-full border border-stone-200 text-stone-400 hover:text-stone-900 hover:border-[var(--brand-color)] transition-all" aria-label="Instagram">
          <svg className="h-4 w-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
      )}

      {/* LinkedIn */}
      {social_linkedin && (
        <a href={social_linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-stone-50 rounded-full border border-stone-200 text-stone-400 hover:text-[#0a66c2] hover:border-[var(--brand-color)] transition-all" aria-label="LinkedIn">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
      )}
    </div>
  );
}
