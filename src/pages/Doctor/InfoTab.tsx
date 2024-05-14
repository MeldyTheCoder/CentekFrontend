import { Badge, Descriptions, Divider, Typography } from "antd";
import { TUser } from "../../Types";
import { convertToRussian, toRGB } from "../../DateUtils";


interface IInfoTab {
    doctor: TUser;
}

export function InfoTab({
    doctor
}: IInfoTab) {
    const dateJoined = convertToRussian(doctor.date_joined);
    const dateLastLogin = !!doctor.last_login ? convertToRussian(doctor.last_login!) : ' - ';

    return (
        <div className="descriptions-tab-container">
            <Descriptions layout="vertical" bordered>
                <Descriptions.Item label='Эл. почта'>
                    <Typography.Text copyable>{doctor.email}</Typography.Text>
                </Descriptions.Item>
                
                <Descriptions.Item label='Имя пользователя'>
                    <Typography.Text copyable>{`@${doctor.username}`}</Typography.Text>
                </Descriptions.Item>
                
                <Descriptions.Item label='Специальность'>
                    <Badge color={toRGB(doctor.speciality.name)} text={doctor.speciality.name} />
                </Descriptions.Item>
                
                <Descriptions.Item label='Дата регистрации'>
                    {dateJoined}
                </Descriptions.Item>
                
                <Descriptions.Item>
                    -
                </Descriptions.Item>

                <Descriptions.Item label='Дата последнего входа'>
                    {dateLastLogin}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}