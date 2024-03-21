
'use client';
import type { Identifier, XYCoord } from 'dnd-core'

import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

import { useDrag, useDrop } from 'react-dnd';

export interface EditWidgetProps {
  id?: any
  text?: string
  index: number
  grid?: {
    col: number,
    row: number
  }
  editing?: boolean;
  moveCard: (dragIndex: number, hoverIndex: number) => void
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
  editing = false,
  moveCard,
}: EditWidgetProps) => {

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
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

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
          editing && 'aniamte-shake',
          isDragging ? 'opacity-0' : 'opacity-100',
          'border border-black rounded-md p-2 bg-card text-card-foreground'
        )}
      >
        [{id}] {text}
      </div>
    </>
  );
}

