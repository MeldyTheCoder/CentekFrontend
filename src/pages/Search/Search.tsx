import { useSearchParams } from "react-router-dom";
import { AuthorizedLayout } from "../Layouts/AuthorizedLayout/AuthorizedLayout";
import { DoctorList } from "../../components/DoctorList/DoctorList";
import { Menu, MenuProps, Collapse, Slider, Checkbox, Divider, Alert } from "antd";
import { AppstoreOutlined, MailOutlined, SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { useState } from "react";

import './Search.less';

export function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchString = searchParams.get('q');

    const [selectedSpecialties, setSelectedSpecialties] = useState<number[]>([])
    const [selectedWorkExperience, setSelectedWorkExperience] = useState<number[]>([])
    const [selectedRatingRange, setSelectedRatingRange] = useState<[number, number]>([1, 5])


    const handleRatingRangeChange = (value: number[]) => {
        console.log('Rating: ', value);
        setSelectedRatingRange([value.at(0)!, value.at(1)!]);
    }

    const handleSpecialtyFilterChange = (value: any[]) => {
        console.log('Specialties: ', value);
        setSelectedSpecialties(value);
    }

    const handleWorkExperienceChange = (value: any[]) => {
        console.log('Work Experience: ', value);
        setSelectedWorkExperience(value);
    }

    const ratingFilter = (
        <>
            <Slider 
                range={{ draggableTrack: true }} 
                value={selectedRatingRange}
                onChange={handleRatingRangeChange}
                min={1} 
                max={5} 
                step={0.5}
                marks={{
                    1: 1,
                    2: 2,
                    3: 3,
                    4: 4,
                    5: 5
                }}
            />
        </>
    )

    const specialtyFilter = (
        <>
            <Checkbox.Group 
                value={selectedSpecialties} 
                onChange={handleSpecialtyFilterChange} 
                className="scrollable-group"
            >
                <Checkbox value={1}>Лор</Checkbox>
                <Checkbox value={2}>Офтальмолог</Checkbox>
                <Checkbox value={3}>Мастур Макс</Checkbox>
                <Checkbox value={4}>Костолом</Checkbox>
                <Checkbox value={5}>Проктолог</Checkbox>
                <Checkbox value={6}>Стоматолог</Checkbox>
                <Checkbox value={7}>Терапевт</Checkbox>
                <Checkbox value={8}>Космонавт</Checkbox>
                <Checkbox value={9}>Летчик</Checkbox>

            </Checkbox.Group>
        </>
    )

    const workExperienceFilter = (
        <>
            <Checkbox.Group 
                value={selectedWorkExperience} 
                onChange={handleWorkExperienceChange}
                className="scrollable-group"
            >
                <Checkbox value={1}>Менее месяца</Checkbox>
                <Checkbox value={2}>Менее года</Checkbox>
                <Checkbox value={3}>Более года</Checkbox>
                <Checkbox value={4}>5 лет и более</Checkbox>
            </Checkbox.Group>
        </>
    )

    const siderContent = (
        <Collapse 
            items={[
                {
                    key: 'rating',
                    label: 'Рейтинг',
                    children: ratingFilter,
                },
                {
                    key: 'specialty',
                    label: 'Специальность',
                    children: specialtyFilter,
                },
                {
                    key: 'workExperience',
                    label: 'Опыт работы',
                    children: workExperienceFilter,
                }
            ]}
            className="sider-collapse"
            size="large"
            ghost
            defaultActiveKey={[
                'rating',
                'specialty',
                'workExperience'
            ]}
        />
    );

    return <AuthorizedLayout siderContent={siderContent}>
        <div className="Search">
            <Alert
                message={<h4>Найдено по результатам запроса: <code>{searchString}</code></h4>}
                type="info"
                showIcon
                icon={<SearchOutlined />}
            />
            
            <Divider />

            <DoctorList 
                doctors={[]} 
                selectedRatingRange={selectedRatingRange} 
                selectedSpecialties={selectedSpecialties}
                searchString={searchString!}
            />
        </div>
    </AuthorizedLayout>
}