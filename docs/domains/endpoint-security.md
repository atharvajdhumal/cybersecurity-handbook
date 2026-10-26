# Endpoint Security & Host Defense

Endpoint Security hardens individual user and server endpoints—laptops, workstations, mobile devices, and virtual servers—where untrusted data and executable binaries are processed.

## Defensive Architecture

* **Signature Antivirus vs. EDR**: Legacy signature scanning (comparing file hashes to blocklists) is insufficient against fileless attacks, memory injection, and living-off-the-land binaries (LOLBins). Endpoint Detection and Response (EDR) records process parent-child telemetry, memory modifications, and registry events to disrupt malicious behavior dynamically.
* **Application Allow-Listing**: Restricting the execution of untrusted scripts and binaries by default using platform controls like Windows Defender Application Control (WDAC) or AppLocker.
* **Automated Containment**: EDR systems automatically severing an endpoint's network connection upon detecting mass file encryption or wiper indicators, allowing SOC analysts to triage the host remotely without risk to the fleet.

## Key Open-Source Tools
* **CISA Logging Made Easy (LME)**: Streamlined Windows and Linux event log baselining.
* **YARA & CAPA**: Binary pattern matching and executable capability triage.
* **ClamAV**: Open-source antivirus engine for gateway and server scanning.
