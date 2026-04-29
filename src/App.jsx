import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Cherry,
  Bell,
  Volume2,
  VolumeX,
  Info,
  DollarSign,
  ChevronsUp,
  Minus,
  ArrowBigUp,
  ArrowBigDown,
  HandCoins,
  Sparkles,
} from 'lucide-react';
import { BarIcon } from './components/icons.jsx';
import LongPressButton from './components/LongPressButton.jsx';
import WinLinesOverlay from './components/WinLinesOverlay.jsx';
import PlayingCard from './components/PlayingCard.jsx';
import PaytableModal from './components/PaytableModal.jsx';
import CoinRain from './components/CoinRain.jsx';
import {
  SYMBOLS,
  BONUS_TARGETS,
  INITIAL_CREDITS,
  INITIAL_JACKPOT,
  MAX_BET,
  SPIN_DURATION,
  BONUS_SPINS_COUNT,
  STORAGE_KEYS,
  WIN_LINES,
  isBar,
  isSeven,
  isFruit,
  loadJackpot,
  loadStats,
} from './gameConfig.jsx';


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

  /* Reel spin (vertical streak) */
  .animate-reel-spin {
    animation: reelSpin 0.18s linear infinite;
    filter: blur(2px);
  }
  @keyframes reelSpin {
    0%   { transform: translateY(-18px) scaleY(1.05); }
    50%  { transform: translateY(0) scaleY(0.95); }
    100% { transform: translateY(18px) scaleY(1.05); }
  }

  /* Idle gentle pulse */
  .animate-idle-glow {
    animation: idleGlow 2.6s ease-in-out infinite;
  }
  @keyframes idleGlow {
    0%, 100% { filter: brightness(1) drop-shadow(0 0 0 transparent); }
    50%      { filter: brightness(1.12) drop-shadow(0 0 6px rgba(255,255,255,0.45)); }
  }

  /* Win symbol bounce */
  .animate-win-bounce {
    animation: winBounce 0.6s ease-in-out infinite;
    transform-origin: center;
  }
  @keyframes winBounce {
    0%, 100% { transform: scale(1) rotate(0deg); }
    50%      { transform: scale(1.18) rotate(-3deg); }
  }

  /* Coin rain */
  @keyframes coinFall {
    0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(110vh) translateX(var(--drift, 0px)) rotate(360deg); opacity: 0.6; }
  }
  @keyframes coinSpin {
    0%   { transform: rotateY(0deg) scaleX(1); }
    50%  { transform: rotateY(180deg) scaleX(0.4); }
    100% { transform: rotateY(360deg) scaleX(1); }
  }

  /* Modal fade-in */
  .animate-fade-in { animation: fadeIn 0.25s ease-out; }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Card reveal */
  .animate-card-reveal { animation: cardReveal 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
  @keyframes cardReveal {
    0%   { opacity: 0; transform: scale(0.4) rotate(-12deg); }
    100% { opacity: 1; transform: scale(1) rotate(0); }
  }

  /* Jackpot shimmer text */
  .animate-jackpot-shimmer {
    background: linear-gradient(90deg, #fde68a 0%, #fff 25%, #fbbf24 50%, #fff 75%, #fde68a 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: jackpotShimmer 2.4s linear infinite;
  }
  @keyframes jackpotShimmer {
    0%   { background-position: 0% center; }
    100% { background-position: 200% center; }
  }

  /* Ambient grid pulse for board */
  .animate-board-glow {
    animation: boardGlow 3.2s ease-in-out infinite;
  }
  @keyframes boardGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(56,189,248,0.18) inset, 0 0 0 transparent; }
    50%      { box-shadow: 0 0 40px rgba(56,189,248,0.32) inset, 0 0 16px rgba(56,189,248,0.25); }
  }
`;

export default function App() {
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [jackpotPool, setJackpotPool] = useState(loadJackpot);
  const [bet, setBet] = useState(8);
  const [lastWin, setLastWin] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [grid, setGrid] = useState(Array(9).fill(0).map(() => Math.floor(Math.random() * (SYMBOLS.length - 1)))); 
  const [winningLines, setWinningLines] = useState([]); 
  const [centerBonus, setCenterBonus] = useState(false);
  const [message, setMessage] = useState("INSERT COIN");
  const [coinRainActive, setCoinRainActive] = useState(false);
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

  const [stats, setStats] = useState(loadStats);

  const animationRef = useRef(null);
  const bettingIntervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        audioCtxRef.current = new Ctx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const beep = (freq, duration, wave = 'sine', volume = 0.08, delay = 0) => {
        const t0 = ctx.currentTime + delay;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = wave;
        osc.frequency.setValueAtTime(freq, t0);
        gain.gain.setValueAtTime(volume, t0);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t0);
        osc.stop(t0 + duration);
      };

      switch (type) {
        case 'spin':
          beep(180, 0.08, 'square', 0.04);
          break;
        case 'win':
          beep(523, 0.12, 'sine', 0.09, 0);
          beep(659, 0.12, 'sine', 0.09, 0.1);
          beep(784, 0.2, 'sine', 0.09, 0.2);
          break;
        case 'jackpot':
          [523, 659, 784, 988, 1175].forEach((f, i) => beep(f, 0.15, 'square', 0.07, i * 0.08));
          break;
        case 'coins':
          beep(880, 0.05, 'square', 0.06, 0);
          beep(1320, 0.05, 'square', 0.05, 0.05);
          break;
        default:
          break;
      }
    } catch {
      // AudioContext may not be available; silently ignore.
    }
  }, [soundEnabled]);

  const increaseBet = useCallback(() => {
      setBet(prev => {
          if (prev >= MAX_BET) return prev;
          const next = prev + 1;
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

  const checkWin = (finalGrid, isBonusRound) => {
    let totalWin = 0;
    const newWinningLines = [];
    let isWin = false;
    let currentSpinStats = { cherryHit: 0, bell3: 0, bar1Hit: false };
    let isAllFruits = false;
    let allFruitsSymbol = null; // Not used for mixed fruits but kept for structure
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

    // [UPDATED] All Fruits Check (Mixed Fruits OK)
    const isAllFruitsMatch = finalGrid.every(idx => isFruit(SYMBOLS[idx].id));
    
    // Check All Same (Legacy Logic for Non-Fruits like 9 Bells)
    const firstSymbolId = SYMBOLS[finalGrid[0]].id;
    let isAllSame = false;
    if (firstSymbolId !== 'empty') {
        isAllSame = finalGrid.every(idx => SYMBOLS[idx].id === firstSymbolId);
    }

    if (isAllFruitsMatch) {
         // Mixed Fruits or Same Fruits -> Jackpot Trigger
         const multiplier = isBonusRound ? 500 : 200; 
         totalWin += bet * multiplier;
         isAllFruits = true; 
         isWin = true;
    } else if (isAllSame) {
         // Non-fruit All Same (e.g., All Bells, All Bars)
         const multiplier = isBonusRound ? 500 : 200;
         totalWin += bet * multiplier;
         isWin = true;
         // Check if it's All Bells for specific jackpot rule? 
         // User said: "All Fruits" gets jackpot. 
         // But also previously: "Bell Bonus + All Bells = Jackpot". 
         // Let's keep Bell Jackpot separate logic in spin().
         if (firstSymbolId === 'bell') allFruitsSymbol = 'bell';
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
    // [확률 조정] 0.8%
    if (!bonusMode && Math.random() < 0.008) {
        forcedAllFruits = true;
    }

    const generateGrid = () => {
        if (forcedAllFruits) {
            const validSymbols = SYMBOLS.filter(s => s.id !== 'empty');
            // 과일 중에서만 선택 (All Fruits Event) or Any Symbol?
            // "올 후르츠" event usually implies fruits.
            // Let's pick a random fruit symbol to fill.
            const fruitSymbols = SYMBOLS.filter(s => isFruit(s.id));
            const randomSym = fruitSymbols[Math.floor(Math.random() * fruitSymbols.length)];
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
            // [수정] 올 후르츠 (Mixed Fruits OK) 이면 잭팟
            if (isAllFruits) {
                finalWin += jackpotPool; 
                isGrandJackpot = true;
            }
            // Bell Bonus Jackpot Logic (Legacy but valid)
            else if (bonusMode && bonusType === 'BELL' && allFruitsSymbol === 'bell') {
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
                setCoinRainActive(true);
                setTimeout(() => setCoinRainActive(false), 4000);
            } else if (isAllFruits) {
                setCredits(prev => prev + finalWin);
                setLastWin(finalWin);
                setMessage("★ ALL FRUITS JACKPOT ★");
                setCoinRainActive(true);
                setTimeout(() => setCoinRainActive(false), 3000);
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
    try { localStorage.setItem(STORAGE_KEYS.JACKPOT, String(jackpotPool)); } catch { /* ignore quota */ }
  }, [jackpotPool]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats)); } catch { /* ignore quota */ }
  }, [stats]);

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

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-2 font-sans select-none transition-colors duration-1000 ${bonusMode ? (bonusType === 'BAR' ? 'bg-slate-900' : 'bg-red-950') : 'bg-neutral-900'}`}>
      <style>{globalStyles}</style>

      {coinRainActive && <CoinRain count={50} />}

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
                  
                  {!cardRevealed && (
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
            <div className="font-mono font-bold text-3xl drop-shadow-[0_0_10px_rgba(234,179,8,0.8)] animate-jackpot-shimmer">
                {jackpotPool.toLocaleString()}
            </div>
        </div>
      </div>

      <div className={`relative bg-slate-800 p-4 md:p-8 rounded-3xl shadow-2xl border-4 max-w-4xl w-full flex flex-col md:flex-row gap-6 transition-all duration-500 
        ${bonusMode 
            ? (bonusType === 'BAR' ? 'border-cyan-500 shadow-[0_0_50px_rgba(34,211,238,0.5)]' : 'border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.5)]') 
            : 'border-slate-700'
        }`}>
        
        {bonusMode && (
           <div className="absolute -top-12 left-0 w-full text-center animate-bounce z-50">
               <span className={`text-white font-black text-2xl px-8 py-2 rounded-full border-4 shadow-lg tracking-widest uppercase
                   ${bonusType === 'BAR' ? 'bg-cyan-600 border-white' : 'bg-red-600 border-yellow-400'}
               `}>
                   {bonusType} BONUS
               </span>
           </div>
        )}

        <div className="w-full md:w-64 flex flex-col gap-4 shrink-0">
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
            <div className={`flex justify-between items-center mb-4 p-3 rounded-lg border transition-colors duration-500 bg-black/60 border-slate-600/50 relative`}>
                <button
                    onClick={() => setSoundEnabled(s => !s)}
                    className="absolute top-1 right-1 p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
                    title={soundEnabled ? 'Mute' : 'Unmute'}
                >
                    {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                </button>
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

                            const symbolMotionClass = isSpinning
                                ? 'animate-reel-spin opacity-80'
                                : (isWinCell ? 'animate-win-bounce' : (isEmpty ? '' : 'animate-idle-glow'));

                            return (
                                <div key={i} className={`aspect-square rounded-md flex items-center justify-center relative border-2 transition-all duration-300 ${cellBg} border-slate-400 ${winAnimationClass}`} style={{ animationDelay: `${i * 60}ms` }}>
                                    <div className={`transform transition-transform duration-150 ${symbolMotionClass}`}>
                                        <SymbolIcon size={44} className={SymbolObj.color} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-auto">
                <LongPressButton
                    onClick={decreaseBet}
                    onLongPress={startRapidDecrease}
                    onLongPressEnd={stopRapidBet}
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
                    onLongPressEnd={stopRapidBet}
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

      {showPaytable && <PaytableModal onClose={() => setShowPaytable(false)} />}
    </div>
  );
}
