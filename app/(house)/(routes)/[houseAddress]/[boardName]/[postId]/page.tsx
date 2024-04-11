import getPostById from '@/action/getPostById';
import PostView from '../_components/PostView';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import getHouseBuildByAddress from '@/action/getHouseBuildByAddress';

interface BoardPageProps {
  params: {
    houseAddress: string,
    boardName: string,
    postId: string,
  }
}

const PostPage = async ({
  params: { houseAddress, postId }
}: BoardPageProps) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: { session } } = await supabase.auth.getSession();

  const house = await getHouseBuildByAddress(houseAddress);
  const post = await getPostById(postId);

  const family = house?.family.filter((item) => item.user_id == session?.user.id)?.[0];

  if (!post) {
    return notFound();
  }

  if (post.role == 1 && post.family_id !== family?.id && !family?.is_owner) {
    return notFound();
  }

  return (
    <>
      <PostView post={post} family={family} />
    </>
  );
}

export default PostPage;