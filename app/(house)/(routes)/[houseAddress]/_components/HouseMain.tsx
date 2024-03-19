'use client';

import { useState } from 'react';
import Card from './Card';

const HouseMain = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: '슬라이드',
      grid: { col: 4, row: 12 },
    },
    {
      id: 2,
      text: '프로필',
      grid: { col: 4, row: 4 },
    },
    {
      id: 3,
      text: '게시판',
      grid: { col: 4, row: 8 },
    },
    {
      id: 4,
      text: '디데이',
      grid: { col: 4, row: 3 },
    },

    {
      id: 5,
      text: '1x1',
      grid: { col: 1, row: 1 },
    },
    {
      id: 6,
      text: '1x2',
      grid: { col: 1, row: 2 },
    },
    {
      id: 7,
      text: '2x3',
      grid: { col: 2, row: 3 },
    },
  ])

  return (
    <main
      className='w-[900px] h-[600px] grid grid-cols-12 grid-rows-12 grid-flow-col gap-4'
    >
      {cards.map((card, i) => (
        <Card
          key={card.id}
          index={i}
          id={card.id}
          text={card.text}
          grid={card.grid}
        />
      ))}
    </main>
  );
}

export default HouseMain;