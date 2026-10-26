<div class="hero-box">
  <span style="font-size: 0.85rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #00f0ff; display: block; margin-bottom: 0.5rem;">
    <span class="live-pulse"></span>DOMAIN ARCHITECTURE // 03
  </span>
  <h1 style="margin-top: 0; font-size: 2.1rem; font-weight: 800;">Endpoint Security & Host Hardening</h1>
  <p style="color: #c9d1d9; font-size: 1.05rem; margin-bottom: 0;">
    Securing user endpoints, engineering workstations, and physical or virtual servers where untrusted code executes.
  </p>
</div>

## 🖥️ Evolution of Endpoint Defense

<div class="grid cards" markdown>

-   :material-shield-search:{ .lg .middle } **Legacy Antivirus (AV)**
    
    ---
    
    Relies on known signature databases and static file hashes. Effective against commodity threats, but blind to fileless malware, memory injection, and living-off-the-land techniques.

-   :material-memory:{ .lg .middle } **EDR & Process Telemetry**
    
    ---
    
    Monitors process ancestry, parent-child process relationships, DLL injections, and memory anomalies in real time to disrupt unknown zero-days.

-   :material-network-strength-off:{ .lg .middle } **Automated Host Quarantine**
    
    ---
    
    Immediately severs network connectivity for compromised endpoints upon detecting wiper or ransomware signatures, allowing remote SOC investigation without risk to the fleet.

-   :material-playlist-check:{ .lg .middle } **Application Allow-Listing**
    
    ---
    
    Blocks unauthorized scripts and unknown binaries by default using system policies (Windows Defender Application Control / AppLocker).

</div>

---

## 📋 Endpoint Forensics Matrix

| Forensic Artifact | Analysis Value | Open-Source Extraction Tool |
| :--- | :--- | :--- |
| **Windows Event Logs** | Detects privilege escalation, account lockouts, and suspicious service creation. | **CISA LME / Hayabusa** |
| **File Signatures & Hashes** | Identifies specific binary families, unpacked variants, and capabilities. | **YARA & CAPA** |
| **Dynamic Execution Trace** | Records API hooks, dropped files, and outbound connections in an isolated VM. | **Cuckoo Sandbox** |
