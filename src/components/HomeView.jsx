import React, { useState } from 'react';
import {
  Zap,
  Map,
  Wrench,
  BookOpen,
  Shield,
  Network,
  Cloud,
  Monitor,
  Code2,
  KeyRound,
  Lock,
  Cpu,
  BrainCircuit,
  ArrowRight,
  CheckCircle2,
  Activity,
  Layers,
  Terminal,
  Gamepad2
} from 'lucide-react';
import { CORE_DOMAINS } from '../data/domainsData';
import { NIST_CSF_FUNCTIONS } from '../data/nistData';
import MonetizationCallouts from './MonetizationCallouts';

const ICON_MAP = {
  Network,
  Cloud,
  Monitor,
  Code2,
  KeyRound,
  Lock,
  Cpu,
  BrainCircuit
};

export default function HomeView({
  onNavigate,
  dailyThreats,
  domainQuizScores
}) {
  const [selectedNistId, setSelectedNistId] = useState('GV');
  const activeNist = NIST_CSF_FUNCTIONS.find((f) => f.id === selectedNistId) || NIST_CSF_FUNCTIONS[0];

  const metricCards = [
    {
      number: '24/7',
      label: 'Autonomous Threat Feed',
      sub: 'Live CISA KEV + Suricata/Sigma Rules',
      accent: 'text-[#00f0ff]',
      border: 'border-[#00f0ff]/30',
      onClick: () => onNavigate('threats')
    },
    {
      number: '8',
      label: 'Core Learning Modules',
      sub: 'GeeksforGeeks-Style Deep Guides + Quizzes',
      accent: 'text-[#00ff66]',
      border: 'border-[#00ff66]/30',
      onClick: () => onNavigate('domains')
    },
    {
      number: '65+',
      label: 'Open-Source Tools',
      sub: '68 Vetted Tools + 1-Click Copy CLI',
      accent: 'text-[#00f0ff]',
      border: 'border-[#00f0ff]/30',
      onClick: () => onNavigate('arsenal')
    },
    {
      number: 'NIST 2.0',
      label: 'Aligned Architecture',
      sub: 'Govern • Identify • Protect • Detect • Respond • Recover',
      accent: 'text-[#00ff66]',
      border: 'border-[#00ff66]/30',
      onClick: () => {
        document.getElementById('nist-matrix-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];

  return (
    <div className="space-y-14 animate-view-in">
      {/* 1. HIGH-IMPACT HERO BANNER */}
      <section className="relative rounded-3xl overflow-hidden border border-[#00f0ff]/35 bg-gradient-to-br from-slate-900/95 via-[#091122] to-[#070b14] p-6 sm:p-10 lg:p-12 shadow-2xl">
        {/* Decorative Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#00f0ff]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#00ff66]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          {/* Pulsing Live Indicator Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-[#00f0ff]/40 mb-6 shadow-cyan-glow">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff66] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ff66]" />
            </span>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#00f0ff]">
              AUTONOMOUS INTELLIGENCE & ARCHITECTURE REPOSITORY
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            Global Cyber Defense Architecture &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-cyan-300 to-[#00ff66]">
              Daily Intelligence Hub
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            The complete open-access cybersecurity engineering curriculum and live threat intelligence portal. Master all{' '}
            <strong className="text-white">eight core cybersecurity domains</strong>, deploy from the{' '}
            <strong className="text-[#00f0ff]">65+ open-source tool arsenal</strong>, track your career across the{' '}
            <strong className="text-[#00ff66]">interactive roadmap</strong>, and analyze daily cyber attacks mapped directly to{' '}
            <strong className="text-white font-mono">NIST CSF 2.0</strong>.
          </p>

          {/* Quick-Navigation CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => onNavigate('threats')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-slate-950 font-mono font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-cyan-glow"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              Today&apos;s Cyber Attack Feed
            </button>

            <button
              onClick={() => onNavigate('arena')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#00ff66] to-emerald-400 hover:opacity-95 text-slate-950 font-mono font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-emerald-glow"
            >
              <Gamepad2 className="w-4 h-4" />
              🕹️ Launch Cyber Arena (3 Modes)
            </button>

            <button
              onClick={() => onNavigate('domains')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00ff66]/15 hover:bg-[#00ff66]/25 text-[#00ff66] border border-[#00ff66]/40 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all"
            >
              <BookOpen className="w-4 h-4" />
              8 Core Learning Guides
            </button>

            <button
              onClick={() => onNavigate('roadmap')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-[#00f0ff]/40 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all"
            >
              <Map className="w-4 h-4 text-[#00f0ff]" />
              Interactive Career Roadmap
            </button>

            <button
              onClick={() => onNavigate('arsenal')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all"
            >
              <Wrench className="w-4 h-4 text-[#00ff66]" />
              Global Open-Source Arsenal (68)
            </button>
          </div>
        </div>

        {/* Live Threat Ticker Strip inside Hero */}
        {dailyThreats?.attackLog?.length > 0 && (
          <div className="mt-8 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="px-2 py-0.5 rounded bg-[#ff3366]/20 border border-[#ff3366]/50 text-[#ff3366] font-bold shrink-0">
                ACTIVE KEV ALERT
              </span>
              <span className="text-slate-200 truncate">
                {dailyThreats.attackLog[0].incidentOrCve} — {dailyThreats.attackLog[0].target}
              </span>
            </div>
            <button
              onClick={() => onNavigate('threats')}
              className="text-[#00f0ff] hover:underline inline-flex items-center gap-1 shrink-0"
            >
              Inspect Technical Deep-Dive & Suricata Rule <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      {/* 2. FOUR METRIC CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metricCards.map((m) => (
          <button
            key={m.label}
            onClick={m.onClick}
            className={`soc-card rounded-2xl p-6 text-left border ${m.border} hover:-translate-y-1 transition-all group`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-3xl sm:text-4xl font-mono font-black ${m.accent} tracking-tight`}>
                {m.number}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
            <div className="mt-3 text-sm font-bold text-white uppercase tracking-wider font-mono">
              {m.label}
            </div>
            <p className="mt-1 text-xs text-slate-400">
              {m.sub}
            </p>
          </button>
        ))}
      </section>

      {/* 3. INTERACTIVE 8-CARD BENTO GRID LINKING TO EACH CORE DOMAIN MODULE */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00f0ff] mb-2">
              <Layers className="w-4 h-4" />
              COMPLETE ENGINEERING CURRICULUM
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              8 Core Cybersecurity Learning Domains
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Click any domain card to launch its GeeksforGeeks-style deep-dive architecture guide, vulnerable vs. secure code comparisons, and interactive 3-question certification quiz.
            </p>
          </div>
          <button
            onClick={() => onNavigate('domains')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-[#00f0ff]/40 text-xs font-mono font-bold text-[#00f0ff] hover:bg-[#00f0ff]/10 shrink-0 self-start sm:self-auto"
          >
            Open Full Tutorial View <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CORE_DOMAINS.map((domain) => {
            const Icon = ICON_MAP[domain.iconName] || Shield;
            const score = domainQuizScores?.[domain.id];
            const isCompleted = score !== undefined;

            return (
              <div
                key={domain.id}
                onClick={() => onNavigate('domains', { domainId: domain.id })}
                className="soc-card rounded-2xl p-6 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 transition-all relative overflow-hidden"
              >
                <div>
                  {/* Top Row: Module Badge & Quiz Status */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-[#00f0ff]/60 flex items-center justify-center transition-colors">
                        <Icon className="w-5 h-5 text-[#00f0ff]" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#00f0ff] tracking-wider">
                        DOMAIN // {domain.number}
                      </span>
                    </div>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00ff66]/15 border border-[#00ff66]/40 text-[#00ff66] text-[10px] font-mono font-bold">
                        <CheckCircle2 className="w-3 h-3" /> {score}/3 QUIZ
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-500">
                        {domain.readingTime}
                      </span>
                    )}
                  </div>

                  {/* Title & Summary */}
                  <h3 className="text-lg font-extrabold text-white group-hover:text-[#00f0ff] transition-colors">
                    {domain.number}. {domain.shortTitle}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-3">
                    {domain.summary}
                  </p>

                  {/* Key Topic Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {domain.keyTopics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 rounded bg-slate-950/90 border border-slate-800 text-[10px] font-mono text-slate-300"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Link */}
                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono font-bold text-[#00f0ff]">
                  <span>Start {domain.shortTitle} Module</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. INTERACTIVE NIST CSF 2.0 GOVERNANCE MATRIX */}
      <section id="nist-matrix-section" className="soc-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00ff66] mb-2">
              <Shield className="w-4 h-4" />
              STRATEGIC ARCHITECTURE STANDARD
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Interactive NIST Cybersecurity Framework (CSF) 2.0 Matrix
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Every tutorial, open-source tool, and daily cyber incident on this platform maps directly to the six core functions of <strong className="text-white">NIST CSF 2.0</strong>. Select any function below to inspect its official subcategories, tactical implementation, and open-source tool stack.
            </p>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 shrink-0">
            6 CORE FUNCTIONS // <span className="text-[#00f0ff]">GV • ID • PR • DE • RS • RC</span>
          </div>
        </div>

        {/* Interactive 6-Function Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {NIST_CSF_FUNCTIONS.map((fn) => {
            const isSelected = fn.id === selectedNistId;
            return (
              <button
                key={fn.id}
                onClick={() => setSelectedNistId(fn.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#00f0ff]/15 border-[#00f0ff] shadow-cyan-glow'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-[#00f0ff]">
                    {fn.id}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#00ff66]' : 'bg-slate-700'}`} />
                </div>
                <div className="mt-1.5 font-bold text-sm text-white">
                  {fn.name}
                </div>
                <div className="mt-0.5 text-[10px] font-mono text-slate-400 truncate">
                  {fn.badge}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active NIST Function Deep-Dive Panel */}
        <div className="rounded-2xl bg-slate-950/90 border border-[#00f0ff]/30 p-5 sm:p-7 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-[#00f0ff] uppercase tracking-wider">
                {activeNist.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                {activeNist.code} — Function Deep-Dive
              </h3>
            </div>
            <span className="px-3 py-1 rounded-lg bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66] font-mono text-xs font-bold">
              TARGET SLA: {activeNist.metrics}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-1">
                  Strategic Mandate
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {activeNist.strategicMandate}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-1">
                  Tactical Engineering Implementation
                </h4>
                <p className="text-sm text-[#00f0ff] leading-relaxed font-medium">
                  {activeNist.tacticalImplementation}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">
                  Mapped Open-Source Arsenal Tools (Click to View in Arsenal)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeNist.mappedTools.map((toolName) => (
                    <button
                      key={toolName}
                      onClick={() => onNavigate('arsenal', { toolSearch: toolName.split(' ')[0] })}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-[#00f0ff]/15 border border-slate-700 hover:border-[#00f0ff]/50 text-xs font-mono text-slate-200 hover:text-[#00f0ff] transition-all"
                    >
                      <Terminal className="w-3 h-3 text-[#00ff66]" />
                      {toolName}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Official Subcategories */}
            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-2.5">
                Official NIST CSF 2.0 Categories & Subcategories
              </h4>
              <div className="space-y-2.5">
                {activeNist.keySubcategories.map((sub) => (
                  <div
                    key={sub.code}
                    className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3"
                  >
                    <span className="px-2 py-0.5 rounded bg-[#00f0ff]/15 text-[#00f0ff] font-mono font-bold text-xs shrink-0 mt-0.5">
                      {sub.code}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white">{sub.title}</div>
                      <p className="text-xs text-slate-400 mt-0.5">{sub.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Complete 6-Function Reference Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400">
                <th className="py-3.5 px-4">NIST CSF 2.0 Function</th>
                <th className="py-3.5 px-4">Strategic Mandate</th>
                <th className="py-3.5 px-4">Tactical Engineering Implementation</th>
                <th className="py-3.5 px-4">Primary OSS Telemetry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-xs sm:text-sm">
              {NIST_CSF_FUNCTIONS.map((fn) => (
                <tr
                  key={fn.id}
                  onClick={() => setSelectedNistId(fn.id)}
                  className={`cursor-pointer transition-colors ${
                    selectedNistId === fn.id ? 'bg-[#00f0ff]/10' : 'hover:bg-slate-900/60'
                  }`}
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-[#00f0ff] whitespace-nowrap">
                    {fn.code}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {fn.strategicMandate}
                  </td>
                  <td className="py-3.5 px-4 text-slate-200">
                    {fn.tacticalImplementation}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-[#00ff66] whitespace-nowrap">
                    {fn.mappedTools.slice(0, 3).join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. MONETIZATION & NEWSLETTER CALLOUTS */}
      <MonetizationCallouts />
    </div>
  );
}
