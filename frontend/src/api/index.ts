// Create a new file, for example, axiosInstance.js
import axios from 'axios';
import { useRouter } from 'next/router';


const axiosInstance = axios.create({
  baseURL:"http://localhost:3001/"
});
// set abse url 'http://localhost:3001





axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { response } = error;
    
    if (response && response.status === 429) {
      // Redirect user to another page
      window.location.href="/baad"
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
