import { useEffect, useState } from "react";
import {Button, Divider, Typography} from 'antd';
import { TUser } from "../../Types";
import { DoctorProfileModal } from "../DoctorProfileModal/DoctorProfileModal";
import { EyeOutlined } from "@ant-design/icons";
import { fromDate } from "../../DateUtils";

interface IDoctorVisitsModal {
    doctor: TUser,
    onCancel?: () => void,
    onOk?: () => void,
}

export function DoctorVisitsModal({
    doctor,
    onCancel,
    onOk,
}: IDoctorVisitsModal) {
    const fromNow = fromDate(doctor.date_joined, true);

    return (
        <DoctorProfileModal doctor={doctor}>
            <>
                <Typography.Paragraph>
                    Данный доктор провел <Typography.Text mark>{doctor.visits?.length || 0} сеансов</Typography.Text> посещений 
                    для пациентов за все <Typography.Text mark>{fromNow}</Typography.Text> своей работы.
                </Typography.Paragraph>

                <Divider />

                <Button 
                    block 
                    type='primary'
                    icon={<EyeOutlined />}
                    href={`/doctors/${doctor.id}/?tab=visits`}
                >
                    Посмотреть весь список сеансов
                </Button>
            </>
        </DoctorProfileModal>
    )
}