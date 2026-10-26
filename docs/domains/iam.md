# Identity and Access Management (IAM)

IAM is the primary control boundary in cloud and perimeter-less enterprise architectures. It dictates authentication (verifying identity) and authorization (verifying permissions).

## Core Tenets

* **Least-Privilege Role-Based Access Control (RBAC)**: Users, applications, and service accounts receive only the explicit permissions required to execute their job role.
* **Phishing-Resistant MFA**: Deploying FIDO2/WebAuthn hardware security keys and passkeys that bind authentication tokens cryptographically to the browser's domain, defeating Adversary-in-the-Middle (AitM) reverse-proxy phishing[cite: 3].
* **Non-Human Identity (NHI) Governance**: Auditing, scoping, and rotating API keys, OAuth credentials, and automated service principals that often possess excessive administrative privileges.
