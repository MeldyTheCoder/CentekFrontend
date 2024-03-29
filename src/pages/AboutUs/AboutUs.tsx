import { MainLayout } from "../Layouts/MainLayout/MainLayout";
import './AboutUs.less';

export function AboutUs() {
    return (
        <MainLayout>
            <div className="about-us-content with-background">
                <div className="text-card">
                    <h1>О Нас</h1>
                    <p>Мы честно наебываем людей за бесплатно.</p>
                </div>

                <div className="text-image">
                    <img src={`${process.env.PUBLIC_URL}/MainLayout/image.png`} />
                </div>
            </div>
        </MainLayout>
    )
}