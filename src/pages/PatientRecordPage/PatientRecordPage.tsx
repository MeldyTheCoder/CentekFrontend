import { useEffect, useState } from "react";
import { Calendar } from "antd";
import { AuthorizedLayout } from "../Layouts/AuthorizedLayout/AuthorizedLayout";
import dayjs from "dayjs";



export function PatientRecordPage({}) {
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(
        dayjs()
    );
    
    const handleDateSelect = (value: dayjs.Dayjs, _?: any) => {
        setSelectedDate(value);
    }

    return (
        <AuthorizedLayout>
            <p>{selectedDate?.format('DD.MM.YYYY')}</p>

            <Calendar 
                onChange={handleDateSelect}
                onSelect={handleDateSelect}
                value={selectedDate}
            />
        </AuthorizedLayout>
    )
}