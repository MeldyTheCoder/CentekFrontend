import { useActionData } from "react-router-dom";
import { TUser } from "../../Types";
import { PatientsList } from "../../components/PatientsList/PatientsList";
import { useAuth } from "../../providers/AuthProvider";
import { useApiContext } from "../../providers/ApiProvider";


interface IPatientsTab {
    doctor: TUser;
}

export function PatientsTab({
    doctor
}: IPatientsTab) {
    const {useDoctorPatients} = useApiContext();
    const [patients, loading, error] = useDoctorPatients(doctor.id);


    return (
        <PatientsList patients={patients} loading={loading} />
    )
}