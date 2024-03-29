import { Layout, Menu, Breadcrumb, theme, Avatar } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { HomeOutlined, InfoOutlined } from "@ant-design/icons";
import './Layout.less';


const { Header, Content, Footer } = Layout;

interface IProjectLayout {
    children: React.ReactElement | React.ReactElement[] | string,
    hideBreadcrumbs?: boolean
}

const items: MenuItemType[] = [
    {
        key: 'main',
        label: 'Главная',
        icon: <HomeOutlined />
    },

    {
        key: 'about-us',
        label: 'О Нас',
        icon: <InfoOutlined />
    },

    {
        key: 'for-doctors',
        label: 'Для врачей',
        icon: <HomeOutlined />
    }
] 

export function ProjectLayout({
    children,
    hideBreadcrumbs
}: IProjectLayout) {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

    return (
        <Layout className="layout">
            
          <Header className="header">
            <Avatar className="logo">C</Avatar>

            <Menu
                className="header-menu"
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={items}
            />
          </Header>

          <Content className="content">
            {!hideBreadcrumbs 
                ? ( 
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                ) : (
                    <div className="margin" />
                )
            }
            <div
                className="content-wrapper"
                style={{
                    padding: 24,
                    minHeight: 380,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
              {children}
            </div>
          </Content>

          <Footer className="footer">
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>

        </Layout>
      );
};