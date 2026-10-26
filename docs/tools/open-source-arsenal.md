# Enterprise Open-Source Defensive Arsenal

A verified directory of open-source and zero-cost cybersecurity tools spanning every defensive discipline.

## Network & OT Forensics

| Tool | License | Primary Function | Minimum Specs |
| :--- | :--- | :--- | :--- |
| **Wireshark 4.6** | Open Source | Deep packet dissection for enterprise and ICS protocols. | Standard Laptop (8 GB RAM) |
| **Zeek 9.0 + ICSNPP** | BSD | High-performance passive network metadata extraction. | Linux VM (8 GB RAM) |
| **Suricata 8.0** | Open Source | Multi-threaded signature IDS/IPS engine. | Linux VM (8 GB RAM) |
| **CISA Malcolm** | Apache 2.0 | Containerized full-stack network and OT forensic suite. | 8 Cores, 24 GB RAM (v26.09.0+) |
| **Security Onion 3** | Free Platform | Enterprise NSM, SIEM, and alert management. | 2 Cores, 4 GB RAM (Import Mode) |

## Endpoint, Forensics & Log Management

| Tool | Focus | Capabilities |
| :--- | :--- | :--- |
| **CISA LME** | SIEM / Logging | Baseline centralized Windows/Linux event logging for small organizations. |
| **YARA & CAPA** | Malware Analysis | Match custom binary signatures and identify executable capabilities. |
| **ClamAV** | Antivirus | Open-source antivirus engine for file shares and mail gateways. |
| **Cuckoo Sandbox** | Dynamic Triage | Detonate suspicious files in an isolated VM to capture execution behaviors. |

## Free Intelligence & OSINT Portals
* **ThreatFox (Abuse.ch)**: Free repository of verified malware indicators of compromise (IOCs).
* **AbuseIPDB & Cisco Talos**: Real-time IP reputation, subnet scoring, and domain categorization.
* **VirusTotal & Hybrid-Analysis**: Free public file triage and sandbox execution.

## AI Red-Teaming Frameworks
* **Garak**: CLI scanner probing LLMs for prompt injection, jailbreaks, and MITRE ATLAS flaws.
* **Promptfoo**: CI/CD testing framework auditing LLM guardrails against data leakage and injection attacks.
