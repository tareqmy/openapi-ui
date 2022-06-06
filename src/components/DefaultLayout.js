import React, {Suspense, useContext} from 'react';
import {Button, Layout} from 'antd';
import {Navigate, Route, Routes} from 'react-router-dom';
import PageRoutes from "../routes/PageRoutes";
import {DASHBOARD_PATH, ROOT_PATH} from "../routes/Slugs";
import LoadingSuspense from "./common/LoadingSuspense";
import {AuthContext} from "../contexts/AuthContextProvider";

const {Content, Header} = Layout;

const DefaultLayout = () => {

    const {logout} = useContext(AuthContext);

    return (
        <Layout style={{background: 'transparent'}}>
            <Header style={{position: 'fixed', zIndex: 1, width: '100%', color: "#ffffff"}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <b>Spring cloud examples</b> <sub>OpenAPI 3.0</sub>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Button
                            type="danger"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </Header>
            <Content style={{margin: '64px auto 0 auto', width: "90%", maxWidth: "1366px", padding: '30px'}}>
                <Suspense fallback={<LoadingSuspense/>}>
                    <Routes>
                        {
                            PageRoutes.map(route => {
                                return <Route
                                    key={route.path}
                                    path={route.path}
                                    element={<route.component/>}
                                />
                            })
                        }
                        <Route path={ROOT_PATH} element={<Navigate to={DASHBOARD_PATH}/>}/>
                        <Route path="*" element={<Navigate to={DASHBOARD_PATH}/>}/>
                    </Routes>
                </Suspense>
            </Content>
        </Layout>
    );
}

export default DefaultLayout;