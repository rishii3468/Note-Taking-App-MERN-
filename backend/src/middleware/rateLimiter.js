import { Ratelimit } from "@upstash/ratelimit"
import rateLimit from "../config/upstash.js"


const rateLimiter = async (_,res,next) => {
    // per user
    try {
        const {success} = await rateLimit.limit("my-limit-key")
        if(!success) return res.status(429).json({message:"Too many requests. Please try again later."})
        next()
    } catch (error) {
        console.log("Rate limit error",error)
        next(error)
    }

    
}

export default rateLimiter