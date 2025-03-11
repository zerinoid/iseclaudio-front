import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { Toaster } from 'sonner'

const instrumentSerif = localFont({
  src: './fonts/InstrumentSerif-Regular.woff2',
  variable: '--font-geist-sans'
})
/*
 * const instrumentItalic = localFont({
 *   src: "./fonts/InstrumentSerif-Italic.woff2",
 *   variable: "--font-geist-mono",
 * });
 *  */
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
      <body className={`${instrumentSerif.className} antialiased`}>
        <Header />
        <main className="container pt-5 flex-auto">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
