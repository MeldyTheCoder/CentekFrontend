import { Alert, Spin } from "antd";
import { TUser } from "../../Types";
import { MeetingsList } from "../../components/MeetingsList/MeetingsList";
import { useApiContext } from "../../providers/ApiProvider";


interface IMeetingsTab {
    doctor: TUser;
}

export function MeetingsTab({
    doctor
}: IMeetingsTab) {
    const {useDoctorMeetings} = useApiContext();
    const [meetings, loading, error] = useDoctorMeetings(doctor.id);
    

    if (!!loading) {
        return <Spin />
    } else if (!!error) {
        return <Alert message={error.toString()} type="error" />
    }

    return (
        <div className="meetings-tab-container">
            <MeetingsList meetings={meetings} />
        </div>
    )
}