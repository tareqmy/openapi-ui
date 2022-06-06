import React, {lazy, Suspense, useContext} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoadingSuspense from './components/common/LoadingSuspense';
import {LOGIN_PATH} from './routes/Slugs';
import PrivateRoute from './components/common/PrivateRoute';
import {AuthContext} from './contexts/AuthContextProvider';
import Interceptors from "./rest_handlers/Interceptors";

const DefaultLayout = lazy(() => import('./components/DefaultLayout'));
const Login = lazy(() => import('./pages/login/Login'));

const App = () => {

    const authContext = useContext(AuthContext);

    return (
        <div className="app-wrapper">
            <Suspense fallback={<LoadingSuspense/>}>
                <BrowserRouter>
                    <Routes>
                        <Route path={LOGIN_PATH} element={<Login/>}/>
                        <Route element={<PrivateRoute isLogin={authContext.isLogin}/>}>
                            <Route path="*" element={<DefaultLayout/>}/>
                        </Route>
                    </Routes>
                    <Interceptors/>
                </BrowserRouter>
            </Suspense>
        </div>
    );

}

export default App;
