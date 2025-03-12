'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FC, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
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
  const formRef = useRef<HTMLFormElement | null>(null)

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
      // Fetch the unique contact number
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      // Update the form data with the new contact number
      form.setValue('contact_number', result.contactNumber.toString())

      if (formRef.current) {
        emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
          formRef.current,
          {
            publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
          }
        )

        /* console.log('Form submitted with contact number:', result.contactNumber) */
        toast.success(
          `Seu contato nº #${result.contactNumber} foi registrado com sucesso. Verifique seu email.`
        )
        form.reset()
      }
    } catch (error) {
      toast.error('Ocorreu um erro, tente novamente')
      console.warn('FAILED...', JSON.stringify(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="flex justify-center">
      <Form {...form}>
        <form
          ref={formRef} //Required by EmailJS
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
                <FormMessage className="text-2xl text-red-600" />
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
                <FormMessage className="text-2xl text-red-600" />
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
                <FormMessage className="text-2xl text-red-600" />
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
