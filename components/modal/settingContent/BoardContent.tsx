
import { HouseBuild } from '@/types';
import { useCallback, useEffect, useState } from 'react';

import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { cn } from '@/lib/utils';
import { boardTypes, viewTypes } from '@/data/common';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
import BoardContentItem from './BoardContentItem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface BoardContentProps {
  house: HouseBuild;
  setHouseBuild: (updatedHouse: HouseBuild) => void;
}

const BoardContent = ({
  house,
  setHouseBuild
}: BoardContentProps) => {
  const supabaseClient = useSupabaseClient();
  const boardNameList = house.board.map((item) => item.name);
  const [selectBoard, setSelectBoard] = useState(house.board[0]);
  const [boardList, setBoardList] = useState(house.board.sort((a, b) => a.order - b.order));
  const [beforeBoardList, setBeforeBoardList] = useState(house.board.sort((a, b) => a.order - b.order));
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const newBoard = {
    title: '',
    name: '',
    type: '',
    view: '',
    link: '',
    role: 0,
    order: house.board.length,
    house_id: house.id
  }

  const formSchema = z.object({
    title: z
      .string()
      .min(1, '룸 이름을 입력해주세요.')
      .max(10, '최대 10글자의 이름을 사용할수 있어요.'),
    type: z.string().min(1, '유형을 선택해주세요.'),
    name: z
      .string()
      .regex(/^(?:[0-9A-Za-z-]+)?$/, '주소에는 영문, 숫자, 하이픈(-)만 사용할 수 있어요.')
      .optional(),
    view: z.string().optional(),
    link: z
      .string()
      .regex(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$|^$/, '유효한 URL을 입력해주세요.')
      .optional(),
  })
    .refine((data) => !((data.type && data.type !== 'link') && !data.name), {
      path: ['name'],
      message: '룸 주소를 입력해주세요.'
    })
    .refine((data) => !(!selectBoard.id && data.name && boardNameList.includes(data.name)), {
      path: ['name'],
      message: '이미 사용하고 있는 룸 주소예요.'
    })
    .refine((data) => !(data.type === 'post' && !data.view), {
      path: ['view'],
      message: '보기 형식을 선택하세요.'
    })
    .refine((data) => !(data.type === 'link' && !data.link), {
      path: ['link'],
      message: 'URL을 입력하세요.'
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldFocusError: false,
    mode: 'onBlur',
    defaultValues: {
      title: '',
      name: '',
      type: '',
      view: '',
      link: '',
    },
  })

  useEffect(() => {
    form.reset({
      title: selectBoard.title || '',
      name: selectBoard.name || '',
      type: selectBoard.type || '',
      view: selectBoard.view || '',
      link: selectBoard.link || ''
    })
  }, [form, form.reset, selectBoard])


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const boardData = {
      ...values,
      role: 0,
      order: house.board.length,
      house_id: house.id
    }
    const { data, error } = selectBoard.id ? (
      await supabaseClient
        .from('board')
        .update(boardData)
        .eq('id', selectBoard.id)
        .select()
        .single()
    ) : (
      await supabaseClient
        .from('board')
        .insert(boardData)
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

      setBoardList(updatedBoard);
      setHouseBuild({
        ...house,
        board: updatedBoard,
      });

      setSelectBoard(data);
      toast.success('변경사항을 저장했습니다.');
    }
  }

  const handleDelete = async () => {
    const { error } = await supabaseClient
      .from('board')
      .delete()
      .eq('id', selectBoard.id)

    if (error) {
      toast.error(error.message);
      return;
    }

    const updatedBoard = house.board.filter((boardItem) => boardItem.id !== selectBoard.id);

    setHouseBuild({
      ...house,
      board: updatedBoard,
    });

    setBoardList(updatedBoard);
    setDeleteDialogOpen(false);
    toast.info('룸을 삭제했습니다.');
  }

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const newBoardList = [...boardList];
    const draggedCard = newBoardList[dragIndex];
    newBoardList.splice(dragIndex, 1);
    newBoardList.splice(hoverIndex, 0, draggedCard);
    setBoardList(newBoardList);
  }, [boardList]);

  const updateBoardSrot = async () => {
    if (boardList === beforeBoardList) {
      return
    }

    try {
      boardList.map(async (data, i) => {
        await supabaseClient
          .from('board')
          .update({ order: i })
          .eq('id', data.id);
      })
    } catch (error) {
      toast.error('변경사항을 저장하는 중 오류가 발생했습니다.');
    }

    setBeforeBoardList(boardList);
    toast.error('변경사항을 저장했습니다.');
  }

  return (
    <div className='flex flex-col h-full'>
      <div>
        <h2 className='text-xl font-medium'>
          룸
        </h2>
        <Separator className='my-4' />
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
          <Separator className='my-2' />
          <DndProvider backend={HTML5Backend}>
            {boardList.map((item, i) => (
              <BoardContentItem
                key={item.id}
                index={i}
                board={item}
                activate={item === selectBoard}
                moveCard={moveCard}
                onClick={() => setSelectBoard(item)}
                updateBoardSrot={updateBoardSrot}
              />
            ))}
          </DndProvider>

        </div>
        <div className='grow pt-4 px-2'>
          <Form {...form}>
            <form className='flex flex-col justify-between space-y-8 h-full' onSubmit={form.handleSubmit(onSubmit)}>
              <ScrollArea>
                <div className='flex flex-col gap-y-4'>
                  <div className='flex items-center justify-between'>
                    <FormField
                      control={form.control}
                      name='title'
                      render={({ field }) => (
                        <FormItem className='flex items-center justify-between w-full'>
                          <Label className='w-40 text-base'>
                            룸 이름
                          </Label>
                          <div className='w-full'>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='flex items-center justify-between'>
                    <FormField
                      control={form.control}
                      name='type'
                      render={({ field }) => (
                        <FormItem className='flex items-center justify-between w-full'>
                          <Label className='w-40 text-base'>
                            유형
                          </Label>
                          <div className='w-full'>
                            <FormControl>
                              <Select onValueChange={field.onChange} value={field.value} disabled={!!selectBoard.id}>
                                <SelectTrigger>
                                  <SelectValue placeholder='유형을 선택하세요.' />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {Object.values(boardTypes).map((item) => (
                                      <SelectItem key={item.type} value={item.type.toString()}>{item.name}</SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  {
                    (form.watch('type') !== '' && form.watch('type') !== 'link') && (
                      <div className='flex items-center justify-between'>
                        <FormField
                          control={form.control}
                          name='name'
                          render={({ field }) => (
                            <FormItem className='flex items-center justify-between w-full'>
                              <Label className='w-40 text-base'>
                                주소
                              </Label>
                              <div className='w-full'>
                                <FormControl>
                                  <Input {...field} disabled={!!selectBoard.id} />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    )
                  }
                  {
                    form.watch('type') == 'post' && (
                      <div className='flex items-center justify-between'>
                        <FormField
                          control={form.control}
                          name='view'
                          render={({ field }) => (
                            <FormItem className='flex items-center justify-between w-full'>
                              <Label className='w-40 text-base'>
                                보기 형식
                              </Label>
                              <div className='w-full'>
                                <FormControl>
                                  <Select onValueChange={field.onChange} value={field.value} disabled={!!selectBoard.id}>
                                    <SelectTrigger>
                                      <SelectValue placeholder='보기 형식을 선택하세요.' />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {Object.values(viewTypes).map((item) => (
                                          <SelectItem key={item.type} value={item.type}>{item.name}</SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    )
                  }
                  {
                    form.watch('type') == 'link' && (
                      <div className='flex items-center justify-between'>
                        <FormField
                          control={form.control}
                          name='link'
                          render={({ field }) => (
                            <FormItem className='flex items-center justify-between w-full'>
                              <Label className='w-40 text-base'>
                                URL
                              </Label>
                              <div className='w-full'>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    )
                  }
                </div>
              </ScrollArea>
              <div className='flex gap-x-2 mt-4 justify-end'>
                {
                  selectBoard.id && (
                    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button type='button' variant='ghost'>룸 삭제</Button>
                      </DialogTrigger>
                      <DialogContent className='text-center sm:max-w-80'>
                        <DialogHeader>
                          <DialogTitle className='text-center'>룸 삭제</DialogTitle>
                        </DialogHeader>
                        <p className='text-sm'>
                          {selectBoard.type != 'link' && (
                            <>룸을 삭제하면 룸에 속한 글이 <span className='text-destructive font-bold'>모두 삭제</span>됩니다.<br /></>
                          )}
                          이 작업은 되돌릴 수 없어요. 정말 삭제할까요?
                        </p>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              variant='secondary'
                              size='sm'
                              className='w-full'
                            >
                              취소
                            </Button>
                          </DialogClose>
                          <Button
                            variant='destructive'
                            size='sm'
                            className='w-full'
                            onClick={handleDelete}
                          >
                            삭제
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )
                }
                <Button type='submit'>저장</Button>
              </div>
            </form>
          </Form>
        </div>

      </div>
    </div >
  );
}

export default BoardContent;