import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/footer';
import { ThemeProvider } from '@/components/dark-mode-toogle';
import Navbar from '@/components/navbar/navbar';
import { Providers } from './provider';
import AdminMessage from './adminMessage';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>

          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange

          >
            <Providers>
              <Navbar />
              <AdminMessage />
              {children}
              <Footer />
              <Toaster richColors duration={7000} className='text-yellow-500' />
            </Providers>
          </ThemeProvider>
        </ClerkProvider>

      </body>
    </html>

  )
}
