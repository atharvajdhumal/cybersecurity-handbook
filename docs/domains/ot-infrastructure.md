# Operational Technology (OT) & Critical Infrastructure

Operational Technology encompasses industrial control networks, utility grids, water plants, transit systems, and automated manufacturing facilities.

## Industrial Protocols & Physical Constraints
Industrial automation relies on deterministic, legacy communication protocols—such as **Modbus/TCP**, **DNP3**, **S7comm**, **EtherNet/IP**, and **BACnet**—frequently lacking built-in authentication or encryption. Active scanning tools can crash fragile PLCs, requiring passive-only monitoring strategies.

## Defensive Architecture
* **The Purdue Model**: Segregates networks into distinct operational levels (Level 0 physical sensors up to Level 4/5 corporate enterprise systems), mediated by Demilitarized Zones (IDMZ).
* **Passive Sensor Deployment**: Utilizing network TAPs or switch SPAN (port mirroring) ports to ingest telemetry into analysis tools without injecting a single packet into live control loops.
* **Integrated Industrial Forensics**: Deploying specialized monitoring engines like **CISA Malcolm** running Zeek ICSNPP parsers to detect anomalous industrial state changes and malformed PLC command injections.
