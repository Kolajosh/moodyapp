/* eslint-disable no-param-reassign */
import axios from 'axios';

const makeRequest = axios.create({
  baseURL: "api/",
  timeout: 1 * 60 * 1000,
});


const useApiRequest = () => {
  // Add a request interceptor
  makeRequest.interceptors.request.use(
    async (config) => {
      return config;
    },
    (error) => Promise.reject(error)
  );

  makeRequest.interceptors.response.use(undefined, (error) => {
    if (error?.response?.status === 401 && window.location.pathname !== '/') {
      localStorage.clear();
      window.location.replace('/');
    }
    return Promise.reject(error);
  });

  return makeRequest;
};

export default useApiRequest;
