import { FeaturePage } from "@/components/feature-page";

export default function ResearchPage() {
  return (
    <FeaturePage
      title="Market Research"
      description="Prepare a concise market snapshot for local demand, customer pains, offers, and content angles."
      inputs={["Industry", "Location", "Target customer", "Business goal"]}
      outputs={["Market summary", "Customer pain points", "Demand signals", "Common offers", "Recommended package"]}
      cta="Create mock research"
    />
  );
}
