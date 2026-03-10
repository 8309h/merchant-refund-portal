import axios from "axios";

// baseURL: "http://localhost:5000"

const API = axios.create({
      baseURL : "https://merchant-refund-portal-g6xl.onrender.com/"
});

// attach token automatically
API.interceptors.request.use((config) => {

      const token = localStorage.getItem("token");

      if (token) {
            config.headers.Authorization = `Bearer ${token}`;
      }

      return config;

});

export default API;