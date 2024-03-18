'use client';

import { useState } from 'react';
import Card from './Card';

const HouseMain = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: '슬라이드',
      grid: [4, 12],
    },
    {
      id: 2,
      text: '프로필',
      grid: [4, 4],
    },
    {
      id: 3,
      text: '게시판',
      grid: [4, 8],
    },
    {
      id: 4,
      text: '디데이',
      grid: [4, 3],
    },

    {
      id: 5,
      text: '1x1',
      grid: [1, 1],
    },
    {
      id: 6,
      text: '1x2',
      grid: [1, 2],
    },
    {
      id: 7,
      text: '2x3',
      grid: [2, 3],
    },

  ])


  return (
    <main
      className='w-[900px] h-[600px] m-auto grid grid-cols-12 grid-rows-12 grid-flow-col gap-3'
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