import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthorizedLayout } from "../Layouts/AuthorizedLayout/AuthorizedLayout";
import { DoctorList } from "../../components/DoctorList/DoctorList";
import { Menu, MenuProps, Collapse, Slider, Checkbox, Divider, Alert, App } from "antd";
import { AppstoreOutlined, MailOutlined, SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import './Doctors.less';
import { useApiContext } from "../../providers/ApiProvider";
import { TSpeciality } from "../../Types";

export function Doctors() {
    const navigate = useNavigate();
    const { notification } = App.useApp();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchString = searchParams.get('q');

    const { useDoctors, useSpecialities } = useApiContext();
    const [doctors, doctorsLoading, doctorsError] = useDoctors();
    const [specialities, spetialitiesLoading, specError] = useSpecialities();

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

    const handleSearch = (value: string) => {
        if (!value) {
            return navigate('/doctors/')
        }
        
        return navigate(`/doctors/?q=${value}`)
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
                {specialities?.map((element: TSpeciality) => (
                    <Checkbox value={element.id}>{element.name}</Checkbox>
                ))}

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

    useEffect(() => {
        if (!doctorsError && !specError) {
            return
        }
        const error = doctorsError || specError;

        return notification.error({
            message: 'Ошибка',
            description: error.toString(),
            duration: 5,
            placement: 'topRight',
        })
    }, [doctorsError, specError])

    return <AuthorizedLayout siderContent={siderContent} onSearch={handleSearch}>
        <div className="Search">
            {!!searchString && (
                <>
                    <Alert
                        message={<h4>Найдено по результатам запроса: <code>{searchString}</code></h4>}
                        type="info"
                        showIcon
                        icon={<SearchOutlined />}
                    />
                    
                    <Divider />
                </>
                )
            }

            <DoctorList 
                doctors={doctors} 
                selectedRatingRange={selectedRatingRange} 
                selectedSpecialties={selectedSpecialties}
                searchString={searchString!}
                loading={doctorsLoading}
            />
        </div>
    </AuthorizedLayout>
}