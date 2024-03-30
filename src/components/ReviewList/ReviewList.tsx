import { Avatar, List, Rate } from "antd";
import { TReview } from "../../Types";
import { HeartOutlined } from "@ant-design/icons";
import './ReviewList.less';

interface IReviewList {
    reviews: TReview[]
}

export function ReviewList({reviews}: IReviewList) {
    return (
        <List
            className="review-list"
            dataSource={reviews}
            pagination={{
                pageSize: 5,
                align: 'start'
            }}
            renderItem={(item: TReview) => (
                <List.Item>
                    <List.Item.Meta
                        className="review-root"
                        avatar={
                            <Avatar src={item.from_user.avatar} size={40}>{item.from_user.first_name.at(0)}</Avatar>
                        }
                        title={
                            `${item.from_user.first_name} ${item.from_user.last_name!}`
                        }
                        description={
                            <Rate
                                allowHalf 
                                value={item.rate} 
                                disabled
                                className="review-rating"
                            />
                        }
                    />
                        {item.message}
                </List.Item>
            )}
        >

        </List>
    )
}