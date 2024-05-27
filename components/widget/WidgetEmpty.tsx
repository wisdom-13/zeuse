'use client';

import { BoxSelect } from 'lucide-react';
import 'moment/locale/ko';

const WidgetEmpty = () => {
  return (
    <div className='w-full h-full flex items-center justify-center bg-primary/5 rounded-md'>
      <BoxSelect className='text-gray-500' />
    </div>
  );
}

export default WidgetEmpty;