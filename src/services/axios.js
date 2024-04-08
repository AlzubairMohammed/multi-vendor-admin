import axios from "axios";
const instance = axios.create({
  baseURL: "http://89.116.236.251:5050/api/",
  // baseURL: "http://localhost:5050/api/",
  // timeout: 1000,
  headers: { "Content-Type": "application/json" },
});
export default instance;
