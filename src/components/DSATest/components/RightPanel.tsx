import TopRightPanel from "./TopRightPanel";
import BottomRightPanel from "./BottomRightPanel";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import * as monaco from "monaco-editor";

type RightPanelProps = {
  isCodeEditorMaximized: boolean;
  handleCodeEditorMaxOrMin: () => void;
  editorRef: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;
  language: string;
  setLanguage: (lang: string) => void;
};

export default function RightPanel(props: RightPanelProps) {
  return (
    <Panel>
      <PanelGroup direction="vertical">
        <TopRightPanel
          editorRef={props.editorRef}
          language={props.language}
          setLanguage={props.setLanguage}
          isCodeEditorMaximized={props.isCodeEditorMaximized}
          handleCodeEditorMaxOrMin={props.handleCodeEditorMaxOrMin}
        />
        <PanelResizeHandle
          style={{
            backgroundColor: "grey",
            height: "4px",
          }}
        />
        {!props.isCodeEditorMaximized && <BottomRightPanel />}
      </PanelGroup>
    </Panel>
  );
}
