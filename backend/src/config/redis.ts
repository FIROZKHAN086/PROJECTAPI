import {Redis} from "ioredis";



const redis = new Redis(process.env.REDIS_URL!);


redis.on("connect", () => {
  console.log("Redis Connected");
});

redis.on("error", (err:any) => {
  console.log("Redis Error:", err);
});

export default redis;