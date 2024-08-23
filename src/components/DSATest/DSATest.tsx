import { createContext, useEffect, useRef, useState } from "react";
import "./DSATest.css";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import { PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import * as monaco from "monaco-editor";
import DSAPracticeAPI, {
  CodeStubs,
  GetStatusResponse,
} from "../../apis/DSAPracticeAPI";
import EvalAPI, {
  Assessment,
  DSACodingQuestionResponse,
} from "../../apis/EvalAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Difficulty } from "../DifficultyChip/DifficultyChip";
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
  codeStubs: CodeStubs;
  originalCodeStubs: CodeStubs;
  assessmentMode: boolean;
};

export type TestCase = {
  testCase: string;
  expectedOutput: string;
};

type TestCaseContextType = {
  testCases: TestCase[];
  customTestCases: TestCase[];
  setCustomTestCases: (val: TestCase[]) => void;
};

export const TestCaseContext = createContext<TestCaseContextType | null>(null);

export const breakText = (text: string) => {
  return text.split("\n").map((item, index) => (
    <Typography key={index}>
      {item}
      <br />
    </Typography>
  ));
};

export const arrayToNumLines = (array: string[]) => {
  return array.map((item, index) => `${index + 1}. ${item}`).join("\n");
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

  const [codeStubs, setCodeStubs] = useState<CodeStubs>({});

  const [originalCodeStubs, setOriginalCodeStubs] = useState<CodeStubs>({});

  const [searchParams, _] = useSearchParams();

  const [assessmentId, setAssessmentId] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const assessmentId = searchParams.get("assessment_id");
      if (assessmentId) setAssessmentId(parseInt(assessmentId));
      const questionId = searchParams.get("question_id");
      try {
        if (assessmentId && questionId) {
          const fetchedData = await EvalAPI.getQuestion(
            parseInt(questionId),
            parseInt(assessmentId)
          );

          const state = await DSAPracticeAPI.getState(assessmentId);
          if (
            state.attempted_questions &&
            state.attempted_questions.length > 0
          ) {
            setCodeStubs(state.attempted_questions[0].code_stubs);
            setOriginalCodeStubs(
              state.attempted_questions[0].original_code_stubs
            );
          }
          setData(fetchedData as DSACodingQuestionResponse);
          // console.log(fetchedData);
        }
      } catch (error: unknown) {
        navigate("/dsa-practice-list");
      }
    })();
  }, []);

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
        codeStubs={codeStubs}
        originalCodeStubs={originalCodeStubs}
        assessmentMode={data.assessment_mode}
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

  const [codeStubs, setCodeStubs] = useState<CodeStubs>(props.codeStubs);
  const [originalCodeStubs, setOriginalCodeStubs] = useState<CodeStubs>(
    props.originalCodeStubs
  );

  const [customTestCases, setCustomTestCases] = useState<TestCase[]>([]);

  const getCodeStub = (language: string, original: boolean) => {
    const stubs = original ? originalCodeStubs : codeStubs;
    if (language in stubs) {
      return stubs[language];
    }

    return "";
  };

  const setCodeStub = (language: string, code: string) => {
    const newCodeStubs = { ...codeStubs };
    newCodeStubs[language] = code;
    setCodeStubs(newCodeStubs);
  };

  const resetToOriginalCode = () => {
    setCode(getCodeStub(language, true));
  };

  const [code, setCode] = useState<string>(getCodeStub(language, false));

  const [isSubmitAlertOpen, setIsSubmitAlertOpen] = useState(false);

  const [testCasesRunData, setTestCasesRunData] =
    useState<GetStatusResponse | null>(null);

  function handleCodeEditorChange(
    value: string | undefined,
    ev: monaco.editor.IModelContentChangedEvent
  ) {
    if (value != undefined) setCode(value);
  }

  const handleSubmitAlertClose = () => {
    setIsSubmitAlertOpen(false);
  };

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
        editorRef.current.getValue(),
        customTestCases
      );
      setCodeState(CodeState.RUNNING);
      setCodeStub(language, code);
    }
  };

  const areAllExampleTestCasesPassed = () => {
    if (!testCasesRunData) {
      return false;
    }

    for (let i = 0; i < testCasesRunData.test_cases.length; i++) {
      if (!testCasesRunData.test_cases[i].passed) return false;
    }
    return true;
  };

  const submitSolution = async (navToReport: boolean) => {
    if (!editorRef.current) return;

    // if we have assessment mode enabled, then direct submit the code whether all test cases are passed or not and close the assessment
    if (props.assessmentMode) {
      DSAPracticeAPI.runSolution(
        props.questionId,
        props.assessmentId,
        "submit",
        language,
        editorRef.current.getValue()
      ).then(() => {
        EvalAPI.closeAssessment(props.assessmentId);
      });
      if (navToReport)
        navigate(`/dsa-practice-report?assessment_id=${props.assessmentId}`);
      return;
    }

    if (areAllExampleTestCasesPassed()) {
      DSAPracticeAPI.runSolution(
        props.questionId,
        props.assessmentId,
        "submit",
        language,
        editorRef.current.getValue()
      ).then(() => {
        EvalAPI.closeAssessment(props.assessmentId);
      });
      if (navToReport)
        navigate(`/dsa-practice-report?assessment_id=${props.assessmentId}`);
    } else {
      setIsSubmitAlertOpen(true);
    }
  };

  useEffect(() => {
    setCode(getCodeStub(language, false));
  }, [language]);

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
      <Snackbar
        open={isSubmitAlertOpen}
        autoHideDuration={6000}
        onClose={handleSubmitAlertClose}
      >
        <Alert
          onClose={handleSubmitAlertClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Please run and pass all example test cases before submitting your code
        </Alert>
      </Snackbar>
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
            width: "10px",
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
            <TestCaseContext.Provider
              value={{
                testCases: props.exampleTestcases,
                customTestCases: customTestCases,
                setCustomTestCases: setCustomTestCases,
              }}
            >
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
                assessmentId={props.assessmentId}
                assessmentMode={props.assessmentMode}
                resetToOriginalCode={resetToOriginalCode}
              />
            </TestCaseContext.Provider>
          </TestResultContext.Provider>
        </BottomRightPanelContext.Provider>
      </PanelGroup>
    </Box>
  );
}
