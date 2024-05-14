import { Alert, Spin } from "antd";
import { TUser } from "../../Types";
import { useApiContext } from "../../providers/ApiProvider";
import { VisitsList } from "../../components/VisitsList/VisitsList";


interface IVisitsTab {
    doctor: TUser;
}

export function VisitsTab({
    doctor
}: IVisitsTab) {
    const {useDoctorVisits} = useApiContext();
    const [visits, loading, error] = useDoctorVisits(doctor.id);
    

    if (!!loading) {
        return <Spin />
    } else if (!!error) {
        return <Alert message={error.toString()} type="error" />
    }

    return (
        <div className="meetings-tab-container">
            <VisitsList visits={visits} />
        </div>
    )
}