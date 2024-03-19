import getBoardByName from '@/action/getBoardByName';
import getHouseByAddress from '@/action/getHouseByAddress';

import BoardList from './_components/BoardList';

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

  const posts = board.posts;

  // const filteredData = board.posts.slice().filter((job: Post) => {
  //   return job.title.includes(searchKeyword) || job.keywords.some(keyword => keyword.toLowerCase().includes(searchKeyword));
  // });

  // const result = board.posts.sort((a: Post, b: Post) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());


  return (
    <div
      className='h-full flex flex-col gap-y-4 bg-white w-full md:max-w-[768px] rounded-md overflow-hidden'
    >
      <BoardList board={board} />
    </div>
  );
}

export default BoardPage;