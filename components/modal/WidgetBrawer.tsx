'use client';


import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
} from '@/components/ui/drawer'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import useWidgetEdit from '@/hooks/useWidgetEdit';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import useHouseBuild from '@/hooks/useHouseBuild';
import { Widget } from '@/app/(house)/(routes)/[houseAddress]/_components/Widget';
import WidgetImage from '@/app/(house)/(routes)/[houseAddress]/_components/WidgetImage';
import { Plus } from 'lucide-react';
import WidgetBoard from '@/app/(house)/(routes)/[houseAddress]/_components/WidgetBoard';
import WidgetProfile from '@/app/(house)/(routes)/[houseAddress]/_components/WidgetProfile';
import WidgetTimer from '@/app/(house)/(routes)/[houseAddress]/_components/WidgetTimer';

export function WidgetBrawer() {
  const { houseId, houseBuild, setHouseBuild } = useHouseBuild();
  const widgetEdit = useWidgetEdit();
  const param = useParams();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);

  if (!houseBuild) {
    return false;
  }

  const onChange = (open: boolean) => {
    if (!open) {
      widgetEdit.onBrawerClose();
    }
  }

  const handelAddWidget = async (type: string, grid: { col: number, row: number }) => {
    setIsLoading(true);

    const {
      data: newWidget,
      error
    } = await supabaseClient
      .from('widget')
      .insert({
        house_id: houseId,
        type: type,
        grid: grid
      })
      .select()
      .single();

    if (error) {
      setIsLoading(false);
      console.error(error.message)
      return toast.error(`error (${error.message})`);
    }

    const updatedHouse = {
      ...houseBuild,
      widget: [...houseBuild.widget, newWidget]
    };

    setHouseBuild(updatedHouse)
  }

  const sampleBoardId = houseBuild.board.filter((item) => item.type == 'post')[0]?.id;


  return (
    <Drawer open={widgetEdit.isBrawerOpen} onOpenChange={onChange}>
      <DrawerContent className='w-[1000px] m-auto'>
        <div className='mx-auto w-full p-4'>
          <div className=''>
            <Tabs defaultValue='image' className='flex justify-start'>
              <TabsList orientation='vertical'>
                <TabsTrigger className='w-32 text-start' value='image'>이미지</TabsTrigger>
                <TabsTrigger className='w-32 text-start' value='board'>게시판</TabsTrigger>
                <TabsTrigger className='w-32 text-start' value='profile'>프로필</TabsTrigger>
                <TabsTrigger className='w-32 text-start' value='timer'>타이머</TabsTrigger>
                <TabsTrigger className='w-32 text-start' value='empty'>빈</TabsTrigger>
              </TabsList>
              <TabsContent value='image' className='w-full'>
                <div className='grid grid-cols-3'>
                  <div className='group relative flex flex-col items-center' onClick={() => handelAddWidget('image', { col: 1, row: 1 })}>
                    <div className='h-[286px] flex items-center'>
                      <div className='w-[128px] h-[130px] scale-75 custom-card rounded-md text-card-foreground'>
                        <WidgetImage />
                        <button className='hidden group-hover:block absolute z-[999999] -left-1.5 -top-1.5 bg-green-400 rounded-full p-1'>
                          <Plus size={16} className='text-white' />
                        </button>
                      </div>
                    </div>
                    <p className='font-bold text-sm mb-2'>이미지형 1x1</p>
                  </div>
                  <div className='group relative flex flex-col items-center' onClick={() => handelAddWidget('image', { col: 1, row: 1 })}>
                    <div className='h-[286px] flex items-center'>
                      <div className='w-[282px] h-[130px] scale-75 custom-card rounded-md text-card-foreground'>
                        <WidgetImage />
                        <button className='hidden group-hover:block absolute z-[999999] -left-1.5 -top-1.5 bg-green-400 rounded-full p-1'>
                          <Plus size={16} className='text-white' />
                        </button>
                      </div>
                    </div>
                    <p className='font-bold text-sm mb-2'>이미지형 1x1</p>
                  </div>
                  <div className='group relative flex flex-col items-center' onClick={() => handelAddWidget('image', { col: 1, row: 1 })}>
                    <div className='h-[286px] flex items-center'>
                      <div className='w-[282px] h-[286px] scale-75 custom-card rounded-md text-card-foreground'>
                        <WidgetImage />
                        <button className='hidden group-hover:block absolute z-[999999] -left-1.5 -top-1.5 bg-green-400 rounded-full p-1'>
                          <Plus size={16} className='text-white' />
                        </button>
                      </div>
                    </div>
                    <p className='font-bold text-sm mb-2'>이미지형 1x1</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='board' className='w-full'>
                <div className='grid grid-cols-3'>
                  <div className='group relative flex flex-col items-center' onClick={() => handelAddWidget('board', { col: 2, row: 2 })}>
                    <div className='h-[286px] flex items-center'>
                      <div className='w-[282px] h-[286px] scale-75 custom-card rounded-md text-card-foreground'>
                        <WidgetBoard widget={{ board_id: sampleBoardId }} />
                        <button className='hidden group-hover:block absolute z-[999999] -left-1.5 -top-1.5 bg-green-400 rounded-full p-1'>
                          <Plus size={16} className='text-white' />
                        </button>
                      </div>
                    </div>
                    <p className='font-bold text-sm mb-2'>게시판형 2x2</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='profile'>
                {/* <Button
                  onClick={() => handelAddWidget('profile', { col: 2, row: 1 })}
                >
                  프로필 (2x1)
                </Button> */}
                <div className='grid grid-cols-3'>
                  <div className='group relative flex flex-col items-center' onClick={() => handelAddWidget('profile', { col: 2, row: 1 })}>
                    <div className='h-[286px] flex items-center'>
                      <div className='w-[282px] h-[130px] scale-75 custom-card rounded-md text-card-foreground'>
                        <WidgetProfile widget={{ grid: { col: 2, row: 1 } }} />
                        <button className='hidden group-hover:block absolute z-[999999] -left-1.5 -top-1.5 bg-green-400 rounded-full p-1'>
                          <Plus size={16} className='text-white' />
                        </button>
                      </div>
                    </div>
                    <p className='font-bold text-sm mb-2'>프로필형 2x1</p>
                  </div>
                  <div className='group relative flex flex-col items-center' onClick={() => handelAddWidget('profile', { col: 2, row: 2 })}>
                    <div className='h-[286px] flex items-center'>
                      <div className='w-[282px] h-[282px] scale-75 custom-card rounded-md text-card-foreground'>
                        <WidgetProfile widget={{ grid: { col: 2, row: 2 } }} />
                        <button className='hidden group-hover:block absolute z-[999999] -left-1.5 -top-1.5 bg-green-400 rounded-full p-1'>
                          <Plus size={16} className='text-white' />
                        </button>
                      </div>
                    </div>
                    <p className='font-bold text-sm mb-2'>프로필형 2x2</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='timer'>
                <div className='grid grid-cols-3'>
                  <div className='group relative flex flex-col items-center' onClick={() => handelAddWidget('timer', { col: 2, row: 1 })}>
                    <div className='h-[286px] flex items-center'>
                      <div className='w-[282px] h-[130px] scale-75 custom-card rounded-md text-card-foreground'>
                        <WidgetTimer />
                        <button className='hidden group-hover:block absolute z-[999999] -left-1.5 -top-1.5 bg-green-400 rounded-full p-1'>
                          <Plus size={16} className='text-white' />
                        </button>
                      </div>
                    </div>
                    <p className='font-bold text-sm mb-2'>타이머 2x1</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='empty'>
                Change your password here.
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
