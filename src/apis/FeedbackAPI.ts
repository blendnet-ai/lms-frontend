import api from "../configs/axios";
import apiConfig from "../configs/api";

export interface FeedbackFormStatus {
  form_name: string;
  form_id: number;
  entry_form_id: number;
  start_date: string;
  end_date: string;
  is_overdue: boolean;
  is_filled: boolean;
  filled_on: string | null;
  is_unlocked: boolean;
  week_label: string;
}

export interface FormsData {
  forms: FeedbackFormStatus[];
}

export interface FeedbackStatusResponse {
  course_id: number;
  course_name: string;
  course_code: string;
  batch: number;
  forms_data: FormsData;
  action_required: boolean;
}

export interface FeedbackField {
  name: string;
  type: string;
  label: string;
  options?: string[];
  required: boolean;
}

export interface FeedbackSection {
  fields: FeedbackField[];
  heading: string;
}

export interface FeedbackFormData {
  sections: FeedbackSection[];
}

export interface FeedbackForm {
  sections: FeedbackSection[];
}
export interface FeedbackFormResponse {
  data: {
    form: FeedbackForm;
    id: number;
  };
}

const FeedbackAPI = {
  getStatus: async function (): Promise<FeedbackStatusResponse[]> {
    const response = await api.request({
      url: `${apiConfig.FEEDBACK_URL}/status`,
      method: "GET",
    });
    return response.data;
  },
  getForms: async function (): Promise<FeedbackFormResponse> {
    console.log("getForms");
    const response = await api.request({
      url: `${apiConfig.FEEDBACK_URL}/form?name=student_feedback_form`,
      method: "GET",
    });
    return response.data;
  },
  submitForm: async function (entry_id: number, sections: FeedbackForm) {
    console.log("submitForm");
    console.log(entry_id);
    await api.request({
      url: `${apiConfig.FEEDBACK_URL}/form`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        data: sections,
        course_feedback_entry_id: entry_id,
      },
    });
  },
};

export default FeedbackAPI;
