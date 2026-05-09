import { MetricCard } from "@/components/metric-card";

const metrics = [
  { label: "Visitors", value: "2,840", note: "Mock traffic this month" },
  { label: "Leads", value: "86", note: "Forms, calls, and WhatsApp clicks" },
  { label: "Conversion rate", value: "3.0%", note: "Lead conversion estimate" },
  { label: "Reports generated", value: "42", note: "Audit and research reports" }
];

const activity = [
  "Website audit drafted for neighbourhood cafe",
  "Competitor scan found 3 stronger offers",
  "Landing page angle prepared for tuition centre",
  "Image prompt generated for ecommerce product"
];

export default function DashboardPage() {
  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-normal text-teal">Dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">Growth command centre</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          A mock overview of the core LocalBoost loop: diagnose, improve, and track conversion signals.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">Top campaigns</h2>
          <div className="mt-4 grid gap-3">
            {["Cafe weekday lunch offer", "Salon first-visit package", "Tuition exam prep page"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-lg bg-mist p-4">
                <span className="text-sm font-medium text-slate-700">{item}</span>
                <span className="text-sm font-semibold text-teal">Mock</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">Recent activity</h2>
          <div className="mt-4 grid gap-3">
            {activity.map((item) => (
              <p key={item} className="rounded-lg border border-line p-3 text-sm text-slate-600">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
