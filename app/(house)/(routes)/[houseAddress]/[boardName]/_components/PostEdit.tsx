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
import { ImageIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { postRole } from '@/data/common';

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
  const [role, setRole] = useState(0);
  const [password, setPassword] = useState('');

  if (!board) {
    return;
  }

  const validation = () => {
    if (title.trim() == '') {
      toast.info('제목을 입력하세요.');
      return;
    }

    if (content == '') {
      toast.info('내용을 입력하세요.');
      return;
    }

    setIsSetting(true);
  }

  const handelSubmit = async () => {
    if (role == 9 && password == '') {
      toast.info('암호를 입력하세요.');
      return;
    }

    const { data, error } = await supabaseClient
      .from('posts')
      .insert({
        family_id: familyId,
        board_id: board.id,
        title: title,
        content: content,
        thumbnail_path: thumbnailPath,
        role: role,
        password: password,
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
        <div className='flex flex-col gap-y-4'>
          <div className='flex items-center px-6 mt-2'>
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

      </ScrollArea>
      <div className='flex gap-x-2 p-6 justify-end'>
        <Button onClick={validation}>발행</Button>
        <Dialog open={isSetting} onOpenChange={() => setIsSetting(!isSetting)}>
          <DialogContent>
            <DialogHeader className='pb-2'>
              <h2 className='text-lg font-medium text-center'>
                포스트 발행
              </h2>
            </DialogHeader>
            <div className='flex flex-col gap-y-8'>
              <div className='flex flex-col gap-y-4'>
                <Label>포스트 미리보기</Label>
                <div className='w-56 h-32 bg-secondary flex flex-col items-center justify-center rounded-md relative overflow-hidden border'>
                  {
                    thumbnailPath ? (
                      <div className='w-full h-full'>
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
              <div className='flex flex-col gap-y-4'>
                <Label>공개설정</Label>
                <div className='grid grid-cols-3 gap-x-2'>
                  {postRole.map((item) => (
                    <Button
                      key={item.id}
                      size='lg'
                      className='flex gap-x-2 font-semibold'
                      variant={role == item.id ? 'outline' : 'secondary'}
                      onClick={() => setRole(item.id)}
                    >
                      <item.icon size={18} />
                      {item.name}
                    </Button>
                  ))}
                </div>
              </div>
              {role == 9 && (
                <div className='flex flex-col gap-y-4'>
                  <Label>암호 설정</Label>
                  <div>
                    <Input placeholder='암호를 설정하세요.' onChange={(e) => setPassword(e.target.value)} />
                    <p className='text-sm text-muted-foreground pt-2'>포스트를 열람하기 위한 암호를 설정합니다.</p>
                  </div>
                </div>
              )}
              <Button
                size='lg'
                className='w-full'
                onClick={handelSubmit}
              >
                발행하기
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>


    </>

  );
}

export default PostEdit;