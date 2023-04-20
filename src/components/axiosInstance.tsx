import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9001',
});

export default axiosInstance;
