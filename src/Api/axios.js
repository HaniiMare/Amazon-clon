import axios from "axios";

const axiosInstance = axios.create({
  // before Deploy
  // baseURL: "http://127.0.0.1:5001/project-e4e60/us-central1/api",
  // After Deploy
  baseURL: " https://api-3b3gutfyrq-uc.a.run.app",
});
export { axiosInstance };
