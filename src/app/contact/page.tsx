'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FC, useRef } from 'react'
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
/* import { toast } from 'sonner' */

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
  // EmailJS needs the `ref` parameter in a form, ShadCN doesn't use
  // this by default so we have to import it.
  const formRef = useRef<HTMLFormElement | null>(null)

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
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (formRef.current) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
          formRef.current,
          {
            publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
          }
        )
        .then(
          () => {
            form.reset() //clear the fields after submission
          },
          error => {
            console.warn('FAILED...', JSON.stringify(error))
          }
        )
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
                <FormMessage className="text-xs text-red-600" />
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
                <FormMessage className="text-xs text-red-600" />
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
                <FormMessage className="text-xs text-red-600" />
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
