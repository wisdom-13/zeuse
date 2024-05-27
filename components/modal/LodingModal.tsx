import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import useLodingModal from '@/hooks/useLodingModal';
import { Spinner } from '../Spinner';

const LodingModal = () => {
  const { onClose, isOpen } = useLodingModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className=' w-auto' hideCloseButton={true}>
        <Spinner size='lg' />
      </DialogContent>
    </Dialog>
  );
}

export default LodingModal;