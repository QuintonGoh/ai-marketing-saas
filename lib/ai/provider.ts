export type AiProviderName = "mock" | "openai" | "deepseek" | "claude" | "gemini" | "openrouter";

export type AiTask = "extraction" | "classification" | "summary" | "strategy" | "imagePrompt";

export type AiProviderRequest = {
  task: AiTask;
  prompt: string;
  input: Record<string, unknown>;
};

export type AiProviderResponse = {
  model: string;
  json: Record<string, unknown>;
};

export async function runAiProvider(request: AiProviderRequest): Promise<AiProviderResponse> {
  return {
    model: `mock:${request.task}`,
    json: {
      status: "mock",
      summary: "Provider placeholder. Wire real server-side AI calls here."
    }
  };
}
