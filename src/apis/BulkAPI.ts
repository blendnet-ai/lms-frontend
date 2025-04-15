import api from "../configs/axios";
import apiConfig from "../configs/api";

export interface BulkUploadResponse {
  message: string;
  data: {
    success_count: number;
    failed_count: number;
    success: Array<{
      student_id: string;
      student_name: string;
      student_email: string;
    }>;
    failures: Array<{
      email: string;
      error: string;
    }>;
  };
}

const BULKAPI = {
  uploadStudents: async function (file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.request({
      url: `${apiConfig.LMS_BASE_URL}/en/programs/bulk-enroll/`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      withCredentials: true,
    });

    return response.data;
  },
};
export default BULKAPI;
