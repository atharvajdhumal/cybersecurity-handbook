<div class="hero-box">
  <span style="font-size: 0.85rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #00f0ff; display: block; margin-bottom: 0.5rem;">
    <span class="live-pulse"></span>DOMAIN ARCHITECTURE // 01
  </span>
  <h1 style="margin-top: 0; font-size: 2.1rem; font-weight: 800;">Network Security & Perimeter Defense</h1>
  <p style="color: #c9d1d9; font-size: 1.05rem; margin-bottom: 0;">
    Protecting enterprise communications, internal segments, and transit boundaries against packet exploitation, lateral movement, and C2 beacons[cite: 13].
  </p>
</div>

## 🛡️ Core Defensive Controls

<div class="grid cards" markdown>

-   :material-wall:{ .lg .middle } **Stateful & Next-Gen Firewalls (NGFW)**
    
    ---
    
    Inspection across OSI Layers 3 through 7[cite: 13]. Enforces deep packet filtering, application-layer awareness, and strict outbound egress rules to neutralize command-and-control (C2) callbacks[cite: 13].

-   :material-vector-polyline:{ .lg .middle } **Network Micro-Segmentation**
    
    ---
    
    Dividing corporate environments into isolated trust zones (DMZ, Corporate, Engineering, Management) using internal firewalls and VLANs to stop unrestricted lateral movement[cite: 13].

-   :material-radar:{ .lg .middle } **Intrusion Detection & Prevention (IDS/IPS)**
    
    ---
    
    Continuous payload inspection using multi-threaded signature engines (Suricata) and protocol state analyzers (Zeek) to surface exploitation attempts in real time.

-   :material-shield-account:{ .lg .middle } **Zero Trust Network Access (ZTNA)**
    
    ---
    
    Replacing legacy site-to-site VPNs with identity-aware proxies that verify device compliance, user credentials, and context before brokering granular application connections[cite: 13].

</div>

---

## 🔍 Protocol Telemetry & Traffic Baselines

| Protocol | Normal Behavior | Anomaly Indicator | Detection Tool |
| :--- | :--- | :--- | :--- |
| **DNS (Port 53)** | High-frequency, low-payload domain queries. | High entropy base64 subdomains (DNS tunneling/data exfiltration). | **Zeek `dns.log`** |
| **TLS/HTTPS (Port 443)** | Standard enterprise certificate validation. | Self-signed certs, rare JA3/JA4 cryptographic fingerprints. | **Suricata / Zeek `ssl.log`** |
| **SMB (Port 445)** | Internal file sharing between verified workstations. | PsExec execution, pass-the-hash patterns, mass East-West traversal. | **Wireshark / Suricata** |
