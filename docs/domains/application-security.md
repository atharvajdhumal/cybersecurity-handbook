<div class="hero-box">
  <span style="font-size: 0.85rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #00f0ff; display: block; margin-bottom: 0.5rem;">
    <span class="live-pulse"></span>DOMAIN ARCHITECTURE // 04
  </span>
  <h1 style="margin-top: 0; font-size: 2.1rem; font-weight: 800;">Application Security (AppSec) & Secure Coding</h1>
  <p style="color: #c9d1d9; font-size: 1.05rem; margin-bottom: 0;">
    Hardening the software development lifecycle, web applications, and backend APIs against logic bypasses and injection flaws[cite: 13].
  </p>
</div>

## 🧩 Architectural Flaws & Mitigation

<div class="grid cards" markdown>

-   :material-link-variant-off:{ .lg .middle } **URI Normalization Discrepancies**
    
    ---
    
    Reverse proxies normalize paths (e.g. `/x/../upload/`) while underlying auth backends inspect raw encoded strings, allowing low-privilege users to bypass access rules (CVE-2026-107333)[cite: 13].

-   :material-server-security:{ .lg .middle } **Server-Side Request Forgery (SSRF)**
    
    ---
    
    Application endpoints fetching remote URLs on behalf of users without restricting internal IP ranges, exposing private container networks and metadata services (CVE-2026-107362)[cite: 13].

-   :material-archive-arrow-down:{ .lg .middle } **Archive & Decompression Bombs**
    
    ---
    
    File processing pipelines that fail to enforce directory depth limits, inode caps, or uncompressed file limits, leading to path traversal and storage exhaustion (CVE-2026-19671).

-   :material-package-variant-closed-check:{ .lg .middle } **Software Supply Chain Integrity**
    
    ---
    
    Tracking and cataloging third-party dependencies through an auditable Software Bill of Materials (SBOM) to patch known vulnerabilities before deployment[cite: 2, 4].

</div>

---

## 🛠️ Testing Across the Development Lifecycle

| Testing Method | Execution Phase | Core Objective | Example Open Tool |
| :--- | :--- | :--- | :--- |
| **SAST (Static Analysis)** | Pre-Commit / Build | Scans source code repositories for insecure functions and hardcoded secrets. | **Semgrep / SonarQube** |
| **DAST (Dynamic Analysis)** | Staging / Run | Probes running web applications with automated exploit payloads to identify exposed injection vectors. | **OWASP ZAP** |
| **SCA (Component Analysis)** | CI/CD Pipeline | Matches project package manifests against known vulnerability advisory databases. | **Dependency-Check / Trivy** |
