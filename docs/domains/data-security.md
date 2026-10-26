# Information & Data Security

Data Security protects digital and physical information from theft, exposure, tampering, and unauthorized destruction.

## States of Data Protection

* **Data at Rest**: Encrypted using robust symmetric ciphers (AES-256) across hard disks, database volumes, and backups, paired with Hardware Security Modules (HSMs) for encryption key storage[cite: 7].
* **Data in Transit**: Secured via TLS 1.3 to prevent eavesdropping, packet alteration, and unauthorized session hijacking across public and internal networks.
* **Data in Use**: Protected via confidential computing hardware and memory encryption to defend sensitive operations against unauthorized host-level inspection.

## Resilient Backup Architectures
* **Immutable Storage**: Write-Once-Read-Many (WORM) configurations that prevent ransomware operators from deleting or encrypting backup snapshots.
* **Air-Gapped Off-Site Redundancy**: Maintaining separated copies of critical directories, signing certificates, and configuration databases out of reach of compromised tenant identities.
