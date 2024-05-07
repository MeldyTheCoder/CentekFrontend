import { Avatar, Layout, Input, Button, Tabs } from 'antd';
import './Header.less';
import { useNavigate, useLocation } from 'react-router-dom';

interface IPageHeader {
    onProfileClick?: () => any;
    onSearch?: (searchString: string) => any;
}


export function PageHeader({onSearch, onProfileClick}: IPageHeader) {
    const navigate = useNavigate();
    const location = useLocation();

    const getCurrentActiveKey = () => {
        switch (location.pathname) {
            case '/doctors/':
                return 1

            case '/pacients/':
                return 2

            case '/meetings/':
                return 3

            case '/hospitalization/':
                return 4

            default:
                return 0
        }
    }

    const handleTabChange = (tab: string) => {
        switch (tab) {
            case "1":
                return navigate('/doctors/')

            case "2":
                return navigate('/pacients/')

            case "3":
                return navigate('/meetings/')
            
            case "4":
                return navigate('/hospitalization/')
        }
    }

    const tabItems = [
        {
            label: 'Врачи',
            key: '1',
            children: '',
        },
        {
            label: 'Пациенты',
            key: '2',
            children: '',
        },
        {
            label: 'Мероприятия',
            key: '3',
            children: '',
        },
        {
            label: 'Госпитализации',
            key: '4',
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

            <Tabs
                className='header-tabs'
                activeKey={`${activeKey}`}
                items={tabItems}
                onChange={handleTabChange}
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
                    size={40} 
                    onClick={handleProfileClick}
                >
                    S
                </Avatar>
            </div>
        </Layout.Header>
    )
}