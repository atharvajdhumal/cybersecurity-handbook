import os
import json
import time
import datetime
import feedparser
from google import genai
from google.genai import types

FEEDS = {
    "CISA Alerts": "https://www.cisa.gov/cybersecurity-advisories/all.xml",
    "CISA ICS": "https://www.cisa.gov/cybersecurity-advisories/ics-advisories.xml",
    "The Hacker News": "https://thehackernews.com/feeds/posts/default",
    "BleepingComputer": "https://www.bleepingcomputer.com/feed/",
    "Dark Reading": "https://www.darkreading.com/rss.xml"
}


def fetch_recent_entries():
    raw_articles = []
    cutoff = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=48)

    for source, url in FEEDS.items():
        try:
            parsed = feedparser.parse(url)
            for entry in parsed.entries[:6]:
                published = None
                if hasattr(entry, "published_parsed") and entry.published_parsed:
                    published = datetime.datetime(
                        *entry.published_parsed[:6], tzinfo=datetime.timezone.utc
                    )

                if not published or published > cutoff:
                    raw_articles.append({
                        "source": source,
                        "title": entry.get("title", ""),
                        "link": entry.get("link", ""),
                        "summary": entry.get("summary", "")[:400]
                    })
        except Exception as e:
            print(f"Notice: Could not parse {source}: {e}")
    return raw_articles


def generate_daily_threats_json(articles):
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable is missing.")

    client = genai.Client(api_key=api_key)
    now_utc = datetime.datetime.now(datetime.timezone.utc)
    today_iso = now_utc.strftime("%Y-%m-%dT%H:%M:%SZ")
    today_str = now_utc.strftime("%Y-%m-%d")

    prompt = f"""
    You are an expert Chief Information Security Officer (CISO) and Principal Security Architect.
    Synthesize these recent cybersecurity news items into a structured JSON payload for the
    "CYBERDEFENSE // GLOBAL INTEL HUB" web application for {today_str}:

    RAW FEED ARTICLES:
    {json.dumps(articles, indent=2)}

    Return ONLY valid JSON matching this exact structure (no markdown code fences around the JSON):
    {{
      "lastUpdated": "{today_iso}",
      "feedStatus": "LIVE // AUTONOMOUS CISA KEV & TELEMETRY CORRELATION ({today_str})",
      "threatLevel": "CRITICAL (DEFCON 2)",
      "summaryMetrics": {{
        "activeKevExploits": 14,
        "zeroDaysTracked24h": 4,
        "avgTimeToExploitHours": 6.2,
        "globalRansomwareVictims24h": 35
      }},
      "attackLog": [
        {{
          "id": "INC-{today_str}-01",
          "incidentOrCve": "Name of Incident or CVE ID",
          "target": "Targeted software, appliance, or sector",
          "domain": "One of: Application Security | Identity & Access Management | Cloud Security | Endpoint Security | Network Security | AI & LLM Security | OT / ICS Security",
          "severity": "CRITICAL or HIGH",
          "cvss": "9.8",
          "attackVector": "Technical summary of how the exploit or intrusion operates",
          "immediateSolution": "Concrete patch version, WAF rule, or architectural mitigation",
          "nistImpact": ["Protect (PR.PS-02)", "Detect (DE.CM-01)", "Respond (RS.MI-01)"],
          "source": "Source Name"
        }}
      ],
      "deepDives": [
        {{
          "id": "dd-01",
          "badge": "DEEP DIVE #01 // CATEGORY",
          "title": "Full Technical Title of Incident #1",
          "cve": "CVE-YYYY-XXXXX or MITRE Technique",
          "cvss": "9.8 CRITICAL",
          "domain": "Core Security Domain",
          "nistMapping": "NIST CSF 2.0 Subcategories",
          "whatHappened": "Detailed paragraph explaining operational context and impact.",
          "technicalMechanism": "Detailed multi-sentence explanation of the underlying exploit mechanism.",
          "asciiFlow": "[Attacker] ──► [Vulnerable Component] ──► [Impact]",
          "remediation": [
            "Step 1 remediation",
            "Step 2 compensating control",
            "Step 3 hunting/verification"
          ],
          "lessonsLearned": "Architectural takeaway for principal engineers."
        }}
      ],
      "dailyQuestions": [
        {{
          "id": "q-secplus-01",
          "examBadge": "CompTIA Security+ (SY0-701)",
          "domain": "Domain 4.0: Security Operations",
          "scenario": "Scenario based on today's incidents...",
          "options": [
            "A) Option 1",
            "B) Option 2",
            "C) Option 3",
            "D) Option 4"
          ],
          "correctIndex": 1,
          "rationale": "Detailed explanation of why the correct option is right and others are wrong."
        }},
        {{
          "id": "q-secx-01",
          "examBadge": "CompTIA SecurityX (CAS-005)",
          "domain": "Domain 2.0: Security Architecture",
          "scenario": "Advanced principal architect scenario based on today's incidents...",
          "options": [
            "A) Option 1",
            "B) Option 2",
            "C) Option 3",
            "D) Option 4"
          ],
          "correctIndex": 1,
          "rationale": "Detailed architectural rationale."
        }}
      ],
      "detectionRules": [
        {{
          "id": "rule-suricata-01",
          "type": "SURICATA IDS / IPS RULE",
          "title": "Suricata rule title targeting today's primary vulnerability",
          "targetEngine": "Suricata 7.x+",
          "mitreTechnique": "T1190 - Exploit Public-Facing Application",
          "code": "alert http $EXTERNAL_NET any -> $HTTP_SERVERS $HTTP_PORTS (msg:\\"ET EXPLOIT...\\"; sid:20269901; rev:1;)"
        }},
        {{
          "id": "rule-sigma-01",
          "type": "SIGMA SIEM / EDR RULE",
          "title": "Sigma rule title targeting today's post-exploitation behavior",
          "targetEngine": "Wazuh / Splunk / Sentinel",
          "mitreTechnique": "T1059 - Command and Scripting Interpreter",
          "code": "title: Suspicious Process Execution\\nstatus: production\\nlogsource:\\n  category: process_creation\\n..."
        }}
      ]
    }}

    Requirements:
    - Include 8 to 10 items in `attackLog`.
    - Include exactly 3 rich items in `deepDives`.
    - Include exactly 2 items in `dailyQuestions` (1 Security+ SY0-701 and 1 SecurityX CAS-005).
    - Include 2 items in `detectionRules` (1 Suricata rule and 1 Sigma rule).
    """

    max_retries = 3
    for attempt in range(1, max_retries + 1):
        try:
            print(f"Calling Gemini API gemini-3.8-flash (Attempt {attempt} of {max_retries})...")
            response = client.models.generate_content(
                model="gemini-3.8-flash",
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json"
                )
            )
            raw_text = response.text.strip()
            if raw_text.startswith("```"):
                raw_text = raw_text.strip("`")
                if raw_text.startswith("json"):
                    raw_text = raw_text[4:].strip()
            parsed_json = json.loads(raw_text)
            return parsed_json
        except Exception as e:
            print(f"Attempt {attempt} failed: {e}")
            if attempt < max_retries:
                wait_seconds = attempt * 12
                print(f"Waiting {wait_seconds}s before retrying...")
                time.sleep(wait_seconds)
            else:
                raise e


def update_threat_feed():
    today = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d")
    articles = fetch_recent_entries()

    if not articles:
        print("No articles fetched from RSS feeds. Exiting without overwriting.")
        return

    payload = generate_daily_threats_json(articles)

    # Ensure target directories exist
    os.makedirs("public/data/archive", exist_ok=True)

    # Write primary React threat intelligence feed
    output_path = os.path.join("public", "data", "daily-threats.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)
    print(f"Successfully updated {output_path}")

    # Save dated historical snapshot
    archive_path = os.path.join("public", "data", "archive", f"{today}.json")
    with open(archive_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)
    print(f"Saved archive snapshot to {archive_path}")


if __name__ == "__main__":
    update_threat_feed()
