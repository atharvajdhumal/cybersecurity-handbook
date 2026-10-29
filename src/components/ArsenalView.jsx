import React, { useState, useMemo, useEffect } from 'react';
import {
  Wrench,
  Search,
  Copy,
  Check,
  Terminal,
  Shield,
  Filter,
  X
} from 'lucide-react';
import { ARSENAL_CATEGORIES, ARSENAL_TOOLS } from '../data/arsenalData';
import MonetizationCallouts from './MonetizationCallouts';

export default function ArsenalView({ initialToolSearch }) {
  const [searchQuery, setSearchQuery] = useState(initialToolSearch || '');
  const [selectedCategory, setSelectedCategory] = useState('All Tools');
  const [nistFilter, setNistFilter] = useState('ALL');
  const [copiedToolId, setCopiedToolId] = useState(null);

  useEffect(() => {
    if (initialToolSearch) {
      setSearchQuery(initialToolSearch);
      setSelectedCategory('All Tools');
    }
  }, [initialToolSearch]);

  const categoryCounts = useMemo(() => {
    const counts = { 'All Tools': ARSENAL_TOOLS.length };
    ARSENAL_CATEGORIES.slice(1).forEach((cat) => {
      counts[cat] = ARSENAL_TOOLS.filter((t) => t.category === cat).length;
    });
    return counts;
  }, []);

  const filteredTools = useMemo(() => {
    return ARSENAL_TOOLS.filter((tool) => {
      if (selectedCategory !== 'All Tools' && tool.category !== selectedCategory) {
        return false;
      }
      if (nistFilter !== 'ALL' && !tool.nistFunction.includes(nistFilter)) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.license.toLowerCase().includes(q) ||
        tool.capabilities.toLowerCase().includes(q) ||
        tool.cli.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory, nistFilter]);

  const handleCopyCli = (id, cli) => {
    navigator.clipboard.writeText(cli);
    setCopiedToolId(id);
    setTimeout(() => setCopiedToolId(null), 2000);
  };

  return (
    <div className="space-y-10 animate-view-in">
      {/* Header Banner */}
      <section className="soc-card rounded-3xl p-6 sm:p-8 border border-[#00ff66]/35 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-72 h-72 bg-[#00ff66]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff66]/15 border border-[#00ff66]/40 text-[#00ff66] text-xs font-mono font-bold mb-3">
              <Wrench className="w-3.5 h-3.5" />
              GLOBAL OPEN-SOURCE DIRECTORY // {ARSENAL_TOOLS.length} VETTED TOOLS
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Complete Open-Source Cybersecurity Arsenal
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-3xl">
              Live-searchable encyclopedia of <strong className="text-white">{ARSENAL_TOOLS.length} industry-standard free & open-source tools</strong> across 8 operational categories—complete with software license, NIST CSF 2.0 alignment, technical capabilities, and 1-click copyable CLI commands.
            </p>
          </div>

          {/* Search & NIST Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-[#00f0ff] absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 68+ tools, CLI flags, PCAP..."
                className="pl-10 pr-8 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#00f0ff] w-full sm:w-72"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <select
              value={nistFilter}
              onChange={(e) => setNistFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none focus:border-[#00ff66]"
            >
              <option value="ALL">All NIST CSF 2.0 Functions</option>
              <option value="Govern (GV)">Govern (GV)</option>
              <option value="Identify (ID)">Identify (ID)</option>
              <option value="Protect (PR)">Protect (PR)</option>
              <option value="Detect (DE)">Detect (DE)</option>
              <option value="Respond (RS)">Respond (RS)</option>
              <option value="Recover (RC)">Recover (RC)</option>
            </select>
          </div>
        </div>

        {/* 8 Category Filter Pills */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap gap-2">
          {ARSENAL_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#00f0ff] text-slate-950 font-bold shadow-cyan-glow'
                    : 'bg-slate-950/90 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{category}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                  isSelected ? 'bg-slate-950/25 text-slate-950 font-extrabold' : 'bg-slate-900 text-[#00f0ff]'
                }`}>
                  {categoryCounts[category]}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
        <span>
          SHOWING <strong className="text-[#00f0ff]">{filteredTools.length}</strong> OF {ARSENAL_TOOLS.length} OPEN-SOURCE TOOLS
        </span>
        {(searchQuery || selectedCategory !== 'All Tools' || nistFilter !== 'ALL') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Tools');
              setNistFilter('ALL');
            }}
            className="text-[#00ff66] hover:underline"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="soc-card rounded-2xl p-12 text-center space-y-3">
          <p className="font-mono text-base text-slate-300">
            No open-source tools matched <span className="text-[#00f0ff]">&quot;{searchQuery}&quot;</span> in {selectedCategory}.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Tools');
              setNistFilter('ALL');
            }}
            className="px-4 py-2 rounded-xl bg-[#00f0ff]/15 border border-[#00f0ff]/40 text-xs font-mono text-[#00f0ff]"
          >
            Show All {ARSENAL_TOOLS.length} Tools
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => {
            const isCopied = copiedToolId === tool.id;
            return (
              <div
                key={tool.id}
                className="soc-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-slate-800 hover:border-[#00f0ff]/50 transition-all"
              >
                <div>
                  {/* Category & License Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#00f0ff]/15 border border-[#00f0ff]/35 text-[#00f0ff] font-mono text-[10px] font-bold">
                      {tool.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[10px]">
                      {tool.license}
                    </span>
                  </div>

                  {/* Tool Name & NIST Mapping */}
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-lg font-extrabold text-white">
                      {tool.name}
                    </h3>
                  </div>
                  <div className="text-[11px] font-mono text-[#00ff66] mt-0.5">
                    NIST CSF 2.0: {tool.nistFunction}
                  </div>

                  {/* Capabilities */}
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    {tool.capabilities}
                  </p>
                </div>

                {/* 1-Click Copyable CLI Command Box */}
                <div className="mt-5 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
                    <span className="flex items-center gap-1">
                      <Terminal className="w-3 h-3 text-[#00f0ff]" /> TACTICAL CLI EXAMPLE
                    </span>
                    <button
                      onClick={() => handleCopyCli(tool.id, tool.cli)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold transition-colors ${
                        isCopied
                          ? 'bg-[#00ff66] text-slate-950'
                          : 'bg-slate-900 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30'
                      }`}
                    >
                      {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {isCopied ? 'COPIED!' : 'COPY CLI'}
                    </button>
                  </div>
                  <div
                    onClick={() => handleCopyCli(tool.id, tool.cli)}
                    title="Click to copy CLI command"
                    className="p-2.5 rounded-xl bg-[#050811] border border-slate-800/90 hover:border-[#00f0ff]/40 cursor-pointer font-mono text-[11px] text-slate-200 overflow-x-auto whitespace-nowrap"
                  >
                    <span className="text-[#00ff66] select-none mr-1.5">$</span>
                    {tool.cli}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <MonetizationCallouts compact />
    </div>
  );
}
