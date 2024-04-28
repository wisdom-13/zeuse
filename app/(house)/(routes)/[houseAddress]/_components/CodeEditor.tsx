import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-tomorrow";

interface CodeEditorProps {
  content?: string;
  onChange?: (value: string) => void;
}

const CodeEditor = ({
  content,
  onChange
}: CodeEditorProps) => {
  return (
    <AceEditor
      placeholder='Placeholder Text'
      mode='html'
      theme='tomorrow'
      name='blah2'
      width='100%'
      onChange={onChange}
      fontSize={12}
      lineHeight={16}
      showPrintMargin={false}
      showGutter={false}
      highlightActiveLine={false}
      wrapEnabled={true}
      value={content}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: false,
        tabSize: 2,
      }} />

  );
}

export default CodeEditor;