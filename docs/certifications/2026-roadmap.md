<div class="hero-box">
  <span style="font-size: 0.85rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #00f0ff; display: block; margin-bottom: 0.5rem;">
    <span class="live-pulse"></span>INTERACTIVE CAREER & CERTIFICATION PATHWAYS
  </span>
  <h1 style="margin-top: 0; font-size: 2.1rem; font-weight: 800;">Complete Cybersecurity Roadmap, Roles & Certifications</h1>
  <p style="color: #c9d1d9; font-size: 1.05rem; margin-bottom: 0;">
    A complete step-by-step interactive learning path mapping every cybersecurity role, required technical skill, certification tier, and experience level.
  </p>
</div>

## 🗺️ Interactive Visual Learning Roadmap (Zero to Principal)

```mermaid
flowchart TD
    subgraph S1["STAGE 1: IT & SYSTEM FOUNDATIONS (Months 1-3)"]
        A1["Computer Hardware & Virtualization<br/>(VMware, Proxmox, VirtualBox)"] --> A2["Operating Systems Deep-Dive<br/>(Linux CLI, Bash, Windows Registry/AD, PowerShell)"]
        A2 --> A3["Networking Fundamentals<br/>(OSI Model, TCP/IP, Subnetting, DNS, DHCP, TLS, ARP, NAT)"]
    end

    subgraph S2["STAGE 2: CORE SECURITY FUNDAMENTALS (Months 4-6)"]
        B1["Core Principles<br/>(CIA Triad, Zero Trust, Defense-in-Depth, Least Privilege)"] --> B2["Applied Cryptography<br/>(AES, RSA, SHA, Salting, PKI, X.509 Certificates)"]
        B2 --> B3["Attack Mechanics & Frameworks<br/>(MITRE ATT&CK, Cyber Kill Chain, OWASP Top 10, Diamond Model)"]
        B3 --> B4["Hands-On Practice Labs<br/>(TryHackMe, HackTheBox, picoCTF, VulnHub)"]
    end

    subgraph S3["STAGE 3: SPECIALIZED CAREER TRACKS (Years 1-5+)"]
        C1["🛡️ BLUE TEAM / DEFENSIVE<br/>SIEM (Wazuh/Splunk), EDR, PCAP (Wireshark/Zeek), Incident Response, Threat Hunting"]
        C2["⚔️ RED TEAM / OFFENSIVE<br/>Recon, Web App Pentesting, AD Exploitation, C2 Frameworks, Reverse Engineering"]
        C3["☁️ CLOUD, DEVSECOPS & AI<br/>AWS/Azure/GCP Security, Kubernetes, IaC (Terraform), SAST/DAST, LLM Security"]
        C4["⚖️ GRC & MANAGEMENT<br/>NIST CSF 2.0, ISO 27001, Risk Audits, SOC2, Executive Leadership (CISO)"]
    end

    A3 --> B1
    B4 --> C1
    B4 --> C2
    B4 --> C3
    B4 --> C4

    style S1 fill:#0f172a,stroke:#00f0ff,stroke-width:2px,color:#fff
    style S2 fill:#0f172a,stroke:#00ff66,stroke-width:2px,color:#fff
    style S3 fill:#0f172a,stroke:#ff3366,stroke-width:2px,color:#fff

| Role Title | Experience Level | Core Daily Responsibilities | Must-Have Technical Skills | Recommended Certifications |
| :--- | :--- | :--- | :--- | :--- |
| **SOC Analyst (Tier 1 / 2)** | Entry to Mid (0–3 yrs) | Triage SIEM alerts, analyze phishing emails, inspect network PCAPs, isolate infected endpoints. | SIEM (Wazuh/Splunk), Wireshark, EDR triage, Windows/Linux Event Logs, TCP/IP. | CompTIA Security+, BTL1, CompTIA CySA+, GIAC GSEC |
| **Incident Responder / DFIR** | Mid to Senior (3–6 yrs) | Lead breach containment, conduct memory and disk forensics, reverse engineer malware, eradicate root causes. | Volatility 3, Autopsy, Velociraptor, YARA, Timeline analysis, Ransomware recovery. | GIAC GCIH, GCFA, BTL2, CompTIA CySA+ |
| **Threat Intelligence Analyst** | Mid (2–5 yrs) | Track APT groups, map adversary TTPs to MITRE ATT&CK, curate IOC feeds, brief executives on dark web threats. | MITRE ATT&CK, Diamond Model, OpenCTI, MISP, YARA, OSINT (SpiderFoot), Python. | GIAC GCTI, CompTIA CySA+ |
| **Detection Engineer / Threat Hunter** | Senior (4–8 yrs) | Write custom SIEM/Sigma/Suricata detection rules, proactively hunt for stealthy Living-off-the-Land (LOLBins) actors. | Sigma rules, YARA, Suricata, Zeek, KQL/SPL query languages, EDR telemetry engineering. | GIAC GCIA, GCFA, OSDA |
