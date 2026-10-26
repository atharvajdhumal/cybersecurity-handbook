import os
import time
import datetime
import feedparser
from google import genai

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
            for entry in parsed.entries[:5]:
                published = None
                if hasattr(entry, 'published_parsed') and entry.published_parsed:
                    published = datetime.datetime(*entry.published_parsed[:6], tzinfo=datetime.timezone.utc)
                
                if not published or published > cutoff:
                    raw_articles.append({
                        "source": source,
                        "title": entry.title,
                        "link": entry.link,
                        "summary": entry.get("summary", "")[:350]
                    })
        except Exception as e:
            print(f"Notice: Could not parse {source}: {e}")
    return raw_articles

def generate_daily_brief(articles):
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable is missing.")
        
    client = genai.Client(api_key=api_key)
    today_str = datetime.datetime.now().strftime("%Y-%m-%d")

    prompt = f"""
    You are an expert Chief Information Security Officer (CISO) and lead technical architect.
    Synthesize these recent cybersecurity news items into an authoritative Daily Threat Brief for {today_str}:
    {articles}

    Output valid Markdown following this structure:

    # Global Threat Intelligence Brief: {today_str}

    ## 1. Executive Incident Matrix
    Table format:
    | Incident / CVE | Core Domain | Primary Vector | NIST CSF 2.0 Impact | Source Link |

    ## 2. Technical Vulnerability Deep-Dive
    Select the single most critical threat or CVE from the feed:
    - **Mechanism**: How the exploit works technically.
    - **Mitigation & IOCs**: Patch levels, hashes, or configuration blocks.

    ## 3. Multi-Audience Action Plan
    - **For Beginners & Employees**: 2 sentences explaining the impact in plain English, and 1 actionable habit to practice.
    - **For Certification Students (CompTIA SecurityX CAS-005 / CISSP)**: Provide 1 scenario-based multiple-choice question testing concepts from this incident, followed by the correct answer and a brief rationale.
    - **For SOC Analysts & Engineers**: Specific detection rule concept (Suricata, Zeek, or YARA rule logic).
    """

    # Retry loop to handle temporary 503 high-demand spikes
    max_retries = 3
    for attempt in range(1, max_retries + 1):
        try:
            print(f"Calling Gemini API (Attempt {attempt} of {max_retries})...")
            response = client.models.generate_content(
                model='gemini-3.8-flash',
                contents=prompt,
            )
            return response.text
        except Exception as e:
            print(f"Attempt {attempt} failed: {e}")
            if attempt < max_retries:
                wait_seconds = attempt * 12
                print(f"Waiting {wait_seconds}s before retrying...")
                time.sleep(wait_seconds)
            else:
                raise e

def update_docs():
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    articles = fetch_recent_entries()
    
    if not articles:
        print("No articles fetched from feeds.")
        return

    report_md = generate_daily_brief(articles)
    
    os.makedirs("docs/news/archive", exist_ok=True)
    with open(f"docs/news/archive/{today}.md", "w", encoding="utf-8") as f:
        f.write(report_md)
        
    with open("docs/news/index.md", "w", encoding="utf-8") as f:
        f.write(f"# Latest Daily Cyber Threat Intelligence\n\n")
        f.write(f"*Last updated: {today}*\n\n---\n\n")
        f.write(report_md)
        f.write("\n\n---\n## Historical Threat Archives\n")
        f.write(f"- [{today} Intelligence Report](archive/{today}.md)\n")

if __name__ == "__main__":
    update_docs()
