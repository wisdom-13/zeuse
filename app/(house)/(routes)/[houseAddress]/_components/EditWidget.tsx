
'use client';
import type { Identifier, XYCoord } from 'dnd-core'

import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

import { useDrag, useDrop } from 'react-dnd';
import useWidgetEdit from '@/hooks/useWidgetEdit';
import { Widget as WidgetType } from '@/types';
import WidgetImage from './WidgetImage';
import WidgetProfile from './WidgetProfile';
import WidgetBoard from './WidgetBoard';
import { Minus } from 'lucide-react';

export interface EditWidgetProps {
  id?: any
  index: number
  grid?: {
    col: number,
    row: number
  }
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  removeCard: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  updateWidget: () => void;
  widgetData?: WidgetType;
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const EditWidget = ({
  id,
  index,
  grid: { col, row } = { col: 2, row: 3 },
  moveCard,
  removeCard,
  updateWidget,
  widgetData
}: EditWidgetProps) => {
  const widgetEdit = useWidgetEdit();
  // TODO : 드래그 개선


  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'widget',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'widget',
    item: { id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      updateWidget();
    },
  })

  drag(drop(ref));

  return (
    <>
      <div
        ref={ref}
        data-handler-id={handlerId}
        style={{
          gridColumn: `auto / span ${col}`,
          gridRow: `auto / span ${row}`
        }}
        className={cn(
          'aniamte-shake border border-black rounded-md bg-card text-card-foreground overflow-hidden relative',
          isDragging ? 'opacity-0' : 'opacity-100'
        )}
        onClick={widgetEdit.onModalOpen}
      >
        {widgetData?.type == 'image' && <WidgetImage widget={widgetData} />}
        {widgetData?.type == 'profile' && <WidgetProfile widget={widgetData} />}
        {widgetData?.type == 'board' && <WidgetBoard widget={widgetData} />}

        <button
          className='absolute z-[999999] top-1 right-1 bg-muted rounded-full p-1'
          onClick={(event) => removeCard(event, id)}
        >
          <Minus size={16} />
        </button>
      </div>

    </>
  );
}

