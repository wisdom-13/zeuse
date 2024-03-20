'use client';

import { useState } from 'react';
import Card from './Card';
import { useParams } from 'next/navigation';
import useGetHouseWidgetByAddress from '@/hooks/useGetHouseWidgetByAddress';

const HouseMain = () => {
  const param = useParams();
  const { house } = useGetHouseWidgetByAddress(param.houseAddress);

  const [widgets, setWidgets] = useState([
    {
      id: 1,
      text: '위젯이 없어용',
      grid: { col: 12, row: 12 },
    },
  ])


  return (
    <main
      className='w-[900px] h-[600px] grid grid-cols-12 grid-rows-12 grid-flow-col gap-4'
    >
      {widgets.map((widget, i) => (
        <Card
          key={widget.id}
          index={i}
          id={widget.id}
          text={widget.text}
          grid={widget.grid}
        />
      ))}
    </main>
  );
}

export default HouseMain;