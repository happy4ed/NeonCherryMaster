import { Cherry, Bell, Banana, CircleDashed } from 'lucide-react';
import {
  WatermelonIcon,
  StrawberryIcon,
  OrangeIcon,
  BarIcon,
  SevenIcon,
  SevenThreeIcon,
} from './components/icons.jsx';

export const SYMBOLS = [
  { id: 'cherry', icon: Cherry, color: 'text-red-500', value: 10, weight: 50 },
  { id: 'watermelon', icon: WatermelonIcon, color: 'text-green-800', value: 10, weight: 90 },
  { id: 'orange', icon: OrangeIcon, color: 'text-orange-500', value: 10, weight: 80 },
  { id: 'bell', icon: Bell, color: 'text-yellow-500', value: 18, weight: 30 },
  { id: 'bar1', icon: (props) => <BarIcon count={1} color="text-cyan-400" {...props} />, color: 'text-cyan-400', value: 30, weight: 25 },
  { id: 'bar2', icon: (props) => <BarIcon count={2} color="text-green-400" {...props} />, color: 'text-green-400', value: 50, weight: 15 },
  { id: 'bar3', icon: (props) => <BarIcon count={3} color="text-yellow-400" {...props} />, color: 'text-yellow-400', value: 100, weight: 10 },
  { id: 'seven', icon: SevenIcon, color: 'text-blue-500', value: 200, weight: 5 },
  { id: 'seven3', icon: SevenThreeIcon, color: 'text-red-600', value: 400, weight: 2 },
  { id: 'strawberry', icon: StrawberryIcon, color: 'text-red-600', value: 20, weight: 1 },
  { id: 'empty', icon: (props) => <CircleDashed {...props} className="text-slate-800 opacity-20" />, color: 'text-slate-700', value: 0, weight: 0 },
  { id: 'lemon', icon: Banana, color: 'text-yellow-400', value: 10, weight: 50 },
];

export const BONUS_TARGETS = {
  CHERRY_TOTAL: 12,
  BELL_3: 7,
  BAR1_3: 1,
};

export const INITIAL_CREDITS = 3000;
export const INITIAL_JACKPOT = 0;
export const MAX_BET = 64;
export const SPIN_DURATION = 1500;
export const BONUS_SPINS_COUNT = 5;

export const STORAGE_KEYS = {
  JACKPOT: 'ncm_jackpot',
  STATS: 'ncm_stats',
};

export const DEFAULT_STATS = { spins: 0, wins: 0, largestWin: 0, jackpotCount: 0 };

export const WIN_LINES = [
  [3, 4, 5], // Line 1: Mid H
  [0, 1, 2], // Line 2: Top H
  [6, 7, 8], // Line 3: Bot H
  [0, 4, 8], // Line 4: Diag TL-BR
  [6, 4, 2], // Line 5: Diag BL-TR
  [0, 3, 6], // Line 6: Left V
  [1, 4, 7], // Line 7: Center V
  [2, 5, 8], // Line 8: Right V
];

export const isBar = (id) => ['bar1', 'bar2', 'bar3'].includes(id);
export const isSeven = (id) => ['seven', 'seven3'].includes(id);
export const isFruit = (id) => ['cherry', 'watermelon', 'orange', 'strawberry', 'lemon'].includes(id);

export const loadJackpot = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.JACKPOT);
    const n = raw == null ? NaN : Number(raw);
    return Number.isFinite(n) && n >= 0 ? n : INITIAL_JACKPOT;
  } catch {
    return INITIAL_JACKPOT;
  }
};

export const loadStats = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATS, ...parsed };
  } catch {
    return DEFAULT_STATS;
  }
};
