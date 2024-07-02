import { Editor, OnMount } from "@monaco-editor/react";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRef, useState } from "react";
import Resizer from "../../Resizer/Resizer";
import * as monaco from "monaco-editor";
const SUPPORTED_LANGUAGES = ["python", "java", "javascript"];

type TopRightDrawerProps = {
  height: number;
  width: number;
  isCodeEditorMaximized: boolean;
  handleCodeEditorMaxOrMin: () => void;
  enableResize: () => void;
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
    <Drawer
      sx={{
        height: props.height,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          height: props.height,
          boxSizing: "border-box",
          position: "absolute",
        },
      }}
      variant="permanent"
      anchor="top"
    >
      <Box
        sx={{
          padding: "10px",
          height: props.height > 60 ? "60px" : props.height,
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
        width={props.width}
        height={props.height > 60 ? props.height - 60 : 0}
        defaultLanguage={language}
        language={language}
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
      />
      <Resizer enableResize={props.enableResize} orientation="horizontal" />
    </Drawer>
  );
}
