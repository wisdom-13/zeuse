import { PostFamily } from '@/types';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner';

const useGetPostById = (post_id?: string | null, house_id?: string | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<PostFamily | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!post_id || !house_id) {
      return;
    }

    setIsLoading(true);

    const fetchPost = async () => {
      const { data, error } = await supabaseClient
        .from('posts')
        .select(`
          *,
          family:family!inner(*)
        `)
        .eq('id', post_id)
        .eq('house_id', house_id)
        .single();

      if (error) {
        setIsLoading(false);
        console.log(post_id)
        console.log(error)
        return toast.error(error.message);
      }

      setPost(data as PostFamily);
      setIsLoading(false);
    }

    fetchPost();
  }, [post_id, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    post
  }), [isLoading, post]);
}

export default useGetPostById;