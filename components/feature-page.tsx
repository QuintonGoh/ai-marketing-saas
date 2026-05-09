type FeaturePageProps = {
  title: string;
  description: string;
  inputs: string[];
  outputs: string[];
  cta: string;
};

export function FeaturePage({ title, description, inputs, outputs, cta }: FeaturePageProps) {
  return (
    <section>
      <div className="mb-6 rounded-lg border border-line bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-normal text-teal">MVP module</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">{title}</h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">{description}</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <form className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">Mock input</h2>
          <div className="mt-4 grid gap-4">
            {inputs.map((input) => (
              <label key={input} className="grid gap-2 text-sm font-medium text-slate-700">
                {input}
                <input
                  className="rounded-lg border border-line px-3 py-2.5 outline-none focus:border-teal"
                  placeholder={`Enter ${input.toLowerCase()}`}
                />
              </label>
            ))}
          </div>
          <button
            type="button"
            className="mt-5 w-full rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-white"
          >
            {cta}
          </button>
        </form>
        <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">Mock output</h2>
          <div className="mt-4 grid gap-3">
            {outputs.map((output) => (
              <div key={output} className="rounded-lg border border-line bg-mist p-4">
                <p className="text-sm font-semibold text-ink">{output}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Placeholder result ready for a cached, rate-limited server route.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
