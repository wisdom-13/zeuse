'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import useWidgetEdit from '@/hooks/useWidgetEdit';
import { Widget } from './Widget';
import { EditWidget } from './EditWidget';
import { Button } from '@/components/ui/button';
import { PlusSquare, Save, SquareCheck, SquareX, X } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useHouseBuild from '@/hooks/useHouseBuild';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';
import { Widget as WidgetType } from '@/types';

export interface Item {
  id: string;
  order: number;
  grid?: {
    col: number,
    row: number
  }
  widgetData?: WidgetType | undefined;
}

const HouseMain = () => {
  const { houseBuild } = useHouseBuild();
  const widgetEdit = useWidgetEdit();
  const superbaseClient = useSupabaseClient();

  const Card = widgetEdit.isEditing ? EditWidget : Widget;

  const [cards, setCards] = useState<Item[]>([]);

  const widget = useMemo(() => {
    if (houseBuild?.widget) {
      return houseBuild.widget.map((item) => ({
        id: item.id,
        order: item.order,
        grid: item.grid,
        widgetData: item
      })).sort((a, b) => a.order - b.order);
    } else {
      return [];
    }
  }, [houseBuild?.widget]);

  useEffect(() => {
    setCards(widget);
  }, [widget]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const newCards = [...cards];
    const draggedCard = newCards[dragIndex];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, draggedCard);
    setCards(newCards);
  }, [cards]);

  const updateWidget = async () => {
    try {
      cards.map(async (data, i) => {
        await superbaseClient
          .from('widget')
          .update({ order: i })
          .eq('id', data.id);
      })

      widgetEdit.onEditingEnd();
      toast.success('위젯 편집 내용을 저장했습니다.')
    } catch (error) {
      toast.success(`위젯 편집 내용을 저장하는 중 오류가 발생하였습니다. : ${error}`)
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
            onClick={updateWidget}
          >
            <SquareCheck size={18} />
            편집완료
          </Button>
        </div>
      )}

      <main
        className='w-[900px] h-[600px] grid grid-cols-6 grid-rows-4 grid-flow-dense gap-6'
      >
        {cards.map((widget, i) => (
          <Card
            key={widget.id}
            index={i}
            id={widget.id}
            grid={widget.grid}
            isEditing={widgetEdit.isEditing}
            moveCard={moveCard}
            widgetData={widget.widgetData}
          />
        ))}
      </main>
    </DndProvider>
  );
}

export default HouseMain;