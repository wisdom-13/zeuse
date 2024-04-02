import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/hooks/useUser';
import { HouseBuild } from '@/types';

interface ProfileContentProps {
  house: HouseBuild;
  updateHouse: (updatedHouse: HouseBuild) => void;
}


const ProfileContent = ({
  house,
  updateHouse
}: ProfileContentProps) => {
  const { user } = useUser();
  const myProfile = house.family.filter((item) => item.user_id === user?.id)[0];


  return (
    <ScrollArea>
      <h2 className='text-xl font-medium'>
        프로필
      </h2>
      <Separator className="my-4" />
      <div className='flex gap-x-4 items-center'>
        <Avatar className='h-16 w-16 border'>
          <AvatarImage src={myProfile.avatar_url} />
          <AvatarFallback className='text-xs'>{myProfile.nick_name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className='text-muted-foreground text-sm pb-1'>하우스에서 사용할 이름</p>
          <Input value={myProfile.nick_name} />
        </div>
      </div>
    </ScrollArea>
  );
}

export default ProfileContent;