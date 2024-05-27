import { notFound } from 'next/navigation';
import getBoardByName from '@/action/getBoardByName';

interface BoardLayoutProps {
  params: {
    houseAddress: string;
    boardName: string;
  }
  children: React.ReactNode;
}

export default async function BoardLayout({
  params: { houseAddress, boardName },
  children,
}: BoardLayoutProps) {
  const chkBoard = await getBoardByName(houseAddress, boardName);

  if (!chkBoard) {
    notFound();
  }

  return (
    <div
      className='custom-card flex flex-col h-full w-full text-card-foreground md:max-w-[768px] rounded-md overflow-hidden'
    >
      {children}
    </div>
  )
}