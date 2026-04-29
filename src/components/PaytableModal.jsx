import { Cherry, Bell } from 'lucide-react';
import {
  WatermelonIcon,
  StrawberryIcon,
  OrangeIcon,
  BarIcon,
  SevenIcon,
  SevenThreeIcon,
} from './icons.jsx';

const PAYTABLE_ROWS = [
    { id: 'seven3', icon: SevenThreeIcon, color: 'text-red-600', label: '777', payout: 400 },
    { id: 'seven', icon: SevenIcon, color: 'text-blue-500', label: '7', payout: 200 },
    { id: 'mixed7', icon: null, color: 'text-purple-400', label: 'Mixed 7s', payout: 100, note: 'Any 7+777' },
    { id: 'bar3', icon: (props) => <BarIcon count={3} color="text-yellow-400" {...props} />, color: 'text-yellow-400', label: '3-BAR', payout: 100 },
    { id: 'bar2', icon: (props) => <BarIcon count={2} color="text-green-400" {...props} />, color: 'text-green-400', label: '2-BAR', payout: 50 },
    { id: 'bar1', icon: (props) => <BarIcon count={1} color="text-cyan-400" {...props} />, color: 'text-cyan-400', label: '1-BAR', payout: 30 },
    { id: 'strawberry', icon: StrawberryIcon, color: 'text-red-600', label: 'Strawberry', payout: 20 },
    { id: 'bell', icon: Bell, color: 'text-yellow-500', label: 'Bell', payout: 18 },
    { id: 'cherry3', icon: Cherry, color: 'text-red-500', label: 'Cherry x3', payout: 10 },
    { id: 'watermelon', icon: WatermelonIcon, color: 'text-green-800', label: 'Watermelon', payout: 10 },
    { id: 'orange', icon: OrangeIcon, color: 'text-orange-500', label: 'Orange', payout: 10 },
    { id: 'anybar', icon: null, color: 'text-slate-300', label: 'Any Bar', payout: 10, note: 'Mixed Bars' },
    { id: 'cherry2', icon: Cherry, color: 'text-red-500', label: 'Cherry x2', payout: 5, note: 'Front 2' },
    { id: 'cherry1', icon: Cherry, color: 'text-red-500', label: 'Cherry x1', payout: 2, note: 'Front 1' },
];

export default function PaytableModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-slate-800 p-6 rounded-2xl max-w-sm w-full border border-slate-500 shadow-[0_0_40px_rgba(56,189,248,0.3)]" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-600 pb-2">Paytable (x Line Bet)</h2>
        <div className="space-y-2 text-sm max-h-[60vh] overflow-y-auto custom-scrollbar">
            {PAYTABLE_ROWS.map((row, idx) => (
                <div key={idx} className={`grid grid-cols-12 items-center p-2 rounded ${idx % 2 === 0 ? 'bg-slate-700/30' : 'bg-slate-700/10'}`}>
                     <div className="col-span-3 flex justify-center">
                        {row.icon ? (
                            typeof row.icon === 'function' ?
                                <row.icon size={24} className={row.color} count={row.label.includes('3-BAR') ? 3 : row.label.includes('2-BAR') ? 2 : 1} color={row.color} />
                                : <row.icon size={24} className={row.color} />
                        ) : (
                            <span className={`font-bold text-xs ${row.color}`}>MIXED</span>
                        )}
                     </div>
                     <div className="col-span-6 text-left pl-2">
                         <div className={`font-bold text-sm ${row.color}`}>{row.label}</div>
                         {row.note && <div className="text-[10px] text-slate-400">{row.note}</div>}
                     </div>
                     <div className="col-span-3 text-right font-mono text-yellow-400 font-bold text-sm">x{row.payout}</div>
                </div>
            ))}
        </div>
        <div className="mt-4 p-3 bg-cyan-900/30 border border-cyan-500/30 rounded text-xs text-cyan-200">
            <p className="font-bold mb-1">UPDATES:</p>
            <ul className="list-disc pl-4 space-y-1">
                <li><strong>All Fruits:</strong> ANY 9 Fruits = JACKPOT!</li>
                <li><strong>Double Up:</strong> Gamble your winnings!</li>
            </ul>
        </div>
      </div>
    </div>
  );
}
