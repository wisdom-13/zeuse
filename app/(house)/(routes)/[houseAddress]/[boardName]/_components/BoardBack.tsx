import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface BoardBackPorps {
  url: string,
  title?: string,
}

const BoardBack = ({
  url,
  title
}: BoardBackPorps) => {
  return (
    <Link href={url}>
      <div className='flex items-center gap-x-2 text-base font-bold p-6 pb-2 pl-5 text-muted-foreground'>
        <ChevronLeft size={18} />
        {title}
      </div>
    </Link>
  );
}

export default BoardBack;