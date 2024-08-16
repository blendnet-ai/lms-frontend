import apiConfig from "../configs/api";
import api from "../configs/axios";

export type GetForm = {
  form: Form;
  id: number;
};

export type Section = {
  heading: string;
  fields: Field[];
};

export type Field = {
  label: string;
  name: string;
  description?: string;
  required: boolean;
  type: string;
  options?: string[];
  value?: string;
  leftLabel?: string;
  rightLabel?: string;
};

export type Form = {
  sections: Section[];
};

const FeedbackFormAPI = {
  getForm: async function (): Promise<GetForm> {
    const response = await api.request({
      url: `${apiConfig.FEEDBACK_URL}/form`,
      method: "GET",
    });

    // console.log(response.data);

    return response.data.data;
  },
  submitForm: async function ({
    form_id,
    data,
    assessment_id,
  }: {
    form_id: number;
    data: any;
    assessment_id: number;
  }): Promise<any> {
    const response = await api.request({
      url: `${apiConfig.FEEDBACK_URL}/form`,
      method: "POST",
      data: {
        form_id,
        data,
        assessment_id,
      },
    });

    return response.data;
  },
};

export default FeedbackFormAPI;
