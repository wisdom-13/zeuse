import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useSettingModal from '@/hooks/useSettingModal';
import useWidgetEdit from '@/hooks/useWidgetEdit';
import { HouseBuild } from '@/types';
import { useRouter } from 'next/navigation';

interface WidgetContentProps {
  house: HouseBuild;
  updateHouse: (updatedHouse: HouseBuild) => void;
}


const WidgetContent = ({
  house,
  updateHouse
}: WidgetContentProps) => {
  const widgetEdit = useWidgetEdit();
  const settingModal = useSettingModal();

  const router = useRouter();

  const handleClick = () => {
    router.push(`/${house.address}`);
    settingModal.onClose();
    widgetEdit.onEditingStart();
  }

  return (
    <div className='py-4 px-2 w-full'>
      <h2 className='text-xl font-medium'>
        위젯
      </h2>
      <Separator className="my-4" />
      <div className='flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h3>위젯 편집</h3>
            <p className='text-sm text-muted-foreground'>메인 화면의 위젯을 편집할 수 있어요.</p>
          </div>
          <div>
            <Button
              variant='outline'
              onClick={handleClick}
            >
              위젯 편집하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetContent;