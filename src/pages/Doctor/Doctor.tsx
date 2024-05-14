import {useEffect, useState} from 'react';
import { AuthorizedLayout } from '../Layouts/AuthorizedLayout/AuthorizedLayout';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useApiContext } from '../../providers/ApiProvider';
import {App, Avatar, Badge, Divider, Spin, Tabs, Tag} from 'antd';
import { FileSyncOutlined, InfoCircleOutlined, LoadingOutlined, PropertySafetyOutlined, SafetyCertificateOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { fromDate, toRGB } from '../../DateUtils';

import './Doctor.less';
import { useAuth } from '../../providers/AuthProvider';
import { MeetingsTab } from './MeetingsTab';
import { VisitsTab } from './VisitsTab';
import { PatientsTab } from './PatientsTab';
import { InfoTab } from './InfoTab';

export function Doctor() {
    const navigate = useNavigate();
    const {user} = useAuth();
    const {id} = useParams();
    const [searchParams, _] = useSearchParams()
    const {useDoctor} = useApiContext();
    const {notification} = App.useApp();
    const [doctor, doctorLoading, error] = useDoctor(+id!);

    const activeTab = searchParams.get('tab');

    useEffect(() => {
        if (!error) {
            return
        }

        return notification.error({
            message: 'Ошибка',
            description: error,
            duration: 5,
            placement: 'topRight',
        })

    }, [error])

    useEffect(() => {
        if (!activeTab) {
            return navigate(`/doctors/${id}/?tab=info`)
        }
    }, [])

    const handleSearch = (value: string) => {
        return navigate(`/doctors?q=${value}`);
    }

    if (!doctor && !!doctorLoading) {
        return (
            <AuthorizedLayout onSearch={handleSearch}>
                <div className="DoctorPage">
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 60}} spin />} className='loading-spin' />
                </div>
            </AuthorizedLayout>
        )
    }

    else if (!doctor) {
        return null
    }


    const handleTabChange = (tab: string) => {
        return navigate(`/doctors/${id}/?tab=${tab}`)
    }

    const fromNow = fromDate(doctor.date_joined, true);

    const tabs = [
        {
            key: 'info',
            label: 'Информация',
            icon: <InfoCircleOutlined />,
            children: <InfoTab doctor={doctor} />
        },
        {
            key: 'patients',
            label: 'Пациенты',
            icon: <PropertySafetyOutlined />,
            children: <PatientsTab doctor={doctor} />
        },
        {
            key: 'visits',
            label: 'Сеансы',
            icon: <FileSyncOutlined />,
            children: <VisitsTab doctor={doctor} />
        },
        {
            key: 'meetings',
            label: 'Мероприятия',
            icon: <TeamOutlined />,
            children: <MeetingsTab doctor={doctor} />
        },
        {
            key: 'settings',
            label: 'Настройки',
            icon: <SettingOutlined />
        }
    ]

    return (
        <AuthorizedLayout onSearch={handleSearch}>
            <div className="DoctorPage">
                <div className='doctor-header'>
                    <Avatar 
                        src={`http://localhost:8080/${doctor.photo}`}
                        size={150}
                    >
                        {doctor.first_name.at(0)}
                    </Avatar>

                    <div className='doctor-bio'>
                        <h2>
                            {doctor.last_name} {doctor.first_name} {doctor.surname!} 
                            {user?.id === doctor.id && (
                                <Tag color='magenta'>Вы</Tag>
                            )}
                        </h2>

                        <Badge 
                            color={toRGB(doctor?.speciality?.name || 'Специальность')} 
                            text={doctor?.speciality?.name  || 'Специальность'} 
                        />
                    </div>
                </div>

                <Tabs 
                    items={tabs}
                    onChange={handleTabChange}
                    activeKey={activeTab!}
                />
            </div>
        </AuthorizedLayout>
    )
}