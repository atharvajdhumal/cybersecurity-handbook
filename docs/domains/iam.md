<div class="hero-box">
  <span style="font-size: 0.85rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #00f0ff; display: block; margin-bottom: 0.5rem;">
    <span class="live-pulse"></span>DOMAIN ARCHITECTURE // 05
  </span>
  <h1 style="margin-top: 0; font-size: 2.1rem; font-weight: 800;">Identity and Access Management (IAM)</h1>
  <p style="color: #c9d1d9; font-size: 1.05rem; margin-bottom: 0;">
    The primary control perimeter for modern zero-trust architecture, governing human users, service principals, and API access[cite: 2].
  </p>
</div>

## 🔑 IAM Security Pillars

<div class="grid cards" markdown>

-   :material-key-wireless:{ .lg .middle } **Phishing-Resistant MFA**
    
    ---
    
    FIDO2 and WebAuthn hardware keys cryptographically bind authentication tokens to the specific browser domain, neutralizing Adversary-in-the-Middle (AitM) phishing[cite: 3].

-   :material-account-lock:{ .lg .middle } **Least-Privilege RBAC**
    
    ---
    
    Role-Based Access Control ensuring users and systems receive only the permissions strictly required to perform their functions, eliminating permanent broad admin rights[cite: 3, 11, 13].

-   :material-robot-confused:{ .lg .middle } **Non-Human Identity (NHI) Governance**
    
    ---
    
    Auditing, scoping, and rotating API keys, OAuth consent grants, and service accounts that hold broad tenant privileges.

-   :material-shield-refresh:{ .lg .middle } **Continuous Session Evaluation**
    
    ---
    
    Monitoring active user sessions to automatically revoke access tokens if impossible travel, device compliance loss, or anomalous API calls are detected.

</div>

---

## ⚠️ Authentication Mechanism Comparison

| Method | Phishing Resistance | Primary Vulnerability | Enterprise Suitability |
| :--- | :--- | :--- | :--- |
| **SMS / Email OTP** | Low | SIM swapping, SS7 interception, social engineering. | Deprecated / Consumer Only |
| **Push Notifications** | Medium | Push fatigue, prompt spamming, accidental approval. | Moderate (requires number matching) |
| **FIDO2 / WebAuthn** | **High (Phishing-Resistant)** | Physical device theft (protected by on-device biometric/PIN)[cite: 3]. | **Recommended Enterprise Standard**[cite: 3] |
