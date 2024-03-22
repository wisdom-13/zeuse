
'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Widget as WidgetType } from '@/types';
import WidgetImage from './WidgetImage';

export interface WidgetProps {
  id?: any
  text?: string
  index: number
  grid?: {
    col: number,
    row: number
  }
  editing?: boolean;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  widgetData?: WidgetType;
}

export const Widget = ({
  id,
  text,
  grid: { col, row } = { col: 2, row: 3 },
  editing = false,
  widgetData
}: WidgetProps) => {

  return (
    <>
      <div
        style={{
          gridColumn: `auto / span ${col}`,
          gridRow: `auto / span ${row}`
        }}
        className={cn(
          editing && 'aniamte-shake',
          'border border-black rounded-md bg-card text-card-foreground overflow-hidden w-full h-full'
        )}
      >
        {widgetData?.type == 'image' && <WidgetImage widget={widgetData} />}
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