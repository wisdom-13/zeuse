import type { Metadata } from 'next'
import getHouseByAddress from '@/action/getHouseByAddress'


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