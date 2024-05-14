import { useState, useEffect } from "react";
import {Button, Divider, Typography} from 'antd';
import { DoctorProfileModal } from "../DoctorProfileModal/DoctorProfileModal";
import { TUser } from "../../Types";
import { EyeOutlined } from "@ant-design/icons";
import { fromDate } from "../../DateUtils";


interface IDoctorMeetingsModal {
    doctor: TUser,
    onCancel?: () => void,
    onOk?: () => void,
}

export function DoctorMeetingsModal({
    doctor,
    onCancel,
    onOk,
}: IDoctorMeetingsModal) {
    const fromNow = fromDate(doctor.date_joined, true);
    
    return (
        <DoctorProfileModal doctor={doctor}>
           <>
                <Typography.Paragraph>
                    Данный доктор провел <Typography.Text mark>{doctor.visits?.length || 0} мероприятий</Typography.Text> для 
                    пациентов за все <Typography.Text mark>{fromNow}</Typography.Text> своей работы.
                </Typography.Paragraph>

                <Divider />

                <Button 
                    block 
                    type='primary'
                    icon={<EyeOutlined />}
                    href={`/doctors/${doctor.id}/?tab=meetings`}
                >
                    Посмотреть весь список мероприятий
                </Button>
            </>
        </DoctorProfileModal>
    )
}