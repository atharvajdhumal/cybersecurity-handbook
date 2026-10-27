<div class="hero-box">
  <span style="font-size: 0.85rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #00f0ff; display: block; margin-bottom: 0.5rem;">
    <span class="live-pulse"></span>GLOBAL OPEN-SOURCE DIRECTORY
  </span>
  <h1 style="margin-top: 0; font-size: 2.1rem; font-weight: 800;">Complete Open-Source Cybersecurity Arsenal</h1>
  <p style="color: #c9d1d9; font-size: 1.05rem; margin-bottom: 0;">
    The definitive master encyclopedia of free and open-source cybersecurity tools across Network Defense, SOC/SIEM, Red Teaming, AppSec, Cloud, Digital Forensics, OSINT, and AI Security.
  </p>
</div>

## 1. Network Security, Packet Analysis & IDS/IPS

| Tool | License | Primary Purpose & Technical Capabilities | Example CLI / Usage |
| :--- | :--- | :--- | :--- |
| **Wireshark** | GPLv2 | Graphical deep packet inspection and protocol analyzer supporting 3,000+ enterprise and industrial protocols. | `wireshark -r capture.pcap` |
| **Zeek (Bro)** | BSD | Passive network traffic analyzer that converts raw packets into structured connection and protocol logs (`dns.log`, `http.log`, `ssl.log`). | `zeek -r traffic.pcap local` |
| **Suricata** | GPLv2 | High-performance multi-threaded IDS, IPS, and Network Security Monitoring (NSM) engine. | `suricata -c suricata.yaml -i eth0` |
| **Snort 3** | GPLv2 | Industry-classic packet sniffer and signature-based network intrusion detection/prevention system. | `snort -c snort.lua -R local.rules` |
| **Arkime (Moloch)** | Apache 2.0 | Large-scale, indexed full Packet Capture (PCAP) storage, search, and session carving system. | Web UI / REST API |
| **Nmap** | NPSL | Network discovery, port scanning, OS fingerprinting, service enumeration, and NSE vulnerability scripting. | `nmap -sC -sV -O -p- 10.10.10.5` |
| **Masscan** | AGPLv3 | Asynchronous TCP port scanner capable of scanning the entire IPv4 Internet in under 5 minutes. | `masscan -p80,443 10.0.0.0/8 --rate=10000` |
| **Tcpdump** | BSD | Lightweight command-line packet capture utility for headless Linux servers and firewall appliances. | `tcpdump -i eth0 -nn -s0 -w capture.pcap` |
| **Netcat / Ncat** | GPL | Networking utility for reading/writing raw TCP/UDP connections, banner grabbing, and port listening. | `nc -lvnp 4444` |
| **Bettercap** | GPLv3 | Framework for Ethernet, WiFi, and BLE MITM attacks, ARP spoofing, and live packet manipulation. | `bettercap -iface eth0` |
| **pfSense / OPNsense** | Apache / BSD | Open-source enterprise firewall, router, VPN gateway, and IDS/IPS appliance OS. | Dedicated Appliance / VM |

---

## 2. SIEM, XDR, Incident Response & Full-Stack SOC Suites

| Tool | License | Primary Purpose & Technical Capabilities | Deployment |
| :--- | :--- | :--- | :--- |
| **Wazuh** | GPLv2 | Enterprise open-source XDR and SIEM: log analysis, file integrity monitoring (FIM), vulnerability detection, and active response. | Server + Cross-Platform Agent |
| **Security Onion 3** | Elastic/GPL | Complete Linux distro for threat hunting, NSM, and log management integrating Zeek, Suricata, Wazuh, and Elastic. | Dedicated ISO / VM Sensor |
| **CISA Malcolm** | Apache 2.0 | Containerized network traffic analysis suite designed for enterprise and ICS/OT protocol forensics. | Docker Compose |
| **CISA LME** | CC0 | "Logging Made Easy": turnkey centralized Windows & Linux event log collection using Sysmon and Wazuh. | PowerShell + Linux Bash |
| **TheHive & Cortex** | AGPLv3 | Scalable Security Incident Response Platform (SIRP) and automated observable analysis/response engine. | Docker / Kubernetes |
| **MISP** | AGPLv3 | Open-Source Threat Intelligence and Malware Information Sharing Platform for storing and correlating IOCs. | Linux Server / Docker |
| **OpenCTI** | Apache 2.0 | Cyber Threat Intelligence platform structuring knowledge using the STIX2 standard and MITRE ATT&CK. | Docker / Kubernetes |
| **Velociraptor** | AGPLv3 | Advanced endpoint visibility, digital forensics, and live incident response using VQL (Velociraptor Query Language). | Server + Endpoint Agent |
| **OSQuery** | Apache 2.0 | Exposes an operating system as a high-performance relational database that can be queried using standard SQL. | `SELECT * FROM processes;` |

---

## 3. Vulnerability Scanning, Red Teaming & Active Directory Exploitation

| Tool | License | Primary Purpose & Technical Capabilities | Target Focus |
| :--- | :--- | :--- | :--- |
| **Metasploit Framework** | BSD | World's leading penetration testing framework for exploit development, payload generation (`msfvenom`), and post-exploitation. | Network / Host / Web |
| **OpenVAS (Greenbone)** | GPLv2 | Full-featured enterprise vulnerability scanner with 100,000+ Network Vulnerability Tests (NVTs). | Infrastructure Vulnerability Management |
| **Nuclei** | MIT | Fast, YAML template-based vulnerability scanner backed by thousands of community zero-day templates. | `nuclei -u https://target.com` |
| **BloodHound CE** | Apache 2.0 | Uses graph theory to reveal hidden and unintended privilege escalation paths inside Active Directory and Azure/Entra ID. | Active Directory / Cloud IAM |
| **Impacket** | Apache 2.0 | Collection of Python scripts (`psexec.py`, `secretsdump.py`, `GetUserSPNs.py`) for low-level network protocol manipulation. | Windows / Kerberos / SMB |
| **NetExec (CrackMapExec)** | BSD | Swiss-army knife for auditing and pentesting large Active Directory networks across SMB, WinRM, LDAP, and MSSQL. | `nxc smb 10.10.10.0/24` |
| **Mimikatz** | CC BY 4.0 | Extracts plaintext passwords, NTLM hashes, Kerberos tickets, and PINs from Windows `lsass.exe` memory. | Windows Credential Dumping |
| **Responder** | GPLv3 | LLMNR, NBT-NS, and MDNS poisoner designed to capture NetNTLMv1/v2 challenge-response hashes on internal LANs. | `responder -I eth0 -dwv` |
| **Sliver / Havoc** | GPLv3 | Modern open-source, cross-platform adversary emulation and Command & Control (C2) frameworks. | Red Team Operations |

---

## 4. Web Application Security (AppSec), SAST, DAST & Supply Chain

| Tool | License | Primary Purpose & Technical Capabilities | Category |
| :--- | :--- | :--- | :--- |
| **OWASP ZAP** | Apache 2.0 | Intercepting web proxy and automated DAST scanner for identifying web application and API flaws. | DAST / Intercepting Proxy |
| **SQLmap** | GPLv2 | Automates the detection and exploitation of SQL injection vulnerabilities and database server takeovers. | `sqlmap -u "http://site.com?id=1" --dbs` |
| **Ffuf / Gobuster** | MIT / Apache | High-speed Go web fuzzers for directory discovery, virtual host enumeration, and GET/POST parameter fuzzing. | `ffuf -w wordlist.txt -u https://site/FUZZ` |
| **Semgrep OSS** | LGPLv2.1 | Fast, syntax-aware Static Application Security Testing (SAST) scanner supporting 30+ programming languages. | `semgrep scan --config=auto` |
| **Trivy** | Apache 2.0 | All-in-one vulnerability and misconfiguration scanner for container images, file systems, git repos, and SBOMs. | `trivy image python:3.11` |
| **Gitleaks / TruffleHog** | MIT / AGPL | Scans git repositories, commit histories, and CI/CD pipelines for hardcoded API keys, tokens, and secrets. | `gitleaks detect --source .` |
| **OWASP Dependency-Check** | Apache 2.0 | Software Composition Analysis (SCA) tool that detects publicly disclosed CVEs in project dependencies. | Supply Chain / SCA |
| **Nikto** | GPLv2 | Web server scanner testing for 6,700+ dangerous files, misconfigurations, and outdated server headers. | `nikto -h https://target.com` |

---

## 5. Cloud & Container Security (AWS, Azure, GCP, Kubernetes)

| Tool | License | Primary Purpose & Technical Capabilities | Supported Environments |
| :--- | :--- | :--- | :--- |
| **Prowler** | Apache 2.0 | Cloud Security Posture Management (CSPM) tool auditing against CIS, NIST, GDPR, HIPAA, and PCI-DSS benchmarks. | AWS, Azure, GCP, Kubernetes |
| **ScoutSuite** | GPLv2 | Multi-cloud security auditing tool that generates interactive offline HTML reports of cloud attack surfaces. | AWS, Azure, GCP, Alibaba, Oracle |
| **Checkov / Terrascan** | Apache 2.0 | Static code analysis for Infrastructure-as-Code (Terraform, CloudFormation, Kubernetes manifests, Helm, ARM). | `checkov -d ./terraform` |
| **Falco** | Apache 2.0 | CNCF cloud-native runtime security engine; monitors Linux kernel eBPF syscalls to detect container escapes in real time. | Linux, Docker, Kubernetes |
| **Kube-bench / Kube-hunter** | Apache 2.0 | Audits Kubernetes clusters against CIS Kubernetes Benchmarks and probes for active cluster weaknesses. | Kubernetes Control Plane & Nodes |
| **Pacu** | BSD | Open-source AWS exploitation framework created for offensive cloud security testing and privilege escalation. | AWS Red Teaming |

---

## 6. Digital Forensics, Malware Analysis & Reverse Engineering

| Tool | License | Primary Purpose & Technical Capabilities | Forensic Discipline |
| :--- | :--- | :--- | :--- |
| **Ghidra** | Apache 2.0 | NSA's software reverse engineering framework featuring a multi-architecture disassembler and decompiler. | Binary Reverse Engineering |
| **Radare2 / Cutter** | LGPLv3 | Portable reverse-engineering framework, hexadecimal editor, debugger, and graphical decompiler. | Binary Analysis |
| **Volatility 3** | Volatility | World-standard memory forensics framework for extracting processes, sockets, and injected code from RAM dumps. | `vol -f mem.raw windows.pslist` |
| **Autopsy / The Sleuth Kit** | Apache 2.0 | Graphical digital forensics platform for investigating hard drives, disk images, timelines, and deleted files. | Disk & File System Forensics |
| **YARA / YARA-X** | BSD | Pattern-matching swiss-army knife used by malware researchers to identify and classify malware samples. | `yara rules.yar suspicious.exe` |
| **CAPA** | Apache 2.0 | Mandiant's open-source tool that identifies host capabilities in PE, ELF, and .NET binaries mapped to MITRE ATT&CK. | Automated Malware Triage |
| **CAPEv2 (Cuckoo Fork)** | GPLv3 | Automated dynamic malware sandbox that detonates suspicious binaries and extracts payloads, API hooks, and network IOCs. | Dynamic Malware Sandboxing |
| **CyberChef** | Apache 2.0 | GCHQ's "Cyber Swiss Army Knife" web app for decoding, decrypting, decompressing, and de-obfuscating data payloads. | Data De-obfuscation |
| **Hayabusa / Chainsaw** | GPL / MIT | Ultra-fast Rust-based Windows Event Log (`evtx`) forensic timeline generators and Sigma rule hunters. | Windows Event Log Forensics |

---

## 7. Password Auditing, OSINT & Wireless Security

| Tool | License | Primary Purpose & Technical Capabilities | Category |
| :--- | :--- | :--- | :--- |
| **Hashcat** | MIT | World's fastest GPU-accelerated password and hash cracking utility supporting 300+ hashing algorithms. | `hashcat -m 1000 hashes.txt rockyou.txt` |
| **John the Ripper** | GPLv2 | Fast password auditing tool supporting OS hashes, encrypted ZIP/7z archives, SSH private keys, and Kerberos tickets. | Password Auditing |
| **Hydra (THC-Hydra)** | AGPLv3 | Parallelized network login brute-forcer supporting 50+ protocols (SSH, FTP, RDP, HTTP-Form, SMB, Telnet). | Network Authentication Auditing |
| **Aircrack-ng** | GPLv2 | Complete wireless security suite: packet capture (`airodump-ng`), packet injection (`aireplay-ng`), and WEP/WPA/WPA2 cracking. | Wi-Fi Security Auditing |
| **SpiderFoot** | MIT | Automated OSINT reconnaissance framework querying 200+ public sources for IPs, domains, emails, and data leaks. | OSINT Automation |
| **Amass (OWASP)** | Apache 2.0 | In-depth external attack surface mapping and subdomain discovery using passive and active DNS enumeration. | Attack Surface Management |
| **TheHarvester** | GPLv2 | Gathers emails, subdomains, hosts, employee names, and open ports from public search engines and PGP servers. | Pre-Engagement Reconnaissance |

---

## 8. AI, LLM Security & Adversarial Machine Learning

| Tool | License | Primary Purpose & Technical Capabilities | Alignment |
| :--- | :--- | :--- | :--- |
| **Garak** | Apache 2.0 | Generative AI vulnerability scanner probing LLMs for prompt injection, jailbreaks, hallucinations, and data leakage. | OWASP LLM Top 10 |
| **Promptfoo** | MIT | CLI and CI/CD testing tool for red-teaming LLM prompts, RAG pipelines, and autonomous agent guardrails. | AI Application Security |
| **PyRIT (Microsoft)** | MIT | Python Risk Identification Toolkit automating red-teaming across text and multimodal generative AI systems. | MITRE ATLAS |
| **Adversarial Robustness Toolbox (ART)** | MIT | Python library for Machine Learning Security defending models against evasion, poisoning, extraction, and inference. | ML Model Defense |
