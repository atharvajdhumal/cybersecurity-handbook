import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Network,
  Cloud,
  Monitor,
  Code2,
  KeyRound,
  Lock,
  Cpu,
  BrainCircuit,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Award,
  ArrowRight,
  ChevronRight,
  Shield,
  Terminal,
  RotateCcw,
  CheckSquare,
  Square
} from 'lucide-react';
import { CORE_DOMAINS } from '../data/domainsData';
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

export default function DomainsView({
  initialDomainId,
  domainQuizScores,
  onSaveDomainQuizScore
}) {
  const [activeDomainId, setActiveDomainId] = useState(
    initialDomainId || CORE_DOMAINS[0].id
  );
  const [copiedCodeKey, setCopiedCodeKey] = useState(null);
  const [checkedCisItems, setCheckedCisItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cyberhub_cis_checklist');
      return saved ? JSON.parse(saved) : { 'cis-01': true, 'cis-02': true };
    } catch {
      return { 'cis-01': true };
    }
  });

  // Per-domain quiz answers: { [domainId]: { 0: selectedOptionIdx, 1: ..., 2: ... } }
  const [quizSelections, setQuizSelections] = useState(() => {
    try {
      const saved = localStorage.getItem('cyberhub_domain_quiz_selections');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (initialDomainId) {
      setActiveDomainId(initialDomainId);
    }
  }, [initialDomainId]);

  const activeDomainIndex = CORE_DOMAINS.findIndex((d) => d.id === activeDomainId);
  const domain = CORE_DOMAINS[activeDomainIndex] || CORE_DOMAINS[0];
  const nextDomain = CORE_DOMAINS[(activeDomainIndex + 1) % CORE_DOMAINS.length];

  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeKey(key);
    setTimeout(() => setCopiedCodeKey(null), 2000);
  };

  const toggleCisItem = (id) => {
    const updated = { ...checkedCisItems, [id]: !checkedCisItems[id] };
    setCheckedCisItems(updated);
    localStorage.setItem('cyberhub_cis_checklist', JSON.stringify(updated));
  };

  const handleSelectQuizAnswer = (qIdx, optIdx) => {
    const currentDomainAnswers = quizSelections[domain.id] || {};
    const updatedDomainAnswers = { ...currentDomainAnswers, [qIdx]: optIdx };
    const updatedAll = { ...quizSelections, [domain.id]: updatedDomainAnswers };
    setQuizSelections(updatedAll);
    localStorage.setItem('cyberhub_domain_quiz_selections', JSON.stringify(updatedAll));

    // Calculate score if all 3 questions answered
    let correctCount = 0;
    domain.quiz.forEach((q, idx) => {
      if (updatedDomainAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });
    onSaveDomainQuizScore(domain.id, correctCount);
  };

  const handleResetQuiz = () => {
    const updatedAll = { ...quizSelections };
    delete updatedAll[domain.id];
    setQuizSelections(updatedAll);
    localStorage.setItem('cyberhub_domain_quiz_selections', JSON.stringify(updatedAll));
  };

  const currentDomainAnswers = quizSelections[domain.id] || {};
  const answeredCount = Object.keys(currentDomainAnswers).length;
  const currentScore = domain.quiz.reduce(
    (acc, q, idx) => (currentDomainAnswers[idx] === q.correctIndex ? acc + 1 : acc),
    0
  );

  return (
    <div className="animate-view-in space-y-10">
      {/* Top Banner */}
      <div className="soc-card rounded-3xl p-6 sm:p-8 border border-[#00f0ff]/35">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#00f0ff] mb-2">
              <BookOpen className="w-4 h-4" />
              GEEKSFORGEEKS-STYLE COMPLETE ENGINEERING TUTORIALS
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              8 Core Cybersecurity Domain Learning Guides
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Select any of the 8 core domains from the sidebar or tabs below to study full architectural reference tables, protocol flows, side-by-side vulnerable vs. secure code, and interactive domain mastery quizzes.
            </p>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono shrink-0">
            <div className="text-slate-400">MODULES COMPLETED</div>
            <div className="text-lg font-black text-[#00ff66] mt-0.5">
              {Object.keys(domainQuizScores || {}).length} / 8 DOMAINS
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: Left Sidebar (3 cols) + Right Tutorial Content (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sticky Sidebar Switcher */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-2 soc-card rounded-2xl p-3 border border-slate-800">
          <div className="px-3 py-2 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
            Core Curriculum (01 – 08)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5 pt-1">
            {CORE_DOMAINS.map((d) => {
              const Icon = ICON_MAP[d.iconName] || Shield;
              const isSelected = d.id === domain.id;
              const score = domainQuizScores?.[d.id];

              return (
                <button
                  key={d.id}
                  onClick={() => {
                    setActiveDomainId(d.id);
                    window.scrollTo({ top: 180, behavior: 'smooth' });
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-[#00f0ff]/15 border-[#00f0ff] text-white shadow-cyan-glow'
                      : 'bg-slate-950/60 border-transparent hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#00f0ff]' : 'text-slate-400'}`} />
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono text-[#00f0ff] font-bold">
                        MODULE {d.number}
                      </div>
                      <div className="text-xs font-bold truncate">
                        {d.shortTitle}
                      </div>
                    </div>
                  </div>
                  {score !== undefined ? (
                    <span className="px-1.5 py-0.5 rounded bg-[#00ff66]/20 text-[#00ff66] font-mono text-[10px] font-bold shrink-0">
                      {score}/3
                    </span>
                  ) : (
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#00f0ff]' : 'text-slate-600'}`} />
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Column: Active Domain Tutorial View */}
        <main className="lg:col-span-9 space-y-8">
          {/* Domain Header Card */}
          <div className="soc-card rounded-2xl p-6 sm:p-8 border border-[#00f0ff]/40">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#00f0ff]/15 border border-[#00f0ff]/40 text-[#00f0ff] font-mono text-xs font-bold">
                MODULE {domain.number} // {domain.readingTime.toUpperCase()}
              </span>
              <span className="text-xs font-mono text-[#00ff66]">
                {domain.nistMapping}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {domain.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              {domain.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {domain.keyTopics.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-[#00f0ff]"
                >
                  # {t}
                </span>
              ))}
            </div>
          </div>

          {/* =================================================================
              DOMAIN 1 SPECIFIC SECTIONS: OSI TABLE + STATEFUL VS NGFW + ZTNA DIAGRAM
             ================================================================= */}
          {domain.osiTable && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
                <span className="text-[#00f0ff] font-mono">01.</span> The 7-Layer OSI Model: Protocols, Attack Vectors & Defenses
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 font-mono text-[11px] uppercase text-slate-400">
                      <th className="py-3 px-4">Layer</th>
                      <th className="py-3 px-4">PDU</th>
                      <th className="py-3 px-4">Protocols & Hardware</th>
                      <th className="py-3 px-4">Primary Attack Vectors</th>
                      <th className="py-3 px-4">Architectural Defenses</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {domain.osiTable.map((row) => (
                      <tr key={row.layer} className="hover:bg-slate-900/60">
                        <td className="py-3 px-4 font-mono font-bold text-[#00f0ff] whitespace-nowrap">
                          {row.layer} — {row.name}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-300">{row.pdu}</td>
                        <td className="py-3 px-4 text-slate-200">{row.protocols}</td>
                        <td className="py-3 px-4 text-[#ff3366]">{row.attacks}</td>
                        <td className="py-3 px-4 text-[#00ff66] font-medium">{row.defense}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {domain.firewallComparison && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
                <span className="text-[#00f0ff] font-mono">02.</span> Packet Filter vs. Stateful Inspection vs. Next-Gen Firewall (NGFW)
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 font-mono text-[11px] uppercase text-slate-400">
                      <th className="py-3 px-4">Architectural Dimension</th>
                      <th className="py-3 px-4">Legacy Stateless Packet Filter</th>
                      <th className="py-3 px-4">Stateful Firewall (L3/L4)</th>
                      <th className="py-3 px-4 text-[#00f0ff]">Next-Generation Firewall (NGFW)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {domain.firewallComparison.map((row) => (
                      <tr key={row.feature} className="hover:bg-slate-900/60">
                        <td className="py-3 px-4 font-bold text-white">{row.feature}</td>
                        <td className="py-3 px-4 text-slate-400">{row.packetFilter}</td>
                        <td className="py-3 px-4 text-slate-300">{row.stateful}</td>
                        <td className="py-3 px-4 text-[#00ff66] font-medium">{row.ngfw}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {domain.ztnaDiagram && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
                <span className="text-[#00f0ff] font-mono">03.</span> Defense-in-Depth DMZ & Zero Trust Network Access (ZTNA) Blueprint
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {domain.ztnaDiagram.map((stage, i) => (
                  <div
                    key={stage.stage}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 relative flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#00f0ff] uppercase block">
                        {stage.stage}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">
                        {stage.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {stage.desc}
                      </p>
                    </div>
                    {i < domain.ztnaDiagram.length - 1 && (
                      <div className="hidden md:flex justify-end mt-3 text-[#00ff66] font-mono text-xs">
                        ──►
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================
              DOMAIN 2 SPECIFIC SECTIONS: SHARED RESPONSIBILITY + SSRF TO IMDSv2
             ================================================================= */}
          {domain.sharedResponsibilityMatrix && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
                <span className="text-[#00ff66] font-mono">01.</span> Cloud Shared Responsibility Matrix (On-Prem vs IaaS vs PaaS vs SaaS)
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 font-mono text-[11px] uppercase text-slate-400">
                      <th className="py-3 px-4">Security Stack Layer</th>
                      <th className="py-3 px-4">On-Premises</th>
                      <th className="py-3 px-4">IaaS (EC2/VMs)</th>
                      <th className="py-3 px-4">PaaS (RDS/AppEngine)</th>
                      <th className="py-3 px-4">SaaS (M365/Snowflake)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {domain.sharedResponsibilityMatrix.map((row) => {
                      const badge = (val) => {
                        if (val === 'Customer') return 'bg-[#ff3366]/15 text-[#ff3366] border-[#ff3366]/30';
                        if (val === 'Cloud Provider') return 'bg-[#00ff66]/15 text-[#00ff66] border-[#00ff66]/30';
                        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
                      };
                      return (
                        <tr key={row.layer} className="hover:bg-slate-900/60">
                          <td className="py-3 px-4 font-bold text-white">{row.layer}</td>
                          <td className="py-3 px-4"><span className={`px-2 py-0.5 rounded border font-mono text-xs ${badge(row.onPrem)}`}>{row.onPrem}</span></td>
                          <td className="py-3 px-4"><span className={`px-2 py-0.5 rounded border font-mono text-xs ${badge(row.iaas)}`}>{row.iaas}</span></td>
                          <td className="py-3 px-4"><span className={`px-2 py-0.5 rounded border font-mono text-xs ${badge(row.paas)}`}>{row.paas}</span></td>
                          <td className="py-3 px-4"><span className={`px-2 py-0.5 rounded border font-mono text-xs ${badge(row.saas)}`}>{row.saas}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {domain.imdsExplainer && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-[#00ff66] font-mono">02.</span> {domain.imdsExplainer.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {domain.imdsExplainer.attackSummary}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#ff3366]/10 border border-[#ff3366]/30">
                  <div className="text-xs font-mono font-bold text-[#ff3366] uppercase mb-1">
                    ❌ Why Legacy IMDSv1 Fails Against SSRF
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {domain.imdsExplainer.imdsv1Weakness}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#00ff66]/10 border border-[#00ff66]/30">
                  <div className="text-xs font-mono font-bold text-[#00ff66] uppercase mb-1">
                    ✅ How IMDSv2 Session-Oriented PUT & Hop-Limit=1 Stops It
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                    {domain.imdsExplainer.imdsv2Defense}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              DOMAIN 3 SPECIFIC SECTIONS: MALWARE/LOLBINS + EPP VS EDR VS XDR + EVENT IDS + CIS CHECKLIST
             ================================================================= */}
          {domain.malwareMechanics && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-[#ff3366] font-mono">01.</span> Ransomware, Fileless Malware & Living-off-the-Land Binaries (LOLBins)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {domain.malwareMechanics.map((m) => (
                  <div key={m.title} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="px-2 py-0.5 rounded bg-[#ff3366]/15 text-[#ff3366] font-mono text-[10px] font-bold">
                      {m.badge}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-2">{m.title}</h4>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {domain.edrComparison && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-[#00f0ff] font-mono">02.</span> Endpoint Protection Evolution: EPP (Legacy AV) vs. EDR vs. XDR
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 font-mono text-[11px] uppercase text-slate-400">
                      <th className="py-3 px-4">Capability Dimension</th>
                      <th className="py-3 px-4">EPP (Traditional Antivirus)</th>
                      <th className="py-3 px-4 text-[#00f0ff]">EDR (Endpoint Detection & Response)</th>
                      <th className="py-3 px-4 text-[#00ff66]">XDR (Extended Detection & Response)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {domain.edrComparison.map((row) => (
                      <tr key={row.dimension} className="hover:bg-slate-900/60">
                        <td className="py-3 px-4 font-bold text-white">{row.dimension}</td>
                        <td className="py-3 px-4 text-slate-400">{row.epp}</td>
                        <td className="py-3 px-4 text-slate-200">{row.edr}</td>
                        <td className="py-3 px-4 text-[#00ff66]">{row.xdr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {domain.eventIdTable && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-[#00f0ff] font-mono">03.</span> High-Value Windows Security & Sysmon Event ID Forensics Matrix
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 font-mono text-[11px] uppercase text-slate-400">
                      <th className="py-3 px-4">Event ID</th>
                      <th className="py-3 px-4">Log Channel</th>
                      <th className="py-3 px-4">Event Name</th>
                      <th className="py-3 px-4">SOC Threat Hunting & Forensic Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {domain.eventIdTable.map((row) => (
                      <tr key={row.eventId} className="hover:bg-slate-900/60">
                        <td className="py-3 px-4 font-mono font-bold text-[#00f0ff] whitespace-nowrap">
                          {row.eventId}
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-slate-400">{row.category}</td>
                        <td className="py-3 px-4 font-bold text-white">{row.title}</td>
                        <td className="py-3 px-4 text-slate-200 leading-relaxed">{row.forensicValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {domain.cisChecklist && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  <span className="text-[#00ff66] font-mono">04.</span> Interactive CIS Benchmark OS Hardening Checklist
                </h3>
                <span className="text-xs font-mono text-[#00ff66]">
                  Click items to toggle baseline status
                </span>
              </div>
              <div className="space-y-2.5">
                {domain.cisChecklist.map((item) => {
                  const isChecked = !!checkedCisItems[item.id];
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleCisItem(item.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'bg-[#00ff66]/10 border-[#00ff66]/40'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-[#00ff66] shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="text-sm font-bold text-white">{item.title}</div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.detail}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* =================================================================
              DOMAIN 4 SPECIFIC SECTIONS: OWASP TOP 10 + SIDE-BY-SIDE VULNERABLE VS SECURE CODE + CI/CD
             ================================================================= */}
          {domain.owaspTop10 && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-[#00f0ff] font-mono">01.</span> Complete OWASP Top 10 (A01–A10) Architectural Breakdown
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 font-mono text-[11px] uppercase text-slate-400">
                      <th className="py-3 px-4">OWASP Rank</th>
                      <th className="py-3 px-4">Vulnerability Category</th>
                      <th className="py-3 px-4">Technical Attack Mechanics</th>
                      <th className="py-3 px-4">Engineering Remediation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {domain.owaspTop10.map((item) => (
                      <tr key={item.rank} className="hover:bg-slate-900/60 align-top">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#00f0ff] whitespace-nowrap">
                          {item.rank}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-white">{item.name}</td>
                        <td className="py-3.5 px-4 text-slate-300 leading-relaxed">{item.desc}</td>
                        <td className="py-3.5 px-4 text-[#00ff66] leading-relaxed">{item.remediation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {domain.codeComparisons && (
            <div className="space-y-6">
              {domain.codeComparisons.map((comp, idx) => (
                <div
                  key={comp.title}
                  className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-extrabold text-white">
                      <span className="text-[#00f0ff] font-mono">0{idx + 2}.</span> {comp.title}
                    </h3>
                    <span className="px-2.5 py-1 rounded bg-[#ff3366]/15 border border-[#ff3366]/40 text-[#ff3366] font-mono text-xs">
                      Exploit Input: {comp.attackPayload}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Vulnerable Code */}
                    <div className="rounded-xl bg-[#050811] border border-[#ff3366]/40 overflow-hidden flex flex-col">
                      <div className="px-4 py-2 bg-[#ff3366]/15 border-b border-[#ff3366]/30 flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#ff3366]">
                          {comp.vulnerableTitle}
                        </span>
                      </div>
                      <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed flex-1">
                        {comp.vulnerableCode}
                      </pre>
                    </div>

                    {/* Secure Code */}
                    <div className="rounded-xl bg-[#050811] border border-[#00ff66]/40 overflow-hidden flex flex-col">
                      <div className="px-4 py-2 bg-[#00ff66]/15 border-b border-[#00ff66]/30 flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#00ff66]">
                          {comp.secureTitle}
                        </span>
                        <button
                          onClick={() => handleCopy(`sec-${idx}`, comp.secureCode)}
                          className="text-xs font-mono text-[#00ff66] hover:underline inline-flex items-center gap-1"
                        >
                          {copiedCodeKey === `sec-${idx}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedCodeKey === `sec-${idx}` ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed flex-1">
                        {comp.secureCode}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {domain.devsecopsPipeline && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-[#00ff66] font-mono">04.</span> Automated CI/CD DevSecOps Pipeline Architecture
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {domain.devsecopsPipeline.map((p) => (
                  <div key={p.stage} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs font-mono font-bold text-[#00f0ff]">{p.stage}</div>
                    <div className="text-sm font-bold text-[#00ff66] mt-1 font-mono">{p.tool}</div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{p.action}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================
              DOMAIN 5 SPECIFIC SECTIONS: IAAA + DAC/MAC/RBAC/ABAC + KERBEROS + SAML/OAUTH/FIDO2
             ================================================================= */}
          {domain.iaaaLifecycle && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-[#00ff66] font-mono">01.</span> The IAAA Identity Lifecycle Architecture
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {domain.iaaaLifecycle.map((item) => (
                  <div key={item.step} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs font-mono font-bold text-[#00f0ff]">{item.step}</span>
                    <div className="text-sm font-bold text-white mt-1">{item.subtitle}</div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {domain.accessControlTable && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-[#00f0ff] font-mono">02.</span> Access Control Models: DAC vs. MAC vs. RBAC vs. ABAC
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 font-mono text-[11px] uppercase text-slate-400">
                      <th className="py-3 px-4">Access Model</th>
                      <th className="py-3 px-4">Enforcement Mechanism</th>
                      <th className="py-3 px-4">Strengths</th>
                      <th className="py-3 px-4">Trade-offs / Risks</th>
                      <th className="py-3 px-4">Real-World Implementation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {domain.accessControlTable.map((row) => (
                      <tr key={row.model} className="hover:bg-slate-900/60 align-top">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#00f0ff]">{row.model}</td>
                        <td className="py-3.5 px-4 text-slate-200">{row.mechanism}</td>
                        <td className="py-3.5 px-4 text-[#00ff66]">{row.pros}</td>
                        <td className="py-3.5 px-4 text-amber-300">{row.cons}</td>
                        <td className="py-3.5 px-4 font-mono text-xs text-slate-300">{row.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {domain.kerberosFlow && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-[#00f0ff] font-mono">03.</span> Active Directory Kerberos Ticket Exchange (`AS-REQ` / `TGS-REQ` Flow)
              </h3>
              <div className="space-y-3">
                {domain.kerberosFlow.map((k) => (
                  <div key={k.step} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono font-bold text-sm text-[#00f0ff]">{k.step}</span>
                      <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-xs text-[#00ff66]">
                        {k.actor}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">{k.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {domain.modernAuthComparison && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-[#00ff66] font-mono">04.</span> SAML 2.0 vs. OAuth 2.0 vs. OIDC vs. FIDO2/WebAuthn Passkeys
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 font-mono text-[11px] uppercase text-slate-400">
                      <th className="py-3 px-4">Standard</th>
                      <th className="py-3 px-4">Token / Artifact Format</th>
                      <th className="py-3 px-4">Primary Architecture Role</th>
                      <th className="py-3 px-4">Key Security Consideration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {domain.modernAuthComparison.map((row) => (
                      <tr key={row.protocol} className="hover:bg-slate-900/60 align-top">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#00f0ff]">{row.protocol}</td>
                        <td className="py-3.5 px-4 font-mono text-xs text-slate-300">{row.format}</td>
                        <td className="py-3.5 px-4 text-slate-200">{row.primaryUseCase}</td>
                        <td className="py-3.5 px-4 text-[#00ff66]">{row.keySecurityRisk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =================================================================
              DOMAIN 6 SPECIFIC SECTIONS: CRYPTO PRIMITIVES + ENCRYPT VS SIGN + PKI/TLS 1.3 + 3-2-1-1-0 WORM
             ================================================================= */}
          {domain.cryptoPrimitivesTable && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-[#00f0ff] font-mono">01.</span> Symmetric vs. Asymmetric (incl. Post-Quantum ML-KEM) vs. Hashing
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 font-mono text-[11px] uppercase text-slate-400">
                      <th className="py-3 px-4">Cryptographic Family</th>
                      <th className="py-3 px-4">Key Architecture</th>
                      <th className="py-3 px-4 text-[#00ff66]">Modern Recommended Standards</th>
                      <th className="py-3 px-4 text-[#ff3366]">Deprecated (Never Use)</th>
                      <th className="py-3 px-4">Primary Enterprise Use</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {domain.cryptoPrimitivesTable.map((row) => (
                      <tr key={row.category} className="hover:bg-slate-900/60 align-top">
                        <td className="py-3.5 px-4 font-bold text-white">{row.category}</td>
                        <td className="py-3.5 px-4 text-slate-300">{row.keyModel}</td>
                        <td className="py-3.5 px-4 font-mono text-xs text-[#00ff66]">{row.modernAlgorithms}</td>
                        <td className="py-3.5 px-4 font-mono text-xs text-[#ff3366]">{row.deprecatedAvoid}</td>
                        <td className="py-3.5 px-4 text-slate-200">{row.primaryUseCase}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {domain.encryptVsSign && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-[#00f0ff] font-mono">02.</span> Asymmetric Key Direction: Encryption (Confidentiality) vs. Digital Signatures (Authenticity)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-slate-950 border border-[#00f0ff]/40 space-y-2">
                  <div className="text-xs font-mono font-bold text-[#00f0ff] uppercase">
                    🔒 Public-Key Encryption
                  </div>
                  <div className="text-sm font-bold text-white">{domain.encryptVsSign.encryption.goal}</div>
                  <ul className="text-xs text-slate-300 space-y-1.5 pt-1">
                    <li>1. {domain.encryptVsSign.encryption.step1}</li>
                    <li>2. {domain.encryptVsSign.encryption.step2}</li>
                    <li>3. {domain.encryptVsSign.encryption.step3}</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-[#00ff66]/40 space-y-2">
                  <div className="text-xs font-mono font-bold text-[#00ff66] uppercase">
                    ✍️ Cryptographic Digital Signatures
                  </div>
                  <div className="text-sm font-bold text-white">{domain.encryptVsSign.signature.goal}</div>
                  <ul className="text-xs text-slate-300 space-y-1.5 pt-1">
                    <li>1. {domain.encryptVsSign.signature.step1}</li>
                    <li>2. {domain.encryptVsSign.signature.step2}</li>
                    <li>3. {domain.encryptVsSign.signature.step3}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {domain.tlsPfsExplainer && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-3">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-[#00f0ff] font-mono">03.</span> {domain.tlsPfsExplainer.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{domain.tlsPfsExplainer.pkiSummary}</p>
              <div className="p-4 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-xs sm:text-sm text-slate-200 leading-relaxed">
                {domain.tlsPfsExplainer.pfsDetail}
              </div>
            </div>
          )}

          {domain.wormBackupRule && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-[#00ff66] font-mono">04.</span> The 3-2-1-1-0 WORM Anti-Ransomware Backup Architecture
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {domain.wormBackupRule.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-3xl font-mono font-black text-[#00ff66]">{item.digit}</span>
                    <div className="text-xs font-bold text-white mt-1.5">{item.label}</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================
              DOMAIN 7 SPECIFIC SECTIONS: IT CIA VS OT AIC + PURDUE MODEL + ICS PROTOCOLS + CASE STUDIES
             ================================================================= */}
          {domain.itVsOtTable && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-amber-400 font-mono">01.</span> Priority Inversion: Corporate IT (CIA Triad) vs. Industrial OT (AIC Triad)
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 font-mono text-[11px] uppercase text-slate-400">
                      <th className="py-3 px-4">Architectural Dimension</th>
                      <th className="py-3 px-4 text-[#00f0ff]">Enterprise IT (CIA Priority)</th>
                      <th className="py-3 px-4 text-amber-400">Industrial OT / ICS (AIC Priority)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {domain.itVsOtTable.map((row) => (
                      <tr key={row.dimension} className="hover:bg-slate-900/60">
                        <td className="py-3.5 px-4 font-bold text-white">{row.dimension}</td>
                        <td className="py-3.5 px-4 text-slate-300">{row.itCorporate}</td>
                        <td className="py-3.5 px-4 text-amber-200 font-medium">{row.otIndustrial}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {domain.purdueLevels && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-amber-400 font-mono">02.</span> Interactive Purdue Model for ICS Security (Levels 0 to 5 + Level 3.5 IDMZ)
              </h3>
              <div className="space-y-2.5">
                {domain.purdueLevels.map((lvl) => {
                  const isIdmz = lvl.level.includes('3.5');
                  return (
                    <div
                      key={lvl.level}
                      className={`p-4 rounded-xl border ${
                        isIdmz
                          ? 'bg-[#00ff66]/10 border-[#00ff66] shadow-emerald-glow'
                          : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className={`px-2.5 py-0.5 rounded font-mono text-xs font-bold ${
                            isIdmz ? 'bg-[#00ff66] text-slate-950' : 'bg-[#00f0ff]/15 text-[#00f0ff]'
                          }`}>
                            {lvl.level}
                          </span>
                          <span className="font-bold text-white text-sm">{lvl.name}</span>
                        </div>
                        <span className="text-xs font-mono text-slate-400">{lvl.zone}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2.5 text-xs">
                        <div className="text-slate-300">
                          <strong className="text-slate-400 font-mono">ASSETS:</strong> {lvl.assets}
                        </div>
                        <div className="text-[#00ff66]">
                          <strong className="text-slate-400 font-mono">DEFENSE:</strong> {lvl.securityControl}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {domain.icsProtocolsTable && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-amber-400 font-mono">03.</span> Industrial OT Protocols: Port Numbers, Design Risks & Exploit Vectors
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 font-mono text-[11px] uppercase text-slate-400">
                      <th className="py-3 px-4">ICS Protocol</th>
                      <th className="py-3 px-4">Port</th>
                      <th className="py-3 px-4">Primary Sector</th>
                      <th className="py-3 px-4">Protocol Design Flaw</th>
                      <th className="py-3 px-4">Adversary Exploit Vector</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {domain.icsProtocolsTable.map((row) => (
                      <tr key={row.protocol} className="hover:bg-slate-900/60 align-top">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#00f0ff]">{row.protocol}</td>
                        <td className="py-3.5 px-4 font-mono text-amber-300 whitespace-nowrap">{row.port}</td>
                        <td className="py-3.5 px-4 text-slate-300">{row.sector}</td>
                        <td className="py-3.5 px-4 text-slate-200">{row.flaw}</td>
                        <td className="py-3.5 px-4 text-[#ff3366]">{row.exploitVector}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {domain.icsCaseStudies && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {domain.icsCaseStudies.map((cs) => (
                <div key={cs.title} className="soc-card rounded-2xl p-6 border border-amber-500/30 space-y-3">
                  <h4 className="text-base font-extrabold text-white">{cs.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{cs.summary}</p>
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                    <strong>Architectural Mandate:</strong> {cs.takeaway}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* =================================================================
              DOMAIN 8 SPECIFIC SECTIONS: DIRECT VS INDIRECT PROMPT INJECTION + OWASP LLM TOP 10 + RAG
             ================================================================= */}
          {domain.promptInjectionComparison && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-[#00ff66] font-mono">01.</span> Direct vs. Indirect Prompt Injection Architecture
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-slate-950 border border-amber-500/40 space-y-2">
                  <div className="text-xs font-mono font-bold text-amber-400">
                    {domain.promptInjectionComparison.direct.title}
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {domain.promptInjectionComparison.direct.actor}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {domain.promptInjectionComparison.direct.mechanism}
                  </p>
                  <p className="text-xs text-amber-300 pt-1">
                    <strong>Blast Radius:</strong> {domain.promptInjectionComparison.direct.blastRadius}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-[#ff3366]/40 space-y-2">
                  <div className="text-xs font-mono font-bold text-[#ff3366]">
                    {domain.promptInjectionComparison.indirect.title}
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {domain.promptInjectionComparison.indirect.actor}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {domain.promptInjectionComparison.indirect.mechanism}
                  </p>
                  <p className="text-xs text-[#ff3366] pt-1">
                    <strong>Blast Radius:</strong> {domain.promptInjectionComparison.indirect.blastRadius}
                  </p>
                </div>
              </div>
            </div>
          )}

          {domain.owaspLlmTop10 && (
            <div className="soc-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                <span className="text-[#00f0ff] font-mono">02.</span> Complete OWASP Top 10 for LLM & GenAI Applications (LLM01–LLM10)
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 font-mono text-[11px] uppercase text-slate-400">
                      <th className="py-3 px-4">ID</th>
                      <th className="py-3 px-4">LLM Vulnerability</th>
                      <th className="py-3 px-4">Adversarial Risk</th>
                      <th className="py-3 px-4">Architectural Mitigation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {domain.owaspLlmTop10.map((row) => (
                      <tr key={row.code} className="hover:bg-slate-900/60 align-top">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#00f0ff]">{row.code}</td>
                        <td className="py-3.5 px-4 font-bold text-white">{row.name}</td>
                        <td className="py-3.5 px-4 text-slate-300">{row.risk}</td>
                        <td className="py-3.5 px-4 text-[#00ff66]">{row.defense}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {domain.ragAndAgentArchitecture && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {domain.ragAndAgentArchitecture.map((item) => (
                <div key={item.title} className="soc-card rounded-2xl p-6 border border-[#00ff66]/30 space-y-2">
                  <h4 className="text-base font-extrabold text-[#00ff66]">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* =================================================================
              SHARED COPYABLE CODE SNIPPETS (Wireshark/Suricata, Dockerfile/Terraform, Safetensors vs Pickle)
             ================================================================= */}
          {domain.codeSnippets && (
            <div className="space-y-6">
              {domain.codeSnippets.map((snippet, sIdx) => {
                const copyKey = `${domain.id}-snip-${sIdx}`;
                const isCopied = copiedCodeKey === copyKey;
                return (
                  <div
                    key={snippet.title}
                    className="soc-card rounded-2xl overflow-hidden border border-slate-800"
                  >
                    <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-[#00f0ff]" />
                        <span className="text-xs sm:text-sm font-bold text-white">
                          {snippet.title}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(copyKey, snippet.code)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all shrink-0 ${
                          isCopied
                            ? 'bg-[#00ff66] text-slate-950'
                            : 'bg-slate-900 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {isCopied ? 'COPIED!' : 'COPY CODE'}
                      </button>
                    </div>
                    <pre className="p-5 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed bg-[#050811]">
                      {snippet.code}
                    </pre>
                  </div>
                );
              })}
            </div>
          )}

          {/* =================================================================
              INTERACTIVE 3-QUESTION QUIZ AT THE BOTTOM OF EVERY DOMAIN MODULE
             ================================================================= */}
          <div className="soc-card rounded-3xl p-6 sm:p-8 border border-[#00f0ff]/50 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#00f0ff]">
                  <Award className="w-4 h-4" />
                  MODULE {domain.number} KNOWLEDGE VERIFICATION
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  Interactive {domain.shortTitle} Mastery Quiz (3 Questions)
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                  SCORE: <strong className="text-[#00ff66] text-sm">{currentScore} / 3</strong> ({answeredCount}/3 Answered)
                </div>
                {answeredCount > 0 && (
                  <button
                    onClick={handleResetQuiz}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset Quiz
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {domain.quiz.map((q, qIdx) => {
                const picked = currentDomainAnswers[qIdx];
                const isAnswered = picked !== undefined;
                const isCorrect = picked === q.correctIndex;

                return (
                  <div
                    key={qIdx}
                    className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="px-2.5 py-1 rounded bg-[#00f0ff]/15 text-[#00f0ff] font-mono font-bold text-xs shrink-0 mt-0.5">
                        Q{qIdx + 1}
                      </span>
                      <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                        {q.question}
                      </p>
                    </div>

                    <div className="space-y-2 pl-0 sm:pl-10">
                      {q.options.map((opt, optIdx) => {
                        let style = 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-[#00f0ff]/50';
                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            style = 'bg-[#00ff66]/15 border-[#00ff66] text-white font-semibold';
                          } else if (optIdx === picked) {
                            style = 'bg-[#ff3366]/15 border-[#ff3366] text-slate-200';
                          } else {
                            style = 'bg-slate-950/50 border-slate-800/50 text-slate-500';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuizAnswer(qIdx, optIdx)}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${style}`}
                          >
                            <span>{opt}</span>
                            {isAnswered && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-[#00ff66] shrink-0 mt-0.5" />
                            )}
                            {isAnswered && optIdx === picked && optIdx !== q.correctIndex && (
                              <XCircle className="w-4 h-4 text-[#ff3366] shrink-0 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className={`ml-0 sm:ml-10 p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                        isCorrect
                          ? 'bg-[#00ff66]/10 border-[#00ff66]/40 text-slate-200'
                          : 'bg-[#ff3366]/10 border-[#ff3366]/40 text-slate-200'
                      }`}>
                        <div className={`font-mono font-bold text-xs uppercase mb-1 ${
                          isCorrect ? 'text-[#00ff66]' : 'text-[#ff3366]'
                        }`}>
                          {isCorrect ? '✓ CORRECT ANSWER' : '✗ INCORRECT — ARCHITECTURAL EXPLANATION'}
                        </div>
                        <p>{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Next Module Navigation Footer */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-slate-400">
                Completed Module {domain.number}? Proceed to the next core domain:
              </div>
              <button
                onClick={() => {
                  setActiveDomainId(nextDomain.id);
                  window.scrollTo({ top: 180, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider shadow-cyan-glow transition-all"
              >
                Next: {nextDomain.number}. {nextDomain.shortTitle}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>

      <MonetizationCallouts compact />
    </div>
  );
}
