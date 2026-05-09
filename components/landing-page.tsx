import Link from "next/link";

const proof = [
  "Built for SG and MY merchants",
  "Mock-first, API-ready workflow",
  "Designed for low token usage"
];

const features = [
  "Website clarity audit",
  "Market demand snapshot",
  "Competitor positioning scan",
  "Landing page angle builder",
  "Product image improvement brief",
  "Conversion analytics view"
];

export function LandingPage() {
  return (
    <main className="min-h-screen bg-mist">
      <section className="relative overflow-hidden border-b border-line bg-[linear-gradient(135deg,#ffffff_0%,#eef8f6_54%,#fff4ea_100%)]">
        <div className="mx-auto grid min-h-[88vh] max-w-7xl content-center gap-10 px-6 py-10 md:grid-cols-[1.05fr_0.95fr] md:px-10">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-teal shadow-sm">
              LocalBoost AI
            </div>
            <h1 className="text-5xl font-semibold leading-tight tracking-normal text-ink md:text-7xl">
              Turn a weak online presence into a clearer path to more customers.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              A premium AI marketing workspace for local businesses. Diagnose websites, read market signals, compare competitors, and shape better offers before spending on ads.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft"
              >
                Open dashboard
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-lg border border-line bg-white px-5 py-3 text-sm font-semibold text-ink"
              >
                View modules
              </a>
            </div>
            <div className="mt-10 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
              {proof.map((item) => (
                <div key={item} className="rounded-lg border border-line bg-white/80 px-4 py-3">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[8px] border border-line bg-white p-4 shadow-soft">
            <div className="rounded-[8px] bg-ink p-5 text-white">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <span className="text-sm font-semibold">Growth report</span>
                <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold">Mock</span>
              </div>
              <div className="grid gap-3 py-5">
                {["CTA is hidden below fold", "Offer lacks urgency", "Competitors show stronger trust proof"].map((item) => (
                  <div key={item} className="rounded-lg bg-white/10 p-4 text-sm">
                    {item}
                  </div>
                ))}
              </div>
              <div className="rounded-lg bg-white p-4 text-ink">
                <p className="text-sm font-semibold">Suggested angle</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Same-week booking for busy neighbourhood customers, with proof and a stronger first-screen CTA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-ink">Foundation modules</h2>
          <p className="mt-3 text-slate-600">
            The MVP is organized around a simple loop: diagnose, compare, generate, improve, and track.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature} className="rounded-lg border border-line bg-white p-5 shadow-sm">
              <div className="mb-4 h-2 w-12 rounded-full bg-coral" />
              <h3 className="font-semibold text-ink">{feature}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
