import React, {useContext} from "react";

import {AuthContext} from "../contexts/AuthContextProvider";
import privateAPI from "./privateAPI";
import {authorizationHeader} from "../helpers/Utils";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../helpers/Constant";
import AuthService from "../services/AuthService";

const Interceptors = () => {

    const authContext = useContext(AuthContext);

    privateAPI.interceptors.request.use(
        (config) => {

            if (!config.headers.Authorization) {
                config.headers = {...config.headers, ...authorizationHeader()};
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    privateAPI.interceptors.response.use(
        (res) => {
            return res;
        }, // If valid response
        async (err) => {

            const originalConfig = err.config;

            if (err.response) {

                // Access Token was expired

                if (err.response.status === 401 && !originalConfig._retry) {

                    originalConfig._retry = true;

                    const _refreshToken = localStorage.getItem(REFRESH_TOKEN);

                    if (!_refreshToken) {
                        authContext.logout();
                        return Promise.reject(err);
                    }

                    const refreshResponse = await AuthService.refreshToken(_refreshToken);

                    if (!refreshResponse) {
                        authContext.logout();
                        return Promise.reject(err);
                    }

                    const {value, refreshToken} = refreshResponse;

                    localStorage.setItem(ACCESS_TOKEN, value);
                    localStorage.setItem(REFRESH_TOKEN, refreshToken.value);

                    // Make sure remove authorization
                    // Because it is automatically inject by ``interceptors.request``
                    delete originalConfig.headers.Authorization;

                    return privateAPI(originalConfig);

                }

                // Do something with response error
                if (err.response.status === 401 && originalConfig._retry) {
                    authContext.logout();
                }

            }

            return Promise.reject(err);
        }
    );

    return (<></>);
}

export default Interceptors;