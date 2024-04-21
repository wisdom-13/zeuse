import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getPublicUrl } from '@/util/getPublicUrl';

import HouseIdProvider from '@/providers/HouseIdProvider';
import getHouseByAddress from '@/action/getHouseByAddress';
import getHousesByUserId from '@/action/getHousesByUserId';
import getHouseBuildByAddress from '@/action/getHouseBuildByAddress';
import Navigation from './_components/Navigation';

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
  const houses = await getHousesByUserId();
  const house = await getHouseBuildByAddress(houseAddress);

  if (!house) {
    notFound();
  }

  const style = {
    backgroundImage: house.style.bg_image ? `url(${getPublicUrl(`style/${house.style.bg_image}`)})` : house.style.bg_color,
    '--radius': `${house.style.box_style.radius}rem`,
    '--boxOpacity': `${house.style.box_style.opacity}`
  } as const;

  return (
    <div
      id='theme-wrap'
      className={cn(
        'h-screen flex bg-cover bg-no-repeat',
        house.style.mode == 'dark' && 'dark',
        house.style.color && `color-${house.style.color}`,
        house.style.box_style.border !== 'none' && `border-${house.style.box_style.border}`
      )}
      style={style}
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