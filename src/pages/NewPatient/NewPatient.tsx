import { useState, useEffect } from "react";
import { AuthorizedLayout } from "../Layouts/AuthorizedLayout/AuthorizedLayout";
import { Formik } from "formik";
import { PatientModel, TCreatePatient } from "../../Types";
import { App, Button, Collapse, DatePicker, Divider, Flex, Form, Input, Select, Space, Tabs } from "antd";
import dayjs from "dayjs";
import { useApiContext } from "../../providers/ApiProvider";
import './NewPatient.less';
import { useNavigate } from "react-router-dom";



const tabs: string[] = [
    'general',
    'passport',
    'med_policy',
]

export function NewPatient() {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState<string>('general');
    const [form] = Form.useForm();
    const {createPatient} = useApiContext();
    const {notification} = App.useApp();

    const handleSubmit = (values: TCreatePatient) => {
        console.log(values);

        createPatient(values)
        .then((_: any) => {
            notification.success({
                message: 'Инфорамация',
                description: 'Пациент был успешно зарегистрирован!',
                duration: 5,
                placement: 'bottom',
            })
            return navigate('/patients/')
        })
        .catch((error: any) => console.log(error))
    }

    const nextTab = tabs.at(tabs.indexOf(selectedTab) + 1) || null

    const handleNextTab = () => {
        setSelectedTab(nextTab!);
    }

    const handleSearch = (value: string) => {
        if (!value) {
            return navigate('/patients/')
        }
        
        return navigate(`/patients?q=${value}`)
    }

    const renderPassportTab = () => (
        <div className="scrollable-group form-tab">
            <Form.Item
                hasFeedback
                name={['passport', 'first_name']}
                rules={[{required: true, message: 'Данное поле обязательно для заполнения.'}]}
            >
                <Input
                    placeholder="Имя"
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name={['passport', 'last_name']}
                rules={[{required: true, message: 'Данное поле обязательно для заполнения.'}]}
            >
                <Input 
                    placeholder="Фамилия"
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name={['passport', 'surname']}
                required={false}
            >
                <Input 
                    placeholder="Отчество"
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name={['passport', 'birth_address']}
                required={false}
            >
                <Input.TextArea
                    placeholder="Адрес рождения"
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name={['passport', 'series_number']}
                rules={[{required: true, message: 'Данное поле обязательно для заполнения.'}]}
            >
                <Input
                    type="number"
                    placeholder="Серия и номер"
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name={['passport', 'issued_date']}
                rules={[{required: true, message: 'Данное поле обязательно для заполнения.'}]}
            >
                <Input
                    type="date"
                    placeholder="Дата выдачи"
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name={['passport', 'issued_by']}
                rules={[{required: true, message: 'Данное поле обязательно для заполнения.'}]}
            >
                <Input
                    placeholder="Выдан"
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name={['passport', 'department_code']}
                rules={[{required: true, message: 'Данное поле обязательно для заполнения.'}]}
            >
                <Input
                    type="number"
                    placeholder="Код подразделения"
                />
            </Form.Item>


            <Form.Item
                hasFeedback
                name={['passport', 'gender']}
                rules={[{required: true, message: 'Данное поле обязательно для заполнения.'}]}
            >
                <Select
                    placeholder='Пол'
                    allowClear
                    options={[
                        {
                            label: 'мужской',
                            value: 'male',
                        },
                        {
                            label: 'женский',
                            value: 'female',
                        }
                    ]}
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name={['passport', 'date_of_birth']}
                rules={[{required: true, message: 'Данное поле обязательно для заполнения.'}]}
            >
                <Input
                    type="date"
                    placeholder="Дата рождения"
                />
            </Form.Item>
        </div>
    )

    const renderGeneralTab = () => (
        <div className="scrollable-group form-tab">
            <Form.Item
                hasFeedback
                name='first_name'
                rules={[{required: true, message: 'Данное поле обязательно для заполнения.'}]}
            >
                <Input 
                    placeholder="Имя"
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name='last_name'
                rules={[{required: true, message: 'Данное поле обязательно для заполнения.'}]}
            >
                <Input
                    placeholder="Фамилия"
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name='surname'
                required={false}
            >
                <Input 
                    placeholder="Отчество"
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name="date_of_birth"
                rules={[{required: true, message: 'Данное поле обязательно для заполнения.'}]}
            >
                <Input
                    type="date"
                    placeholder="Дата рождения"
                    
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name='email'
                rules={[{required: true, message: 'Данное поле обязательно для заполнения.'}]}
            >
                <Input
                    placeholder="Эл. почта"
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name='address'
                rules={[{required: true, message: 'Данное поле обязательно для заполнения.'}]}
            >
                <Input.TextArea
                    placeholder="Адрес проживания"
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name='gender'
                rules={[{required: true, message: 'Данное поле обязательно для заполнения.'}]}
            >
                <Select
                    placeholder='Пол'
                    allowClear
                    options={[
                        {
                            label: 'мужской',
                            value: 'male',
                        },
                        {
                            label: 'женский',
                            value: 'female',
                        }
                    ]}
                />
            </Form.Item>
        </div>
    )

    const renderMedPolicyTab = () => (
        <div className="scrollable-group form-tab">
            <Form.Item
                hasFeedback
                name={['insurance_policy', 'number']}
                rules={[{required: true, message: 'Данное поле обязательно для заполнения.'}]}
            >
                <Input
                    type="number"
                    placeholder="Номер"
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name={['insurance_policy', 'company', 'name']}
                rules={[{required: true, message: 'Данное поле обязательно для заполнения.'}]}
            >
                <Input
                    placeholder="Страховая компания"
                    
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name={['insurance_policy', 'date_created']}
                rules={[{required: true, message: 'Данное поле обязательно для заполнения.'}]}
            >
                <Input
                    type="date"
                    placeholder="Дата создания"
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name={['insurance_policy', 'date_expires']}
                rules={[{required: true, message: 'Данное поле обязательно для заполнения.'}]}
            >
                <Input
                    type="date"
                    placeholder="Дата окончания действия"
                />
            </Form.Item>
        </div>
    )

    return (
        <AuthorizedLayout onSearch={handleSearch}>
            <div className="NewPatient">
                <Divider>
                    <h2>Меню регистрации пациента</h2>
                </Divider>
                
                <div className="form">
                    <Form
                        layout="horizontal"
                        style={{ maxWidth: 400 }}
                        onFinish={handleSubmit}
                        form={form}
                    >
                        <Tabs
                            onChange={setSelectedTab}
                            activeKey={selectedTab}
                            items={[
                                {
                                    label: 'Основные данные',
                                    key: 'general',
                                    children: renderGeneralTab(),
                                },
                                {
                                    label: 'Паспорт',
                                    key: 'passport',
                                    children: renderPassportTab(),
                                },
                                {
                                    label: 'Медицинский полис',
                                    key: 'med_policy',
                                    children: renderMedPolicyTab(),
                                }
                            ]}
                        />
                        
                        <Form.Item className="form-button">
                            {!!nextTab 
                                ?
                                    <Button 
                                        onClick={handleNextTab}
                                        type="default"
                                        block
                                    >
                                        Далее
                                    </Button>
                                :
                                    <Button 
                                        htmlType="submit"
                                        type="primary"
                                        block
                                    >
                                        Зарегистрировать пациента
                                    </Button>
                            }
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </AuthorizedLayout>
    )
}