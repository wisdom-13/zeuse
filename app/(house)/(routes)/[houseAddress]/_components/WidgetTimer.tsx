'use client';

import { Widget } from '@/types';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';

interface WidgetTimerProps {
  widget: Widget;
}

const WidgetTimer = ({
  widget
}: WidgetTimerProps) => {
  const [today, setToday] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setToday(new Date());
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <h1 className='text-3xl font-semibold'>{moment(today).format('A hh:mm')}</h1>
      <h3 className='text-xl'>{moment(today).format('YYYY.MM.DD')}</h3>
    </div>
  );
}

export default WidgetTimer;