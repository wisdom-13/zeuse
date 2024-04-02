import { FileWithPreview, HouseBuild } from '@/types';

import { useState } from 'react';
import Image from 'next/image';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Plus } from 'lucide-react';
import { toast } from 'sonner';

import ColorPickerButton from '@/components/ColorPickerButton';
import { colorArr, radiusArr } from '@/data/theme';

interface ThemeContentProps {
  house: HouseBuild;
  updateHouse: (updatedHouse: HouseBuild) => void;
}

const ThemeContent = ({
  house,
  updateHouse
}: ThemeContentProps) => {
  const { supabaseClient } = useSessionContext();
  const { style } = house;

  const [logoImage, setLogoImage] = useState<FileWithPreview>();
  const [bgImage, setBgImage] = useState<FileWithPreview>();

  const handleTheme = async (type: string, value: string) => {
    const { error } = await supabaseClient
      .from('style')
      .update({ [type]: value })
      .eq('house_id', house.id);

    if (error) {
      toast.error(error.message);
    } else {
      if (type == 'mode') {
        if (value == 'light') {
          document.body.classList.remove('dark');
          document.getElementById('theme-wrap')?.classList.remove('dark');
        } else if (value == 'dark') {
          document.body.classList.add('dark');
          document.getElementById('theme-wrap')?.classList.add('dark');
        }
      } else if (type == 'color') {
        document.body.classList.replace(`color-${style.color}`, `color-${value}`);
        document.getElementById('theme-wrap')?.classList.replace(`color-${style.color}`, `color-${value}`);

      } else if (type == 'radius') {
        document.body.classList.replace(`radius-${style.radius}`, `radius-${value}`);
        document.getElementById('theme-wrap')?.classList.replace(`radius-${style.radius}`, `radius-${value}`);
      }

      updateHouse({
        ...house,
        style: {
          ...house.style,
          [type]: value
        }
      });
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.id || !event.target.files) return

    const id = event.target.id;
    const image = event.target.files[0];
    const setImage = id == 'logoImage' ? setLogoImage : setBgImage;

    setImage(Object.assign(image, {
      preview: URL.createObjectURL(image)
    }));

  }

  return (
    <ScrollArea className='h-full'>
      <h2 className='text-xl font-medium'>
        외관
      </h2>
      <Separator className="my-4" />
      <div className='flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-base'>로고</h3>
            <p className='text-sm text-muted-foreground'>하우스를 대표하는 이미지를 등록하세요.</p>
          </div>
          <label
            htmlFor='logoImage'
            className='dropzone flex items-center justify-center rounded-md border text-muted-foreground w-32 h-16 relative overflow-hidden mt-2'
          >
            <input
              id='logoImage'
              accept='image/*,.jpeg,.jpg,.png'
              type='file'
              onChange={handleImageUpload}
              className='hidden'
            />
            {style.logo_image || logoImage?.preview ? (
              <Image
                src={style.logo_image ?? logoImage?.preview}
                alt="Preview"
                fill
                className='object-contain'
              />
            ) : (
              <p className='flex gap-x-2 justify-center items-center text-sm'>
                <Plus size={16} />
                업로드
              </p>
            )}
          </label>
        </div>
        <Separator className="my-2" />
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-base'>배경 이미지</h3>
            <p className='text-sm text-muted-foreground'>하우스 배경 이미지를 등록하세요.</p>
          </div>
          <div className='relative text-right'>
            <label
              htmlFor='bgImage'
              className='dropzone flex items-center justify-center rounded-md border text-muted-foreground w-32 h-16 relative overflow-hidden mt-2'
            >
              <input
                id='bgImage'
                accept='image/*,.jpeg,.jpg,.png'
                type='file'
                onChange={handleImageUpload}
                className='hidden'
              />
              {style.bg_image || bgImage?.preview ? (
                <Image
                  src={style.bg_image ?? bgImage?.preview}
                  alt="Preview"
                  fill
                  className='object-cover'
                />
              ) : (
                <p className='flex gap-x-2 justify-center items-center text-sm'>
                  <Plus size={16} />
                  업로드
                </p>
              )}
            </label>
          </div>
        </div>
        <Separator className="my-2" />
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-base'>배경색</h3>
            <p className='text-sm text-muted-foreground'>배경 이미지가 등록되어 있을 경우 적용되지 않습니다.</p>
          </div>
          <div className='relative text-right'>
            <ColorPickerButton color={style.bg_color} />
          </div>
        </div>
        <Separator className="my-2" />
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-base'>메인 색상</h3>
            <p className='text-sm text-muted-foreground'>하우스의 메인 색상을 변경해보세요.</p>
          </div>
          <div>
            <Select defaultValue={style.color} onValueChange={(v) => handleTheme('color', v)}>
              <SelectTrigger className='w-40'>
                <SelectValue placeholder="색상을 선택하세요." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {colorArr.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      <div className='flex items-center'>
                        <span className='inline-block mr-2 h-5 w-5 shrink-0 rounded-full' style={{ background: item.color }}></span>
                        <span>{item.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-base'>테두리 둥글게</h3>
            <p className='text-sm text-muted-foreground'>박스 테두리를 둥글게 변경해보세요.</p>
          </div>
          <div>
            <Select defaultValue={style.radius} onValueChange={(v) => handleTheme('radius', v)}>
              <SelectTrigger className='w-40'>
                <SelectValue placeholder="수치를 선택하세요." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {radiusArr.map((item) => (
                    <SelectItem key={item} value={String(item * 100)}>
                      {String(item * 100)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-base'>모드</h3>
            <p className='text-sm text-muted-foreground'>하우스 모드를 변경해보세요.</p>
          </div>
          <div>
            <Select defaultValue={style.mode} onValueChange={(v) => handleTheme('mode', v)}>
              <SelectTrigger className='w-40'>
                <SelectValue placeholder="모드를 선택하세요." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='light'>라이트 모드</SelectItem>
                  <SelectItem value='dark'>다크 모드</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

      </div>
    </ScrollArea>
  );
}

export default ThemeContent;