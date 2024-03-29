import { Avatar, Button, Divider, Layout, Flex, Card, Statistic, Col, Space, Dropdown } from 'antd';
import './MainLayout.less';
import { DownOutlined, GithubOutlined, LikeOutlined } from '@ant-design/icons';


const { Header, Footer, Content, Sider } = Layout;

interface IMainLayout {
    onAbousUsClick?: () => void
    onPricesClick?: () => void
    onKaifiniClick?: () => void
    children: React.ReactElement | React.ReactElement[]
}


const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const waveStyle = {
    background: `url("${process.env.PUBLIC_URL}/wave10.png")`
}

export function MainLayout({
    children,
    onAbousUsClick,
    onKaifiniClick,
    onPricesClick
}: IMainLayout) {
    const menuItems = [
        <a>Главная</a>,
        <a onClick={onPricesClick}>Цены</a>,
        <a onClick={onAbousUsClick}>О Нас</a>,
        <a onClick={onKaifiniClick}>Кайфини</a>,
    ]

    const renderMenuButtons = () => {
        if (window.innerWidth <= 580) {
            const items = menuItems.map(
                (element, index) => ({
                    label: element,
                    key: index.toString()
                })
            )

            return (
                <Dropdown menu={{ items }}>
                    <a>
                        <Space>
                        Меню
                        <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            )
        }

        return (
            menuItems.map(element => element)
        )
    }

    return (
        <Layout className='MainLayout'>
            <Layout className='with-background' style={{
                background: `url('${process.env.PUBLIC_URL}/MainLayout/image.png')`,
                backgroundSize: 'cover',
            }}>
                <Header className='header'>
                    <div className='page-logo'>
                        <Avatar>C</Avatar>
                        <h3>CENTEK</h3>
                    </div>

                    <div className='menu-buttons'>
                        {renderMenuButtons()}
                    </div>
                </Header>

                <Content className='content'>
                    <div className='content-heading'>
                        <div className='content-bio center'>
                            <h2>Centek - бесплатные консультации от врачей.</h2>
                            <p>Бесплатные консультации от проверенных врачей с реальными отзывами.</p>

                            <Button>
                                Начать консультацию
                            </Button>
                        </div>
                    </div>
                </Content>
            </Layout>

            <Content className='main-content'>
                <Flex gap={75} justify='center' wrap='wrap'>
                    <Card className='statistic' cover={
                        <img src='https://ideogram.ai/api/images/direct/yO8qLu9oSJ2odkCzeF8U9w.png' width={300} height={300}/>
                    }>
                       <Col span={12}>
                            <Statistic title="Всего консультаций" value={1488} prefix={<LikeOutlined />} />
                        </Col>
                    </Card>

                    <Card className='statistic' cover={
                        <img src='https://ideogram.ai/api/images/direct/I7-73PJ1QVaZnm4oiTYYtA.png' width={300} height={300}/>
                    }>
                       <Col span={12}>
                            <Statistic title="Довольных клиентов" value={228} prefix={<LikeOutlined />} />
                        </Col>
                    </Card>

                    <Card className='statistic' cover={
                        <img src='https://ideogram.ai/api/images/direct/30wnd2stQl6VAydkGVGScw.png' width={300} height={300}/>
                    }>
                       <Col span={12}>
                            <Statistic title="Кол-во врачей" value={1} prefix={<LikeOutlined />} />
                        </Col>
                    </Card>

                    <Card className='statistic' cover={
                        <img src='https://ideogram.ai/api/images/direct/-G1JW7pJQa-be1fCp3VpEA.png' width={300} height={300}/>
                    }>
                       <Col span={12}>
                            <Statistic title="Кол-во клиентов" value={44444} prefix={<LikeOutlined />} />
                        </Col>
                    </Card>
                </Flex>
                
                <Divider className='divider' />
                
                <div className='content-wrapper'>
                    {children}
                </div>
            </Content>

            <Footer className="footer">
                <div className="waves">
                    <div className="wave" id="wave1" style={waveStyle}></div>
                    <div className="wave" id="wave2" style={waveStyle}></div>
                    <div className="wave" id="wave3" style={waveStyle}></div>
                    <div className="wave" id="wave4" style={waveStyle}></div>
                </div>

                <ul className="social-icon">
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <GithubOutlined />
                        </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <GithubOutlined />
                        </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <GithubOutlined />
                        </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <GithubOutlined />
                        </a></li>
                </ul>

                <ul className="menu">
                    <li className="menu__item"><a className="menu__link" href="#">Главная</a></li>
                    <li className="menu__item"><a className="menu__link" onClick={onAbousUsClick}>О Нас</a></li>
                    <li className="menu__item"><a className="menu__link" onClick={onPricesClick}>Цены</a></li>
                    <li className="menu__item"><a className="menu__link" onClick={onKaifiniClick}>Кайфини</a></li>
                </ul>
                <p>&copy;{new Date().getFullYear()} Stroev Inc | Все права защищены</p>
            </Footer>
        </Layout>
    )
}

