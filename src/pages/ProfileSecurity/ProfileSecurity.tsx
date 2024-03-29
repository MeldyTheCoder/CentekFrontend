import { ProfileLayout } from "../Layouts/ProfileLayout/ProfileLayout";
import { Divider, Statistic, Col, Input, Button } from "antd";
import { MailOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import './ProfileSecurity.less';
import { useState } from "react";

const user = {
    email: 'cool.groshelev@mail.ru',
    first_name: 'Кирилл',
    last_name: 'Грошелев',
    date_joined: new Date('2024-03-24')
}

export function ProfileSecurity() {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const handleFirstNameChange = ({target}: any) => {
        setFirstName(target.value);
    }

    const handleLastNameChange = ({target}: any) => {
        setLastName(target.value);
    }

    const handleEmailChange = ({target}: any) => {
        setEmail(target.value);
    }

    const emailChangeDisabled = (): boolean => {
        const dateDiff = new Date().getUTCDay() - user.date_joined.getUTCDay()

        return (dateDiff < (1 * 3));
    }

    const emailChangeDisabledValue = emailChangeDisabled()

    return (
        <ProfileLayout selectedTab='security'>
            <div className="ProfileEmail">
                <div className="page-heading">
                    <h3>Редактор профиля</h3>
                    <p>На данной странице Вы можете сменить свою почту, а так же свои личные данные. </p>
                </div>

                <Divider>Эл. почта</Divider>

                <div className="page-controls email">
                    <Col sm={6}>
                        <Input.Search
                            className="input"
                            defaultValue={user.email}
                            value={email}
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
                            defaultValue={user.first_name}
                            value={firstName}
                            onChange={handleFirstNameChange}
                            disabled={emailChangeDisabledValue}
                            prefix={
                                <ProfileOutlined className="site-form-item-icon" />
                            } 
                            placeholder="Имя" 
                        />
                    </Col>

                    <Col sm={6}>
                        <Input
                            className="input"
                            defaultValue={user.last_name}
                            value={lastName}
                            onChange={handleLastNameChange}
                            disabled={emailChangeDisabledValue}
                            prefix={
                                <ProfileOutlined className="site-form-item-icon" />
                            } 
                            placeholder="Фамилия" 
                        />
                    </Col>

                    <Button type="primary" disabled={!firstName}>Сменить</Button>
                </div>
            </div>
        </ProfileLayout>
    )
}