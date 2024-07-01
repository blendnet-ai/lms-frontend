import { useEffect, useRef, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { Drawer } from "@mui/material";
import useResize from "../../hooks/useResize";

export default function DSATest() {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const { width: questionDrawerWidth, enableResize } = useResize({
    startWidth: window.innerWidth * 0.5,
  });

  const [editorDrawerWidth, setEditorDrawerWidth] = useState(
    window.innerWidth * 0.5
  );

  useEffect(() => {
    const newEditorDrawerWidth = window.innerWidth - questionDrawerWidth;
    setEditorDrawerWidth(newEditorDrawerWidth);
  }, [questionDrawerWidth]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  return (
    <>
      <Drawer
        sx={{
          width: questionDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: questionDrawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div
          style={{
            position: "absolute",
            width: "5px",
            top: "0",
            right: "-1px",
            bottom: "0",
            cursor: "col-resize",
            backgroundColor: "grey",
          }}
          onMouseDown={enableResize}
        />
      </Drawer>

      <Drawer
        sx={{
          width: editorDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: editorDrawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Editor
          width={editorDrawerWidth}
          height="90vh"
          defaultLanguage="java"
          defaultValue="// some comment"
          onMount={handleEditorDidMount}
        />
      </Drawer>
    </>
  );
}
