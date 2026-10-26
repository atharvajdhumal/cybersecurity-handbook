<div class="hero-box">
  <span style="font-size: 0.85rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #00f0ff; display: block; margin-bottom: 0.5rem;">
    <span class="live-pulse"></span>DOMAIN ARCHITECTURE // 07
  </span>
  <h1 style="margin-top: 0; font-size: 2.1rem; font-weight: 800;">Operational Technology & Critical Infrastructure</h1>
  <p style="color: #c9d1d9; font-size: 1.05rem; margin-bottom: 0;">
    Defending industrial control networks, utility grids, water plants, and automated manufacturing systems where human safety is paramount[cite: 2, 13].
  </p>
</div>

## 🏭 Industrial Constraints & Architecture

Industrial control hardware depends on deterministic protocols (Modbus/TCP, DNP3, S7comm, EtherNet/IP) that often lack native authentication. Active vulnerability scans can destabilize sensitive controllers, requiring passive monitoring approaches.

<div class="grid cards" markdown>

-   :material-layers-triple:{ .lg .middle } **The Purdue Model**
    
    ---
    
    Hierarchical network segmentation isolating physical field processes (Levels 0–1) and control systems (Level 2) from corporate business networks (Levels 4–5) through an Industrial DMZ (IDMZ).

-   :material-eye-outline:{ .lg .middle } **Passive Sensor Ingestion**
    
    ---
    
    Ingesting network telemetry strictly through hardware network TAPs or switch SPAN (port mirroring) ports to monitor packets without injecting data back into active control loops.

-   :material-shield-home:{ .lg .middle } **Hardening Monitoring Appliances**
    
    ---
    
    Securing the monitoring stack itself (CISA Malcolm, Zeek sensors) to prevent reverse-proxy bypasses and web shell uploads that could grant adversaries visibility into the OT network[cite: 13].

-   :material-alert-decagram:{ .lg .middle } **ICS Threat Hunting**
    
    ---
    
    Using protocol-aware parsers (Zeek ICSNPP) to track anomalous register writes, unauthorized PLC firmware flashes, and invalid industrial commands.

</div>

---

## ⚙️ Industrial Protocol Reference

| Protocol | Default Port | Encryption Status | Primary Risk Vector |
| :--- | :--- | :--- | :--- |
| **Modbus/TCP** | `502` | Unencrypted plaintext. | Unauthorized coil/register force writes. |
| **DNP3** | `20000` | Plaintext (unless DNP3-SAv5 enabled). | Outstation spoofing and state manipulation. |
| **S7comm** | `102` | Proprietary Siemens protocol. | Rogue PLC stop/start commands and ladder logic tampering. |
| **EtherNet/IP** | `44818` | Plaintext CIP encapsulation. | Man-in-the-middle packet injection. |
