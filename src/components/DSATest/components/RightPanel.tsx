import TopRightPanel from "./TopRightPanel";
import BottomRightPanel from "./BottomRightPanel";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import * as monaco from "monaco-editor";

type RightPanelProps = {
  isCodeEditorMaximized: boolean;
  handleCodeEditorMaxOrMin: () => void;
  editorRef: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;
};

export default function RightPanel(props: RightPanelProps) {
  return (
    <Panel>
      <PanelGroup direction="vertical">
        <TopRightPanel
          editorRef={props.editorRef}
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
