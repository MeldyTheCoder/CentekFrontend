import React from 'react';
import { Avatar, Space, List, App, Button} from 'antd';
import { TDoctor, TReview, TUser, UserRoles } from '../../Types';
import { MessageOutlined, StarOutlined } from '@ant-design/icons';
import { ReviewList } from '../ReviewList/ReviewList';
import { reverse } from 'dns';

interface IDoctorList {
    doctors: TDoctor[],
    selectedRatingRange?: [number, number],
    selectedWorkExperience?: number[],
    selectedSpecialties?: number[],
    searchString?: string,

}

const IconText = ({ icon, text, onHover }: { icon: React.FC; text: string, onHover?: () => any }) => (
    <div className='icon-text' onClick={onHover}>
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    </div>
);

const specialty = {
    id: 1,
    name: 'Лор'
}


const user: TUser = {
    id: 1,
    username: 'Sunday',
    first_name: 'Кирилл',
    last_name: 'Грошелев',
    password: 'ergergerg',
    role: UserRoles.USER,
    email: 'cool.groshelev@mail.ru'
}

const data: TDoctor[] = [
    {
        id: 1,
        first_name: `Максимка`,
        last_name: 'Строев',
        surname: 'Скумбрия',
        user: user,
        specialty: specialty,
        description: 'Бросил гранату, убил 50 человек, а потом она взорвалась.',
    },

    {
        id: 2,
        first_name: `Махик`,
        last_name: 'Строев',
        surname: 'Айболитович',
        user: user,
        specialty: specialty,
        description: 'Хорошие курсы проктолога. Геморой вылечу за 2 приема. Первый - проход в ноги. ',
    },

    {
        id: 3,
        first_name: `Шуберт`,
        last_name: 'Энштейн',
        user: user,
        specialty: specialty,
        description: 'Охранник рынка единственный, кто следит за базаром.',
    },

    {
        id: 4,
        first_name: `Стас`,
        last_name: 'Какашкин',
        user: user,
        specialty: specialty,
        description: 'Чем богаче дача - джими-джими ача-ача.',
    },
];


const reviews = (doctor: TDoctor): TReview[] => (
    [
        {
            id: 1,
            from_user: user,
            to_doctor: doctor,
            message: 'Хороший врач!',
            rate: 4.5,
        },
        {
            id: 1,
            from_user: user,
            to_doctor: doctor,
            message: 'Хороший врач!',
            rate: 4.5,
        },
        {
            id: 1,
            from_user: user,
            to_doctor: doctor,
            message: 'Хороший врач!',
            rate: 4.5,
        },
        {
            id: 1,
            from_user: user,
            to_doctor: doctor,
            message: 'Хороший врач!',
            rate: 4.5,
        },
        {
            id: 1,
            from_user: user,
            to_doctor: doctor,
            message: 'Хороший врач!',
            rate: 4.5,
        },
        {
            id: 1,
            from_user: user,
            to_doctor: doctor,
            message: 'Хороший врач!',
            rate: 4.5,
        },
    ]
)

export function DoctorList({
    doctors, 
    selectedRatingRange, 
    selectedSpecialties, 
    selectedWorkExperience,
    searchString
}: IDoctorList) {
    const { modal } = App.useApp();

    const handleReviewsHover = (doctor: TDoctor) => {
        return modal.info({
            title: 'Отзывы доктора',
            content: <ReviewList reviews={reviews(doctor)} />
        })
    };

    let dataFiltered = [...data]

    if (!!searchString) {
        dataFiltered = dataFiltered.filter((element: any) => (
            `${element.first_name} ${element.last_name} ${element.surname_name} ${element.specialty.name}`.includes(
                searchString
            )
        ))
    }

    if (!!selectedRatingRange && selectedRatingRange.length > 0) {
        dataFiltered = dataFiltered.filter((element: any) => (
            selectedRatingRange[0] <= 4.5 && selectedRatingRange[1] >= 4.5 
        ))
    }

    if (!!selectedSpecialties && selectedSpecialties.length > 0) {
        dataFiltered = dataFiltered.filter((element: any) => (
            selectedSpecialties.includes(element.specialty.id)
        ))
    }

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                pageSize: 3,
                align: 'center'
            }}
            dataSource={dataFiltered}
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    actions={[
                        <IconText icon={StarOutlined} text="4.3" key="list-vertical-star-o" />,
                        <Button type='text' onClick={() => handleReviewsHover(item)}>
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />    
                        </Button>
                    ]}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.user.avatar} size={60}>{item.first_name.at(0)}</Avatar>}
                        title={<a href={`/doctors/${item.id}`}>{item.last_name} {item.first_name} {item.surname!}</a>}
                        description={item.specialty.name}
                    />
                        {item.description}
                </List.Item>
            )}
        />
    )
}