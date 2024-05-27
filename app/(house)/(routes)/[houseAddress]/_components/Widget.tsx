
'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Widget as WidgetType } from '@/types';
import WidgetImage from '@/components/widget/WidgetImage';
import WidgetProfile from '@/components/widget/WidgetProfile';
import WidgetBoard from '@/components/widget/WidgetBoard';
import WidgetTimer from '@/components/widget/WidgetTimer';
import WidgetPost from '@/components/widget/WidgetPost';

export interface WidgetProps {
  widget: WidgetType;
  editing?: boolean;
}

export const Widget = ({
  widget,
  editing = false,
}: WidgetProps) => {

  return (
    <>
      <div
        style={{
          gridColumn: `auto / span ${widget.grid.col}`,
          gridRow: `auto / span ${widget.grid.row}`
        }}
        className={cn(
          editing && 'aniamte-shake',
          'custom-card rounded-md text-card-foreground overflow-hidden w-full h-full',
          widget?.type == 'empty' && 'opacity-0'
        )}
      >
        {widget?.type == 'image' && <WidgetImage widget={widget} />}
        {widget?.type == 'profile' && <WidgetProfile widget={widget} />}
        {widget?.type == 'board' && <WidgetBoard widget={widget} />}
        {widget?.type == 'post' && <WidgetPost widget={widget} />}
        {widget?.type == 'timer' && <WidgetTimer widget={widget} />}
      </div>
    </>
  );
}

Widget.Skeleton = function WidgetSkeleton() {
  return (
    <>
      <Skeleton style={{
        gridColumn: `auto / span 2`,
        gridRow: `auto / span 4`
      }} />
      <Skeleton style={{
        gridColumn: `auto / span 2`,
        gridRow: `auto / span 1`
      }} />
      <Skeleton style={{
        gridColumn: `auto / span 2`,
        gridRow: `auto / span 2`
      }} />
      <Skeleton style={{
        gridColumn: `auto / span 2`,
        gridRow: `auto / span 3`
      }} />
      <Skeleton style={{
        gridColumn: `auto / span 2`,
        gridRow: `auto / span 2`
      }} />
    </>
  )
}