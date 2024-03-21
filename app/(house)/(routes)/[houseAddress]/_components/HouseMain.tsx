'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import useWidgetEdit from '@/hooks/useWidgetEdit';
import update from 'immutability-helper'
import { Widget } from './Widget';
import { EditWidget } from './EditWidget';
import { Button } from '@/components/ui/button';
import { PlusSquare, Save } from 'lucide-react';
import useGetWidgetByHouseId from '@/hooks/useGetWidgetByHouseId';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useHouseBuild from '@/hooks/useHouseBuild';

export interface Item {
  id: number;
  order: number;
  grid?: {
    col: number,
    row: number
  }
}

const HouseMain = () => {
  const { houseId, houseBuild } = useHouseBuild();
  const param = useParams();
  const widgetEdit = useWidgetEdit();

  const Card = widgetEdit.isEditing ? EditWidget : Widget;

  const { widgets, isLoading } = useGetWidgetByHouseId(houseId);


  const [cards, setCards] = useState([
    {
      id: '1',
      order: 1,
      grid: { col: 3, row: 2 },
    }
  ]);

  const widget = useMemo(() => {
    if (houseBuild?.widget) {
      return houseBuild.widget.map((item) => ({
        id: item.id,
        order: item.order,
        grid: item.grid,
        widgetData: item
      }));
    } else {
      return [];
    }
  }, [houseBuild?.widget]);

  useEffect(() => {
    setCards(widget);
  }, [widget]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: any[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item],
        ],
      }),
    )
  }, [])

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
            <Save size={18} />
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
            editing={widgetEdit.isEditing}
            moveCard={moveCard}
          />
        ))}
      </main>
    </DndProvider>
  );
}

export default HouseMain;