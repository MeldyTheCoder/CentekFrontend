import { useState, useEffect } from "react";
import { Layout } from "antd";
import { PageHeader } from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import './AuthorizedLayout.less';
import { StringDecoder } from "string_decoder";


interface IAuthorizedLayout {
    children: React.ReactElement | React.ReactElement[];
    siderContent?: React.ReactElement | React.ReactElement[];
    onSearch?: (value: string) => any | void;
}

export function AuthorizedLayout({children, siderContent, onSearch}: IAuthorizedLayout) {
    const navigate = useNavigate();
    
    const handleSearch = (value: string) => {
        !!onSearch && onSearch?.(value);
    };

    const handleProfileClick = () => {
        navigate('/profile/');
    };

    return (
        <Layout className="AuthorizedLayout">
            <PageHeader onSearch={handleSearch} onProfileClick={handleProfileClick}/>

            <Layout className="content-skeleton">
                {!!siderContent && 
                    <Layout.Sider className="sider">
                        {siderContent}
                    </Layout.Sider>
                }
                <Layout.Content className="content">
                    <div className="content-wrapper">
                        {children}
                    </div>
                </Layout.Content>
            </Layout>

            <Layout.Footer className="footer">

            </Layout.Footer>
        </Layout>
    )
}