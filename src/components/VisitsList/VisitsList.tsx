import { Avatar, Badge, Empty, Flex, List, Tag } from "antd";
import { TVisit } from "../../Types";
import { convertToRussian, fromDate, toRGB } from "../../DateUtils";
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, SyncOutlined } from "@ant-design/icons";

interface IVisitsList {
    visits: TVisit[];
    onVisitClick?: () => void;
}

export function VisitsList({
    visits,
    onVisitClick,
}: IVisitsList) {

    const getTagByStatus = (status: TVisit['status']) => {
        switch (status) {
            case 'opened':
                return <Tag icon={<SyncOutlined spin />} color="processing">в процессе</Tag>

            case 'closed':
                return <Tag icon={<CheckCircleOutlined />} color="success">закрыт</Tag>

            case 'canceled':
                return <Tag icon={<CloseCircleOutlined />} color="error">отменен</Tag>

            case 'not_came':
                return <Tag icon={<CloseCircleOutlined />} color="error">пациент не пришел</Tag>
            
            case 'reopened':
                return <Tag icon={<SyncOutlined spin />} color="success">переоткрыт</Tag>

            case 'rescheduled':
                return <Tag icon={<ExclamationCircleOutlined />} color="warning">перенесен</Tag>

            default:
                return null
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
            dataSource={visits}
            renderItem={(item) => (
                <List.Item key={item.id}>
                    <List.Item.Meta
                        avatar={
                            <Avatar>{item.patient.first_name.at(0)}</Avatar>
                        }
                        title={
                            <a href={'#'}>
                                {item.patient.first_name} {item.patient.last_name} {item.patient.surname}
                            </a>
                        }
                        description={
                            <Flex gap={10} vertical>
                                <Badge color={toRGB(item.diagnosis.name)} text={item.diagnosis.name} />
                                
                                <div className="status-tag">
                                    <Tag color="green">{fromDate(item.date_created)}</Tag>
                                    <Tag>{convertToRussian(item.date_to_visit, true)}</Tag>
                                    {getTagByStatus(item.status)}
                                </div>
                            </Flex>
                        }
                    />

                </List.Item>
            )}
        />
    )
}