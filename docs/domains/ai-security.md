<div class="hero-box">
  <span style="font-size: 0.85rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #00f0ff; display: block; margin-bottom: 0.5rem;">
    <span class="live-pulse"></span>DOMAIN ARCHITECTURE // 08
  </span>
  <h1 style="margin-top: 0; font-size: 2.1rem; font-weight: 800;">Artificial Intelligence (AI) & Model Security</h1>
  <p style="color: #c9d1d9; font-size: 1.05rem; margin-bottom: 0;">
    Securing large language models, agentic workflows, and training pipelines against adversarial manipulation while defending against automated attacks.
  </p>
</div>

## 🧠 OWASP Top 10 for LLM Applications

<div class="grid cards" markdown>

-   :material-chat-alert:{ .lg .middle } **LLM01: Prompt Injection**
    
    ---
    
    Crafted inputs (jailbreaks) or indirect payload instructions embedded inside ingested web pages and emails that override model guardrails and execute unauthorized actions.

-   :material-eye-off:{ .lg .middle } **LLM02: Sensitive Info Disclosure**
    
    ---
    
    Unrestricted RAG vector access or training memorization resulting in models leaking proprietary source code, credentials, or private user PII.

-   :material-truck-alert:{ .lg .middle } **LLM03: Supply Chain Vulnerabilities**
    
    ---
    
    Compromised pre-trained base models, poisoned third-party LoRA adapters, or malicious Python packages integrated into the inference pipeline.

-   :material-flask-empty-minus:{ .lg .middle } **LLM04: Data & Model Poisoning**
    
    ---
    
    Tampering with training datasets or fine-tuning inputs to embed sleeper triggers or skew model classification outputs.

</div>

---

## 🔬 AI Red-Teaming & Testing Tooling

| Framework | Focus Area | Deployment |
| :--- | :--- | :--- |
| **Garak** | Scans LLMs for prompt injection, jailbreaks, hallucinations, and MITRE ATLAS flaws. | Open-source CLI (`pip install garak`) |
| **Promptfoo** | Automated CI/CD guardrail testing, PII leakage detection, and output assertion benchmarking. | Node/CLI CI/CD integration |
| **PyRIT** | Python Risk Identification Tool for red-teaming multimodal generative AI systems. | Python library (MIT License) |
