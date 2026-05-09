import type { AiProviderName, AiTask } from "@/lib/ai/provider";

type ModelRoute = {
  provider: AiProviderName;
  model: string;
  maxInputTokens: number;
};

const routes: Record<AiTask, ModelRoute> = {
  extraction: { provider: "mock", model: "cheap-extraction", maxInputTokens: 1200 },
  classification: { provider: "mock", model: "cheap-classifier", maxInputTokens: 1000 },
  summary: { provider: "mock", model: "cheap-summary", maxInputTokens: 1600 },
  strategy: { provider: "mock", model: "strong-report", maxInputTokens: 2200 },
  imagePrompt: { provider: "mock", model: "mid-image-prompt", maxInputTokens: 1200 }
};

export function routeModel(task: AiTask): ModelRoute {
  return routes[task];
}
