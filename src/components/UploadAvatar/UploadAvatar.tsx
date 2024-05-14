import { Avatar, Upload, AvatarProps, GetProp, UploadProps, message, UploadFile } from "antd";
import { useEffect, useState } from "react";
import { HttpMethods, fetchApi, getToken } from "../../providers/ApiProvider";
import { useAuth } from "../../providers/AuthProvider";


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface TUploadAvatar {
    src?: string,
    size?: AvatarProps['size'],
    shape?: AvatarProps['shape'],
    style?: AvatarProps['style'],
    onUpload?: UploadProps['onChange'],
    children: any,
}

const beforeUpload = (file: FileType) => {
    const isLt2M = file.size / 1024 / 1024 < 50;
    if (!isLt2M) {
      message.error('Размер изображения должен быть не более 50MB!');
      return false;
    }
    return isLt2M;
  };

export function UploadAvatar({
    src,
    onUpload,
    children,
    size,
    shape,
    style,
}: TUploadAvatar) {
    const [loading, setLoading] = useState<boolean>(false);
    const [fileList, setFileList] = useState<UploadFile[]>(
        [
            {
                name: src!,
                thumbUrl: src,
                url: src,
                uid: 'avatar',
            },
        ]
    );
    const {refreshUser} = useAuth();

    const handleFileChange: UploadProps['onChange'] = (info) => {
        setFileList(info.fileList);

        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
          }
          if (info.file.status === 'done') {
            setLoading(false);
            refreshUser();
            onUpload?.(info)
          }
    };

    const handleFileRemove = async (file: UploadFile) => {
        await fetchApi<any, any>({
            url: 'users/set_avatar',
            method: HttpMethods.POST,
            data: {
                'file': null
            }
        })

        return await refreshUser();
    }

    useEffect(() => {
        console.log(fileList);
    }, [fileList])

    return (
        <Upload
            style={style}
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
            showUploadList={true}
            fileList={fileList}
            listType="picture-circle"
            action={'http://localhost:8080/users/set_avatar'}
            headers={{
                Authorization: `Bearer ${getToken()}`
            }}
            onRemove={handleFileRemove}
        >
            {
                fileList.length < 1 && 'Загрузить'
            }
        </Upload>
    )
}