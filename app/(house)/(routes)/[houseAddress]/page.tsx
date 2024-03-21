'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import HouseMain from './_components/HouseMain';

const HousePage = () => {
  return (
    <div
      className='flex h-full items-center justify-center gap-x-4'
    >
      <DndProvider backend={HTML5Backend}>
        <HouseMain />
      </DndProvider>
    </div>
  );
}

export default HousePage;