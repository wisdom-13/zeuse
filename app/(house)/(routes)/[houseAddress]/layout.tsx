import type { Metadata } from 'next'
import getHouseByAddress from '@/action/getHouseByAddress'
import Navigation from './_components/Navigation'
import getHouseBuildByAddress from '@/action/getHouseBuildByAddress'
import HouseIdProvider from '@/providers/HouseIdProvider'
// import useHouseAddressId from '@/hooks/useHouseAddressId'
// import { useEffect } from 'react'

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
  const house = await getHouseBuildByAddress(houseAddress);


  return (
    <div className='h-full flex bg-rose-400'>
      <Navigation menus={house?.board} />
      <main className='flex flex-1 flex-col items-center justify-center overflow-y-auto h-full p-6'>
        <HouseIdProvider houseAddress={houseAddress}>
          {children}
        </HouseIdProvider>
      </main>
    </div>
  )
}

export async function generateMetadata({
  params: { houseAddress },
}: HouseLayoutProps): Promise<Metadata> {
  const house = await getHouseByAddress(houseAddress);
  return {
    title: `${house?.title} | zeuse`,
    description: `${house?.description}`,
    icons: {
      icon: [
        {
          url: "/logo-dark.svg",
          href: "/logo-dark.svg",
        }
      ]
    }
  }
}