import getBoardByName from '@/action/getBoardByName';
import getHouseByAddress from '@/action/getHouseByAddress';

import BoardList from './_components/BoardList';
import GuestList from './_components/GuestList';

interface BoardPageProps {
  params: {
    houseAddress: string,
    boardName: string
  }
}

const BoardPage = async ({
  params: { houseAddress, boardName }
}: BoardPageProps) => {

  const house = await getHouseByAddress(houseAddress);
  if (!house) { return false; }

  const board = await getBoardByName(house.id, boardName);
  if (!board) { return false; }

  return (
    <div className='flex flex-col h-full gap-y-4 p-6'>
      {board.type == 'board' && <BoardList board={board} />}
      {board.type == 'guest' && <GuestList board={board} />}
    </div>
  );
}

export default BoardPage;