
'use client';
import type { Identifier, XYCoord } from 'dnd-core'

import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

import { useDrag, useDrop } from 'react-dnd';
import useWidgetEdit from '@/hooks/useWidgetEdit';
import { Widget as WidgetType } from '@/types';

export interface EditWidgetProps {
  id?: any
  text?: string
  index: number
  grid?: {
    col: number,
    row: number
  }
  isEditing?: boolean;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  widgetData?: WidgetType;
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const EditWidget = ({
  id,
  text,
  index,
  grid: { col, row } = { col: 2, row: 3 },
  isEditing = false,
  moveCard,
  widgetData
}: EditWidgetProps) => {
  const widgetEdit = useWidgetEdit();
  // TODO : 드래그 개선

  const ref = useRef<HTMLDivElement>(null)
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
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'widget',
    item: { id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <>
      <div
        ref={isEditing ? ref : ''}
        data-handler-id={handlerId}
        style={{
          gridColumn: `auto / span ${col}`,
          gridRow: `auto / span ${row}`
        }}
        className={cn(
          isEditing && 'aniamte-shake',
          isDragging ? 'opacity-0' : 'opacity-100',
          'border border-black rounded-md bg-card text-card-foreground overflow-hidden'
        )}
        onClick={widgetEdit.onModalOpen}
      >
        [{id}] {text}
      </div>
    </>
  );
}

