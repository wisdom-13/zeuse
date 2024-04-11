'use client';

import { ArrowRight, ChevronsLeftRight, LogOut, PlusCircle } from 'lucide-react';

import {
  Avatar,
  AvatarImage
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/hooks/useUser';
import { House } from '@/types';
import Link from 'next/link';
import useCreateHouseModal from '@/hooks/useCreateHouseModal';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface HouseListPorps {
  position?: 'center' | 'start' | 'end' | undefined;
  houses: House[];
}

export const HouseList = ({
  position = 'center',
  houses
}: HouseListPorps) => {
  const { user, userDetails } = useUser();
  const createHouseModal = useCreateHouseModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const onClick = () => {
    return createHouseModal.onOpen();
  }

  const headleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) {
      toast.error(error?.message)
    } else {
      toast.success('Logged out!')
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div role='button' className={cn(
          'flex items-center text-sm p-3 w-full hover:bg-primary/5 rounded-md',
          position == 'center' && 'justify-center',
          position == 'start' && 'justify-left',
        )}>
          <div className='gap-x-4 flex items-center'>
            {userDetails?.avatar_url && (
              <Avatar className='h-5 w-5'>
                <AvatarImage src={userDetails?.avatar_url} />
              </Avatar>
            )}
            <span className='font-medium line-clamp-1 text-muted-foreground'>
              {userDetails?.name ? userDetails?.name : user?.email?.split('@')[0]}의 하우스
            </span>
          </div>
          <ChevronsLeftRight className='rotate-90 ml-2 text-muted-foreground h-4 w-4' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-80'
        alignOffset={11}
        align={position}
        forceMount
      >
        <p className='text-xs font-semibold cursor-pointer text-muted-foreground p-2'>
          {user?.email}
        </p>
        <DropdownMenuSeparator />
        {houses.map((item) => (
          <DropdownMenuItem asChild key={item.id} className='cursor-pointer text-muted-foreground'>
            <Link
              href={`/${item.address}`}
              className='justify-between group'
            >
              <span>{item.title}</span>
              <ArrowRight className='opacity-0 group-hover:opacity-100 h-4 w-4 ml-2' />
            </Link>
          </DropdownMenuItem>
        ))}
        {houses.length === 0 && (
          <div className='text-sm font-semibold cursor-pointer text-muted-foreground p-2'>
            생성된 하우스가 없습니다.
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer text-muted-foreground p-2'
          onClick={onClick}
        >
          <PlusCircle className='h-4 w-4 mr-2' />
          새 하우스 만들기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}