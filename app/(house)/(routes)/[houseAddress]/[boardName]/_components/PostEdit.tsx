'use client'

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useParams, useRouter } from 'next/navigation';
import useGetBoardByName from '@/hooks/useGetBoardByName';
import Image from 'next/image';
import { getPublicUrl } from '@/util/getPublicUrl';
import { Globe, ImageIcon, Lock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface PostEditProps {
  familyId: string;
}

const PostEdit = ({
  familyId
}: PostEditProps) => {
  const param = useParams();
  const router = useRouter();
  const Editor = useMemo(() => dynamic(() => import("../../_components/Editor"), { ssr: false }), []);
  const supabaseClient = useSupabaseClient();
  const { board } = useGetBoardByName(param.houseAddress, param.boardName);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnailPath, setThumbnailPath] = useState('');
  const [isSetting, setIsSetting] = useState(false);

  if (!board) {
    return;
  }

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
        family_id: familyId,
        board_id: board.id,
        title: title,
        content: content,
        thumbnailPath: thumbnailPath,
        created_at: new Date(),
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
        {!isSetting ? (
          <div className='flex flex-col gap-y-4'>
            <div className='flex items-center px-6 mt-10'>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='text-4xl font-bold border-none px-0'
                placeholder='제목을 입력하세요'
              />
            </div>
            <div className='flex flex-col'>
              <Editor
                editable={true}
                onChange={setContent}
                setThumbnailPath={setThumbnailPath}
                thumbnailPath={thumbnailPath}
              />
            </div>
          </div>
        ) : (
          <div className='flex flex-col p-6'>
            <div className='flex flex-col gap-y-4'>
              <h3 className='text-2xl font-bold'>포스트 미리보기</h3>
              <div className='w-60 h-36 bg-gray-200 flex flex-col items-center justify-center rounded-md'>
                {
                  thumbnailPath ? (
                    <div className='w-44 h-10 relative'>
                      <Image
                        src={getPublicUrl(`post/${thumbnailPath}`)}
                        alt='thumbnail'
                        fill
                        className='object-cover'
                      />
                    </div>
                  ) : (
                    <>
                      <ImageIcon size={36} />
                      <span className='text-sm mt-2'>썸네일 업로드</span>
                    </>
                  )
                }
              </div>
            </div>
            <Separator orientation='vertical' className='mx-10' />
            <div className='flex flex-col gap-y-4'>
              <h3 className='text-2xl font-bold'>공개설정</h3>
              <div className='flex gap-x-2'>
                <Button variant='outline' size='lg' className='flex gap-x-2 font-semibold w-36'>
                  <Globe size={18} />
                  전체 공개
                </Button>
                <Button variant='secondary' size='lg' className='flex gap-x-2 font-semibold w-36'>
                  <Lock size={18} />
                  비공개
                </Button>
              </div>
            </div>
          </div>
        )}

      </ScrollArea>
      <div className='flex gap-x-2 p-6 justify-end'>
        {/* <Button variant='outline'>저장</Button> */}
        {isSetting && <Button variant='outline' onClick={() => setIsSetting(false)}>취소</Button>}
        <Button onClick={isSetting ? handleSubmit : () => setIsSetting(true)}>발행</Button>
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>


    </>

  );
}

export default PostEdit;