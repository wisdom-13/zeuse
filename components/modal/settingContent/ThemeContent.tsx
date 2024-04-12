import { FileWithPreview, HouseBuild } from '@/types';

import { useState } from 'react';
import Image from 'next/image';

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
import { v4 as uuid } from 'uuid';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import ColorPickerButton from '@/components/ColorPickerButton';
import { colorArr, opacityArr, radiusArr } from '@/data/theme';
import { getPublicUrl } from '@/util/getPublicUrl';

interface ThemeContentProps {
  house: HouseBuild;
  setHouseBuild: (updatedHouse: HouseBuild) => void;
}

const ThemeContent = ({
  house,
  setHouseBuild
}: ThemeContentProps) => {
  const supabaseClient = useSupabaseClient();
  const { style } = house;

  const [logoImage, setLogoImage] = useState<FileWithPreview>();
  const [bgImage, setBgImage] = useState<FileWithPreview>();

  const handleUpdateStyle = async (type: string, value: string) => {
    const { error } = await supabaseClient
      .from('style')
      .update({ [type]: value })
      .eq('house_id', house.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    setHouseBuild({
      ...house,
      style: {
        ...house.style,
        [type]: value
      }
    });
  }

  const handleUpdateBoxStyle = async (type: string, value: string) => {
    const { error } = await supabaseClient
      .from('style')
      .update({
        box_style: {
          ...style.box_style,
          [type]: value
        }
      })
      .eq('house_id', house.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    setHouseBuild({
      ...house,
      style: {
        ...house.style,
        box_style: {
          ...style.box_style,
          [type]: value
        }
      }
    });
  }


  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.id || !event.target.files) return

    const id = event.target.id;
    const image = event.target.files[0];
    const setImage = id == 'logo_image' ? setLogoImage : setBgImage;
    setImage(image);

    const { data, error } = await supabaseClient
      .storage
      .from(`style/${id == 'logo_image' ? 'logo' : 'background'}`)
      .upload(`${id}-${uuid()}`, image, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      toast.error('이미지를 업로드하는 중 오류가 발생했습니다.');
    }

    if (data) {
      handleUpdateStyle(id, `style/${id == 'logo_image' ? 'logo' : 'background'}/${data.path}`);
    }
  }

  return (
    <ScrollArea className='h-full pb-4'>
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
            htmlFor='logo_image'
            className='dropzone flex items-center justify-center rounded-md border text-muted-foreground w-32 h-16 relative overflow-hidden mt-2'
          >
            <input
              id='logo_image'
              accept='image/*,.jpeg,.jpg,.png'
              type='file'
              onChange={handleImageUpload}
              className='hidden'
            />
            {style.logo_image ? (
              <Image
                src={getPublicUrl(style.logo_image)}
                alt="logo_image"
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
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-base'>배경 이미지</h3>
            <p className='text-sm text-muted-foreground'>하우스 배경 이미지를 등록하세요.</p>
          </div>
          <div className='relative text-right'>
            <label
              htmlFor='bg_image'
              className='dropzone flex items-center justify-center rounded-md border text-muted-foreground w-32 h-16 relative overflow-hidden mt-2'
            >
              <input
                id='bg_image'
                accept='image/*,.jpeg,.jpg,.png'
                type='file'
                onChange={handleImageUpload}
                className='hidden'
              />
              {style.bg_image ? (
                <Image
                  src={getPublicUrl(style.bg_image)}
                  alt="bg_image"
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
            <Select defaultValue={style.color} onValueChange={(v) => handleUpdateStyle('color', v)}>
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
            <h3 className='text-base'>모드</h3>
            <p className='text-sm text-muted-foreground'>하우스 모드를 변경해보세요.</p>
          </div>
          <div>
            <Select defaultValue={style.mode} onValueChange={(v) => handleUpdateStyle('mode', v)}>
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
        <Separator className="my-2" />
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-base'>박스 테두리</h3>
            <p className='text-sm text-muted-foreground'>박스 테두리 스타일을 설정하세요.</p>
          </div>
          <div>
            <Select defaultValue={style.box_style.border} onValueChange={(v) => handleUpdateBoxStyle('border', v)}>
              <SelectTrigger className='w-40'>
                <SelectValue placeholder="수치를 선택하세요." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem key='line' value='line'>선</SelectItem>
                  <SelectItem key='shadow' value='shadow'>그림자</SelectItem>
                  <SelectItem key='none' value='none'>테두리 없음</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-base'>박스 배경</h3>
            <p className='text-sm text-muted-foreground'>박스 배경의 투명도를 설정하세요.</p>
          </div>
          <div>
            <Select defaultValue={style.box_style.opacity} onValueChange={(v) => handleUpdateBoxStyle('opacity', v)}>
              <SelectTrigger className='w-40'>
                <SelectValue placeholder="수치를 선택하세요." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {opacityArr.map((item) => (
                    <SelectItem key={item} value={String(item)}>
                      {item * 100}%
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
            <p className='text-sm text-muted-foreground'>박스 테두리를 둥글게 변경해보세요. 숫자가 클수록 둥글고 작을수록 각집니다.</p>
          </div>
          <div>
            <Select defaultValue={style.box_style.radius} onValueChange={(v) => handleUpdateBoxStyle('radius', v)}>
              <SelectTrigger className='w-40'>
                <SelectValue placeholder="수치를 선택하세요." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {radiusArr.map((item) => (
                    <SelectItem key={item} value={String(item)}>
                      {String(item)}
                    </SelectItem>
                  ))}
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