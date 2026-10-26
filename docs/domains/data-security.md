<div class="hero-box">
  <span style="font-size: 0.85rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #00f0ff; display: block; margin-bottom: 0.5rem;">
    <span class="live-pulse"></span>DOMAIN ARCHITECTURE // 06
  </span>
  <h1 style="margin-top: 0; font-size: 2.1rem; font-weight: 800;">Information & Data Security</h1>
  <p style="color: #c9d1d9; font-size: 1.05rem; margin-bottom: 0;">
    Safeguarding proprietary data, credentials, and customer records across the entire data lifecycle[cite: 3].
  </p>
</div>

## 🔒 The Three States of Data

<div class="grid cards" markdown>

-   :material-harddisk:{ .lg .middle } **Data at Rest**
    
    ---
    
    Stored records, database volumes, and backups encrypted using AES-256[cite: 3]. Cryptographic keys are protected using dedicated Hardware Security Modules (HSMs)[cite: 7].

-   :material-swap-horizontal:{ .lg .middle } **Data in Transit**
    
    ---
    
    Network traffic encrypted using TLS 1.3 to prevent payload inspection, eavesdropping, and session tampering over public and internal networks.

-   :material-cpu-64-bit:{ .lg .middle } **Data in Use**
    
    ---
    
    Confidential computing platforms and memory encryption that safeguard data while it is actively being processed by CPU pipelines.

</div>

---

## 💾 Resilient Backup Architecture (Anti-Extortion)

| Backup Architecture | Implementation Pattern | Protection Level |
| :--- | :--- | :--- |
| **Immutable Storage (WORM)** | Write-Once-Read-Many policies prevent ransomware operators from encrypting or deleting backups during an intrusion[cite: 7, 8]. | High (Logical Protection)[cite: 7, 8] |
| **Air-Gapped Off-Site Vaults** | Physically disconnected cold storage copies kept outside tenant network boundaries[cite: 7]. | Maximum (Physical Isolation)[cite: 7] |
| **Multi-Party Authorization** | Requiring multiple administrative approvals before any backup deletion or retention change can execute[cite: 7]. | Prevents Rogue Insider Deletion[cite: 7] |
