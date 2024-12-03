import { API_URL, TEAM_NAME } from "@/constants/config";
import axios from "axios";

const fileApiClient = axios.create({
  baseURL: `${API_URL}/${TEAM_NAME}`,
});

export default fileApiClient;
