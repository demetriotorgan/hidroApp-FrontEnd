import axios from "axios";

const api = axios.create({
  baseURL: "https://api-hidro-app.vercel.app/"
});

export default api;
