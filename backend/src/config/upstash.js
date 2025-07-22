import {Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"

import dotenv from "dotenv"

dotenv.config()

//create a rate limiter that allows 100 req per 60s
const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(30,"20 s")
})

export default rateLimit;