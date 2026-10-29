export const NIST_CSF_FUNCTIONS = [
  {
    id: "GV",
    code: "GOVERN (GV)",
    name: "Govern",
    color: "cyan",
    hex: "#00f0ff",
    badge: "CSF 2.0 CENTRAL PILLAR",
    strategicMandate: "Establish and monitor the organization's cybersecurity risk management strategy, expectations, supply chain oversight, and policy governance.",
    tacticalImplementation: "Board-level risk appetite statements, Third-Party Risk Management (TPRM) vendor audits, mandatory SBOM procurement clauses, and CISO accountability matrices.",
    keySubcategories: [
      { code: "GV.OC", title: "Organizational Context", desc: "Mission, stakeholder expectations, and legal/regulatory dependencies are understood." },
      { code: "GV.RM", title: "Risk Management Strategy", desc: "Priorities, constraints, risk tolerance, and appetite statements are established and communicated." },
      { code: "GV.RR", title: "Roles, Responsibilities & Authorities", desc: "Cybersecurity leadership, human resources, and role accountability are enforced." },
      { code: "GV.SC", title: "Cybersecurity Supply Chain Risk Management", desc: "Third-party software, hardware, and SaaS vendors are audited continuously." }
    ],
    mappedTools: ["OpenCTI", "Trivy (SBOM)", "OWASP Dependency-Check", "Prowler Compliance"],
    metrics: "100% Tier-1 Vendors Audited & SBOM Verified"
  },
  {
    id: "ID",
    code: "IDENTIFY (ID)",
    name: "Identify",
    color: "emerald",
    hex: "#00ff66",
    badge: "ATTACK SURFACE VISIBILITY",
    strategicMandate: "Understand the organization's current hardware, software, cloud, data, and identity assets alongside their associated vulnerabilities and business criticality.",
    tacticalImplementation: "Continuous external attack surface management (EASM), automated asset discovery, CVE vulnerability scanning, and Active Directory privilege graph mapping.",
    keySubcategories: [
      { code: "ID.AM", title: "Asset Management", desc: "Inventories of hardware, software, cloud workloads, APIs, and data flows are maintained." },
      { code: "ID.RA", title: "Risk Assessment", desc: "Vulnerabilities, threats, CISA KEV advisories, and exploit likelihood are identified and prioritized." },
      { code: "ID.IM", title: "Improvement", desc: "Improvements to organizational security processes and threat models are identified from lessons learned." }
    ],
    mappedTools: ["Nmap", "OWASP Amass", "Nuclei", "OpenVAS", "BloodHound CE", "ScoutSuite"],
    metrics: "< 4 Hours External Asset & Shadow IT Discovery"
  },
  {
    id: "PR",
    code: "PROTECT (PR)",
    name: "Protect",
    color: "cyan",
    hex: "#00f0ff",
    badge: "ZERO TRUST & HARDENING",
    strategicMandate: "Deploy and enforce safeguards to manage cybersecurity risk across identities, endpoints, networks, applications, cloud workloads, and cryptographic data.",
    tacticalImplementation: "Phishing-resistant FIDO2/WebAuthn passkeys, micro-segmentation, CIS OS/Container benchmarks, TLS 1.3 + AES-256-GCM encryption, and 3-2-1-1-0 WORM backups.",
    keySubcategories: [
      { code: "PR.AA", title: "Identity Management, Auth & Access Control", desc: "Access to physical and logical assets is limited to authorized users, services, and hardware via Zero Trust." },
      { code: "PR.AT", title: "Awareness and Training", desc: "Personnel receive role-specific social engineering, phishing, and secure coding training." },
      { code: "PR.DS", title: "Data Security", desc: "Data at rest, in transit, and in use is protected dynamically via cryptographic controls." },
      { code: "PR.PS", title: "Platform Security", desc: "Hardware, OS kernels, containers, and cloud configurations are hardened against CIS benchmarks." },
      { code: "PR.IR", title: "Technology Infrastructure Resilience", desc: "Network segmentation, DDoS scrubbing, WORM backups, and high-availability architectures." }
    ],
    mappedTools: ["pfSense / OPNsense", "Semgrep OSS", "Checkov", "Kube-bench", "Gitleaks"],
    metrics: "100% Phishing-Resistant MFA & Immutable Storage"
  },
  {
    id: "DE",
    code: "DETECT (DE)",
    name: "Detect",
    color: "amber",
    hex: "#f59e0b",
    badge: "CONTINUOUS SOC TELEMETRY",
    strategicMandate: "Find and analyze possible cybersecurity attacks, anomalous lateral movement, and compromises in real time across network, endpoint, and cloud telemetry.",
    tacticalImplementation: "SIEM/XDR correlation rules, Sigma & YARA hunting, Zeek passive protocol metadata logging, Suricata IDS inspection, and eBPF container syscall monitoring.",
    keySubcategories: [
      { code: "DE.CM", title: "Continuous Monitoring", desc: "Networks, endpoints, cloud APIs, and physical OT environments are monitored 24/7 for anomalous events." },
      { code: "DE.AE", title: "Adverse Event Analysis", desc: "Anomalies and indicators of compromise (IOCs) are correlated with MITRE ATT&CK threat intelligence." }
    ],
    mappedTools: ["Wazuh", "Security Onion 3", "Suricata", "Zeek", "Falco", "CISA Malcolm", "Hayabusa"],
    metrics: "< 8 Minutes Mean Time to Detect (MTTD)"
  },
  {
    id: "RS",
    code: "RESPOND (RS)",
    name: "Respond",
    color: "crimson",
    hex: "#ff3366",
    badge: "INCIDENT CONTAINMENT & DFIR",
    strategicMandate: "Take immediate tactical action regarding a detected cybersecurity incident to contain lateral spread, preserve forensic evidence, and eradicate the adversary.",
    tacticalImplementation: "Automated EDR host network quarantine, OAuth refresh token revocation, RAM/disk forensic acquisition, malware reverse engineering, and CISA/regulatory notification.",
    keySubcategories: [
      { code: "RS.MA", title: "Incident Management", desc: "Incident response plans (PICERL) are executed in coordination with internal and external stakeholders." },
      { code: "RS.AN", title: "Incident Analysis", desc: "Forensic triage, root-cause determination, and scope of compromise analysis." },
      { code: "RS.CO", title: "Incident Response Reporting & Communication", desc: "Timely, transparent coordination with legal, executives, regulators, and customers." },
      { code: "RS.MI", title: "Incident Mitigation", desc: "Activities are performed to contain the threat, isolate hosts, and eradicate persistence mechanisms." }
    ],
    mappedTools: ["Velociraptor", "TheHive & Cortex", "Volatility 3", "Ghidra", "YARA-X", "CAPA"],
    metrics: "< 15 Minutes Mean Time to Contain (MTTC)"
  },
  {
    id: "RC",
    code: "RECOVER (RC)",
    name: "Recover",
    color: "emerald",
    hex: "#00ff66",
    badge: "RESILIENT RESTORATION",
    strategicMandate: "Restore assets and normal business operations affected by a cybersecurity incident while verifying system integrity and preventing re-infection.",
    tacticalImplementation: "Clean-room restoration from air-gapped WORM snapshots, Active Directory forest recovery, golden image redeployment via IaC, and post-incident architecture hardening.",
    keySubcategories: [
      { code: "RC.RP", title: "Incident Recovery Plan Execution", desc: "Restoration activities are performed to ensure operational availability of critical systems and services." },
      { code: "RC.CO", title: "Incident Recovery Communication", desc: "Restoration progress and post-mortem architectural improvements are shared with stakeholders." }
    ],
    mappedTools: ["Terraform / OpenTofu", "Ansible", "CISA LME", "Autopsy"],
    metrics: "RPO < 15 Mins // Verified Clean-Room WORM Restore"
  }
];
