'use client';

import { FileWithPreview, Widget } from '@/types';

import { useState } from 'react';
import Image from 'next/image';

import { Minus, Plus } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuid } from 'uuid';
import { toast } from 'sonner';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import useHouseBuild from '@/hooks/useHouseBuild';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button';
import { getPublicUrl } from '@/util/getPublicUrl';
import { Checkbox } from '../ui/checkbox';

interface WidgetModalProps {
  widget: Widget;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const WidgetModal = ({
  widget,
  isModalOpen,
  setIsModalOpen
}: WidgetModalProps) => {
  const { houseBuild, setHouseBuild } = useHouseBuild();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const supabaseClient = useSupabaseClient();

  const boardList = houseBuild?.board.filter((item) => item.type == 'post');

  const handleUpdateWidget = async (type: string, value: any) => {
    if (!houseBuild) return;

    const { data, error } = await supabaseClient
      .from('widget')
      .update({ [type]: value })
      .eq('id', widget.id)
      .select()
      .single()

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      const updatedWidget = houseBuild.widget.map((widgetItem) => widgetItem.id === widget.id ? data : widgetItem);

      setHouseBuild({
        ...houseBuild,
        widget: updatedWidget,
      });

      toast.success('변경사항을 저장했습니다.')
    }
  }

  const handleImageUpload = async (e: any) => {
    const pathArr: string[] = [];

    for (const data of files) {
      const { data: imageData } = await supabaseClient
        .storage
        .from('widget')
        .upload(uuid(), data, {
          cacheControl: '3600',
          upsert: false
        });
      if (!imageData) { return false; }
      pathArr.push(imageData.path);
      console.log(pathArr)
    }

    await handleUpdateWidget('image_array', pathArr)
  }

  const onDrop = (acceptedFiles: FileWithPreview[]) => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const removeFile = (fileIndex: number) => {
    const newFiles = [...files];
    newFiles.splice(fileIndex, 1);
    setFiles(newFiles);
  };


  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: false,
    disabled: isLoading,
    maxFiles: widget.image_array ? widget.image_array.length : 3,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className='text-center'>
        <DialogHeader>
          <DialogTitle className='text-center'>위젯 설정</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-y-4'>
          {widget.type == 'board' && (
            <>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='isRoomTitleShow'
                  checked={widget.option_bool}
                  onCheckedChange={() => handleUpdateWidget('option_bool', !widget.option_bool)}
                />
                <label
                  htmlFor='isRoomTitleShow'
                  className='text-sm font-medium leading-none'
                >
                  룸 이름 표시
                </label>
              </div>
              <Select defaultValue={widget.board_id} onValueChange={(v) => handleUpdateWidget('board_id', v)}>
                <SelectTrigger>
                  <SelectValue placeholder='위젯에 표시할 룸을 선택하세요.' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {boardList?.map((item) => {
                      if (!item.id) return
                      return (
                        <SelectItem key={item.id} value={item.id}>
                          {item.title}
                        </SelectItem>
                      )
                    })}
                    <SelectItem key='none' value='none'>
                      선택안함
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

            </>
          )}

          {widget.type == 'image' && (
            <>
              <p className='text-sm text-left text-muted-foreground'>이미지는 3개까지 등록할 수 있습니다.</p>
              <div className='grid grid-cols-3 grid-rows-1 gap-2'>
                {files.map((file, index) => (
                  <div key={`${file.name}-${index}`} className='group rounded-md border w-full h-40 relative overflow-hidden'>
                    <button
                      className='hidden group-hover:block absolute z-[999999] top-1 right-1 bg-background rounded-full p-1'
                      onClick={() => removeFile(index)}
                      disabled={isLoading}
                    >
                      <Minus size={16} />
                    </button>
                    {file.preview && (
                      <Image
                        src={file.preview}
                        alt='Preview'
                        fill
                        className='object-cover'
                      />
                    )}
                  </div>
                ))}
                {files.length < 3 && (
                  <div
                    className='dropzone flex items-center justify-center rounded-md border text-muted-foreground w-full h-40 relative overflow-hidden cursor-pointer'
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <p className='flex flex-col gap-y-2 justify-center items-center text-sm'>
                      <Plus size={20} />
                      드래그해서<br />이미지 추가
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  className='w-full'
                  onClick={handleImageUpload}
                  disabled={isLoading}
                >
                  저장하기
                </Button>
              </DialogFooter>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default WidgetModal;