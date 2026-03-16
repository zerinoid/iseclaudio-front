'use client'

import { useState } from 'react'

/* Why this works well for your client:

 * Visual Feedback: The button changes to "Sending..." immediately,
   preventing double-submissions.

 * Error Handling: If the internet drops or the API fails, the user sees a
   clear error message instead of a silent failure.

 *Reset Logic: On success, the form clears itself so the UI looks fresh and
  organized.

 *Honeypot (Optional Pro Tip): For production, you might want to add a
  hidden "honeypot" field to prevent bot spam, as you aren't using a heavy
  plugin like Akismet. */

export default function ContactForm() {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to send message')

      setStatus('success')
      ;(e.target as HTMLFormElement).reset() // Clear the form
    } catch (err) {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again later.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="w-full border p-2 rounded h-32"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-black text-white py-2 px-4 rounded disabled:bg-gray-400"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {/* Feedback Messages */}
      {status === 'success' && (
        <p className="text-green-600 font-medium">
          Thanks! Your message was sent successfully.
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-600 font-medium">{errorMessage}</p>
      )}
    </form>
  )
}
