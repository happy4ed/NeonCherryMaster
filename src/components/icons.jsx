// Custom casino-specific symbols (BAR, 7, 777 — no emoji equivalents).
// Fruits and bell now use Twemoji via EmojiIcon.

export const BarIcon = ({ count }) => {
  const palettes = {
    1: { from: '#22d3ee', to: '#0891b2', border: '#155e75', glow: 'rgba(34,211,238,0.7)' },
    2: { from: '#4ade80', to: '#16a34a', border: '#166534', glow: 'rgba(74,222,128,0.7)' },
    3: { from: '#fde047', to: '#ca8a04', border: '#713f12', glow: 'rgba(253,224,71,0.8)' },
  };
  const p = palettes[count] || palettes[1];

  return (
    <div
      className="relative w-16 h-11 rounded-md flex items-center justify-center overflow-hidden border-2"
      style={{
        background: `linear-gradient(145deg, ${p.from} 0%, ${p.to} 100%)`,
        borderColor: p.border,
        boxShadow: `0 0 14px ${p.glow}, inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.4)`,
      }}
    >
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-black text-black/80 tracking-[0.18em] scale-x-110 transform">BAR</span>
      </div>
      <span
        className="relative z-10 text-5xl font-black font-serif leading-none transform -translate-y-1"
        style={{
          color: '#dc2626',
          textShadow: '2px 2px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff, 3px 4px 0 rgba(0,0,0,0.35)',
        }}
      >
        {count}
      </span>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
};

export const SevenIcon = () => (
  <div className="relative flex items-center justify-center w-full h-full">
    <span
      className="font-black font-serif italic"
      style={{
        fontSize: '3rem',
        lineHeight: 1,
        background: 'linear-gradient(180deg, #93c5fd 0%, #2563eb 50%, #1e3a8a 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.9)) drop-shadow(0 2px 2px rgba(0,0,0,0.5))',
        WebkitTextStroke: '1px rgba(255,255,255,0.4)',
      }}
    >
      7
    </span>
  </div>
);

export const SevenThreeIcon = () => {
  const tripleStyle = {
    fontSize: '1.85rem',
    lineHeight: 1,
    background: 'linear-gradient(180deg, #fecaca 0%, #dc2626 50%, #7f1d1d 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 0 6px rgba(220,38,38,0.95)) drop-shadow(0 1px 2px rgba(0,0,0,0.6))',
    WebkitTextStroke: '1px rgba(255,215,0,0.55)',
    fontFamily: 'serif',
    fontWeight: 900,
    fontStyle: 'italic',
  };
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <span className="absolute" style={{ ...tripleStyle, transform: 'translate(-12px,-4px) rotate(-12deg)', zIndex: 0 }}>7</span>
      <span className="absolute" style={{ ...tripleStyle, zIndex: 10 }}>7</span>
      <span className="absolute" style={{ ...tripleStyle, transform: 'translate(12px,4px) rotate(12deg)', zIndex: 20 }}>7</span>
    </div>
  );
};
