'use client'

import { ScrollArea } from '@/components/ui/scroll-area';
import Editor from '../_components/Editor';
import { Input } from '@/components/ui/input';

const EditPage = () => {
  return (
    <ScrollArea className='w-full h-full py-6'>
      <div className='flex flex-col gap-y-4'>
        <div className='flex items-center gap-x-4 px-6  mt-4'>
          <Input className='text-3xl font-semibold border-none' placeholder='제목없음' />
        </div>
        <div className='flex flex-col'>
          <Editor />
        </div>
      </div>
    </ScrollArea>

  );
}

export default EditPage;