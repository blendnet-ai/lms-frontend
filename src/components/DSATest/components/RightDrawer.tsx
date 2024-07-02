import TopRightDrawer from "./TopRightDrawer";
import BottomRightDrawer from "./BottomRightDrawer";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

type RightDrawerProps = {
  isCodeEditorMaximized: boolean;
  handleCodeEditorMaxOrMin: () => void;
};

export default function RightDrawer(props: RightDrawerProps) {
  return (
    <Panel>
      <PanelGroup direction="vertical">
        <TopRightDrawer
          isCodeEditorMaximized={props.isCodeEditorMaximized}
          handleCodeEditorMaxOrMin={props.handleCodeEditorMaxOrMin}
        />
        <PanelResizeHandle
          style={{
            backgroundColor: "grey",
            height: "4px",
          }}
        />
        {!props.isCodeEditorMaximized && <BottomRightDrawer />}
      </PanelGroup>
    </Panel>
  );
}
