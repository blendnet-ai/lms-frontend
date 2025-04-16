import apiConfig from "../configs/api";
import api from "../configs/axios";

const CourseAPI = {
  createCourse: async (
    title: string,
    code: string,
    summary: string,
    course_hours: number
  ) => {
    const response = await api.request({
      url: `${apiConfig.PROGRAMS_URL}/course/create/`,
      method: "POST",
      data: {
        title,
        code,
        summary,
        course_hours,
      },
    });
    return response.data;
  },

  getCourse: async (courseId: string) => {
    const response = await api.request({
      url: `${apiConfig.PROGRAMS_URL}/get-course/${courseId}/`,
      method: "GET",
    });
    return response.data.course;
  },

  updateCourse: async (
    courseId: string,
    title: string,
    code: string,
    summary: string,
    course_hours: number
  ) => {
    const response = await api.request({
      url: `${apiConfig.PROGRAMS_URL}/course/${courseId}/update/`,
      method: "PUT",
      data: {
        title,
        code,
        summary,
        course_hours,
      },
    });
    return response.data;
  },

  deleteCourse: async (courseId: string) => {
    const response = await api.request({
      url: `${apiConfig.PROGRAMS_URL}/course/${courseId}/delete/`,
      method: "DELETE",
    });
    return response.data;
  },

  createModule: async (
    courseId: string,
    title: string,
    order_in_course: number
  ) => {
    const response = await api.request({
      url: `${apiConfig.PROGRAMS_URL}/course/${courseId}/module/create/`,
      method: "POST",
      data: {
        title,
        order_in_course,
      },
    });
    return response.data;
  },

  deleteModule: async (moduleId: string, courseId: string) => {
    const response = await api.request({
      url: `${apiConfig.PROGRAMS_URL}/course/${courseId}/module/${moduleId}/delete/`,
      method: "DELETE",
    });
    return response.data;
  },

  updateModule: async (
    courseId: string,
    moduleId: string,
    title: string,
    order_in_course: number
  ) => {
    const response = await api.request({
      url: `${apiConfig.PROGRAMS_URL}/course/${courseId}/module/${moduleId}/update/`,
      method: "PUT",
      data: {
        title,
        order_in_course,
      },
    });
    return response.data;
  },

  getModule: async (moduleId: string) => {
    const response = await api.request({
      url: `${apiConfig.PROGRAMS_URL}/get-module/${moduleId}/`,
      method: "GET",
    });
    return response.data.module;
  },
  uploadMaterial: async (
    order: number,
    title: string,
    courseId: string,
    moduleId: string,
    fileType: string
  ) => {
    const response = await api.request({
      url: `${apiConfig.PROGRAMS_URL}/materials/upload/`,
      method: "POST",
      data: {
        title: `${order}_${title}`,
        course: courseId,
        module: moduleId,
        file_type: fileType,
      },
    });
    return response.data.blob_url;
  },

  deleteMaterial: async (materialId: string, type: string) => {
    const response = await api.request({
      url: `${apiConfig.PROGRAMS_URL}/materials/${type}/${materialId}/delete/`,
      method: "DELETE",
    });
    return response.data;
  },
};

export default CourseAPI;
