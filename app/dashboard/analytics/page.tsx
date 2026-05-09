import { MetricCard } from "@/components/metric-card";

const metrics = [
  { label: "Audits generated", value: "18", note: "Mock monthly total" },
  { label: "Research reports", value: "9", note: "Mock monthly total" },
  { label: "Image jobs", value: "15", note: "Prompt briefs created" },
  { label: "Lead events", value: "31", note: "Tracked conversion signals" }
];

const events = ["page_view", "audit_generated", "research_generated", "lead_created", "conversion"];

export default function AnalyticsPage() {
  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-normal text-teal">Analytics</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">Conversion signals</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Mock analytics prepared for future event tracking and report attribution.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>
      <div className="mt-6 rounded-lg border border-line bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">Event structure</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {events.map((event) => (
            <div key={event} className="rounded-lg bg-mist p-4 text-sm font-semibold text-slate-700">
              {event}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
