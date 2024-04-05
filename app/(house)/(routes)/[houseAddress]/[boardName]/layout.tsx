import { ScrollArea } from '@/components/ui/scroll-area'

interface BoardLayoutProps {
  params: {
    houseAddress: string
  }
  children: React.ReactNode
}

export default function BoardLayout({
  children,
}: BoardLayoutProps) {

  return (
    <div
      className='custom-card h-full w-full text-card-foreground md:max-w-[768px] rounded-md overflow-hidden'
    >
      {children}
    </div>
  )
}