"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Widget as WidgetType } from "@/types";
import WidgetImage from "@/components/widget/WidgetImage";
import WidgetProfile from "@/components/widget/WidgetProfile";
import WidgetBoard from "@/components/widget/WidgetBoard";
import WidgetTimer from "@/components/widget/WidgetTimer";
import WidgetPost from "@/components/widget/WidgetPost";
import WidgetEmpty from "@/components/widget/WidgetEmpty";
import { Minus } from "lucide-react";
import WidgetModal from "@/components/modal/WidgetModal";
import { useState } from "react";

export interface WidgetProps {
  widget: WidgetType;
  editing?: boolean;
  removeWidget: (
    event: React.MouseEvent<HTMLButtonElement>,
    widget: WidgetType
  ) => void;
}

export const Widget = ({
  widget,
  editing = false,
  removeWidget,
}: WidgetProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    const settingType = ["image", "board", "post"];
    if (settingType.includes(widget.type)) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        className={cn(
          "w-full h-full",
          "custom-card rounded-md text-card-foreground overflow-hidden group",
          widget?.type === "empty" && "opacity-0"
        )}
      >
        {widget?.type === "image" && <WidgetImage widget={widget} />}
        {widget?.type === "profile" && <WidgetProfile widget={widget} />}
        {widget?.type === "board" && <WidgetBoard widget={widget} />}
        {widget?.type === "post" && <WidgetPost widget={widget} />}
        {widget?.type === "timer" && <WidgetTimer widget={widget} />}
        {widget?.type === "empty" && <WidgetEmpty />}

        {editing && (
          <>
            <button
              className="-top-1.5 -left-1.5 z-[999999] absolute bg-red-400 opacity-0 group-hover:opacity-100 p-1 rounded-full text-white transition-all scale-75"
              onClick={(event) => removeWidget(event, widget)}
            >
              <Minus size={16} />
            </button>
            {["image", "board", "post"].includes(widget.type) && (
              <button
                className="top-1 right-0 z-[999999] absolute bg-foreground/50 opacity-0 group-hover:opacity-100 px-3 p-1 rounded-full text-white transition-all scale-75"
                onClick={handleModalOpen}
              >
                편집하기
              </button>
            )}
          </>
        )}
      </div>

      {editing && (
        <WidgetModal
          widget={widget}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

Widget.Skeleton = function WidgetSkeleton() {
  return (
    <>
      <Skeleton className="w-full h-full" />
    </>
  );
};
