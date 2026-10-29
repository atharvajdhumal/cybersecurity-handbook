# 🛡️ CYBERDEFENSE // GLOBAL INTEL HUB

An interactive, production-ready **Cybersecurity Architecture, Threat Intelligence & Career Engineering Portal** built with **React 18 (Vite)**, **Tailwind CSS**, and **Lucide React**—aligned to **NIST Cybersecurity Framework (CSF) 2.0** and **CompTIA SecurityX (CAS-005)**.

---

## ✨ Key Capabilities & Modules

1. **Page 1 — Cyber-SOC Dashboard & NIST CSF 2.0 Governance Matrix**:
   - High-impact hero banner with pulsing live telemetry indicator, quick-navigation CTAs, and 4 real-time metric cards (`24/7 Autonomous Feed`, `8 Core Learning Modules`, `65+ Open-Source Tools`, `NIST CSF 2.0 Aligned`).
   - Interactive 8-card Bento Grid linking directly to each Core Domain learning module with quiz score badges.
   - Interactive **NIST CSF 2.0 Governance Matrix** (`Govern`, `Identify`, `Protect`, `Detect`, `Respond`, `Recover`) with official subcategory drilldowns and open-source tool mappings.

2. **Page 2 — Daily Threat Intelligence Feed & Historical Hall of Infamy**:
   - Dynamically loads daily threat intelligence from [`/public/data/daily-threats.json`](./public/data/daily-threats.json).
   - **Section A**: Searchable Daily Cyber Attack & Vulnerability Log table (`Incident/CVE`, `Target`, `Attack Vector`, `Immediate Solution/Patch`, `NIST CSF 2.0 Impact`).
   - **Section B**: Top 3 Technical Incident Deep-Dives + 2 interactive daily certification practice questions (**CompTIA Security+ SY0-701** & **CompTIA SecurityX CAS-005**) + 1-click copyable **Suricata** and **Sigma** detection rules.
   - **Section C**: **Cyber Incident Hall of Infamy** — interactive case-study explorer of 11 landmark cyber attacks (**CrowdStrike 2024**, **Change Healthcare 2024**, **Snowflake 2024**, **MOVEit 2023**, **Colonial Pipeline 2021**, **Log4Shell 2021**, **SolarWinds 2020**, **NotPetya 2017**, **WannaCry 2017**, **Equifax 2017**, **Stuxnet 2010**).

3. **Page 3 — Complete 8 Core Domain Learning Guides (GeeksforGeeks-Style Tutorials)**:
   - `01` **Network Security** (7-Layer OSI Model table, Stateful vs NGFW, DMZ/ZTNA diagram, Wireshark & Suricata rules)
   - `02` **Cloud Security** (Shared Responsibility Matrix, SSRF-to-IMDSv2 attack & defense, Hardened Dockerfile & Terraform S3 code)
   - `03` **Endpoint Security & EDR** (Ransomware, Fileless Malware, LOLBins, EPP vs EDR vs XDR, Windows & Sysmon Event IDs, interactive CIS checklist)
   - `04` **Application Security & DevSecOps** (OWASP Top 10 A01–A10, side-by-side Vulnerable vs Secure Python code for SQLi & OS Command Injection, CI/CD pipeline)
   - `05` **Identity & Access Management (IAM)** (IAAA lifecycle, DAC vs MAC vs RBAC vs ABAC, Kerberos AS-REQ/TGS-REQ flow, SAML 2.0, OAuth/OIDC, FIDO2 passkeys)
   - `06` **Cryptography & Data Security** (AES-GCM/ChaCha20 vs RSA/ECC/Post-Quantum ML-KEM vs SHA-256/Argon2id, Encryption vs Digital Signatures, PKI & TLS 1.3 ECDHE PFS, 3-2-1-1-0 WORM backup rule)
   - `07` **OT / ICS & Critical Infrastructure** (IT CIA vs OT AIC priority inversion, Purdue Model Levels 0–5 + Level 3.5 IDMZ, Modbus/DNP3/S7comm risks, Stuxnet & Industroyer)
   - `08` **AI & LLM Security** (Direct vs Indirect Prompt Injection, OWASP LLM Top 10, Least-Privilege Agent Tool Calling, Permission-Aware RAG, Safetensors vs Pickle RCE)
   - Includes an interactive **3-question multiple-choice quiz** at the bottom of every domain module (24 questions total).

4. **Page 4 — Global Open-Source Arsenal (68+ Tools Directory)**:
   - Live-searchable, category-filterable encyclopedia across 8 categories with 1-click copyable CLI commands.

5. **Page 5 — Interactive Roadmap, Career Roles & Certifications (`roadmap.sh` Style)**:
   - Stage 1, Stage 2, and Stage 3 interactive visual roadmap with slide-over detail drawer, TryHackMe/HackTheBox/picoCTF lab links, and `localStorage` mastery progress bar.
   - Tabbed **Career Role Matrix** (15 roles across 4 tracks), **Vendor Certification Progression Matrix**, and **CompTIA SecurityX (CAS-005)** exam breakdown.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```
