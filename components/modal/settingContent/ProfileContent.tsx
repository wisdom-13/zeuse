'use client';

import { HouseBuild } from '@/types';

import { useEffect, useState } from 'react';

import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { v4 as uuid } from 'uuid';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { getPublicUrl } from '@/util/getPublicUrl';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';


interface ProfileContentProps {
  house: HouseBuild;
}

const formSchema = z.object({
  nick_name: z
    .string()
    .min(1, '닉네임을 입력해주세요.'),
  description: z
    .string()
    .optional(),
  avatar_path: z
    .string()
    .optional(),
})

const ProfileContent = ({
  house,
}: ProfileContentProps) => {
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const myProfile = house.family.filter((item) => item.user_id === user?.id)[0];

  const [avatar, setAvatar] = useState<Blob>();
  const [avatarUrl, setAvatarUrl] = useState(myProfile.avatar_path ? getPublicUrl(`profile/${myProfile.avatar_path}`) : myProfile.avatar_url);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldFocusError: false,
    mode: 'onBlur',
    defaultValues: {
      nick_name: '',
      description: '',
    },
  })

  useEffect(() => {
    form.reset({
      nick_name: myProfile.nick_name,
      description: myProfile.description,
    })
  }, [form, form.reset, myProfile])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (avatar) {
      const { data, error } = await supabaseClient
        .storage
        .from('profile')
        .upload(`profile-${uuid()}`, avatar, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        toast.error('변경사항을 저장하는 중 오류가 발생했습니다.');
        return
      }

      if (data) {
        values.avatar_path = data.path;
      }
    }

    const { data, error } = await supabaseClient
      .from('family')
      .update(values)
      .eq('id', myProfile.id)
      .select()
      .single();

    if (error) {
      toast.error('변경사항을 저장하는 중 오류가 발생했습니다.' + error.message);
    }

    if (data) {
      toast.success('변경사항을 저장했습니다.');
    }
  }

  const handleAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.id || !event.target.files) return
    const image = event.target.files[0];
    setAvatar(image);
    setAvatarUrl('');
  }

  return (
    <Form {...form}>
      <form className='flex flex-col justify-between space-y-8 h-full' onSubmit={form.handleSubmit(onSubmit)}>
        <ScrollArea>
          <h2 className='text-xl font-medium'>
            프로필
          </h2>
          <Separator className='my-4' />
          <div className='flex flex-wrap gap-4 items-center'>
            <label
              htmlFor='avatarFile'
              className='h-full flex flex-col items-center justify-center '
            >
              <input
                id='avatarFile'
                accept='image/*,.jpeg,.jpg,.png'
                type='file'
                onChange={handleAvatar}
                className='hidden'
              />
              <Avatar className='h-16 w-16 border'>
                {
                  avatar ? (
                    <AvatarImage asChild src={URL.createObjectURL(avatar)}>
                      <Image src={URL.createObjectURL(avatar)} alt='avatar' fill />
                    </AvatarImage>
                  ) : (
                    <AvatarImage src={avatarUrl} />
                  )
                }
                <AvatarFallback className='text-xs'>
                  <Plus size={16} />
                </AvatarFallback>
              </Avatar>
            </label>
            <FormField
              control={form.control}
              name='nick_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-muted-foreground'>
                    하우스에서 사용할 닉네임
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='text-muted-foreground'>
                    소개
                  </FormLabel>
                  <FormControl>
                    <Textarea className='whitespace-pre-line' {...field} />
                  </FormControl>
                  <FormMessage />
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
  );
}

export default ProfileContent;