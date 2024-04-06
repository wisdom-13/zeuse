'use client'

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Board } from '@/types';
import { useParams, useRouter } from 'next/navigation';

interface PostEditProps {
  board: Board
}

const PostEdit = ({
  board
}: PostEditProps) => {
  const Editor = useMemo(() => dynamic(() => import("../../_components/Editor"), { ssr: false }), []);
  const supabaseClient = useSupabaseClient();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const param = useParams();

  const handleSubmit = async () => {
    if (title.trim() == '') {
      toast.info('제목을 입력하세요.');
      return;
    }

    if (content == '') {
      toast.info('내용을 입력하세요.');
      return;
    }

    const { data, error } = await supabaseClient
      .from('posts')
      .insert({
        board_id: board.id,
        title: title,
        content: content,
        family_id: '36fee6c4-35c6-464e-a3d0-f08bd0fbfb3d'
      })
      .select()
      .single();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.info('포스트가 등록되었습니다.');
    router.push(`/${param.houseAddress}/${param.boardName}/${data.id}`)

  }

  return (
    <>
      <ScrollArea className='w-full h-full pt-6'>
        <div className='flex flex-col gap-y-4'>
          <div className='flex items-center px-6 mt-10'>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='text-4xl font-semibold border-none px-0'
              placeholder='제목을 입력하세요'
            />
          </div>
          <div className='flex flex-col'>
            <Editor
              onChange={setContent}
              editable={true}
            />
          </div>
        </div>
      </ScrollArea>
      <div className='flex gap-x-2 p-6 justify-end'>
        <Button variant='outline'>저장</Button>
        <Button onClick={handleSubmit}>발행</Button>
      </div>
    </>

  );
}

export default PostEdit;