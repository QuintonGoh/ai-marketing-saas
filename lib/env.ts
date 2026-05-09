export const serverEnv = {
  aiProvider: process.env.AI_PROVIDER ?? "mock",
  cacheTtlSeconds: Number(process.env.CACHE_TTL_SECONDS ?? 86400),
  rateLimitWindowSeconds: Number(process.env.RATE_LIMIT_WINDOW_SECONDS ?? 60),
  rateLimitMaxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 20)
};
