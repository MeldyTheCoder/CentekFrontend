import { useEffect, useState } from "react";
import { AuthLayout } from "../Layouts/AuthLayout/AuthLayout";
import { Form, Input, Checkbox, Button, Divider, App } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import { LoginModel, TLoginModel, TUser } from "../../Types";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import './Login.less';
import { AxiosError } from "axios";

export function Login() {
    const [loading, setLoading] = useState<boolean>(false);
    const { signIn, isAuthenticated, authorize } = useAuth();
    const { notification } = App.useApp();
    const navigate = useNavigate();

    const handleAuthCredentialsError = () => {
        notification.error({
            message: 'Ошибка авторизации',
            description: 'Неверный логин или пароль.',
            placement: 'top',
            duration: 5
        })
    }

    const handleAuthUnknownError = () => {
        notification.error({
            message: 'Ошибка авторизации',
            description: 'Повторите попытку позднее.',
            placement: 'top',
            duration: 5
        })
    }

    const handleSubmit = (data: TLoginModel) => {
        setLoading(true);

        console.log(data);

        setTimeout(() => {
            authorize(data)
                .then(
                    ({authToken, userData}) => {
                        console.log('authToken: ', authToken);
                        
                        setLoading(false);
                        if (!!signIn(authToken, userData)) {
                            return navigate('/profile/', {replace: true})
                        }

                        return handleAuthUnknownError();
                    }
                )
                .catch(
                    (error: AxiosError) => {
                        console.log('Error: ', error);

                        setLoading(false);

                        if (error.response?.status === 400) {
                            return handleAuthCredentialsError();
                        }
                        
                        console.log(error);
                        handleAuthUnknownError()
                    }
                )
        }, 2000)
    }

    const handleNavigateRegistration = () => {
        navigate('/registration/')
    }

    const errorClass = (value?: any, error?: string) => {
        if (!!error) {
            return 'error';
        } else if (!!value) {
            return 'success';
        }

        return undefined;
    }

    return (
        <AuthLayout>
            <div className="form-bio">
                <h1>Вход</h1>
                <p>Страница авторизации пользователя в систему.</p>
            </div>

            <Formik
                validationSchema={LoginModel}
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={handleSubmit}
            >
               {({errors, touched, values, handleChange, handleSubmit}) => (
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={handleSubmit}
                        noValidate
                    >
                        <Form.Item 
                            validateStatus={errorClass(values.username, errors.username)}
                            hasFeedback
                            help={errors.username}
                        >
                            <Input 
                                prefix={<UserOutlined className="site-form-item-icon" />} 
                                placeholder="Имя пользователя"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        
                        <Form.Item validateStatus={errorClass(values.password, errors.password)}>
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                value={values.password}
                                onChange={handleChange}
                            />
                        </Form.Item>

                        <Form.Item>
                            <div className="form-space">
                                <a className="login-form-forgot" href="">
                                    Забыли пароль?
                                </a>
                            </div>
                        </Form.Item>

                        <Form.Item className="form-buttons">
                            <Button block type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                                Войти
                            </Button>
                            
                            <Divider>или</Divider>

                            <Button block type="default" className="login-form-button" onClick={handleNavigateRegistration}>
                                Зарегистрироваться
                            </Button>
                        </Form.Item>
                    </Form>
               )}
            </Formik>
            
        </AuthLayout>
    )
}