import { FeaturePage } from "@/components/feature-page";

export default function ImagesPage() {
  return (
    <FeaturePage
      title="Product Image Optimizer"
      description="First version focuses on image critique and prompt generation, with no image API calls in the browser."
      inputs={["Product type", "Brand style", "Target platform", "Creative goal"]}
      outputs={["Photo quality issues", "Lighting improvement", "Background idea", "Image prompt", "Caption and CTA"]}
      cta="Create mock image brief"
    />
  );
}
