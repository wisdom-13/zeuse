import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google';


import ReactQueryProvider from '@/providers/ReactQueryProvider';
import SupabaseProvider from '@/providers/SupabaseProvider'
import ModalProvider from '@/providers/ModalProvider'
import UserProvider from '@/providers/UserProvider'

import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner'



const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ZEUSE',
  description: '온라인 내 집 마련',
  icons: {
    icon: [
      {
        url: "/logo.svg",
        href: "/logo.svg",
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={openSans.className}>
          <ReactQueryProvider>
            <SupabaseProvider>
              <UserProvider>
                <TooltipProvider>
                  <Toaster position="bottom-right" />
                  <ModalProvider />
                  {children}
                </TooltipProvider>
              </UserProvider>
            </SupabaseProvider>
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  )
}
