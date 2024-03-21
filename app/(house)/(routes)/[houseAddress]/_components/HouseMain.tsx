'use client';

import { useCallback, useEffect, useState } from 'react';
import Card from './Card';
import { useParams } from 'next/navigation';
import useGetHouseWidgetByAddress from '@/hooks/useGetHouseWidgetByAddress';
import useSettingModal from '@/hooks/useSettingModal';
import useWidgetEdit from '@/hooks/useWidgetEdit';
import update from 'immutability-helper'


export interface Item {
  id: number
  text: string
  grid?: {
    col: number,
    row: number
  }
}

const HouseMain = () => {
  const param = useParams();
  const widgetEdit = useWidgetEdit();
  const { house } = useGetHouseWidgetByAddress(param.houseAddress);

  const [cards, setCards] = useState([
    {
      id: '1',
      index: '1',
      text: '위젯이 없어용 1',
      grid: { col: 4, row: 12 },
    },
    {
      id: '2',
      index: '2',
      text: '위젯이 없어용 2',
      grid: { col: 4, row: 3 },
    },
    {
      id: '3',
      index: '3',
      text: '위젯이 없어용 3',
      grid: { col: 4, row: 3 },
    },
    {
      id: '4',
      index: '4',
      text: '위젯이 없어용 4',
      grid: { col: 4, row: 6 },
    },
    {
      id: '5',
      index: '5',
      text: '위젯이 없어용 5',
      grid: { col: 4, row: 3 },
    },
    {
      id: '6',
      index: '6',
      text: '위젯이 없어용 6',
      grid: { col: 2, row: 3 },
    },
    {
      id: '7',
      index: '7',
      text: '위젯이 없어용 7',
      grid: { col: 2, row: 3 },
    }
  ])

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: any[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item],
        ],
      }),
    )
  }, [])

  return (
    <main
      className='w-[900px] h-[600px] grid grid-cols-12 grid-rows-12 grid-flow-dense gap-6'
    >
      {cards.map((widget, i) => (
        <Card
          key={widget.id}
          index={i}
          id={widget.id}
          text={widget.text}
          grid={widget.grid}
          editing={widgetEdit.isEditing}
          moveCard={moveCard}
        />
      ))}
    </main>
  );
}

export default HouseMain;