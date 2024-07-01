import { useEffect, useRef, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import {
  Box,
  Drawer,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import useResize from "../../hooks/useResize";
import "./DSATest.css";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import Resizer from "../Resizer/Resizer";

const SUPPORTED_LANGUAGES = ["python", "java", "javascript"];

type DSATestData = {
  question: string;
  title: string;
};

export default function DSATestWrapper() {
  const data = {
    title: "Two Sum",
    question:
      '<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>\n\n<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>\n\n<p>You can return the answer in any order.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,7,11,15], target = 9\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,4], target = 6\n<strong>Output:</strong> [1,2]\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,3], target = 6\n<strong>Output:</strong> [0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n\t<li><strong>Only one valid answer exists.</strong></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code><font face="monospace">&nbsp;</font>time complexity?',
  };
  return <DSATest {...data} />;
}

function DSATest(props: DSATestData) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const { size: leftDrawerWidth, enableResize: leftDrawerEnableResize } =
    useResize({
      startSize: window.innerWidth * 0.5,
      resizerOrientation: "vertical",
    });

  const {
    size: topRightDrawerHeight,
    enableResize: topRightDrawerEnableResize,
    setSize: setTopRightDrawerHeight,
  } = useResize({
    startSize: window.innerHeight * 0.5,
    resizerOrientation: "horizontal",
  });

  console.log(window.innerHeight * 0.5);
  const [rightDrawerWidth, setRightDrawerWidth] = useState(
    window.innerWidth * 0.5
  );

  const [bottomRightDrawerHeight, setBottomRightDrawerHeight] = useState(
    window.innerHeight * 0.5
  );

  const [language, setLanguage] = useState<string>("java");

  const [isCodeEditorMaximized, setCodeEditorMaximized] = useState(false);

  const handleCodeEditorMaxOrMin = () => {
    setCodeEditorMaximized((prev) => {
      const newValue = !prev;
      if (newValue) {
        setTopRightDrawerHeight(window.innerHeight);
        setRightDrawerWidth(window.innerWidth);
      } else {
        setTopRightDrawerHeight(window.innerHeight - bottomRightDrawerHeight);
        setRightDrawerWidth(window.innerWidth - leftDrawerWidth);
      }

      return newValue;
    });
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  useEffect(() => {
    if (!isCodeEditorMaximized) {
      const newrightDrawerWidth = window.innerWidth - leftDrawerWidth;
      setRightDrawerWidth(newrightDrawerWidth);
    }
  }, [leftDrawerWidth]);

  useEffect(() => {
    if (!isCodeEditorMaximized) {
      const newBottomRightDrawerHeight =
        window.innerHeight - topRightDrawerHeight;
      setBottomRightDrawerHeight(newBottomRightDrawerHeight);
    }
  }, [topRightDrawerHeight]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  return (
    <>
      {!isCodeEditorMaximized && (
        <Drawer
          sx={{
            width: leftDrawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: leftDrawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box sx={{ padding: "10px" }}>
            <h2>{props.title}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: props.question,
              }}
            />
          </Box>
          <Resizer
            enableResize={leftDrawerEnableResize}
            orientation="vertical"
          />
        </Drawer>
      )}
      <Drawer
        sx={{
          width: rightDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: rightDrawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Box sx={{ padding: "10px" }}>
          <Drawer
            sx={{
              height: topRightDrawerHeight,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                height: topRightDrawerHeight,
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
                height:
                  topRightDrawerHeight > 60 ? "60px" : topRightDrawerHeight,
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
              <IconButton onClick={handleCodeEditorMaxOrMin}>
                {isCodeEditorMaximized ? <FullscreenExit /> : <Fullscreen />}
              </IconButton>
            </Box>
            <Editor
              width={rightDrawerWidth}
              height={topRightDrawerHeight > 60 ? topRightDrawerHeight - 60 : 0}
              defaultLanguage={language}
              language={language}
              defaultValue="// some comment"
              onMount={handleEditorDidMount}
            />
            <Resizer
              enableResize={topRightDrawerEnableResize}
              orientation="horizontal"
            />
          </Drawer>
          {!isCodeEditorMaximized && (
            <Drawer
              sx={{
                height: bottomRightDrawerHeight,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  height: bottomRightDrawerHeight,
                  boxSizing: "border-box",
                  position: "absolute",
                },
              }}
              variant="permanent"
              anchor="bottom"
            >
              <Box>Test cases</Box>
            </Drawer>
          )}
        </Box>
      </Drawer>
    </>
  );
}
