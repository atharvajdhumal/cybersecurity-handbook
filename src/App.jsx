import React, { useState, useEffect, useMemo, useCallback, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import GlobalSearchModal from './components/GlobalSearchModal';
import HomeView from './components/HomeView';
import { ROADMAP_STAGES } from './data/roadmapData';
import { CORE_DOMAINS } from './data/domainsData';
import { Shield, Terminal, Search, ArrowUp } from 'lucide-react';

// Route-level code splitting for faster initial load
const ThreatFeedView = lazy(() => import('./components/ThreatFeedView'));
const DomainsView = lazy(() => import('./components/DomainsView'));
const ArsenalView = lazy(() => import('./components/ArsenalView'));
const RoadmapView = lazy(() => import('./components/RoadmapView'));
const CyberArenaView = lazy(() => import('./components/CyberArenaView'));

// Fallback initial daily threats in case fetch is still resolving
const INITIAL_FALLBACK_THREATS = {
  lastUpdated: "2026-10-29T06:00:00Z",
  feedStatus: "LIVE // AUTONOMOUS CISA KEV & TELEMETRY CORRELATION",
  threatLevel: "CRITICAL (DEFCON 2)",
  attackLog: [],
  deepDives: [],
  dailyQuestions: [],
  detectionRules: []
};

const VALID_TABS = new Set(['home', 'threats', 'domains', 'arsenal', 'roadmap', 'arena']);

function parseLocationHash(hashStr) {
  const cleaned = (hashStr || '').replace(/^#\/?/, '').trim();
  if (!cleaned) {
    return { tabId: 'home', payload: null };
  }
  const [rawTab, rawSub] = cleaned.split('/');
  const tabId = VALID_TABS.has(rawTab) ? rawTab : 'home';
  const sub = rawSub ? decodeURIComponent(rawSub) : null;

  if (!sub) {
    return { tabId, payload: null };
  }

  if (tabId === 'arena') {
    return { tabId, payload: { mode: sub } };
  }
  if (tabId === 'domains') {
    return { tabId, payload: { domainId: sub } };
  }
  if (tabId === 'threats') {
    return { tabId, payload: { section: sub } };
  }
  if (tabId === 'arsenal') {
    return { tabId, payload: { toolSearch: sub } };
  }
  if (tabId === 'roadmap') {
    return { tabId, payload: { nodeId: sub } };
  }
  return { tabId, payload: null };
}

function buildLocationHash(tabId, payload) {
  if (!tabId || tabId === 'home') return '#home';
  if (tabId === 'arena' && payload?.mode) return `#arena/${encodeURIComponent(payload.mode)}`;
  if (tabId === 'domains' && payload?.domainId) return `#domains/${encodeURIComponent(payload.domainId)}`;
  if (tabId === 'threats' && payload?.section) return `#threats/${encodeURIComponent(payload.section)}`;
  if (tabId === 'arsenal' && payload?.toolSearch) return `#arsenal/${encodeURIComponent(payload.toolSearch)}`;
  if (tabId === 'roadmap' && payload?.nodeId) return `#roadmap/${encodeURIComponent(payload.nodeId)}`;
  return `#${tabId}`;
}

export default function App() {
  const initialRoute = useMemo(
    () => parseLocationHash(typeof window !== 'undefined' ? window.location.hash : ''),
    []
  );
  const [activeTab, setActiveTab] = useState(initialRoute.tabId);
  const [navPayload, setNavPayload] = useState(initialRoute.payload);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Daily threats state loaded from /public/data/daily-threats.json
  const [dailyThreats, setDailyThreats] = useState(INITIAL_FALLBACK_THREATS);
  const [isReloadingFeed, setIsReloadingFeed] = useState(false);

  // Roadmap node completion persisted in localStorage
  const [completedNodes, setCompletedNodes] = useState(() => {
    try {
      const saved = localStorage.getItem('cyberhub_roadmap_completed');
      return saved ? JSON.parse(saved) : { 'node-virt-hardware': true, 'node-os-deepdive': true };
    } catch {
      return {};
    }
  });

  // Domain Quiz Scores persisted in localStorage
  const [domainQuizScores, setDomainQuizScores] = useState(() => {
    try {
      const saved = localStorage.getItem('cyberhub_domain_quiz_scores');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Cyber Arena XP, Rank & Daily Streak persisted in localStorage
  const [arenaProfile, setArenaProfile] = useState(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    try {
      const saved = localStorage.getItem('cyberhub_arena_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
          streak: typeof parsed.streak === 'number' ? parsed.streak : 1,
          lastPlayedDate: parsed.lastPlayedDate || todayStr
        };
      }
    } catch {
      // ignore localStorage read error
    }
    return { xp: 0, streak: 1, lastPlayedDate: todayStr };
  });

  const handleAwardXp = useCallback((amount) => {
    if (!amount || amount <= 0) return;
    const todayStr = new Date().toISOString().slice(0, 10);
    setArenaProfile((prev) => {
      let nextStreak = prev.streak || 1;
      if (prev.lastPlayedDate && prev.lastPlayedDate !== todayStr) {
        const lastDate = new Date(`${prev.lastPlayedDate}T00:00:00Z`);
        const currDate = new Date(`${todayStr}T00:00:00Z`);
        const diffDays = Math.round((currDate - lastDate) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          nextStreak += 1;
        } else if (diffDays > 1) {
          nextStreak = 1;
        }
      }
      const updated = {
        xp: (prev.xp || 0) + amount,
        streak: nextStreak,
        lastPlayedDate: todayStr
      };
      try {
        localStorage.setItem('cyberhub_arena_profile', JSON.stringify(updated));
      } catch {
        // ignore localStorage write error
      }
      return updated;
    });
  }, []);

  const fetchDailyThreats = useCallback(async () => {
    setIsReloadingFeed(true);
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}data/daily-threats.json`);
      if (response.ok) {
        const data = await response.json();
        setDailyThreats(data);
      }
    } catch (err) {
      console.error('Error loading daily-threats.json:', err);
    } finally {
      setTimeout(() => setIsReloadingFeed(false), 300);
    }
  }, []);

  useEffect(() => {
    fetchDailyThreats();
  }, [fetchDailyThreats]);

  // Global Ctrl+K / Cmd+K shortcut listener
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Sync state when user clicks browser Back/Forward or changes URL hash directly
  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseLocationHash(window.location.hash);
      setActiveTab(parsed.tabId);
      setNavPayload(parsed.payload);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = useCallback((tabId, payload = null) => {
    setActiveTab(tabId);
    setNavPayload(payload);
    const targetHash = buildLocationHash(tabId, payload);
    if (typeof window !== 'undefined' && window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggleNodeComplete = useCallback((nodeId) => {
    setCompletedNodes((prev) => {
      const updated = { ...prev, [nodeId]: !prev[nodeId] };
      localStorage.setItem('cyberhub_roadmap_completed', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleResetRoadmapProgress = useCallback(() => {
    setCompletedNodes({});
    localStorage.removeItem('cyberhub_roadmap_completed');
  }, []);

  const handleSaveDomainQuizScore = useCallback((domainId, score) => {
    setDomainQuizScores((prev) => {
      const updated = { ...prev };
      if (score === null || score === undefined) {
        delete updated[domainId];
      } else {
        updated[domainId] = score;
      }
      localStorage.setItem('cyberhub_domain_quiz_scores', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const totalRoadmapNodes = useMemo(
    () => ROADMAP_STAGES.reduce((acc, s) => acc + s.nodes.length, 0),
    []
  );
  const completedNodesCount = useMemo(
    () => Object.values(completedNodes).filter(Boolean).length,
    [completedNodes]
  );

  const quizScoreSummary = useMemo(() => {
    const total = CORE_DOMAINS.length * 3;
    const correct = Object.values(domainQuizScores).reduce((a, b) => a + b, 0);
    return { correct, total };
  }, [domainQuizScores]);

  return (
    <div className="min-h-screen soc-grid-bg text-slate-100 flex flex-col">
      {/* Sticky Top Cyber-SOC Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(id) => handleNavigate(id, null)}
        onOpenSearch={() => setSearchModalOpen(true)}
        completedNodesCount={completedNodesCount}
        totalNodesCount={totalRoadmapNodes}
        quizScoreSummary={quizScoreSummary}
        arenaProfile={arenaProfile}
      />

      {/* Global Search Modal (Ctrl+K) */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        dailyThreats={dailyThreats}
        onNavigate={handleNavigate}
      />

      {/* Active View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Suspense
          fallback={
            <div className="soc-card rounded-3xl p-12 text-center border border-[#00f0ff]/30 font-mono text-xs text-[#00f0ff]">
              INITIALIZING TELEMETRY MODULE...
            </div>
          }
        >
          {activeTab === 'home' && (
            <HomeView
              onNavigate={handleNavigate}
              dailyThreats={dailyThreats}
              domainQuizScores={domainQuizScores}
            />
          )}

          {activeTab === 'threats' && (
            <ThreatFeedView
              dailyThreats={dailyThreats}
              onReloadFeed={fetchDailyThreats}
              isReloadingFeed={isReloadingFeed}
              initialNavState={navPayload}
            />
          )}

          {activeTab === 'domains' && (
            <DomainsView
              initialDomainId={navPayload?.domainId}
              domainQuizScores={domainQuizScores}
              onSaveDomainQuizScore={handleSaveDomainQuizScore}
            />
          )}

          {activeTab === 'arsenal' && (
            <ArsenalView initialToolSearch={navPayload?.toolSearch} />
          )}

          {activeTab === 'roadmap' && (
            <RoadmapView
              completedNodes={completedNodes}
              onToggleNodeComplete={handleToggleNodeComplete}
              onResetRoadmapProgress={handleResetRoadmapProgress}
              initialNavState={navPayload}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'arena' && (
            <CyberArenaView
              arenaProfile={arenaProfile}
              onAwardXp={handleAwardXp}
              dailyThreats={dailyThreats}
              initialMode={navPayload?.mode}
            />
          )}
        </Suspense>
      </main>

      {/* Cyber-SOC Footer */}
      <footer className="border-t border-slate-800/80 bg-[#050811] py-10 px-4 sm:px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-[#00f0ff]" />
              <span className="font-mono font-extrabold text-sm text-white tracking-wider">
                CYBERDEFENSE // GLOBAL INTEL HUB
              </span>
              <span className="px-2 py-0.5 rounded bg-[#00ff66]/15 text-[#00ff66] font-mono text-[10px] font-bold">
                NIST CSF 2.0 ALIGNED
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-xl">
              Open-access cybersecurity architecture curriculum, autonomous daily CISA KEV threat intelligence, 68+ open-source defensive/offensive tools, and interactive CompTIA SecurityX (CAS-005) career pathways.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300"
            >
              <Search className="w-3.5 h-3.5 text-[#00f0ff]" /> Global Search (Ctrl+K)
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[#00f0ff]"
            >
              <ArrowUp className="w-3.5 h-3.5" /> Top
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
