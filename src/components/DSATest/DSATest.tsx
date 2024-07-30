import { createContext, useEffect, useRef, useState } from "react";
import "./DSATest.css";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import { PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import {
  Backdrop,
  Box,
  Button,
  CardMedia,
  Fade,
  IconButton,
  Modal,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import * as monaco from "monaco-editor";
import DSAPracticeAPI, { GetStatusResponse } from "../../apis/DSAPracticeAPI";
import EvalAPI, {
  Assessment,
  DSACodingQuestionResponse,
} from "../../apis/EvalAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Difficulty } from "../DifficultyChip/DifficultyChip";
import { stat } from "fs";
import { icons } from "../../assets";
import CloseIcon from "@mui/icons-material/Close";
import ChatBotWrapper from "../ChatBot/ChatBotWrapper";

type DSATestData = {
  question: string;
  title: string;
  exampleTestcases: TestCase[];
  questionId: number;
  assessmentId: number;
  difficulty: Difficulty;
  topics: string[];
  companies: string[];
  code: string;
};

export type TestCase = {
  testCase: string;
  expectedOutput: string;
};

export const TestCaseContext = createContext<TestCase[] | null>(null);

export const breakText = (text: string) => {
  return text.split("\n").map((item, index) => (
    <Typography key={index}>
      {item}
      <br />
    </Typography>
  ));
};

type TestResultContextType = {
  codeState: CodeState;
  setCodeState: (value: CodeState) => void;
  questionId: number;
  assessmentId: number;
  testCasesRunData: GetStatusResponse | null;
  setTestCasesRunData: (data: GetStatusResponse | null) => void;
};

export enum CodeState {
  IDLE,
  SUBMITTING,
  RUNNING,
}

export const TestResultContext = createContext<TestResultContextType | null>(
  null
);

type BottomRightPanelContextType = {
  codeState: CodeState;
};

export const BottomRightPanelContext =
  createContext<BottomRightPanelContextType | null>(null);

export const SUPPORTED_LANGUAGES = ["python", "java", "javascript", "cpp"];

export function DSAPracticeStart() {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    (async () => {
      const response = await EvalAPI.startAssessment(Assessment.DSA_PRACTICE);

      const assessmentId = response.assessment_id;

      const data = await EvalAPI.getData(assessmentId);

      const questionId = data.question_list[0].questions[0];

      navigate(
        `/dsa-practice?assessment_id=${assessmentId}&question_id=${questionId}`
      );
    })();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleStartAssessment}>
        Start
      </Button>
    </div>
  );
}

export default function DSATestWrapper() {
  const [data, setData] = useState<DSACodingQuestionResponse>();

  const [code, setCode] = useState(CODE_COMMENT);

  const [searchParams, _] = useSearchParams();

  const [assessmentId, setAssessmentId] = useState(0);

  useEffect(() => {
    (async () => {
      const assessmentId = searchParams.get("assessment_id");
      if (assessmentId) setAssessmentId(parseInt(assessmentId));
      const questionId = searchParams.get("question_id");
      if (assessmentId && questionId) {
        const fetchedData = await EvalAPI.getQuestion(
          parseInt(questionId),
          parseInt(assessmentId)
        );

        const state = await DSAPracticeAPI.getState(assessmentId);
        if (state.attempted_questions && state.attempted_questions.length > 0)
          setCode(state.attempted_questions[0].code);
        setData(fetchedData as DSACodingQuestionResponse);
      }
    })();
  }, []);

  useEffect(() => {}, []);

  const hardcodedData = {
    title: "Two Sum",
    question:
      '<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>\n\n<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>\n\n<p>You can return the answer in any order.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,7,11,15], target = 9\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,4], target = 6\n<strong>Output:</strong> [1,2]\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,3], target = 6\n<strong>Output:</strong> [0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n\t<li><strong>Only one valid answer exists.</strong></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code><font face="monospace">&nbsp;</font>time complexity?',
    exampleTestcases: [
      {
        testCase: "nums = [2,7,11,15], target = 9",
        expectedOutput: "[0,1]",
      },
      {
        testCase: "nums = [3,2,4], target = 6",
        expectedOutput: "[1,2]",
      },
      {
        testCase: "nums = [3,3], target = 6",
        expectedOutput: "[0,1]",
      },
    ],
    questionId: 1,
    assessmentId: 1,
  };
  if (data)
    return (
      <DSATest
        difficulty={data.difficulty}
        question={data.question}
        questionId={data.question_id}
        assessmentId={assessmentId}
        title={data.questionTitle}
        exampleTestcases={data.exampleTestcases}
        topics={data.topics}
        companies={data.companies}
        code={code}
      />
    );
  else return <div>Loading</div>;
}

type DSABotContextType = {
  questionId: number;
  assessmentId: number;
  code: string;
  language: string;
  testCasesRunData: GetStatusResponse | null;
};

export const DSABotContext = createContext<DSABotContextType | null>(null);

export const CODE_COMMENT = `# Examples to handle user input:
# 1. Single Integer Input:
#     num = int(input())
# 2. Multiple space-separated integers:
#     a, b = map(int, input().split())
# 3. List of integers:
#     import ast
#     nums = ast.literal_eval(input())
`;

export function DSATest(props: DSATestData) {
  const [isCodeEditorMaximized, setCodeEditorMaximized] = useState(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [language, setLanguage] = useState(SUPPORTED_LANGUAGES[0]);
  const [codeState, setCodeState] = useState(CodeState.IDLE);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  const [code, setCode] = useState(props.code);

  const [testCasesRunData, setTestCasesRunData] =
    useState<GetStatusResponse | null>(null);

  function handleCodeEditorChange(
    value: string | undefined,
    ev: monaco.editor.IModelContentChangedEvent
  ) {
    if (value != undefined) setCode(value);
  }

  const navigate = useNavigate();

  const handleCodeEditorMaxOrMin = () => {
    setCodeEditorMaximized((prev) => !prev);
  };

  const runSolution = async () => {
    if (editorRef.current) {
      setCodeState(CodeState.SUBMITTING);
      await DSAPracticeAPI.runSolution(
        props.questionId,
        props.assessmentId,
        "run",
        language,
        editorRef.current.getValue()
      );
      setCodeState(CodeState.RUNNING);
    }
  };

  const submitSolution = async () => {
    runSolution().then(() => {
      EvalAPI.closeAssessment(props.assessmentId);
    });
    navigate(`/dsa-practice-report?assessment_id=${props.assessmentId}`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
        height: "90vh",
        backgroundColor: "#EFF6FF",
        zIndex: 1,
      }}
    >
      <DSABotContext.Provider
        value={{
          questionId: props.questionId,
          assessmentId: props.assessmentId,
          code: code,
          language: language,
          testCasesRunData,
        }}
      >
        <ChatBotWrapper
          code={code}
          language={language}
          isChatBotOpen={isChatBotOpen}
          setIsChatBotOpen={setIsChatBotOpen}
          questionId={props.questionId}
          assessmentId={props.assessmentId}
          testCasesRunData={testCasesRunData}
        />
      </DSABotContext.Provider>
      <PanelGroup
        className={isChatBotOpen ? "minus-z-index" : ""}
        direction="horizontal"
        style={{ height: "90vh" }}
      >
        <LeftPanel
          title={props.title}
          question={props.question}
          questionId={props.questionId}
          visible={!isCodeEditorMaximized}
          difficulty={props.difficulty}
          topics={props.topics}
          companies={props.companies}
        />
        <PanelResizeHandle
          style={{
            backgroundColor: "#EFF6FF",
            width: "40px",
          }}
        />
        <BottomRightPanelContext.Provider value={{ codeState: codeState }}>
          <TestResultContext.Provider
            value={{
              codeState: codeState,
              setCodeState: setCodeState,
              questionId: props.questionId,
              assessmentId: props.assessmentId,
              testCasesRunData,
              setTestCasesRunData,
            }}
          >
            <TestCaseContext.Provider value={props.exampleTestcases}>
              <RightPanel
                editorRef={editorRef}
                language={language}
                setLanguage={setLanguage}
                isCodeEditorMaximized={isCodeEditorMaximized}
                handleCodeEditorMaxOrMin={handleCodeEditorMaxOrMin}
                isChatBotOpen={isChatBotOpen}
                runSolution={runSolution}
                codeState={codeState}
                submitSolution={submitSolution}
                code={code}
                handleCodeEditorChange={handleCodeEditorChange}
              />
            </TestCaseContext.Provider>
          </TestResultContext.Provider>
        </BottomRightPanelContext.Provider>
      </PanelGroup>
    </Box>
  );
}
