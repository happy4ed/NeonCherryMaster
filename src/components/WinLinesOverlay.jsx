const LINE_PATHS = {
  0: 'M0,50 H100',
  1: 'M0,16.66 H100',
  2: 'M0,83.33 H100',
  3: 'M0,0 L100,100',
  4: 'M0,100 L100,0',
  5: 'M16.66,0 V100',
  6: 'M50,0 V100',
  7: 'M83.33,0 V100',
};

export default function WinLinesOverlay({ activeLines, color = 'red' }) {
  if (activeLines.length === 0) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <svg className="w-full h-full opacity-90" viewBox="0 0 100 100" preserveAspectRatio="none">
        {activeLines.map(lineIdx => {
          const d = LINE_PATHS[lineIdx];
          if (!d) return null;
          return (
            <path
              key={lineIdx}
              d={d}
              stroke={color}
              strokeWidth="1.2"
              fill="none"
              className="animate-pulse"
              style={{ filter: `drop-shadow(0 0 6px ${color})` }}
            />
          );
        })}
      </svg>
    </div>
  );
}
