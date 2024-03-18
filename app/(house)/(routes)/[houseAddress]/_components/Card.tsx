import { cn } from '@/lib/utils';

export interface CardProps {
  id?: any
  text?: string
  index?: number
  grid?: Array<number>
  moveCard?: (dragIndex: number, hoverIndex: number) => void
}

const Card = ({
  id,
  text,
  index,
  grid
}: CardProps) => {
  return (
    <div
      className={cn('border border-dashed border-gray-400 p-2 bg-white',
        grid && `col-[auto_/_span_${grid[0]}] row-[auto_/_span_${grid[1]}]`
      )}
    >
      {text}
    </div>
  );
}

export default Card;
