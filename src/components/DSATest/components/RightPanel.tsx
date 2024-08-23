import TopRightPanel from "./TopRightPanel";
import BottomRightPanel from "./BottomRightPanel";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import * as monaco from "monaco-editor";
import { CodeState } from "../DSATest";
import { Box, Button, Typography } from "@mui/material";
import { icons } from "../../../assets";
import Timer from "./Timer";

type RightPanelProps = {
  isCodeEditorMaximized: boolean;
  handleCodeEditorMaxOrMin: () => void;
  editorRef: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;
  language: string;
  setLanguage: (lang: string) => void;
  isChatBotOpen: boolean;
  runSolution: () => void;
  submitSolution: (navToReport: boolean) => void;
  codeState: CodeState;
  code: string;
  handleCodeEditorChange: (
    value: string | undefined,
    ev: monaco.editor.IModelContentChangedEvent
  ) => void;
  assessmentId: number;
  assessmentMode: boolean;
  resetToOriginalCode: () => void;
};

export default function RightPanel(props: RightPanelProps) {
  const isRunDisable = () => {
    return props.code.trim().length <= 0 || props.codeState != CodeState.IDLE;
  };
  return (
    <Panel
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          marginBottom: "10px",
          width: "100%",
          gap: "10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <img src={icons.code} alt="" />
        <Typography sx={{ color: "#2059EE" }}>Code</Typography>
        {props.assessmentMode && (
          <Timer
            assessmentId={props.assessmentId}
            submitSolution={props.submitSolution}
          />
        )}
        <Box
          sx={{
            justifyContent: "flex-end",
            width: "100%",
            gap: "20px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Button
            sx={{
              borderRadius: "10px",
              backgroundColor: "#2059EE",
              color: "white",
            }}
            className={props.isChatBotOpen ? "minus-z-index" : ""}
            variant="contained"
            onClick={props.runSolution}
            disabled={isRunDisable()}
          >
            Run
          </Button>
          <Button
            sx={{
              borderRadius: "10px",
              backgroundColor: "#2059EE",
              color: "white",
            }}
            className={props.isChatBotOpen ? "minus-z-index" : ""}
            variant="contained"
            onClick={() => props.submitSolution(true)}
            disabled={isRunDisable()}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <PanelGroup direction="vertical">
        <TopRightPanel
          handleCodeEditorChange={props.handleCodeEditorChange}
          editorRef={props.editorRef}
          language={props.language}
          setLanguage={props.setLanguage}
          isCodeEditorMaximized={props.isCodeEditorMaximized}
          handleCodeEditorMaxOrMin={props.handleCodeEditorMaxOrMin}
          code={props.code}
          resetToOriginalCode={props.resetToOriginalCode}
          disabled={isRunDisable()}
        />
        <PanelResizeHandle
          style={{
            backgroundColor: "#EFF6FF",
            height: "10px",
          }}
        />
        {!props.isCodeEditorMaximized && <BottomRightPanel />}
      </PanelGroup>
    </Panel>
  );
}
