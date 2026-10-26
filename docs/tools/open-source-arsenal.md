<div class="hero-box">
  <span style="font-size: 0.85rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #00f0ff; display: block; margin-bottom: 0.5rem;">
    <span class="live-pulse"></span>VERIFIED PRODUCTION TOOLS
  </span>
  <h1 style="margin-top: 0; font-size: 2.1rem; font-weight: 800;">Enterprise Open-Source Defensive Arsenal</h1>
  <p style="color: #c9d1d9; font-size: 1.05rem; margin-bottom: 0;">
    A production-grade directory of zero-cost, open-source security tools for network traffic inspection, endpoint baselining, digital forensics, and AI red-teaming.
  </p>
</div>

<div class="stat-grid">
  <div class="stat-item">
    <div class="stat-number">100%</div>
    <div class="stat-label">Free & Open Source</div>
  </div>
  <div class="stat-item">
    <div class="stat-number">OT / ICS</div>
    <div class="stat-label">Industrial Capable</div>
  </div>
  <div class="stat-item">
    <div class="stat-number">MITRE ATLAS</div>
    <div class="stat-label">AI Red-Teaming</div>
  </div>
  <div class="stat-item">
    <div class="stat-number">$0</div>
    <div class="stat-label">Hardware Lab Cost</div>
  </div>
</div>

## 🌐 Network Security & Industrial Telemetry

| Tool Name | License | Core Capabilities | System Requirements |
| :--- | :--- | :--- | :--- |
| **Wireshark 4.6** | Open Source | Deep interactive packet inspection and protocol decoding; parses enterprise protocols and industrial protocols (Modbus, DNP3, S7comm, EtherNet/IP, BACnet). | Standard laptop (8 GB RAM). |
| **Zeek 9.0 + ICSNPP** | BSD | Passive network traffic metadata extraction; logs structured records for DNS, HTTP, TLS, SMB, and industrial state changes. | Linux VM (8 GB RAM). |
| **Suricata 8.0** | Open Source | Multi-threaded signature IDS/IPS engine for high-throughput perimeter analysis, exploit alerting, and C2 detection. | Linux VM (8 GB RAM). |
| **CISA Malcolm** | Apache 2.0 | Containerized full-stack network and OT forensics suite integrating Zeek, Suricata, Arkime PCAP, OpenSearch, NetBox, and YARA. | 8+ Cores / 24+ GB RAM (v26.09.0+)[cite: 13]. |
| **Security Onion 3** | Free Platform | Enterprise Network Security Monitoring (NSM), log indexing, and retrospective PCAP triage (Import Mode available). | 2 Cores / 4 GB RAM (Import Mode). |

---

## 💻 Endpoint, Triage & Forensics

<div class="grid cards" markdown>

-   :material-console-line:{ .lg .middle } **CISA Logging Made Easy (LME)**
    
    ---
    
    Centralized event log baselining designed for small-to-medium businesses to capture Windows and Linux authentication anomalies, lateral movement, and privilege escalation.

-   :material-file-search:{ .lg .middle } **YARA & CAPA**
    
    ---
    
    Rule-based pattern matching across suspicious binaries, files, and running processes, paired with executable capability classification (CAPA).

-   :material-shield-bug:{ .lg .middle } **ClamAV & Cuckoo Sandbox**
    
    ---
    
    Open-source gateway antivirus combined with automated dynamic sandbox execution to isolate and analyze malicious binaries in detached VMs.

</div>

---

## 🤖 AI Evaluation & Threat Intelligence Portals

| Tool / Service | Category | Use Case & Focus |
| :--- | :--- | :--- |
| **Garak & Promptfoo** | AI Red-Teaming | Automated LLM probing for prompt injection, jailbreaks, PII leakage, and MITRE ATLAS security gaps. |
| **ThreatFox (Abuse.ch)** | Threat Intel | Community-curated feed of verified malware Indicators of Compromise (IOCs) and file hashes. |
| **AbuseIPDB & Cisco Talos** | Reputation Scoring | Real-time IP address reputation scoring, subnet validation, and malicious domain intelligence. |
| **VirusTotal & Hybrid-Analysis** | Dynamic Analysis | Multi-engine file, URL, and hash reputation inspection across dozens of antivirus and sandbox providers. |
