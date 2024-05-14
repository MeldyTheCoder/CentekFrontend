import { Avatar, Button, Menu, Layout, MenuProps, Tag, Segmented, TagProps } from 'antd';
import { TUser, UserRoles } from '../../../Types';
import './ProfileLayout.less';
import { AppstoreOutlined, BarChartOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { PageHeader } from '../../../components/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../providers/AuthProvider';
import { UploadAvatar } from '../../../components/UploadAvatar/UploadAvatar';

const { Sider, Header, Footer, Content } = Layout; 

interface IProfileLayout {
    children?: React.ReactElement | React.ReactElement[]
    selectedTab?: string;
    userLoggedIn: TUser;
    onProfileClick?: () => any;
    onSearch?: (value: string) => any;
    onTabChange?: (value: string) => any;
}

const userRoleTag = ({
    children: 'доктор',
    color: 'cyan'
})

export function ProfileLayout({
    children, 
    selectedTab, 
    onTabChange, 
    onSearch, 
    onProfileClick,
}: IProfileLayout) {
    const navigate = useNavigate();
    const { signOut, isAuthenticated, user } = useAuth();

    const handleLogout = () => {
       signOut()
       navigate('/login/')
    }

    if (!isAuthenticated || !user) {
        return null
    }

    return (
        <Layout className='ProfileLayout'>
            <PageHeader onSearch={onSearch} onProfileClick={onProfileClick} />
            
            <Content className='content-container'>
                <div className='user-section'>
                    <div className='user-info'>
                        <div className='user-avatar'>
                            <UploadAvatar
                                size={100}
                                src={`http://localhost:8080/${user?.photo}`}
                            >
                                    {user.first_name.at(0)}
                            </UploadAvatar>

                            <div className='user-name'>
                                <h3>{user.first_name} {user.last_name} {user.surname!}</h3>
                                <div className='user-badges'>
                                    <Tag {...userRoleTag} />
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