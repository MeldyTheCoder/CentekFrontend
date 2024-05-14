import { useRef, useState } from "react";
import { Table, Input, Button, InputRef, Space, TableColumnType, Avatar, TableColumnsType} from "antd";

import { FilterDropdownProps } from "antd/es/table/interface";
import { TInsurancePolicy, TMedCard, TPatient } from "../../Types";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { convertToRussian, fromDate } from "../../DateUtils";

type DataType = TPatient & {
    fio: string,
    photo?: string,
}

type DataIndex = keyof DataType;

interface IPatientList {
    patients: TPatient[],
    loading?: boolean,
    onPatientClick?: (patientId: number) => void,
}

export function PatientsList({
    patients,
    loading,
    onPatientClick,
}: IPatientList) {
    const [searchText, setSearchText] = useState<string>('');
    const [searchedColumn, setSearchedColumn] = useState<string>('');
    const searchInput = useRef<InputRef>(null);

    const getDateOfBirthString = (dateOfBirth: string) => {
        const date = convertToRussian(dateOfBirth);
        const fromNow = fromDate(dateOfBirth, true);

        return `${date} (${fromNow})`
    }

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
                textToHighlight={text ? text?.toString() : ''}
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
                <Avatar 
                    src={value}
                    onClick={() => onPatientClick?.(record.id)}
                >
                    {record.first_name.at(0)}
                </Avatar>
            )
        },
        {
            title: 'ФИО',
            dataIndex: 'fio',
            key: 'fio',
            width: '30%',
            ...getColumnSearchProps('fio'),
            render: (_, record) => (
                <a onClick={() => onPatientClick?.(record.id)}>
                    {record.last_name} {record.first_name} {record.surname!}
                </a>
            )
        },
        {
            title: 'Дата рождения',
            dataIndex: 'date_of_birth',
            key: 'date_of_birth',
            width: '20%',
            ...getColumnSearchProps('date_of_birth'),
            render: getDateOfBirthString,
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
            title: 'Мед. карта',
            dataIndex: 'med_card',
            key: 'med_card',
            ...getColumnSearchProps('med_card'),
            render: (value: TMedCard) => (
                value.id
            )
        },

        {
            title: 'Cтраховой полис',
            dataIndex: 'insurance_policy',
            key: 'insurance_policy',
            ...getColumnSearchProps('insurance_policy'),
            render: (value: TInsurancePolicy) => (
                value.number
            )
        },
      ];
    
      return (
        <Table 
            columns={columns} 
            dataSource={patients || []} 
            loading={loading}
            locale={{
                emptyText: 'Ничего не найдено!'
            }}
            pagination={{
                position: ['bottomCenter'],
                pageSize: 10,
            }}
        />
      )
}