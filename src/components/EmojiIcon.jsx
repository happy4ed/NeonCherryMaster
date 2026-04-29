// Twemoji SVG icons (CC-BY 4.0, https://github.com/jdecked/twemoji)
const TWEMOJI_BASE = 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg';

export default function EmojiIcon({ codepoint, size = 44, className = '', glow }) {
  const url = `${TWEMOJI_BASE}/${codepoint}.svg`;
  const filter = glow
    ? `drop-shadow(0 0 6px ${glow}) drop-shadow(0 2px 4px rgba(0,0,0,0.6))`
    : 'drop-shadow(0 2px 6px rgba(0,0,0,0.5)) drop-shadow(0 0 3px rgba(255,255,255,0.3))';
  return (
    <img
      src={url}
      alt=""
      width={size}
      height={size}
      draggable={false}
      className={`pointer-events-none ${className}`}
      style={{ filter, imageRendering: 'auto' }}
    />
  );
}
