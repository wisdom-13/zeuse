import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'

import SupabaseProvider from '@/providers/SupabaseProvider'
import ModalProvider from '@/providers/ModalProvider'
import UserProvider from '@/providers/UserProvider'
import getHouseByAddress from '@/action/getHouseByAddress'

// export const metadata: Metadata = {
//   title: 'ZEUSE',
//   description: '온라인 내 집 마련',
//   icons: {
//     icon: [
//       {
//         media: "(prefers-color-scheme: light)",
//         url: "/logo.svg",
//         href: "/logo.svg",
//       },
//       {
//         media: "(prefers-color-scheme: dark)",
//         url: "/logo-dark.svg",
//         href: "/logo-dark.svg",
//       }
//     ]
//   }
// }

interface HouseLayoutProps {
  params: {
    houseAddress: string
  }
  children: React.ReactNode
}

export default async function HouseLayout({
  params: { houseAddress },
  children,
}: HouseLayoutProps) {
  const house = await getHouseByAddress(houseAddress);

  console.log(house)

  return (
    <div className='h-full flex'>
      <main className='flex-1 h-full overflow-y-auto'>
        {children}
      </main>
    </div>
  )
}
