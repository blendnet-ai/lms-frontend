export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  COURSES: "/courses",
  COURSE_FORM: "/course-form",
  COURSE_EDIT: "/course-edit",
  ONBOARDING: "/onboarding",
  VIDEO_FORM: "/video-form",
  DOCUMENT_FORM: "/document-form",
  ASSESSMENT: {
    HOME: "/assessment",
    START: "/assessment-start",
    RESULTS: "/assessment-results",
    REPORT: "/assessment-results/report/:assessmentId",
  },
  MODULES: "/modules/:courseName",
  MODULE_FORM: "/module-form",
  MODULE_EDIT: "/module-edit",
  HELP_SUPPORT: "/help-support",
  FEEDBACK: "/feedback",
  BATCHES: "/batches",
  RECORDINGS: "/recordings",
  STUDENTS: {
    LIST: "/students",
    DETAILS: "/students/:studentId",
    ADD: "/students/add",
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

export const getCourseEditRoute = (courseId: string) =>
  `${ROUTES.COURSE_EDIT}?courseId=${courseId}`;

export const getModuleFormRoute = (courseId: string, courseName: string) =>
  `${ROUTES.MODULE_FORM}?courseId=${courseId}&courseName=${courseName}`;

export const getModuleEditRoute = (
  courseId: string,
  moduleId: string,
  courseName: string
) =>
  `${ROUTES.MODULE_EDIT}?courseId=${courseId}&moduleId=${moduleId}&courseName=${courseName}`;

export const getVideoFormRoute = (
  courseId: string,
  moduleId: string,
  courseName: string
) =>
  `${ROUTES.VIDEO_FORM}?courseId=${courseId}&moduleId=${moduleId}&courseName=${courseName}`;

export const getDocumentFormRoute = (
  courseId: string,
  moduleId: string,
  courseName: string
) =>
  `${ROUTES.DOCUMENT_FORM}?courseId=${courseId}&moduleId=${moduleId}&courseName=${courseName}`;
