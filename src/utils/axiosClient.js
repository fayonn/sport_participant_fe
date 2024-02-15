import axios from "axios";

const urls = {
  dev: "http://localhost:8080"
}

const baseUrl = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : urls['dev'];

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': '*'
  },
});

api.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});

export default api;