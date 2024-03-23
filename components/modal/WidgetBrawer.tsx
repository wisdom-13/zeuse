'use client';


import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer"
import useWidgetEdit from '@/hooks/useWidgetEdit';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import useHouseBuild from '@/hooks/useHouseBuild';

export function WidgetBrawer() {
  const { houseId, houseBuild, setHouseBuild } = useHouseBuild();
  const widgetEdit = useWidgetEdit();
  const param = useParams();
  const router = useRouter();
  const superbaseClient = useSupabaseClient();
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
    } = await superbaseClient
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


  return (
    <Drawer open={widgetEdit.isBrawerOpen} onOpenChange={onChange}>
      {/* <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger> */}
      <DrawerContent>
        <div className="mx-auto w-full">
          <div className="p-4">
            <Button
              onClick={() => handelAddWidget('image', { col: 2, row: 4 })}
            >
              이미지형 (2x4)
            </Button>
            <Button
              onClick={() => handelAddWidget('image', { col: 1, row: 1 })}
            >
              이미지형 (1x1)
            </Button>
            <Button
              onClick={() => handelAddWidget('board', { col: 2, row: 2 })}
            >
              게시판 (2x2)
            </Button>
            <Button
              onClick={() => handelAddWidget('profile', { col: 2, row: 1 })}
            >
              프로필 (2x1)
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
