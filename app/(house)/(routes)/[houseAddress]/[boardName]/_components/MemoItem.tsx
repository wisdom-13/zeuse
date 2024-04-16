import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Family, Memo } from '@/types';
import { Lock } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

register('ko', koLocale)

interface MemoItemProps {
  memo: Memo;
  family?: Family;
}

const MemoItem = ({
  memo,
  family
}: MemoItemProps) => {
  const editAuth = family?.is_owner || memo.family_id == family?.id;
  const [password, setPassword] = useState('');
  const [showMemo, setShowMemo] = useState(!memo.is_secret || editAuth);

  const passwordSubmit = () => {
    if (password == memo.password) {
      setShowMemo(true);
    } else {
      setPassword('');
      toast.error('잘못된 암호입니다.');
    }
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
        <div>
          삭제
        </div>
      </div>
      <div className='whitespace-pre-line'>
        {
          showMemo ? (
            memo.content
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
    </div>
  );
}

export default MemoItem;