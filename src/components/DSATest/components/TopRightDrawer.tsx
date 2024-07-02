import { Editor, OnMount } from "@monaco-editor/react";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { Panel } from "react-resizable-panels";
const SUPPORTED_LANGUAGES = ["python", "java", "javascript"];

type TopRightDrawerProps = {
  isCodeEditorMaximized: boolean;
  handleCodeEditorMaxOrMin: () => void;
};

export default function TopRightDrawer(props: TopRightDrawerProps) {
  const [language, setLanguage] = useState<string>("java");
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <Panel>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Select
            size="small"
            style={{
              borderRadius: "10px",
              width: "150px",
              marginBottom: "10px",
            }}
            value={language}
            onChange={handleLanguageChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            {SUPPORTED_LANGUAGES.map((item) => (
              <MenuItem style={{ fontSize: "12px" }} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <IconButton onClick={props.handleCodeEditorMaxOrMin}>
          {props.isCodeEditorMaximized ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>
      </Box>
      <Editor
        defaultLanguage={language}
        language={language}
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
      />
    </Panel>
  );
}
