'use client';

import { Family, Memo } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Checkbox } from '@/components/ui/checkbox';
import { Dispatch, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { ChevronsLeftRight, UsersRound } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const RippleAdd = () => {
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();

  const formSchema = z.object({
    content: z.string().min(1),
    is_secret: z.boolean(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldFocusError: false,
    defaultValues: {
      content: '',
      is_secret: false,
    },
  })

  // useEffect(() => {
  //   form.reset({
  //     name: family?.nick_name
  //   })
  // }, [form, form.reset, family])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    // const memoData = {
    //   ...values,
    //   board_id: boardId,
    //   family_id: family?.id,
    //   created_at: new Date(),
    // }

    // const { data, error } = await supabaseClient
    //   .from('memos')
    //   .insert(memoData)
    //   .select()
    //   .single()

    // if (error) {
    //   toast.error('변경사항을 저장하는 중 오류가 발생했습니다.');
    // }

    // if (data) {
    //   setMemos && setMemos((prevState) => ([
    //     data,
    //     ...prevState,
    //   ]));

    //   form.reset({
    //     content: '',
    //     name: family?.nick_name,
    //     password: '',
    //     is_secret: false
    //   })
    // }
  }

  return (
    <>
      {user ? (
        <Form {...form}>
          <form className='flex flex-col justify-between border border-input rounded-md p-3' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem className='flex items-center justify-between w-full'>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='내용을 입력하세요.'
                      className={cn(
                        'border-none',
                        form.formState.errors.content && 'border-rose-300'
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex items-center justify-between gap-x-2 mt-2'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div role='button' className='flex self-start items-center text-sm p-3 hover:bg-primary/5 rounded-md justify-left'>
                    <div className='gap-x-2 flex items-center'>
                      <Avatar className='h-5 w-5'>
                        {/* <AvatarImage src={userDetails?.avatar_url} /> */}
                        <AvatarFallback className='text-xs'>또</AvatarFallback>
                      </Avatar>
                      <span className='font-medium line-clamp-1'>
                        또치
                      </span>
                      <UsersRound size='14' />
                    </div>
                    <ChevronsLeftRight className='rotate-90 ml-2 h-4 w-4' />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                  <DropdownMenuItem>
                    <div className='gap-x-2 flex items-center'>
                      <Avatar className='h-5 w-5'>
                        <AvatarFallback className='text-xs'>지</AvatarFallback>
                      </Avatar>
                      <span className='font-medium line-clamp-1'>
                        지혜
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className='gap-x-2 flex items-center'>
                      <Avatar className='h-5 w-5'>
                        <AvatarFallback className='text-xs'>또</AvatarFallback>
                      </Avatar>
                      <span className='font-medium line-clamp-1'>
                        또치
                      </span>
                      <UsersRound size='14' />
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className='flex'>
                <div className='flex items-center space-x-2 mr-3'>
                  <FormField
                    control={form.control}
                    name='is_secret'
                    render={({ field }) => (
                      <FormItem>
                        <div className='flex items-center gap-x-2'>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className='text-sm font-medium leading-none text-muted-foreground '>
                            비밀글
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <Button>
                  댓글 남기기
                </Button>
              </div>
            </div>
          </form>
        </Form>
      ) : (
        <div className='border border-input rounded-md p-4 text-sm text-muted-foreground'>
          로그인 후 댓글을 남길 수 있어요.
        </div>
      )}
    </>
  );
}

export default RippleAdd;