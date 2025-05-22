// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000, // setup waitting time
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
