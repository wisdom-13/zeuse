import { ScrollArea } from '@/components/ui/scroll-area'

interface BoardLayoutProps {
  params: {
    houseAddress: string
  }
  children: React.ReactNode
}

export default async function BoardLayout({
  children,
}: BoardLayoutProps) {

  return (
    <div
      className='h-full w-full bg-white md:max-w-[768px] rounded-md overflow-hidden'
    >
      {children}
    </div>
  )
}