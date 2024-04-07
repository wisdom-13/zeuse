'use client';

import { Button } from '@/components/ui/button';
import { getPublicUrl } from '@/util/getPublicUrl';
import {
  BlockNoteEditor,
  PartialBlock
} from '@blocknote/core';
import {
  BlockNoteView,
  useCreateBlockNote
} from '@blocknote/react';
import "@blocknote/react/style.css";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';
import { v4 as uuid } from 'uuid';


interface EditorProps {
  initialContent?: string;
  editable?: boolean;
  thumbnailPath?: string;
  onChange?: (value: string) => void;
  setThumbnailPath: (value: string) => void;
};

const Editor = ({
  initialContent,
  editable,
  onChange,
  setThumbnailPath,
  thumbnailPath
}: EditorProps) => {
  const supabaseClient = useSupabaseClient();

  const handleUpload = async (file: File) => {
    const { data, error } = await supabaseClient
      .storage
      .from(`post`)
      .upload(`${uuid()}`, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      toast.error('이미지를 업로드하는 중 오류가 발생했습니다.')
    }

    if (data) {
      if (thumbnailPath == '') {
        setThumbnailPath(data.path);
      }

      return getPublicUrl(`post/${data.path}`);
    }

    return '';
  }

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent:
      initialContent
        ? JSON.parse(initialContent) as PartialBlock[]
        : undefined,
    uploadFile: handleUpload,
  });

  return (
    <div className='mt-2'>
      <BlockNoteView
        editor={editor}
        editable={editable}
        onChange={() => onChange && onChange(JSON.stringify(editor.document))}
      />
    </div>
  )
}

export default Editor;