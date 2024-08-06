import { HouseBuild } from '@/types';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { getPublicUrl } from '@/util/getPublicUrl';

interface houseBuildProps {
  houseBuild: HouseBuild;
}

const Logo = ({ houseBuild }: houseBuildProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className='flex flex-col justify-center gap-y-2 mt-6 p-8 min-h-44'>
      <Link href={`/${houseBuild?.address}`} className='relative w-full min-h-20'>
        {houseBuild?.style.logo_image ? (
          <Image
            src={getPublicUrl(`style/${houseBuild?.style.logo_image}`)}
            alt='logo'
            fill
            onLoad={() => setImageLoaded(true)}
            className={cn(
              imageLoaded ? 'opacity-100' : 'opacity-0',
              'pointer-events-none',
              'object-contain'
            )}
          />
        ) : (
          <h1 className='font-bold text-3xl text-center'>
            {houseBuild?.title}
          </h1>
        )}
      </Link>
    </div>
  );
}

export default Logo;