'use client';

import { useState } from 'react';
import { Family, PostFamily } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { isJSONString } from '@/util/isJSONString';
import moment from 'moment';
import { toast } from 'sonner';
import Editor from '../../_components/Editor';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface BoardPageProps {
  post: PostFamily;
  family?: Family;
}

const PostView = ({
  post,
  family
}: BoardPageProps) => {
  const editAuth = family?.is_owner || post.family_id == family?.id;
  const param = useParams();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPost, setShowPost] = useState(post.role !== 9 || editAuth);

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(post.password).then(() => {
      toast.info('패스워드가 클립보드에 복사되었습니다.');
    });
  };

  const passwordSubmit = () => {
    if (password == post.password) {
      setShowPost(true);
    } else {
      setPassword('');
      toast.error('잘못된 암호입니다.')
    }
  }

  const handelDelete = async () => {
    if (post.thumbnail_path) {
      await supabaseClient
        .storage
        .from('post')
        .remove([post.thumbnail_path]);
    }

    const { error } = await supabaseClient
      .from('posts')
      .delete()
      .eq('id', post.id)

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.info('포스트를 삭제했습니다.');
    router.push(`/${param.houseAddress}/${param.boardName}`);
  }

  return (
    <div className='flex flex-col gap-y-2 h-full'>
      {showPost ? (
        <ScrollArea className='w-full h-full'>
          <div className='flex flex-wrap items-center justify-between gap-y-4 p-6 pb-2'>
            <div className='flex items-center gap-x-4'>
              <h1 className='text-4xl font-bold text-primary'>
                {post.title}
              </h1>
            </div>
            <div className='w-full flex items-center justify-between text-sm'>
              <div className='flex items-center gap-x-2'>
                <Avatar className='h-6 w-6'>
                  <AvatarImage src={post.family.avatar_url} />
                  <AvatarFallback className='text-xs'>{post.family.nick_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className='font-semibold'>{post.family.nick_name}</span>
                <span className='text-muted-foreground '>
                  {moment(post.created_at).format('YYYY.MM.DD hh:mm')}
                </span>
                {(family?.is_owner || post.family_id == family?.id) && (
                  post.role === 9 ? (
                    <Badge
                      variant='secondary'
                      className='cursor-pointer'
                      onMouseEnter={() => setShowPassword(true)}
                      onMouseLeave={() => setShowPassword(false)}
                      onClick={copyPasswordToClipboard}
                    >
                      암호 : {showPassword ? post.password : '*'.repeat(post.password.length)}
                    </Badge>
                  ) : (
                    <Badge variant='secondary' className='cursor-pointer'>
                      {post.role == 0 && '전체 공개'}
                      {post.role == 1 && '비공개'}
                    </Badge>
                  )
                )}
              </div>
              {(family?.is_owner || post.family_id == family?.id) && (
                <div className='flex gap-x-3'>
                  {post.family_id == family.id && (
                    <Link href={`/${param.houseAddress}/${param.boardName}/edit?id=${post.id}`}>
                      <button>수정</button>
                    </Link>
                  )}
                  <Dialog>
                    <DialogTrigger>삭제</DialogTrigger>
                    <DialogContent className='text-center sm:max-w-80'>
                      <DialogHeader>
                        <DialogTitle className='text-center'>포스트 삭제</DialogTitle>
                      </DialogHeader>
                      <p className='text-sm'>
                        삭제한 포스트는 되돌릴 수 없어요.<br />
                        정말 삭제할까요?
                      </p>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            variant='secondary'
                            size='sm'
                            className='w-full'
                          >
                            취소
                          </Button>
                        </DialogClose>
                        <Button
                          variant='destructive'
                          size='sm'
                          className='w-full'
                          onClick={handelDelete}
                        >
                          삭제
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col text-base'>
            {isJSONString(post.content) ? (
              <Editor
                editable={false}
                initialContent={post.content}
              />
            ) : (
              <div>
                <p className='px-6 py-2 whitespace-pre-line'>
                  {post.content}
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      ) : (
        <div className='flex flex-col items-center justify-center gap-y-4 h-full'>
          <h3 className='font-bold text-xl'>암호가 설정된 포스트입니다</h3>
          <Input
            className='w-60'
            type='password'
            placeholder='PASSWORD'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className='w-60' onClick={passwordSubmit}>확인</Button>
        </div>
      )}
    </div>

  );
}

export default PostView;