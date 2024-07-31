import { Editor, OnMount } from "@monaco-editor/react";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import * as monaco from "monaco-editor";
import { Panel } from "react-resizable-panels";
import { CodeState, SUPPORTED_LANGUAGES } from "../DSATest";

type TopRightPanelProps = {
  isCodeEditorMaximized: boolean;
  handleCodeEditorMaxOrMin: () => void;
  editorRef: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;
  language: string;
  setLanguage: (lang: string) => void;
  handleCodeEditorChange: (
    value: string | undefined,
    ev: monaco.editor.IModelContentChangedEvent
  ) => void;
  code: string;
};
const codeEdiorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
};

export default function TopRightPanel(props: TopRightPanelProps) {
  const handleLanguageChange = (event: SelectChangeEvent) => {
    props.setLanguage(event.target.value);
  };

  const handleEditorDidMount: OnMount = (editor) => {
    props.editorRef.current = editor;
  };

  return (
    <Panel>
      <Box
        style={{
          borderRadius: "10px",
          border: "1px solid #CFE4FF",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={
              {
                // padding: "10px 20px 10px 20px",
              }
            }
          >
            <Select
              size="small"
              style={{
                color: "#2059EE",
                borderRadius: "10px",
                width: "150px",
                marginBottom: "10px",
              }}
              value={props.language}
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
          height={`calc(100% - 70px)`}
          defaultLanguage={props.language}
          language={props.language}
          // defaultValue={props.code}
          value={props.code}
          onMount={handleEditorDidMount}
          options={codeEdiorOptions}
          onChange={props.handleCodeEditorChange}
        />
      </Box>
    </Panel>
  );
}
