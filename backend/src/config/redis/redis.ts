import { createClient } from 'redis'

export const redisConnect = async () => {
    const redis = createClient()
    await redis.connect().catch(err=>console.log(err))
    return redis
}