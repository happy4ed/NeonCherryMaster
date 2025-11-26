import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Cherry, 
  Bell, 
  Banana, 
  Diamond, 
  Volume2,
  VolumeX,
  Info,
  CircleDashed, 
  DollarSign,
  ChevronsUp,
  Minus,
  ArrowBigUp,
  ArrowBigDown,
  HandCoins,
  Ghost,
  Sparkles
} from 'lucide-react';

// --- 커스텀 아이콘 컴포넌트 ---

const WatermelonIcon = () => (
  <div className="relative flex items-center justify-center w-full h-full drop-shadow-md scale-110">
    <div className="w-10 h-10 bg-green-900 border-2 border-green-600 rounded-full shadow-[0_0_15px_rgba(21,128,61,0.8)] overflow-hidden relative">
        <div className="absolute left-2 top-0 bottom-0 w-1 bg-black/60 transform -skew-x-12 blur-[1px]"></div>
        <div className="absolute left-5 top-0 bottom-0 w-1.5 bg-black/60 transform skew-x-6 blur-[1px]"></div>
        <div className="absolute right-2 top-0 bottom-0 w-1 bg-black/60 transform -skew-x-12 blur-[1px]"></div>
    </div>
    <div className="absolute top-2 right-3 w-2 h-2 bg-white/20 rounded-full blur-sm"></div>
  </div>
);

const StrawberryIcon = () => (
  <div className="relative flex items-center justify-center w-full h-full drop-shadow-md scale-110">
    <div className="w-9 h-10 bg-red-600 rounded-b-3xl rounded-t-xl border-2 border-red-400 shadow-[0_0_15px_rgba(220,38,38,0.8)] relative flex justify-center">
        <div className="absolute top-3 left-2 w-0.5 h-1 bg-yellow-200/80 rounded-full"></div>
        <div className="absolute top-3 right-2 w-0.5 h-1 bg-yellow-200/80 rounded-full"></div>
        <div className="absolute top-5 left-3 w-0.5 h-1 bg-yellow-200/80 rounded-full"></div>
        <div className="absolute top-5 right-3 w-0.5 h-1 bg-yellow-200/80 rounded-full"></div>
        <div className="absolute bottom-3 w-0.5 h-1 bg-yellow-200/80 rounded-full"></div>
    </div>
    <div className="absolute -top-1 w-10 h-4 flex justify-center">
        <div className="w-3 h-3 bg-green-500 rotate-45 transform -translate-x-1 border border-green-300 shadow-[0_0_5px_rgba(34,197,94,0.8)] rounded-sm"></div>
        <div className="w-3 h-3 bg-green-500 rotate-45 transform translate-x-1 border border-green-300 shadow-[0_0_5px_rgba(34,197,94,0.8)] rounded-sm"></div>
        <div className="w-3 h-3 bg-green-500 rotate-45 transform -translate-y-1 border border-green-300 shadow-[0_0_5px_rgba(34,197,94,0.8)] rounded-sm z-10"></div>
    </div>
  </div>
);

const OrangeIcon = () => (
  <div className="relative flex items-center justify-center w-full h-full drop-shadow-md scale-110">
    <div className="w-10 h-10 bg-transparent border-4 border-orange-400 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.8)]"></div>
    <div className="absolute inset-2 bg-orange-500/20 border-2 border-yellow-400 rounded-full shadow-[inset_0_0_8px_rgba(250,204,21,0.8)]"></div>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-green-500 rounded-t-full shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
  </div>
);

const BarIcon = ({ count, color }) => {
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
    </div>
  );
};

const SevenThreeIcon = () => (
    <div className="relative flex items-center justify-center w-full h-full">
        <span className="absolute text-3xl font-black text-red-600 font-serif drop-shadow-md transform -translate-x-3 -translate-y-1 -rotate-12 z-0">7</span>
        <span className="absolute text-3xl font-black text-red-600 font-serif drop-shadow-md transform z-10">7</span>
        <span className="absolute text-3xl font-black text-red-600 font-serif drop-shadow-md transform translate-x-3 translate-y-1 rotate-12 z-20">7</span>
    </div>
);

const SevenIcon = () => (
    <span className="font-bold text-4xl text-blue-500 shadow-blue-500/50 drop-shadow-lg font-serif">7</span>
);

// --- 게임 설정 ---

const SYMBOLS = [
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
];

const BONUS_TARGETS = {
  CHERRY_TOTAL: 12, 
  BELL_3: 7,
  BAR1_3: 1
};

const INITIAL_CREDITS = 3000;
const INITIAL_JACKPOT = 0; 
const MAX_BET = 64; 
const SPIN_DURATION = 1500;
const BONUS_SPINS_COUNT = 5;

// 8 Winning Lines
const WIN_LINES = [
  [3, 4, 5], // Line 1: Mid H
  [0, 1, 2], // Line 2: Top H
  [6, 7, 8], // Line 3: Bot H
  [0, 4, 8], // Line 4: Diag TL-BR
  [6, 4, 2], // Line 5: Diag BL-TR (7-5-3)
  [0, 3, 6], // Line 6: Left V
  [1, 4, 7], // Line 7: Center V
  [2, 5, 8], // Line 8: Right V
];

// --- CSS Animations ---
const globalStyles = `
  .animate-spin-slow { animation: spin 3s linear infinite; }
  @keyframes spin { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }

  .animate-win-flash {
    animation: hyperFlash 0.8s ease-in-out infinite;
    z-index: 30;
  }
  
  @keyframes hyperFlash {
    0% { transform: scale(1.0); filter: brightness(100%); background-color: rgba(255,255,255,0); box-shadow: 0 0 0 transparent; }
    25% { transform: scale(1.1); filter: brightness(130%); background-color: rgba(255,255,0,0.3); box-shadow: 0 0 15px rgba(255,255,0,0.6); }
    50% { transform: scale(1.05); filter: brightness(150%); background-color: rgba(255,0,0,0.3); box-shadow: 0 0 25px rgba(255,0,0,0.8); }
    75% { transform: scale(1.1); filter: brightness(130%); background-color: rgba(0,255,255,0.3); box-shadow: 0 0 15px rgba(0,255,255,0.6); }
    100% { transform: scale(1.0); filter: brightness(100%); background-color: rgba(255,255,255,0); box-shadow: 0 0 0 transparent; }
  }

  .animate-celebration {
    animation: celebration 0.5s ease-in-out infinite;
  }
  @keyframes celebration {
    0% { box-shadow: 0 0 20px #ff0000, inset 0 0 20px #ff0000; border-color: #ff0000; }
    20% { box-shadow: 0 0 40px #ffff00, inset 0 0 40px #ffff00; border-color: #ffff00; }
    40% { box-shadow: 0 0 20px #00ff00, inset 0 0 20px #00ff00; border-color: #00ff00; }
    60% { box-shadow: 0 0 40px #00ffff, inset 0 0 40px #00ffff; border-color: #00ffff; }
    80% { box-shadow: 0 0 20px #0000ff, inset 0 0 20px #0000ff; border-color: #0000ff; }
    100% { box-shadow: 0 0 40px #ff00ff, inset 0 0 40px #ff00ff; border-color: #ff00ff; }
  }

  .card-flip { transition: transform 0.6s; transform-style: preserve-3d; }
  .card-flip.flipped { transform: rotateY(180deg); }

  /* Scrollbar Hide */
  .custom-scrollbar::-webkit-scrollbar { width: 4px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
`;

const LongPressButton = ({ onClick, onLongPress, children, disabled, className }) => {
    const timerRef = useRef(null);
    const isLongPress = useRef(false);

    const startPress = () => {
        if (disabled) return;
        isLongPress.current = false;
        timerRef.current = setTimeout(() => {
            isLongPress.current = true;
            if (onLongPress) onLongPress();
        }, 500); 
    };

    const endPress = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        if (!isLongPress.current && !disabled) {
            if (onClick) onClick();
        }
    };

    return (
        <button
            onMouseDown={startPress}
            onMouseUp={endPress}
            onMouseLeave={endPress}
            onTouchStart={startPress}
            onTouchEnd={(e) => { if (e.cancelable) e.preventDefault(); endPress(); }} 
            disabled={disabled}
            className={`${className} touch-manipulation`} // 터치 최적화
        >
            {children}
        </button>
    );
};

export default function App() {
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [jackpotPool, setJackpotPool] = useState(INITIAL_JACKPOT);
  const [bet, setBet] = useState(8);
  const [lastWin, setLastWin] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [grid, setGrid] = useState(Array(9).fill(0).map(() => Math.floor(Math.random() * (SYMBOLS.length - 1)))); 
  const [winningLines, setWinningLines] = useState([]); 
  const [centerBonus, setCenterBonus] = useState(false); 
  const [message, setMessage] = useState("INSERT COIN");
  const [autoSpin, setAutoSpin] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showPaytable, setShowPaytable] = useState(false);

  const [bonusCounts, setBonusCounts] = useState({ cherry: 0, bell3: 0 });
  const [bonusMode, setBonusMode] = useState(false);
  const [bonusSpinsLeft, setBonusSpinsLeft] = useState(0);
  const [bonusType, setBonusType] = useState(null); 

  const [doubleUpActive, setDoubleUpActive] = useState(false);
  const [doubleUpStage, setDoubleUpStage] = useState(0); 
  const [gambleAmount, setGambleAmount] = useState(0);
  const [cardValue, setCardValue] = useState(null); 
  const [cardRevealed, setCardRevealed] = useState(false);
  const [doubleUpResult, setDoubleUpResult] = useState(null); 
  const [cheatMode, setCheatMode] = useState(false); 
  const [cheatSequence, setCheatSequence] = useState([]); 
  const [celebrationActive, setCelebrationActive] = useState(false); 

  const [stats, setStats] = useState({ spins: 0, wins: 0, largestWin: 0, jackpotCount: 0 });

  const animationRef = useRef(null);
  const bettingIntervalRef = useRef(null); 

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
  }, [soundEnabled]);

  const increaseBet = useCallback(() => {
      setBet(prev => {
          if (prev >= MAX_BET) return prev;
          const next = prev + 1;
          // Check balance if needed, but arcade style usually allows betting until empty
          if (next > credits + prev) return prev; 
          return next;
      });
  }, [credits]);

  const decreaseBet = useCallback(() => {
      setBet(prev => Math.max(0, prev - 1));
  }, []);

  const startRapidIncrease = useCallback(() => {
      if (bettingIntervalRef.current) clearInterval(bettingIntervalRef.current);
      bettingIntervalRef.current = setInterval(() => {
          setBet(prev => {
              if (prev >= MAX_BET) {
                  clearInterval(bettingIntervalRef.current);
                  return prev;
              }
              return prev + 1;
          });
      }, 50); 
  }, []);

  const startRapidDecrease = useCallback(() => {
      if (bettingIntervalRef.current) clearInterval(bettingIntervalRef.current);
      bettingIntervalRef.current = setInterval(() => {
          setBet(prev => {
              if (prev <= 0) {
                  clearInterval(bettingIntervalRef.current);
                  return 0;
              }
              return prev - 1;
          });
      }, 50); 
  }, []);

  const stopRapidBet = useCallback(() => {
      if (bettingIntervalRef.current) {
          clearInterval(bettingIntervalRef.current);
          bettingIntervalRef.current = null;
      }
  }, []);

  const getLineBet = (lineIndex) => {
    if (bet === 0) return 0;
    const baseBet = Math.floor(bet / 8);
    const remainder = bet % 8;
    return baseBet + (lineIndex < remainder ? 1 : 0);
  };

  const getRandomSymbolIndex = () => {
    const activeSymbols = SYMBOLS.filter(s => s.id !== 'empty');
    const totalWeight = activeSymbols.reduce((acc, sym) => acc + sym.weight, 0);
    let random = Math.random() * totalWeight;
    for (let i = 0; i < SYMBOLS.length; i++) {
      if (SYMBOLS[i].id === 'empty') continue;
      random -= SYMBOLS[i].weight;
      if (random <= 0) return i;
    }
    return 0;
  };

  const getBonusSymbolIndex = (type) => {
    if (type === 'BAR') {
        const isHit = Math.random() < 0.75; 
        if (!isHit) return SYMBOLS.findIndex(s => s.id === 'empty');
        const isSeven3 = Math.random() < 0.2; 
        return SYMBOLS.findIndex(s => s.id === (isSeven3 ? 'seven3' : 'seven'));
    }
    let targetId = type === 'CHERRY' ? 'cherry' : 'bell';
    const isHit = Math.random() < 0.75; 
    if (!isHit) return SYMBOLS.findIndex(s => s.id === 'empty');
    return SYMBOLS.findIndex(s => s.id === targetId);
  };

  const isBar = (id) => ['bar1', 'bar2', 'bar3'].includes(id);
  const isSeven = (id) => ['seven', 'seven3'].includes(id);

  const checkWin = (finalGrid, isBonusRound) => {
    let totalWin = 0;
    const newWinningLines = [];
    let isWin = false;
    let currentSpinStats = { cherryHit: 0, bell3: 0, bar1Hit: false };
    let isAllFruits = false;
    let allFruitsSymbol = null;
    let hitCenterBonus = false;

    WIN_LINES.forEach((line, index) => {
      const lineBetAmount = getLineBet(index);
      if (lineBetAmount === 0) return;

      const s1 = SYMBOLS[finalGrid[line[0]]];
      const s2 = SYMBOLS[finalGrid[line[1]]];
      const s3 = SYMBOLS[finalGrid[line[2]]];

      if (s1.id === 'empty' || s2.id === 'empty' || s3.id === 'empty') return;

      let isLineMatch = false;
      let lineWinAmount = 0;

      if (s1.id === s2.id && s2.id === s3.id) {
        lineWinAmount = lineBetAmount * s1.value;
        isLineMatch = true;
        if (s1.id === 'cherry') currentSpinStats.cherryHit++;
        if (s1.id === 'bell') currentSpinStats.bell3++;
        if (s1.id === 'bar1') currentSpinStats.bar1Hit = true;
      }
      else if (isBar(s1.id) && isBar(s2.id) && isBar(s3.id)) {
        lineWinAmount = lineBetAmount * 10; 
        isLineMatch = true;
      }
      else if (isSeven(s1.id) && isSeven(s2.id) && isSeven(s3.id)) {
        lineWinAmount = lineBetAmount * 100; 
        isLineMatch = true;
      }
      else if (!isBonusRound) {
        if (s1.id === 'cherry') {
            if (s2.id === 'cherry') {
                lineWinAmount = lineBetAmount * 5; 
                isLineMatch = true;
                currentSpinStats.cherryHit++; 
            } else {
                lineWinAmount = lineBetAmount * 2; 
                isLineMatch = true;
            }
        }
      }

      if (isLineMatch && lineWinAmount > 0) {
          totalWin += lineWinAmount;
          newWinningLines.push(index);
          isWin = true;
      }
    });

    if (!isBonusRound) {
        const centerSymbol = SYMBOLS[finalGrid[4]];
        if (centerSymbol.id === 'seven' || centerSymbol.id === 'seven3') {
            const bonusMult = centerSymbol.id === 'seven3' ? 5 : 2;
            totalWin += Math.floor(bet * bonusMult); 
            isWin = true;
            hitCenterBonus = true;
        }
    }

    const firstSymbolId = SYMBOLS[finalGrid[0]].id;
    if (firstSymbolId !== 'empty') {
        const isAllSame = finalGrid.every(idx => SYMBOLS[idx].id === firstSymbolId);
        if (isAllSame) {
            const multiplier = isBonusRound ? 300 : 100;
            totalWin += bet * multiplier;
            isAllFruits = true;
            isWin = true;
            allFruitsSymbol = firstSymbolId;
        }
    }

    return { isWin, totalWin, newWinningLines, spinStats: currentSpinStats, isAllFruits, allFruitsSymbol, hitCenterBonus };
  };

  const handleBonusTriggers = (spinStats) => {
    setBonusCounts(prev => {
      let next = { ...prev };
      let triggeredBonus = null;

      if (spinStats.bar1Hit) {
          triggeredBonus = 'BAR';
      } 
      else {
          if (spinStats.cherryHit > 0) {
            next.cherry += spinStats.cherryHit;
            if (next.cherry >= BONUS_TARGETS.CHERRY_TOTAL) {
               next.cherry = 0;
               triggeredBonus = 'CHERRY';
            }
          }
          
          if (spinStats.bell3 > 0) {
            next.bell3 += spinStats.bell3;
            if (next.bell3 >= BONUS_TARGETS.BELL_3) {
                next.bell3 = 0;
                triggeredBonus = 'BELL';
            }
          }
      }

      if (triggeredBonus) {
        setTimeout(() => {
            setBonusType(triggeredBonus);
            setBonusMode(true);
            setBonusSpinsLeft(BONUS_SPINS_COUNT);
            setIsSpinning(false);
            setAutoSpin(false);
            setMessage(`${triggeredBonus} BONUS!`);
            playSound('jackpot');
        }, 800);
      }

      return next;
    });
  };

  const startDoubleUp = (amount) => {
      setDoubleUpActive(true);
      setGambleAmount(amount);
      setDoubleUpStage(1);
      setCardRevealed(false);
      setCardValue(null);
      setDoubleUpResult(null);
      setCheatSequence([]); 
      setMessage("DOUBLE UP?");
  };

  const handleCheatClick = (char) => {
      const target = "BLUE";
      const nextIndex = cheatSequence.length;
      
      if (char === target[nextIndex]) {
          const newSeq = [...cheatSequence, char];
          setCheatSequence(newSeq);
          
          if (newSeq.join('') === target) {
              setCheatMode(true);
              playSound('jackpot'); 
              setMessage("GOD MODE ON");
              setCheatSequence([]);
          }
      } else {
          setCheatSequence([]); 
      }
  };

  const handleDoubleUp = (choice) => { 
      if (cardRevealed) return;
      
      let nextCard;
      if (cheatMode) {
          if (choice === 'UP') nextCard = Math.floor(Math.random() * 6) + 8; 
          else nextCard = Math.floor(Math.random() * 6) + 1; 
      } else {
          nextCard = Math.floor(Math.random() * 13) + 1;
      }

      setCardValue(nextCard);
      setCardRevealed(true);

      let win = false;
      if (choice === 'UP' && nextCard > 7) win = true;
      if (choice === 'DOWN' && nextCard < 7) win = true;

      if (win) {
          const newAmount = gambleAmount * 2;
          setGambleAmount(newAmount);
          setDoubleUpResult('WIN');
          setMessage(`DOUBLE WIN! ${newAmount}`);
          playSound('win');
          
          if (doubleUpStage >= 5) {
              setCelebrationActive(true); 
              playSound('jackpot');
              setTimeout(() => {
                 setCelebrationActive(false); 
                 collectDoubleUp(newAmount);
              }, 3000);
          } else {
              setTimeout(() => {
                  setCardRevealed(false);
                  setCardValue(null);
                  setDoubleUpResult(null);
                  setDoubleUpStage(prev => prev + 1);
                  setMessage(`STAGE ${doubleUpStage + 1}`);
              }, 2000);
          }
      } else {
          setDoubleUpResult('LOSE');
          setMessage("YOU LOSE...");
          setTimeout(() => {
              setDoubleUpActive(false);
              setLastWin(0); 
              setMessage("TRY AGAIN");
          }, 2000);
      }
  };

  const collectDoubleUp = (amount = gambleAmount) => {
      setCredits(prev => prev + amount);
      setLastWin(amount);
      setDoubleUpActive(false);
      setMessage(`COLLECTED ${amount}`);
      playSound('coins');
  };

  const spin = useCallback(() => {
    if (!bonusMode && (credits < bet || isSpinning || doubleUpActive)) {
      if (credits < bet) setAutoSpin(false);
      return;
    }
    if (bonusMode && bonusSpinsLeft <= 0) {
      setBonusMode(false);
      setBonusType(null);
      setMessage("BONUS END");
      return;
    }

    setIsSpinning(true);
    setCenterBonus(false);
    
    if (!bonusMode) {
      setCredits(prev => prev - bet);
      setLastWin(0);
      setWinningLines([]);
      setMessage("SPINNING...");
    } else {
      setBonusSpinsLeft(prev => prev - 1);
      setMessage(`BONUS SPIN (${bonusSpinsLeft - 1})`);
      setWinningLines([]);
    }
    
    playSound('spin');

    let forcedAllFruits = false;
    if (!bonusMode && Math.random() < 0.008) {
        forcedAllFruits = true;
    }

    const generateGrid = () => {
        if (forcedAllFruits) {
            const validSymbols = SYMBOLS.filter(s => s.id !== 'empty');
            const randomSym = validSymbols[Math.floor(Math.random() * validSymbols.length)];
            const symIndex = SYMBOLS.findIndex(s => s.id === randomSym.id);
            return Array(9).fill(symIndex);
        }
        return Array(9).fill(0).map(() => 
            bonusMode ? getBonusSymbolIndex(bonusType) : getRandomSymbolIndex()
        );
    };

    const finalGrid = generateGrid();

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < SPIN_DURATION) {
        setGrid(prev => prev.map(() => bonusMode ? getBonusSymbolIndex(bonusType) : getRandomSymbolIndex()));
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setGrid(finalGrid);
        setIsSpinning(false);
        
        const { isWin, totalWin, newWinningLines, spinStats, isAllFruits, allFruitsSymbol, hitCenterBonus } = checkWin(finalGrid, bonusMode);
        
        setCenterBonus(hitCenterBonus);

        let finalWin = totalWin;
        let isGrandJackpot = false;

        if (isWin) {
            if (isAllFruits) {
                finalWin += jackpotPool; 
                isGrandJackpot = true;
            }

            setWinningLines(newWinningLines);
            
            if (isGrandJackpot) {
                setCredits(prev => prev + finalWin);
                setLastWin(finalWin);
                setMessage(`GRAND JACKPOT! ${jackpotPool.toLocaleString()}`);
                setJackpotPool(INITIAL_JACKPOT); 
                playSound('jackpot');
            } else if (isAllFruits) {
                setCredits(prev => prev + finalWin);
                setLastWin(finalWin);
                setMessage("★ ALL MATCH JACKPOT ★");
                playSound('jackpot');
            } else {
                if (!autoSpin && !bonusMode) {
                    setLastWin(finalWin); 
                    setTimeout(() => {
                        startDoubleUp(finalWin);
                    }, 2000);
                } else {
                    setCredits(prev => prev + finalWin);
                    setLastWin(finalWin);
                    if (hitCenterBonus && newWinningLines.length === 0) {
                        setMessage("CENTER BONUS HIT!");
                    } else {
                        setMessage(`WIN ${finalWin}`);
                    }
                    playSound('win');
                }
            }
            
            setStats(prev => ({
                ...prev,
                wins: prev.wins + 1,
                largestWin: Math.max(prev.largestWin, finalWin),
                spins: prev.spins + 1,
                jackpotCount: isGrandJackpot ? prev.jackpotCount + 1 : prev.jackpotCount
            }));
        } else {
            if(!bonusMode) {
                setMessage("TRY AGAIN");
                setJackpotPool(prev => prev + bet);
            } else {
                setMessage("NO WIN");
            }
            setStats(prev => ({ ...prev, spins: prev.spins + 1 }));
        }

        if (!bonusMode) {
          handleBonusTriggers(spinStats);
        } else if (bonusSpinsLeft <= 1) {
             setTimeout(() => {
                 setBonusMode(false);
                 setBonusType(null);
                 setMessage("COMPLETE");
             }, 1000);
        }
      }
    };
    animationRef.current = requestAnimationFrame(animate);

  }, [credits, bet, isSpinning, bonusMode, bonusSpinsLeft, bonusType, jackpotPool, playSound, autoSpin, doubleUpActive]);

  useEffect(() => {
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, []);

  useEffect(() => {
    if (autoSpin && !isSpinning && !bonusMode && credits >= bet && !doubleUpActive) {
      const timer = setTimeout(spin, 2000);
      return () => clearTimeout(timer);
    }
  }, [autoSpin, isSpinning, bonusMode, credits, bet, spin, bonusSpinsLeft, doubleUpActive]);

  const LineIndicator = ({ lineIdx, posClass, rotationClass = '' }) => {
    const lineBet = getLineBet(lineIdx);
    const isActive = lineBet > 0;
    const displayNum = lineIdx + 1;

    return (
      <div className={`absolute flex items-center justify-center w-6 h-6 rounded-md font-black text-xs shadow-lg z-20 border-2 transition-all duration-200 ${posClass} ${rotationClass} 
          ${isActive ? 'bg-yellow-500 text-red-900 border-yellow-300 scale-110 shadow-[0_0_10px_yellow]' : 'bg-slate-800 text-slate-600 border-slate-700'}`}>
          {displayNum}
      </div>
    );
  };

  const getPaytableRows = () => {
    const specialRows = [
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
    return specialRows;
  };

  const PlayingCard = ({ value, revealed, result }) => {
      const getCardContent = (val) => {
          if (!val) return "?";
          if (val === 1) return "A";
          if (val === 11) return "J";
          if (val === 12) return "Q";
          if (val === 13) return "K";
          return val;
      };

      return (
          <div className={`relative w-32 h-48 bg-white rounded-xl border-4 border-slate-300 shadow-2xl flex items-center justify-center transform transition-transform duration-500 ${revealed ? 'rotate-y-0' : 'rotate-y-180'}`}>
              {revealed ? (
                  <div className="flex flex-col items-center">
                      <span className={`text-6xl font-black ${value === 7 ? 'text-green-600' : (value > 7 ? 'text-red-600' : 'text-blue-600')}`}>
                          {getCardContent(value)}
                      </span>
                      <span className="text-xs font-bold mt-2 text-slate-400">
                          {value === 7 ? "HOUSE" : (value > 7 ? "HIGH" : "LOW")}
                      </span>
                  </div>
              ) : (
                  <div className="w-full h-full bg-slate-800 rounded-lg flex items-center justify-center">
                      <span className="text-4xl text-slate-600">?</span>
                  </div>
              )}
              
              {revealed && result && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 rounded-lg backdrop-blur-[1px] animate-in zoom-in">
                      <span className={`text-3xl font-black uppercase tracking-widest border-4 px-2 py-1 transform -rotate-12 shadow-lg ${result === 'WIN' ? 'text-green-400 border-green-400 bg-green-900/80' : 'text-red-500 border-red-500 bg-red-900/80'}`}>
                          {result}
                      </span>
                  </div>
              )}
          </div>
      );
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-2 font-sans select-none transition-colors duration-1000 ${bonusMode ? (bonusType === 'BAR' ? 'bg-slate-900' : 'bg-red-950') : 'bg-neutral-900'}`}>
      <style>{globalStyles}</style>
      
      {celebrationActive && (
          <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
              <div className="absolute inset-0 animate-celebration opacity-50 mix-blend-overlay"></div>
              <div className="text-6xl md:text-8xl font-black text-white text-center drop-shadow-[0_0_25px_rgba(255,255,255,1)] animate-bounce z-50">
                 <div className="text-yellow-300 animate-pulse mb-4">UNBELIEVABLE!</div>
                 <div className="text-cyan-300">5 STAGE CLEAR!</div>
                 <Sparkles className="absolute -top-20 -left-20 text-yellow-400 animate-spin-slow" size={120} />
                 <Sparkles className="absolute -bottom-20 -right-20 text-yellow-400 animate-spin-slow" size={120} />
              </div>
          </div>
      )}

      {doubleUpActive && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center animate-in fade-in duration-300">
              <div className="bg-slate-800/95 p-8 rounded-3xl border-4 border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.5)] max-w-md w-full text-center relative">
                  
                  <div className="flex justify-center gap-1 mb-2 select-none">
                      {["D","O","U","B","L","E"," ","U","P"].map((char, i) => (
                          <span 
                            key={i}
                            onClick={() => handleCheatClick(char)}
                            className={`text-4xl font-black italic tracking-widest cursor-pointer hover:text-white transition-colors ${cheatMode ? 'text-orange-500 animate-pulse' : 'text-yellow-400'}`}
                          >
                              {char}
                          </span>
                      ))}
                  </div>

                  <p className="text-slate-400 text-sm mb-6 font-bold">STAGE {doubleUpStage} / 5</p>
                  
                  <div className="mb-8 flex justify-center">
                      <PlayingCard value={cardValue} revealed={cardRevealed} result={doubleUpResult} />
                  </div>

                  {!doubleUpResult && (
                      <div className="text-2xl text-white font-mono font-bold mb-8">
                          Risk: <span className="text-red-400">{gambleAmount}</span> <br/>
                          Win: <span className="text-green-400">{gambleAmount * 2}</span>
                      </div>
                  )}

                  {doubleUpResult === 'WIN' && (
                      <div className="text-3xl font-black text-yellow-300 mb-6 animate-bounce">
                          + {gambleAmount}
                      </div>
                  )}

                  {!cardRevealed && (
                      <div className="flex gap-4 justify-center">
                          <button onClick={() => handleDoubleUp('DOWN')} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl font-black text-xl border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 flex flex-col items-center">
                              <ArrowBigDown size={32} />
                              LOW
                              <span className="text-xs opacity-70">A - 6</span>
                          </button>
                          
                          <div className="flex flex-col items-center justify-center px-2">
                              <span className="text-2xl font-black text-slate-500">7</span>
                          </div>

                          <button onClick={() => handleDoubleUp('UP')} className="flex-1 bg-red-600 hover:bg-red-500 text-white p-4 rounded-xl font-black text-xl border-b-4 border-red-800 active:border-b-0 active:translate-y-1 flex flex-col items-center">
                              <ArrowBigUp size={32} />
                              HIGH
                              <span className="text-xs opacity-70">8 - K</span>
                          </button>
                      </div>
                  )}
                  
                  {!cardRevealed && doubleUpStage > 1 && (
                      <button onClick={() => collectDoubleUp()} className="mt-6 w-full bg-yellow-600 hover:bg-yellow-500 text-black font-black py-3 rounded-lg uppercase tracking-widest border-b-4 border-yellow-800 active:border-b-0 active:translate-y-1 flex items-center justify-center gap-2">
                          <HandCoins size={20}/> Collect {gambleAmount}
                      </button>
                  )}
              </div>
          </div>
      )}

      <div className="w-full max-w-4xl mb-4 bg-gradient-to-r from-yellow-900 via-yellow-600 to-yellow-900 p-1 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.5)]">
        <div className="bg-black/80 rounded-full py-2 px-6 flex justify-between items-center text-yellow-400">
            <div className="flex items-center gap-2">
                <DollarSign size={24} className="animate-spin-slow" />
                <span className="font-black text-xl italic tracking-wider">GRAND JACKPOT</span>
            </div>
            <div className="font-mono font-bold text-3xl drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]">
                {jackpotPool.toLocaleString()}
            </div>
        </div>
      </div>

      {/* Rest of the UI: Main Game & Sidebar (No changes here, kept for completeness) */}
      <div className={`relative bg-slate-800 p-4 md:p-8 rounded-3xl shadow-2xl border-4 max-w-4xl w-full flex flex-col md:flex-row gap-6 transition-all duration-500 ${bonusMode ? (bonusType === 'BAR' ? 'border-cyan-500 shadow-[0_0_50px_rgba(34,211,238,0.5)]' : 'border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.5)]') : 'border-slate-700'}`}>
        {/* ... Sidebar, Header, Grid, Controls (Same as before) ... */}
        
        {bonusMode && (
           <div className="absolute -top-12 left-0 w-full text-center animate-bounce z-50">
               <span className={`text-white font-black text-2xl px-8 py-2 rounded-full border-4 shadow-lg tracking-widest uppercase ${bonusType === 'BAR' ? 'bg-cyan-600 border-white' : 'bg-red-600 border-yellow-400'}`}>
                   {bonusType} BONUS
               </span>
           </div>
        )}

        <div className="w-full md:w-64 flex flex-col gap-4 shrink-0">
            {/* Sidebar Meters */}
            <div className="bg-black/50 p-4 rounded-xl border-2 border-red-900/50 relative overflow-hidden">
                <Cherry size={48} className="absolute top-2 right-2 text-red-500 opacity-20" />
                <h3 className="text-red-400 font-black text-lg uppercase italic mb-2">Cherry Bonus</h3>
                <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
                    <span>Total Hit (Target: {BONUS_TARGETS.CHERRY_TOTAL})</span>
                    <span className="text-white font-mono text-lg">{bonusCounts.cherry}</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mt-1">
                    <div className="bg-red-500 h-full transition-all duration-500" style={{ width: `${Math.min(100, (bonusCounts.cherry / BONUS_TARGETS.CHERRY_TOTAL) * 100)}%` }} />
                </div>
            </div>

            <div className="bg-black/50 p-4 rounded-xl border-2 border-yellow-900/50 relative overflow-hidden">
                <Bell size={48} className="absolute top-2 right-2 text-yellow-500 opacity-20" />
                <h3 className="text-yellow-400 font-black text-lg uppercase italic mb-2">Bell Bonus</h3>
                <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
                    <span>3-Hit (Target: {BONUS_TARGETS.BELL_3})</span>
                    <span className="text-white font-mono text-lg">{bonusCounts.bell3}</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mt-1">
                    <div className="bg-yellow-500 h-full transition-all duration-500" style={{ width: `${Math.min(100, (bonusCounts.bell3 / BONUS_TARGETS.BELL_3) * 100)}%` }} />
                </div>
            </div>

            <div className="bg-cyan-900/20 p-4 rounded-xl border-2 border-cyan-900/50 flex items-center gap-3">
                <div className="bg-cyan-500/20 p-2 rounded">
                    <BarIcon count={1} color="text-cyan-400" />
                </div>
                <div className="text-xs text-cyan-200 font-bold">
                    <p>Match 3x 1-BAR</p>
                    <p className="text-white">Direct Bonus!</p>
                </div>
            </div>
        </div>

        <div className="flex-1 flex flex-col relative">
             {/* Header */}
            <div className={`flex justify-between items-center mb-4 p-3 rounded-lg border transition-colors duration-500 bg-black/60 border-slate-600/50`}>
                <div>
                    <div className="text-[10px] text-slate-400 font-bold tracking-widest">CREDITS</div>
                    <div className="text-2xl text-cyan-400 font-mono font-bold leading-none">{credits.toLocaleString()}</div>
                </div>
                <div className="text-center px-4">
                    <div className={`text-sm md:text-base font-bold drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] text-white`}>
                        {message}
                    </div>
                    {bonusMode && <div className="text-xs text-white/80 font-bold mt-1">FREE SPINS: {bonusSpinsLeft}</div>}
                </div>
                <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-bold tracking-widest">WIN</div>
                    <div className="text-2xl text-yellow-400 font-mono font-bold leading-none">{lastWin.toLocaleString()}</div>
                </div>
            </div>

             {/* Game Grid */}
            <div className="relative p-6 bg-slate-900 rounded-xl border-4 border-slate-700 shadow-inner mb-4 mx-4 md:mx-0">
                <LineIndicator lineIdx={1} posClass="left-[-14px] top-[17%]" />
                <LineIndicator lineIdx={0} posClass="left-[-14px] top-[50%] -translate-y-1/2" />
                <LineIndicator lineIdx={2} posClass="left-[-14px] bottom-[17%]" />
                
                <LineIndicator lineIdx={3} posClass="top-[-10px] left-[-10px]" />
                <LineIndicator lineIdx={4} posClass="bottom-[-10px] left-[-10px]" />

                <LineIndicator lineIdx={5} posClass="top-[-14px] left-[17%]" />
                <LineIndicator lineIdx={6} posClass="top-[-14px] left-[50%] -translate-x-1/2" />
                <LineIndicator lineIdx={7} posClass="top-[-14px] right-[17%]" />

                <div className={`bg-black p-2 rounded border-2 relative overflow-hidden ${bonusMode ? 'border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'border-slate-600'}`}>
                    <WinLinesOverlay activeLines={winningLines} color={bonusMode ? 'white' : 'red'} />
                    <div className="grid grid-cols-3 gap-2 relative z-10">
                        {grid.map((symbolIdx, i) => {
                            const SymbolObj = SYMBOLS[symbolIdx];
                            const SymbolIcon = SymbolObj.icon;
                            const isWinCell = winningLines.some(lineIndex => WIN_LINES[lineIndex].includes(i));
                            const isCenterBonus = centerBonus && i === 4;
                            
                            const isEmpty = SymbolObj.id === 'empty';
                            let cellBg = 'bg-gradient-to-br from-slate-100 to-slate-300';
                            if (bonusMode) {
                                if (isEmpty) cellBg = 'bg-slate-900';
                                else if (bonusType === 'BAR') cellBg = 'bg-cyan-900 border-cyan-400';
                                else cellBg = 'bg-red-900/50 border-red-500';
                            }

                            const winAnimationClass = (isWinCell || (isCenterBonus && !isSpinning)) 
                                ? 'animate-win-flash bg-white border-white' 
                                : '';

                            return (
                                <div key={i} className={`aspect-square rounded-md flex items-center justify-center relative border-2 transition-all duration-300 ${cellBg} border-slate-400 ${winAnimationClass}`}>
                                    <div className={`transform transition-all duration-100 ${isSpinning ? 'blur-[2px] scale-90 translate-y-4 opacity-70' : 'scale-100 translate-y-0 opacity-100'}`}>
                                        {typeof SymbolIcon === 'function' ? <SymbolIcon size={44} className={SymbolObj.color} /> : <SymbolIcon size={44} className={SymbolObj.color} />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-4 gap-2 mt-auto">
                <LongPressButton 
                    onClick={decreaseBet} 
                    onLongPress={startRapidDecrease}
                    onMouseUp={stopRapidBet}
                    onMouseLeave={stopRapidBet}
                    onTouchEnd={stopRapidBet}
                    disabled={isSpinning || bonusMode || bet === 0 || doubleUpActive} 
                    className="bg-slate-700 text-white p-3 rounded font-bold text-xs border-b-4 border-slate-900 active:border-b-0 active:translate-y-1 select-none flex flex-col items-center justify-center leading-none"
                >
                    <Minus size={16} className="mb-1"/>
                    BET -
                </LongPressButton>
                
                <div className="col-span-1 bg-slate-900 flex flex-col items-center justify-center rounded border border-slate-600 text-white">
                    <span className="text-[10px] text-slate-500 font-bold">BET</span>
                    <span className="text-xl font-mono font-bold">{bet}</span>
                </div>
                
                <LongPressButton 
                    onClick={increaseBet} 
                    onLongPress={startRapidIncrease} 
                    onMouseUp={stopRapidBet}
                    onMouseLeave={stopRapidBet}
                    onTouchEnd={stopRapidBet}
                    disabled={isSpinning || bonusMode || bet >= MAX_BET || doubleUpActive} 
                    className="bg-slate-700 text-white p-3 rounded font-bold text-xs border-b-4 border-slate-900 active:border-b-0 active:translate-y-1 select-none"
                >
                    BET +
                </LongPressButton>
                
                <button 
                    onClick={() => setBet(Math.min(credits, MAX_BET))} 
                    disabled={isSpinning || bonusMode || bet >= MAX_BET || doubleUpActive} 
                    className="bg-blue-700 hover:bg-blue-600 text-white p-3 rounded font-bold text-xs border-b-4 border-blue-900 active:border-b-0 active:translate-y-1 flex flex-col items-center justify-center leading-none"
                >
                    <ChevronsUp size={16} className="mb-1"/>
                    MAX
                </button>
                
                <button onClick={() => setAutoSpin(!autoSpin)} disabled={bonusMode || doubleUpActive} className={`col-span-1 rounded font-bold text-xs border-b-4 active:border-b-0 active:translate-y-1 ${autoSpin ? 'bg-orange-600 border-orange-800 text-white animate-pulse' : 'bg-slate-600 border-slate-800 text-slate-300'}`}>{autoSpin ? 'STOP' : 'AUTO'}</button>
                <button onClick={spin} disabled={isSpinning || (credits < bet && !bonusMode) || bet === 0 || doubleUpActive} className={`col-span-2 p-4 rounded font-black text-xl tracking-widest shadow-lg border-b-8 active:border-b-0 active:translate-y-2 ${bonusMode ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-blue-900 animate-pulse' : 'bg-red-600 hover:bg-red-500 text-white border-red-900'}`}>{bonusMode ? 'FREE SPIN' : 'START'}</button>
                <button onClick={() => setShowPaytable(true)} disabled={doubleUpActive} className="col-span-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold text-xs border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 flex flex-col items-center justify-center"><Info size={16} /> INFO</button>
            </div>
        </div>
      </div>

       {showPaytable && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4" onClick={() => setShowPaytable(false)}>
          <div className="bg-slate-800 p-6 rounded-2xl max-w-sm w-full border border-slate-500" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-600 pb-2">Paytable (x Line Bet)</h2>
            <div className="space-y-2 text-sm max-h-[60vh] overflow-y-auto custom-scrollbar">
                {getPaytableRows().map((row, idx) => (
                    <div key={idx} className={`grid grid-cols-12 items-center p-2 rounded ${idx % 2 === 0 ? 'bg-slate-700/30' : 'bg-slate-700/10'}`}>
                         <div className="col-span-3 flex justify-center">
                            {row.icon ? (
                                typeof row.icon === 'function' ? 
                                    <row.icon size={24} className={row.color} count={row.label.includes('3-BAR')?3:row.label.includes('2-BAR')?2:1} color={row.color} /> 
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
                    <li><strong>Double Up:</strong> Gamble your winnings!</li>
                    <li><strong>Cheat Mode:</strong> Click B-L-U-E on title to toggle.</li>
                </ul>
            </div>
          </div>
        </div>
      )}
      
      <style>{globalStyles}</style>
    </div>
  );
}

function WinLinesOverlay({ activeLines, color = "red" }) {
  if (activeLines.length === 0) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <svg className="w-full h-full opacity-80" viewBox="0 0 100 100" preserveAspectRatio="none">
        {activeLines.map(lineIdx => {
          let d = "";
          if (lineIdx === 0) d = "M0,50 H100";        
          else if (lineIdx === 1) d = "M0,16.66 H100"; 
          else if (lineIdx === 2) d = "M0,83.33 H100"; 
          else if (lineIdx === 3) d = "M0,0 L100,100"; 
          else if (lineIdx === 4) d = "M0,100 L100,0"; 
          else if (lineIdx === 5) d = "M16.66,0 V100"; 
          else if (lineIdx === 6) d = "M50,0 V100";    
          else if (lineIdx === 7) d = "M83.33,0 V100"; 
          
          return <path key={lineIdx} d={d} stroke={color} strokeWidth="1" fill="none" className={`drop-shadow-[0_0_8px_${color}] animate-pulse`} />;
        })}
      </svg>
    </div>
  );
}