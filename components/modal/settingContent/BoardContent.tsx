import { Separator } from '@/components/ui/separator';
import { HouseBuild } from '@/types';

interface BoardContentProps {
  house: HouseBuild;
  setHouseBuild: (updatedHouse: HouseBuild) => void;
}


const BoardContent = ({
  house,
  setHouseBuild
}: BoardContentProps) => {
  return (
    <div className='py-4 px-2 w-full'>
      <h2 className='text-xl font-medium'>
        게시판
      </h2>
      <Separator className="my-4" />

    </div>
  );
}

export default BoardContent;