import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import emailjs from '@emailjs/nodejs'

const redis = Redis.fromEnv()

export async function POST(request: NextRequest) {
  let ticketNumber: number | null = null

  try {
    // Parse the request body
    const body = await request.json()
    const { user_name, user_email, message } = body

    // Validate required fields
    if (!user_name || !user_email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Step 1: Increment counter in Redis
    try {
      ticketNumber = await redis.incr('counter')
      console.log(`Ticket #${ticketNumber} generated`)
    } catch (redisError) {
      console.error('Redis error:', redisError)
      return NextResponse.json(
        { error: 'Failed to generate ticket number', source: 'redis' },
        { status: 500 }
      )
    }

    // Step 2: Send email with EmailJS using the ticket number
    try {
      const templateParams = {
        user_name,
        user_email,
        message,
        contact_number: ticketNumber.toString()
      }

      const response = await emailjs.send(
        process.env.EMAILJS_SERVICE_ID as string,
        process.env.EMAILJS_TEMPLATE_ID as string,
        templateParams,
        {
          publicKey: process.env.EMAILJS_PUBLIC_KEY as string,
          privateKey: process.env.EMAILJS_PRIVATE_KEY as string
        }
      )

      console.log(`Email sent successfully for ticket #${ticketNumber}`)

      return NextResponse.json({
        success: true,
        contactNumber: ticketNumber,
        message: 'Email sent successfully'
      })
    } catch (emailjsError) {
      console.error('EmailJS error:', emailjsError)

      // Step 3: Rollback - decrement the counter if email fails
      try {
        await redis.decr('counter')
        console.log(`Rolled back ticket #${ticketNumber} due to email failure`)
      } catch (rollbackError) {
        console.error('Rollback failed:', rollbackError)
        // Log this critical error - manual intervention might be needed
      }

      return NextResponse.json(
        {
          error: 'Failed to send email',
          source: 'emailjs',
          details: emailjsError
        },
        {
          status: emailjsError.status as number
        }
      )
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error', source: 'unknown' },
      { status: 500 }
    )
  }
}
