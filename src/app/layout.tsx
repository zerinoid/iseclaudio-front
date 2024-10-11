import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const instrumentSerif = localFont({
  src: "./fonts/InstrumentSerif-Regular.woff2",
  variable: "--font-geist-sans",
});
/*
 * const instrumentItalic = localFont({
 *   src: "./fonts/InstrumentSerif-Italic.woff2",
 *   variable: "--font-geist-mono",
 * });
 *  */
export const metadata: Metadata = {
  title: "Ise Claudio",
  description: "Generado por",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSerif.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
