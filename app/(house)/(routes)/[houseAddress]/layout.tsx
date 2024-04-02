import type { Metadata } from 'next'
import getHouseByAddress from '@/action/getHouseByAddress'
import Navigation from './_components/Navigation'
import HouseIdProvider from '@/providers/HouseIdProvider'
import getHousesByUserId from '@/action/getHousesByUserId'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import getHouseBuildByAddress from '@/action/getHouseBuildByAddress'
import { cn } from '@/lib/utils'
import { getPublicUrl } from '@/util/getPublicUrl'

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
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: { session } } = await supabase.auth.getSession();
  const houses = await getHousesByUserId();
  const house = await getHouseBuildByAddress(houseAddress);

  if (!house) {
    return false;
  }

  return (
    <div
      id='theme-wrap'
      className={cn(
        'h-screen flex',
        house.style.mode == 'dark' && 'dark',
        house.style.color && `color-${house.style.color}`,
        house.style.radius && `radius-${house.style.radius}`
      )}
      style={{ background: house.style.bg_image ? `url(${getPublicUrl(`style/background/${house.style.bg_image}`)})` : `${house.style.bg_color}` }}
    >
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