import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import getBoardByName from '@/action/getBoardByName';
import getHouseBuildByAddress from '@/action/getHouseBuildByAddress';
import PostEdit from '../_components/PostEdit';
import BoardBack from '../_components/BoardBack';

interface EditPageProps {
  params: {
    houseAddress: string;
    boardName: string;
  }
}

const EditPage = async ({
  params: { houseAddress, boardName }
}: EditPageProps) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: { session } } = await supabase.auth.getSession();

  const house = await getHouseBuildByAddress(houseAddress);
  const board = await getBoardByName(houseAddress, boardName);

  const family = house?.family.filter((item) => item.user_id == session?.user.id)?.[0];

  if (!family) {
    return notFound();
  }

  return (
    <>
      <BoardBack url={`/${houseAddress}/${boardName}`} title={board?.title} />
      {board?.type == 'post' && <PostEdit familyId={family.id} />}
    </>
  );
}

export default EditPage;