import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthorizedLayout } from "../Layouts/AuthorizedLayout/AuthorizedLayout";
import { DoctorList } from "../../components/DoctorList/DoctorList";
import { Menu, MenuProps, Collapse, Slider, Checkbox, Divider, Alert, DatePicker, Table, TableColumnsType, TableColumnType, Input, Space, Button, InputRef, Avatar } from "antd";
import { AppstoreOutlined, MailOutlined, SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import Highlighter from 'react-highlight-words';

import './Pacients.less';
import { FilterDropdownProps } from "antd/es/table/interface";


type GendersType = 'male' | 'female';

interface DataType {
    key: string;
    fio: string;
    age: number;
    photo: string;
    dateOfBirth: string | Date;
    gender: GendersType | null,
    medicalCardNumber: number,
    insurancePolicyNumber: number,
}

type DataIndex = keyof DataType;

const dataSource = [
    {
        key: '1',
        fio: 'Иванов Иван Иванович',
        age: 45,
        photo: `https://api.dicebear.com/7.x/miniavs/svg?seed=1`,
        dateOfBirth: '2005-09-13',
        gender: 'male',
        medicalCardNumber: 456245234,
        insurancePolicyNumber: 32523523524524,
    },

    {
        key: '2',
        fio: 'Семенов Семен Семенович',
        age: 32,
        photo: `https://api.dicebear.com/7.x/miniavs/svg?seed=2`,
        dateOfBirth: '2005-09-13',
        gender: 'male',
        medicalCardNumber: 456245234,
        insurancePolicyNumber: 32523523524524,
    },

    {
        key: '3',
        fio: 'Альтушкин Стас Михайлович',
        age: 52,
        photo: `https://api.dicebear.com/7.x/miniavs/svg?seed=3`,
        dateOfBirth: '2005-09-13',
        gender: 'male',
        medicalCardNumber: 456245234,
        insurancePolicyNumber: 32523523524524,
    },

    {
        key: '4',
        fio: 'Абакина София Семеновна',
        age: 21,
        photo: `https://api.dicebear.com/7.x/miniavs/svg?seed=4`,
        dateOfBirth: '2005-09-13',
        gender: 'female',
        medicalCardNumber: 456245234,
        insurancePolicyNumber: 32523523524524,
    },

    {
        key: '5',
        fio: 'Алексеев Дмитрий Александрович',
        age: 90,
        photo: `https://api.dicebear.com/7.x/miniavs/svg?seed=5`,
        dateOfBirth: '2005-09-13',
        gender: 'male',
        medicalCardNumber: 456245234,
        insurancePolicyNumber: 32523523524524,
    },

    {
        key: '6',
        fio: 'Петров Павел Анатольевич',
        age: 24,
        photo: `https://api.dicebear.com/7.x/miniavs/svg?seed=6`,
        dateOfBirth: '2005-09-13',
        gender: 'male',
        medicalCardNumber: 456245234,
        insurancePolicyNumber: 32523523524524,
    },

    {
        key: '7',
        fio: 'Пушкин Михаил Семенович',
        age: 28,
        photo: `https://api.dicebear.com/7.x/miniavs/svg?seed=7`,
        dateOfBirth: '2005-09-13',
        gender: 'male',
        medicalCardNumber: 456245234,
        insurancePolicyNumber: 32523523524524,
    },
    {
        key: '8',
        fio: 'Пушкин Михаил Семенович',
        age: 84,
        photo: `https://api.dicebear.com/7.x/miniavs/svg?seed=8`,
        dateOfBirth: '2005-09-13',
        gender: 'male',
        medicalCardNumber: 456245234,
        insurancePolicyNumber: 32523523524524,
    },
    {
        key: '9',
        fio: 'Пушкин Михаил Семенович',
        age: 35,
        photo: `https://api.dicebear.com/7.x/miniavs/svg?seed=9`,
        dateOfBirth: '2005-09-13',
        gender: 'male',
        medicalCardNumber: 456245234,
        insurancePolicyNumber: 32523523524524,
    },
    {
        key: '10',
        fio: 'Пушкин Михаил Семенович',
        age: 43,
        photo: `https://api.dicebear.com/7.x/miniavs/svg?seed=10`,
        dateOfBirth: '2005-09-13',
        gender: 'male',
        medicalCardNumber: 456434234,
        insurancePolicyNumber: 576456,
    },
    {
        key: '11',
        fio: 'Пушкин Михаил Семенович',
        age: 48,
        photo: `https://api.dicebear.com/7.x/miniavs/svg?seed=11`,
        dateOfBirth: '2005-09-13',
        gender: 'male',
        medicalCardNumber: 456245234,
        insurancePolicyNumber: 32523523524524,
    },
    {
        key: '12',
        fio: 'Пушкин Михаил Семенович',
        age: 43,
        photo: `https://api.dicebear.com/7.x/miniavs/svg?seed=12`,
        dateOfBirth: '2005-09-13',
        gender: 'male',
        medicalCardNumber: 456245234,
        insurancePolicyNumber: 32523523524524,
    },
    {
        key: '13',
        fio: 'Пушкин Михаил Семенович',
        age: 56,
        photo: `https://api.dicebear.com/7.x/miniavs/svg?seed=13`,
        dateOfBirth: '2005-09-13',
        gender: 'male',
        medicalCardNumber: 456245234,
        insurancePolicyNumber: 32523523524524,
    }
]
export function Pacients() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchText, setSearchText] = useState<string>('');
    const [searchedColumn, setSearchedColumn] = useState<string>('');
    const searchString = searchParams.get('q');
    const searchInput = useRef<InputRef>(null);

    const [selectedBirthDateRange, setSelectedBirthDateRange] = useState<[string, string]>()
    const [selectedGenders, setSelectedGenders] = useState<GendersType[]>(['male', 'female'])
    const [selectedPMRRange, setSelectedPMRRange] = useState<[string, string]>()

    const handleTableSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
      ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
    
      const handleTableSearchReset = (clearFilters: () => void, confirm: FilterDropdownProps['confirm']) => {
        clearFilters();
        setSearchText('');
        setSearchedColumn('');
        confirm()
      };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            
                <Input
                    ref={searchInput}
                    placeholder={`Поиск`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleTableSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleTableSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Поиск
                    </Button>

                    <Button
                        onClick={() => clearFilters && handleTableSearchReset(clearFilters, confirm)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Сбросить
                    </Button>

                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Отфильтроать
                    </Button>

                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Закрыть
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]!
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
            />
            ) : (
            text
            ),
    });

    const columns: TableColumnsType<any> = [
        {
            title: 'Фото',
            dataIndex: 'photo',
            key: 'photo',
            render: (value, record) => (
                <Avatar src={value}>{record.fio.at(0)}</Avatar>
            )
        },
        {
            title: 'ФИО',
            dataIndex: 'fio',
            key: 'fio',
            width: '30%',
            ...getColumnSearchProps('fio'),
        },
        {
            title: 'Возраст',
            dataIndex: 'age',
            key: 'age',
            width: '20%',
            ...getColumnSearchProps('age'),
            render: (value) => (
                `${value} лет`
            )
        },
        {
            title: 'Пол',
            dataIndex: 'gender',
            key: 'gender',
            render: (value) => {
                switch (value) {
                    case 'male':
                        return 'мужчина'
                    
                    case 'female':
                        return 'женщина'
                }
            }
        },
        {
            title: 'Номер мед. карты',
            dataIndex: 'medicalCardNumber',
            key: 'medicalCardNumber',
            ...getColumnSearchProps('medicalCardNumber'),
        },

        {
            title: 'Номер страхового полиса',
            dataIndex: 'insurancePolicyNumber',
            key: 'insurancePolicyNumber',
            ...getColumnSearchProps('insurancePolicyNumber'),
        },
      ];
    
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
            return navigate('/doctors/')
        }
        
        return navigate(`/doctors/?q=${value}`)
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

            <Table 
                columns={columns} 
                dataSource={dataSource} 
                locale={{
                    emptyText: 'Ничего не найдено!'
                }}
                pagination={{
                    position: ['bottomCenter']
                }}
            />
        </div>
    </AuthorizedLayout>
}