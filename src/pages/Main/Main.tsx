import { useRef } from "react";
import { MainLayout } from "../Layouts/MainLayout/MainLayout";

import './Main.less';


const scrollOptions = {
    behavior: 'smooth',
    block: 'center'
}

export function Main() {
    const aboutUsRef = useRef<any>(null);
    const pricesRef = useRef<any>(null);
    const kaifiniRef = useRef<any>(null);

    const handleAboutUsClick = () => {
        aboutUsRef?.current?.scrollIntoView(scrollOptions)
    }

    const handlePricesClick = () => {
        pricesRef?.current?.scrollIntoView(scrollOptions)
    }

    const handleKaifiniClick = () => {
        kaifiniRef?.current?.scrollIntoView(scrollOptions)
    }

    return (
        <MainLayout onAbousUsClick={handleAboutUsClick} onKaifiniClick={handleKaifiniClick} onPricesClick={handlePricesClick}>
            <div className="page-headings">
                <div className="about-us-content" ref={aboutUsRef}>
                    <div className="text-card">
                        <h1>О Нас</h1>
                        <p>
                            Мы честно наебываем людей за бесплатно.
                            Мы честно наебываем людей за бесплатно.
                            Мы честно наебываем людей за бесплатно.
                            Мы честно наебываем людей за бесплатно.
                            Мы честно наебываем людей за бесплатно.
                            Мы честно наебываем людей за бесплатно.
                            Мы честно наебываем людей за бесплатно.
                            Мы честно наебываем людей за бесплатно.
                            Мы честно наебываем людей за бесплатно.
                            Мы честно наебываем людей за бесплатно.
                        </p>
                    </div>

                    <div className="text-image">
                        <img src={`${process.env.PUBLIC_URL}/MainLayout/image.png`} />
                    </div>
                </div>

                <div className="about-us-content" ref={pricesRef}>
                    <div className="text-image">
                        <img src={`${process.env.PUBLIC_URL}/MainLayout/image.png`} />
                    </div>

                    <div className="text-card">
                        <h1>Цены</h1>
                        <p>
                            Внимание, мы наебываем людей за бесплатно. Обращайтесь за нашей консультацией.
                            Внимание, мы наебываем людей за бесплатно. Обращайтесь за нашей консультацией.
                            Внимание, мы наебываем людей за бесплатно. Обращайтесь за нашей консультацией.
                            Внимание, мы наебываем людей за бесплатно. Обращайтесь за нашей консультацией.
                            Внимание, мы наебываем людей за бесплатно. Обращайтесь за нашей консультацией.
                            Внимание, мы наебываем людей за бесплатно. Обращайтесь за нашей консультацией.
                        </p>
                    </div>
                </div>

                <div className="about-us-content" ref={kaifiniRef}>
                    <div className="text-card">
                        <h1>Кайфини</h1>
                        <p>
                            Кайфую жиест пока шпага стоит.
                            Кайфую жиест пока шпага стоит.
                            Кайфую жиест пока шпага стоит.
                            Кайфую жиест пока шпага стоит.
                            Кайфую жиест пока шпага стоит.
                            Кайфую жиест пока шпага стоит.
                            Кайфую жиест пока шпага стоит.
                        </p>
                    </div>

                    <div className="text-image">
                        <img src={`${process.env.PUBLIC_URL}/MainLayout/image.png`} />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}