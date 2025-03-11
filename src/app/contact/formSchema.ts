import { z } from 'zod'

export const formSchema = z.object({
  user_name: z.string().min(2, {
    message: 'Nome deve ter pelo menos 2 caracteres'
  }),
  user_email: z.string().email('Invalid email address.').min(2, {
    message: 'Email deve ter pelo menos 2 caracteres'
  }),
  message: z.string().min(10, {
    message: 'Mensagem deve ter pelo menos 10 caracteres'
  }),
  contact_number: z.string() // This will be populated dynamically
})

export type FormData = z.infer<typeof formSchema>
