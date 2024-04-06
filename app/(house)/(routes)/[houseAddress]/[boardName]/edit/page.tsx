'use client';

import { useParams } from 'next/navigation';

import useGetBoardByName from '@/hooks/useGetBoardByName';
import useHouseBuild from '@/hooks/useHouseBuild';
import PostEdit from '../_components/PostEdit';

const EditPage = () => {
  const param = useParams();
  const { houseId } = useHouseBuild();
  const { board, isLoading } = useGetBoardByName(houseId, param.boardName);

  return (
    <>
      {board?.type == 'post' && <PostEdit board={board} />}
    </>
  );
}

export default EditPage;