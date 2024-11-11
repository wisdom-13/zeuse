"use client";

import { Widget as WidgetType } from "@/types";

import { useParams } from "next/navigation";
import { PlusSquare, SquareCheck } from "lucide-react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useState } from "react";

import useWidgetEdit from "@/hooks/useWidgetEdit";
import useEditableWidgets from "@/hooks/useEditableWidgets";
import { Button } from "@/components/ui/button";
import { Widget } from "./Widget";

const ResponsiveGridLayout = WidthProvider(Responsive);

const HouseMain = () => {
  const { houseAddress } = useParams<{ houseAddress: string }>();
  const {
    isEditer,
    sortedWidgets,
    handleRemoveWidget,
    handleUpdateWidget,
    isLoading,
    isError,
  } = useEditableWidgets(houseAddress);

  const widgetEdit = useWidgetEdit();
  const isEditing = widgetEdit.isEditing && isEditer;

  const [tempLayout, setTempLayout] = useState<WidgetType[]>([]);

  if (isLoading || isError) {
    return <Widget.Skeleton />;
  }

  const generateLayout = () => {
    return sortedWidgets.map((widget) => ({
      i: widget.id,
      x: widget.grid.x,
      y: widget.grid.y,
      w: widget.grid.col ?? 3,
      h: widget.grid.row ?? 2,
    }));
  };

  const initialLayout = generateLayout();

  const onLayoutChange = (newLayout: any) => {
    if (!isEditing) return;

    const updatedWidgets = newLayout
      .map((item: any) => {
        const widget = sortedWidgets.find((w) => w.id === item.i);
        if (widget) {
          return {
            ...widget,
            grid: {
              col: item.w,
              row: item.h,
              x: item.x,
              y: item.y,
            },
          };
        }
        return widget;
      })
      .filter(Boolean);

    setTempLayout(updatedWidgets);
  };

  const handleEditingComplete = async () => {
    try {
      if (tempLayout.length > 0) {
        await handleUpdateWidget(tempLayout);
      }
      widgetEdit.onEditingEnd();
      setTempLayout([]);
    } catch (error) {
      console.error("위젯 업데이트 실패:", error);
    }
  };

  return (
    <div className="relative w-full h-full">
      {isEditing && (
        <div className="top-6 left-1/2 z-50 absolute flex gap-x-2 bg-background shadow-md p-2 rounded-md transform -translate-x-1/2">
          <Button
            className="flex gap-x-2"
            variant="ghost"
            onClick={widgetEdit.onBrawerOpen}
          >
            <PlusSquare size={18} />
            위젯추가
          </Button>
          <Button
            className="flex gap-x-2"
            variant="ghost"
            onClick={handleEditingComplete}
          >
            <SquareCheck size={18} />
            편집완료
          </Button>
        </div>
      )}

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: initialLayout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 6, xs: 1, xxs: 1 }}
        rowHeight={60}
        onLayoutChange={onLayoutChange}
        isDraggable={isEditing}
        isResizable={isEditing}
        margin={[16, 16]}
        containerPadding={[16, 16]}
        compactType={null}
        preventCollision={true}
        useCSSTransforms={false}
      >
        {sortedWidgets.map((widget) => (
          <div key={widget.id}>
            <Widget
              widget={widget}
              editing={isEditing}
              removeWidget={handleRemoveWidget}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default HouseMain;
