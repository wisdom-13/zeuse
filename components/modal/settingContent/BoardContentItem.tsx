'use client';

import type { Identifier, XYCoord } from 'dnd-core'

import { cn } from '@/lib/utils';
import { Board } from '@/types';
import { GripVertical } from 'lucide-react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface BoardContentItemProps {
  index: number,
  board: Board,
  activate: boolean,
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onClick: () => void;
  updateBoardSrot: () => void;
}

const BoardContentItem = ({
  index,
  board,
  activate,
  moveCard,
  onClick,
  updateBoardSrot
}: BoardContentItemProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [{ handlerId }, drop] = useDrop<
    { index: number },
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'board',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (item.index === index) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'board',
    item: { index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      updateBoardSrot();
    },
  })

  drag(drop(ref));

  return (
    <button
      ref={ref}
      data-handler-id={handlerId}
      onClick={onClick}
      className={cn(
        'flex gap-x-2 items-center text-base p-2 rounded-md hover:bg-muted-foreground/10 text-left',
        activate && 'bg-muted-foreground/10',
        isDragging ? 'opacity-0' : 'opacity-100'
      )}
    >
      <GripVertical size={16} className='text-muted-foreground' />
      {board.title}
    </button>
  );
}

export default BoardContentItem;