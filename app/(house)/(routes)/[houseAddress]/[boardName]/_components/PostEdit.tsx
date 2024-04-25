'use client'

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { ImageIcon, X } from 'lucide-react';
import { toast } from 'sonner';
import { v4 as uuid } from 'uuid';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import useHouseBuild from '@/hooks/useHouseBuild';
import useGetBoardByName from '@/hooks/useGetBoardByName';
import useGetPostById from '@/hooks/useGetPostById';

import { postRole } from '@/data/common';
import { getPublicUrl } from '@/util/getPublicUrl';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';

interface PostEditProps {
  familyId: string;
}

const PostEdit = ({
  familyId
}: PostEditProps) => {
  const Editor = useMemo(() => dynamic(() => import('../../_components/Editor'), { ssr: false }), []);
  const param = useParams();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { houseId } = useHouseBuild();
  const { board } = useGetBoardByName(param.houseAddress, param.boardName);
  const [isSetting, setIsSetting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState<File>();
  const [thumbnailPath, setThumbnailPath] = useState('');
  const [role, setRole] = useState(0);
  const [password, setPassword] = useState('');

  const postId = useSearchParams().get('id');
  const { post } = useGetPostById(postId, houseId);

  useEffect(() => {
    if (!post) return;
    setTitle(post.title);
    setThumbnailPath(post.thumbnail_path);
    setRole(post.role);
    setContent(post.content);
  }, [post]);

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

  const handleThumbnail = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.id || !event.target.files) return
    const image = event.target.files[0];
    setThumbnail(image);
    setThumbnailPath('');
  }

  const handleImageDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setThumbnail(undefined);
    setThumbnailPath('');
  }

  const handleSubmit = async () => {
    if (role == 9 && password == '') {
      toast.info('암호를 입력하세요.');
      return;
    }

    const postData = {
      family_id: familyId,
      board_id: board.id,
      house_id: houseId,
      title: title,
      content: content,
      thumbnail_path: thumbnailPath,
      role: role,
      password: password,
      created_at: new Date(),
    }

    if (thumbnail) {
      const { data, error } = await supabaseClient
        .storage
        .from('post')
        .upload(`thumbnail-${uuid()}`, thumbnail, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        toast.error('썸네일을 업로드하는 중 오류가 발생했습니다.');
      }

      if (data) {
        setThumbnailPath(`${data.path}`);
        postData.thumbnail_path = data.path;
      }
    }

    const { data, error } = post ? (
      await supabaseClient
        .from('posts')
        .update(postData)
        .eq('id', post.id)
        .select()
        .single()
    ) : (
      await supabaseClient
        .from('posts')
        .insert(postData)
        .select()
        .single()
    )

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.info(post ? '포스트를 수정하였습니다.' : '포스트가 등록되었습니다.');
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
              initialContent={post?.content}
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
                <div className='group w-56 h-32 relative bg-secondary rounded-md  overflow-hidden border'>
                  <label
                    htmlFor='thumbnail'
                    className='h-full flex flex-col items-center justify-center '
                  >
                    <input
                      id='thumbnail'
                      accept='image/*,.jpeg,.jpg,.png'
                      type='file'
                      onChange={handleThumbnail}
                      className='hidden'
                    />
                    {
                      (thumbnail || thumbnailPath) ? (
                        <div className='w-full h-full'>
                          <Image
                            src={thumbnail ? URL.createObjectURL(thumbnail) : getPublicUrl(`post/${thumbnailPath}`)}
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
                  </label>
                  {(thumbnail || thumbnailPath) && <button
                    className='hidden group-hover:block absolute z-[999999] top-1 right-1 bg-background rounded-full p-1'
                    onClick={handleImageDelete}
                  >
                    <X size={16} />
                  </button>}
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
                    <Input type='password' placeholder='암호를 설정하세요.' onChange={(e) => setPassword(e.target.value)} />
                    <p className='text-sm text-muted-foreground pt-2'>포스트를 열람하기 위한 암호를 설정합니다.</p>
                  </div>
                </div>
              )}
              <Button
                size='lg'
                className='w-full'
                onClick={handleSubmit}
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