export default function PlayingCard({ value, revealed, result }) {
    const getCardContent = (val) => {
        if (!val) return '?';
        if (val === 1) return 'A';
        if (val === 11) return 'J';
        if (val === 12) return 'Q';
        if (val === 13) return 'K';
        return val;
    };

    return (
        <div className={`relative w-32 h-48 bg-white rounded-xl border-4 border-slate-300 shadow-2xl flex items-center justify-center transform transition-transform duration-500 ${revealed ? 'rotate-y-0' : 'rotate-y-180'}`}>
            {revealed ? (
                <div className="flex flex-col items-center animate-card-reveal">
                    <span className={`text-6xl font-black ${value === 7 ? 'text-green-600' : (value > 7 ? 'text-red-600' : 'text-blue-600')}`}>
                        {getCardContent(value)}
                    </span>
                    <span className="text-xs font-bold mt-2 text-slate-400">
                        {value === 7 ? 'HOUSE' : (value > 7 ? 'HIGH' : 'LOW')}
                    </span>
                </div>
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05)_0_8px,transparent_8px_16px)]"></div>
                    <span className="text-4xl text-slate-500 relative">?</span>
                </div>
            )}

            {revealed && result && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 rounded-lg backdrop-blur-[1px]">
                    <span className={`text-3xl font-black uppercase tracking-widest border-4 px-2 py-1 transform -rotate-12 shadow-lg ${result === 'WIN' ? 'text-green-400 border-green-400 bg-green-900/80' : 'text-red-500 border-red-500 bg-red-900/80'}`}>
                        {result}
                    </span>
                </div>
            )}
        </div>
    );
}
