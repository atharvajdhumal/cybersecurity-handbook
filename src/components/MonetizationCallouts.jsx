import React, { useState, useEffect } from 'react';
import {
  Mail,
  CheckCircle2,
  Sparkles,
  Terminal,
  BookMarked,
  ShieldCheck,
  ExternalLink,
  Eye,
  X,
  Copy,
  Check
} from 'lucide-react';

export default function MonetizationCallouts({ compact = false }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('SOC / DFIR Analyst');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [previewModal, setPreviewModal] = useState(null); // 'brief' | 'gumroad' | null
  const [selectedPlaybook, setSelectedPlaybook] = useState(0);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cyberhub_newsletter_sub');
    if (saved) {
      setSubscribed(true);
    }
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid enterprise or personal email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    localStorage.setItem(
      'cyberhub_newsletter_sub',
      JSON.stringify({ email, role, timestamp: new Date().toISOString() })
    );
  };

  const playbooks = [
    {
      title: "CompTIA SecurityX (CAS-005) & Security+ Master Vault",
      price: "$29",
      tag: "BESTSELLER // 2026 EDITION",
      desc: "450+ scenario-based architecture PBQs, NIST CSF 2.0 mapping matrices, Post-Quantum Cryptography (ML-KEM) notes, and Linux/Cloud simulation labs.",
      sampleTitle: "Excerpt: CAS-005 Zero Trust & Post-Quantum TLS 1.3 Hybrid Key Exchange",
      sampleCode: `# Hybrid Post-Quantum TLS 1.3 OpenSSL 3.4+ Verification (X25519MLKEM768)
openssl s_client -connect api.enterprise.internal:443 -groups X25519MLKEM768:X25519 -tls1_3

# Verify FIPS 203 (ML-KEM) & FIPS 204 (ML-DSA) Certificate Chain:
openssl x509 -in server_mldsa65.crt -text -noout | grep -E "Public Key Algorithm|Signature Algorithm"`
    },
    {
      title: "Red & Blue Team 65+ CLI Tactical Playbook Bundle",
      price: "$24",
      tag: "SOC & OFFSEC FIELD MANUAL",
      desc: "Copy-paste command chains for Wireshark, Zeek, Suricata, Velociraptor, Volatility 3, BloodHound, Impacket, Nmap, and Garak LLM Red-Teaming.",
      sampleTitle: "Excerpt: Live Incident Response 60-Second Linux Triage One-Liner",
      sampleCode: `# Hunt deleted binaries still executing in RAM + active C2 sockets + eBPF/LD_PRELOAD hooks:
ls -la /proc/*/exe 2>/dev/null | grep '(deleted)'
ss -tunap | awk 'NR>1 {print $1, $5, $6, $7}'
cat /etc/ld.so.preload 2>/dev/null; find / -perm -4000 -type f 2>/dev/null`
    },
    {
      title: "CISO & Principal Architect NIST CSF 2.0 Kit",
      price: "$39",
      tag: "EXECUTIVE & GRC TEMPLATES",
      desc: "Ready-to-use Board Risk Appetite decks, FAIR quantitative spreadsheets, Third-Party SBOM contract clauses, and Ransomware Tabletop scripts.",
      sampleTitle: "Excerpt: Mandatory Vendor Procurement SBOM & Vulnerability SLA Clause",
      sampleCode: `SECTION 14.2 - SOFTWARE SUPPLY CHAIN & SBOM MANDATE (NIST CSF 2.0 GV.SC-07):
Vendor shall deliver a machine-readable CycloneDX v1.5+ SBOM signed via Sigstore Cosign
with every production release. Any CISA KEV vulnerability (CVSS >= 9.0) in direct or
transitive dependencies must be patched or mitigated within 48 hours of advisory publication.`
    }
  ];

  const handleCopySample = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section className={`${compact ? 'my-8' : 'my-12'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Component 1: Subscribe to the Free 06:00 UTC Threat Brief (7 columns) */}
        <div className="lg:col-span-7 soc-card rounded-2xl p-6 sm:p-8 border border-[#00f0ff]/35 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
              DAILY DISPATCH // 06:00 UTC
            </span>
            <button
              onClick={() => setPreviewModal('brief')}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-[#00f0ff] bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-700/80 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-[#00f0ff]" />
              Preview Sample 06:00 UTC Brief
            </button>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Subscribe to the Free <span className="text-[#00f0ff] font-mono">06:00 UTC</span> Threat Brief
          </h3>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Join <strong className="text-white font-mono">42,800+</strong> SOC analysts, detection engineers, and CISOs receiving our autonomous daily synthesis of CISA KEV additions, zero-day exploit mechanics, copyable Suricata/Sigma rules, and daily SecurityX practice questions.
          </p>

          {subscribed ? (
            <div className="mt-6 p-4 rounded-xl bg-[#00ff66]/10 border border-[#00ff66]/40 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#00ff66] shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white">
                    Telemetry Subscription Active ({role})
                  </p>
                  <p className="text-xs text-slate-300 font-mono">
                    Next autonomous dispatch scheduled for 06:00:00 UTC. Zero spam, 1-click unsubscribe.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('cyberhub_newsletter_sub');
                  setSubscribed(false);
                }}
                className="text-xs font-mono text-slate-400 hover:text-white underline shrink-0"
              >
                Change Email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-5">
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                    Operational Role Track
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none focus:border-[#00f0ff]"
                  >
                    <option>SOC / DFIR Analyst</option>
                    <option>Security Architect / CISO</option>
                    <option>Red Team / Penetration Tester</option>
                    <option>Cloud / DevSecOps / AI Engineer</option>
                    <option>Certification Student (Sec+ / CAS-005)</option>
                  </select>
                </div>
                <div className="sm:col-span-7">
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                    Enterprise or Personal Email
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="analyst@secops.org"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00f0ff] font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-cyan-glow shrink-0"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
              {error && <p className="text-xs text-[#ff3366] font-mono">{error}</p>}
              <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00ff66]" /> PGP-Signed Dispatch
                </span>
                <span>• Direct CISA KEV + Suricata/Sigma Rules</span>
                <span>• 100% Free Open-Access</span>
              </div>
            </form>
          )}
        </div>

        {/* Component 2: Premium Exam & CLI Playbooks (Gumroad) (5 columns) */}
        <div className="lg:col-span-5 soc-card rounded-2xl p-6 sm:p-8 border border-[#00ff66]/35 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-[#00ff66]/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66] text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                GUMROAD DIGITAL VAULT
              </span>
              <span className="text-xs font-mono text-slate-400">PDF + MARKDOWN + ANKI</span>
            </div>

            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Premium Exam & CLI Playbooks <span className="text-[#00ff66] font-mono">(Gumroad)</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Offline field manuals, printable CLI cheat sheets, and CompTIA SecurityX (CAS-005) / Security+ (SY0-701) PBQ lab workbooks that fund this ad-free open intelligence hub.
            </p>

            {/* Interactive Playbook Selector */}
            <div className="mt-4 space-y-2">
              {playbooks.map((pb, idx) => (
                <button
                  key={pb.title}
                  onClick={() => setSelectedPlaybook(idx)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                    selectedPlaybook === idx
                      ? 'bg-slate-900/95 border-[#00ff66]/50 shadow-emerald-glow'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <BookMarked className={`w-3.5 h-3.5 shrink-0 ${
                        selectedPlaybook === idx ? 'text-[#00ff66]' : 'text-slate-400'
                      }`} />
                      <span className="text-xs font-bold text-white truncate">{pb.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 block ml-5">
                      {pb.tag}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#00ff66]/15 text-[#00ff66] font-mono font-bold text-xs shrink-0">
                    {pb.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setPreviewModal('gumroad')}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00ff66] hover:bg-[#00ff66]/90 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-emerald-glow"
            >
              <Terminal className="w-4 h-4" />
              Inspect Playbook & Get on Gumroad
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Preview Modal for Newsletter Brief or Gumroad Playbook */}
      {previewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setPreviewModal(null)}
          />
          <div className="relative w-full max-w-2xl bg-[#0b1120] border border-[#00f0ff]/40 rounded-2xl p-6 shadow-2xl z-10 animate-view-in max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[#00f0ff]" />
                <h4 className="font-mono font-bold text-white text-sm sm:text-base">
                  {previewModal === 'brief'
                    ? 'SAMPLE 06:00 UTC AUTONOMOUS THREAT DISPATCH'
                    : playbooks[selectedPlaybook].title}
                </h4>
              </div>
              <button
                onClick={() => setPreviewModal(null)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {previewModal === 'brief' ? (
              <div className="mt-4 space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                  <p><span className="text-slate-500">FROM:</span> intel-dispatch@cyberdefense-hub.io (PGP: 0x9F4A...82C1)</p>
                  <p><span className="text-slate-500">TIMESTAMP:</span> 2026-10-29 06:00:00 UTC // DEFCON 2</p>
                  <p><span className="text-slate-500">SUBJECT:</span> [06:00 UTC BRIEF] CISA KEV Node2Shell (CVE-2026-111497) + Skyw4lker OAuth Device Code</p>
                </div>
                <p className="leading-relaxed">
                  Every morning at <strong>06:00 UTC</strong>, our autonomous Python + Gemini Threat Synthesis pipeline ingests CISA KEV, ICS-CERT, BleepingComputer, The Hacker News, and Dark Reading feeds to deliver:
                </p>
                <ul className="space-y-2 list-disc list-inside text-slate-300">
                  <li><strong className="text-[#00f0ff]">Executive Incident Matrix:</strong> Every new zero-day & active breach mapped to NIST CSF 2.0 subcategories.</li>
                  <li><strong className="text-[#00ff66]">Root-Cause Exploit Mechanics:</strong> Buffer overflow/protocol flow diagrams + immediate WAF/proxy workarounds.</li>
                  <li><strong className="text-amber-400]">Copy-Paste SOC Rules:</strong> Ready-to-deploy Suricata, Zeek, and Sigma detection signatures.</li>
                  <li><strong className="text-white">Daily Certification Drill:</strong> 1 scenario-based CompTIA SecurityX (CAS-005) / CISSP question based on that morning's real-world attack.</li>
                </ul>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#00ff66]">
                    {playbooks[selectedPlaybook].tag}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#00ff66]/20 text-[#00ff66] font-mono font-bold text-sm">
                    {playbooks[selectedPlaybook].price} USD (Lifetime Updates)
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {playbooks[selectedPlaybook].desc}
                </p>
                <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                  <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-300">
                      {playbooks[selectedPlaybook].sampleTitle}
                    </span>
                    <button
                      onClick={() => handleCopySample(playbooks[selectedPlaybook].sampleCode)}
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#00f0ff] hover:underline"
                    >
                      {copiedSnippet ? <Check className="w-3.5 h-3.5 text-[#00ff66]" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedSnippet ? 'Copied!' : 'Copy Excerpt'}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                    {playbooks[selectedPlaybook].sampleCode}
                  </pre>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <a
                    href="https://gumroad.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00ff66] text-slate-950 font-mono font-bold text-xs uppercase tracking-wider shadow-emerald-glow"
                  >
                    Open Gumroad Checkout ({playbooks[selectedPlaybook].price})
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
