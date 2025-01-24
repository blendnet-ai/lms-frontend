export type CreateLiveClassModalProps = {
  open: boolean;
  close: () => void;
  submit: () => void;
  isLiveClassCreated: (value: boolean) => void;
};

export interface FormData {
  title: string;
  recurrence_type: string;
  week_days: boolean[];
}

export interface ErrorField {
  startDate: string | null;
  endDate: string | null;
  startTime: string | null;
  duration: string | null;
}

export type CreateNotificationModalProps = {
  open: boolean;
  close: () => void;
};

export type CourseProvider = {
  id: number;
  name: string;
};

export type Course = {
  id: number;
  title: string;
};

export type Batch = {
  id: number;
  title: string;
};

export type QuestionNavigatorModalProps = {
  open: boolean;
  close: () => void;
  currentQuestion: {
    section: string;
    questionId: number;
  };
  setCurrentQuestion: ({ section, questionId }: any) => void;
  transformedQuestionsList: any;
  attemptedQuestionsMapping: any;
};
