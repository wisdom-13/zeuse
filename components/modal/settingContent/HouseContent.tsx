import { Separator } from '@/components/ui/separator';
import { HouseBuild } from '@/types';

interface HouseContentProps {
  house: HouseBuild;
  updateHouse: (updatedHouse: HouseBuild) => void;
}


const HouseContent = ({
  house,
  updateHouse
}: HouseContentProps) => {
  return (
    <div className='py-4 px-2 w-full'>
      <h2 className='text-xl font-medium'>
        하우스
      </h2>
      <Separator className="my-4" />

    </div>
  );
}

export default HouseContent;