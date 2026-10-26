# Cloud Security & Virtualized Workload Defense

Cloud Security governs infrastructure, platforms, and SaaS tenants across multi-cloud environments (AWS, Microsoft Azure, Google Cloud Platform).

## Threat Vectors & Shared Responsibility
Under the Shared Responsibility Model, cloud providers secure physical facilities and hypervisors, while the tenant is strictly responsible for identity permissions, storage configuration, API tokens, and workload configurations.

* **Public Storage Exposure**: Unauthenticated public read/write permissions on object storage buckets (S3, Cloud Storage) leading to mass credential and record exposures.
* **OAuth App Secret Exfiltration**: Attackers compromising third-party SaaS management and backup applications to mint OAuth tokens (e.g., Microsoft Graph) with broad privileges, completely bypassing human MFA.
* **Metadata Service Exploitation (SSRF)**: Stealing temporary instance profile credentials via unhardened Instance Metadata Services (IMDSv1).

## Engineering Safeguards
* **Cloud Security Posture Management (CSPM)**: Continuously auditing infrastructure-as-code and running configurations against security benchmarks (CIS Benchmarks).
* **Cloud Infrastructure Entitlement Management (CIEM)**: Automatically discovering and pruning excessive cloud IAM privileges and unused service roles.
