import getBoardByName from '@/action/getBoardByName';
import { notFound } from 'next/navigation';

interface BoardLayoutProps {
  params: {
    houseAddress: string;
    boardName: string;
  }
  children: React.ReactNode;
}

export default async function BoardLayout({
  params,
  children,
}: BoardLayoutProps) {
  const chkBoard = await getBoardByName(params.houseAddress, params.boardName);

  if (!chkBoard) {
    notFound();
  }

  return (
    <div
      className='custom-card h-full w-full text-card-foreground md:max-w-[768px] rounded-md overflow-hidden'
    >
      {children}
    </div>
  )
}