import axios from "axios";
const instance = axios.create({
  baseURL: "http://89.116.236.251:8000/api/",
  timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
});
export default instance;
