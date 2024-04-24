'use client';

import { useState } from 'react';

import { toast } from 'sonner';
import { Plus } from 'lucide-react';

import useWidgetEdit from '@/hooks/useWidgetEdit';
import useHouseBuild from '@/hooks/useHouseBuild';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import {
  Drawer,
  DrawerContent,
} from '@/components/ui/drawer';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

import WidgetImage from '@/components/widget/WidgetImage';
import WidgetBoard from '@/components/widget/WidgetBoard';
import WidgetProfile from '@/components/widget/WidgetProfile';
import WidgetTimer from '@/components/widget/WidgetTimer';
import WidgetEmpty from '@/components/widget/WidgetEmpty';

export function WidgetBrawer() {
  const { houseId, houseBuild, setHouseBuild } = useHouseBuild();
  const widgetEdit = useWidgetEdit();
  const supabaseClient = useSupabaseClient();

  const [imageGrid, setImageGrid] = useState({ col: 4, row: 6 })
  const [emptyGrid, setEmptyGrid] = useState({ col: 4, row: 6 })

  if (!houseBuild) {
    return false;
  }

  const onChange = (open: boolean) => {
    if (!open) {
      widgetEdit.onBrawerClose();
    }
  }

  const handleAddWidget = async (type: string, grid: { col: number, row: number }, ...props: any[]) => {
    const {
      data: newWidget,
      error
    } = await supabaseClient
      .from('widget')
      .insert({
        house_id: houseId,
        type: type,
        grid: grid,
        order: houseBuild.widget.length,
        ...Object.assign({}, ...props)
      })
      .select()
      .single();

    if (error) {
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
                <TabsTrigger className='w-32 text-start' value='empty'>공백</TabsTrigger>
              </TabsList>
              <TabsContent value='image' className='w-full'>
                <div className='grid grid-cols-3'>
                  <div className='group relative flex flex-col items-center'>
                    <div className='h-[286px] flex items-center'>
                      <div
                        className='w-[128px] h-[130px] scale-75 custom-card rounded-md text-card-foreground'
                        onClick={() => handleAddWidget('image', { col: 2, row: 3 })}
                      >
                        <WidgetImage />
                        <button className='hidden group-hover:block absolute z-[999999] -left-1.5 -top-1.5 bg-green-400 rounded-full p-1'>
                          <Plus size={16} className='text-white' />
                        </button>
                      </div>
                    </div>
                    <p className='font-bold text-sm mb-2'>이미지형 1x1</p>
                  </div>
                  <div className='group relative flex flex-col items-center'>
                    <div className='h-[286px] flex items-center'>
                      <div
                        className='w-[282px] h-[130px] scale-75 custom-card rounded-md text-card-foreground'
                        onClick={() => handleAddWidget('image', { col: 4, row: 3 })}
                      >
                        <WidgetImage />
                        <button className='hidden group-hover:block absolute z-[999999] -left-1.5 -top-1.5 bg-green-400 rounded-full p-1'>
                          <Plus size={16} className='text-white' />
                        </button>
                      </div>
                    </div>
                    <p className='font-bold text-sm mb-2'>이미지형 2x1</p>
                  </div>
                  <div className='group relative flex flex-col items-center'>
                    <div className='h-[286px] w-2/3 flex flex-col justify-center items-center text-center gap-y-2'>
                      <Select
                        defaultValue={String(imageGrid.col)}
                        onValueChange={(value) => setEmptyGrid({ ...imageGrid, col: parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='col' />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 6 }, (_, index) => index + 1).map(col => (
                            <SelectItem key={col} value={String(col * 2)}>Col : {col}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      x
                      <Select
                        defaultValue={String(imageGrid.row)}
                        onValueChange={(value) => setEmptyGrid({ ...imageGrid, row: parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='row' />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 4 }, (_, index) => index + 1).map(row => (
                            <SelectItem key={row} value={String(row * 3)}>Row : {row}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        className='w-full'
                        onClick={() => handleAddWidget('image', { col: imageGrid.col, row: imageGrid.row })}
                      >
                        추가
                      </Button>
                    </div>
                    <p className='font-bold text-sm mb-2'>크기 선택</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='board' className='w-full'>
                <div className='grid grid-cols-3'>
                  <div className='group relative flex flex-col items-center'>
                    <div className='h-[286px] flex items-center'>
                      <div
                        className='w-[282px] h-[286px] scale-75 custom-card rounded-md text-card-foreground'
                        onClick={() => handleAddWidget('board', { col: 4, row: 6 }, { option_id: sampleBoardId, option_bool: true })}
                      >
                        <WidgetBoard widget={{ option_id: sampleBoardId }} />
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
                <div className='grid grid-cols-3'>
                  <div className='group relative flex flex-col items-center'>
                    <div className='h-[286px] flex items-center'>
                      <div
                        className='w-[282px] h-[130px] scale-75 custom-card rounded-md text-card-foreground'
                        onClick={() => handleAddWidget('profile', { col: 4, row: 3 })}
                      >
                        <WidgetProfile widget={{ grid: { col: 2, row: 1 } }} />
                        <button className='hidden group-hover:block absolute z-[999999] -left-1.5 -top-1.5 bg-green-400 rounded-full p-1'>
                          <Plus size={16} className='text-white' />
                        </button>
                      </div>
                    </div>
                    <p className='font-bold text-sm mb-2'>프로필형 2x1</p>
                  </div>
                  <div className='group relative flex flex-col items-center'>
                    <div className='h-[286px] flex items-center'>
                      <div
                        className='w-[282px] h-[282px] scale-75 custom-card rounded-md text-card-foreground'
                        onClick={() => handleAddWidget('profile', { col: 4, row: 6 })}
                      >
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
                  <div className='group relative flex flex-col items-center'>
                    <div className='h-[286px] flex items-center'>
                      <div
                        className='w-[282px] h-[130px] scale-75 custom-card rounded-md text-card-foreground'
                        onClick={() => handleAddWidget('timer', { col: 4, row: 3 })}
                      >
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
                <div className='grid grid-cols-3'>
                  <div className='group relative flex flex-col items-center'>
                    <div className='h-[286px] flex items-center'>
                      <div
                        className='w-[128px] h-[130px] scale-75 custom-card border-dashed bg-primary/5 rounded-md text-card-foreground'
                        onClick={() => handleAddWidget('empty', { col: 2, row: 3 })}
                      >
                        <WidgetEmpty />
                        <button className='hidden group-hover:block absolute z-[999999] -left-1.5 -top-1.5 bg-green-400 rounded-full p-1'>
                          <Plus size={16} className='text-white' />
                        </button>
                      </div>
                    </div>
                    <p className='font-bold text-sm mb-2'>공백 1x1</p>
                  </div>
                  <div className='group relative flex flex-col items-center'>
                    <div className='h-[286px] flex items-center' onClick={() => handleAddWidget('empty', { col: 4, row: 3 })}>
                      <div
                        className='w-[282px] h-[130px] scale-75 custom-card border-dashed bg-primary/5 rounded-md text-card-foreground'
                        onClick={() => handleAddWidget('empty', { col: 4, row: 3 })}
                      >
                        <WidgetEmpty />
                        <button className='hidden group-hover:block absolute z-[999999] -left-1.5 -top-1.5 bg-green-400 rounded-full p-1'>
                          <Plus size={16} className='text-white' />
                        </button>
                      </div>
                    </div>
                    <p className='font-bold text-sm mb-2'>공백 2x1</p>
                  </div>
                  <div className='group relative flex flex-col items-center'>
                    <div className='h-[286px] w-2/3 flex flex-col justify-center items-center text-center gap-y-2'>
                      <Select
                        defaultValue={String(emptyGrid.col)}
                        onValueChange={(value) => setEmptyGrid({ ...emptyGrid, col: parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='col' />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 6 }, (_, index) => index + 1).map(col => (
                            <SelectItem key={col} value={String(col * 2)}>Col : {col}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      x
                      <Select
                        defaultValue={String(emptyGrid.row)}
                        onValueChange={(value) => setEmptyGrid({ ...emptyGrid, row: parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='row' />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 4 }, (_, index) => index + 1).map(row => (
                            <SelectItem key={row} value={String(row * 3)}>Row : {row}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        className='w-full'
                        onClick={() => handleAddWidget('empty', { col: emptyGrid.col, row: emptyGrid.row })}
                      >
                        추가
                      </Button>
                    </div>
                    <p className='font-bold text-sm mb-2'>크기 선택</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
