import { redis } from "../app.js";

const rateLimmiter = async (req, res, next) => {
  const ip = req.ip;
  const key = `rate_limiter:${ip}`;
  const request = await redis.incr(key);

  if (request == 1) {
    await redis.expire(key, 60);
  }

  //   Agar ek min m 5 req toh block for 1 min
  if (request > 5) {
    return res.status(429).json({ message: "Too Many Request" });
  }

  next();
};

export default rateLimmiter;
