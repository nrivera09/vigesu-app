// src/shared/utils/axiosInstance.ts

import axios from "axios";
import { API_CONFIG } from "@/shared/config/apiConfig";

export const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
