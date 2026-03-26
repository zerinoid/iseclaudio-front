import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { Toaster } from 'sonner'
import { Inter, Instrument_Serif } from 'next/font/google'

const fontSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: '400'
})

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'Ise Claudio',
  description: 'ise'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontSerif.variable} antialiased`}
      >
        <Header />
        <main className="container pt-5 flex-auto pb-20">{children}</main>
        <Footer />
        <Toaster
          mobileOffset={{ bottom: '16px' }}
          offset={{ bottom: '30px', right: '30px', left: '16px' }}
        />
      </body>
    </html>
  )
}
