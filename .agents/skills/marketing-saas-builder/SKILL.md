---
name: marketing-saas-builder
description: Token-efficient builder for a Singapore/Malaysia AI marketing SaaS for small businesses. Use for website audits, market research, competitor analysis, landing page generation, product image optimization, analytics dashboards, security review, and MVP implementation.
---

# Marketing SaaS Builder Skill

You are building LocalBoost AI: an AI Marketing SaaS for small businesses in Singapore and Malaysia.

This skill must save tokens. Do not over-explain. Do not rebuild existing code. Inspect the repo first, reuse what exists, and implement only the requested step.

## Product Positioning

LocalBoost AI helps local businesses turn weak online presence into better-converting marketing assets.

Target customers:
- Restaurants
- Cafes
- Beauty salons
- Tuition centres
- Property agents
- Home service businesses
- Clinics
- Local ecommerce sellers
- SMEs with weak websites, poor product photos, and low conversion

Core promise:
Help merchants understand what is wrong, what the market wants, what competitors do better, and what to improve next.

## Unique Product Loop

Every feature should support this loop:

1. Diagnose the business
2. Find market and competitor signals
3. Generate improvement recommendations
4. Create better marketing assets
5. Track conversion signals
6. Turn report into a lead or sale

Do not build random AI tools. Build a conversion-focused growth system.

## Feature Priority

Build in this order:

1. Website Audit
2. Market Research Report
3. Competitor Signal Scanner
4. Landing Page Sample Generator
5. Product Photo Optimizer
6. Product Image Prompt Generator
7. Analytics Dashboard
8. Lead Capture
9. Payment and Usage Limits
10. Client Report Export

Avoid building complex CRM, email automation, WhatsApp automation, or full agent systems unless explicitly requested.

## Default Tech Stack

Use the existing repo stack if already present.

If the repo is empty or new, prefer:
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- Vercel
- Server routes for AI calls
- AI provider wrapper
- Mock-first/API-ready implementation

## Token Efficiency Rules

Always optimize for low token usage and low API cost.

Required:
- Reuse existing components and utilities
- Keep prompts short and structured
- Store reusable prompt templates in files
- Use JSON output from AI when possible
- Do not send full page HTML to AI if summarized content is enough
- Compress website content before AI analysis
- Cache repeated research and audit results
- Use cheap models for classification and extraction
- Use stronger models only for final strategy/report generation
- Do not include unnecessary context in API calls
- Do not regenerate reports if cached result exists
- Do not paste large unchanged code in explanations
- Do not create duplicate files

## AI Model Routing

Use a model router when implementing AI features.

Suggested routing:
- extraction: cheap model
- classification: cheap model
- summary: cheap or mid model
- strategy/report: stronger model
- image prompt generation: mid model
- code generation: handled by Codex, not app runtime

Create provider abstraction when needed:
- lib/ai/provider.ts
- lib/ai/prompts/
- lib/ai/model-router.ts

Never hardcode one provider unless requested.

Support future providers:
- OpenAI
- DeepSeek
- Claude
- Gemini
- OpenRouter

## Prompt Compression Pattern

Runtime AI prompts should follow this structure:

SYSTEM:
You are a local business marketing analyst. Be concise, practical, and conversion-focused.

INPUT:
- business_type
- location
- goal
- website_summary
- competitor_signals
- customer_pain_points

OUTPUT JSON:
- summary
- issues
- opportunities
- recommended_offer
- landing_page_angle
- ad_angle
- next_actions

Avoid long essays unless the user asks for a client-facing report.

## Website Audit Rules

When building Website Audit:
Input:
- website URL
- optional business type
- optional location
- optional goal

Output:
- first impression
- clarity score
- offer score
- CTA score
- trust score
- mobile/readability notes
- SEO basics
- conversion problems
- top 5 fixes
- suggested hero headline
- suggested CTA
- next action

Security:
- validate URL
- fetch server-side only
- block private/local network URLs
- timeout fetch requests
- limit page size
- extract only useful text
- do not store unnecessary raw HTML

## Market Research Rules

When building Market Research:
Input:
- industry
- location
- target customer
- business goal

Output:
- market summary
- customer pain points
- demand signals
- competitor signals
- common offers
- content ideas
- landing page angle
- ad angle
- recommended package
- next action

Start mock/API-ready first.
Do not implement aggressive scraping.

Allowed data:
- public business websites
- public search snippets through approved APIs
- official open data
- user-provided URLs
- public competitor landing pages

Not allowed:
- private data
- login bypass
- fake accounts
- ignoring robots.txt
- scraping personal data
- aggressive crawling
- storing unnecessary raw data

Preferred future integrations:
- Firecrawl for website extraction
- SerpAPI or Google Custom Search for search signals
- Apify only if allowed and necessary
- Data.gov.sg and Malaysia open data for official signals

## Competitor Analysis Rules

Competitor analysis should focus on:
- positioning
- offer
- CTA
- trust elements
- pricing signals if public
- content angle
- review themes if legally accessible
- gaps the client can exploit

Do not copy competitor content.
Summarize patterns.

## Landing Page Generator Rules

Generate landing page samples with:
- hero section
- pain point section
- offer section
- benefits
- proof/trust
- service/product section
- FAQ
- CTA

The output should be easy for a small business owner to understand and approve.

## Product Image Optimizer Rules

First version can be analysis + prompt generation.

Input:
- product photo
- product type
- brand style
- target platform

Output:
- photo quality issues
- background improvement
- lighting improvement
- ad creative idea
- image generation prompt
- caption
- CTA

Do not expose image API keys.
Keep upload handling safe.

## Analytics Dashboard Rules

Dashboard should show:
- visitors
- leads
- conversion rate
- audits generated
- reports generated
- image jobs
- top campaigns
- recent activity

First version may use mock data.
Prepare event tracking structure:
- page_view
- audit_generated
- research_generated
- lead_created
- conversion

## Database Rules

If Supabase is used, design tables with:
- id
- workspace_id
- user_id
- status
- created_at
- updated_at where useful

Suggested tables:
- users
- workspaces
- audit_reports
- market_research_reports
- research_sources
- competitor_profiles
- image_jobs
- analytics_events
- leads
- campaigns

Use Row Level Security when implementing real auth.

## Security Rules

Always:
- Keep API keys server-side only
- Use environment variables
- Validate input
- Sanitize URLs
- Add rate limit placeholder
- Add caching placeholder
- Use safe errors
- Never trust client-side user_id
- Avoid unnecessary personal data
- Do not expose stack traces to users
- Respect robots.txt and platform terms

## UI Rules

UI should feel like premium SaaS:
- clean layout
- clear navigation
- dashboard cards
- strong CTA
- responsive design
- loading states
- empty states
- error states
- simple language
- no clutter

Use business-friendly copy, not technical language.

## Build Behavior

Before coding:
1. Inspect repo structure
2. Identify existing stack
3. Reuse components
4. Plan minimal change
5. Implement only requested feature

After coding:
1. Summarize what was built
2. List files changed
3. List env vars
4. Explain how to test
5. Suggest next step

Do not over-explain.
Do not paste full files unless necessary.
Do not build unrelated features.

## Default MVP Pages

Use these routes unless existing routing differs:

- /
- /dashboard
- /dashboard/audit
- /dashboard/research
- /dashboard/competitors
- /dashboard/landing-page
- /dashboard/images
- /dashboard/analytics
- /dashboard/leads
- /settings

## Business Rule

Every feature must answer:
- Can a small business owner understand it in 10 seconds?
- Can this help them get more customers?
- Can this become a paid feature?
- Can the result be shown as a client sample?
- Can this reduce token/API cost?

If not, simplify.
