import { Avatar, Layout, Input, Button, Tabs, Menu, MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';


import './Header.less';

interface IPageHeader {
    onProfileClick?: () => any;
    onSearch?: (searchString: string) => any;
}


export function PageHeader({onSearch, onProfileClick}: IPageHeader) {
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = useAuth();

    const routes = {
        "1": '/doctors',
        "2": '/patients',
        "3": '/visits',
        "4": '/meetings',
        "5": '/hospitalization',
        "6": '/patients/new',
    }

    const getCurrentActiveKey = () => {
       const path = location.pathname;

        for (const [key, routePath] of Object.entries(routes)) {
            if (path.startsWith(routePath)) {
                return key;
            }
        }   

        return 0
    }

    const handleMenuChange: MenuProps['onClick'] = ({key}) => {
        // @ts-ignore
        return navigate(routes[key]);

    }

    const menuItems = [
        {
            label: 'Врачи',
            key: '1',
            children: '',
        },
        {
            label: 'Пациенты',
            key: '200',
            children: [
                {
                    label: 'Регистрация пациента',
                    key: '6',
                    children: '',
                },
                {
                    label: 'Список пациентов',
                    key: '2',
                    children: '',
                }
            ],
        },
        {
            label: 'Запись',
            key: '3',
            children: '',
        },
        {
            label: 'Мероприятия',
            key: '4',
            children: '',
        },
        {
            label: 'Госпитализации',
            key: '5',
            children: '',
        },
    ]

    const handleProfileClick = () => {
        if (!!onProfileClick) {
            return onProfileClick();
        }

        navigate('/profile/');
    };

    const handleSearch = (value: string) => {
        if (!!onSearch) {
            return onSearch(value);
        }

        navigate(`/search/?q=${value}`);
    };

    const activeKey = getCurrentActiveKey();

    return (
        <Layout.Header className='PageHeader'>
            <div className='page-logo'>
                <Avatar>S</Avatar>
                <h3>CENTEK</h3>
            </div>

            <Menu
                mode='horizontal'
                className='header-tabs'
                activeKey={`${activeKey}`}
                items={menuItems}
                onClick={handleMenuChange}
            />

            <Input.Search 
                placeholder='Поиск' 
                className='search-bar' 
                autoComplete='off' 
                onSearch={handleSearch}
                allowClear
            />

            <div className='profile-button'>
                <Avatar 
                    size={60}
                    src={`http://localhost:8080/${user?.photo}`}
                    onClick={handleProfileClick}
                >
                    {user?.first_name.at(0)}
                </Avatar>
            </div>
        </Layout.Header>
    )
}