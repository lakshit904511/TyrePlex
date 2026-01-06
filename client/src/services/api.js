import axios from "axios";

const api = axios.create({
  baseURL: "https://tyreplex-wslx.onrender.com/api",
});

export default api;
