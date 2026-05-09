import { FeaturePage } from "@/components/feature-page";

export default function LandingPageGeneratorPage() {
  return (
    <FeaturePage
      title="Landing Page Generator"
      description="Shape a client-friendly page outline with hero, pain points, offer, benefits, proof, FAQ, and CTA."
      inputs={["Business type", "Main offer", "Audience", "Proof points"]}
      outputs={["Hero section", "Pain points", "Offer section", "Benefits", "FAQ and CTA"]}
      cta="Draft mock page"
    />
  );
}
