import { Redis } from "ioredis";

const cleanRedisUrl = (process.env.REDIS_URL || "").replace(/^["']|["']$/g, "");
const redis = new Redis(cleanRedisUrl);

redis.on("connect", () => {
  console.log("Redis Connected");
});

redis.on("error", (err: any) => {
  console.log("Redis Error:", err);
});

export default redis;
