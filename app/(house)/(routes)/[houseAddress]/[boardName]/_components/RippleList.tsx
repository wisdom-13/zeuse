'use client'

import RippleAdd from './RippleAdd';
import RippleItem from './RippleItem';


const RippleList = () => {
  return (
    <div className='flex flex-col gap-y-4 p-6'>
      <h3 className='font-bold text-lg'>N개의 댓글</h3>
      <RippleAdd />
      <div className='flex flex-col gap-y-4'>
        <RippleItem />
        <RippleItem />
        <RippleItem />
      </div>
    </div>
  );
}

export default RippleList;