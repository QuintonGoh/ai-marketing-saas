import { NextResponse } from "next/server";
import { getCached, setCached } from "@/lib/cache";
import { serverEnv } from "@/lib/env";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  compressWebsiteText,
  createMockAudit,
  extractUsefulText,
  fetchHtml,
  validatePublicWebsiteUrl,
  type WebsiteAuditInput,
  type WebsiteAuditResult
} from "@/lib/website-audit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const clientKey = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";

    if (!checkRateLimit(clientKey, serverEnv.rateLimitMaxRequests, serverEnv.rateLimitWindowSeconds)) {
      return NextResponse.json({ error: "Too many audit requests. Please try again soon." }, { status: 429 });
    }

    const body = (await request.json()) as Partial<WebsiteAuditInput>;
    const input = normalizeInput(body);
    const url = await validatePublicWebsiteUrl(input.websiteUrl);
    const cacheKey = `website-audit:${url.toString()}:${input.businessType}:${input.location}:${input.goal}:${serverEnv.aiProvider}`;
    const cached = getCached<WebsiteAuditResult>(cacheKey);

    if (cached) {
      return NextResponse.json({ result: cached, cached: true });
    }

    const html = await fetchHtml(url);
    const usefulText = extractUsefulText(html);
    const websiteSummary = compressWebsiteText(usefulText);

    if (!websiteSummary) {
      return NextResponse.json({ error: "Could not extract enough useful text from this page." }, { status: 422 });
    }

    if (serverEnv.aiProvider !== "mock") {
      return NextResponse.json(
        { error: "Only AI_PROVIDER=mock is implemented in this MVP." },
        { status: 501 }
      );
    }

    const result = createMockAudit(input, websiteSummary);
    setCached(cacheKey, result, serverEnv.cacheTtlSeconds);

    return NextResponse.json({ result, cached: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Website audit failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

function normalizeInput(body: Partial<WebsiteAuditInput>): WebsiteAuditInput {
  const websiteUrl = String(body.websiteUrl ?? "").trim();

  if (!websiteUrl) {
    throw new Error("Website URL is required.");
  }

  return {
    websiteUrl,
    businessType: String(body.businessType ?? "").trim().slice(0, 80),
    location: String(body.location ?? "").trim().slice(0, 80),
    goal: String(body.goal ?? "").trim().slice(0, 120)
  };
}
