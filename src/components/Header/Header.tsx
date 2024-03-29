import { Avatar, Layout, Input, Button } from 'antd';
import './Header.less';
import { useNavigate } from 'react-router-dom';

interface IPageHeader {
    onProfileClick?: () => any;
    onSearch?: (searchString: string) => any;
}

export function PageHeader({onSearch, onProfileClick}: IPageHeader) {
    const navigate = useNavigate();

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

    return (
        <Layout.Header className='PageHeader'>
            <div className='page-logo'>
                <Avatar>S</Avatar>
                <h3>CENTEK</h3>
            </div>

            <Input.Search 
                placeholder='Поиск' 
                className='search-bar' 
                autoComplete='off' 
                onSearch={handleSearch}
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