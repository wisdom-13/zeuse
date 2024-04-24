
'use client';
import { Widget, Widget as WidgetType } from '@/types';
import type { Identifier } from 'dnd-core'

import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';

import { useDrag, useDrop } from 'react-dnd';
import { Minus } from 'lucide-react';

import WidgetImage from '@/components/widget/WidgetImage';
import WidgetProfile from '@/components/widget/WidgetProfile';
import WidgetBoard from '@/components/widget/WidgetBoard';
import WidgetTimer from '@/components/widget/WidgetTimer';
import WidgetEmpty from '@/components/widget/WidgetEmpty';
import WidgetModal from '@/components/modal/WidgetModal';

export interface EditWidgetProps {
  index: number;
  widget: WidgetType;
  moveWidget: (dragIndex: number, hoverIndex: number) => void;
  removeWidget: (event: React.MouseEvent<HTMLButtonElement>, widget: Widget) => void;
  updateWidget: () => void;
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const EditWidget = ({
  index,
  widget,
  moveWidget,
  removeWidget,
  updateWidget,
}: EditWidgetProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // TODO : 드래그 개선

  const handleModalOpen = () => {
    const settingType = ['image', 'board'];
    if (settingType.includes(widget.type)) {
      setIsModalOpen(true)
    }
  }

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
    hover(item: DragItem) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      moveWidget(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'widget',
    item: { id: widget.id, index },
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
          gridColumn: `auto / span ${widget.grid.col}`,
          gridRow: `auto / span ${widget.grid.row}`
        }}
        className={cn(
          'custom-card aniamte-shake rounded-md text-card-foreground overflow-hidden relative',
          widget?.type == 'empty' && ' bg-primary/5 border-dashed',
          isDragging ? 'opacity-0' : 'opacity-100',
        )}
        onClick={handleModalOpen}
      >
        {widget?.type == 'image' && <WidgetImage widget={widget} />}
        {widget?.type == 'profile' && <WidgetProfile widget={widget} />}
        {widget?.type == 'board' && <WidgetBoard widget={widget} />}
        {widget?.type == 'timer' && <WidgetTimer widget={widget} />}
        {widget?.type == 'empty' && <WidgetEmpty />}

        <button
          className='absolute z-[999999] top-1 right-1 bg-muted rounded-full p-1'
          onClick={(event) => removeWidget(event, widget)}
        >
          <Minus size={16} />
        </button>
      </div>
      <WidgetModal widget={widget} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
}

