import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  X,
  BookOpen,
  Wrench,
  AlertTriangle,
  History,
  Map,
  Briefcase,
  ArrowRight,
  CornerDownLeft,
  Gamepad2
} from 'lucide-react';
import { CORE_DOMAINS } from '../data/domainsData';
import { ARSENAL_TOOLS } from '../data/arsenalData';
import { HALL_OF_INFAMY } from '../data/hallOfInfamyData';
import {
  ROADMAP_STAGES,
  CAREER_ROLE_TRACKS,
  LIVE_CTF_PRACTICE_ARENAS,
  OS_PRIVESC_AD_CHEATSHEET
} from '../data/roadmapData';

export default function GlobalSearchModal({
  isOpen,
  onClose,
  dailyThreats,
  onNavigate
}) {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Build unified search index across all 5 pages
  const allSearchItems = useMemo(() => {
    const items = [];

    // 1. Core Domains
    CORE_DOMAINS.forEach((d) => {
      items.push({
        id: `domain-${d.id}`,
        type: 'DOMAIN MODULE',
        category: 'DOMAINS',
        title: `Module ${d.number}: ${d.title}`,
        subtitle: `${d.summary} (${d.keyTopics.join(', ')})`,
        badge: d.nistMapping.split(':')[0],
        action: () => onNavigate('domains', { domainId: d.id })
      });
    });

    // 2. Daily Threats & CVEs
    if (dailyThreats?.attackLog) {
      dailyThreats.attackLog.forEach((t) => {
        items.push({
          id: `threat-${t.id}`,
          type: 'DAILY CVE / THREAT',
          category: 'THREATS',
          title: t.incidentOrCve,
          subtitle: `${t.target} — ${t.attackVector} | Patch: ${t.immediateSolution}`,
          badge: `CVSS ${t.cvss}`,
          action: () => onNavigate('threats', { section: 'attack-log', search: t.incidentOrCve })
        });
      });
    }

    // 3. Hall of Infamy Historical Case Studies
    HALL_OF_INFAMY.forEach((h) => {
      items.push({
        id: `infamy-${h.id}`,
        type: 'HALL OF INFAMY',
        category: 'INFAMY',
        title: `${h.name} (${h.year})`,
        subtitle: `${h.summary} — Root Cause: ${h.technicalRootCause.slice(0, 140)}...`,
        badge: `${h.year}`,
        action: () => onNavigate('threats', { section: 'infamy', infamyId: h.id })
      });
    });

    // 4. Open-Source Arsenal Tools (68+)
    ARSENAL_TOOLS.forEach((tool) => {
      items.push({
        id: `tool-${tool.id}`,
        type: 'OPEN-SOURCE TOOL',
        category: 'TOOLS',
        title: `${tool.name} (${tool.category})`,
        subtitle: `${tool.capabilities} | CLI: ${tool.cli}`,
        badge: tool.license,
        action: () => onNavigate('arsenal', { toolSearch: tool.name })
      });
    });

    // 5. Roadmap Nodes & Career Roles
    ROADMAP_STAGES.forEach((stage) => {
      stage.nodes.forEach((node) => {
        items.push({
          id: `roadmap-${node.id}`,
          type: 'ROADMAP NODE',
          category: 'ROADMAP',
          title: `${node.code} ${node.title}`,
          subtitle: `${node.subtitle} — ${node.topicsToMaster.join(' • ')}`,
          badge: stage.stageNumber,
          action: () => onNavigate('roadmap', { nodeId: node.id })
        });
      });
    });

    CAREER_ROLE_TRACKS.forEach((track) => {
      track.roles.forEach((role) => {
        items.push({
          id: `role-${role.title}`,
          type: 'CAREER ROLE',
          category: 'ROADMAP',
          title: `${role.title} (${role.level})`,
          subtitle: `${role.responsibilities} | Certs: ${role.certs.join(', ')}`,
          badge: role.compRange,
          action: () => onNavigate('roadmap', { trackId: track.id })
        });
      });
    });

    // 5b. OS Internals, Privilege Escalation & Active Directory Cheat Sheets
    OS_PRIVESC_AD_CHEATSHEET.forEach((group) => {
      group.items.forEach((entry) => {
        items.push({
          id: `privesc-${group.id}-${entry.vector}`,
          type: 'PRIVESC / AD CHEAT SHEET',
          category: 'ROADMAP',
          title: `${group.label}: ${entry.vector}`,
          subtitle: `${entry.mechanism} | CLI: ${entry.enumCli}`,
          badge: 'OS INTERNALS',
          action: () => onNavigate('roadmap', { privescId: group.id })
        });
      });
    });

    // 5c. Live CTF & Binary Exploitation Practice Arenas
    LIVE_CTF_PRACTICE_ARENAS.forEach((arena) => {
      items.push({
        id: `ctf-arena-${arena.name}`,
        type: 'LIVE CTF PLATFORM',
        category: 'ROADMAP',
        title: `${arena.name} (${arena.category})`,
        subtitle: `${arena.desc} — ${arena.url}`,
        badge: arena.level,
        action: () => onNavigate('roadmap', { ctfArenaId: arena.name })
      });
    });

    // 6. Cyber Arena Interactive Game Modes
    items.push(
      {
        id: 'arena-soc-siege',
        type: 'CYBER ARENA GAME',
        category: 'ARENA',
        title: '🕹️ Mode 1: SOC Under Siege (Live Incident Triage Simulator)',
        subtitle: '90s timer, Network Integrity health bar, Windows 4688 PowerShell, Suricata SQLi/SSRF, AWS PassRole & Kerberoasting triage.',
        badge: '+45 XP/Alert',
        action: () => onNavigate('arena', { mode: 'soc-siege' })
      },
      {
        id: 'arena-terminal-ctf',
        type: 'CYBER ARENA GAME',
        category: 'ARENA',
        title: '🕹️ Mode 2: Terminal CTF (Interactive Browser Shell)',
        subtitle: 'Interactive Linux shell supporting ls, cd, cat, grep, strings, base64, netstat, ps, history, whoami & submit <flag>.',
        badge: '+100 XP/Flag',
        action: () => onNavigate('arena', { mode: 'terminal-ctf' })
      },
      {
        id: 'arena-spot-vuln',
        type: 'CYBER ARENA GAME',
        category: 'ARENA',
        title: '🕹️ Mode 3: Spot the Vuln (Code & Config Inspector)',
        subtitle: 'Click the exact vulnerable line & select the secure patch across Python SQLi, Node.js RCE, Terraform S3, Docker root, IMDSv1 & JWT.',
        badge: '+70 XP/Patch',
        action: () => onNavigate('arena', { mode: 'spot-vuln' })
      }
    );

    return items;
  }, [dailyThreats, onNavigate]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allSearchItems
      .filter((item) => {
        if (categoryFilter !== 'ALL' && item.category !== categoryFilter) return false;
        if (!q) return true;
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.badge.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q)
        );
      })
      .slice(0, 25);
  }, [allSearchItems, query, categoryFilter]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, categoryFilter]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + Math.max(1, filteredItems.length)) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        e.preventDefault();
        filteredItems[selectedIndex].action();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  const getTypeIcon = (cat) => {
    switch (cat) {
      case 'DOMAINS':
        return <BookOpen className="w-4 h-4 text-[#00f0ff]" />;
      case 'TOOLS':
        return <Wrench className="w-4 h-4 text-[#00ff66]" />;
      case 'THREATS':
        return <AlertTriangle className="w-4 h-4 text-[#ff3366]" />;
      case 'INFAMY':
        return <History className="w-4 h-4 text-amber-400" />;
      case 'ROADMAP':
        return <Map className="w-4 h-4 text-purple-400" />;
      case 'ARENA':
        return <Gamepad2 className="w-4 h-4 text-[#00ff66]" />;
      default:
        return <Briefcase className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Search Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#0b1120] border border-[#00f0ff]/40 rounded-2xl shadow-2xl overflow-hidden z-10 animate-view-in">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <Search className="w-5 h-5 text-[#00f0ff] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 8 Core Domains, 68+ Tools (Wireshark, Wazuh, Garak), CVEs, Stuxnet, CrowdStrike, SecurityX..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-mono text-slate-400 hover:text-white mr-2 px-1.5 py-0.5 bg-slate-800 rounded"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-950/70 border-b border-slate-800/80 overflow-x-auto">
          {[
            { id: 'ALL', label: `All Intel (${allSearchItems.length})` },
            { id: 'ARENA', label: '🕹️ Cyber Arena' },
            { id: 'DOMAINS', label: '8 Learning Domains' },
            { id: 'TOOLS', label: '68+ OSS Tools' },
            { id: 'THREATS', label: 'Daily CVEs' },
            { id: 'INFAMY', label: 'Hall of Infamy' },
            { id: 'ROADMAP', label: 'Roadmap & Roles' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono whitespace-nowrap transition-all ${
                categoryFilter === tab.id
                  ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-800/60">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center px-4">
              <p className="text-slate-400 font-mono text-sm">
                No matching intelligence records found for <span className="text-[#00f0ff]">"{query}"</span>.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for "Kerberos", "Suricata", "IMDSv2", "CrowdStrike", "SQLi", or "SecurityX".
              </p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  className={`w-full text-left px-4 py-3 flex items-start justify-between gap-3 transition-colors ${
                    isSelected ? 'bg-[#00f0ff]/10' : 'hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-1 p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                      {getTypeIcon(item.category)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {item.type}
                        </span>
                        <span className="text-sm font-semibold text-white truncate">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-center">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[#00f0ff]">
                      {item.badge}
                    </span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-[#00f0ff] translate-x-0.5' : 'text-slate-600'
                    }`} />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <CornerDownLeft className="w-3.5 h-3.5 text-[#00f0ff]" /> Enter to Jump
            </span>
            <span>↑↓ Navigate</span>
            <span>ESC Close</span>
          </div>
          <span className="text-[#00ff66]">GLOBAL INTEL INDEX // READY</span>
        </div>
      </div>
    </div>
  );
}
