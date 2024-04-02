'use client';


import {
  Dialog,
  DialogContent,
  DialogHeader
} from '@/components/ui/dialog';
import useWidgetEdit from '@/hooks/useWidgetEdit';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../ui/button';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { v4 as uuid } from 'uuid';
import { toast } from 'sonner';
import { FileWithPreview } from '@/types';



const WidgetModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const widgetEdit = useWidgetEdit();
  const supabaseClient = useSupabaseClient();

  const onChange = (open: boolean) => {
    if (!open) {
      widgetEdit.onModalClose();
    }
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

  const uploadFile = async (e: any) => {
    const pathArr: string[] = [];

    for (const data of files) {
      try {
        const { data: imageData } = await supabaseClient
          .storage
          .from('widget')
          .upload(`image-address-${uuid()}`, data, {
            cacheControl: '3600',
            upsert: false
          });

        if (!imageData) { return false; }
        pathArr.push(imageData.path);
      } catch (error) {
        toast.error(`편집 내용을 저장하는 중 오류가 발생하였습니다. : (upload) ${error}`)
      }
    }

    try {
      const { data: widgetData } = await supabaseClient
        .from('widget')
        .update({ image_array: pathArr })
        .eq('id', '725286f6-b878-4698-9239-0177a88503aa')
        .select();

      console.log(widgetData);
      widgetEdit.onModalClose();
    } catch (error) {
      toast.error(`편집 내용을 저장하는 중 오류가 발생하였습니다. : (update) ${error}`)
    }
  }


  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: false,
    disabled: isLoading,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
  });

  return (
    <Dialog open={widgetEdit.isModalOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader className='pb-2'>
          <h2 className='text-lg font-medium text-center'>
            위젯 편집
          </h2>
          <p className='text-sm text-center'>
            새 집 만들기
          </p>
        </DialogHeader>
        <div
          className='flex flex-col gap-y-2'
        >
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
                    alt="Preview"
                    fill
                    className='object-cover'
                  />
                )}
              </div>
            ))}
            {files.length < 3 && (
              <div
                className='dropzone flex items-center justify-center rounded-md border text-muted-foreground w-full h-40 relative overflow-hidden'
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
          <div>
            <p className='text-sm text-muted-foreground'>이미지는 3개까지 등록할 수 있습니다.</p>
          </div>
          <Button
            className='w-full'
            onClick={uploadFile}
            disabled={isLoading}
          >저장하기</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default WidgetModal;