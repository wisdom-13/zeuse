'use client';

import { useParams } from 'next/navigation';
import { PlusSquare, SquareCheck } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import useWidgetEdit from '@/hooks/useWidgetEdit';
import useEditableWidgets from '@/hooks/useEditableWidgets';

import { Button } from '@/components/ui/button';
import { Widget } from './Widget';
import { EditWidget } from './EditWidget';

const HouseMain = () => {
  const { houseAddress } = useParams<{ houseAddress: string }>();
  const { isEditer, sortedWidgets, moveWidget, handleRemoveWidget, handleUpdateWidget, isLoading, isError } = useEditableWidgets(houseAddress);

  const widgetEdit = useWidgetEdit();
  const isEditing = widgetEdit.isEditing && isEditer;

  if (isLoading || isError) {
    return (
      <div className='gap-6 grid grid-cols-6 grid-rows-4 grid-flow-dense w-[900px] h-[600px]'>
        <Widget.Skeleton />
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      {isEditing && (
        <div className='top-6 left-1/2 absolute flex gap-x-2 bg-background p-2 rounded-md transform -translate-x-1/2'>
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

      <main className='gap-6 grid grid-cols-12 grid-rows-12 grid-flow-dense w-[900px] h-[600px]'>
        {sortedWidgets.map((widget, i) => (
          isEditing ? (
            <EditWidget
              key={widget.id}
              index={i}
              widget={widget}
              moveWidget={moveWidget}
              removeWidget={handleRemoveWidget}
              updateWidget={handleUpdateWidget}
            />
          ) : (
            <Widget
              key={widget.id}
              widget={widget}
            />
          )
        ))}
      </main>
    </DndProvider>
  );
}

export default HouseMain;