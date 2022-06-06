import React, {useContext} from 'react';
import {Button, Form, Input} from 'antd';
import {Navigate} from 'react-router-dom';

/* SCSS */
import './login.scss';
import {ROOT_PATH} from '../../routes/Slugs';
import {AuthContext} from "../../contexts/AuthContextProvider";

const Login = () => {

    const authContext = useContext(AuthContext);

    const onFinish = values => {
        authContext.login(values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    if (authContext.isLogin) return <Navigate to={ROOT_PATH}/>

    return (
        <div className="login-wrapper">
            <Form
                layout="vertical"
                name="basic"
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="login-form"
            >
                <h4 className="login-title">Login</h4>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {required: true, message: 'Please input your username!'},
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item>
                    <Button
                        className="login-form-button"
                        type="primary"
                        htmlType="submit"
                        loading={authContext.loading}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
