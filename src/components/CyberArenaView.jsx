import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Gamepad2,
  ShieldAlert,
  Terminal,
  Code2,
  Flame,
  Trophy,
  Share2,
  Check,
  Clock,
  HeartPulse,
  Zap,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Calendar,
  History,
  Flag,
  HelpCircle,
  Sparkles,
  ChevronRight,
  Lock,
  Unlock,
  Server,
  Ban,
  KeyRound,
  CheckSquare
} from 'lucide-react';
import {
  ARENA_RANKS,
  getRankForXp,
  getRecentOperationDates,
  getOperationMetadataForDate,
  getSocAlertsForDate,
  TERMINAL_SCENARIOS,
  getDailyTerminalScenario,
  SPOT_THE_VULN_CHALLENGES,
  getDailySpotTheVulnChallenge
} from '../data/cyberArenaData';

export default function CyberArenaView({
  arenaProfile,
  onAwardXp,
  dailyThreats: propDailyThreats,
  initialMode
}) {
  // 1. Dynamic Date & Historical Level Archive State
  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [selectedDate, setSelectedDate] = useState(todayIso);
  const [showArchiveBrowser, setShowArchiveBrowser] = useState(false);
  const [activeMode, setActiveMode] = useState(initialMode || 'soc-siege'); // 'soc-siege' | 'terminal-ctf' | 'spot-vuln'
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    if (initialMode) {
      setActiveMode(initialMode);
    }
  }, [initialMode]);

  // Live fetch from `${import.meta.env.BASE_URL}data/daily-threats.json` for Bonus Daily Scenario
  const [liveThreatsData, setLiveThreatsData] = useState(propDailyThreats);
  const [bonusMissionAnswered, setBonusMissionAnswered] = useState(null);

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL || './';
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    fetch(`${normalizedBase}data/daily-threats.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setLiveThreatsData(data);
      })
      .catch(() => {});
  }, [propDailyThreats]);

  // Track per-date cleared modes in localStorage so old levels keep their completion badges
  const [dailyHistory, setDailyHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('cyberhub_arena_daily_history');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const markDateModeCleared = (dateStr, modeKey) => {
    setDailyHistory((prev) => {
      const dateEntry = prev[dateStr] || {};
      if (dateEntry[modeKey]) return prev;
      const updated = {
        ...prev,
        [dateStr]: { ...dateEntry, [modeKey]: true }
      };
      localStorage.setItem('cyberhub_arena_daily_history', JSON.stringify(updated));
      return updated;
    });
  };

  const recentDates = useMemo(() => getRecentOperationDates(14), []);
  const activeOpMeta = useMemo(
    () => getOperationMetadataForDate(selectedDate),
    [selectedDate]
  );

  // ============================================================================
  // MODE 1 STATE: "SOC UNDER SIEGE" (90s Timer, 100% Integrity, Combo, 4 Actions)
  // ============================================================================
  const socAlerts = useMemo(
    () => getSocAlertsForDate(selectedDate, liveThreatsData),
    [selectedDate, liveThreatsData]
  );
  const [siegeRunning, setSiegeRunning] = useState(false);
  const [siegeFinished, setSiegeFinished] = useState(false);
  const [siegeTimeLeft, setSiegeTimeLeft] = useState(90);
  const [networkIntegrity, setNetworkIntegrity] = useState(100);
  const [combo, setCombo] = useState(1);
  const [currentAlertIdx, setCurrentAlertIdx] = useState(0);
  const [siegeDecisionFeedback, setSiegeDecisionFeedback] = useState(null);
  const [siegeSessionStats, setSiegeSessionStats] = useState({
    correct: 0,
    total: 0,
    xpEarned: 0
  });

  // Reset SOC Siege when date changes
  useEffect(() => {
    setSiegeRunning(false);
    setSiegeFinished(false);
    setSiegeTimeLeft(90);
    setNetworkIntegrity(100);
    setCombo(1);
    setCurrentAlertIdx(0);
    setSiegeDecisionFeedback(null);
    setSiegeSessionStats({ correct: 0, total: 0, xpEarned: 0 });
    setBonusMissionAnswered(null);
  }, [selectedDate]);

  useEffect(() => {
    if (!siegeRunning || siegeFinished) return;
    const timer = setInterval(() => {
      setSiegeTimeLeft((prev) => {
        if (prev <= 1) {
          setSiegeRunning(false);
          setSiegeFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [siegeRunning, siegeFinished]);

  const startSocSiege = () => {
    setSiegeRunning(true);
    setSiegeFinished(false);
    setSiegeTimeLeft(90);
    setNetworkIntegrity(100);
    setCombo(1);
    setCurrentAlertIdx(0);
    setSiegeDecisionFeedback(null);
    setSiegeSessionStats({ correct: 0, total: 0, xpEarned: 0 });
  };

  const handleSocAction = (actionCode) => {
    if (!siegeRunning || siegeDecisionFeedback) return;
    const currentAlert = socAlerts[currentAlertIdx];
    const isCorrect = actionCode === currentAlert.correctAction;

    if (isCorrect) {
      const gainedXp = 75 * combo;
      const nextCombo = Math.min(4, combo + 1);
      setCombo(nextCombo);
      setSiegeSessionStats((prev) => ({
        correct: prev.correct + 1,
        total: prev.total + 1,
        xpEarned: prev.xpEarned + gainedXp
      }));
      onAwardXp(gainedXp, `SOC Siege Triage (${selectedDate})`);
      setSiegeDecisionFeedback({
        isCorrect: true,
        chosen: actionCode,
        gainedXp,
        explanation: currentAlert.explanation
      });
      if (siegeSessionStats.correct + 1 >= 3) {
        markDateModeCleared(selectedDate, 'socSiege');
      }
    } else {
      const nextIntegrity = Math.max(0, networkIntegrity - 25);
      setNetworkIntegrity(nextIntegrity);
      setCombo(1);
      setSiegeSessionStats((prev) => ({
        ...prev,
        total: prev.total + 1
      }));
      setSiegeDecisionFeedback({
        isCorrect: false,
        chosen: actionCode,
        gainedXp: 0,
        explanation: currentAlert.explanation
      });
      if (nextIntegrity <= 0) {
        setSiegeRunning(false);
        setSiegeFinished(true);
      }
    }
  };

  const handleNextSocAlert = () => {
    setSiegeDecisionFeedback(null);
    if (currentAlertIdx + 1 >= socAlerts.length) {
      setSiegeRunning(false);
      setSiegeFinished(true);
      markDateModeCleared(selectedDate, 'socSiege');
    } else {
      setCurrentAlertIdx((prev) => prev + 1);
    }
  };

  // Keyboard hotkeys (1-4 for actions, Enter for Next Alert) during SOC Under Siege
  useEffect(() => {
    if (activeMode !== 'soc-siege' || !siegeRunning || siegeFinished) return;
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (!siegeDecisionFeedback) {
        if (e.key === '1') {
          e.preventDefault();
          handleSocAction('ISOLATE_HOST');
        } else if (e.key === '2') {
          e.preventDefault();
          handleSocAction('BLOCK_IP_WAF');
        } else if (e.key === '3') {
          e.preventDefault();
          handleSocAction('REVOKE_TOKEN');
        } else if (e.key === '4') {
          e.preventDefault();
          handleSocAction('FALSE_POSITIVE');
        }
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNextSocAlert();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // ============================================================================
  // MODE 2 STATE: "TERMINAL CTF" (Interactive Browser Shell)
  // ============================================================================
  const allCtfScenarios = useMemo(() => {
    const dailyScenario = getDailyTerminalScenario(selectedDate, liveThreatsData);
    return [dailyScenario, ...TERMINAL_SCENARIOS];
  }, [selectedDate, liveThreatsData]);

  const [activeCtfId, setActiveCtfId] = useState(allCtfScenarios[0].id);
  useEffect(() => {
    setActiveCtfId(allCtfScenarios[0].id);
  }, [selectedDate, allCtfScenarios]);

  const activeScenario = useMemo(
    () => allCtfScenarios.find((s) => s.id === activeCtfId) || allCtfScenarios[0],
    [allCtfScenarios, activeCtfId]
  );

  const [cwd, setCwd] = useState(activeScenario.initialCwd);
  const [terminalLines, setTerminalLines] = useState([]);
  const [cmdInput, setCmdInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyCursor, setHistoryCursor] = useState(-1);
  const [solvedCtfIds, setSolvedCtfIds] = useState(() => {
    try {
      const saved = localStorage.getItem('cyberhub_arena_solved_ctfs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [showCtfHint, setShowCtfHint] = useState(false);
  const terminalOutputRef = useRef(null);

  useEffect(() => {
    setCwd(activeScenario.initialCwd);
    setShowCtfHint(false);
    setTerminalLines([
      {
        type: 'system',
        text: `================================================================================\nCYBER ARENA // INTERACTIVE BROWSER SHELL — ${activeScenario.code}: ${activeScenario.title}\nConnected as: ${activeScenario.user} | Working Directory: ${activeScenario.initialCwd}\nType 'help' for available commands, or click any Quick Command pill below.\n================================================================================`
      }
    ]);
  }, [activeScenario]);

  useEffect(() => {
    if (terminalOutputRef.current) {
      terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
    }
  }, [terminalLines]);

  const resolvePath = (currentDir, targetPath) => {
    if (!targetPath || targetPath === '.') return currentDir;
    if (targetPath === '~') return currentDir;
    if (targetPath.startsWith('/')) {
      return targetPath.replace(/\/+$/, '') || '/';
    }
    const parts = currentDir.split('/').filter(Boolean);
    const relParts = targetPath.split('/').filter(Boolean);
    for (const p of relParts) {
      if (p === '.') continue;
      if (p === '..') parts.pop();
      else parts.push(p);
    }
    return '/' + parts.join('/');
  };

  const executeTerminalCommand = (rawCmd) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const promptLine = `${activeScenario.user}:${cwd}$ ${trimmed}`;
    const tokens = trimmed.split(/\s+/);
    const cmd = tokens[0].toLowerCase();
    const args = tokens.slice(1);

    let output = '';
    let outputType = 'output';

    const filesMap = activeScenario.files || {};
    const allFilePaths = Object.keys(filesMap);

    if (cmd === 'help') {
      output = `Available Cyber Arena Shell Commands:
  help                  Show this command reference
  ls [-la] [dir]        List directory contents (use -la to reveal hidden dotfiles)
  cd <dir>              Change working directory
  pwd                   Print current working directory
  cat <file>            Display full contents of a file
  grep <pattern> [file] Search for a string/regex across files
  strings <file>        Extract printable ASCII strings from a binary or script
  base64 [-d] <str>     Decode a Base64 string (e.g., base64 -d RkxBR3t...)
  ps [aux]              List active running processes and PIDs
  netstat [-tulnp]      List active network sockets and C2 connections
  history               View recent bash command history on this host
  whoami                Display current user context
  clear                 Clear terminal screen
  submit <FLAG{...}>    Submit captured flag for XP verification`;
    } else if (cmd === 'clear') {
      setTerminalLines([]);
      return;
    } else if (cmd === 'whoami') {
      output = activeScenario.user.split('@')[0];
    } else if (cmd === 'pwd') {
      output = cwd;
    } else if (cmd === 'ps') {
      output = activeScenario.psOutput;
    } else if (cmd === 'netstat') {
      output = activeScenario.netstatOutput;
    } else if (cmd === 'history') {
      output = activeScenario.historyOutput;
    } else if (cmd === 'cd') {
      const target = resolvePath(cwd, args[0] || activeScenario.initialCwd);
      const dirExists =
        target === '/' ||
        allFilePaths.some((fp) => fp === target || fp.startsWith(target + '/'));
      if (dirExists) {
        setCwd(target);
        output = '';
      } else {
        output = `bash: cd: ${args[0]}: No such file or directory`;
        outputType = 'error';
      }
    } else if (cmd === 'ls') {
      const showHidden = args.some((a) => a.startsWith('-') && a.includes('a'));
      const pathArg = args.find((a) => !a.startsWith('-'));
      const targetDir = pathArg ? resolvePath(cwd, pathArg) : cwd;

      const entries = new Set();
      allFilePaths.forEach((fp) => {
        const prefix = targetDir === '/' ? '/' : targetDir + '/';
        if (fp.startsWith(prefix)) {
          const rest = fp.slice(prefix.length);
          const firstSeg = rest.split('/')[0];
          if (firstSeg) {
            if (showHidden || !firstSeg.startsWith('.')) {
              const isSubDir = rest.includes('/');
              entries.add(isSubDir ? `${firstSeg}/` : firstSeg);
            }
          }
        }
      });

      if (entries.size === 0) {
        output = showHidden
          ? '.  ..  (No matching files in this directory)'
          : '(No visible files — try "ls -la" to check hidden dotfiles)';
      } else {
        const list = Array.from(entries).sort();
        output = showHidden
          ? `drwxr-xr-x 2 ${activeScenario.user.split('@')[0]} 4096 .\ndrwxr-xr-x 4 root 4096 ..\n` +
            list.map((item) => `-rw-r--r-- 1 ${activeScenario.user.split('@')[0]} 1048 ${item}`).join('\n')
          : list.join('  ');
      }
    } else if (cmd === 'cat' || cmd === 'strings') {
      const fileArg = args.find((a) => !a.startsWith('-'));
      if (!fileArg) {
        output = `Usage: ${cmd} <filename>`;
        outputType = 'error';
      } else {
        const fullPath = resolvePath(cwd, fileArg);
        if (filesMap[fullPath]) {
          output = filesMap[fullPath];
        } else {
          output = `${cmd}: ${fileArg}: No such file or directory (Current dir: ${cwd})`;
          outputType = 'error';
        }
      }
    } else if (cmd === 'grep') {
      if (args.length < 1) {
        output = 'Usage: grep <pattern> [file]';
        outputType = 'error';
      } else {
        const pattern = args[0].replace(/^['"]|['"]$/g, '');
        const fileArg = args[1];
        const matches = [];
        const searchFiles = fileArg
          ? [resolvePath(cwd, fileArg)]
          : allFilePaths;

        searchFiles.forEach((fp) => {
          const content = filesMap[fp];
          if (content) {
            content.split('\n').forEach((line, idx) => {
              if (line.toLowerCase().includes(pattern.toLowerCase())) {
                matches.push(`${fp}:${idx + 1}: ${line}`);
              }
            });
          }
        });
        output = matches.length > 0 ? matches.join('\n') : `(grep: no matches found for "${pattern}")`;
      }
    } else if (cmd === 'base64') {
      const strArg = args.filter((a) => !a.startsWith('-')).join('');
      if (!strArg) {
        output = 'Usage: base64 -d <encoded_string>';
        outputType = 'error';
      } else {
        try {
          // Check if strArg is a filename first
          const maybeFile = resolvePath(cwd, strArg);
          const rawInput = filesMap[maybeFile] ? filesMap[maybeFile].trim() : strArg.trim();
          const decoded = atob(rawInput);
          output = `[DECODED BASE64 OUTPUT]:\n${decoded}`;
          outputType = 'success';
        } catch {
          output = `base64: invalid input "${strArg}" (Pass the raw Base64 token string, e.g., base64 -d RkxBR3t...)`;
          outputType = 'error';
        }
      }
    } else if (cmd === 'submit') {
      const submittedFlag = args.join(' ').trim();
      if (!submittedFlag) {
        output = `Usage: submit FLAG{...}`;
        outputType = 'error';
      } else if (submittedFlag.toUpperCase() === activeScenario.flag.toUpperCase()) {
        const alreadySolved = !!solvedCtfIds[activeScenario.id];
        if (!alreadySolved) {
          const updated = { ...solvedCtfIds, [activeScenario.id]: true };
          setSolvedCtfIds(updated);
          localStorage.setItem('cyberhub_arena_solved_ctfs', JSON.stringify(updated));
          onAwardXp(activeScenario.xpReward, `Terminal CTF: ${activeScenario.title}`);
          markDateModeCleared(selectedDate, 'terminalCtf');
        }
        output = `🎉 [FLAG VERIFIED // ACCESS GRANTED]
Captured Flag: ${activeScenario.flag}
${alreadySolved ? '(Scenario already completed previously)' : `+${activeScenario.xpReward} XP Awarded to your Cyber Arena Profile!`}`;
        outputType = 'success';
      } else {
        output = `✗ [INVALID FLAG]: "${submittedFlag}" does not match this scenario's flag. Keep hunting or click 'Show Tactical Hint'!`;
        outputType = 'error';
      }
    } else {
      output = `bash: ${cmd}: command not found. Type 'help' for supported forensics commands.`;
      outputType = 'error';
    }

    setTerminalLines((prev) => [
      ...prev,
      { type: 'prompt', text: promptLine },
      ...(output ? [{ type: outputType, text: output }] : [])
    ]);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!cmdInput.trim()) return;
    const cmd = cmdInput;
    setCmdHistory((prev) => [cmd, ...prev]);
    setHistoryCursor(-1);
    setCmdInput('');
    executeTerminalCommand(cmd);
  };

  const handleTerminalKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyCursor + 1 < cmdHistory.length) {
        const nextIdx = historyCursor + 1;
        setHistoryCursor(nextIdx);
        setCmdInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyCursor > 0) {
        const nextIdx = historyCursor - 1;
        setHistoryCursor(nextIdx);
        setCmdInput(cmdHistory[nextIdx]);
      } else if (historyCursor === 0) {
        setHistoryCursor(-1);
        setCmdInput('');
      }
    }
  };

  // ============================================================================
  // MODE 3 STATE: "SPOT THE VULN" (Code & Config Inspector)
  // ============================================================================
  const allVulnChallenges = useMemo(() => {
    const dailyVuln = getDailySpotTheVulnChallenge(selectedDate, liveThreatsData);
    return [dailyVuln, ...SPOT_THE_VULN_CHALLENGES];
  }, [selectedDate, liveThreatsData]);

  const [activeVulnIdx, setActiveVulnIdx] = useState(0);
  const [clickedLineNumber, setClickedLineNumber] = useState(null);
  const [selectedPatchIdx, setSelectedPatchIdx] = useState(null);
  const [solvedVulnIds, setSolvedVulnIds] = useState(() => {
    try {
      const saved = localStorage.getItem('cyberhub_arena_solved_vulns');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    setActiveVulnIdx(0);
    setClickedLineNumber(null);
    setSelectedPatchIdx(null);
  }, [selectedDate]);

  const activeVuln = allVulnChallenges[activeVulnIdx] || allVulnChallenges[0];
  const isLineFound = clickedLineNumber === activeVuln.vulnerableLine;

  const handleSelectPatch = (patchIdx) => {
    setSelectedPatchIdx(patchIdx);
    const patch = activeVuln.patches[patchIdx];
    if (patch.isCorrect && !solvedVulnIds[activeVuln.id]) {
      const updated = { ...solvedVulnIds, [activeVuln.id]: true };
      setSolvedVulnIds(updated);
      localStorage.setItem('cyberhub_arena_solved_vulns', JSON.stringify(updated));
      onAwardXp(activeVuln.xpReward, `Spot the Vuln: ${activeVuln.title}`);
      markDateModeCleared(selectedDate, 'spotVuln');
    }
  };

  // ============================================================================
  // WORDLE-STYLE VIRAL SHARE SCORE CARD
  // ============================================================================
  const rankObj = getRankForXp(arenaProfile.xp);

  const handleShareScoreCard = () => {
    const dateEntry = dailyHistory[selectedDate] || {};
    const m1 = dateEntry.socSiege || siegeSessionStats.correct >= 3 ? '🟩🟩🟩' : '🟩🟩⬛';
    const m2 = dateEntry.terminalCtf || Object.keys(solvedCtfIds).length > 0 ? '🚩🚩🚩' : '🚩⬛⬛';
    const m3 = dateEntry.spotVuln || Object.keys(solvedVulnIds).length >= 2 ? '🟩🟩🟩' : '🟩⬛⬛';

    const shareText = [
      `🕹️ CYBERDEFENSE // CYBER ARENA [${selectedDate}]`,
      `Op: ${activeOpMeta.codename}`,
      `🎖️ Rank: ${rankObj.title} (${arenaProfile.xp} XP) | 🔥 Streak: ${arenaProfile.streak}d`,
      `🛡️ SOC Under Siege: ${m1}`,
      `💻 Terminal CTF:    ${m2}`,
      `🔍 Spot The Vuln:   ${m3}`,
      `Play today's live operation: https://atharvajdhumal.github.io/cybersecurity-handbook/#arena`
    ].join('\n');

    navigator.clipboard.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  // Bonus Daily Live Threat Scenario derived from `/data/daily-threats.json`
  const bonusLiveQuestion = liveThreatsData?.dailyQuestions?.[0];

  return (
    <div className="space-y-10 animate-view-in">
      {/* =====================================================================
          1. TOP GAMIFICATION & DYNAMIC DAILY OPERATION BANNER
         ===================================================================== */}
      <section className="soc-card rounded-3xl p-6 sm:p-8 border border-[#00f0ff]/45 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#00ff66]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00f0ff]/15 border border-[#00f0ff]/40 text-[#00f0ff] text-xs font-mono font-bold">
                <Gamepad2 className="w-3.5 h-3.5" />
                CYBER ARENA // 3-MODE INTERACTIVE GAME SUITE
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00ff66]/15 border border-[#00ff66]/40 text-[#00ff66] text-xs font-mono font-bold">
                <Calendar className="w-3.5 h-3.5" />
                {selectedDate === todayIso ? `TODAY'S LIVE LEVEL: ${selectedDate}` : `ARCHIVED LEVEL: ${selectedDate}`}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {activeOpMeta.codename}
            </h1>
            <p className="text-sm text-slate-300 mt-1.5 max-w-2xl">
              Sector Target: <strong className="text-[#00f0ff]">{activeOpMeta.sectorFocus}</strong> • New procedural & threat-feed levels drop every 24 hours while all past daily operations remain permanently playable in the Archive below.
            </p>
          </div>

          {/* Right Player Stats, Archive Toggle & Viral Share Card */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-400">CURRENT RANK</div>
                <div className="text-sm font-mono font-extrabold text-[#00f0ff]">
                  {rankObj.badge} ({arenaProfile.xp} XP)
                </div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-400">STREAK</div>
                <div className="text-sm font-mono font-extrabold text-amber-400 flex items-center gap-1">
                  <Flame className="w-4 h-4 fill-amber-400" /> {arenaProfile.streak}d
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowArchiveBrowser((prev) => !prev)}
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl font-mono text-xs font-bold border transition-all ${
                showArchiveBrowser
                  ? 'bg-[#00f0ff] text-slate-950 border-[#00f0ff] shadow-cyan-glow'
                  : 'bg-slate-900 hover:bg-slate-800 text-[#00f0ff] border-[#00f0ff]/40'
              }`}
            >
              <History className="w-4 h-4" />
              {showArchiveBrowser ? 'Hide Level Archive' : 'Past Daily Levels (Archive)'}
            </button>

            <button
              onClick={handleShareScoreCard}
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl font-mono text-xs font-extrabold uppercase tracking-wider transition-all ${
                copiedShare
                  ? 'bg-[#00ff66] text-slate-950 shadow-emerald-glow'
                  : 'bg-[#00ff66]/15 hover:bg-[#00ff66]/25 text-[#00ff66] border border-[#00ff66]/40'
              }`}
            >
              {copiedShare ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {copiedShare ? 'Score Card Copied!' : 'Share Score Card'}
            </button>
          </div>
        </div>

        {/* ===================================================================
            EXPANDABLE HISTORICAL DAILY LEVELS ARCHIVE VAULT
           =================================================================== */}
        {showArchiveBrowser && (
          <div className="mt-6 pt-6 border-t border-slate-800/90 space-y-4 animate-view-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-mono font-bold uppercase text-[#00f0ff] flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Historical Daily Operations Archive (Play Today or Any Past Level)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Every calendar date seeds a unique SOC Under Siege wave, a unique Daily Terminal CTF server with its own flag, and a unique Daily Spot-the-Vuln audit.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-mono text-slate-400">Jump to Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  max={todayIso}
                  onChange={(e) => {
                    if (e.target.value) setSelectedDate(e.target.value);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-[#00f0ff]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {recentDates.map((dStr, idx) => {
                const meta = getOperationMetadataForDate(dStr);
                const isSelected = dStr === selectedDate;
                const cleared = dailyHistory[dStr] || {};
                const clearedCount =
                  (cleared.socSiege ? 1 : 0) +
                  (cleared.terminalCtf ? 1 : 0) +
                  (cleared.spotVuln ? 1 : 0);

                return (
                  <button
                    key={dStr}
                    onClick={() => setSelectedDate(dStr)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#00f0ff]/15 border-[#00f0ff] shadow-cyan-glow'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono font-bold text-[#00f0ff]">
                        {idx === 0 ? 'TODAY' : dStr}
                      </span>
                      <span className="text-[10px] font-mono text-[#00ff66]">
                        {clearedCount}/3 ★
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white mt-1 truncate">
                      {meta.codename.split('//')[1]?.trim()}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                      {dStr}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          2. THREE GAME MODE SWITCHER TABS
         ===================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            id: 'soc-siege',
            number: 'MODE 01',
            title: '🛡️ SOC UNDER SIEGE',
            subtitle: 'Live 90s Incident Triage Simulator',
            badge: dailyHistory[selectedDate]?.socSiege ? '✓ CLEARED' : '+300 XP',
            icon: ShieldAlert
          },
          {
            id: 'terminal-ctf',
            number: 'MODE 02',
            title: '💻 TERMINAL CTF',
            subtitle: 'Interactive Browser Forensics Shell',
            badge: dailyHistory[selectedDate]?.terminalCtf ? '✓ CLEARED' : '4 MISSIONS',
            icon: Terminal
          },
          {
            id: 'spot-vuln',
            number: 'MODE 03',
            title: '🔍 SPOT THE VULN',
            subtitle: 'Line-by-Line Code & Config Inspector',
            badge: dailyHistory[selectedDate]?.spotVuln ? '✓ CLEARED' : '7 AUDITS',
            icon: Code2
          }
        ].map((m) => {
          const Icon = m.icon;
          const isActive = activeMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                setActiveMode(m.id);
                if (typeof window !== 'undefined') {
                  window.history.replaceState(null, '', `#arena/${m.id}`);
                }
              }}
              className={`soc-card rounded-2xl p-5 text-left border transition-all flex items-center justify-between gap-4 ${
                isActive
                  ? 'border-[#00f0ff] bg-[#00f0ff]/10 shadow-cyan-glow'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${
                  isActive ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff]' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#00f0ff]">
                    {m.number} // {selectedDate}
                  </div>
                  <div className="text-base font-extrabold text-white mt-0.5">
                    {m.title}
                  </div>
                  <div className="text-xs text-slate-400">{m.subtitle}</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-[#00ff66] font-bold shrink-0">
                {m.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* =====================================================================
          MODE 1 VIEW: "SOC UNDER SIEGE" (LIVE INCIDENT TRIAGE SIMULATOR)
         ===================================================================== */}
      {activeMode === 'soc-siege' && (
        <section className="soc-card rounded-3xl p-6 sm:p-8 border border-[#00f0ff]/40 space-y-6 animate-view-in">
          {/* HUD Bar: 90s Timer, Network Integrity Health Bar (100%), Combo Multiplier */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-3">
              <Clock className={`w-6 h-6 ${siegeTimeLeft <= 20 ? 'text-[#ff3366] animate-pulse' : 'text-[#00f0ff]'}`} />
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-400">SHIFT TIMER</div>
                <div className={`text-xl font-mono font-black ${siegeTimeLeft <= 20 ? 'text-[#ff3366]' : 'text-white'}`}>
                  {siegeTimeLeft}s
                </div>
              </div>
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <HeartPulse className="w-4 h-4 text-[#00ff66]" /> NETWORK INTEGRITY HEALTH
                </span>
                <span className={`font-extrabold ${
                  networkIntegrity > 50 ? 'text-[#00ff66]' : 'text-[#ff3366]'
                }`}>
                  {networkIntegrity}%
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    networkIntegrity > 50
                      ? 'bg-gradient-to-r from-[#00f0ff] to-[#00ff66]'
                      : 'bg-[#ff3366]'
                  }`}
                  style={{ width: `${networkIntegrity}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-400">COMBO MULTIPLIER</div>
                <div className="text-xl font-mono font-black text-amber-400">
                  {combo}x STREAK
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono uppercase text-slate-400">ALERT QUEUE</div>
                <div className="text-xl font-mono font-black text-[#00f0ff]">
                  {currentAlertIdx + 1}/{socAlerts.length}
                </div>
              </div>
            </div>
          </div>

          {/* Start Screen / Active Triage Console / Shift Complete Screen */}
          {!siegeRunning && !siegeFinished ? (
            <div className="p-8 rounded-2xl bg-slate-950/90 border border-slate-800 text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-[#00f0ff]/15 border border-[#00f0ff]/40 flex items-center justify-center mx-auto">
                <ShieldAlert className="w-8 h-8 text-[#00f0ff]" />
              </div>
              <div className="max-w-xl mx-auto space-y-2">
                <span className="text-xs font-mono text-[#00ff66] font-bold uppercase">
                  OPERATION DATE: {selectedDate} // {socAlerts.length} INCOMING TELEMETRY ALERTS
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Ready to Defend the SOC Queue?
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  You have <strong>90 seconds</strong> and <strong>100% Network Integrity</strong> to inspect raw Windows Event 4688/Sysmon logs, Suricata HTTP payloads, AWS CloudTrail IAM events, and Kerberoasting tickets—while avoiding self-inflicted outages on legitimate admin false positives!
                </p>
              </div>
              <button
                onClick={startSocSiege}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-slate-950 font-mono font-black text-sm uppercase tracking-wider shadow-cyan-glow transition-all"
              >
                <Play className="w-4 h-4 fill-slate-950" /> Launch 90s SOC Siege ({selectedDate})
              </button>
            </div>
          ) : siegeFinished ? (
            <div className="p-8 rounded-2xl bg-slate-950/90 border border-[#00ff66]/40 text-center space-y-5">
              <Trophy className="w-12 h-12 text-[#00ff66] mx-auto" />
              <h3 className="text-2xl font-black text-white">
                {networkIntegrity > 0 ? 'SOC Shift Completed — Perimeter Held!' : 'Network Integrity Breached!'}
              </h3>
              <p className="text-sm font-mono text-slate-300">
                Correct Triage Decisions: <strong className="text-[#00ff66]">{siegeSessionStats.correct} / {siegeSessionStats.total}</strong> • XP Earned: <strong className="text-[#00f0ff]">+{siegeSessionStats.xpEarned} XP</strong> • Remaining Integrity: <strong>{networkIntegrity}%</strong>
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={startSocSiege}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00f0ff] text-slate-950 font-mono font-bold text-xs uppercase"
                >
                  <RotateCcw className="w-4 h-4" /> Replay Shift
                </button>
                <button
                  onClick={() => setActiveMode('terminal-ctf')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-[#00ff66]/40 text-[#00ff66] font-mono font-bold text-xs uppercase"
                >
                  Proceed to Mode 2: Terminal CTF <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Active Incoming Alert Card */
            <div className="space-y-6">
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2.5 py-1 rounded font-mono text-xs font-bold ${
                      socAlerts[currentAlertIdx].severity === 'CRITICAL'
                        ? 'bg-[#ff3366]/20 text-[#ff3366] border border-[#ff3366]/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {socAlerts[currentAlertIdx].severity} ALERT
                    </span>
                    <span className="text-xs font-mono text-[#00f0ff]">
                      {socAlerts[currentAlertIdx].source}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    HOST / TARGET: <strong className="text-white">{socAlerts[currentAlertIdx].host}</strong>
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {socAlerts[currentAlertIdx].title}
                </h3>

                <div className="rounded-xl bg-[#050811] border border-slate-800 overflow-hidden">
                  <div className="px-4 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                    RAW SIEM / EDR / IDS TELEMETRY PAYLOAD
                  </div>
                  <pre className="p-4 text-xs font-mono text-[#00ff66] overflow-x-auto leading-relaxed whitespace-pre-wrap">
                    {socAlerts[currentAlertIdx].rawTelemetry}
                  </pre>
                </div>
              </div>

              {/* 4 Required Action Buttons (with 1-4 Keyboard Hotkeys) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {[
                  {
                    hotkey: '1',
                    code: 'ISOLATE_HOST',
                    label: '[Isolate Endpoint]',
                    sub: 'Quarantine workstation/host NIC via EDR',
                    icon: Server,
                    color: 'hover:border-[#ff3366] hover:bg-[#ff3366]/10 text-[#ff3366]'
                  },
                  {
                    hotkey: '2',
                    code: 'BLOCK_IP_WAF',
                    label: '[Block Source IP / WAF]',
                    sub: 'Drop attacker IP & deploy WAF virtual rule',
                    icon: Ban,
                    color: 'hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 text-[#00f0ff]'
                  },
                  {
                    hotkey: '3',
                    code: 'REVOKE_TOKEN',
                    label: '[Revoke Identity Token]',
                    sub: 'Kill IAM STS / OAuth / Kerberos TGT session',
                    icon: KeyRound,
                    color: 'hover:border-amber-400 hover:bg-amber-500/10 text-amber-300'
                  },
                  {
                    hotkey: '4',
                    code: 'FALSE_POSITIVE',
                    label: '[Dismiss as False Positive]',
                    sub: 'Authorized admin activity / allowlisted scan',
                    icon: CheckSquare,
                    color: 'hover:border-[#00ff66] hover:bg-[#00ff66]/10 text-[#00ff66]'
                  }
                ].map((btn) => {
                  const Icon = btn.icon;
                  return (
                    <button
                      key={btn.code}
                      disabled={!!siegeDecisionFeedback}
                      onClick={() => handleSocAction(btn.code)}
                      className={`p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left transition-all ${btn.color} disabled:opacity-50`}
                    >
                      <div className="flex items-center justify-between gap-2 font-mono font-extrabold text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{btn.label}</span>
                        </div>
                        <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-900 border border-slate-700 rounded text-slate-300 shrink-0">
                          {btn.hotkey}
                        </kbd>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{btn.sub}</p>
                    </button>
                  );
                })}
              </div>

              {/* Instant Decision Explanation & Next Alert Button */}
              {siegeDecisionFeedback && (
                <div className={`p-5 rounded-2xl border animate-view-in flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  siegeDecisionFeedback.isCorrect
                    ? 'bg-[#00ff66]/10 border-[#00ff66]/50'
                    : 'bg-[#ff3366]/10 border-[#ff3366]/50'
                }`}>
                  <div className="space-y-1">
                    <div className="font-mono font-extrabold text-xs sm:text-sm uppercase flex items-center gap-2">
                      {siegeDecisionFeedback.isCorrect ? (
                        <span className="text-[#00ff66]">
                          ✓ CORRECT RESPONSE (+{siegeDecisionFeedback.gainedXp} XP)
                        </span>
                      ) : (
                        <span className="text-[#ff3366]">
                          ✗ WRONG CONTAINMENT ACTION (-25% NETWORK INTEGRITY)
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {siegeDecisionFeedback.explanation}
                    </p>
                  </div>
                  <button
                    onClick={handleNextSocAlert}
                    className="px-5 py-3 rounded-xl bg-[#00f0ff] text-slate-950 font-mono font-extrabold text-xs uppercase shrink-0 inline-flex items-center gap-2"
                  >
                    <span>Next Alert ──►</span>
                    <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-950/20 rounded">Enter</kbd>
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* =====================================================================
          MODE 2 VIEW: "TERMINAL CTF" (INTERACTIVE BROWSER SHELL)
         ===================================================================== */}
      {activeMode === 'terminal-ctf' && (
        <section className="soc-card rounded-3xl p-6 sm:p-8 border border-[#00ff66]/40 space-y-6 animate-view-in">
          {/* Scenario Selector Pills (Daily Dynamic Scenario + Scenarios A, B, C) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {allCtfScenarios.map((scen) => {
              const isSelected = scen.id === activeScenario.id;
              const isSolved = !!solvedCtfIds[scen.id];
              return (
                <button
                  key={scen.id}
                  onClick={() => setActiveCtfId(scen.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#00ff66]/15 border-[#00ff66] shadow-emerald-glow'
                      : 'bg-slate-950/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#00f0ff] uppercase">
                        {scen.code}
                      </span>
                      {isSolved ? (
                        <span className="px-2 py-0.5 rounded bg-[#00ff66]/20 text-[#00ff66] font-mono text-[10px] font-bold">
                          ✓ CAPTURED
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-amber-400">
                          +{scen.xpReward} XP
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-extrabold text-white mt-1.5">
                      {scen.title}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">
                    {scen.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Scenario Briefing & Hint Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-[#00ff66]" />
                <span className="font-mono font-bold text-xs text-[#00ff66] uppercase">
                  MISSION BRIEFING // {activeScenario.title}
                </span>
              </div>
              <button
                onClick={() => setShowCtfHint((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-amber-500/40 text-amber-300 font-mono text-xs hover:bg-amber-500/10"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {showCtfHint ? 'Hide Walkthrough Hint' : 'Need a Hint?'}
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {activeScenario.briefing}
            </p>
            {showCtfHint && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-200">
                💡 <strong>WALKTHROUGH HINT:</strong> {activeScenario.hint}
              </div>
            )}
          </div>

          {/* Interactive Browser Terminal Window */}
          <div className="rounded-2xl overflow-hidden border border-slate-700 bg-[#050811] shadow-2xl">
            {/* Terminal Title Bar */}
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff3366]" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-[#00ff66]" />
                <span className="ml-2 text-xs font-mono text-slate-300">
                  {activeScenario.user}:{cwd} (bash)
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#00f0ff]">
                submit FLAG&#123;...&#125;
              </span>
            </div>

            {/* Quick Command Chips for 1-Click Convenience */}
            <div className="px-4 py-2 bg-slate-950/90 border-b border-slate-800/80 flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono text-slate-500 mr-1">QUICK RUN:</span>
              {['help', 'ls -la', 'ps', 'netstat', 'history', `submit ${activeScenario.flag}`].map((qCmd) => (
                <button
                  key={qCmd}
                  onClick={() => executeTerminalCommand(qCmd)}
                  className="px-2 py-0.5 rounded bg-slate-900 hover:bg-[#00f0ff]/20 border border-slate-800 hover:border-[#00f0ff]/40 text-[11px] font-mono text-slate-300 hover:text-[#00f0ff] transition-colors"
                >
                  {qCmd.startsWith('submit') ? '⚡ Auto-Test Flag' : qCmd}
                </button>
              ))}
            </div>

            {/* Scrollable Terminal Output */}
            <div
              ref={terminalOutputRef}
              className="p-4 sm:p-5 h-80 overflow-y-auto font-mono text-xs sm:text-sm space-y-2"
            >
              {terminalLines.map((line, i) => (
                <pre
                  key={i}
                  className={`whitespace-pre-wrap leading-relaxed ${
                    line.type === 'prompt'
                      ? 'text-[#00f0ff] font-bold'
                      : line.type === 'error'
                      ? 'text-[#ff3366]'
                      : line.type === 'success'
                      ? 'text-[#00ff66] font-bold'
                      : line.type === 'system'
                      ? 'text-slate-400'
                      : 'text-slate-200'
                  }`}
                >
                  {line.text}
                </pre>
              ))}
            </div>

            {/* Command Input Prompt */}
            <form
              onSubmit={handleTerminalSubmit}
              className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
            >
              <span className="font-mono text-xs sm:text-sm text-[#00ff66] font-bold shrink-0">
                {activeScenario.user}:{cwd}$
              </span>
              <input
                type="text"
                value={cmdInput}
                onChange={(e) => setCmdInput(e.target.value)}
                onKeyDown={handleTerminalKeyDown}
                placeholder="Type a command (help, ls -la, cat, strings, base64 -d, ps, netstat, history, submit FLAG{...})"
                className="w-full bg-transparent font-mono text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1 rounded-lg bg-[#00ff66] text-slate-950 font-mono font-bold text-xs shrink-0"
              >
                RUN
              </button>
            </form>
          </div>
        </section>
      )}

      {/* =====================================================================
          MODE 3 VIEW: "SPOT THE VULN" (CODE & CONFIG INSPECTOR)
         ===================================================================== */}
      {activeMode === 'spot-vuln' && (
        <section className="soc-card rounded-3xl p-6 sm:p-8 border border-[#00f0ff]/40 space-y-6 animate-view-in">
          {/* Challenge Selector Strip (Daily Dynamic Audit + 6 Core Challenges) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {allVulnChallenges.map((ch, idx) => {
              const isSelected = idx === activeVulnIdx;
              const isSolved = !!solvedVulnIds[ch.id];
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveVulnIdx(idx);
                    setClickedLineNumber(null);
                    setSelectedPatchIdx(null);
                  }}
                  className={`px-3.5 py-2 rounded-xl font-mono text-xs whitespace-nowrap border transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#00f0ff] text-slate-950 font-extrabold border-[#00f0ff] shadow-cyan-glow'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{idx === 0 ? `⚡ Daily (${selectedDate})` : `0${idx}. ${ch.title.split(' ')[0]} ${ch.title.split(' ')[1]}`}</span>
                  {isSolved && <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff66]" />}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-[#00f0ff]">
                {activeVuln.badge} // +{activeVuln.xpReward} XP
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                {activeVuln.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {activeVuln.description}
              </p>
            </div>
          </div>

          {/* Interactive Line-Clickable Code Inspector */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#050811]">
            <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>STEP 1: CLICK THE EXACT VULNERABLE LINE NUMBER BELOW</span>
              <span>LANGUAGE: {activeVuln.language.toUpperCase()}</span>
            </div>
            <div className="divide-y divide-slate-900/60 font-mono text-xs sm:text-sm">
              {activeVuln.codeLines.map((lineText, idx) => {
                const lineNum = idx + 1;
                const isClicked = clickedLineNumber === lineNum;
                const isCorrectLine = lineNum === activeVuln.vulnerableLine;

                let rowStyle = 'hover:bg-slate-900/80 text-slate-200';
                if (isClicked && isCorrectLine) {
                  rowStyle = 'bg-[#00ff66]/15 text-white border-l-4 border-[#00ff66]';
                } else if (isClicked && !isCorrectLine) {
                  rowStyle = 'bg-[#ff3366]/15 text-slate-300 border-l-4 border-[#ff3366]';
                }

                return (
                  <button
                    key={lineNum}
                    onClick={() => {
                      setClickedLineNumber(lineNum);
                      setSelectedPatchIdx(null);
                    }}
                    className={`w-full text-left px-4 py-2 flex items-center gap-4 transition-colors ${rowStyle}`}
                  >
                    <span className="w-7 text-right font-bold text-slate-500 select-none shrink-0">
                      {lineNum}
                    </span>
                    <pre className="overflow-x-auto whitespace-pre flex-1">
                      {lineText || ' '}
                    </pre>
                    {isClicked && isCorrectLine && (
                      <span className="px-2 py-0.5 rounded bg-[#00ff66] text-slate-950 font-bold text-[10px] shrink-0">
                        VULNERABILITY FOUND!
                      </span>
                    )}
                    {isClicked && !isCorrectLine && (
                      <span className="px-2 py-0.5 rounded bg-[#ff3366]/20 text-[#ff3366] font-bold text-[10px] shrink-0">
                        SAFE LINE — TRY AGAIN
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Secure Remediation Patch once vulnerable line is clicked */}
          {isLineFound && (
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-[#00ff66]/40 space-y-4 animate-view-in">
              <div>
                <div className="text-xs font-mono font-bold text-[#00ff66] uppercase">
                  ✓ VULNERABLE LINE {activeVuln.vulnerableLine} IDENTIFIED — STEP 2: SELECT THE SECURE REMEDIATION PATCH
                </div>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                  {activeVuln.vulnExplanation}
                </p>
              </div>

              <div className="space-y-2.5">
                {activeVuln.patches.map((patch, pIdx) => {
                  const isPicked = selectedPatchIdx === pIdx;
                  let patchStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-[#00f0ff]';
                  if (selectedPatchIdx !== null) {
                    if (patch.isCorrect) {
                      patchStyle = 'bg-[#00ff66]/15 border-[#00ff66] text-white';
                    } else if (isPicked) {
                      patchStyle = 'bg-[#ff3366]/15 border-[#ff3366] text-slate-200';
                    }
                  }

                  return (
                    <div key={pIdx} className="space-y-1.5">
                      <button
                        onClick={() => handleSelectPatch(pIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border font-mono text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${patchStyle}`}
                      >
                        <code className="break-all">{patch.label}</code>
                        {selectedPatchIdx !== null && patch.isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-[#00ff66] shrink-0" />
                        )}
                      </button>
                      {isPicked && (
                        <div className={`p-3 rounded-lg text-xs font-mono ${
                          patch.isCorrect ? 'text-[#00ff66] bg-[#00ff66]/10' : 'text-[#ff3366] bg-[#ff3366]/10'
                        }`}>
                          {patch.feedback}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}

      {/* =====================================================================
          4. BONUS "DAILY LIVE THREAT SCENARIO" CONNECTED TO /data/daily-threats.json
         ===================================================================== */}
      {bonusLiveQuestion && (
        <section className="soc-card rounded-3xl p-6 sm:p-8 border border-amber-500/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              BONUS DAILY LIVE THREAT SCENARIO // SYNCED FROM {import.meta.env.BASE_URL}data/daily-threats.json
            </span>
            <span className="text-xs font-mono text-[#00ff66] font-bold">
              REWARD: +200 BONUS XP
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-white">
            {bonusLiveQuestion.examBadge} — {bonusLiveQuestion.domain}
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
            {bonusLiveQuestion.scenario}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {bonusLiveQuestion.options.map((opt, idx) => {
              const isAnswered = bonusMissionAnswered !== null;
              const isCorrect = idx === bonusLiveQuestion.correctIndex;
              let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-amber-400';
              if (isAnswered) {
                if (isCorrect) style = 'bg-[#00ff66]/15 border-[#00ff66] text-white font-semibold';
                else if (idx === bonusMissionAnswered) style = 'bg-[#ff3366]/15 border-[#ff3366] text-slate-300';
              }
              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => {
                    setBonusMissionAnswered(idx);
                    if (idx === bonusLiveQuestion.correctIndex) {
                      onAwardXp(200, 'Bonus Daily Live Threat Scenario');
                    }
                  }}
                  className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {bonusMissionAnswered !== null && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200">
              <strong className="text-[#00ff66] font-mono block mb-1">
                ARCHITECTURAL RATIONALE:
              </strong>
              {bonusLiveQuestion.rationale}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
