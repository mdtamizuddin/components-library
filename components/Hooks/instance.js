import axios from "axios";
const url = "https://mdtamiz.xyz";
// const url = "http://localhost:5000";
const api = axios.create({
  baseURL: url,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
