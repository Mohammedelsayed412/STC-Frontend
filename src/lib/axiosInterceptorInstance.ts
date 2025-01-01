import axios from "axios";
import CONFIG from "@/constants/config";

const axiosInterceptorInstance = axios.create({
  baseURL: CONFIG.NEXT_PUBLIC_BACKEND_URL,
});

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    if(!process.env['NEXT_PUBLIC_BACKEND_URL']){
      console.log(`Environment variable ${'NEXT_PUBLIC_BACKEND_URL'} is missing`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;
