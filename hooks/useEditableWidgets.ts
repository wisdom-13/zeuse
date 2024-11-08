import { useState, useCallback, useEffect, useMemo } from "react";
import { Widget as WidgetType } from "@/types";
import { useUserHouseRole } from "./useUserHouseRole";
import { useWidget } from "./useWidget";
import { useHouseBuildByAddress } from "./useHouseBuilder";

const useEditableWidgets = (address: string) => {
  const {
    data: houseBuild,
    isLoading,
    isError,
  } = useHouseBuildByAddress(address);

  const sortedWidgets = useMemo(() => {
    if (houseBuild?.widget) {
      return houseBuild.widget
        .map((widget, index) => {
          if (!widget.grid || (!widget.grid.x && !widget.grid.y)) {
            const col = 3;
            const row = 2;
            const itemsPerRow = 4;

            return {
              ...widget,
              grid: {
                col,
                row,
                x: (index % itemsPerRow) * col,
                y: Math.floor(index / itemsPerRow) * row,
              },
            };
          }
          return widget;
        })
        .sort((a, b) => a.order - b.order);
    }
    return [];
  }, [houseBuild?.widget]);

  const { isEditer } = useUserHouseRole(address);
  const { removeWidget, updateWidget } = useWidget(address);
  const [editableWidgets, setEditableWidgets] =
    useState<WidgetType[]>(sortedWidgets);

  useEffect(() => {
    if (sortedWidgets) {
      setEditableWidgets(sortedWidgets.sort((a, b) => a.order - b.order));
    }
  }, [sortedWidgets]);

  const moveWidget = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newWidgets = [...editableWidgets];
      const draggedWidget = newWidgets[dragIndex];
      newWidgets.splice(dragIndex, 1);
      newWidgets.splice(hoverIndex, 0, draggedWidget);
      setEditableWidgets(newWidgets);
    },
    [editableWidgets]
  );

  const handleRemoveWidget = async (
    event: React.MouseEvent<HTMLButtonElement>,
    widget: WidgetType
  ) => {
    event.stopPropagation();
    removeWidget.mutate({ widget });
  };

  const handleUpdateWidget = async (updatedWidget: WidgetType) => {
    const newWidgets = editableWidgets.map((widget) =>
      widget.id === updatedWidget.id ? updatedWidget : widget
    );
    updateWidget.mutate(newWidgets);
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
