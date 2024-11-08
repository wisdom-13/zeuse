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

export interface WidgetProps {
  widget: WidgetType;
  editing?: boolean;
}

export const Widget = ({ widget, editing = false }: WidgetProps) => {
  return (
    <div
      className={cn(
        "w-full h-full",
        "custom-card rounded-md text-card-foreground overflow-hidden",
        editing && "animate-shake",
        widget?.type === "empty" && "opacity-0"
      )}
    >
      {widget?.type === "image" && <WidgetImage widget={widget} />}
      {widget?.type === "profile" && <WidgetProfile widget={widget} />}
      {widget?.type === "board" && <WidgetBoard widget={widget} />}
      {widget?.type === "post" && <WidgetPost widget={widget} />}
      {widget?.type === "timer" && <WidgetTimer widget={widget} />}
      {widget?.type === "empty" && <WidgetEmpty />}
    </div>
  );
};

Widget.Skeleton = function WidgetSkeleton() {
  return (
    <>
      <Skeleton className="w-full h-full" />
    </>
  );
};
