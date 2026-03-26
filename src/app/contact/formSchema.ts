import { z } from 'zod'

export const formSchema = z.object({
  user_name: z.string().min(3, {
    message: 'Name must be at least 3 characters'
  }),
  user_email: z.string().email('Invalid email address.'),
  message: z.string().min(10, {
    message: 'Message must be at leastl 10 characters'
  }),
  contact_number: z.string() // This will be populated dynamically
})

export type FormData = z.infer<typeof formSchema>
