import { cn } from '@/lib/utils';

export interface CardProps {
  id?: any
  text?: string
  index?: number
  grid?: {
    col: number,
    row: number
  }
}

const Card = ({
  id,
  text,
  index,
  grid: { col, row } = { col: 2, row: 3 }
}: CardProps) => {
  return (
    <div
      style={{
        gridColumn: `auto / span ${col}`,
        gridRow: `auto / span ${row}`
      }}
      className='border border-black rounded-md p-2 bg-white'
    >
      {text}
    </div>
  );
}

export default Card;
