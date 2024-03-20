'use client';

import { useTheme } from 'next-themes';
import {
  BlockNoteEditor,
  PartialBlock
} from '@blocknote/core';
import {
  BlockNoteView,
  useCreateBlockNote
} from '@blocknote/react';
import "@blocknote/react/style.css";


interface EditorProps {
  // onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

const Editor = ({
  // onChange,
  initialContent,
  editable
}: EditorProps) => {

  // const handleUpload = async (file: File) => {
  //   const response = await edgestore.publicFiles.upload({
  //     file
  //   });

  //   return response.url;
  // }

  const editor = useCreateBlockNote({
    initialContent:
      initialContent
        ? JSON.parse(initialContent) as PartialBlock[]
        : undefined,
    // uploadFile: handleUpload
  });

  return (
    <div className='mt-2'>
      <BlockNoteView
        editor={editor}
        editable={editable}
      // theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      // onChange={() => { onChange(JSON.stringify(editor.document)) }}
      />
    </div>
  )
}

export default Editor;