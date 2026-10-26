# Application Security (AppSec) & Secure Coding

Application Security establishes defensive controls across the software development lifecycle (SDLC), APIs, and web-facing services.

## Critical Architectural Vulnerabilities

* **URI Normalization Discrepancies**: Discrepancies between how a front-end reverse proxy (like nginx) normalizes paths versus how backend code checks permissions, allowing attackers to bypass authentication gates using crafted URL traversals.
* **Server-Side Request Forgery (SSRF)**: Insecure server routines fetching remote URLs on behalf of users, allowing an attacker to reach private metadata services or internal microservices.
* **Archive & Decompression Bombs**: Flaws in file upload pipelines that fail to validate nested folder depth, inode quotas, or uncompressed byte sizes, enabling disk exhaustion and log blinding.

## Secure Pipeline Controls
* **Static Application Security Testing (SAST)**: Scanning source repositories during CI/CD builds for insecure patterns.
* **Dynamic Application Security Testing (DAST)**: Interrogating running staging applications with simulated exploits to identify exposed injection surfaces.
* **Software Bill of Materials (SBOM)**: Maintaining an auditable inventory of all open-source packages, libraries, and direct dependencies to quickly respond to supply-chain zero-days.
