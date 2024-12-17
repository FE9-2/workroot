import { API_URL, TEAM_NAME } from "@/constants/config";
import axios from "axios";

const apiClient = axios.create({
  baseURL: `${API_URL}/${TEAM_NAME}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
