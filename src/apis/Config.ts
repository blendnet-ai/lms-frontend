import api from "../configs/axios";
import apiConfig from "../configs/api";

// Define the structure for a single feature
export type Feature = {
  name: string;
  enabled: boolean;
};

// Define the structure for the response from the API
export type EnabledFeaturesResponse = Feature[];

// Define a constant for the default response in case of an error
const DEFAULT_FEATURES: Feature[] = [
  { name: "Home", enabled: true },
  { name: "Ask Disha", enabled: false },
  { name: "Doubts Solving", enabled: false },
  { name: "Coding & DSA Practice", enabled: true },
  { name: "DSA Practice", enabled: true },
  { name: "Resume", enabled: true },
  { name: "Mock Interviews", enabled: false },
  { name: "Projects", enabled: false },
  { name: "Support", enabled: true },
];

const DataConfigAPI = {
  enabledFeatures: async function (): Promise<EnabledFeaturesResponse> {
    try {
      const response = await api.request({
        url: `${apiConfig.CONFIG}/config_map/EnabledFeatures`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data as EnabledFeaturesResponse; // Cast the response data
    } catch (error) {
      console.error("Error fetching enabled features:", error);
      // Return the predefined response in case of error
      return DEFAULT_FEATURES;
    }
  },
};

export default DataConfigAPI;
