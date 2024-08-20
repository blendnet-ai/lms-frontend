import { Editor, OnMount } from "@monaco-editor/react";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Backdrop,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  IconButton,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Slide,
  Tooltip,
  Typography,
} from "@mui/material";
import { forwardRef, useState } from "react";
import * as monaco from "monaco-editor";
import { Panel } from "react-resizable-panels";
import { SUPPORTED_LANGUAGES } from "../DSATest";
import { loader } from "@monaco-editor/react";
import { TransitionProps } from "@mui/material/transitions";

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

  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const handleOpenSettingModal = () => {
    setOpenSettingsModal(true);
  };

  const closeSettingsModal = () => {
    setOpenSettingsModal(false);
  };

  const [fontSize, setFontSize] = useState(
    dialogOptions.fontSizes.options[2].value
  );

  const [theme, setTheme] = useState(dialogOptions.themes.options[1].value);

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
            <Tooltip title="Editor Settings" placement="bottom">
              <IconButton
                onClick={handleOpenSettingModal}
                disabled={props.disabled}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
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
          options={{
            fontSize: fontSize,
            minimap: { enabled: false },
          }}
          onChange={props.handleCodeEditorChange}
          theme={theme}
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
      {/* Modal for settings */}
      <Dialog
        open={openSettingsModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeSettingsModal}
        aria-describedby="settings-dialog"
      >
        <DialogTitle>{dialogOptions.title}</DialogTitle>
        <DialogContent>
          <Box>
            {/* Font Size */}
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              {dialogOptions.fontSizes.title}
            </Typography>
            <Typography sx={{ fontSize: "16px", marginBottom: "10px" }}>
              {dialogOptions.fontSizes.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                flexDirection: "row",
              }}
            >
              {/* Font Size */}
              {dialogOptions.fontSizes.options.map((item) => (
                <Button
                  onClick={() => setFontSize(item.value)}
                  variant="outlined"
                  sx={{
                    backgroundColor:
                      fontSize === item.value ? "#2059EE" : "white",
                    color: fontSize === item.value ? "white" : "black",
                    "&:hover": {
                      backgroundColor: "#2059EE",
                      color: "white",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Box>

          <Divider sx={{ margin: "10px 0px" }} />

          <Box>
            {/* Themes */}
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              {dialogOptions.themes.title}
            </Typography>
            <Typography sx={{ fontSize: "16px", marginBottom: "10px" }}>
              {dialogOptions.themes.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                flexDirection: "row",
              }}
            >
              {/* Themes */}
              {dialogOptions.themes.options.map((item) => (
                <Button
                  onClick={() => setTheme(item.value)}
                  variant="outlined"
                  sx={{
                    backgroundColor: theme === item.value ? "#2059EE" : "white",
                    color: theme === item.value ? "white" : "black",
                    "&:hover": {
                      backgroundColor: "#2059EE",
                      color: "white",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSettingsModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Panel>
  );
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const dialogOptions = {
  title: "Editor Settings",
  fontSizes: {
    title: "Font Size",
    description: "Change the font size of the editor",
    options: [
      {
        label: "12",
        value: 12,
      },
      {
        label: "14",
        value: 14,
      },
      {
        label: "16",
        value: 16,
      },
      {
        label: "18",
        value: 18,
      },
      {
        label: "20",
        value: 20,
      },
      {
        label: "22",
        value: 22,
      },
    ],
  },
  themes: {
    title: "Themes",
    description: "Change the theme of the editor",
    options: [
      {
        label: "Dark",
        value: "vs-dark",
      },
      {
        label: "Light",
        value: "vs-light",
      },
    ],
  },
};
