import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../Layouts/AuthLayout/AuthLayout";
import { Result, Button } from 'antd';


export function EmailConfirmation() {
    const navigate = useNavigate();

    const handleLoginButtonClick = () => {
        navigate('/login/');
    };

    return (
        <AuthLayout>
            <Result
                status="success"
                title="Успешная регистрация!"
                subTitle="На Вашу почту было отправлено письмо с ссылкой на подтверждение аккаунта."
                extra={[
                    <Button type="primary" key="console" onClick={handleLoginButtonClick}>
                        Войти
                    </Button>
                ]}
            />
        </AuthLayout>
    )
}