'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import useWidgetEdit from '@/hooks/useWidgetEdit';
import { Widget } from './Widget';
import { EditWidget } from './EditWidget';
import { Button } from '@/components/ui/button';
import { PlusSquare, SquareCheck } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useHouseBuild from '@/hooks/useHouseBuild';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';
import { Widget as WidgetType } from '@/types';


const HouseMain = () => {
  const { houseBuild, setHouseBuild } = useHouseBuild();
  const widgetEdit = useWidgetEdit();
  const supabaseClient = useSupabaseClient();

  const WidgetItem = widgetEdit.isEditing ? EditWidget : Widget;

  const [widgets, setWidgets] = useState<WidgetType[]>([]);

  const widget = useMemo(() => {
    if (houseBuild?.widget) {
      return houseBuild.widget.sort((a, b) => a.order - b.order);
    } else {
      return [];
    }
  }, [houseBuild?.widget]);

  useEffect(() => {
    setWidgets(widget);
  }, [widget]);


  const moveWidget = useCallback((dragIndex: number, hoverIndex: number) => {
    const newWidgets = [...widgets];
    const draggedWidget = newWidgets[dragIndex];
    newWidgets.splice(dragIndex, 1);
    newWidgets.splice(hoverIndex, 0, draggedWidget);
    setWidgets(newWidgets);
  }, [widgets]);

  const removeWidget = async (event: React.MouseEvent<HTMLButtonElement>, widget: WidgetType) => {
    event.stopPropagation();

    if (!houseBuild) {
      return false;
    }

    if (widget.type == 'image' && widget.image_array) {
      await supabaseClient
        .storage
        .from('widget')
        .remove(widget.image_array)
    }

    const { error } = await supabaseClient
      .from('widget')
      .delete()
      .eq('id', widget.id)

    if (error) {
      toast.error('변경사항을 저장하는 중 오류가 발생했습니다.');
      return
    }

    const updatedHouse = {
      ...houseBuild,
      widget: houseBuild?.widget.filter((item) => item.id != widget.id)
    };

    setHouseBuild(updatedHouse)
  }

  const updateWidget = async () => {
    try {
      widgets.map(async (data, i) => {
        await supabaseClient
          .from('widget')
          .update({ order: i })
          .eq('id', data.id);
      })
    } catch (error) {
      toast.error('위젯 정보를 업데이트 하는 도중 오류가 발생했습니다.');
    }
  }

  if (houseBuild === undefined) {
    return (
      <div className='w-[900px] h-[600px] grid grid-cols-6 grid-rows-4 grid-flow-dense gap-6'>
        <Widget.Skeleton />
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      {widgetEdit.isEditing && (
        <div className='absolute top-6 left-1/2 transform -translate-x-1/2 bg-background p-2 rounded-md flex gap-x-2'>
          <Button
            className='flex gap-x-2'
            variant='ghost'
            onClick={widgetEdit.onBrawerOpen}
          >
            <PlusSquare size={18} />
            위젯추가
          </Button>
          <Button
            className='flex gap-x-2'
            variant='ghost'
            onClick={widgetEdit.onEditingEnd}
          >
            <SquareCheck size={18} />
            편집완료
          </Button>
        </div>
      )}

      <main
        className='w-[900px] h-[600px] grid grid-cols-6 grid-rows-4 grid-flow-dense gap-6'
      >
        {widgets.map((widget, i) => (
          <WidgetItem
            key={widget.id}
            index={i}
            widget={widget}
            moveWidget={moveWidget}
            removeWidget={removeWidget}
            updateWidget={updateWidget}
          />
        ))}
      </main>
    </DndProvider>
  );
}

export default HouseMain;