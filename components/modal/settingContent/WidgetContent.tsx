import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import useSettingModal from '@/hooks/useSettingModal';
import useWidgetEdit from '@/hooks/useWidgetEdit';
import { HouseBuild } from '@/types';
import { useRouter } from 'next/navigation';

interface WidgetContentProps {
  house: HouseBuild;
  setHouseBuild: (updatedHouse: HouseBuild) => void;
}


const WidgetContent = ({
  house,
  setHouseBuild
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
    <ScrollArea>
      <h2 className='text-xl font-medium'>
        위젯
      </h2>
      <Separator className='my-4' />
      <div className='flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-base'>위젯 편집</h3>
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
    </ScrollArea>
  );
}

export default WidgetContent;