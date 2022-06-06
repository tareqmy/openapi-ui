import React, {useEffect, useState} from 'react';

import SwaggerClient from 'swagger-client';
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import LoadingSuspense from "../../components/common/LoadingSuspense";
import {ServiceList} from "../../helpers/ServerList";
import {useNavigate, useParams} from "react-router-dom";
import {authorizationHeader} from "../../helpers/Utils";
import {PageHeader, Result} from "antd";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../helpers/Constant";
import AuthService from "../../services/AuthService";
import privateAPI from "../../rest_handlers/privateAPI";

const CustomSwaggerUI = () => {

    const navigate = useNavigate();
    const params = useParams();
    const [spec, setSpec] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentReq, setCurrentReq] = useState(null);

    useEffect(() => {

        const callAPI = async () => {

            setLoading(true);

            try {

                const res = await privateAPI.get(ServiceList[params.id].url);
                setSpec(res.data);
                setLoading(false);

            } catch (err) {
                setLoading(false);
                console.error(err);
            }

        }

        callAPI();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        loading ? <LoadingSuspense height="100vh"/> :
            <>
                <PageHeader
                    style={{border: '1px solid rgb(235, 237, 240)'}}
                    onBack={() => navigate(-1)}
                    title="Swagger UI"
                />
                {
                    spec ? <SwaggerUI
                        requestInterceptor={req => {

                            if (!req.headers.Authorization) {
                                req.headers = {...req.headers, ...authorizationHeader()};
                            }

                            setCurrentReq(req);

                            return req;
                        }}
                        responseInterceptor={async res => {

                            if (res.status !== 401) {
                                setCurrentReq(null);
                            } else {

                                try {

                                    const _refreshToken = localStorage.getItem(REFRESH_TOKEN);

                                    if (!_refreshToken) {
                                        // logout();
                                        return res;
                                    }

                                    const refreshResponse = await AuthService.refreshToken(_refreshToken);

                                    if (!refreshResponse) {
                                        // logout();
                                        return res;
                                    }

                                    const accessToken = refreshResponse.value;

                                    localStorage.setItem(ACCESS_TOKEN, accessToken);
                                    localStorage.setItem(REFRESH_TOKEN, refreshResponse.refreshToken.value);

                                    let _currentReq = currentReq;
                                    delete _currentReq.responseInterceptor;
                                    _currentReq = {
                                        ..._currentReq,
                                        headers: {..._currentReq.headers, Authorization: `Bearer ${accessToken}`}
                                    }

                                    const nRes = await SwaggerClient.http(_currentReq);

                                    setCurrentReq(null);
                                    return nRes;
                                } catch (e) {
                                    setCurrentReq(null);

                                    // if (res.status === 401) {
                                    //     logout();
                                    // }

                                    return e.response;
                                }
                            }

                            return res;
                        }}
                        spec={spec}
                    /> : <Result
                        status="warning"
                        title="Swagger spec not found for this service, please try again."
                    />
                }
            </>
    )
}

export default CustomSwaggerUI;
