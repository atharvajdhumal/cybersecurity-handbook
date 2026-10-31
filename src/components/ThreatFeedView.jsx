import React, { useState, useMemo, useEffect } from 'react';
import {
  Activity,
  AlertTriangle,
  ShieldAlert,
  Search,
  Copy,
  Check,
  Terminal,
  Award,
  History,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Cpu,
  Layers,
  ExternalLink
} from 'lucide-react';
import { HALL_OF_INFAMY } from '../data/hallOfInfamyData';
import MonetizationCallouts from './MonetizationCallouts';

export default function ThreatFeedView({
  dailyThreats,
  onReloadFeed,
  isReloadingFeed,
  initialNavState
}) {
  // Section A filters
  const [logSearch, setLogSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState('ALL');

  // Section B interactive questions state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [copiedRuleId, setCopiedRuleId] = useState(null);

  // Section C Hall of Infamy state
  const [infamySearch, setInfamySearch] = useState('');
  const [infamyDomainFilter, setInfamyDomainFilter] = useState('ALL');
  const [selectedInfamyId, setSelectedInfamyId] = useState(HALL_OF_INFAMY[0].id);

  // Handle deep-link navigation from Global Search
  useEffect(() => {
    if (!initialNavState) return;
    if (initialNavState.search) {
      setLogSearch(initialNavState.search);
    }
    if (initialNavState.infamyId) {
      setSelectedInfamyId(initialNavState.infamyId);
      setTimeout(() => {
        document.getElementById('hall-of-infamy-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [initialNavState]);

  const attackLog = dailyThreats?.attackLog || [];
  const deepDives = dailyThreats?.deepDives || [];
  const dailyQuestions = dailyThreats?.dailyQuestions || [];
  const detectionRules = dailyThreats?.detectionRules || [];

  const filteredAttackLog = useMemo(() => {
    return attackLog.filter((item) => {
      if (domainFilter !== 'ALL' && item.domain !== domainFilter) return false;
      if (!logSearch.trim()) return true;
      const q = logSearch.toLowerCase();
      return (
        item.incidentOrCve.toLowerCase().includes(q) ||
        item.target.toLowerCase().includes(q) ||
        item.attackVector.toLowerCase().includes(q) ||
        item.immediateSolution.toLowerCase().includes(q) ||
        item.nistImpact.join(' ').toLowerCase().includes(q)
      );
    });
  }, [attackLog, logSearch, domainFilter]);

  const filteredInfamy = useMemo(() => {
    return HALL_OF_INFAMY.filter((item) => {
      if (infamyDomainFilter !== 'ALL' && item.domain !== infamyDomainFilter) return false;
      if (!infamySearch.trim()) return true;
      const q = infamySearch.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        String(item.year).includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.technicalRootCause.toLowerCase().includes(q) ||
        item.theSolution.toLowerCase().includes(q)
      );
    });
  }, [infamySearch, infamyDomainFilter]);

  const activeInfamy = useMemo(() => {
    return (
      HALL_OF_INFAMY.find((i) => i.id === selectedInfamyId) ||
      filteredInfamy[0] ||
      HALL_OF_INFAMY[0]
    );
  }, [selectedInfamyId, filteredInfamy]);

  const handleCopyRule = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedRuleId(id);
    setTimeout(() => setCopiedRuleId(null), 2000);
  };

  return (
    <div className="space-y-14 animate-view-in">
      {/* PAGE HEADER & LIVE TELEMETRY STATUS */}
      <section className="soc-card rounded-3xl p-6 sm:p-8 border border-[#ff3366]/40 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#ff3366]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff3366]/15 border border-[#ff3366]/40 text-[#ff3366] text-xs font-mono font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ff3366] animate-ping" />
              {dailyThreats?.feedStatus || 'LIVE // CISA KEV & GLOBAL SOC TELEMETRY'}
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Daily Cyber Threat Intelligence &{' '}
              <span className="text-[#00f0ff]">Historical Hall of Infamy</span>
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-3xl">
              Autonomous daily vulnerability log loaded directly from{' '}
              <code className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[#00f0ff] font-mono text-xs">
                /public/data/daily-threats.json
              </code>
              , paired with top technical exploit deep-dives, daily certification drills, copyable Suricata/Sigma detection rules, and the 11 biggest cyber attacks in history.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-mono">
              <div className="text-slate-400">THREAT POSTURE</div>
              <div className="text-[#ff3366] font-extrabold text-sm mt-0.5">
                {dailyThreats?.threatLevel || 'CRITICAL (DEFCON 2)'}
              </div>
            </div>
            <button
              onClick={onReloadFeed}
              disabled={isReloadingFeed}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-[#00f0ff]/40 text-xs font-mono font-bold text-[#00f0ff] transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isReloadingFeed ? 'animate-spin' : ''}`} />
              Sync JSON Feed
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION A: DAILY CYBER ATTACK & VULNERABILITY LOG TABLE
         ===================================================================== */}
      <section id="attack-log-section" className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] font-bold">
              SECTION A // LIVE INCIDENT MATRIX
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Daily Cyber Attack & Vulnerability Log ({filteredAttackLog.length} Active Advisories)
            </h2>
          </div>

          {/* Search & Domain Filter */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                placeholder="Filter CVE, target, vector, patch..."
                className="pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#00f0ff] w-64"
              />
            </div>

            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none focus:border-[#00f0ff]"
            >
              <option value="ALL">All Security Domains</option>
              <option value="Network Security">Network Security</option>
              <option value="Cloud Security">Cloud Security</option>
              <option value="Endpoint Security">Endpoint Security</option>
              <option value="Application Security">Application Security</option>
              <option value="Identity & Access Management">Identity & Access Management</option>
              <option value="Cryptography & Data Security">Cryptography & Data Security</option>
              <option value="OT / ICS Security">OT / ICS Security</option>
              <option value="AI & LLM Security">AI & LLM Security</option>
            </select>
          </div>
        </div>

        <div className="soc-card rounded-2xl overflow-hidden border border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/95 border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400">
                  <th className="py-3.5 px-4">Incident / CVE</th>
                  <th className="py-3.5 px-4">Target System / Sector</th>
                  <th className="py-3.5 px-4">Primary Attack Vector</th>
                  <th className="py-3.5 px-4">Immediate Solution / Patch</th>
                  <th className="py-3.5 px-4">NIST CSF 2.0 Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-xs sm:text-sm">
                {filteredAttackLog.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/60 transition-colors align-top">
                    <td className="py-4 px-4">
                      <div className="font-mono font-bold text-white">
                        {item.incidentOrCve}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          item.severity === 'CRITICAL'
                            ? 'bg-[#ff3366]/20 text-[#ff3366] border border-[#ff3366]/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}>
                          CVSS {item.cvss} {item.severity}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {item.domain}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-200 font-medium">
                      {item.target}
                    </td>
                    <td className="py-4 px-4 text-slate-300 leading-relaxed">
                      {item.attackVector}
                    </td>
                    <td className="py-4 px-4 text-[#00ff66] font-mono text-xs leading-relaxed">
                      {item.immediateSolution}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1.5">
                        {item.nistImpact.map((n) => (
                          <span
                            key={n}
                            className="px-2 py-0.5 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] font-mono text-[11px] whitespace-nowrap"
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION B: TOP 3 TECHNICAL INCIDENT DEEP-DIVES + DAILY CERT QUESTIONS + SURICATA/SIGMA RULES
         ===================================================================== */}
      <section className="space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#00ff66] font-bold">
            SECTION B // TECHNICAL EXPLOIT ENGINEERING & DETECTION
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            Top 3 Technical Incident Deep-Dives, Cert Drills & SOC Detection Rules
          </h2>
        </div>

        {/* Top 3 Technical Deep-Dives */}
        <div className="grid grid-cols-1 gap-6">
          {deepDives.map((dd) => (
            <div
              key={dd.id}
              className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-[#00f0ff]/40 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-2.5 py-1 rounded bg-[#00f0ff]/15 border border-[#00f0ff]/40 text-[#00f0ff] font-mono text-xs font-bold">
                    {dd.badge}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#ff3366]/15 border border-[#ff3366]/40 text-[#ff3366] font-mono text-xs font-bold">
                    CVSS {dd.cvss}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {dd.nistMapping}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-4">
                {dd.title}
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
                {/* Left 7 Cols: What Happened & Technical Exploit Mechanism */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#00f0ff] mb-1.5">
                      1. What Happened (Operational Context)
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {dd.whatHappened}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#ff3366] mb-1.5">
                      2. Technical Exploit Mechanism
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                      {dd.technicalMechanism}
                    </p>
                  </div>

                  {dd.asciiFlow && (
                    <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                      <div className="px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                        EXPLOIT CONTROL-FLOW TRACE
                      </div>
                      <pre className="p-4 text-xs font-mono text-[#00f0ff] overflow-x-auto leading-relaxed">
                        {dd.asciiFlow}
                      </pre>
                    </div>
                  )}
                </div>

                {/* Right 5 Cols: Remediation & Lessons Learned */}
                <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                  <div className="p-4 rounded-xl bg-[#00ff66]/5 border border-[#00ff66]/30">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#00ff66] mb-2.5">
                      3. Immediate Engineering Remediation
                    </h4>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                      {dd.remediation.map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#00ff66] shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <h4 className="text-xs font-mono font-bold uppercase text-amber-300 mb-1.5">
                      4. Architectural Lessons Learned
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {dd.lessonsLearned}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2 Interactive Daily Certification Practice Questions (Security+ & SecurityX CAS-005) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dailyQuestions.map((q) => {
            const picked = selectedAnswers[q.id];
            const isAnswered = picked !== undefined;
            const isCorrect = picked === q.correctIndex;

            return (
              <div
                key={q.id}
                className="soc-card rounded-2xl p-6 border border-[#00f0ff]/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#00f0ff]/15 border border-[#00f0ff]/40 text-[#00f0ff] font-mono text-xs font-bold">
                      <Award className="w-3.5 h-3.5" />
                      {q.examBadge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      DAILY SCENARIO DRILL
                    </span>
                  </div>

                  <div className="text-xs font-mono text-[#00ff66] mb-2">
                    {q.domain}
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                    {q.scenario}
                  </p>

                  <div className="mt-4 space-y-2">
                    {q.options.map((opt, idx) => {
                      let btnStyle = 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-[#00f0ff]/50';
                      if (isAnswered) {
                        if (idx === q.correctIndex) {
                          btnStyle = 'bg-[#00ff66]/15 border-[#00ff66] text-white font-semibold';
                        } else if (idx === picked) {
                          btnStyle = 'bg-[#ff3366]/15 border-[#ff3366] text-slate-200';
                        } else {
                          btnStyle = 'bg-slate-950/50 border-slate-800/50 text-slate-500';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedAnswers((prev) => ({ ...prev, [q.id]: idx }))}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start justify-between gap-2 ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && idx === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-[#00ff66] shrink-0 mt-0.5" />
                          )}
                          {isAnswered && idx === picked && idx !== q.correctIndex && (
                            <XCircle className="w-4 h-4 text-[#ff3366] shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {isAnswered && (
                  <div className={`mt-4 p-4 rounded-xl border text-xs leading-relaxed ${
                    isCorrect
                      ? 'bg-[#00ff66]/10 border-[#00ff66]/40 text-slate-200'
                      : 'bg-[#ff3366]/10 border-[#ff3366]/40 text-slate-200'
                  }`}>
                    <div className="font-mono font-bold uppercase mb-1 flex items-center justify-between">
                      <span className={isCorrect ? 'text-[#00ff66]' : 'text-[#ff3366]'}>
                        {isCorrect ? '✓ CORRECT ARCHITECTURAL CHOICE' : '✗ INCORRECT — REVIEW RATIONALE'}
                      </span>
                      <button
                        onClick={() => {
                          const copy = { ...selectedAnswers };
                          delete copy[q.id];
                          setSelectedAnswers(copy);
                        }}
                        className="text-slate-400 hover:text-white underline"
                      >
                        Reset
                      </button>
                    </div>
                    <p>{q.rationale}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Copyable Suricata & Sigma Detection Rules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {detectionRules.map((rule) => {
            const isCopied = copiedRuleId === rule.id;
            return (
              <div
                key={rule.id}
                className="soc-card rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between"
              >
                <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#00ff66]/15 text-[#00ff66] font-mono text-[10px] font-bold">
                        {rule.type}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {rule.mitreTechnique}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1">
                      {rule.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => handleCopyRule(rule.id, rule.code)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all shrink-0 ${
                      isCopied
                        ? 'bg-[#00ff66] text-slate-950'
                        : 'bg-slate-900 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40'
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {isCopied ? 'COPIED!' : 'COPY RULE'}
                  </button>
                </div>

                <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed bg-[#050811] flex-1">
                  {rule.code}
                </pre>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          SECTION C: CYBER INCIDENT HALL OF INFAMY (11 HISTORICAL CASE STUDIES)
         ===================================================================== */}
      <section id="hall-of-infamy-section" className="soc-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-amber-500/30">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-2">
              <History className="w-4 h-4" />
              SECTION C // HISTORICAL BREACH FORENSICS ARCHIVE (2010–2024)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Cyber Incident Hall of Infamy (11 Landmark Case Studies)
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Explore the technical root causes, exploit chains, remediation actions, and enduring architectural lessons of the most consequential cyber incidents in history—from <strong className="text-white">Stuxnet (2010)</strong> and <strong className="text-white">NotPetya (2017)</strong> to <strong className="text-white">SolarWinds (2020)</strong>, <strong className="text-white">Log4Shell (2021)</strong>, and <strong className="text-white">CrowdStrike / Snowflake / Change Healthcare (2024)</strong>.
            </p>
          </div>

          {/* Search & Domain Filter for Hall of Infamy */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={infamySearch}
                onChange={(e) => setInfamySearch(e.target.value)}
                placeholder="Search Stuxnet, SolarWinds, WannaCry..."
                className="pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 w-64"
              />
            </div>

            <select
              value={infamyDomainFilter}
              onChange={(e) => setInfamyDomainFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="ALL">All Domains (11)</option>
              <option value="Endpoint Security">Endpoint Security</option>
              <option value="Identity & Access Management">Identity & Access (IAM)</option>
              <option value="Cloud Security">Cloud Security</option>
              <option value="Application Security">Application Security</option>
              <option value="Network Security">Network Security</option>
              <option value="OT / ICS Security">OT / ICS Security</option>
            </select>
          </div>
        </div>

        {/* Interactive Split Explorer: Left Case Selector List (4 cols) + Right Full Case Study (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left Column: 11 Historic Incident Cards */}
          <div className="lg:col-span-4 space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
            {filteredInfamy.map((incident) => {
              const isSelected = activeInfamy?.id === incident.id;
              return (
                <button
                  key={incident.id}
                  onClick={() => {
                    setSelectedInfamyId(incident.id);
                    if (typeof window !== 'undefined') {
                      window.history.replaceState(null, '', '#threats/infamy');
                    }
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-[#00f0ff]/15 border-[#00f0ff] shadow-cyan-glow'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold text-xs">
                      {incident.year}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {incident.domain}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white mt-2">
                    {incident.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {incident.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Case Study Deep-Dive */}
          {activeInfamy && (
            <div className="lg:col-span-8 rounded-2xl bg-slate-950/95 border border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-800 pb-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded bg-[#ff3366]/20 border border-[#ff3366]/40 text-[#ff3366] font-mono text-xs font-bold">
                    {activeInfamy.severity} // {activeInfamy.date}
                  </span>
                  <span className="text-xs font-mono text-amber-300 font-semibold">
                    {activeInfamy.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  {activeInfamy.name} ({activeInfamy.year})
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-[#00f0ff] font-bold">
                    IMPACT: {activeInfamy.estimatedImpact}
                  </span>
                  {activeInfamy.mitreTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 1. What Happened */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-900/70 border border-slate-800">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00f0ff] mb-2">
                  01 // What Happened (Chronology & Blast Radius)
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {activeInfamy.whatHappened}
                </p>
              </div>

              {/* 2. Technical Root Cause */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#ff3366]/5 border border-[#ff3366]/30">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#ff3366] mb-2">
                  02 // Technical Root Cause & Exploit Mechanics
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                  {activeInfamy.technicalRootCause}
                </p>
              </div>

              {/* 3. The Solution */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#00ff66]/5 border border-[#00ff66]/30">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00ff66] mb-2">
                  03 // The Solution & Global Containment
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {activeInfamy.theSolution}
                </p>
              </div>

              {/* 4. Architectural Lessons Learned */}
              <div className="p-4 sm:p-5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 mb-3">
                  04 // Architectural Lessons Learned (Principal Blueprint)
                </h4>
                <ul className="space-y-2.5">
                  {activeInfamy.architecturalLessons.map((lesson, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      <MonetizationCallouts compact />
    </div>
  );
}
