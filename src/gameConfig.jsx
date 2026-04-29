import { CircleDashed } from 'lucide-react';
import EmojiIcon from './components/EmojiIcon.jsx';
import { BarIcon, SevenIcon, SevenThreeIcon } from './components/icons.jsx';

export const SYMBOLS = [
  { id: 'cherry',     icon: (p) => <EmojiIcon codepoint="1f352" glow="rgba(239,68,68,0.6)"  {...p} />, color: 'text-red-500',    value: 10,  weight: 50 },
  { id: 'watermelon', icon: (p) => <EmojiIcon codepoint="1f349" glow="rgba(34,197,94,0.6)"  {...p} />, color: 'text-green-700',  value: 10,  weight: 90 },
  { id: 'orange',     icon: (p) => <EmojiIcon codepoint="1f34a" glow="rgba(251,146,60,0.7)" {...p} />, color: 'text-orange-500', value: 10,  weight: 80 },
  { id: 'bell',       icon: (p) => <EmojiIcon codepoint="1f514" glow="rgba(250,204,21,0.7)" {...p} />, color: 'text-yellow-500', value: 18,  weight: 30 },
  { id: 'bar1',       icon: () => <BarIcon count={1} />,                                               color: 'text-cyan-400',   value: 30,  weight: 25 },
  { id: 'bar2',       icon: () => <BarIcon count={2} />,                                               color: 'text-green-400',  value: 50,  weight: 15 },
  { id: 'bar3',       icon: () => <BarIcon count={3} />,                                               color: 'text-yellow-400', value: 100, weight: 10 },
  { id: 'seven',      icon: SevenIcon,                                                                 color: 'text-blue-500',   value: 200, weight: 5  },
  { id: 'seven3',     icon: SevenThreeIcon,                                                            color: 'text-red-600',    value: 400, weight: 2  },
  { id: 'strawberry', icon: (p) => <EmojiIcon codepoint="1f353" glow="rgba(220,38,38,0.7)"  {...p} />, color: 'text-red-600',    value: 20,  weight: 1  },
  { id: 'empty',      icon: (p) => <CircleDashed {...p} className="text-slate-800 opacity-20" />,      color: 'text-slate-700',  value: 0,   weight: 0  },
  { id: 'lemon',      icon: (p) => <EmojiIcon codepoint="1f34b" glow="rgba(250,204,21,0.7)" {...p} />, color: 'text-yellow-400', value: 10,  weight: 50 },
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
  [3, 4, 5],
  [0, 1, 2],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
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
