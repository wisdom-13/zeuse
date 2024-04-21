import { HouseBuild } from '@/types';

import Image from 'next/image';

import { getPublicUrl } from '@/util/getPublicUrl';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';


interface FamilyContentProps {
  house: HouseBuild;
  setHouseBuild: (updatedHouse: HouseBuild) => void;
}


const FamilyContent = ({
  house,
  setHouseBuild
}: FamilyContentProps) => {
  return (
    <ScrollArea>
      <h2 className='text-xl font-medium'>
        패밀리
      </h2>
      <Separator className='my-4' />
      <div className='flex flex-col gap-y-4 py-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-base'>패밀리 초대</h3>
            <p className='text-sm text-muted-foreground'>새 패밀리를 초대할 수 있도록 비밀 링크를 활성화하세요.</p>
          </div>
          <div>
            <Button
              variant='outline'
            >
              초대 링크 생성
            </Button>
          </div>
        </div>
      </div>
      <Separator className='my-4' />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>사용자</TableHead>
            <TableHead>권한</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {house.family.map((item) => (
            <TableRow key={item.id}>
              <TableCell className='flex items-center gap-x-2'>
                <Avatar className='h-6 w-6'>
                  <AvatarImage src={item.avatar_path ? getPublicUrl(`profile/${item.avatar_path}`) : item.avatar_url} />
                  {
                    item.avatar_path ? (
                      <AvatarImage asChild src={item.avatar_path ? getPublicUrl(`profile/${item.avatar_path}`) : item.avatar_url}>
                        <Image src={getPublicUrl(`profile/${item.avatar_path}`)} alt='avatar' fill />
                      </AvatarImage>
                    ) : (
                      <AvatarImage src={item.avatar_url} />
                    )
                  }
                  <AvatarFallback className='text-xs'>{item.nick_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className='font-semibold'>{item.nick_name}</span>
                <span className='text-muted-foreground'>(이메일@gmail.com)</span>
              </TableCell>
              <TableCell>{item.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}

export default FamilyContent;