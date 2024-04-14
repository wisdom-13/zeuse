import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { HouseBuild } from '@/types';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { boardTypes, viewTypes } from '@/data/common';
import { GripVertical, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';

interface BoardContentProps {
  house: HouseBuild;
  setHouseBuild: (updatedHouse: HouseBuild) => void;
}



const BoardContent = ({
  house,
  setHouseBuild
}: BoardContentProps) => {
  const supabaseClient = useSupabaseClient();
  const [selectBoard, setSelectBoard] = useState(house.board[0]);

  const newBoard = {
    title: '',
    name: '',
    type: '',
    view: '',
    link: '',
    role: 0,
    sort_order: 0,
    house_id: house.id
  }

  const handleChange = (name: string, value: string) => {
    setSelectBoard((prevBoard) => ({
      ...prevBoard,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { data, error } = selectBoard.id ? (
      await supabaseClient
        .from('board')
        .update(selectBoard)
        .eq('id', selectBoard.id)
        .select()
        .single()
    ) : (
      await supabaseClient
        .from('board')
        .insert(selectBoard)
        .select()
        .single()
    )

    if (error) {
      toast.error('변경사항을 저장하는 중 오류가 발생했습니다.');
    }

    if (data) {
      const updatedBoard = house.board.map((boardItem) => boardItem.id === selectBoard.id ? data : boardItem);

      if (!selectBoard.id) {
        updatedBoard.push(data);
      }

      setHouseBuild({
        ...house,
        board: updatedBoard,
      });

      // console.log(updatedBoard)
      toast.error('변경사항을 저장했습니다.');
    }
  }

  return (
    <div className='flex flex-col h-full'>
      <div>
        <h2 className='text-xl font-medium'>
          룸
        </h2>
        <Separator className="my-4" />
      </div>
      <div className='flex h-full gap-x-8'>
        <div className='flex flex-col gap-y-2 w-44 rounded-md bg-muted py-4 px-2'>
          <button
            onClick={() => setSelectBoard(newBoard)}
            className={cn(
              'flex gap-x-2 items-center text-base p-2 rounded-md hover:bg-muted-foreground/10 text-left',
            )}
          >
            <Plus size={16} className='text-muted-foreground' />
            새로운 룸 생성
          </button>
          <Separator className="my-2" />
          {house.board.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectBoard(item)}
              className={cn(
                'flex gap-x-2 items-center text-base p-2 rounded-md hover:bg-muted-foreground/10 text-left',
                item == selectBoard && 'bg-muted-foreground/10'
              )}
            >
              <GripVertical size={16} className='text-muted-foreground' />
              {item.title}
            </button>
          ))}

        </div>
        <div className='grow flex flex-col justify-between'>
          <ScrollArea>
            <div className='flex flex-col gap-y-4'>
              <div className='flex items-center justify-between'>
                <div className='w-40'>
                  <h3 className='text-base'>룸 이름</h3>
                </div>
                <div className='w-full'>
                  <Input name='title' value={selectBoard.title} onChange={(e) => handleChange('title', e.target.value)} />
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='w-40'>
                  <h3 className='text-base'>유형</h3>
                </div>
                <div className='w-full'>
                  <Select name='type' value={selectBoard.type} onValueChange={(v) => handleChange('type', v)} disabled={!!selectBoard.id}>
                    <SelectTrigger>
                      <SelectValue placeholder='유형을 선택하세요.' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(boardTypes).map((item) => (
                          <SelectItem key={item.type} value={item.type}>{item.name}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {
                selectBoard.type != 'link' && (
                  <div className='flex items-center justify-between'>
                    <div className='w-40'>
                      <h3 className='text-base'>주소</h3>
                    </div>
                    <div className='w-full'>
                      <Input name='name' value={selectBoard.name} onChange={(e) => handleChange('name', e.target.value)} disabled={!!selectBoard.id} />
                    </div>
                  </div>
                )
              }
              {
                selectBoard.type == 'post' && (
                  <div className='flex items-center justify-between'>
                    <div className='w-40'>
                      <h3 className='text-base'>보기 형식</h3>
                    </div>
                    <div className='w-full'>
                      <Select name='view' value={selectBoard.view} onValueChange={(v) => handleChange('view', v)}>
                        <SelectTrigger>
                          <SelectValue placeholder='유형을 선택하세요.' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {Object.values(viewTypes).map((item) => (
                              <SelectItem key={item.type} value={item.type}>{item.name}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )
              }
              {
                selectBoard.type == 'link' && (
                  <div className='flex items-center justify-between'>
                    <div className='w-40'>
                      <h3 className='text-base'>URL</h3>
                    </div>
                    <div className='w-full'>
                      <Input name='link' value={selectBoard.link} onChange={(e) => handleChange('link', e.target.value)} />
                    </div>
                  </div>
                )
              }
            </div>
          </ScrollArea>
          <div className='flex gap-x-2 mt-4 justify-end'>
            <Button onClick={handleSubmit}>저장</Button>
            <Button variant='outline'>닫기</Button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default BoardContent;