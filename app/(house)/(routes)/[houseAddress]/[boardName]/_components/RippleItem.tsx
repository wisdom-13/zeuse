import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, ChevronUp, Ellipsis, UsersRound } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from 'react';

interface RippleItem {
  is_parent?: boolean
}

const RippleItem = ({
  is_parent = true
}: RippleItem) => {
  const [openChild, setOpenChild] = useState(false);

  return (
    <>
      <div className='flex flex-col gap-y-2 text-sm py-3 border-b border-input'>
        <div className='w-full flex items-center justify-between'>
          <div className='flex items-center gap-x-2 '>
            <Avatar className='h-6 w-6'>
              {/* {
              post.family.avatar_path ? (
                <AvatarImage asChild src={post.family.avatar_path ? getPublicUrl(`profile/${post.family.avatar_path}`) : post.family.avatar_url}>
                  <Image src={getPublicUrl(`profile/${post.family.avatar_path}`)} alt='avatar' fill />
                </AvatarImage>
              ) : (
                <AvatarImage src={post.family.avatar_url} />
              )
            } */}
              <AvatarFallback className='text-xs'>또</AvatarFallback>
            </Avatar>
            <span className='font-semibold'>또치</span>
            <UsersRound size='14' />

          </div>
          <span className='text-muted-foreground '>
            2일전
          </span>

        </div>
        <div>
          내용입력내용입력내용입력내용입력 내용입력내용 입력내용입력 내용입력
          <br />어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구
          <br />라라라라라
        </div>
        <div className='flex justify-between'>
          {is_parent ? (
            <div className='flex gap-x-2 items-center text-muted-foreground font-bold' onClick={() => setOpenChild(!openChild)}>
              {openChild ? <ChevronUp size='14' /> : <ChevronDown size='14' />}
              답글 더보기
            </div>
          ) : <div></div>}
          <div className='hover:bg-muted rounded-md p-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Ellipsis size='14' />
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>
                  수정
                </DropdownMenuItem>
                <DropdownMenuItem>
                  삭제
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {
        openChild && (
          <div className='pl-6'>
            <RippleItem is_parent={false} />
          </div>
        )
      }
    </>
  );
}

export default RippleItem;