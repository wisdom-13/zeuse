interface BoardPageProps {
  params: {
    houseAddress: string,
    boardName: string,
    postId: string,
  }
}

const PostPage = ({
  params: { postId }
}: BoardPageProps) => {
  return (
    <div
      className='h-full flex flex-col gap-y-4 bg-white w-full md:max-w-[768px] rounded-md overflow-hidden'
    >
      {postId}
    </div>
  );
}

export default PostPage;