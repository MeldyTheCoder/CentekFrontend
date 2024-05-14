import React from 'react';
import { Avatar, Space, List, App, Button, Divider, Typography, Tooltip, Badge, Flex, ButtonProps, Tag} from 'antd';
import { TUser } from '../../Types';
import { EyeOutlined, FileSyncOutlined, MessageOutlined, SoundOutlined, StarOutlined, TeamOutlined } from '@ant-design/icons';
import './DoctorList.less';
import { useApiContext } from '../../providers/ApiProvider';
import { fromDate, toRGB } from '../../DateUtils';
import { useNavigate } from 'react-router-dom';
import { DoctorProfileModal } from '../DoctorProfileModal/DoctorProfileModal';
import { DoctorComplaintModal } from '../DoctorComplaint/DoctorComplaintModal';
import Item from 'antd/es/list/Item';
import { DoctorVisitsModal } from '../DoctorVisitsModal/DoctorVisitsModal';
import { DoctorMeetingsModal } from '../DoctorMeetingsModal/DoctorMeetingsModal';
import { useAuth } from '../../providers/AuthProvider';

interface IDoctorList {
    doctors: TUser[],
    selectedRatingRange?: [number, number],
    selectedWorkExperience?: number[],
    selectedSpecialties?: number[],
    searchString?: string,
    loading?: boolean,

}

const IconText = ({ icon, text, onHover, className }: { icon: React.FC; text: string, onHover?: () => any, className?: string }) => (
    <div className={`icon-text ${className}`} onClick={onHover}>
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    </div>
);


function DoctorWriteMessage({doctor}: {doctor: TUser}) {

    return (
        <DoctorProfileModal doctor={doctor}>
            <Badge color='red' text={'К сожалению, эта функция недоступна в данный момент.'} />
        </DoctorProfileModal>
    )
}

export function DoctorList({
    doctors, 
    selectedRatingRange, 
    selectedSpecialties, 
    selectedWorkExperience,
    searchString,
    loading
}: IDoctorList) {
    const { user } = useAuth();
    const { modal, message } = App.useApp();

    const handleMeetingsClick = (doctor: TUser) => {
        return modal.info({
            title: ``,
            closable: true,
            footer: null,
            icon: null,
            className: 'ReviewsModal',
            content: <DoctorMeetingsModal doctor={doctor} />
        })
    };

    const handleVisitsClick = (doctor: TUser) => {
        return modal.info({
            title: ``,
            closable: true,
            footer: null,
            icon: null,
            className: 'ReviewsModal',
            content: <DoctorVisitsModal doctor={doctor} />
        })
    };

    let dataFiltered = doctors?.length > 0 ? [...doctors] : []

    if (!!searchString) {
        dataFiltered = dataFiltered.filter((element: any) => (
            `${element.first_name} ${element.last_name} ${element.surname_name} ${element.speciality?.name}`.includes(
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
            selectedSpecialties.includes(element.speciality?.id)
        ))
    }

    const handleDoctorWriteButtonClicked = (doctor: TUser) => {
        const handleModalClose = (destroy: () => void) => {
            destroy?.();
        }

        const {destroy} = modal.info({
            title: '',
            closable: true,
            footer: null,
            icon: null,
            className: 'ReviewsModal',
            content: <DoctorWriteMessage doctor={doctor} />
        })
    }

    const handleDoctorComplaintButtonClicked = (doctor: TUser) => {
        const handleModalClose = (destroy?: () => void) => {
            destroy?.();

            return message.success(
                'Жалоба успешно отправлена.',
                5,
            )
        }

        const {destroy} = modal.info({
            title: ``,
            closable: true,
            footer: null,
            icon: null,
            className: 'ReviewsModal',
            content: <DoctorComplaintModal doctor={doctor} onSubmit={() => handleModalClose(destroy)}/>,
        })
    }

    return (
        <List
            className='DoctorList'
            itemLayout="vertical"
            size="large"
            pagination={{
                pageSize: 3,
                align: 'center'
            }}
            loading={loading}
            dataSource={dataFiltered}
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    actions={[
                        <Tooltip 
                            title='Количество сеансов для пациентов у данного доктора за все время.'
                            placement='bottom'
                        >
                            <Button type='text' onClick={() => handleVisitsClick(item)}>
                                <IconText icon={FileSyncOutlined} text={`${item.visits?.length || 0}`} key="list-vertical-star-o"/>
                            </Button>
                        </Tooltip>
                        ,

                        <Tooltip
                            title='Количество мероприятий, организованных данным доктором.'
                            placement='bottom'
                        >
                            <Button type='text' onClick={() => handleMeetingsClick(item)}>
                                <IconText icon={TeamOutlined} text={`${item.meetings?.length || 0}`} key="list-vertical-message" />    
                            </Button>
                        </Tooltip>
                    ]}

                    extra={
                        user?.id !== item.id && 
                        <Flex gap={10} align='center' wrap='wrap' vertical>
                            <Button
                                type='default'
                                icon={<MessageOutlined />}
                                onClick={() => handleDoctorWriteButtonClicked(item)}
                                block
                            >
                                Написать
                            </Button>

                            <Button
                                type='dashed'
                                icon={<SoundOutlined />}
                                onClick={() => handleDoctorComplaintButtonClicked(item)}
                                danger
                                block
                            >
                                Пожаловаться
                            </Button>
                        </Flex>
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={`http://localhost:8080/${item.photo}`} size={60}>{item.first_name.at(0)}</Avatar>}
                        title={
                            <>
                                <a href={`/doctors/${item.id}`}>
                                    {item.last_name} {item.first_name} {item.surname!}
                                </a>

                                {user?.id === item.id && (
                                    <Tag color='magenta'>
                                        Вы
                                    </Tag>
                                )}
                            </>
                        }
                        description={<Badge color={toRGB(item.speciality.name)} text={item.speciality?.name} />}
                    />

                </List.Item>
            )}
        />
    )
}