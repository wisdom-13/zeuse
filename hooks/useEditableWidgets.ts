import { useMemo } from "react";
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
      return houseBuild.widget.map((widget, index) => {
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
      });
    }
    return [];
  }, [houseBuild?.widget]);

  const { isEditer } = useUserHouseRole(address);
  const { removeWidget, updateWidget } = useWidget(address);

  const handleRemoveWidget = async (
    event: React.MouseEvent<HTMLButtonElement>,
    widget: WidgetType
  ) => {
    event.stopPropagation();
    removeWidget.mutate({ widget });
  };

  const handleUpdateWidget = async (updatedWidgets: WidgetType[]) => {
    updateWidget.mutate(updatedWidgets);
  };

  return {
    isEditer,
    sortedWidgets,
    handleRemoveWidget,
    handleUpdateWidget,
    isLoading,
    isError,
  };
};

export default useEditableWidgets;
