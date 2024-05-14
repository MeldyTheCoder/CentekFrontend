import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthorizedLayout } from "../Layouts/AuthorizedLayout/AuthorizedLayout";
import { DoctorList } from "../../components/DoctorList/DoctorList";
import { Menu, MenuProps, Collapse, Slider, Checkbox, Divider, Alert, DatePicker, Table, TableColumnsType, TableColumnType, Input, Space, Button, InputRef, Avatar } from "antd";
import { AppstoreOutlined, MailOutlined, SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import Highlighter from 'react-highlight-words';

import './Pacients.less';
import { FilterDropdownProps } from "antd/es/table/interface";
import { TInsurancePolicy, TMedCard, TPatient } from "../../Types";
import { useApiContext } from "../../providers/ApiProvider";
import { PatientsList } from "../../components/PatientsList/PatientsList";


type GendersType = 'male' | 'female';

type DataType = TPatient & {
    fio: string,
    photo?: string,
}

type DataIndex = keyof DataType;

export function Pacients() {
    const navigate = useNavigate();
    const {usePatients} = useApiContext();
    const [patients, patientsLoading, error] = usePatients();

    const [searchParams, setSearchParams] = useSearchParams();
    const searchString = searchParams.get('q');

    const [selectedBirthDateRange, setSelectedBirthDateRange] = useState<[string, string]>()
    const [selectedGenders, setSelectedGenders] = useState<GendersType[]>(['male', 'female'])
    const [selectedPMRRange, setSelectedPMRRange] = useState<[string, string]>()

    const handleBirthDateRangeChange = (_: any, value: string[]) => {
        console.log('Range: ', value);
        setSelectedBirthDateRange([value.at(0)!, value.at(1)!]);
    }

    const handleGenderChange = (value: GendersType[]) => {
        console.log('Genders: ', value);
        setSelectedGenders(value);
    }

    const handlePMRRangeChange = (_: any, value: string[]) => {
        console.log('Range: ', value);
        setSelectedPMRRange([value.at(0)!, value.at(1)!]);
    }

    const handleSearch = (value: string) => {
        if (!value) {
            return navigate('/patients/')
        }
        
        return navigate(`/patients?q=${value}`)
    }

    const handlePatientClick = (patientId: number) => {
        return navigate(`/patients/${patientId}/`)
    }

    const birthDateFilter = (
        <>
            <DatePicker.RangePicker
                showTime
                format="YYYY/MM/DD HH:mm"
                onChange={handleBirthDateRangeChange}
                placeholder={['От', 'До']}
            />
        </>
    )

    const genderFilter = (
        <>
            <Checkbox.Group 
                value={selectedGenders!} 
                onChange={handleGenderChange} 
                className="scrollable-group"
            >
                <Checkbox value={'male'}>Мужчина</Checkbox>
                <Checkbox value={'female'}>Женщина</Checkbox>

            </Checkbox.Group>
        </>
    )

    const PMRFilter = (
        <>
            <DatePicker.RangePicker
                showTime
                format="YYYY/MM/DD HH:mm:ss"
                onChange={handlePMRRangeChange}
                placeholder={['От', 'До']}
            />
        </>
    )

    const siderContent = (
        <Collapse 
            items={[
                {
                    key: 'birthDate',
                    label: 'Дата рождения',
                    children: birthDateFilter,
                },
                {
                    key: 'gender',
                    label: 'Пол пациента',
                    children: genderFilter,
                },
                {
                    key: 'pmr',
                    label: 'Дата выдачи мед. карты',
                    children: PMRFilter,
                }
            ]}
            className="sider-collapse"
            size="large"
            ghost
            defaultActiveKey={[
                'birthDate',
                'gender',
                'pmr'
            ]}
        />
    );

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

            <PatientsList 
                patients={patients}
                loading={patientsLoading}
                onPatientClick={handlePatientClick}
            />
        </div>
    </AuthorizedLayout>
}