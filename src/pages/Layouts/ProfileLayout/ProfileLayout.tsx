import { Avatar, Button, Menu, Layout, MenuProps, Tag, Segmented } from 'antd';
import { TUser, UserRoles } from '../../../Types';
import './ProfileLayout.less';
import { AppstoreOutlined, BarChartOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { PageHeader } from '../../../components/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../providers/AuthProvider';
import { useEffect } from 'react';

const { Sider, Header, Footer, Content } = Layout; 

interface IProfileLayout {
    children?: React.ReactElement | React.ReactElement[]
    selectedTab?: string;
    userLoggedIn: TUser;
    onProfileClick?: () => any;
    onSearch?: (value: string) => any;
    onTabChange?: (value: string) => any;
}

const userRoleTags = {
    1: {
        children: 'доктор',
        color: 'cyan',
    },

    2: {
        children: 'администратор',
        color: 'volcano',
    },

    3: {
        children: 'пользователь',
        color: 'blue',
    }
}


export function ProfileLayout({
    children, 
    selectedTab, 
    onTabChange, 
    onSearch, 
    onProfileClick, 
    userLoggedIn
}: IProfileLayout) {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
       logout().then(
        () => navigate('/login/')
       );
    }

    useEffect(() => {
        console.log(userLoggedIn);
    }, [userLoggedIn])

    if (!userLoggedIn) {
        return null
    }

    return (
        <Layout className='ProfileLayout'>
            <PageHeader onSearch={onSearch} onProfileClick={onProfileClick} />
            
            <Content className='content-container'>
                <div className='user-section'>
                    <div className='user-info'>
                        <div className='user-avatar'>
                            <Avatar size={100}>S</Avatar>
                            <div className='user-name'>
                                <h3>{`${userLoggedIn.first_name} ${userLoggedIn.last_name!}`}</h3>
                                <div className='user-badges'>
                                    <Tag {...userRoleTags[userLoggedIn.role || 3]} />
                                </div>
                            </div>
                        </div>

                        <Button danger type='link' onClick={handleLogout}>Выйти</Button>
                    </div>
                </div>

                <div className='content-section'>
                    <Segmented
                        defaultValue='editor'
                        value={selectedTab}
                        onChange={onTabChange}
                        options={[
                            { label: 'Редактор профиля', value: 'editor', icon: <AppstoreOutlined /> },
                            { label: 'Безопасность', value: 'security', icon: <SettingOutlined /> },
                            { label: 'Статистика', value: 'statistic', icon: <BarChartOutlined /> },
                        ]}
                    />

                    <div className='content-wrapper'>
                        {children}
                    </div>
                </div>
            </Content>

        </Layout>
    )
}