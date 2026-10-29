import React, { useState } from 'react';
import {
  Shield,
  Search,
  Activity,
  BookOpen,
  Wrench,
  Map,
  Home,
  Menu,
  X,
  Terminal,
  Award
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenSearch,
  completedNodesCount,
  totalNodesCount,
  quizScoreSummary
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Dashboard & NIST 2.0', shortLabel: 'Dashboard', icon: Home },
    { id: 'threats', label: 'Daily Threats & Infamy', shortLabel: 'Threat Feed', icon: Activity, live: true },
    { id: 'domains', label: '8 Core Domains', shortLabel: '8 Domains', icon: BookOpen, badge: '8' },
    { id: 'arsenal', label: 'Open-Source Arsenal', shortLabel: 'Arsenal', icon: Wrench, badge: '68' },
    { id: 'roadmap', label: 'Roadmap, Roles & Certs', shortLabel: 'Roadmap', icon: Map }
  ];

  const handleNav = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070b14]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-lg">
      {/* Top Cyber-SOC Telemetry Strip */}
      <div className="bg-slate-950/90 border-b border-slate-800/60 px-4 py-1.5 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-ping" />
              SOC TELEMETRY: ONLINE
            </span>
            <span className="hidden sm:inline text-slate-400">
              FRAMEWORK: <strong className="text-[#00f0ff]">NIST CSF 2.0</strong> // CERT STANDARD: <strong className="text-slate-200">SECURITYX (CAS-005)</strong>
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden md:inline-flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>QUIZ MASTERY: <strong className="text-[#00f0ff]">{quizScoreSummary.correct}/{quizScoreSummary.total}</strong></span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#00ff66]" />
              <span>ROADMAP: <strong className="text-[#00ff66]">{completedNodesCount}/{totalNodesCount} NODES</strong></span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00f0ff]/20 to-[#00ff66]/10 border border-[#00f0ff]/40 flex items-center justify-center shadow-cyan-glow group-hover:border-[#00f0ff] transition-all">
              <Shield className="w-5 h-5 text-[#00f0ff]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-extrabold tracking-wider text-sm sm:text-base text-white group-hover:text-[#00f0ff] transition-colors">
                  CYBERDEFENSE
                </span>
                <span className="font-mono text-[#00f0ff] font-bold text-xs sm:text-sm">//</span>
                <span className="font-mono font-bold text-xs sm:text-sm text-[#00ff66] tracking-wide">
                  GLOBAL INTEL HUB
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
                v2.4 // ENTERPRISE ARCHITECTURE & THREAT PORTAL
              </p>
            </div>
          </button>

          {/* Desktop Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 shadow-cyan-glow font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00f0ff]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.live && (
                    <span className="w-2 h-2 rounded-full bg-[#ff3366] animate-pulse" title="Live Threat Feed" />
                  )}
                  {item.badge && (
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                      isActive ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Global Search (Ctrl+K) & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-[#00f0ff]/50 text-xs text-slate-300 transition-all group"
              title="Open Global Intelligence Search (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#00f0ff] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-slate-400 group-hover:text-slate-200">
                Search CVEs, Tools, Guides...
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-slate-950 text-[#00f0ff] border border-slate-700 rounded">
                Ctrl K
              </kbd>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-[#00f0ff]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070b14]/98 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-mono rounded bg-slate-800 text-[#00f0ff]">
                    {item.badge}
                  </span>
                )}
                {item.live && (
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#ff3366]/20 text-[#ff3366] border border-[#ff3366]/40">
                    LIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
