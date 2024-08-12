import { Editor, OnMount } from "@monaco-editor/react";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  Backdrop,
  Box,
  Button,
  Divider,
  Fade,
  IconButton,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import * as monaco from "monaco-editor";
import { Panel } from "react-resizable-panels";
import { SUPPORTED_LANGUAGES } from "../DSATest";
import { loader } from "@monaco-editor/react";

loader.config({ monaco });

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
  resetToOriginalCode: () => void;
  disabled: boolean;
};
const codeEdiorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  fontSize: 16,
};

export default function TopRightPanel(props: TopRightPanelProps) {
  const [openResetModal, setOpenResetModal] = useState(false);
  const handleOpenResetModal = () => setOpenResetModal(true);
  const handleCloseResetModal = () => setOpenResetModal(false);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    props.setLanguage(event.target.value);
  };

  const handleEditorDidMount: OnMount = (editor) => {
    props.editorRef.current = editor;
  };

  const handleResetCode = () => {
    handleOpenResetModal();
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
          <Box>
            <Tooltip title="Reset Code" placement="bottom">
              <IconButton onClick={handleResetCode} disabled={props.disabled}>
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
            <IconButton onClick={props.handleCodeEditorMaxOrMin}>
              {props.isCodeEditorMaximized ? (
                <FullscreenExit />
              ) : (
                <Fullscreen />
              )}
            </IconButton>
          </Box>
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
      {/* Modal for reset code */}
      <Modal
        aria-labelledby="reset-code-modal"
        aria-describedby="reset-code-modal"
        open={openResetModal}
        onClose={handleCloseResetModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openResetModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: "5px",
              minWidth: "550px",
            }}
          >
            {/* title  */}
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                padding: "20px",
              }}
            >
              Reset Code in Editor
            </Typography>
            <Divider />
            {/* content  */}
            <Typography
              id="modal-modal-description"
              sx={{
                padding: "20px",
              }}
            >
              Are you sure you want to reset the code in the editor?
            </Typography>
            <Divider />
            {/* actions  */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                padding: "20px",
              }}
            >
              <Button
                onClick={handleCloseResetModal}
                sx={{
                  backgroundColor: "#CACBCD",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#CACBCD",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  props.resetToOriginalCode();
                  handleCloseResetModal();
                }}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Panel>
  );
}
