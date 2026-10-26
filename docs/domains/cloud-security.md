<div class="hero-box">
  <span style="font-size: 0.85rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #00f0ff; display: block; margin-bottom: 0.5rem;">
    <span class="live-pulse"></span>DOMAIN ARCHITECTURE // 02
  </span>
  <h1 style="margin-top: 0; font-size: 2.1rem; font-weight: 800;">Cloud Security & Workload Integrity</h1>
  <p style="color: #c9d1d9; font-size: 1.05rem; margin-bottom: 0;">
    Defending virtualized infrastructure, containerized microservices, and multi-tenant SaaS environments across AWS, Azure, and Google Cloud.
  </p>
</div>

## ☁️ The Modern Cloud Threat Model

Under the **Shared Responsibility Model**, cloud providers secure physical hardware and hypervisors, while organizations remain entirely responsible for configuration, access rights, and data storage.

<div class="grid cards" markdown>

-   :material-database-alert:{ .lg .middle } **Public Storage Exposures**
    
    ---
    
    Unauthenticated public read/write permissions on cloud object storage buckets (S3, Cloud Storage) that expose credentials, backups, and customer records.

-   :material-key-chain:{ .lg .middle } **OAuth App Secret Exfiltration**
    
    ---
    
    Attackers targeting third-party SaaS management or backup tools to steal application secrets (such as ConnectWise Cloud Backup) and access tenant APIs directly without human MFA.

-   :material-server-network:{ .lg .middle } **Metadata Service Abuse (SSRF)**
    
    ---
    
    Exploiting unhardened Instance Metadata Services (such as legacy IMDSv1) via web application SSRF vulnerabilities to extract temporary IAM role credentials[cite: 13].

-   :material-docker:{ .lg .middle } **Container & Kubernetes Breaches**
    
    ---
    
    Deploying unverified public base images containing backdoors, overly permissive container capabilities, and exposed Kubernetes API control planes.

</div>

---

## ⚙️ Essential Cloud Security Controls

| Control Discipline | Operational Purpose | Industry Standard / Tool |
| :--- | :--- | :--- |
| **CSPM** | Continuously audits cloud resource configurations against security benchmarks. | **CIS Cloud Benchmarks** |
| **CIEM** | Identifies and strips excessive permissions from dormant IAM identities and service accounts. | **Least-Privilege RBAC**[cite: 7, 13] |
| **CWPP** | Monitors container runtimes, system calls, and host integrity within cloud instances. | **Linux Auditd / Falco** |
| **IaC Scanning** | Analyzes Terraform, Bicep, or CloudFormation templates for misconfigurations before deployment. | **Trivy / Checkov** |
