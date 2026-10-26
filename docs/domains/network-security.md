# Network Security & Perimeter Defense

Network Security protects enterprise internal communications, perimeter boundaries, and data pipelines from unauthorized access, exploitation, and lateral attacker movement.

## Architectural Pillars

* **Stateful & Next-Generation Firewalls (NGFW)**: Inspects ingress and egress packets at Layers 3 through 7, terminating suspicious sessions and enforcing egress filtering to defeat Command and Control (C2) callbacks.
* **Network Segmentation & Micro-segmentation**: Segregates assets into trust zones (e.g., DMZ, Corporate, Engineering, Management) using internal firewalls, VLANs, and Software-Defined Networking (SDN) to prevent unrestricted East-West lateral movement.
* **Intrusion Detection and Prevention (IDS/IPS)**: Deep-inspects network traffic payloads using signature matching (Suricata) and protocol parsing (Zeek) to surface exploit attempts in real time.
* **Zero Trust Network Access (ZTNA)**: Replaces legacy site-to-site VPNs with identity-aware proxies that verify context, device posture, and user identity before brokering a session to an internal resource.

## Key Tools
* **Suricata 8.0**: Multi-threaded signature IDS/IPS engine.
* **Zeek 9.0**: Real-time passive network metadata extractor.
* **Wireshark 4.6**: Interactive packet capture and deep dissection.
