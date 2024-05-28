'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { HouseBuild } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface HouseContentProps {
  house: HouseBuild;
  setHouseBuild: (updatedHouse: HouseBuild) => void;
}

const formSchema = z.object({
  title: z
    .string({ required_error: '블로그 제목을 입력해주세요.' }),
  description: z
    .string()
    .optional(),
  is_published: z
    .boolean()
    .optional(),
})


const HouseContent = ({
  house,
  setHouseBuild
}: HouseContentProps) => {
  const supabaseClient = useSupabaseClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldFocusError: false,
    mode: 'onBlur'
  })

  useEffect(() => {
    form.reset({
      title: house.title,
      description: house.description,
      is_published: house.is_published,
    })
  }, [form, form.reset, house])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { data, error } = await supabaseClient
      .from('houses')
      .update(values)
      .eq('id', house.id)
      .select()
      .single();

    if (error) {
      toast.error('변경사항을 저장하는 중 오류가 발생했습니다.' + error.message);
    }

    if (data) {
      toast.success('변경사항을 저장했습니다.');
    }
  }


  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <ScrollArea className='h-[calc(100%-160px)] pb-4'>
            <h2 className='text-xl font-medium'>
              하우스
            </h2>
            <Separator className="my-4" />
            <div className='flex flex-col gap-y-4'>
              <div className='flex flex-col gap-y-2'>
                <h3 className='text-base'>주소</h3>
                <p className='font-semibold'>zeuse.com/{house.address}</p>
              </div>
              <Separator className="my-2" />
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      하우스 이름
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className="my-2" />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>하우스 설명</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className="my-2" />
              <FormField
                control={form.control}
                name='is_published'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-base'>
                        하우스 공개 여부
                      </FormLabel>
                      <FormDescription className='pr-10'>
                        하우스를 비공개로 설정할 경우 나와, Family로 설정된 사람만 접근할 수 있습니다.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </ScrollArea>
          <div className='flex gap-x-2 mt-4 justify-end'>
            <Button>저장</Button>
          </div>
        </form>
      </Form >
    </>
  );
}

export default HouseContent;