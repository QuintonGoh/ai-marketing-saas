import { lookup } from "node:dns/promises";
import net from "node:net";

export type WebsiteAuditInput = {
  websiteUrl: string;
  businessType: string;
  location: string;
  goal: string;
};

export type WebsiteAuditResult = {
  first_impression: string;
  clarity_score: number;
  offer_score: number;
  cta_score: number;
  trust_score: number;
  seo_notes: string[];
  conversion_problems: string[];
  top_5_fixes: string[];
  suggested_hero_headline: string;
  suggested_cta: string;
  next_action: string;
};

const MAX_HTML_BYTES = 500_000;
const MAX_TEXT_CHARS = 6_000;
const FETCH_TIMEOUT_MS = 8_000;
const MAX_REDIRECTS = 3;
const BLOCKED_HOSTS = new Set(["localhost", "localhost.localdomain"]);

export async function validatePublicWebsiteUrl(rawUrl: string): Promise<URL> {
  let url: URL;

  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("Enter a valid website URL.");
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Only http and https URLs are supported.");
  }

  const hostname = url.hostname.toLowerCase();
  if (!hostname || BLOCKED_HOSTS.has(hostname) || hostname.endsWith(".local") || hostname.endsWith(".internal")) {
    throw new Error("Internal network URLs are not allowed.");
  }

  const literalIpVersion = net.isIP(hostname);
  const addresses = literalIpVersion ? [{ address: hostname }] : await lookup(hostname, { all: true, verbatim: false });

  if (addresses.length === 0 || addresses.some(({ address }) => isBlockedIp(address))) {
    throw new Error("Private, local, and internal network URLs are not allowed.");
  }

  return url;
}

export async function fetchHtml(url: URL, redirects = 0): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "manual",
      headers: {
        accept: "text/html,application/xhtml+xml",
        "user-agent": "LocalBoostAI/0.1 WebsiteAuditBot"
      }
    });

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      if (redirects >= MAX_REDIRECTS) {
        throw new Error("Website redirected too many times.");
      }

      const location = response.headers.get("location");
      if (!location) {
        throw new Error("Website redirect was missing a location.");
      }

      const nextUrl = await validatePublicWebsiteUrl(new URL(location, url).toString());
      return fetchHtml(nextUrl, redirects + 1);
    }

    if (!response.ok) {
      throw new Error("Website returned an error.");
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) {
      throw new Error("The URL does not look like an HTML page.");
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Could not read website response.");
    }

    const chunks: Uint8Array[] = [];
    let received = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      received += value.byteLength;
      if (received > MAX_HTML_BYTES) {
        throw new Error("Website page is too large to audit in the MVP.");
      }

      chunks.push(value);
    }

    return new TextDecoder("utf-8", { fatal: false }).decode(concatChunks(chunks, received));
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Website fetch timed out.");
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export function extractUsefulText(html: string): string {
  return decodeHtmlEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<(nav|footer|header|svg|form|button)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

export function compressWebsiteText(text: string): string {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 30);

  const unique = Array.from(new Set(sentences));
  const compressed = unique.join(" ").slice(0, MAX_TEXT_CHARS);

  return compressed || text.slice(0, MAX_TEXT_CHARS);
}

export function createMockAudit(input: WebsiteAuditInput, websiteSummary: string): WebsiteAuditResult {
  const business = input.businessType || "local business";
  const location = input.location || "Singapore or Malaysia";
  const goal = input.goal || "get more enquiries";
  const hasShortSummary = websiteSummary.length < 700;
  const copy = generateMockMarketingCopy(business, location, goal);

  return {
    first_impression: `The site has the foundation of a credible ${business}, but it would convert better if the first screen made the offer, location, and next step feel more immediate to buyers in ${location}.`,
    clarity_score: hasShortSummary ? 58 : 72,
    offer_score: 64,
    cta_score: 55,
    trust_score: 60,
    seo_notes: [
      "Make the page title and main heading describe the service, location, and buyer outcome.",
      "Add concise service sections that match likely local search terms.",
      "Use clearer internal headings so search engines and visitors can scan the page quickly."
    ],
    conversion_problems: [
      "The first screen may not explain the core offer fast enough.",
      "The call to action is not repeated clearly across the page.",
      "Trust proof such as reviews, case results, certifications, or customer photos could be more visible.",
      "Visitors may need more specific reasons to choose this business over nearby alternatives."
    ],
    top_5_fixes: [
      "Rewrite the hero headline around the customer outcome and location.",
      "Place one primary CTA above the fold and repeat it after key sections.",
      "Add three proof points: reviews, years served, before/after results, or recognizable clients.",
      "Create a simple offer block with price, package, or booking expectation if appropriate.",
      "Add a short FAQ that answers objections about timing, pricing, quality, and availability."
    ],
    suggested_hero_headline: copy.heroHeadline,
    suggested_cta: copy.cta,
    next_action: `Update the hero with "${copy.heroHeadline}" and use "${copy.cta}" as the primary call to action before testing the page again.`
  };
}

function generateMockMarketingCopy(
  businessType: string,
  location: string,
  goal: string
): { heroHeadline: string; cta: string } {
  const business = businessType.toLowerCase();
  const cleanLocation = formatLocation(location);
  const wantsBookings = /book|reservation|reserve|appointment|table|visit/i.test(goal);
  const wantsLeads = /lead|enquir|inquir|consult|quote|call|whatsapp/i.test(goal);
  const wantsSales = /sale|order|buy|purchase|shop|online/i.test(goal);

  if (business.includes("cafe") || business.includes("restaurant") || business.includes("brunch")) {
    return wantsBookings
      ? {
          heroHeadline: `Reserve a Table for Your Next Brunch in ${cleanLocation}`,
          cta: "View menu and reserve"
        }
      : {
          heroHeadline: `Your Neighbourhood Cafe for Brunch, Coffee, and Easy Meetups in ${cleanLocation}`,
          cta: "View the menu"
        };
  }

  if (business.includes("salon") || business.includes("beauty") || business.includes("spa")) {
    return {
      heroHeadline: `Look Fresh for the Week Ahead with Trusted Beauty Services in ${cleanLocation}`,
      cta: wantsBookings ? "Book an appointment" : "View treatments"
    };
  }

  if (business.includes("tuition") || business.includes("education") || business.includes("learning")) {
    return {
      heroHeadline: `Confident Exam Prep and Personalised Tuition in ${cleanLocation}`,
      cta: wantsLeads ? "Book a trial class" : "View programmes"
    };
  }

  if (business.includes("clinic") || business.includes("dental") || business.includes("health")) {
    return {
      heroHeadline: `Clear, Convenient Care from a Trusted Clinic in ${cleanLocation}`,
      cta: wantsBookings ? "Book an appointment" : "Speak to the clinic"
    };
  }

  if (business.includes("property") || business.includes("agent") || business.includes("realtor")) {
    return {
      heroHeadline: `Find the Right Buyer or Home with Local Property Guidance in ${cleanLocation}`,
      cta: wantsLeads ? "Request a property consult" : "View available listings"
    };
  }

  if (business.includes("ecommerce") || business.includes("product") || business.includes("shop")) {
    return {
      heroHeadline: `Shop Practical, Well-Chosen Products Delivered from ${cleanLocation}`,
      cta: wantsSales ? "Shop best sellers" : "Browse products"
    };
  }

  if (business.includes("home") || business.includes("repair") || business.includes("cleaning") || business.includes("service")) {
    return {
      heroHeadline: `Reliable Local Services for Busy Homeowners in ${cleanLocation}`,
      cta: wantsLeads ? "Get a quick quote" : "Check availability"
    };
  }

  return {
    heroHeadline: `A Better Way to Choose a Trusted Local ${titleCase(businessType)} in ${cleanLocation}`,
    cta: wantsBookings ? "Book a consultation" : wantsSales ? "View packages" : "Get a recommendation"
  };
}

function formatLocation(location: string): string {
  const trimmed = location.trim();
  return trimmed || "Singapore";
}

function titleCase(value: string): string {
  return value
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function isBlockedIp(address: string): boolean {
  if (address.startsWith("::ffff:")) {
    return isBlockedIp(address.slice(7));
  }

  if (net.isIPv4(address)) {
    const [a, b] = address.split(".").map(Number);
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      a === 169 && b === 254 ||
      a === 172 && b >= 16 && b <= 31 ||
      a === 192 && b === 168 ||
      a === 100 && b >= 64 && b <= 127 ||
      a === 192 && b === 0 ||
      a === 192 && b === 2 ||
      a === 198 && (b === 18 || b === 19 || b === 51) ||
      a === 203 && b === 0 ||
      a >= 224
    );
  }

  const normalized = address.toLowerCase();
  return (
    normalized === "::1" ||
    normalized === "::" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    normalized.startsWith("fe80:")
  );
}

function concatChunks(chunks: Uint8Array[], totalLength: number): Uint8Array {
  const result = new Uint8Array(totalLength);
  let offset = 0;

  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return result;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}
