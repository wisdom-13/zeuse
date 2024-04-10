'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogHeader
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import useCreateHouseModal from '@/hooks/useCreateHouseModal';

import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { ScrollArea } from '../ui/scroll-area';

const formSchema = z.object({
  title: z
    .string({ required_error: '블로그 제목을 입력해주세요.' }),
  description: z
    .string()
    .optional(),
  address: z
    .string({ required_error: '블로그 주소를 입력해주세요.' })
    .regex(
      /^[a-zA-Z0-9-]{4,32}$/,
      "4~32자리의 주소를 입력해주세요. (영문, 숫자, 하이픈(-))"
    ),
  nick_name: z
    .string({ required_error: '블로그에서 사용할 닉네임을 입력해주세요.' }),
  is_published: z
    .boolean()
    .optional(),
})

const CreateHouseModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const creatHouseModal = useCreateHouseModal();
  const { user, userDetails } = useUser();
  // const { house } = useGetHouseByAdress(player.activeId);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const onChange = (open: boolean) => {
    if (!open) {
      creatHouseModal.onClose();
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldFocusError: false,
    mode: 'onBlur'
  })

  useEffect(() => {
    form.reset({
      title: '',
      description: '',
      address: '',
      nick_name: userDetails?.name,
      is_published: true,
    })
  }, [form.reset, userDetails])


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    if (!user) {
      toast.error('사용자 정보가 존재하지 않습니다.');
      return;
    }

    // TODO : address 검증

    // 1. house 데이터 추가
    const {
      data: houseData,
      error: houseInsertError
    } = await supabaseClient
      .from('houses')
      .insert({
        title: values.title,
        description: values.description,
        address: values.address,
        is_published: values.is_published,
      })
      .select()
      .single();

    if (houseInsertError) {
      setIsLoading(false);
      console.error(houseInsertError.message)
      return toast.error(`집을 생성하는 도중 오류가 발생하였습니다.1 (${houseInsertError.message})`);
    }

    // 2. family 데이터 추가
    const {
      error: familyInsertError
    } = await supabaseClient
      .from('family')
      .insert({
        user_id: user.id,
        house_id: houseData.id,
        nick_name: values.nick_name,
        avatar_url: userDetails?.avatar_url,
        role: 'master',
        is_owner: true,
      })
      .single();

    if (familyInsertError) {
      setIsLoading(false);
      console.error(familyInsertError.message)
      return toast.error(`집을 생성하는 도중 오류가 발생하였습니다.2 (${familyInsertError.message})`);
    }

    setIsLoading(false);
    toast.success('새로운 집을 생성하였습니다!');
    creatHouseModal.onClose();
    form.reset();
    router.push(`/${values.address}`);
  }

  return (
    <Dialog open={creatHouseModal.isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader className='pb-2'>
          <h2 className='text-lg font-medium text-center'>
            Create ZEUSE
          </h2>
          <p className='text-sm text-center'>
            새 집 만들기
          </p>
        </DialogHeader>
        <ScrollArea className='h-[80vh]'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label>
                      하우스 이름
                      <span className='text-rose-500'>*</span>
                    </Label>
                    <FormControl>
                      <Input
                        className='focus-visible:outline-none'
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label>하우스 설명</Label>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <Label>
                      하우스 주소
                      <span className='text-rose-500'>*</span>
                    </Label>
                    <FormControl>
                      <div className='flex items-center'>
                        <p className='font-semibold'>zeuse.com/</p>
                        <Input
                          className='ml-1'
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nick_name"
                render={({ field }) => (
                  <FormItem>
                    <Label>
                      닉네임
                      <span className='text-rose-500'>*</span>
                    </Label>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        하우스 공개 여부
                      </FormLabel>
                      <FormDescription className='pr-10'>
                        하우스를 비공개로 설정할 경우 나와, Family로 설정된 사람만 접근할 수 있습니다. (이 설정은 변경할 수 있습니다.)
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        disabled={isLoading}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size='lg'
                className='w-full'
              >
                생성하기
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default CreateHouseModal;

