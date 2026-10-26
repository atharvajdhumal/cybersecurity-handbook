import os
import datetime
import feedparser
from google import genai

# 1. Primary threat intelligence and security advisory feeds
FEEDS = {
    "CISA Alerts": "https://www.cisa.gov/cybersecurity-advisories/all.xml",
    "CISA ICS": "https://www.cisa.gov/cybersecurity-advisories/ics-advisories.xml",
    "The Hacker News": "https://thehackernews.com/feeds/posts/default",
    "BleepingComputer": "https://www.bleepingcomputer.com/feed/",
    "Dark Reading": "https://www.darkreading.com/rss.xml"
}

def fetch_recent_entries():
    raw_articles = []
    cutoff = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=36)
    
    for source, url in FEEDS.items():
        parsed = feedparser.parse(url)
        for entry in parsed.entries[:6]:  # inspect top 6 per source
            published = None
            if hasattr(entry, 'published_parsed') and entry.published_parsed:
                published = datetime.datetime(*entry.published_parsed[:6], tzinfo=datetime.timezone.utc)
            
            if not published or published > cutoff:
                raw_articles.append({
                    "source": source,
                    "title": entry.title,
                    "link": entry.link,
                    "summary": entry.get("summary", "")[:400]
                })
    return raw_articles

def generate_daily_brief(articles):
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("Missing GEMINI_API_KEY environment variable.")
        
    client = genai.Client(api_key=api_key)
    today_str = datetime.datetime.now().strftime("%Y-%m-%d")

    prompt = f"""
    You are an expert Chief Information Security Officer (CISO) and lead technical architect.
    Below is a collection of cybersecurity news, vulnerabilities, and advisories collected over the last 24 hours:
    {articles}

    Create a comprehensive Daily Cybersecurity Intelligence Digest for {today_str} in clean Markdown.
    Follow this exact format:

    # Global Threat Intelligence Brief: {today_str}

    ## 1. Executive Incident Matrix
    Table with columns:
    | Incident / Vulnerability | Core Domain | Primary Vector | NIST CSF 2.0 Impact | Attribution / Target | Source Link |

    ## 2. Technical Deep-Dive of the Day
    Pick the single most critical breach or CVE from the feed:
    - **Technical Mechanism**: How it works (reverse proxy bypass, token theft, living-off-the-land, etc.).
    - **Affected Versions & Immediate Mitigation**: Versions, patches, or IOCs.

    ## 3. Multi-Tier Audience Breakdown
    - **For Absolute Beginners & Employees**: 2 sentences explaining why this matters in everyday terms, plus one personal security habit to practice.
    - **Certification Exam Question (CompTIA SecurityX CAS-005 / CISSP)**: Provide 1 realistic scenario-based multiple-choice question testing the concepts behind this incident, followed by the correct answer and a brief technical rationale.
    - **For SOC Analysts & Engineers**: Specific detection rule concept (Zeek, Suricata, or YARA logic) or defensive configuration to implement.
    - **For Leadership & GRC**: Risk governance takeaway under NIST CSF 2.0 (Govern / Identify).

    Ensure all Markdown tables and syntax are valid. Keep links as clean markdown citations.
    """

    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
    )
    return response.text

def update_docs():
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    articles = fetch_recent_entries()
    
    if not articles:
        print("No new articles found today.")
        return

    report_md = generate_daily_brief(articles)
    
    # Save the individual day's news post
    os.makedirs("docs/news/archive", exist_ok=True)
    daily_file = f"docs/news/archive/{today}.md"
    with open(daily_file, "w", encoding="utf-8") as f:
        f.write(report_md)
        
    # Update the primary news hub page
    with open("docs/news/index.md", "w", encoding="utf-8") as f:
        f.write(f"# Latest Daily Cyber Threat Intelligence\n\n")
        f.write(f"*Last updated automatically: {today}*\n\n---\n\n")
        f.write(report_md)
        f.write("\n\n---\n## Historical Threat Archives\n")
        f.write(f"- [{today} Intelligence Report](archive/{today}.md)\n")

if __name__ == "__main__":
    update_docs()