import { useState } from "react";
import { TUser } from "../../Types";
import { DoctorProfileModal } from "../DoctorProfileModal/DoctorProfileModal";
import { Button, Checkbox, Col, Divider, Input, Modal, Row } from "antd";
import { SoundOutlined } from "@ant-design/icons";


interface DoctorComplaintModal {
    doctor: TUser,
    onSubmit?: (values: any) => void,
    onChange?: (values: any) => void,
}

interface CheckboxValues {
    insults: boolean,
    profanity: boolean,
    incompetence: boolean,
    another: string,
}

export function DoctorComplaintModal({
    doctor,
    onSubmit,
    onChange,
}: DoctorComplaintModal) {
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [anotherBlockText, setAnotherBlockText] = useState<string>('');
    const [modal, contextHolder] = Modal.useModal();

    const handleCheckboxGroupChange = (values: any) => {
        setSelectedValues(values);
        onChange?.(values);
    }

    const handleAnotherTextAreaTextChange = ({target}: any) => {
        const value = target?.value!;
        setAnotherBlockText(value);
    }

    const handleSubmit = () => {
        setLoading(true);

        setTimeout(() => {
            const data = normalizeData();
            setLoading(false);
            onSubmit?.(data);
        }, 2000)
    }

    const normalizeData = () => (
        {
            insults: selectedValues.includes('insults'),
            profanity: selectedValues.includes('profanity'),
            incompetence: selectedValues.includes('incompetence'),
            another: selectedValues.includes('another') ? anotherBlockText : '',
        }
    )

    const anotherBlockOpened = selectedValues.includes('another');

    return (
        <DoctorProfileModal doctor={doctor}>
            <Checkbox.Group
                onChange={handleCheckboxGroupChange}
                value={selectedValues}
            >
                <Checkbox value='insults'>
                    Оскорбления
                </Checkbox>

                <Checkbox value='profanity'>
                    Ненормативная лексика 
                </Checkbox>

                <Checkbox value='incompetence'>
                    Некомпетентность
                </Checkbox>

                <Checkbox value="another">
                    Другая причина
                </Checkbox>

                {anotherBlockOpened && (
                    <>
                        <Divider />

                        <Input.TextArea 
                            placeholder="Другая причина"
                            onChange={handleAnotherTextAreaTextChange}
                        >

                        </Input.TextArea>
                    </>
                )}

                <Divider />

                <Button
                    danger
                    block
                    type="default"
                    loading={loading}
                    icon={<SoundOutlined />}
                    onClick={handleSubmit}
                >
                    Отправить жалобу
                </Button>
            </Checkbox.Group>
        </DoctorProfileModal>
    )
}