'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import useWidgetEdit from '@/hooks/useWidgetEdit';
import { Widget } from './Widget';
import { EditWidget } from './EditWidget';
import { Button } from '@/components/ui/button';
import { PlusSquare, SquareCheck } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';
import { Widget as WidgetType } from '@/types';
import { useHouseBuildByAddress } from '@/hooks/useHouseBuilder';
import { useParams } from 'next/navigation';
import { useWidget } from '@/hooks/useWidget';


const HouseMain = () => {
  const { houseAddress } = useParams<{ houseAddress: string; }>();
  const { data: houseBuild, isLoading, error } = useHouseBuildByAddress(houseAddress);

  const { removeWidget, updateWidget } = useWidget(houseAddress);

  const widgetEdit = useWidgetEdit();

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

  const handleRemoveWidget = async (event: React.MouseEvent<HTMLButtonElement>, widget: WidgetType) => {
    event.stopPropagation();
    if (!houseBuild) return;
    removeWidget.mutate({ widget });
  };

  const handleUpdateWidget = async () => {
    updateWidget.mutate(widgets);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {widgetEdit.isEditing && (
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

      <main
        className='gap-6 grid grid-cols-12 grid-rows-12 grid-flow-dense w-[900px] h-[600px]'
      >
        {widgets.map((widget, i) => (
          <WidgetItem
            key={widget.id}
            index={i}
            widget={widget}
            moveWidget={moveWidget}
            removeWidget={handleRemoveWidget}
            updateWidget={handleUpdateWidget}
          />
        ))}
      </main>
    </DndProvider>
  );
}

export default HouseMain;