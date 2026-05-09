import { FeaturePage } from "@/components/feature-page";

export default function CompetitorsPage() {
  return (
    <FeaturePage
      title="Competitor Scanner"
      description="Compare positioning, offers, CTAs, trust proof, and gaps a client can use to stand out."
      inputs={["Business name", "Location", "Competitor URLs", "Offer category"]}
      outputs={["Positioning patterns", "CTA comparison", "Trust signals", "Pricing signals", "Opportunity gaps"]}
      cta="Run mock scan"
    />
  );
}
