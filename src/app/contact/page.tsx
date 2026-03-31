'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FC, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { formSchema, FormData } from './formSchema'

const Contact: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  // EmailJS needs the `ref` parameter in a form, ShadCN doesn't use
  // this by default so we have to import it.

  // configure Zod default values for the form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: '',
      user_email: '',
      message: '',
      contact_number: ''
    }
  })

  // Create the handler that connects to EmailJS.
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_name: data.user_name,
          user_email: data.user_email,
          message: data.message
        })
      })

      const result = await response.json()

      if (!response.ok) {
        // Handle different error sources
        if (result.source === 'redis') {
          toast.error(
            'Erro no sistema de numeração. Tente novamente mais tarde.'
          )
        } else if (result.source === 'emailjs') {
          toast.error('Erro ao enviar email. Tente novamente mais tarde.')
        } else {
          toast.error('Ocorreu um erro, tente novamente')
        }
        console.warn('FAILED...', result.error)
        return
      }

      // Success case
      toast.success(
        `Seu contato nº #${result.contactNumber} foi registrado com sucesso. Verifique seu email.`
      )
      form.reset()
    } catch (error) {
      toast.error('Erro de conexão. Verifique sua internet e tente novamente.')
      console.warn('Network error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full md:w-2/4 space-y-6"
        >
          <FormField
            name="user_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="border-primary"
                    placeholder="Your Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="border-primary"
                    placeholder="Email Address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    className="border-primary"
                    placeholder="Type your message here."
                    id="message"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <input type="hidden" {...form.register('contact_number')} />
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </Form>
    </section>
  )
}

export default Contact
