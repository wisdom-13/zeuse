
import { Family, Memo } from '@/types';
import { Dispatch, useState } from 'react';

import { toast } from 'sonner';
import { Lock } from 'lucide-react';
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

register('ko', koLocale)

interface MemoItemProps {
  memo: Memo;
  family?: Family;
  setMemos?: Dispatch<React.SetStateAction<Memo[]>>;
}

const MemoItem = ({
  memo,
  family,
  setMemos
}: MemoItemProps) => {
  const supabaseClient = useSupabaseClient();
  const editAuth = family?.is_owner || (family && memo.family_id == family.id);
  const [password, setPassword] = useState('');
  const [showMemo, setShowMemo] = useState(editAuth);

  const passwordSubmit = () => {
    if (password == memo.password) {
      setShowMemo(true);
    } else {
      setPassword('');
      toast.error('잘못된 암호입니다.');
    }
  }

  const handelDelete = async () => {
    const { error } = await supabaseClient
      .from('memos')
      .delete()
      .eq('id', memo.id)

    if (error) {
      toast.error(error.message);
      return;
    }

    setMemos && setMemos((prevState) => {
      const newMemos = prevState.filter((item) => item.id !== memo.id);
      return newMemos
    });

    toast.info('메모를 삭제했습니다.');
  }

  return (
    <div className='flex flex-col gap-y-2 border rounded-md p-3 text-base'>
      <div className='flex justify-between text-sm'>
        <div className='flex items-center gap-x-2'>
          <span className='font-semibold'>{memo.name}</span>
          <span className='text-muted-foreground'>{format(memo.created_at, 'ko')}</span>
          {
            memo.is_secret && <Lock size={12} className='text-muted-foreground' />
          }
        </div>
        {
          showMemo && (
            <Dialog>
              <DialogTrigger>삭제</DialogTrigger>
              <DialogContent className='text-center sm:max-w-80'>
                <DialogHeader>
                  <DialogTitle className='text-center'>메모 삭제</DialogTitle>
                </DialogHeader>
                <p className='text-sm'>
                  삭제한 메모는 되돌릴 수 없어요.<br />
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
          )
        }

      </div>
      <div className='whitespace-pre-line'>
        {
          (!memo.is_secret || showMemo) ? (
            memo.content
          ) : memo.family_id ? (
            <div className='text-muted-foreground'>비공개 메모 {memo.family_id}</div>
          ) : (
            <div className='flex items-center gap-x-2 text-sm'>
              <Input
                className='w-36 h-10 text-sm'
                type='password'
                placeholder='PASSWORD'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button size='sm' onClick={passwordSubmit}>확인</Button>
            </div>
          )
        }

      </div>
    </div >
  );
}

export default MemoItem;