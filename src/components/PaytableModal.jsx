import EmojiIcon from './EmojiIcon.jsx';
import { BarIcon, SevenIcon, SevenThreeIcon } from './icons.jsx';

const Cherry      = (p) => <EmojiIcon codepoint="1f352" {...p} />;
const Watermelon  = (p) => <EmojiIcon codepoint="1f349" {...p} />;
const Orange      = (p) => <EmojiIcon codepoint="1f34a" {...p} />;
const Bell        = (p) => <EmojiIcon codepoint="1f514" {...p} />;
const Strawberry  = (p) => <EmojiIcon codepoint="1f353" {...p} />;

const PAYTABLE_ROWS = [
    { id: 'seven3',     icon: SevenThreeIcon, label: '777',         payout: 400 },
    { id: 'seven',      icon: SevenIcon,      label: '7',           payout: 200 },
    { id: 'mixed7',     icon: null,           label: 'Mixed 7s',    payout: 100, note: 'Any 7+777' },
    { id: 'bar3',       icon: () => <BarIcon count={3} />, label: '3-BAR',  payout: 100 },
    { id: 'bar2',       icon: () => <BarIcon count={2} />, label: '2-BAR',  payout: 50 },
    { id: 'bar1',       icon: () => <BarIcon count={1} />, label: '1-BAR',  payout: 30 },
    { id: 'strawberry', icon: Strawberry,     label: 'Strawberry',  payout: 20 },
    { id: 'bell',       icon: Bell,           label: 'Bell',        payout: 18 },
    { id: 'cherry3',    icon: Cherry,         label: 'Cherry x3',   payout: 10 },
    { id: 'watermelon', icon: Watermelon,     label: 'Watermelon',  payout: 10 },
    { id: 'orange',     icon: Orange,         label: 'Orange',      payout: 10 },
    { id: 'anybar',     icon: null,           label: 'Any Bar',     payout: 10, note: 'Mixed Bars' },
    { id: 'cherry2',    icon: Cherry,         label: 'Cherry x2',   payout: 5,  note: 'Front 2' },
    { id: 'cherry1',    icon: Cherry,         label: 'Cherry x1',   payout: 2,  note: 'Front 1' },
];

export default function PaytableModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-slate-800 p-6 rounded-2xl max-w-sm w-full border border-slate-500 shadow-[0_0_40px_rgba(56,189,248,0.3)]" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-600 pb-2">Paytable (x Line Bet)</h2>
        <div className="space-y-2 text-sm max-h-[60vh] overflow-y-auto custom-scrollbar">
            {PAYTABLE_ROWS.map((row, idx) => {
                const Icon = row.icon;
                return (
                    <div key={idx} className={`grid grid-cols-12 items-center p-2 rounded ${idx % 2 === 0 ? 'bg-slate-700/30' : 'bg-slate-700/10'}`}>
                         <div className="col-span-3 flex justify-center items-center h-9">
                            {Icon
                              ? <Icon size={28} />
                              : <span className="font-bold text-xs text-purple-400">MIXED</span>}
                         </div>
                         <div className="col-span-6 text-left pl-2">
                             <div className="font-bold text-sm text-slate-100">{row.label}</div>
                             {row.note && <div className="text-[10px] text-slate-400">{row.note}</div>}
                         </div>
                         <div className="col-span-3 text-right font-mono text-yellow-400 font-bold text-sm">x{row.payout}</div>
                    </div>
                );
            })}
        </div>
        <div className="mt-4 p-3 bg-cyan-900/30 border border-cyan-500/30 rounded text-xs text-cyan-200">
            <p className="font-bold mb-1">UPDATES:</p>
            <ul className="list-disc pl-4 space-y-1">
                <li><strong>All Fruits:</strong> ANY 9 Fruits = JACKPOT!</li>
                <li><strong>Double Up:</strong> Gamble your winnings!</li>
            </ul>
        </div>
        <div className="mt-3 text-[10px] text-slate-500 text-center">
            Fruit/bell icons: Twemoji (CC-BY 4.0)
        </div>
      </div>
    </div>
  );
}
