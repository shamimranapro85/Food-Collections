import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
export const axiosBaseUrl = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
});

const useInterceptor = () => {
  const functionState = useSelector((state) => state.functionState);
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        functionState.Funcs.onLoginOutClick();
        return Promise.reject(err);
      }
    );
  }, []);
  return axiosInstance;
};

export default useInterceptor;
