export const ROADMAP_STAGES = [
  {
    id: "stage-1",
    stageNumber: "STAGE 01",
    title: "IT, OS & Networking Foundations",
    timeline: "Months 1–3 // Zero-to-Operator Core",
    accent: "cyan",
    description: "Every elite security engineer, SOC analyst, and penetration tester stands on deep systems engineering foundations. You cannot defend or exploit an operating system or network protocol you do not fundamentally understand.",
    nodes: [
      {
        id: "node-virt-hardware",
        code: "1.1",
        title: "Computer Architecture, Memory & Virtualization Labs",
        subtitle: "CPU Rings, RAM/Stack/Heap, Proxmox, VMware & Isolated Home Labs",
        estimatedHours: "35 hrs",
        difficulty: "Foundational",
        whyItMatters: "Understanding CPU privilege rings (Ring 0 Kernel vs Ring 3 User Mode), x86_64 virtual memory layout (Stack vs Heap), UEFI Secure Boot, and TPM 2.0 is essential for analyzing buffer overflows, kernel rootkits, and building safe malware detonation sandboxes.",
        topicsToMaster: [
          "x86_64 & ARM64 CPU Privilege Rings (Ring 0 Kernel Space vs Ring 3 User Space) & System Calls",
          "Process Memory Layout: Text Segment, Data/BSS, Heap (dynamic allocation), and Stack frames (RSP/RBP)",
          "Type-1 (Proxmox VE, ESXi, KVM) vs Type-2 Hypervisors (VirtualBox, VMware Workstation) & Snapshot isolation",
          "Building an isolated Dual-NIC Home Lab: pfSense Firewall VM + Kali Linux + Ubuntu Server + Windows Server AD",
          "Container Virtualization Internals: Linux namespaces (`pid`, `net`, `mnt`, `user`), `cgroups`, and `seccomp-bpf`"
        ],
        handsOnLabs: [
          { platform: "pwnable.kr", name: "Toddler's Bottle (System Binary Exploitation & Memory Layout)", url: "https://pwnable.kr" },
          { platform: "TryHackMe", name: "Pre-Security & Linux Strength Training Track", url: "https://tryhackme.com" },
          { platform: "picoCTF", name: "General Skills & Binary Warmup Challenges", url: "https://picoctf.org" },
          { platform: "CTFtime", name: "Global Live CTF Event Calendar & Writeups", url: "https://ctftime.org" }
        ],
        recommendedTools: ["VirtualBox / Proxmox", "Docker", "pfSense CE"]
      },
      {
        id: "node-os-deepdive",
        code: "1.2",
        title: "Linux & Windows Internals & CLI Mastery",
        subtitle: "Bash, systemd, File Permissions, Windows Registry, LSASS & Active Directory",
        estimatedHours: "55 hrs",
        difficulty: "Foundational",
        whyItMatters: "90%+ of cloud infrastructure runs on Linux while 85%+ of Fortune 500 corporate identities run on Windows Active Directory. Mastering both command lines and OS internals is mandatory.",
        topicsToMaster: [
          "Linux File System Hierarchy (`/etc/passwd`, `/etc/shadow`, `/proc`, `/var/log/auth.log`), SUID/SGID bits, and POSIX ACLs",
          "Linux Text Processing & Pipeline Automation: `grep -E`, `awk`, `sed`, `jq`, `find`, `xargs`, `systemctl`, and `journalctl`",
          "Linux Mandatory Access Control (SELinux / AppArmor) and `auditd` syscall logging",
          "Windows Internals: Process tree (`System` -> `smss.exe` -> `csrss.exe` -> `wininit.exe` -> `services.exe` -> `lsass.exe`)",
          "Windows Registry Hives (`HKLM`, `HKCU`, `SAM`, `SYSTEM` Run keys), PowerShell scripting, and Active Directory GPOs"
        ],
        handsOnLabs: [
          { platform: "OverTheWire", name: "Bandit (Levels 0 to 34 Linux CLI Wargame)", url: "https://overthewire.org/wargames/bandit/" },
          { platform: "pwnable.tw", name: "Advanced Linux Binary & Kernel Exploitation Wargame", url: "https://pwnable.tw" },
          { platform: "TryHackMe", name: "Windows Internals, Linux PrivEsc & Active Directory Basics", url: "https://tryhackme.com" },
          { platform: "HackTheBox Academy", name: "Linux Fundamentals & Windows Command Line Modules", url: "https://academy.hackthebox.com" }
        ],
        recommendedTools: ["OSQuery", "Velociraptor", "CISA LME"]
      },
      {
        id: "node-networking",
        code: "1.3",
        title: "TCP/IP Networking, Subnetting & Core Protocols",
        subtitle: "7-Layer OSI, TCP Handshakes, CIDR, VLANs, DNS, HTTP/2, TLS & BGP",
        estimatedHours: "50 hrs",
        difficulty: "Foundational",
        whyItMatters: "Every cyber attack crosses a network boundary or manipulates a protocol state machine. Deep packet literacy separates true security engineers from tool button-pushers.",
        topicsToMaster: [
          "7-Layer OSI Model encapsulation (Bits -> Frames -> Packets -> Segments -> Session/Presentation/Application Data)",
          "TCP 3-Way Handshake (`SYN`, `SYN-ACK`, `ACK`), TCP Flags (`RST`, `FIN`, `PSH`, `URG`), and UDP statelessness",
          "IPv4/IPv6 CIDR Subnetting (`/24`, `/16`, `/32`), RFC 1918 Private Ranges, NAT/PAT, ARP resolution, and 802.1Q VLAN tagging",
          "Critical Ports & Protocols: SSH (22), DNS (53), Kerberos (88), SMB (445), LDAP/S (389/636), RDP (3389), Modbus (502)",
          "Deep Packet Inspection (DPI) with Wireshark display filters and `tcpdump` Berkeley Packet Filters (BPF)"
        ],
        handsOnLabs: [
          { platform: "TryHackMe", name: "Network Fundamentals & Wireshark: The Basics", url: "https://tryhackme.com" },
          { platform: "HackTheBox Academy", name: "Introduction to Networking & Traffic Analysis", url: "https://academy.hackthebox.com" },
          { platform: "Malware-Traffic-Analysis.net", name: "Brad Duncan's Real-World PCAP Forensics Exercises", url: "https://www.malware-traffic-analysis.net" }
        ],
        recommendedTools: ["Wireshark", "Tcpdump", "Zeek", "Nmap"]
      },
      {
        id: "node-scripting",
        code: "1.4",
        title: "Security Scripting & Automation (Python, Bash, Go)",
        subtitle: "Sockets, REST APIs, Log Parsing, Regular Expressions & Concurrency",
        estimatedHours: "45 hrs",
        difficulty: "Foundational",
        whyItMatters: "Manual security does not scale. Writing custom Python or Go tools to parse 10GB JSON logs, query threat intel APIs, or craft custom exploit PoCs is a core force multiplier.",
        topicsToMaster: [
          "Python for Security: `requests`, `socket`, `scapy` packet crafting, `cryptography`, `asyncio`, and `BeautifulSoup`",
          "Parsing & correlating structured logs (JSONL, CSV, Syslog, EVTX XML) using Python and `jq`",
          "Writing defensive Bash & PowerShell incident triage scripts for rapid live-response collection",
          "Interacting with REST & GraphQL APIs (VirusTotal, Shodan, GitHub, AWS boto3) with rate-limiting and token security",
          "Git version control hygiene and preventing secret leaks with pre-commit hooks (`gitleaks`)"
        ],
        handsOnLabs: [
          { platform: "picoCTF", name: "Python Scripting & Cryptography Automation Challenges", url: "https://picoctf.org" },
          { platform: "TryHackMe", name: "Python for Pentesters & SOC Automation", url: "https://tryhackme.com" },
          { platform: "Cryptopals", name: "Set 1: Basics of Hex, Base64 & XOR in Python", url: "https://cryptopals.com" }
        ],
        recommendedTools: ["CyberChef", "Gitleaks", "Impacket"]
      }
    ]
  },
  {
    id: "stage-2",
    stageNumber: "STAGE 02",
    title: "Core Security & Cryptography Engineering",
    timeline: "Months 4–6 // Architectural & Analytical Mastery",
    accent: "emerald",
    description: "Transition from general IT engineering into adversarial thinking, cryptographic architectures, enterprise defense frameworks (NIST CSF 2.0 & MITRE ATT&CK), and hands-on vulnerability mechanics.",
    nodes: [
      {
        id: "node-sec-principles",
        code: "2.1",
        title: "Zero Trust Architecture, IAM & Access Models",
        subtitle: "NIST 800-207, CIA/AIC Triad, Kerberos, OAuth 2.0/OIDC & FIDO2 Passkeys",
        estimatedHours: "40 hrs",
        difficulty: "Intermediate",
        whyItMatters: "Identity is the modern perimeter. Over 80% of breaches involve compromised credentials, OAuth tokens, or Active Directory privilege escalation rather than binary zero-days.",
        topicsToMaster: [
          "CIA Triad vs OT AIC Priority Inversion, Defense-in-Depth, Least Privilege, and Separation of Duties",
          "Zero Trust Architecture (NIST SP 800-207): Policy Engine (PE), Policy Administrator (PA), and Policy Enforcement Point (PEP)",
          "Access Control Models: Discretionary (DAC), Mandatory (MAC), Role-Based (RBAC), and Attribute-Based (ABAC)",
          "Active Directory & Kerberos 5 Ticket Lifecycle (`AS-REQ`, `AS-REP`, TGT, `TGS-REQ`, `TGS-REP`, SPNs, Kerberoasting)",
          "Modern Federation: SAML 2.0, OAuth 2.0 (Authorization Code + PKCE vs Device Code risks), OIDC JWTs, and FIDO2/WebAuthn"
        ],
        handsOnLabs: [
          { platform: "TryHackMe", name: "Attacking & Defending Active Directory / Kerberos", url: "https://tryhackme.com" },
          { platform: "PortSwigger Web Academy", name: "OAuth 2.0 Authentication & JWT Vulnerabilities", url: "https://portswigger.net/web-security" },
          { platform: "HackTheBox", name: "Active Directory 101 Track (Forest, Sauna, Monteverde)", url: "https://hackthebox.com" }
        ],
        recommendedTools: ["BloodHound CE", "NetExec (nxc)", "Impacket"]
      },
      {
        id: "node-cryptography",
        code: "2.2",
        title: "Applied Cryptography, PKI & Data Resilience",
        subtitle: "AES-GCM, RSA/ECC, Post-Quantum ML-KEM, Argon2id, TLS 1.3 & WORM Backups",
        estimatedHours: "45 hrs",
        difficulty: "Intermediate",
        whyItMatters: "Misconfigured cryptography—such as ECB mode, static IVs, unauthenticated CBC (Padding Oracle), or weak password hashing—destroys confidentiality and integrity guarantees.",
        topicsToMaster: [
          "Symmetric Encryption: AES-256-GCM (Authenticated Encryption with Associated Data - AEAD) and ChaCha20-Poly1305",
          "Asymmetric Cryptography: RSA-OAEP, Elliptic Curve (ECDHE / Ed25519), and NIST Post-Quantum (FIPS 203 ML-KEM / Kyber)",
          "Cryptographic Hashing & Password Storage: SHA-256/SHA-3, HMAC, Salting, and Memory-Hard KDFs (`Argon2id`, `bcrypt`, `PBKDF2`)",
          "Public Key Infrastructure (PKI): Root/Intermediate CAs, X.509 Certificates, CRL/OCSP, mTLS, and TLS 1.3 ECDHE Perfect Forward Secrecy",
          "Anti-Ransomware Data Resilience: The 3-2-1-1-0 WORM (Write-Once-Read-Many) Immutable & Air-Gapped Backup Rule"
        ],
        handsOnLabs: [
          { platform: "Cryptopals", name: "Cryptopals Crypto Challenges Sets 1–3", url: "https://cryptopals.com" },
          { platform: "CryptoHack", name: "Interactive Modern Cryptography & TLS Puzzles", url: "https://cryptohack.org" },
          { platform: "picoCTF", name: "RSA, AES-CBC & Hashing Exploitation Track", url: "https://picoctf.org" }
        ],
        recommendedTools: ["Hashcat", "John the Ripper", "CyberChef"]
      },
      {
        id: "node-frameworks-attck",
        code: "2.3",
        title: "MITRE ATT&CK, NIST CSF 2.0 & Threat Modeling",
        subtitle: "TTPs, Pyramid of Pain, Cyber Kill Chain, Diamond Model & STRIDE",
        estimatedHours: "35 hrs",
        difficulty: "Intermediate",
        whyItMatters: "Frameworks translate raw packet bytes and hex dumps into structured adversary campaigns and actionable engineering priorities.",
        topicsToMaster: [
          "NIST Cybersecurity Framework (CSF) 2.0 Six Core Functions: Govern, Identify, Protect, Detect, Respond, Recover",
          "MITRE ATT&CK Matrix (Enterprise, ICS, Cloud) & MITRE ATLAS (Adversarial Threat Landscape for AI Systems)",
          "David Bianco's Pyramid of Pain: Why hunting Behavioral TTPs beats chasing ephemeral Hash/IP Indicators",
          "Lockheed Martin Cyber Kill Chain vs The Diamond Model of Intrusion Analysis (Adversary, Infrastructure, Capability, Victim)",
          "Architectural Threat Modeling: STRIDE (Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation of Privilege) & DFD diagrams"
        ],
        handsOnLabs: [
          { platform: "MITRE Defender", name: "MITRE ATT&CK Navigator & Threat Mapping Lab", url: "https://attack.mitre.org" },
          { platform: "TryHackMe", name: "Threat Intelligence Tools, MITRE & Pyramid of Pain", url: "https://tryhackme.com" },
          { platform: "CyberDefenders", name: "BlueYard Threat Intel & ATT&CK Mapping Challenges", url: "https://cyberdefenders.org" }
        ],
        recommendedTools: ["OpenCTI", "MISP Threat Sharing", "TheHive & Cortex"]
      },
      {
        id: "node-web-owasp",
        code: "2.4",
        title: "Web AppSec, OWASP Top 10 & Exploitation Mechanics",
        subtitle: "SQLi, XSS, SSRF, IDOR/BOLA, Deserialization & Command Injection",
        estimatedHours: "60 hrs",
        difficulty: "Intermediate",
        whyItMatters: "Web applications and APIs are the primary public-facing attack surface of every modern enterprise. Understanding both how exploits work and how parameterized code stops them is foundational.",
        topicsToMaster: [
          "Complete OWASP Top 10 (A01 Broken Access Control through A10 Server-Side Request Forgery) & OWASP API Security Top 10",
          "Injection Mechanics & Remediation: SQL Injection (Union/Blind -> Parameterized Prepared Statements) & OS Command Injection",
          "Cross-Site Scripting (Reflected, Stored, DOM XSS), CSRF (SameSite Cookies), and Content Security Policy (CSP)",
          "Server-Side Request Forgery (SSRF) to Cloud Metadata (AWS `169.254.169.254`) and defense via IMDSv2 session tokens",
          "Insecure Deserialization, Path Traversal / Zip-Slip (`../`), and HTTP Request Smuggling / Brotli stream parsing flaws"
        ],
        handsOnLabs: [
          { platform: "PortSwigger Web Academy", name: "SQLi, SSRF, XSS, XXE & Access Control Interactive Labs (Free)", url: "https://portswigger.net/web-security" },
          { platform: "OWASP Juice Shop", name: "Local Docker Deployment & Scoreboard Challenge", url: "https://owasp.org/www-project-juice-shop/" },
          { platform: "HackTheBox", name: "Starting Point & Web App Pentesting Track", url: "https://hackthebox.com" }
        ],
        recommendedTools: ["OWASP ZAP (Zed Attack Proxy)", "SQLmap", "Ffuf (Fuzz Faster U Fool)", "Semgrep OSS"]
      }
    ]
  },
  {
    id: "stage-3",
    stageNumber: "STAGE 03",
    title: "Specialized Principal Career Tracks",
    timeline: "Years 1–5+ // Domain Specialization & Principal Architecture",
    accent: "crimson",
    description: "Choose your primary specialization while retaining cross-domain fluency across Defensive SOC/DFIR, Offensive Red Teaming, Cloud/DevSecOps/AI Engineering, or Executive GRC Leadership.",
    nodes: [
      {
        id: "node-track-blueteam",
        code: "3.1",
        title: "🛡️ Blue Team: SOC, Detection Engineering & DFIR",
        subtitle: "SIEM/XDR, Sigma/YARA/Suricata Rules, Memory Forensics & Malware Reversing",
        estimatedHours: "120+ hrs",
        difficulty: "Advanced Specialization",
        whyItMatters: "Defensive engineers stand on the front lines of active intrusions—hunting stealthy Living-off-the-Land (LOLBins) actors, writing high-signal detection rules, and containing ransomware before encryption.",
        topicsToMaster: [
          "SIEM & XDR Engineering: Deploying Wazuh / Security Onion 3, writing KQL/SPL queries, and reducing alert fatigue",
          "Detection-as-Code: Authoring production Sigma rules (process creation), Suricata IDS signatures, and YARA-X malware rules",
          "Windows Endpoint Forensics: Sysmon Event IDs (1, 3, 8, 10, 11, 22), Security Event IDs (4624, 4625, 4688, 4697, 4720), and Hayabusa timelines",
          "Memory & Disk Forensics: Volatility 3 RAM analysis (`malfind`, `pslist`, `netscan`), NTFS `$MFT`/`$UsnJrnl` carving with Autopsy",
          "Reverse Engineering & Malware Triage: Static/Dynamic analysis using Ghidra, CAPA, and CAPEv2 sandboxes"
        ],
        handsOnLabs: [
          { platform: "CyberDefenders", name: "SOC Analyst & DFIR Blue Team CTF Challenges", url: "https://cyberdefenders.org" },
          { platform: "TryHackMe", name: "SOC Level 1 & SOC Level 2 Career Paths", url: "https://tryhackme.com" },
          { platform: "HackTheBox Sherlocks", name: "Real-World DFIR Incident Investigation Scenarios", url: "https://hackthebox.com" }
        ],
        recommendedTools: ["Wazuh SIEM & XDR", "Security Onion 3", "Velociraptor (Rapid7 OSS)", "Volatility 3", "Ghidra (NSA SRE)", "Hayabusa (Yamato Security)"]
      },
      {
        id: "node-track-redteam",
        code: "3.2",
        title: "⚔️ Red Team: Offensive Security, AD & Exploit Dev",
        subtitle: "Enterprise AD Exploitation, C2 Infrastructure, EDR Evasion & 0-Day Fuzzing",
        estimatedHours: "120+ hrs",
        difficulty: "Advanced Specialization",
        whyItMatters: "Authorized offensive operators emulate real-world APT adversaries to uncover chained architectural blind spots and validate whether blue team detections fire under realistic stealth conditions.",
        topicsToMaster: [
          "External Recon & Initial Access: OSINT (Amass, SpiderFoot), web/API exploitation, and Adversary-in-the-Middle (AitM) phishing",
          "Active Directory Domination: Kerberoasting, AS-REP Roasting, Unconstrained/Constrained/RBCD Delegation, AD CS (ESC1–ESC13), and DCSync",
          "Command & Control (C2) Engineering: Sliver / Havoc deployment, redirectors, domain fronting, and malleable HTTP profiles",
          "EDR Telemetry Evasion: Direct/Indirect System Calls, Process Hollowing, API Unhooking, Sleep Obfuscation, and BOFs (Beacon Object Files)",
          "Vulnerability Research & Fuzzing: Coverage-guided fuzzing (AFL++, LibFuzzer), heap exploitation, and binary diffing"
        ],
        handsOnLabs: [
          { platform: "HackTheBox Pro Labs", name: "Zephyr, RastaLabs & Offshore Enterprise AD Labs", url: "https://hackthebox.com" },
          { platform: "GOAD (Game of Active Directory)", name: "Self-Hosted Multi-Forest Vulnerable AD Lab", url: "https://github.com/Orange-Cyberdefense/GOAD" },
          { platform: "PortSwigger & Pwn.college", name: "Advanced Web Exploitation & Binary Exploitation Dojos", url: "https://pwn.college" }
        ],
        recommendedTools: ["BloodHound CE", "Impacket", "NetExec (nxc / CrackMapExec)", "Sliver C2 (Bishop Fox)", "Metasploit Framework", "Nuclei (ProjectDiscovery)"]
      },
      {
        id: "node-track-cloud-ai-ot",
        code: "3.3",
        title: "☁️ Cloud, DevSecOps, AI/LLM & OT Architecture",
        subtitle: "AWS/K8s Hardening, CI/CD Supply Chain, OWASP LLM Top 10 & ICS Purdue Model",
        estimatedHours: "120+ hrs",
        difficulty: "Advanced Specialization",
        whyItMatters: "Modern principal security architects secure ephemeral cloud-native Kubernetes clusters, automated CI/CD pipelines, autonomous AI agents, and cyber-physical industrial grids.",
        topicsToMaster: [
          "Cloud Security (AWS/Azure/GCP): IAM Least Privilege, IMDSv2 enforcement, VPC PrivateLink, CSPM (Prowler), and CloudTrail hunting",
          "Kubernetes & Container Security: Distroless/non-root Dockerfiles, Pod Security Standards, NetworkPolicies, and eBPF Falco runtime defense",
          "DevSecOps & Supply Chain (SLSA): Automated SAST (Semgrep), SCA/SBOM (Trivy), IaC scanning (Checkov), and Cosign artifact signing",
          "AI & LLM Security: Defending RAG & Autonomous Agents against Indirect Prompt Injection, Context Compaction Poisoning, and Pickle RCE (Safetensors)",
          "OT / ICS Critical Infrastructure: Purdue Model (Levels 0–5 + IDMZ), Data Diodes, and passive Modbus/DNP3/S7comm inspection (CISA Malcolm)"
        ],
        handsOnLabs: [
          { platform: "flAWS.cloud & flAWS2.cloud", name: "Hands-On AWS Cloud Security Exploitation & Defense Labs", url: "http://flaws.cloud" },
          { platform: "Kubernetes Goat", name: "Interactive Vulnerable Kubernetes Cluster Security Playground", url: "https://madhuakula.com/kubernetes-goat/" },
          { platform: "Gandalf by Lakera", name: "Interactive AI Prompt Injection & Guardrail Lab", url: "https://gandalf.lakera.ai" }
        ],
        recommendedTools: ["Prowler Cloud Security", "Falco (CNCF Graduated)", "Checkov (Bridgecrew/Palo Alto)", "Trivy (Aqua Security)", "Garak (NVIDIA LLM Vulnerability Scanner)", "CISA Malcolm"]
      },
      {
        id: "node-track-grc-ciso",
        code: "3.4",
        title: "⚖️ GRC, Risk Quantification & Executive CISO Leadership",
        subtitle: "NIST CSF 2.0, ISO 27001, SOC 2 Type II, FAIR Risk Modeling & Crisis Governance",
        estimatedHours: "90+ hrs",
        difficulty: "Executive & Governance Track",
        whyItMatters: "Technical controls fail without organizational governance, board budget alignment, regulatory compliance, and third-party supply-chain accountability.",
        topicsToMaster: [
          "Operationalizing NIST CSF 2.0: Mapping the Govern (GV) function across enterprise risk registers and board reporting",
          "Audit & Regulatory Frameworks: ISO/IEC 27001:2022, SOC 2 Type II Trust Services Criteria, PCI-DSS v4.0, HIPAA, GDPR, and SEC Cyber Rules",
          "Quantitative Risk Analysis (FAIR Model): Calculating Annualized Loss Expectancy (ALE) in financial terms for board investment",
          "Third-Party Risk Management (TPRM): Auditing SaaS vendors, requiring signed CycloneDX SBOMs, and M&A security due diligence",
          "Executive Crisis Management: Running ransomware tabletop exercises, cyber insurance negotiation, and legal breach notification"
        ],
        handsOnLabs: [
          { platform: "NIST CSRC", name: "NIST CSF 2.0 Organizational Profile & Implementation Tiers Workshop", url: "https://www.nist.gov/cyberframework" },
          { platform: "CISA Tabletop Exercise Packages (CTEP)", name: "Executive Ransomware & ICS Crisis Simulation Scenarios", url: "https://www.cisa.gov/cisa-tabletop-exercise-packages" },
          { platform: "FAIR Institute", name: "Quantitative Cyber Risk Scenarios", url: "https://www.fairinstitute.org" }
        ],
        recommendedTools: ["Prowler Cloud Security", "OpenCTI", "OWASP Dependency-Check"]
      }
    ]
  }
];

export const CAREER_ROLE_TRACKS = [
  {
    id: "blue-team",
    label: "🛡️ Blue Team (Defensive & SOC)",
    roles: [
      {
        title: "SOC Analyst (Tier 1 / Tier 2)",
        level: "Entry to Mid (0–3 yrs)",
        compRange: "$75k – $115k",
        responsibilities: "Triage SIEM/XDR alerts in real time, analyze phishing payloads and email headers, inspect network PCAPs, and execute initial host containment.",
        skills: ["SIEM (Wazuh/Splunk/Sentinel)", "Wireshark & TCP/IP", "EDR Triage", "Windows & Linux Event Logs", "Phishing Header Forensics"],
        certs: ["CompTIA Security+ (SY0-701)", "BTL1 (Blue Team Level 1)", "CompTIA CySA+", "GIAC GSEC"]
      },
      {
        title: "Incident Responder / DFIR Specialist",
        level: "Mid to Senior (3–6 yrs)",
        compRange: "$120k – $175k",
        responsibilities: "Lead active breach containment, acquire and analyze volatile RAM and NTFS disk images, reverse-engineer malware persistence, and coordinate root-cause eradication.",
        skills: ["Volatility 3 (RAM Forensics)", "Velociraptor (VQL)", "Autopsy / $MFT Timeline", "Hayabusa / Chainsaw", "YARA-X & Ransomware Recovery"],
        certs: ["GIAC GCIH", "GIAC GCFA", "BTL2", "CompTIA CySA+"]
      },
      {
        title: "Cyber Threat Intelligence (CTI) Analyst",
        level: "Mid (2–5 yrs)",
        compRange: "$110k – $160k",
        responsibilities: "Track nation-state APT clusters and ransomware syndicates, map adversary TTPs to MITRE ATT&CK, manage STIX/TAXII feeds, and deliver executive threat briefings.",
        skills: ["MITRE ATT&CK & Diamond Model", "OpenCTI & MISP", "YARA Rule Authoring", "OSINT (SpiderFoot / Maltego)", "Dark Web & DNS Pivot Analysis"],
        certs: ["GIAC GCTI", "CompTIA CySA+", "CREST CCTIM"]
      },
      {
        title: "Detection Engineer / Threat Hunter",
        level: "Senior (4–8 yrs)",
        compRange: "$145k – $210k",
        responsibilities: "Build Detection-as-Code pipelines, write custom Sigma/Suricata/YARA rules, and proactively hunt for stealthy Living-off-the-Land (LOLBins) intrusions bypassing automated alerts.",
        skills: ["Sigma, Suricata & Zeek Scripting", "KQL / SPL / EQL Query Engineering", "Sysmon & Kernel ETW Telemetry", "CI/CD Detection Testing", "Python Automation"],
        certs: ["GIAC GCIA", "GIAC GCFA", "OffSec OSDA", "CompTIA SecurityX (CAS-005)"]
      }
    ]
  },
  {
    id: "red-team",
    label: "⚔️ Red Team (Offensive & Pentesting)",
    roles: [
      {
        title: "Penetration Tester (Network & Web)",
        level: "Mid (2–5 yrs)",
        compRange: "$115k – $165k",
        responsibilities: "Conduct authorized external/internal network, web application, API, and wireless penetration tests; chain vulnerabilities and author actionable remediation reports.",
        skills: ["Nmap & Network Recon", "OWASP ZAP / Burp Suite", "Active Directory (BloodHound / Impacket / NetExec)", "SQLi / SSRF / IDOR", "Python / Bash Scripting"],
        certs: ["OffSec OSCP", "HTB CPTS", "TCM PNPT", "CompTIA PenTest+"]
      },
      {
        title: "Red Team Operator / Adversary Emulation",
        level: "Senior (4–8+ yrs)",
        compRange: "$150k – $225k",
        responsibilities: "Execute full-scope, multi-month stealth adversary simulations against blue teams; develop custom C2 infrastructure, evade EDR kernel hooks, and lead Purple Team exercises.",
        skills: ["C2 Frameworks (Sliver / Havoc / Cobalt Strike)", "EDR Evasion & Indirect Syscalls", "C / C# / Rust / Go Implant Dev", "Active Directory Kerberos & AD CS Abuse", "AiTM Social Engineering"],
        certs: ["OffSec OSEP", "Zero-Point CRTO", "CREST CRT", "GIAC GPEN"]
      },
      {
        title: "Vulnerability Researcher & Exploit Developer",
        level: "Senior / Principal (5–10+ yrs)",
        compRange: "$180k – $300k+",
        responsibilities: "Discover 0-day memory corruption and logic vulnerabilities in OS kernels, hypervisors, browsers, and embedded firmware; build deterministic PoCs and binary hardening mitigations.",
        skills: ["x86_64 & ARM64 Assembly", "Ghidra / IDA Pro / WinDbg", "Coverage-Guided Fuzzing (AFL++ / LibFuzzer)", "Heap & Kernel Pool Exploitation", "Source Code Auditing (C/C++/Rust)"],
        certs: ["OffSec OSED", "OffSec OSEE", "GIAC GXPN"]
      }
    ]
  },
  {
    id: "engineering",
    label: "🏗️ Cloud, AppSec, AI & OT Engineering",
    roles: [
      {
        title: "Cloud Security Engineer",
        level: "Mid to Senior (3–7 yrs)",
        compRange: "$140k – $205k",
        responsibilities: "Architect secure AWS, Azure, and GCP environments; enforce least-privilege IAM/CIEM, harden Kubernetes clusters, and automate CSPM and Infrastructure-as-Code guardrails.",
        skills: ["AWS / Azure / GCP IAM & Networking", "Terraform / OpenTofu & Checkov", "Kubernetes & Docker Hardening", "Prowler CSPM & Falco eBPF", "IMDSv2 & Workload OIDC"],
        certs: ["AWS Certified Security - Specialty", "Microsoft AZ-500", "ISC2 CCSP", "CNCF CKS (Certified Kubernetes Security)"]
      },
      {
        title: "Application Security (AppSec) / DevSecOps Engineer",
        level: "Mid to Senior (3–7 yrs)",
        compRange: "$145k – $215k",
        responsibilities: "Embed automated SAST, DAST, SCA, and secret scanning into CI/CD pipelines; perform architectural threat modeling, secure code reviews, and SBOM supply-chain governance.",
        skills: ["Semgrep SAST & Trivy SCA/SBOM", "Gitleaks / TruffleHog", "Secure Coding (Python, Go, TypeScript, Java)", "OWASP Top 10 & API Security", "GitHub Actions / GitLab CI Security"],
        certs: ["CompTIA SecurityX (CAS-005)", "OffSec OSWE", "ISC2 CSSLP", "GIAC GWEB"]
      },
      {
        title: "AI & LLM Security Engineer",
        level: "Mid to Senior (3–7 yrs)",
        compRange: "$165k – $260k+",
        responsibilities: "Secure enterprise Large Language Models, RAG vector pipelines, and autonomous AI agents against direct/indirect prompt injection, context poisoning, and model supply-chain compromises.",
        skills: ["OWASP LLM Top 10 & MITRE ATLAS", "Garak, Promptfoo & Microsoft PyRIT", "Permission-Aware RAG & Vector DB ACLs", "Agent Tool-Call Sandboxing", "Safetensors & PyTorch Security"],
        certs: ["CompTIA SecurityX (CAS-005)", "GIAC GMLE", "AWS / Cloud AI Security"]
      },
      {
        title: "OT / ICS Critical Infrastructure Security Engineer",
        level: "Mid to Senior (3–8 yrs)",
        compRange: "$135k – $195k",
        responsibilities: "Defend electrical substations, water treatment plants, and manufacturing lines; architect Purdue Model segmentation, Industrial DMZs, Data Diodes, and passive ICS network monitoring.",
        skills: ["Purdue Model (Levels 0–5 & IDMZ)", "Modbus/TCP, DNP3, S7comm & OPC UA", "CISA Malcolm & Zeek ICSNPP", "ISA/IEC 62443 & NERC CIP", "PLC & HMI Hardening"],
        certs: ["GIAC GICSP", "GIAC GRID", "ISA/IEC 62443 Cybersecurity Expert"]
      },
      {
        title: "Principal Security Architect",
        level: "Principal (7–12+ yrs)",
        compRange: "$195k – $310k+",
        responsibilities: "Design enterprise-wide Zero Trust blueprints (NIST 800-207), cryptographic PKI hierarchies, post-quantum migration roadmaps, and resilient multi-cloud defense-in-depth architectures.",
        skills: ["Zero Trust Architecture (NIST 800-207)", "Enterprise PKI, HSMs & Post-Quantum Crypto", "Cross-Domain Threat Modeling", "M&A Security Integration", "NIST CSF 2.0 Technical Governance"],
        certs: ["CompTIA SecurityX (CAS-005)", "CISSP-ISSAP", "SABSA Chartered Security Architect"]
      }
    ]
  },
  {
    id: "grc-leadership",
    label: "⚖️ GRC, Privacy & Executive Leadership",
    roles: [
      {
        title: "GRC & Third-Party Risk (TPRM) Analyst",
        level: "Entry to Mid (1–4 yrs)",
        compRange: "$85k – $130k",
        responsibilities: "Lead internal compliance audits, execute third-party SaaS/vendor risk assessments, maintain enterprise risk registers, and map controls to NIST CSF 2.0, SOC 2, and ISO 27001.",
        skills: ["NIST CSF 2.0 & NIST SP 800-53", "ISO/IEC 27001 & SOC 2 Type II", "PCI-DSS v4.0, HIPAA & GDPR", "Vendor SBOM & Security Questionnaires", "Risk Register Management"],
        certs: ["ISACA CISA", "CompTIA Security+ (SY0-701)", "ISACA CRISC", "ISO 27001 Lead Auditor"]
      },
      {
        title: "Information Security Manager / Director",
        level: "Senior (5–9 yrs)",
        compRange: "$155k – $220k",
        responsibilities: "Manage SOC and security engineering teams, oversee security budgets, lead incident response tabletop exercises, and translate technical risk into operational roadmaps.",
        skills: ["Security Program Governance", "Incident Response Management", "Budget & Vendor Consolidation", "Disaster Recovery / BCP Planning", "Metrics & KPI Reporting"],
        certs: ["ISACA CISM", "ISC2 CISSP", "EC-Council CCISO"]
      },
      {
        title: "Chief Information Security Officer (CISO)",
        level: "Executive (10–15+ yrs)",
        compRange: "$240k – $450k+",
        responsibilities: "Align global cybersecurity strategy with Board of Directors business objectives, manage SEC/regulatory liability, lead crisis response, and drive organizational security culture.",
        skills: ["Board & Executive Communication", "FAIR Quantitative Risk Modeling", "SEC / Regulatory Compliance & Legal", "M&A Cyber Due Diligence", "Enterprise Crisis Leadership"],
        certs: ["ISC2 CISSP", "ISACA CISM", "ISACA CRISC", "CompTIA SecurityX (CAS-005)"]
      }
    ]
  }
];

export const VENDOR_CERT_MATRIX = [
  {
    tier: "Tier 1: Foundational (0–2 Years)",
    badgeColor: "cyan",
    comptia: ["CompTIA A+", "CompTIA Network+", "CompTIA Security+ (SY0-701)"],
    isc2_isaca: ["ISC2 CC (Certified in Cybersecurity)", "ISACA ITCA"],
    offsec_practical: ["eJPT (INE)", "TryHackMe SAL1", "Security Blue Team BTL1"],
    giac: ["GIAC GFACT", "GIAC GSEC"]
  },
  {
    tier: "Tier 2: Intermediate / Specialist (2–5 Years)",
    badgeColor: "emerald",
    comptia: ["CompTIA CySA+ (CS0-003)", "CompTIA PenTest+", "CompTIA Cloud+"],
    isc2_isaca: ["ISC2 SSCP", "ISACA CISA (Auditor)", "ISACA CRISC"],
    offsec_practical: ["OffSec OSCP", "HTB CPTS", "TCM PNPT", "Zero-Point CRTO", "OffSec OSDA"],
    giac: ["GIAC GCIH (Incident Handler)", "GIAC GCIA (Intrusion Analyst)", "GIAC GPEN", "GIAC GICSP (ICS/OT)"]
  },
  {
    tier: "Tier 3: Advanced / Principal / Executive (5–10+ Years)",
    badgeColor: "crimson",
    comptia: ["CompTIA SecurityX (CAS-005) [Formerly CASP+]"],
    isc2_isaca: ["ISC2 CISSP", "ISACA CISM", "ISC2 CCSP (Cloud)", "CISSP-ISSAP"],
    offsec_practical: ["OffSec OSEP (Evasion)", "OffSec OSWE (Web)", "OffSec OSED (Exploit Dev)", "OffSec OSEE"],
    giac: ["GIAC GCFA (Forensics)", "GIAC GXPN (Exploit Researcher)", "GIAC GCTI", "GIAC GSTRT"]
  }
];

export const SECURITYX_CAS005_DATA = {
  title: "CompTIA SecurityX (CAS-005) — Principal Architect Standard",
  subtitle: "CompTIA retired the CASP+ (CAS-004) brand to launch SecurityX (CAS-005), the premier hands-on technical certification for Senior Security Architects and Principal Engineers (whereas CISSP focuses on management decisions, SecurityX tests hands-on architecture implementation).",
  specs: [
    { label: "Official Exam Code", value: "CAS-005" },
    { label: "Question Format", value: "Max 90 Questions (Performance-Based PBQs + Linux/Cloud Simulations + MCQs)" },
    { label: "Exam Duration", value: "165 Minutes (2 Hours 45 Minutes)" },
    { label: "Scoring Model", value: "Pass / Fail Only (No Scaled Numerical Score Reported)" },
    { label: "Target Experience", value: "10+ Years IT Administration including 5+ Years Hands-On Technical Security" },
    { label: "ISO / DoD Alignment", value: "DoD 8140 / 8570 IAT Level III & IAM Level III Approved" }
  ],
  domains: [
    {
      name: "1.0 Governance, Risk, and Compliance (GRC)",
      weight: 20,
      color: "#f59e0b",
      focus: "NIST CSF 2.0 Govern function, quantitative risk modeling (FAIR), supply-chain SBOM verification, regulatory frameworks, and cryptographic policy governance."
    },
    {
      name: "2.0 Security Architecture",
      weight: 27,
      color: "#00f0ff",
      focus: "Zero Trust network design (NIST 800-207), multi-cloud & hybrid workload isolation, de-perimeterization, software supply chain security, and ICS/SCADA Purdue segmentation."
    },
    {
      name: "3.0 Security Engineering",
      weight: 31,
      color: "#00ff66",
      focus: "Post-Quantum Cryptography (ML-KEM / ML-DSA), PKI/HSM lifecycle, endpoint kernel hardening, secure CI/CD pipelines, container/Kubernetes hardening, and AI/LLM security controls."
    },
    {
      name: "4.0 Security Operations",
      weight: 22,
      color: "#ff3366",
      focus: "SOAR automation, advanced threat hunting, Suricata/Sigma/YARA rule engineering, volatile memory forensics, and enterprise breach containment."
    }
  ]
};

export const LIVE_CTF_PRACTICE_ARENAS = [
  {
    name: "CTFtime.org",
    category: "Global CTF Calendar & Writeup Archive",
    level: "All Tiers",
    url: "https://ctftime.org",
    desc: "The official global directory of upcoming Jeopardy & Attack-Defense CTF competitions, team rankings, and thousands of technical exploit writeups."
  },
  {
    name: "pwnable.kr",
    category: "Binary Exploitation & Linux Internals",
    level: "Beginner → Advanced",
    url: "https://pwnable.kr",
    desc: "Premier SSH-based system exploitation wargame (Toddler's Bottle to Rookiss) covering file descriptors, BOF, UAF, format strings, and syscall internals."
  },
  {
    name: "pwnable.tw",
    category: "Advanced Heap & Kernel Exploitation",
    level: "Advanced / Expert",
    url: "https://pwnable.tw",
    desc: "High-difficulty binary exploitation challenges testing glibc heap internals (tcache/fastbins), ROP chains, seccomp bypasses, and ELF reverse engineering."
  },
  {
    name: "OverTheWire (Bandit / Natas)",
    category: "Linux CLI, PrivEsc & Web Security",
    level: "Foundational",
    url: "https://overthewire.org/wargames/",
    desc: "Hands-on SSH wargames teaching Linux permissions, SUID binaries, cron jobs, Git history forensics, and web server logic flaws from first principles."
  },
  {
    name: "HackTheBox (Labs & Pro Labs)",
    category: "Active Directory, Red Team & SOC",
    level: "Intermediate → Expert",
    url: "https://www.hackthebox.com",
    desc: "Full-scale vulnerable Linux/Windows machines, Enterprise Active Directory Pro Labs (Zephyr, RastaLabs), and Sherlock DFIR blue-team investigations."
  },
  {
    name: "TryHackMe",
    category: "Guided Red/Blue/SOC Career Paths",
    level: "Foundational → Intermediate",
    url: "https://tryhackme.com",
    desc: "Browser-based interactive labs for SOC Level 1/2, Junior Penetration Tester, Linux/Windows Privilege Escalation, and CompTIA Security+ prep."
  },
  {
    name: "picoCTF (CMU)",
    category: "Reverse Engineering, Crypto & Forensics",
    level: "Foundational → Intermediate",
    url: "https://picoctf.org",
    desc: "Carnegie Mellon University's year-round picoGym featuring 400+ challenges across Binary Exploitation, Cryptography, Web, and Memory Forensics."
  },
  {
    name: "CyberDefenders & LetsDefend",
    category: "Blue Team DFIR, SIEM & PCAP Triage",
    level: "Intermediate",
    url: "https://cyberdefenders.org",
    desc: "Defensive SOC challenges using real Wireshark PCAPs, Volatility memory dumps, Splunk/ELK SIEM logs, and Velociraptor endpoint artifacts."
  }
];

export const OS_PRIVESC_AD_CHEATSHEET = [
  {
    id: "linux-privesc",
    label: "🐧 Linux Internals & PrivEsc",
    subtitle: "SUID, Capabilities, Sudoers/LD_PRELOAD, Cron Wildcards, Namespaces & Kernel Hardening",
    items: [
      {
        vector: "SUID / SGID Binaries & GTFOBins",
        mechanism: "Binaries with the SUID bit (`-rwsr-xr-x`, octal `4000`) execute with the effective UID (`euid=0`) of the file owner (root). If `find`, `vim`, `python3`, `bash`, or a custom binary calling `system()` without an absolute path has SUID set, an unprivileged user spawns an instant root shell.",
        enumCli: "find / -perm -4000 -type f -ls 2>/dev/null",
        defense: "Mount user-writable partitions (`/tmp`, `/home`, `/dev/shm`) with `nosuid,nodev,noexec` in `/etc/fstab` and audit SUID binaries via `auditd`."
      },
      {
        vector: "Linux POSIX Capabilities (`cap_setuid`, `cap_dac_read_search`)",
        mechanism: "Capabilities break root privileges into granular kernel bits. Even without an SUID bit, a binary granted `cap_setuid+ep` (e.g., `/usr/bin/python3`) or `cap_dac_read_search+ep` (e.g., `/usr/bin/tar`) can call `os.setuid(0)` or read `/etc/shadow` directly.",
        enumCli: "getcap -r / 2>/dev/null",
        defense: "Strip unnecessary file capabilities with `setcap -r <binary>` and restrict container capabilities using Docker `--cap-drop=ALL`."
      },
      {
        vector: "Sudoers Misconfigurations & `LD_PRELOAD` Hijacking",
        mechanism: "If `/etc/sudoers` grants `NOPASSWD` on interpreters/utilities or preserves `env_keep+=LD_PRELOAD`, an attacker compiles a shared object (`.so`) overriding `_init()` to call `setuid(0); system(\"/bin/bash\");` before the target binary even runs.",
        enumCli: "sudo -l && cat /etc/ld.so.preload 2>/dev/null",
        defense: "Never allow `env_keep+=LD_PRELOAD` in `/etc/sudoers`, enforce full argument matching, and require `Defaults use_pty`."
      },
      {
        vector: "Cron Job PATH Hijacking & `tar` Wildcard Injection",
        mechanism: "Root cron jobs executing `tar czf /backups/html.tgz *` inside a world-writable folder expand filenames starting with `--checkpoint=1` and `--checkpoint-action=exec=sh shell.sh` as CLI flags instead of file names.",
        enumCli: "cat /etc/crontab; ls -la /etc/cron* /var/spool/cron/crontabs 2>/dev/null",
        defense: "Always prefix wildcards with `./*` (`tar czf backup.tgz ./*`) and ensure root cron scripts are owned `root:root` (`chmod 700`)."
      },
      {
        vector: "Docker Socket (`/var/run/docker.sock`) & Namespace Escape",
        mechanism: "Membership in the `docker` group or write access to `/var/run/docker.sock` is equivalent to root on the host: mounting the host root filesystem (`-v /:/mnt --privileged`) allows editing `/mnt/etc/shadow` directly.",
        enumCli: "id; ls -la /var/run/docker.sock; grep -E 'CapEff|NoNewPrivs' /proc/self/status",
        defense: "Use Rootless Docker/Podman, never mount `/var/run/docker.sock` into untrusted containers, and enforce `no-new-privileges:true`."
      }
    ]
  },
  {
    id: "windows-privesc",
    label: "🪟 Windows Internals & PrivEsc",
    subtitle: "Access Tokens (`SeImpersonate`), LSASS, Unquoted Service Paths, Service ACLs & Registry",
    items: [
      {
        vector: "Token Privileges (`SeImpersonatePrivilege` / `SeAssignPrimaryToken`)",
        mechanism: "Service accounts (`IIS apppool`, `MSSQL`, `Network Service`) hold `SeImpersonatePrivilege` by default. Attackers use Potato primitives (PrintSpoofer, GodPotato, JuicyPotatoNG) to coerce `NT AUTHORITY\\SYSTEM` to authenticate to a rogue named pipe and impersonate its primary token.",
        enumCli: "whoami /priv && whoami /groups",
        defense: "Isolate service accounts into Group Managed Service Accounts (gMSAs) with minimal privileges and monitor named-pipe creation (Sysmon Event ID 17/18)."
      },
      {
        vector: "LSASS Memory Credential Dumping (`SeDebugPrivilege`)",
        mechanism: "Local Administrators hold `SeDebugPrivilege`, allowing processes like Mimikatz (`sekurlsa::logonpasswords`), `procdump.exe -ma lsass.exe`, or `comsvcs.dll MiniDump` to read NTLM hashes and Kerberos tickets from `lsass.exe` virtual memory.",
        enumCli: "tasklist /svc | findstr lsass && reg query HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa /v RunAsPPL",
        defense: "Enable LSA Protection (`RunAsPPL=1`), Windows Defender Credential Guard (VBS), and alert on Sysmon Event ID 10 (`TargetImage: lsass.exe`, `GrantedAccess: 0x1010` / `0x1FFFFF`)."
      },
      {
        vector: "Unquoted Service Paths & Weak Service Binary ACLs",
        mechanism: "If a SYSTEM service has an unquoted path containing spaces (`C:\\Program Files\\Custom App\\Service.exe`) without quotes, the Windows Service Control Manager (SCM) sequentially attempts to execute `C:\\Program.exe` and `C:\\Program Files\\Custom.exe` as `SYSTEM`.",
        enumCli: "wmic service get name,displayname,pathname,startmode | findstr /i \"auto\" | findstr /i /v \"c:\\windows\\\\\" | findstr /i /v \"\"\"\"",
        defense: "Wrap all service `ImagePath` registry values in quotes and verify `BUILTIN\\Users` lacks `(F)` or `(M)` permissions via `icacls`."
      },
      {
        vector: "SAM / SYSTEM Registry Hives & Volume Shadow Copies",
        mechanism: "Backup operators (`SeBackupPrivilege`) or attackers finding leftover `C:\\Windows\\Repair\\SAM` or VSS snapshots can extract the `SAM` and `SYSTEM` hives offline to dump local NTLM password hashes with Impacket `secretsdump.py`.",
        enumCli: "reg save HKLM\\SAM sam.bak && reg save HKLM\\SYSTEM sys.bak",
        defense: "Restrict `SeBackupPrivilege`, audit Registry hive exports (Event ID 4688 `reg.exe save`), and enforce LAPS (Windows Local Administrator Password Solution)."
      }
    ]
  },
  {
    id: "ad-escalation",
    label: "🏰 Active Directory & Kerberos",
    subtitle: "Kerberoasting, AS-REP Roasting, BloodHound ACLs, AD CS (`ESC1-8`), RBCD & DCSync",
    items: [
      {
        vector: "Kerberoasting (Service Principal Name TGS Cracking)",
        mechanism: "Any authenticated domain user can request a Kerberos TGS service ticket (`TGS-REQ`) for any account with a registered `servicePrincipalName` (SPN). Because the ticket is encrypted with the service account's NTLM/AES hash, attackers crack it offline at 10+ GH/s with Hashcat (`-m 13100`).",
        enumCli: "impacket-GetUserSPNs corp.local/jdoe -request -dc-ip 10.10.10.5 -outputfile tgs_hashes.txt",
        defense: "Migrate service accounts to gMSAs (120-character auto-rotating random passwords), disable RC4_HMAC (`0x17`) in favor of AES-256 (`0x12`), and monitor Event ID 4769 (`TicketEncryptionType: 0x17`)."
      },
      {
        vector: "AS-REP Roasting (`DONT_REQ_PREAUTH`)",
        mechanism: "If an AD user account has 'Do not require Kerberos preauthentication' (`UF_DONT_REQUIRE_PREAUTH`) enabled, anyone can send an `AS-REQ` without a password and receive an `AS-REP` chunk encrypted with the user's password hash (`Hashcat -m 18200`).",
        enumCli: "impacket-GetNPUsers corp.local/ -usersfile users.txt -format hashcat -dc-ip 10.10.10.5",
        defense: "Enforce Kerberos Pre-Authentication on 100% of domain accounts and alert on Event ID 4768 with pre-auth type `0`."
      },
      {
        vector: "BloodHound DACL Abuse (`GenericAll`, `WriteDacl`, Shadow Credentials)",
        mechanism: "Over-permissive Active Directory Object ACLs allow lower-tier accounts to take over Domain Admins: `GenericWrite` enables adding a rogue `msDS-KeyCredentialLink` (Whisker / PKINIT Shadow Credentials), while `WriteDacl` lets an attacker grant themselves DCSync rights.",
        enumCli: "bloodhound-python -u jdoe -p 'Pass123!' -d corp.local -ns 10.10.10.5 -c All",
        defense: "Audit Tier-0 object ACLs continuously with BloodHound CE, enable `AdminSDHolder` protection, and place privileged accounts in the `Protected Users` security group."
      },
      {
        vector: "DCSync (`DS-Replication-Get-Changes-All`) & Golden Ticket",
        mechanism: "Attackers compromising an account with Domain Controller replication permissions simulate a DC over MS-DRSR (`drsuapi`) to pull the `krbtgt` NTLM/AES keys, enabling forged Golden Tickets valid for 10 years.",
        enumCli: "impacket-secretsdump corp.local/admin@10.10.10.5 -just-dc-user krbtgt",
        defense: "Alert immediately on Event ID 4662 for GUID `1131f6ad-9c07-11d1-f79f-00c04fc2dcd2` from any IP that is not an authorized Domain Controller, and rotate `krbtgt` twice during incident recovery."
      }
    ]
  }
];
