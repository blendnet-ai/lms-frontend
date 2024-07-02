import TopRightPanel from "./TopRightPanel";
import BottomRightPanel from "./BottomRightPanel";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

type RightPanelProps = {
  isCodeEditorMaximized: boolean;
  handleCodeEditorMaxOrMin: () => void;
};

export default function RightPanel(props: RightPanelProps) {
  return (
    <Panel>
      <PanelGroup direction="vertical">
        <TopRightPanel
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
