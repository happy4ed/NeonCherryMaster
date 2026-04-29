export const WatermelonIcon = () => (
  <div className="relative flex items-center justify-center w-full h-full drop-shadow-md scale-110">
    <div className="w-10 h-10 bg-green-900 border-2 border-green-600 rounded-full shadow-[0_0_18px_rgba(21,128,61,0.9)] overflow-hidden relative">
        <div className="absolute left-2 top-0 bottom-0 w-1 bg-black/60 transform -skew-x-12 blur-[1px]"></div>
        <div className="absolute left-5 top-0 bottom-0 w-1.5 bg-black/60 transform skew-x-6 blur-[1px]"></div>
        <div className="absolute right-2 top-0 bottom-0 w-1 bg-black/60 transform -skew-x-12 blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30"></div>
    </div>
    <div className="absolute top-2 right-3 w-2 h-2 bg-white/40 rounded-full blur-sm"></div>
  </div>
);

export const StrawberryIcon = () => (
  <div className="relative flex items-center justify-center w-full h-full drop-shadow-md scale-110">
    <div className="w-9 h-10 bg-gradient-to-b from-red-500 to-red-700 rounded-b-3xl rounded-t-xl border-2 border-red-400 shadow-[0_0_18px_rgba(220,38,38,0.9)] relative flex justify-center">
        <div className="absolute top-3 left-2 w-0.5 h-1 bg-yellow-200/80 rounded-full"></div>
        <div className="absolute top-3 right-2 w-0.5 h-1 bg-yellow-200/80 rounded-full"></div>
        <div className="absolute top-5 left-3 w-0.5 h-1 bg-yellow-200/80 rounded-full"></div>
        <div className="absolute top-5 right-3 w-0.5 h-1 bg-yellow-200/80 rounded-full"></div>
        <div className="absolute bottom-3 w-0.5 h-1 bg-yellow-200/80 rounded-full"></div>
        <div className="absolute top-1 left-2 w-2 h-1.5 bg-white/30 rounded-full blur-[1px]"></div>
    </div>
    <div className="absolute -top-1 w-10 h-4 flex justify-center">
        <div className="w-3 h-3 bg-green-500 rotate-45 transform -translate-x-1 border border-green-300 shadow-[0_0_5px_rgba(34,197,94,0.8)] rounded-sm"></div>
        <div className="w-3 h-3 bg-green-500 rotate-45 transform translate-x-1 border border-green-300 shadow-[0_0_5px_rgba(34,197,94,0.8)] rounded-sm"></div>
        <div className="w-3 h-3 bg-green-500 rotate-45 transform -translate-y-1 border border-green-300 shadow-[0_0_5px_rgba(34,197,94,0.8)] rounded-sm z-10"></div>
    </div>
  </div>
);

export const OrangeIcon = () => (
  <div className="relative flex items-center justify-center w-full h-full drop-shadow-md scale-110">
    <div className="w-10 h-10 bg-transparent border-4 border-orange-400 rounded-full shadow-[0_0_14px_rgba(251,146,60,0.9)]"></div>
    <div className="absolute inset-2 bg-gradient-to-br from-orange-300/40 to-orange-600/30 border-2 border-yellow-400 rounded-full shadow-[inset_0_0_10px_rgba(250,204,21,0.9)]"></div>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-green-500 rounded-t-full shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
    <div className="absolute top-2 left-3 w-1.5 h-1 bg-white/50 rounded-full blur-[1px]"></div>
  </div>
);

export const BarIcon = ({ count, color }) => {
  let bgClass = "bg-gray-300";
  let borderClass = "border-gray-500";

  const safeColor = color || '';

  if (safeColor.includes("cyan")) {
      bgClass = "bg-cyan-300";
      borderClass = "border-cyan-600";
  } else if (safeColor.includes("green")) {
      bgClass = "bg-green-300";
      borderClass = "border-green-600";
  } else if (safeColor.includes("yellow")) {
      bgClass = "bg-yellow-300";
      borderClass = "border-yellow-600";
  }

  return (
    <div className={`relative w-16 h-11 ${bgClass} border-b-4 border-r-4 ${borderClass} flex items-center justify-center shadow-md overflow-hidden rounded-sm`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-black text-black/80 tracking-[0.2em] scale-x-110 transform">BAR</span>
      </div>
      <span
        className="relative z-10 text-5xl font-black text-red-600 font-serif leading-none transform -translate-y-1"
        style={{
            textShadow: '2px 2px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff, 3px 3px 0 rgba(0,0,0,0.3)'
        }}
      >
        {count}
      </span>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cGF0aCBkPSJNLTEsMSBsMiwtMiBNMCw0IGw0LC00IE0zLDUgbDIsLTIiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-30 pointer-events-none"></div>
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
    </div>
  );
};

export const SevenThreeIcon = () => (
    <div className="relative flex items-center justify-center w-full h-full">
        <span className="absolute text-3xl font-black text-red-600 font-serif drop-shadow-[0_0_8px_rgba(220,38,38,0.9)] transform -translate-x-3 -translate-y-1 -rotate-12 z-0">7</span>
        <span className="absolute text-3xl font-black text-red-600 font-serif drop-shadow-[0_0_8px_rgba(220,38,38,0.9)] transform z-10">7</span>
        <span className="absolute text-3xl font-black text-red-600 font-serif drop-shadow-[0_0_8px_rgba(220,38,38,0.9)] transform translate-x-3 translate-y-1 rotate-12 z-20">7</span>
    </div>
);

export const SevenIcon = () => (
    <span className="font-bold text-4xl text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.9)] font-serif">7</span>
);
