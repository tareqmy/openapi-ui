import React, {createContext, useState} from 'react';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../helpers/Constant';
import AuthService from "../services/AuthService";
import {Toast} from "../components/common/Toast";
import {getErrorMessage} from "../helpers/Utils";

export const AuthContext = createContext("AuthContext");

const auth = localStorage.getItem(ACCESS_TOKEN);

const AuthContextProvider = ({children}) => {

    const [isLogin, setIsLogin] = useState(!!auth);
    const [loading, setLoading] = useState(false);

    const login = async (credential) => {

        try {
            setLoading(true);
            const response = await AuthService.login(credential);

            localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token);

            setIsLogin(true);
            setLoading(false);
        } catch (error) {
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
            setLoading(false);
            setIsLogin(false);
        }

    }

    const logout = () => {
        setIsLogin(false);
        localStorage.clear();
    }

    return (
        <AuthContext.Provider
            value={{
                isLogin,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;