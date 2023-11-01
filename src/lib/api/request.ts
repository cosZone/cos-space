import axios from 'axios';

export type Response<T> = {
  code: number;
  message: string;
  data: T;
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PREFIX,
  timeout: 15_000,
});

// // Add request interceptor
// instance.interceptors.request.use(
//   (config: any) => {
//     // const { getToken } = getAuth(req);
//     const token = getToken();
//     config.headers.Authorization = token ? 'Bearer ' + token : '';
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // Add response interceptor
// instance.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     const { response } = error;
//     const { data } = response ?? {};
//     return Promise.reject(data);
//   },
// );

export default instance;
