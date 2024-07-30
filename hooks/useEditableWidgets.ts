import { useState, useCallback, useEffect, useMemo } from 'react';
import { Widget as WidgetType } from '@/types';
import { useUserHouseRole } from './useUserHouseRole';
import { useWidget } from './useWidget';
import { useHouseBuildByAddress } from './useHouseBuilder';

const useEditableWidgets = (address: string) => {
  const { data: houseBuild, isLoading, isError } = useHouseBuildByAddress(address);

  const sortedWidgets = useMemo(() => {
    if (houseBuild?.widget) {
      return houseBuild.widget.sort((a, b) => a.order - b.order);
    } else {
      return [];
    }
  }, [houseBuild?.widget]);

  const { isEditer } = useUserHouseRole(address);
  const { removeWidget, updateWidget } = useWidget(address);
  const [editableWidgets, setEditableWidgets] = useState<WidgetType[]>(sortedWidgets);

  useEffect(() => {
    if (sortedWidgets) {
      setEditableWidgets(sortedWidgets.sort((a, b) => a.order - b.order));
    }
  }, [sortedWidgets]);

  const moveWidget = useCallback((dragIndex: number, hoverIndex: number) => {
    const newWidgets = [...editableWidgets];
    const draggedWidget = newWidgets[dragIndex];
    newWidgets.splice(dragIndex, 1);
    newWidgets.splice(hoverIndex, 0, draggedWidget);
    setEditableWidgets(newWidgets);
  }, [editableWidgets]);

  const handleRemoveWidget = async (event: React.MouseEvent<HTMLButtonElement>, widget: WidgetType) => {
    event.stopPropagation();
    removeWidget.mutate({ widget });
  };

  const handleUpdateWidget = async () => {
    updateWidget.mutate(editableWidgets);
  };

  return {
    isEditer,
    sortedWidgets,
    editableWidgets,
    moveWidget,
    handleRemoveWidget,
    handleUpdateWidget,
    isLoading,
    isError,
  };
};

export default useEditableWidgets;
