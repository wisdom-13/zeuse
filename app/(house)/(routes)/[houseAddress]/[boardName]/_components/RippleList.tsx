'use client'

import { useUser } from '@/hooks/useUser';
import RippleAdd from './RippleAdd';
import RippleItem from './RippleItem';
import useHouseBuild from '@/hooks/useHouseBuild';

interface RippleListProps {
  postId: string;
}

const RippleList = ({
  postId
}: RippleListProps) => {
  const { user, userDetails } = useUser();
  const { houseBuild } = useHouseBuild();
  const family = houseBuild?.family.filter((item) => item.user_id == user?.id)?.[0];

  return (
    <div className='flex flex-col gap-y-4 p-6'>
      <h3 className='font-bold text-lg'>N개의 댓글</h3>
      <RippleAdd postId={postId} user={userDetails} family={family} />
      <div className='flex flex-col gap-y-4'>
        <RippleItem />
        <RippleItem />
        <RippleItem />
      </div>
    </div>
  );
}

export default RippleList;