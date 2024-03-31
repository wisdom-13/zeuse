import BoardMain from './_components/BoardMain';

const BoardPage = async () => {
  return (
    <div className='flex flex-col h-full gap-y-4 p-6'>
      <BoardMain />
    </div>
  );
}

export default BoardPage;