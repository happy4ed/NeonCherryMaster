import { useState } from 'react';

const buildCoins = (count) => Array.from({ length: count }).map((_, i) => ({
  key: i,
  left: Math.random() * 100,
  delay: Math.random() * 1.2,
  duration: 1.6 + Math.random() * 1.6,
  size: 18 + Math.random() * 18,
  drift: (Math.random() - 0.5) * 60,
  hue: 40 + Math.random() * 20,
  spin: 0.6 + Math.random() * 0.6,
}));

export default function CoinRain({ count = 40 }) {
  const [coins] = useState(() => buildCoins(count));

  return (
    <div className="fixed inset-0 z-[99] pointer-events-none overflow-hidden">
      {coins.map(c => (
        <div
          key={c.key}
          className="absolute -top-10 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.9)]"
          style={{
            left: `${c.left}%`,
            width: `${c.size}px`,
            height: `${c.size}px`,
            background: `radial-gradient(circle at 30% 30%, hsl(${c.hue},100%,75%) 0%, hsl(${c.hue},90%,50%) 60%, hsl(${c.hue},80%,30%) 100%)`,
            border: '2px solid rgba(255,215,0,0.7)',
            animation: `coinFall ${c.duration}s ${c.delay}s linear forwards, coinSpin ${c.spin}s linear infinite`,
            '--drift': `${c.drift}px`,
          }}
        >
          <div className="w-full h-full flex items-center justify-center text-yellow-900 font-black text-xs select-none">$</div>
        </div>
      ))}
    </div>
  );
}
