import type { Metadata } from 'next'
import getHouseByAddress from '@/action/getHouseByAddress'
import Navigation from './_components/Navigation'
import getHouseBuildByAddress from '@/action/getHouseBuildByAddress'
import HouseIdProvider from '@/providers/HouseIdProvider'
import getHousesByUserId from '@/action/getHousesByUserId'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

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
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const { data: { session } } = await supabase.auth.getSession();
  const houses = await getHousesByUserId();
  const house = await getHouseBuildByAddress(houseAddress);

  if (!house) {
    return false;
  }

  return (
    <div className='h-full flex bg-blue-800'>
      <Navigation houses={houses} house={house} />
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