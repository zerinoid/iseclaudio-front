import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { name, email, message } = await request.json()

  try {
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Use a verified domain in production
      to: ['your-client@email.com'],
      subject: `New Message from ${name}`,
      html: `<p><strong>From:</strong> ${email}</p><p>${message}</p>`
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
