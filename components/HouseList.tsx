'use client';

import { ArrowRight, ChevronsLeftRight, PlusCircle } from 'lucide-react';

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

interface HouseListPorps {
  houses: House[];
}

export const HouseList = ({ houses }: HouseListPorps) => {
  const { user, userDetails } = useUser();
  const createHouseModal = useCreateHouseModal();

  const onClick = () => {
    return createHouseModal.onOpen();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div role='button' className='flex items-center justify-center text-sm p-3 w-full hover:bg-primary/5'>
          <div className='gap-x-2 flex items-center'>
            <Avatar className='h-5 w-5'>
              <AvatarImage src={userDetails?.avatar_url} />
            </Avatar>
            <span className='font-medium line-clamp-1'>
              {userDetails?.name}의 하우스
            </span>
          </div>
          <ChevronsLeftRight className='rotate-90 ml-2 text-muted-foreground h-4 w-4' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-80'
        alignOffset={11}
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