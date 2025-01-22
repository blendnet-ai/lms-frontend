export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  COURSES: "/courses",
  ONBOARDING: "/onboarding",
  ASSESSMENT: {
    HOME: "/assessment",
    START: "/assessment-start",
    RESULTS: "/assessment-results",
    REPORT: "/assessment-results/report/:assessmentId",
  },
  MODULES: "/modules/:courseName",
  HELP_SUPPORT: "/help-support",
  BATCHES: "/batches",
  RECORDINGS: "/recordings",
  STUDENTS: {
    LIST: "/students",
    DETAILS: "/students/:studentId",
  },
  NO_ROLE: "/no-role",
} as const;

// Type-safe route parameter functions

export const getAssessmentReportRoute = (assessmentId: string) =>
  ROUTES.ASSESSMENT.REPORT.replace(":assessmentId", assessmentId);

export const getAssessmentStartRoute = (
  assessmentId: string,
  questionId: string
) => `${ROUTES.ASSESSMENT.START}?id=${assessmentId}&questionId=${questionId}`;

export const getModuleRoute = (courseName: string, courseId: string) =>
  `${ROUTES.MODULES.replace(":courseName", courseName)}?courseId=${courseId}`;

export const getBatchesRoute = (courseId: string) =>
  `${ROUTES.BATCHES}?course_id=${courseId}`;

export const getStudentDetailsRoute = (studentId: string) =>
  `${ROUTES.STUDENTS.DETAILS.replace(":studentId", studentId)}`;
