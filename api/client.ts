import axios from "axios"
import { getCookie } from "../helper/getCookie"
const role = getCookie("role")

const apiClient = axios.create({
  baseURL: process.env.CONCERT_TICKET_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
})

apiClient.interceptors.request.use((config) => {
  const role = localStorage.getItem("role")
  
  if (role) {
    const roleJson = JSON.parse(role);
    const roleName = roleJson.role;
    config.headers["x-role"] = roleName.toUpperCase()
  }
  return config
})

export default apiClient