import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

interface RetryPromiseHandlers {
  resolve: (token: string | null) => void;
  reject: (error: AxiosError | Error | unknown) => void;
}

let isRefreshing = false;
let failedQueue: RetryPromiseHandlers[] = [];

const processQueue = (error: AxiosError | Error | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(null);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh", {}, { withCredentials: true });

        isRefreshing = false;
        processQueue(null);

        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError as AxiosError);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
