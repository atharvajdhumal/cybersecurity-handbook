<div class="hero-box">
  <span style="font-size: 0.85rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #00f0ff; display: block; margin-bottom: 0.5rem;">
    <span class="live-pulse"></span>GLOBAL OPEN-SOURCE DIRECTORY
  </span>
  <h1 style="margin-top: 0; font-size: 2.1rem; font-weight: 800;">Complete Open-Source Cybersecurity Arsenal</h1>
  <p style="color: #c9d1d9; font-size: 1.05rem; margin-bottom: 0;">
    The definitive master index of free and open-source tools across Blue Team SOC, Red Team OffSec, Cloud, AppSec, OSINT, Forensics, Cryptography, and AI Red-Teaming.
  </p>
</div>

## 1. Network Security, IDS/IPS & Traffic Analysis
| Tool | License | Primary Purpose & Technical Capabilities | CLI / Usage Pattern |
| :--- | :--- | :--- | :--- |
| **Wireshark** | GPLv2 | Deep packet inspection and protocol analyzer supporting 3,000+ enterprise and OT protocols. | `wireshark -r capture.pcap` |
| **Zeek (formerly Bro)** | BSD | Passive network security monitor that converts raw traffic into structured protocol logs (`dns.log`, `http.log`, `ssl.log`). | `zeek -r traffic.pcap local` |
| **Suricata** | GPLv2 | Multi-threaded IDS, IPS, and NSM engine using signature rules and Lua scripting. | `suricata -c suricata.yaml -i eth0` |
| **Snort 3** | GPLv2 | Classic packet sniffer and signature-based network intrusion detection/prevention system. | `snort -c snort.lua -R rules.txt` |
| **Arkime (Moloch)** | Apache 2.0 | Large-scale, indexed full Packet Capture (PCAP) storage and search system. | Web UI / REST API |
| **Nmap** | NPSL | Network discovery, port scanning, OS fingerprinting, and NSE vulnerability scripting. | `nmap -sC -sV -O -p- target_ip` |
| **Masscan** | AGPLv3 | Asynchronous TCP port scanner capable of scanning the entire Internet in under 5 minutes. | `masscan -p80,443 10.0.0.0/8 --rate=10000` |
| **Netcat / Ncat** | GPL | Network utility for reading/writing raw TCP/UDP connections, banner grabbing, and port listening. | `nc -lvnp 4444` |
| **Tcpdump** | BSD | Command-line packet analyzer for headless Linux servers and firewall appliances. | `tcpdump -i eth0 -nn -s0 -w out.pcap` |
| **Bettercap** | GPLv3 | Swiss-army knife for WiFi, BLE, Ethernet MITM, ARP spoofing, and credential sniffing. | `bettercap -iface eth0` |

---

## 2. SIEM, XDR, Log Management & Full-Stack Suites
| Tool | License | Primary Purpose & Technical Capabilities | Deployment |
| :--- | :--- | :--- | :--- |
| **Wazuh** | GPLv2 | Enterprise open-source XDR and SIEM: file integrity monitoring, vulnerability detection, and active response. | Agent + Server Docker/OVA |
| **Security Onion 3** | Elastic/GPL | Complete Linux distro for threat hunting, NSM, log management (Zeek, Suricata, Wazuh, Elastic). | ISO / Network Sensor |
| **CISA Malcolm** | Apache 2.0 | Containerized network traffic analysis suite tailored for enterprise and ICS/OT protocol forensics. | Docker Compose |
| **CISA LME** | CC0 | "Logging Made Easy": centralized Windows & Linux log collection with Sysmon and Wazuh. | PowerShell + Linux Bash |
| **TheHive & Cortex** | AGPLv3 | Scalable Security Incident Response Platform (SIRP) and observable analysis/response engine. | Docker / Kubernetes |
| **Graylog Open** | SSPL | Centralized log management, parsing pipelines, and real-time alerting. | Linux Server / Docker |
| **Velociraptor** | AGPLv3 | Advanced endpoint visibility, digital forensics, and live incident response query language (VQL). | Server + Cross-Platform Agent |

---

## 3. Vulnerability Scanning, Red Teaming & Exploitation
| Tool | License | Primary Purpose & Technical Capabilities | Target Focus |
| :--- | :--- | :--- | :--- |
| **Metasploit Framework** | BSD | World's most used penetration testing framework for exploit execution, payloads, and post-exploitation. | Network / Host / App |
| **OpenVAS (Greenbone)** | GPLv2 | Full-featured vulnerability scanner with thousands of updated Network Vulnerability Tests (NVTs). | Enterprise Infrastructure |
| **Nuclei** | MIT | Fast, template-based vulnerability scanner powered by YAML community templates. | Web / APIs / Cloud / Networks |
| **BloodHound Community** | Apache 2.0 | Uses graph theory to reveal hidden and unintended privilege escalation paths in Active Directory and Azure/Entra ID. | Active Directory / IAM |
| **Impacket** | Apache 2.0 | Collection of Python classes for working with network protocols (SMB, MSRPC, Kerberos, NTLM). | Windows / AD Exploitation |
| **NetExec (formerly CrackMapExec)** | BSD | Swiss-army knife for pentesting and auditing large Active Directory environments. | Windows / SMB / WinRM / LDAP |
| **Mimikatz** | CC BY 4.0 | Extracts plaintext passwords, hashes, PIN codes, and Kerberos tickets from Windows LSASS memory. | Windows Post-Exploitation |
| **Sliver / Havoc** | GPLv3 | Open-source, cross-platform adversary emulation and Command & Control (C2) frameworks. | Red Team Operations |
| **Responder** | GPLv3 | LLMNR, NBT-NS, and MDNS poisoner for capturing NetNTLMv1/v2 challenge-response hashes. | Internal Network Pentesting |

---

## 4. Web Application Security (AppSec), SAST, DAST & Supply Chain
| Tool | License | Primary Purpose & Technical Capabilities | Category |
| :--- | :--- | :--- | :--- |
| **OWASP ZAP** | Apache 2.0 | Intercepting proxy and automated DAST scanner for finding web and API vulnerabilities. | DAST / Web Proxy |
| **SQLmap** | GPLv2 | Automates the detection and exploitation of SQL injection flaws and database takeovers. | Database Exploitation |
| **Ffuf / Gobuster** | MIT / Apache | Fast web fuzzers written in Go for directory brute-forcing, virtual host discovery, and parameter fuzzing. | Web Reconnaissance |
| **Semgrep OSS** | LGPLv2.1 | Fast, syntax-aware static analysis (SAST) tool supporting 30+ programming languages. | SAST / Secure Coding |
| **Trivy** | Apache 2.0 | Comprehensive vulnerability and misconfiguration scanner for containers, Kubernetes, IaC, and SBOMs. | Container / Supply Chain |
| **Gitleaks / TruffleHog** | MIT / AGPL | Scans git repositories, commit histories, and filesystems for hardcoded API keys and secrets. | Secret Detection |
| **OWASP Dependency-Check** | Apache 2.0 | Software Composition Analysis (SCA) tool that detects publicly disclosed CVEs in project dependencies. | SCA / Supply Chain |
| **Nikto** | GPLv2 | Web server scanner testing for 6,700+ dangerous files/CGIs and outdated server versions. | Web Server Auditing |

---

## 5. Cloud Security (AWS, Azure, GCP & Kubernetes)
| Tool | License | Primary Purpose & Technical Capabilities | Supported Clouds |
| :--- | :--- | :--- | :--- |
| **Prowler** | Apache 2.0 | Cloud Security Posture Management (CSPM) auditing against CIS, NIST, GDPR, HIPAA, and PCI-DSS. | AWS, Azure, GCP, K8s |
| **ScoutSuite** | GPLv2 | Multi-cloud security auditing tool that generates offline HTML reports of exposed cloud configurations. | AWS, Azure, GCP, Alibaba |
| **Checkov / Terrascan** | Apache 2.0 | Static code analysis for Infrastructure-as-Code (Terraform, CloudFormation, Kubernetes, Helm). | IaC Security |
| **Falco** | Apache 2.0 | Cloud-native runtime security project by CNCF; detects anomalous Linux kernel syscalls and container escapes. | Linux / Docker / K8s |
| **Kube-bench / Kube-hunter** | Apache 2.0 | Audits Kubernetes clusters against CIS Benchmarks and hunts for active cluster weaknesses. | Kubernetes |
| **Pacu** | BSD | Open-source AWS exploitation framework designed for offensive cloud security testing. | AWS Red Teaming |

---

## 6. Digital Forensics, Malware Analysis & Reverse Engineering
| Tool | License | Primary Purpose & Technical Capabilities | Focus |
| :--- | :--- | :--- | :--- |
| **Ghidra** | Apache 2.0 | NSA's software reverse engineering suite featuring a decompiler, disassembler, and scripting engine. | Binary Reverse Engineering |
| **Radare2 / Rizin (Cutter)** | LGPLv3 | Portable reverse-engineering framework and command-line hexadecimal editor/disassembler. | Binary Analysis |
| **Volatility 3** | Volatility | World standard framework for extracting digital artifacts from volatile RAM memory dumps. | Memory Forensics |
| **Autopsy / Sleuth Kit** | Apache 2.0 | Graphical digital forensics platform for analyzing hard drives, smartphones, and deleted files. | Disk Forensics |
| **YARA & YARA-X** | BSD | Pattern-matching swiss-army knife for malware researchers to classify and identify malware samples. | Malware Signatures |
| **CAPA** | Apache 2.0 | Mandiant's open-source tool that identifies capabilities in executable binaries (PE, ELF, .NET) mapped to ATT&CK. | Automated Triage |
| **CAPEv2 (Cuckoo Fork)** | GPLv3 | Automated malware sandbox that detonates suspicious files and extracts payloads, API calls, and network IOCs. | Dynamic Sandboxing |
| **CyberChef** | Apache 2.0 | GCHQ's "Cyber Swiss Army Knife" web app for decoding, decompressing, decrypting, and parsing data. | Data De-obfuscation |

---

## 7. Password Auditing, OSINT & Wireless Security
| Tool | License | Primary Purpose & Technical Capabilities | Category |
| :--- | :--- | :--- | :--- |
| **Hashcat** | MIT | World's fastest GPU-accelerated password and hash recovery utility supporting 300+ hashing algorithms. | Password Recovery |
| **John the Ripper (Jumbo)** | GPLv2 | Fast password cracker capable of auditing archive passwords, SSH keys, Kerberos tickets, and OS hashes. | Password Auditing |
| **Hydra** | AGPLv3 | Parallelized network login cracker supporting 50+ protocols (SSH, FTP, RDP, HTTP-Form, SMB). | Network Brute-Forcing |
| **Aircrack-ng** | GPLv2 | Complete suite of tools to assess Wi-Fi network security: packet capture, deauth, WEP/WPA/WPA2 cracking. | Wireless Security |
| **SpiderFoot** | MIT | Automated OSINT collection tool querying 200+ public data sources for IPs, domains, emails, and leaks. | OSINT / Recon |
| **TheHarvester / Recon-ng** | GPLv2 | Gathers emails, subdomains, hosts, employee names, and open ports from public sources. | External Recon |
| **Amass (OWASP)** | Apache 2.0 | In-depth attack surface mapping and external asset discovery using passive and active DNS enumeration. | Attack Surface Mapping |

---

## 8. AI, LLM Security & Adversarial Machine Learning
| Tool | License | Primary Purpose & Technical Capabilities | Alignment |
| :--- | :--- | :--- | :--- |
| **Garak** | Apache 2.0 | LLM vulnerability scanner probing for prompt injection, jailbreaks, toxicity, hallucinations, and data leakage. | OWASP LLM Top 10 |
| **Promptfoo** | MIT | CLI and CI/CD tool for red-teaming LLM apps, RAG pipelines, and agentic workflows. | AI Guardrail Auditing |
| **PyRIT (Microsoft)** | MIT | Python Risk Identification Toolkit for generative AI; automates red-teaming across text and multimodal models. | MITRE ATLAS |
| **Adversarial Robustness Toolbox (ART)** | MIT | Python library for ML Security defending and evaluating models against evasion, poisoning, and extraction. | ML Model Defense |
