'use client';

import { Family, Memo, UserDetails } from '@/types';
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
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Checkbox } from '@/components/ui/checkbox';
import { Dispatch, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { useUserHouseRole } from '@/hooks/useUserHouseRole';

interface MemoAddProps {
  boardId?: string;
  family?: UserDetails;
  setMemos?: Dispatch<React.SetStateAction<Memo[]>>;
}

const MemoAdd = ({
  boardId,
  family,
  setMemos,
}: MemoAddProps) => {
  const { houseAddress } = useParams<{ houseAddress: string }>();
  const { isFamily, profiles } = useUserHouseRole(houseAddress);

  const supabaseClient = useSupabaseClient();

  const formSchema = z.object({
    content: z.string().min(1),
    name: z.string().optional(),
    password: z.string().optional(),
    is_secret: z.boolean(),
  })
    .refine((data) => !(!data.name && !family), {
      path: ['name'],
    })
    .refine((data) => !(!data.password && !family), {
      path: ['password'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldFocusError: false,
    defaultValues: {
      content: '',
      name: '',
      password: '',
      is_secret: false,
    },
  })

  useEffect(() => {
    form.reset({
      name: family?.name
    })
  }, [form, form.reset, family])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const memoData = {
      ...values,
      board_id: boardId,
      family_id: family?.id,
      created_at: new Date(),
    }

    const { data, error } = await supabaseClient
      .from('memos')
      .insert(memoData)
      .select()
      .single()

    if (error) {
      toast.error('변경사항을 저장하는 중 오류가 발생했습니다.');
    }

    if (data) {
      setMemos && setMemos((prevState) => ([
        data,
        ...prevState,
      ]));

      form.reset({
        content: '',
        name: family?.name,
        password: '',
        is_secret: false
      })
    }
  }

  return (
    <Form {...form}>
      <form className='flex flex-col justify-between' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem className='flex justify-between items-center w-full'>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='내용을 입력하세요.'
                  className={form.formState.errors.content && 'border-rose-300'}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className='flex justify-end items-center gap-x-2 mt-2'>
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
                    <FormLabel className='font-medium text-muted-foreground text-sm leading-none'>
                      비밀글
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          {!family && (
            <>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='flex justify-between items-center w-36'>
                    <FormControl>
                      <Input
                        {...field}
                        className={form.formState.errors.name && 'border-rose-300'}
                        placeholder='닉네임'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='flex justify-between items-center w-36'>
                    <FormControl>
                      <Input
                        {...field}
                        type='password'
                        className={form.formState.errors.password && 'border-rose-300'}
                        placeholder='암호'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}
          <Button
            className='w-16'
          >
            등록
          </Button>
        </div>
      </form>
    </Form >
  )
}

export default MemoAdd;