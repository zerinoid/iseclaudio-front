import { NextApiRequest, NextApiResponse } from 'next'

import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export async function POST() {
  const count = await redis.incr('counter')
  return Response.json({ contactNumber: count })
}
