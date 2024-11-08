"use client";

import { useParams } from "next/navigation";
import { PlusSquare, SquareCheck } from "lucide-react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import useWidgetEdit from "@/hooks/useWidgetEdit";
import useEditableWidgets from "@/hooks/useEditableWidgets";
import { Button } from "@/components/ui/button";
import { Widget } from "./Widget";
import { Card } from "@/components/ui/card";

const ResponsiveGridLayout = WidthProvider(Responsive);

const HouseMain = () => {
  const { houseAddress } = useParams<{ houseAddress: string }>();
  const { isEditer, sortedWidgets, handleUpdateWidget, isLoading, isError } =
    useEditableWidgets(houseAddress);

  const widgetEdit = useWidgetEdit();
  const isEditing = widgetEdit.isEditing && isEditer;

  if (isLoading || isError) {
    return (
      <div className="gap-6 grid grid-cols-6 grid-rows-4 grid-flow-dense w-[900px] h-[600px]">
        <Widget.Skeleton />
      </div>
    );
  }

  console.log(sortedWidgets);

  const generateLayout = () => {
    const itemsPerRow = 4; // 한 줄에 표시할 아이템 수
    const columnWidth = 3; // 각 아이템의 기본 너비

    return sortedWidgets.map((widget, index) => ({
      i: widget.id,
      x: (index % itemsPerRow) * columnWidth, // 가로 위치 계산
      y: Math.floor(index / itemsPerRow), // 세로 위치 계산
      w: widget.grid.col ?? columnWidth,
      h: widget.grid.row ?? 2,
      minW: 2,
      minH: 2,
      static: !isEditing, // 편집 모드가 아닐 때는 고정
    }));
  };

  const initialLayout = generateLayout();

  const onLayoutChange = (newLayout: any) => {
    if (!isEditing) return;

    newLayout.forEach((item: any) => {
      const widget = sortedWidgets.find((w) => w.id === item.i);
      if (widget) {
        handleUpdateWidget({
          ...widget,
          grid: {
            col: item.w,
            row: item.h,
            x: item.x,
            y: item.y,
          },
        });
      }
    });
  };

  return (
    <div className="relative w-full h-full">
      {isEditing && (
        <div className="top-6 left-1/2 z-50 absolute flex gap-x-2 bg-background p-2 rounded-md transform -translate-x-1/2">
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
            onClick={widgetEdit.onEditingEnd}
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
        cols={{ lg: 12, md: 9, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
        onLayoutChange={onLayoutChange}
        isDraggable={isEditing}
        isResizable={isEditing}
        margin={[16, 16]}
        containerPadding={[16, 16]}
        compactType={null}
        preventCollision={true}
        useCSSTransforms={false} // CSS transform 사용 비활성화
      >
        {sortedWidgets.map((widget) => (
          <div key={widget.id}>
            <Widget widget={widget} editing={isEditing} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default HouseMain;
