<div class="hero-box">
  <span style="font-size: 0.85rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #00f0ff; display: block; margin-bottom: 0.5rem;">
    <span class="live-pulse"></span>MODULE 01 // COMPLETE LEARNING GUIDE
  </span>
  <h1 style="margin-top: 0; font-size: 2.1rem; font-weight: 800;">Network Security: From Fundamentals to Zero Trust</h1>
  <p style="color: #c9d1d9; font-size: 1.05rem; margin-bottom: 0;">
    Master the OSI Model, TCP/IP protocols, firewall architectures, IDS/IPS packet analysis, VPN cryptography, and Zero Trust Network Access (ZTNA).
  </p>
</div>

## 1. Network Fundamentals & The 7-Layer OSI Model
Every packet traverses the **7 Layers of the OSI Model**, each introducing unique attack vectors and defensive controls:

| Layer | Name | Data Unit (PDU) | Core Protocols / Devices | Common Attacks | Defensive Controls |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **L7** | **Application** | Data | HTTP/S, DNS, SMTP, SSH | SQLi, DNS Tunneling, DDoS (HTTP Flood) | WAF, DNSSEC, Zero Trust Proxy |
| **L6** | **Presentation** | Data | TLS/SSL, ASCII, JPEG, Gzip | SSL Stripping, Downgrade Attacks | Strict TLS 1.3, HSTS |
| **L5** | **Session** | Data | NetBIOS, RPC, SMB, Socks | Session Hijacking, Replay Attacks | Cryptographic Session Tokens |
| **L4** | **Transport** | Segment / Datagram | TCP, UDP, Ports (0–65535) | SYN Flood, UDP Amplification, Port Scans | Stateful Firewalls, SYN Cookies |
| **L3** | **Network** | Packet | IPv4, IPv6, ICMP, IPSec, Routers | IP Spoofing, ICMP Smurf, BGP Hijacking | IPSec, Packet Filtering ACLs, RPKI |
| **L2** | **Data Link** | Frame | Ethernet, MAC, VLAN, ARP, Switches | ARP Poisoning (MITM), MAC Flooding, VLAN Hopping | Dynamic ARP Inspection (DAI), 802.1X NAC, Port Security |
| **L1** | **Physical** | Bits | Fiber, Coax, Cat6, Wi-Fi RF, Hubs | Wiretapping, RF Jamming, Rogue Hardware Tap | Physical Locks, Fiber Tamper Detection |

---

## 2. Core Network Security Architecture
Modern enterprise networks rely on **Defense-in-Depth**—layering multiple controls so if one perimeter fails, internal segments remain isolated[cite: 1].

```mermaid
flowchart LR
    Internet(("🌐 Untrusted Internet")) --> DDoS["Cloud DDoS Scrubbing<br/>& WAF"]
    DDoS --> EdgeFW["Perimeter NGFW"]
    EdgeFW --> DMZ["DMZ Subnet<br/>(Public Web / Reverse Proxy)"]
    EdgeFW --> ZTNA["ZTNA Identity Broker"]
    ZTNA --> InternalFW["Internal Segmentation FW"]
    InternalFW --> Corp["Corporate VLAN<br/>(Workstations)"]
    InternalFW --> Prod["Production VLAN<br/>(Databases / App Servers)"]
    InternalFW --> SecOps["SOC Sensor Stack<br/>(Zeek + Suricata + SIEM)"]

Key Architectural Components:Firewalls (Evolution):Stateless (Packet Filtering): Inspects individual packets via static Access Control Lists (ACLs: Source/Dest IP & Port) without tracking connection state.Stateful Inspection: Tracks active TCP handshakes (SYN, SYN-ACK, ACK) in a state table; blocks unsolicited inbound packets.Next-Generation Firewall (NGFW): Adds Layer 7 Deep Packet Inspection (DPI), TLS decryption, application awareness, and integrated IPS.Network Segmentation & DMZ:DMZ (Demilitarized Zone): A buffer subnet placed between the public internet and internal LAN to host public-facing web/mail servers.Micro-segmentation: Enforcing software-defined firewall policies down to individual workloads so an infected workstation cannot laterally scan neighboring hosts via SMB (445) or RDP (3389).IDS vs. IPS:IDS (Intrusion Detection System): Out-of-band passive sensor connected via a network TAP or switch SPAN port. Alerts SOC teams without dropping traffic (e.g., Zeek, Suricata in passive mode).IPS (Intrusion Prevention System): Sits inline with network traffic; actively drops malicious packets and resets suspicious connections in real time.3. Practical Packet Analysis & Detection RulesSecurity engineers use Wireshark, Tcpdump, and Suricata to hunt threats on the wire.   === "Wireshark Display Filters Cheat Sheet"
```text
# 1. Detect TCP SYN Scans / Floods (SYN flag set, ACK flag not set)
tcp.flags.syn == 1 and tcp.flags.ack == 0

# 2. Hunt for Cleartext Credentials in HTTP POST or FTP
http.request.method == "POST" or ftp.request.command == "PASS"

# 3. Identify Suspicious DNS Tunneling (Long query names)
dns.qry.name.len > 50 and not mdns

# 4. Detect SMB Lateral Movement / PsExec activity
smb2.Tree == "\\\\*\\IPC$" or smb2.filename contains "svcctl"
```

