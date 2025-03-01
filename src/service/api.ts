import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_URL,
  timeout: 200000,
  headers: { "Content-Type": "application/json" },
});
