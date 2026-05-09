"use client";

import { FormEvent, useState } from "react";
import type { WebsiteAuditResult } from "@/lib/website-audit";

type AuditState =
  | { status: "empty" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; result: WebsiteAuditResult; cached: boolean };

const scoreLabels = [
  ["clarity_score", "Clarity"],
  ["offer_score", "Offer"],
  ["cta_score", "CTA"],
  ["trust_score", "Trust"]
] as const;

export function AuditForm() {
  const [state, setState] = useState<AuditState>({ status: "empty" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "loading" });

    const formData = new FormData(event.currentTarget);
    const payload = {
      websiteUrl: String(formData.get("websiteUrl") ?? ""),
      businessType: String(formData.get("businessType") ?? ""),
      location: String(formData.get("location") ?? ""),
      goal: String(formData.get("goal") ?? "")
    };

    try {
      const response = await fetch("/api/website-audit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Audit failed.");
      }

      setState({ status: "success", result: data.result, cached: Boolean(data.cached) });
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Audit failed."
      });
    }
  }

  return (
    <section>
      <div className="mb-6 rounded-lg border border-line bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-normal text-teal">Website Audit</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">Find the conversion leaks</h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Enter a public website and get a practical audit for clarity, offer, CTA, trust, SEO basics, and next fixes.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <form onSubmit={handleSubmit} className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">Audit input</h2>
          <div className="mt-4 grid gap-4">
            <Field name="websiteUrl" label="Website URL" placeholder="https://example.com" type="url" required />
            <Field name="businessType" label="Business type" placeholder="Cafe, clinic, salon, tuition centre" />
            <Field name="location" label="Location" placeholder="Singapore, Johor Bahru, Kuala Lumpur" />
            <Field name="goal" label="Goal" placeholder="Get more bookings, leads, enquiries, sales" />
          </div>
          <button
            type="submit"
            disabled={state.status === "loading"}
            className="mt-5 w-full rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {state.status === "loading" ? "Auditing website..." : "Run website audit"}
          </button>
        </form>

        <AuditResult state={state} />
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required = false
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-lg border border-line px-3 py-2.5 outline-none focus:border-teal"
        placeholder={placeholder}
      />
    </label>
  );
}

function AuditResult({ state }: { state: AuditState }) {
  if (state.status === "loading") {
    return (
      <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">Audit in progress</h2>
        <div className="mt-5 grid gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-20 animate-pulse rounded-lg bg-mist" />
          ))}
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="rounded-lg border border-coral bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">Audit blocked</h2>
        <p className="mt-3 rounded-lg bg-red-50 p-4 text-sm leading-6 text-red-700">{state.message}</p>
      </div>
    );
  }

  if (state.status === "empty") {
    return (
      <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">Audit result</h2>
        <p className="mt-3 rounded-lg bg-mist p-4 text-sm leading-6 text-slate-600">
          Results will appear here after the server safely fetches and summarizes the website.
        </p>
      </div>
    );
  }

  const { result } = state;

  return (
    <div className="grid gap-4">
      <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-ink">Audit result</h2>
          {state.cached ? <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-teal">Cached</span> : null}
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">{result.first_impression}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {scoreLabels.map(([key, label]) => (
          <div key={key} className="rounded-lg border border-line bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-ink">{result[key]}</p>
          </div>
        ))}
      </div>

      <ResultCard title="SEO notes" items={result.seo_notes} />
      <ResultCard title="Conversion problems" items={result.conversion_problems} />
      <ResultCard title="Top 5 fixes" items={result.top_5_fixes} ordered />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-teal">Suggested hero headline</p>
          <p className="mt-3 text-lg font-semibold leading-7 text-ink">{result.suggested_hero_headline}</p>
        </div>
        <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-teal">Suggested CTA</p>
          <p className="mt-3 text-lg font-semibold text-ink">{result.suggested_cta}</p>
        </div>
      </div>

      <div className="rounded-lg border border-line bg-ink p-5 text-white shadow-sm">
        <p className="text-sm font-semibold text-gold">Next action</p>
        <p className="mt-3 text-sm leading-6 text-white/85">{result.next_action}</p>
      </div>
    </div>
  );
}

function ResultCard({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <List className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item} className="rounded-lg bg-mist p-3">
            {item}
          </li>
        ))}
      </List>
    </div>
  );
}
