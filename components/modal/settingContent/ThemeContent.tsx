import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from '@/components/ui/separator';
import { HouseBuild } from '@/types';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';

const themeArr = [
  {
    name: 'zinc',
    color: '#18181B'
  },
  {
    name: 'slate',
    color: '#677489'
  },
  {
    name: 'rose',
    color: '#CF364C'
  },
  {
    name: 'blue',
    color: '#3662E3'
  },
  {
    name: 'green',
    color: '#4CA154'
  },
  {
    name: 'orange',
    color: '#E87B35'
  },
];

const radius = [0, 0.3, 0.5, 0.75, 1.0];

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

  return (
    <div className='py-4 px-2 w-full'>
      <h2 className='text-xl font-medium'>
        테마
      </h2>
      <Separator className="my-4" />
      <div className='flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h3>메인 색상</h3>
            <p className='text-sm text-muted-foreground'>하우스의 메인 색상을 변경해보세요.</p>
          </div>
          <div>
            <Select defaultValue={style.color} onValueChange={(v) => handleTheme('color', v)}>
              <SelectTrigger className='w-40'>
                <SelectValue placeholder="색상을 선택하세요." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {themeArr.map((item) => (
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
            <h3>테두리 둥글게</h3>
            <p className='text-sm text-muted-foreground'>박스 테두리를 둥글게 변경해보세요.</p>
          </div>
          <div>
            <Select defaultValue={style.radius} onValueChange={(v) => handleTheme('radius', v)}>
              <SelectTrigger className='w-40'>
                <SelectValue placeholder="수치를 선택하세요." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {radius.map((item) => (
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
            <h3>모드</h3>
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
    </div>
  );
}

export default ThemeContent;