import axios from "axios";
import Cookies from "js-cookie";
import api from "./axiosTokenAdding";

const BASE_URL = process.env.REACT_APP_BASE_URL;

api.interceptors.response.use(
  (response) => {
    console.log("interseptor responce");
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        const id = Cookies.get("userId");
        const response = await axios.post(`${BASE_URL}/refresh`, {
          refreshToken,
          id,
        });
        const { newAccessToken, newRefreshToken } = response.data.body;

        Cookies.set("accesToken", newAccessToken);
        Cookies.set("refreshToken", newRefreshToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (error) {
        window.history.pushState(null, "", "/login");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
