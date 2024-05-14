import { Avatar, Badge, Divider } from "antd"
import { toRGB } from "../../DateUtils"
import type { TUser } from "../../Types"


export const DoctorProfileModal = ({children, doctor}: {children: React.ReactElement | string, doctor: TUser}) => (
    <>
        <div className='doctor-review-profile'>
            <Avatar size={64} src={`http://localhost:8080/${doctor.photo}`}>{doctor.first_name.at(0)}</Avatar>

            <div className='profile-row'>
                <p>{doctor.first_name} {doctor.last_name.at(0)}. {doctor.surname && doctor.surname?.at(0)! + '.'}</p>
                <Badge color={toRGB(doctor.speciality.name)} text={doctor.speciality?.name} />
            </div>

        </div>

        <Divider></Divider>

        {children}
    </>
)