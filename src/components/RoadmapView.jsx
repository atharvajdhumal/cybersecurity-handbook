import React, { useState, useEffect } from 'react';
import {
  Map,
  CheckCircle2,
  Circle,
  X,
  ExternalLink,
  Terminal,
  Award,
  Briefcase,
  Layers,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import {
  ROADMAP_STAGES,
  CAREER_ROLE_TRACKS,
  VENDOR_CERT_MATRIX,
  SECURITYX_CAS005_DATA
} from '../data/roadmapData';
import MonetizationCallouts from './MonetizationCallouts';

export default function RoadmapView({
  completedNodes,
  onToggleNodeComplete,
  onResetRoadmapProgress,
  initialNavState,
  onNavigate
}) {
  const [activeDrawerNode, setActiveDrawerNode] = useState(null);
  const [activeRoleTab, setActiveRoleTab] = useState(CAREER_ROLE_TRACKS[0].id);

  // Total nodes count across all 3 stages
  const allNodes = ROADMAP_STAGES.flatMap((s) => s.nodes);
  const totalNodes = allNodes.length;
  const completedCount = allNodes.filter((n) => completedNodes[n.id]).length;
  const progressPercent = Math.round((completedCount / totalNodes) * 100);

  // Open drawer or role tab if triggered from Global Search
  useEffect(() => {
    if (!initialNavState) return;
    if (initialNavState.nodeId) {
      const found = allNodes.find((n) => n.id === initialNavState.nodeId);
      if (found) setActiveDrawerNode(found);
    }
    if (initialNavState.trackId) {
      setActiveRoleTab(initialNavState.trackId);
      setTimeout(() => {
        document.getElementById('career-role-matrix')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [initialNavState]);

  const activeTrack =
    CAREER_ROLE_TRACKS.find((t) => t.id === activeRoleTab) || CAREER_ROLE_TRACKS[0];

  return (
    <div className="space-y-14 animate-view-in">
      {/* 1. HEADER & OVERALL PROGRESS BAR */}
      <section className="soc-card rounded-3xl p-6 sm:p-8 border border-[#00f0ff]/40 relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/15 border border-[#00f0ff]/40 text-[#00f0ff] text-xs font-mono font-bold mb-3">
              <Map className="w-3.5 h-3.5" />
              INTERACTIVE ROADMAP.SH-STYLE ARCHITECT PATHWAY
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Interactive Cybersecurity Roadmap, Roles & Certifications
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-3xl">
              Click any node in <strong className="text-[#00f0ff]">Stage 1</strong>, <strong className="text-[#00ff66]">Stage 2</strong>, or <strong className="text-[#ff3366]">Stage 3</strong> below to open the interactive study drawer with core topics, hands-on lab platforms (TryHackMe, HackTheBox, picoCTF), and progress tracking saved automatically to your browser.
            </p>
          </div>

          {/* Mastery Progress Card */}
          <div className="w-full lg:w-80 p-5 rounded-2xl bg-slate-950/95 border border-slate-800 shrink-0 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">ROADMAP MASTERY</span>
              <span className="text-[#00ff66] font-extrabold text-sm">
                {completedCount} / {totalNodes} NODES ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-[#00f0ff] to-[#00ff66] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Saved in localStorage</span>
              {completedCount > 0 && (
                <button
                  onClick={onResetRoadmapProgress}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-white underline"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE VISUAL LEARNING ROADMAP (STAGE 1 -> STAGE 2 -> STAGE 3) */}
      <section className="space-y-10 relative">
        {ROADMAP_STAGES.map((stage, stageIdx) => {
          const borderAccent =
            stage.accent === 'cyan'
              ? 'border-[#00f0ff]/40'
              : stage.accent === 'emerald'
              ? 'border-[#00ff66]/40'
              : 'border-[#ff3366]/40';
          const badgeAccent =
            stage.accent === 'cyan'
              ? 'bg-[#00f0ff]/15 text-[#00f0ff] border-[#00f0ff]/40'
              : stage.accent === 'emerald'
              ? 'bg-[#00ff66]/15 text-[#00ff66] border-[#00ff66]/40'
              : 'bg-[#ff3366]/15 text-[#ff3366] border-[#ff3366]/40';

          return (
            <div key={stage.id} className="relative">
              {/* Connector Line Between Stages */}
              {stageIdx > 0 && (
                <div className="flex justify-center -mt-6 mb-4">
                  <div className="h-8 w-0.5 bg-gradient-to-b from-[#00f0ff] to-[#00ff66]" />
                </div>
              )}

              <div className={`soc-card rounded-3xl p-6 sm:p-8 border ${borderAccent}`}>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className={`px-3 py-1 rounded-full border font-mono text-xs font-extrabold ${badgeAccent}`}>
                        {stage.stageNumber}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {stage.timeline}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                      {stage.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
                      {stage.description}
                    </p>
                  </div>
                </div>

                {/* Roadmap Nodes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  {stage.nodes.map((node) => {
                    const isDone = !!completedNodes[node.id];
                    return (
                      <div
                        key={node.id}
                        onClick={() => setActiveDrawerNode(node)}
                        className={`rounded-2xl p-5 border cursor-pointer transition-all flex flex-col justify-between group hover:-translate-y-1 ${
                          isDone
                            ? 'bg-[#00ff66]/10 border-[#00ff66] shadow-emerald-glow'
                            : 'bg-slate-950/90 border-slate-800 hover:border-[#00f0ff]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-[#00f0ff]">
                              NODE {node.code}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleNodeComplete(node.id);
                              }}
                              title={isDone ? 'Mark Incomplete' : 'Mark Complete'}
                              className="p-1 rounded-full hover:bg-slate-800 transition-colors"
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-5 h-5 text-[#00ff66]" />
                              ) : (
                                <Circle className="w-5 h-5 text-slate-500 group-hover:text-[#00f0ff]" />
                              )}
                            </button>
                          </div>

                          <h3 className="text-base font-extrabold text-white group-hover:text-[#00f0ff] transition-colors">
                            {node.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                            {node.subtitle}
                          </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                          <span className="text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#00f0ff]" /> {node.estimatedHours}
                          </span>
                          <span className="text-[#00f0ff] font-bold flex items-center gap-0.5">
                            Open Drawer <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. TABBED CAREER ROLE MATRIX (15 ROLES ACROSS 4 TRACKS) */}
      <section id="career-role-matrix" className="soc-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00ff66] font-bold mb-2">
              <Briefcase className="w-4 h-4" />
              COMPLETE CYBERSECURITY CAREER ROLE MATRIX (15 ROLES)
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Operational Roles, Daily Duties, Skills & Certifications
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Switch between the four career tracks below to compare experience requirements, compensation ranges, daily engineering responsibilities, and recommended certifications.
            </p>
          </div>
        </div>

        {/* 4 Track Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          {CAREER_ROLE_TRACKS.map((track) => {
            const isSelected = track.id === activeRoleTab;
            return (
              <button
                key={track.id}
                onClick={() => setActiveRoleTab(track.id)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? 'bg-[#00f0ff] text-slate-950 shadow-cyan-glow'
                    : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {track.label} ({track.roles.length})
              </button>
            );
          })}
        </div>

        {/* Role Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 font-mono text-[11px] uppercase text-slate-400">
                <th className="py-3.5 px-4">Role Title & Level</th>
                <th className="py-3.5 px-4">Core Daily Responsibilities</th>
                <th className="py-3.5 px-4">Must-Have Technical Skills</th>
                <th className="py-3.5 px-4">Recommended Certifications</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {activeTrack.roles.map((role) => (
                <tr key={role.title} className="hover:bg-slate-900/60 align-top">
                  <td className="py-4 px-4">
                    <div className="font-extrabold text-white text-sm sm:text-base">
                      {role.title}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-[11px] text-[#00f0ff]">
                        {role.level}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#00ff66]/15 border border-[#00ff66]/30 font-mono text-[11px] text-[#00ff66] font-bold">
                        {role.compRange}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-200 leading-relaxed">
                    {role.responsibilities}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1.5">
                      {role.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1.5">
                      {role.certs.map((cert) => (
                        <span
                          key={cert}
                          className="px-2 py-0.5 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/30 font-mono text-xs text-[#00f0ff] font-semibold"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. VENDOR CERTIFICATION PROGRESSION MATRIX & COMPTIA SECURITYX (CAS-005) BREAKDOWN */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Vendor Certification Progression Matrix */}
        <div className="lg:col-span-7 soc-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] font-bold">
              GLOBAL CREDENTIAL DIRECTORY
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Vendor Certification Progression Matrix
            </h3>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 font-mono text-[11px] uppercase text-slate-400">
                  <th className="py-3 px-4">Experience Tier</th>
                  <th className="py-3 px-4">CompTIA</th>
                  <th className="py-3 px-4">ISC2 / ISACA</th>
                  <th className="py-3 px-4">OffSec / Practical</th>
                  <th className="py-3 px-4">GIAC (SANS)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {VENDOR_CERT_MATRIX.map((row) => (
                  <tr key={row.tier} className="hover:bg-slate-900/60 align-top">
                    <td className="py-4 px-4 font-mono font-bold text-[#00f0ff]">
                      {row.tier}
                    </td>
                    <td className="py-4 px-4 text-slate-200 space-y-1">
                      {row.comptia.map((c) => (
                        <div key={c} className="font-mono text-xs">{c}</div>
                      ))}
                    </td>
                    <td className="py-4 px-4 text-slate-200 space-y-1">
                      {row.isc2_isaca.map((c) => (
                        <div key={c} className="font-mono text-xs">{c}</div>
                      ))}
                    </td>
                    <td className="py-4 px-4 text-[#00ff66] space-y-1">
                      {row.offsec_practical.map((c) => (
                        <div key={c} className="font-mono text-xs">{c}</div>
                      ))}
                    </td>
                    <td className="py-4 px-4 text-amber-300 space-y-1">
                      {row.giac.map((c) => (
                        <div key={c} className="font-mono text-xs">{c}</div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 5 Cols: CompTIA SecurityX (CAS-005) Exam Breakdown */}
        <div className="lg:col-span-5 soc-card rounded-3xl p-6 sm:p-8 border border-[#00ff66]/40 space-y-5">
          <div>
            <span className="px-2.5 py-1 rounded bg-[#00ff66]/15 border border-[#00ff66]/40 text-[#00ff66] font-mono text-xs font-bold">
              PRINCIPAL ARCHITECT STANDARD // CAS-005
            </span>
            <h3 className="text-xl font-extrabold text-white mt-3">
              {SECURITYX_CAS005_DATA.title}
            </h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              {SECURITYX_CAS005_DATA.subtitle}
            </p>
          </div>

          {/* Exam Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SECURITYX_CAS005_DATA.specs.map((spec) => (
              <div key={spec.label} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono uppercase text-slate-400">{spec.label}</div>
                <div className="text-xs font-mono font-bold text-white mt-0.5">{spec.value}</div>
              </div>
            ))}
          </div>

          {/* Domain Weights Visual Breakdown */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono font-bold uppercase text-slate-300">
              Official CAS-005 Exam Domain Weights
            </div>
            {SECURITYX_CAS005_DATA.domains.map((dom) => (
              <div key={dom.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-white">{dom.name}</span>
                  <span className="font-extrabold" style={{ color: dom.color }}>
                    {dom.weight}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${dom.weight}%`, backgroundColor: dom.color }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {dom.focus}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          INTERACTIVE ROADMAP NODE DETAIL DRAWER (SLIDE-OVER PANEL)
         ===================================================================== */}
      {activeDrawerNode && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setActiveDrawerNode(null)}
          />

          {/* Slide-Over Drawer Panel */}
          <div className="relative w-full max-w-xl bg-[#0b1120] border-l border-[#00f0ff]/40 h-full overflow-y-auto p-6 sm:p-8 z-10 shadow-2xl space-y-6 animate-view-in">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#00f0ff]/15 text-[#00f0ff] font-mono text-xs font-bold">
                    ROADMAP NODE {activeDrawerNode.code}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activeDrawerNode.estimatedHours} • {activeDrawerNode.difficulty}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                  {activeDrawerNode.title}
                </h3>
                <p className="text-xs font-mono text-[#00ff66] mt-1">
                  {activeDrawerNode.subtitle}
                </p>
              </div>

              <button
                onClick={() => setActiveDrawerNode(null)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mark Complete Toggle Button */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono uppercase text-slate-400">
                  Node Completion Status
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {completedNodes[activeDrawerNode.id]
                    ? '✓ Completed & Verified in Roadmap'
                    : 'In Progress — Mark Complete when mastered'}
                </div>
              </div>
              <button
                onClick={() => onToggleNodeComplete(activeDrawerNode.id)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
                  completedNodes[activeDrawerNode.id]
                    ? 'bg-[#00ff66] text-slate-950 shadow-emerald-glow'
                    : 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/50 hover:bg-[#00f0ff] hover:text-slate-950'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {completedNodes[activeDrawerNode.id] ? 'Completed' : 'Mark Complete'}
              </button>
            </div>

            {/* Architectural Why It Matters */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="text-xs font-mono font-bold uppercase text-[#00f0ff]">
                Why This Node Matters Architecturally
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeDrawerNode.whyItMatters}
              </p>
            </div>

            {/* Topics to Master */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Core Engineering Topics to Master ({activeDrawerNode.topicsToMaster.length})
              </h4>
              <ul className="space-y-2.5">
                {activeDrawerNode.topicsToMaster.map((topic, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs sm:text-sm text-slate-200"
                  >
                    <span className="px-2 py-0.5 rounded bg-[#00f0ff]/15 text-[#00f0ff] font-mono text-xs font-bold shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="leading-relaxed">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hands-On Lab Platforms (TryHackMe, HackTheBox, picoCTF) */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00ff66]">
                Hands-On Lab Platforms (TryHackMe, HackTheBox, picoCTF)
              </h4>
              <div className="space-y-2.5">
                {activeDrawerNode.handsOnLabs.map((lab) => (
                  <a
                    key={lab.name}
                    href={lab.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-[#00ff66]/50 flex items-center justify-between gap-3 transition-all group"
                  >
                    <div>
                      <span className="px-2 py-0.5 rounded bg-[#00ff66]/15 text-[#00ff66] font-mono text-[10px] font-bold">
                        {lab.platform}
                      </span>
                      <div className="text-xs sm:text-sm font-bold text-white mt-1 group-hover:text-[#00ff66]">
                        {lab.name}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#00ff66] shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Recommended Open-Source Tools */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Recommended Open-Source Arsenal Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeDrawerNode.recommendedTools.map((toolName) => (
                  <button
                    key={toolName}
                    onClick={() => {
                      setActiveDrawerNode(null);
                      onNavigate('arsenal', { toolSearch: toolName.split(' ')[0] });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-[#00f0ff]/15 border border-slate-800 hover:border-[#00f0ff]/40 text-xs font-mono text-[#00f0ff]"
                  >
                    <Terminal className="w-3.5 h-3.5 text-[#00ff66]" />
                    {toolName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <MonetizationCallouts compact />
    </div>
  );
}
