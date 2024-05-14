import { ProfileLayout } from "../Layouts/ProfileLayout/ProfileLayout";
import { Divider, Statistic, Col, Input, Button, DescriptionsProps, Descriptions, App } from "antd";
import { CheckCircleOutlined, EditOutlined, LockOutlined, MailOutlined, ProfileOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import './ProfileEditor.less';
import { useEffect, useState } from "react";
import { TUser, UserRoles } from "../../Types";
import { useAuth } from "../../providers/AuthProvider";
import { HttpMethods, fetchApi, useApiContext } from "../../providers/ApiProvider";


const userRoleString = (role: UserRoles) => {
    if (role === UserRoles.DOCTOR) {
        return 'Доктор';
    } else if (role === UserRoles.SUPERUSER) {
        return 'Администратор';
    } else {
        return 'Пользователь'
    }
}


export function ProfileEditor() {
    const { isAuthenticated, user, refreshUser } = useAuth()
    const [firstName, setFirstName] = useState<string>(user?.first_name || '');
    const [lastName, setLastName] = useState<string>(user?.last_name ||'');
    const [email, setEmail] = useState<string>('');

    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');

    const {notification} = App.useApp();

    const [selectedTab, setSelectedTab] = useState<string>('editor');

    function formatDate(date: string | Date) {
        if (!(typeof date === "string")) {
            return date?.toLocaleDateString("en-US");
        }

        return new Date(date).toLocaleDateString("en-US")
    }

    const handleFirstNameChange = ({target}: any) => {
        setFirstName(target.value);
    }

    const handleLastNameChange = ({target}: any) => {
        setLastName(target.value);
    }

    const handleEmailChange = ({target}: any) => {
        setEmail(target.value);
    }

    const handleProfileUpdateSubmit = () => {
        fetchApi<any, any>({
            url: '/users/edit',
            method: HttpMethods.POST,
            data: {
                first_name: firstName,
                last_name: lastName,
            }
        })
        .then((_: any) => {
            refreshUser();

            notification.success({
                message: 'Успешно',
                description: 'Ваш профиль был успешно обновлен!',
                duration: 5,
                placement: 'bottom',
            })
        })
        .catch((error: any) => {
            notification.error({
                message: 'Ошибка',
                description: error.response.data?.detail! || 'Произошла неизвестная ошибка.',
                duration: 5,
                placement: 'bottom',
            })
        })
    }

    const emailChangeDisabled = (): boolean => {
        let date: Date;

        if (typeof user?.date_joined === "string") {
            date = new Date(user?.date_joined);
        } else {
            date = user?.date_joined || new Date();
        }

        const dateDiff = new Date().getUTCDay() - new Date(date).getUTCDate()

        return (dateDiff < (1 * 3));
    }

    const emailChangeDisabledValue = emailChangeDisabled()

    const handleTabChange = (value: string) => {
        setSelectedTab(value);
    }

    const handleSearch = (value: string) => {
        console.log(value);
    }

    const handleOldPasswordChange = ({target}: any) => {
        setOldPassword(target?.value);
    }

    const handleNewPasswordChange = ({target}: any) => {
        setNewPassword(target?.value);
    }

    const handlePasswordChangeSubmit = () => {
        console.log('Submit');

        fetchApi<any, any>({
            url: 'users/change-password',
            method: HttpMethods.POST,
            data: {
                old_password: oldPassword,
                new_password: newPassword,
            }
        })
        .then((_: any) => {
            notification.success({
                message: 'Успешно',
                description: 'Пароль был успешно сменен!',
                duration: 5,
                placement: 'bottom',
            })

            setOldPassword('');
            setNewPassword('');
        })
        .catch((error: any) => {
            notification.error({
                message: 'Ошибка',
                description: error.response.data?.detail! || 'Произошла неизвестная ошибка.',
                duration: 5,
                placement: 'bottom',
            })
        })
    }

    const editorContent = (
        <>
            <div className="page-heading">
                <h3>Редактор профиля</h3>
                <p>На данной странице Вы можете сменить свою почту, а так же свои личные данные. </p>
            </div>

            <Divider>Эл. почта</Divider>

            <div className="page-controls email">
                <Col sm={6}>
                    <Input.Search
                        className="input"
                        defaultValue={user?.email}
                        onChange={handleEmailChange}
                        disabled={emailChangeDisabledValue}
                        prefix={
                            <MailOutlined className="site-form-item-icon" />
                        } 
                        placeholder="Новая эл. почта" 
                        enterButton={
                            <Button disabled={emailChangeDisabledValue}>Сменить</Button>
                        } 
                    />
                </Col>
            </div>
            
            <Divider>Личные данные</Divider>
            
            <div className="page-controls">
                <Col sm={6}>
                    <Input
                        className="input"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        prefix={
                            <ProfileOutlined className="site-form-item-icon" />
                        } 
                        placeholder="Имя" 
                    />
                </Col>

                <Col sm={6}>
                    <Input
                        className="input"
                        value={lastName}
                        onChange={handleLastNameChange}
                        prefix={
                            <ProfileOutlined className="site-form-item-icon" />
                        } 
                        placeholder="Фамилия" 
                    />
                </Col>

                <Button type="primary" onClick={handleProfileUpdateSubmit}>Сменить</Button>
            </div>
        </>
    )

    const securityContent = (
        <>
            <div className="page-heading">
                <h3>Безопасность</h3>
                <p>На данной странице Вы можете сменить свой пароль. </p>
            </div>
            
            <Divider />
            
            <div className="page-controls">
                <Col sm={6}>
                    <Input.Password
                        className="input"
                        autoComplete="off"
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        value={oldPassword}
                        onChange={handleOldPasswordChange}
                        placeholder="Старый пароль" 
                    />
                </Col>

                <Col sm={6}>
                    <Input.Password
                        className="input"
                        autoComplete="off"
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        } 
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        placeholder="Новый пароль" 
                    />
                </Col>

                <Button 
                    type="primary" 
                    onClick={handlePasswordChangeSubmit} 
                    disabled={!oldPassword || !newPassword}
                >
                    Сменить
                </Button>
            </div>
        </>
    )

    const statisticContent = (
        <>
            <div className="page-heading">
                <h3>Статистика</h3>
                <p>На данной странице Вы можете посмотреть статистику свой активность в консультациях. </p>
            </div>
            
            <Divider />
            
            <div className="page-controls center">
                <Col sm={6}>
                    <Statistic 
                        title='Проведено консультаций' 
                        value={123123}
                        prefix={<CheckCircleOutlined />}
                    />
                </Col>

                <Col sm={6}>
                    <Statistic 
                        title='Ваша среднаяя оценка' 
                        value={4.3} 
                        suffix=' / 5'
                        prefix={<StarOutlined />}
                    />
                </Col>

                <Col sm={6}>
                    <Statistic 
                        title='Отзывов' 
                        value={12} 
                        prefix={<EditOutlined />}
                    />
                </Col>
            </div>

            <Divider />

            <div className="page-controls center">
                <Descriptions title="" items={[
                        {
                            key: '1',
                            label: 'Дата регистрации',
                            children:formatDate(user?.date_joined!) || '-',
                        },
                        {
                            key: '2',
                            label: 'Дата последнего входа',
                            children: formatDate(user?.last_login!) || '-',
                        },
                    ]}
                />
            </div>
        </>
    )

    const renderContent = () => {
        if (selectedTab === 'editor') {
                return editorContent;
        } else if (selectedTab === 'security') {
                return securityContent;
        } else if (selectedTab === 'statistic') {
            return statisticContent;
        } else {
            return <p>Ничего не найдено!</p>
       }
    }

    return (
        <ProfileLayout selectedTab={selectedTab} onTabChange={handleTabChange} userLoggedIn={user!}>
            <div className="ProfileEmail">
                {(renderContent() as any)}
            </div>
        </ProfileLayout>
    )
}