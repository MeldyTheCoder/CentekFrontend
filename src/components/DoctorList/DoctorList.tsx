import React from 'react';
import {Card, Avatar, Button, Space, List} from 'antd';
import { TDoctor } from '../../Types';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';

interface IDoctorList {
    doctors: TDoctor[]
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

const specialty = {
    id: 1,
    name: 'Лор-проститутка'
}

const data = Array.from({ length: 23 }).map((_, i) => ({
    id: i,
    href: '',
    first_name: `Иван`,
    last_name: 'Иванов',
    surname: 'Иванович',
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    specialty: specialty,
    description: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

export function DoctorList({doctors}: IDoctorList) {
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 3,
                align: 'center'
            }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    actions={[
                        <IconText icon={StarOutlined} text="4.3" key="list-vertical-star-o" />,
                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    ]}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} size={60}>{item.first_name.at(0)}</Avatar>}
                        title={<a href={item.href}>{item.last_name} {item.first_name} {item.surname!}</a>}
                        description={item.specialty.name}
                    />
                        {item.description}
                </List.Item>
            )}
        />
    )
}