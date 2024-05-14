import { useState, useEffect } from "react";
import { List, Button, Avatar, Empty, Badge } from "antd";
import { TMeeting, TPatient, TVisit } from "../../Types";
import { convertToRussian, toRGB } from "../../DateUtils";


interface IMeetingList {
    meetings: TMeeting[];
    onVisitClick?: () => void,
    renderToolbar?: boolean,
}

export function MeetingsList({
    meetings,
    onVisitClick,
    renderToolbar,
}: IMeetingList) {

    const getTypeVerbose = (type: TMeeting['type']) => {
        switch (type) {
            case 'drug_therapy':
                return 'Лекарственная терапия';

            case 'instrumental_diagnostics':
                return 'Инструментальная диагностика';

            case 'laboratory_test':
                return 'Лабораторный тест';

            case 'surgery':
                return 'Хирургия';

            case 'physiotherapy':
                return 'Физеотерапия'

            default:
                return 'Профилактическое мероприятие'
        }
    }

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 10,
                position: 'bottom',
                align: 'center',
            }}
            locale={{
                emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Ничего не найдено!' />
            }}
            dataSource={meetings || []}
            renderItem={(item) => (
                <List.Item key={item.id}>
                    <List.Item.Meta
                        avatar={
                            <Avatar.Group maxCount={2}>
                                {item.patients.map((patient: TPatient) => (
                                    <Avatar>{patient.first_name.at(0)}</Avatar>
                                ))}
                            </Avatar.Group>
                        }

                        title={
                            <a href='#'>{item.name}</a>
                        }

                        description={
                            <Badge color={toRGB(item.type)} text={getTypeVerbose(item.type)} />
                        }
                    />
                </List.Item>
            )}
        />
    )
}