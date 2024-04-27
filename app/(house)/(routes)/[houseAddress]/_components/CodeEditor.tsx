import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-tomorrow";

interface CodeEditorProps {
  content?: string;
}

const CodeEditor = ({ content }: CodeEditorProps) => {
  return (
    <AceEditor
      placeholder='Placeholder Text'
      mode='html'
      theme='tomorrow'
      name='blah2'
      // onLoad={this.onLoad}
      // onChange={this.onChange}
      fontSize={14}
      lineHeight={24}
      showPrintMargin={false}
      showGutter={false}
      highlightActiveLine={false}
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