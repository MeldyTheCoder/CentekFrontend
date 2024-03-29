import { Avatar, Layout } from "antd";
import { useEffect, useState } from "react";
import './AuthLayout.less';


const { Header, Footer, Content } = Layout;

interface IAuthLayout {
    children: React.ReactElement | React.ReactElement[]
}

export function AuthLayout({children}: IAuthLayout) {
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        setShow(true)
    }, [])

    return (
        <Layout className="AuthLayout">
            <Header className="header">
                <div className="page-logo">
                    <Avatar>C</Avatar>
                    <h3>CENTEK</h3>
                </div>
            </Header>

            <Content className="content">
                <div className={`content-wrapper ${!!show && 'show'}`}>
                    {children}
                </div>
            </Content>

            <Footer className="footer">

            </Footer>
        </Layout>
    )
}