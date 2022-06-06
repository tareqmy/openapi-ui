// import axios from "axios";
// import {ACCESS_TOKEN, REFRESH_TOKEN} from "../helpers/Constant";
// import AuthService from "../services/AuthService";
// import {authorizationHeader} from "../helpers/Utils";
//
// const instance = axios.create({
//     baseURL: "",
//     headers: {
//         "Content-Type": "application/json",
//     },
// });
//
// instance.interceptors.request.use(
//     (config) => {
//
//         if (!config.headers.Authorization) {
//             config.headers = {...config.headers, ...authorizationHeader()};
//         }
//
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );
//
// instance.interceptors.response.use(
//     (res) => {
//         return res;
//     }, // If valid response
//     async (err) => {
//
//         const originalConfig = err.config;
//
//         if (err.response) {
//
//             // Access Token was expired
//
//             if (err.response.status === 401 && !originalConfig._retry) {
//
//                 originalConfig._retry = true;
//
//                 const _refreshToken = localStorage.getItem(REFRESH_TOKEN);
//
//                 if (!_refreshToken) {
//                     return Promise.reject(err);
//                 }
//
//                 const refreshResponse = await AuthService.refreshToken(_refreshToken);
//
//                 if (!refreshResponse) {
//                     return Promise.reject(err);
//                 }
//
//                 const {value, refreshToken} = refreshResponse;
//
//                 localStorage.setItem(ACCESS_TOKEN, value);
//                 localStorage.setItem(REFRESH_TOKEN, refreshToken.value);
//
//                 return instance(originalConfig);
//
//             }
//
//         }
//
//         return Promise.reject(err);
//     }
// );
//
// export default instance;