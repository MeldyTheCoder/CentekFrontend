import { useState } from "react";
import { AuthLayout } from "../Layouts/AuthLayout/AuthLayout";
import { Form, Input, Checkbox, Button, Divider } from "antd";
import { LockOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import { RegistrationModel, TRegistrationModel } from "../../Types";

import './Registration.less';
import { useNavigate } from "react-router-dom";

export function Registration() {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate()

    const handleFormSubmit = (data: TRegistrationModel) => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            navigate('/email-verification/')
        }, 2000)
    }

    const handleNavigateLogin = () => {
        navigate('/login/')
    }

    const errorClass = (value?: any, error?: string, touched?: boolean) => {
        if (!value && !touched) {
            return undefined;
        } else if (!!error) {
            return 'error';
        } else if (!!value) {
            return 'success';
        }

        return undefined;
    }
    
    return (
        <AuthLayout>
            <div className="form-bio">
                <h1>Регистрация</h1>
                <p>Страница регистрации пользователя в системе.</p>
            </div>

            <Formik
                validationSchema={RegistrationModel}
                initialValues={{
                    email: '',
                    password: '',
                    password_repeat: '',
                    first_name: '',
                    last_name: ''
                }}
                onSubmit={handleFormSubmit}
            >
               {({errors, touched, values, handleChange, handleSubmit}) => (
                    <Form
                        name="normal_login"
                        className="registration-form"
                        onFinish={handleSubmit}
                        noValidate
                    >
                        <Form.Item 
                            validateStatus={errorClass(values.email, errors.email, touched.email)}
                            hasFeedback
                            help={errors.email}
                        >
                            <Input 
                                prefix={<UserOutlined className="site-form-item-icon" />} 
                                placeholder="Эл. почта"
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                        </Form.Item>

                        <Form.Item 
                            validateStatus={errorClass(values.first_name, errors.first_name, touched.first_name)}
                            hasFeedback
                            help={(!!values.first_name && !!touched.first_name) && errors.first_name}
                        >
                            <Input 
                                prefix={<ProfileOutlined className="site-form-item-icon" />} 
                                placeholder="Имя"
                                name="first_name"
                                value={values.first_name}
                                onChange={handleChange}
                            />
                        </Form.Item>

                        <Form.Item 
                            validateStatus={errorClass(values.last_name, errors.last_name, touched.last_name)}
                            hasFeedback
                            help={(!!values.last_name && !!touched.last_name) && errors.last_name}
                        >
                            <Input 
                                prefix={<ProfileOutlined className="site-form-item-icon" />} 
                                placeholder="Фамилия"
                                name="last_name"
                                value={values.last_name}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        
                        <Form.Item 
                            validateStatus={errorClass(values.password, errors.password, touched.password)}
                            help={(!!values.password && !!touched.password) && errors.password}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                value={values.password}
                                onChange={handleChange}
                            />
                        </Form.Item>

                        <Form.Item 
                            validateStatus={errorClass(values.password_repeat, errors.password_repeat, touched.password_repeat)}
                            help={(!!values.password_repeat && !!touched.password_repeat) && errors.password_repeat}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                name="password_repeat"
                                placeholder="Повтор пароля"
                                value={values.password_repeat}
                                onChange={handleChange}
                            />
                        </Form.Item>

                        <Form.Item className="form-buttons">
                            <Button block type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                                Зарегистрироваться
                            </Button>
                            
                            <Divider>или</Divider>

                            <Button block type="default" className="login-form-button" onClick={handleNavigateLogin}>
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
               )}
            </Formik>
            
        </AuthLayout>
    )
}