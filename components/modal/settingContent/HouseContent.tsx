import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { HouseBuild } from '@/types';

interface HouseContentProps {
  house: HouseBuild;
  setHouseBuild: (updatedHouse: HouseBuild) => void;
}


const HouseContent = ({
  house,
  setHouseBuild
}: HouseContentProps) => {
  console.log(house);
  return (
    <>
      <ScrollArea>
        <h2 className='text-xl font-medium'>
          하우스
        </h2>
        <Separator className="my-4" />
        <div className='flex flex-col gap-y-4'>
          <div className='flex flex-col gap-y-2'>
            <h3 className='text-base'>주소</h3>
            <p className='font-semibold'>zeuse.com/{house.address}</p>
          </div>
          <Separator className="my-2" />
          <div className='flex flex-col gap-y-2'>
            <h3 className='text-base'>하우스 이름</h3>
            <Input value={house.title} />
          </div>
          <Separator className="my-2" />
          <div className='flex flex-col gap-y-2'>
            <h3 className='text-base'>하우스 설명</h3>
            <Textarea value={house.description} />
          </div>
          <Separator className="my-2" />
          <div className='flex flex-col gap-y-4'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-base'>공개 여부</h3>
                <p className='text-sm text-muted-foreground'>하우스를 비공개로 설정할 경우 나와, Family로 설정된 사람만 접근할 수 있습니다.</p>
              </div>
              <div>
                <Switch />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className='flex gap-x-2 mt-4'>
        <Button>저장</Button>
        <Button variant='outline'>닫기</Button>
      </div>
    </>
  );
}

export default HouseContent;