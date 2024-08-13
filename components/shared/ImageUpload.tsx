import Image from 'next/image';
import { Plus } from 'lucide-react';
import withSettingItem from './withSettingItem';

interface ImageUploadProps {
  id: string;
  src?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUpload = ({ id, src, onChange }: ImageUploadProps) => (
  <label htmlFor={id} className='relative flex justify-center items-center mt-2 border rounded-md w-32 h-16 text-muted-foreground overflow-hidden'>
    <input id={id} accept='image/*,.jpeg,.jpg,.png' type='file' onChange={onChange} className='hidden' />
    {src ? (
      <Image src={src} alt={id} fill className='object-contain' />
    ) : (
      <p className='flex justify-center items-center gap-x-2 text-sm'>
        <Plus size={16} />
        업로드
      </p>
    )}
  </label>
);

export const ImageUploadWithSetting = withSettingItem(ImageUpload);