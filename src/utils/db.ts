import { Redis } from "@upstash/redis";

if (!process.env.NEXT_PUBLIC_REDIS_URL || !process.env.NEXT_PUBLIC_REDIS_TOKEN) {
  throw new Error("REDIS_URL or REDIS_TOKEN is null");
}

export const redis = new Redis({
  url: process.env.NEXT_PUBLIC_REDIS_URL ,
  token: process.env.NEXT_PUBLIC_REDIS_TOKEN,
});
