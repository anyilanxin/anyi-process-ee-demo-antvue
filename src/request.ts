import axios from 'axios';
// create an axios instance
const request = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 5000,
});
// 错误处理
const err = (error: any) => {
  console.log('-----error-------', error);
  return Promise.reject(error);
};
// request interceptor
request.interceptors.request.use(
  (config: any) => {
    config.headers['Authorization'] =
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYXV0aC1zZXJ2aWNlIiwic3lzdGVtLXNlcnZpY2UiLCJwcm9jZXNzLXNlcnZpY2UiXSwiZW5kcG9pbnQiOiJkZWZhdWx0X2VuZHBvaW50IiwidXNlcl9uYW1lIjoiYWRtaW4iLCJzY29wZSI6WyJ3ZWIiXSwicXVlcnlfa2V5IjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNjU2NTUyOTIwLCJqdGkiOiI5ZDI3OTA2Zi1jODU2LTQ2OWUtYjEwNS1lYWJjZjQyYWIzMjAiLCJjbGllbnRfaWQiOiJza2lsbGZ1bGwifQ.MEc4SyGA7rmp_6o4CXw71_oXZr-76E_yJBmayasvGCt5yEJLKYBt0zgGlQXswQ2XG9hc_MSHsdsfsEzaWs_m6RmQRov-tFCIjLNa3kaegsFyHYtY7SkmR5ClljJ_JJZFzCaQfVUwj1RI3w1PD56eajVABGULbsXgVaduQI0aa4AdWPRtiiemBq8pWJaZoEzYWuFKWCuROhVcW8NJRSV9iCZkyCyISAi6iCTHApr-2_x-pW8boy9IK7bDQvOGGNxBze-e79bongUfzt2UG-G4kV7fQndhmDnf54a45hPNI1lBw1jOovl4_ExHe5q9eFbMUrIIBkSKrN9ApBFBU0yxFg';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use((response) => {
  const res = response.data;
  console.log('------res---------', res);
  return response;
}, err);
export default request;
