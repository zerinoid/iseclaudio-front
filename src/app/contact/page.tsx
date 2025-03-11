'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FC, useEffect, useRef, useState } from 'react'
import { z } from 'zod'
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

const FormSchema = z.object({
  user_name: z.string().min(2, {
    message: 'Nome deve ter pelo menos 2 caracteres'
  }),
  user_email: z.string().email('Invalid email address.').min(2, {
    message: 'Email deve ter pelo menos 2 caracteres'
  }),
  message: z.string().min(10, {
    message: 'Mensagem deve ter pelo menos 10 caracteres'
  })
})
const Contact: FC = () => {
  const [contactNumber, setContactNumber] = useState<number>(0)
  // EmailJS needs the `ref` parameter in a form, ShadCN doesn't use
  // this by default so we have to import it.
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    getContactNumber()
  }, [])

  const getContactNumber = async () => {
    try {
      const response = await fetch('/api', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()
      setContactNumber(result.contactNumber)
    } catch (error) {
      toast.error('Ocorrreu um erro, tente novamente')
      console.warn('FAILED...', JSON.stringify(error))
    }
  }

  const writeContactNumber = async () => {
    try {
      // Call the API route to get the unique contact number
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
        /* body: JSON.stringify(formData), */
      })

      const result = await response.json()

      // Set the unique contact number
      setContactNumber(result.contactNumber)
      return result
    } catch (error) {
      toast.error('Ocorrreu um erro, tente novamente')
      console.warn('FAILED...', JSON.stringify(error))
    }
  }

  // configure Zod default values for the form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      user_name: '',
      user_email: '',
      message: ''
    }
  })

  // Create the handler that connects to EmailJS.
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      /* await getContactNumber() */
      const result = await writeContactNumber()
      // Submit the form (or send it via EmailJS)
      if (formRef.current) {
        emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
          formRef.current,
          {
            publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
          }
        )

        console.log('Form submitted with contact number:', result.contactNumber)
        toast.success(
          `Seu contato nº #${result.contactNumber} foi registrado com sucesso. Verifique seu email.`
        )
        /* form.reset() */
      }
    } catch (error) {
      toast.error('Ocorrreu um erro, tente novamente')
      console.warn('FAILED...', JSON.stringify(error))
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
          <FormField
            name="contact_number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="hidden"
                    {...field}
                    value={String(contactNumber + 1)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" size="lg">
            {/*<PaperPlane />*/}
            Send{' '}
          </Button>
        </form>
      </Form>
    </section>
  )
}

export default Contact
