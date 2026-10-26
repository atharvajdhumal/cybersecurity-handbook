# Artificial Intelligence (AI) Security

AI Security focuses on defending enterprise systems against automated AI cyberattacks while securing machine learning models, RAG architectures, and agentic workflows against manipulation.

## OWASP Top 10 for LLM Applications

* **LLM01: Prompt Injection**: Crafting direct jailbreak inputs or planting indirect instructions within ingested documents or emails to hijack model execution and tool actions.
* **LLM02: Sensitive Information Disclosure**: Models leaking private customer PII, internal system prompts, or embedded API keys due to missing RAG access controls.
* **LLM03: Supply Chain Vulnerabilities**: Compromised base models, backdoored public weights, or poisoned open-source libraries integrated into production workflows.
* **LLM04: Data & Model Poisoning**: Intentionally corrupting training sets or fine-tuning datasets to introduce sleeper backdoors or bias classification outcomes.

## Automated AI Red-Teaming Tools
* **Garak**: Open-source vulnerability scanner evaluating LLMs for prompt injection, jailbreaks, and hallucinations.
* **Promptfoo**: Continuous testing CLI for evaluating prompt security, PII leakage, and output guardrails.
