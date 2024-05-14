import * as yup from 'yup';


const emailTestFunction = (value: string): boolean => {
    const emailRegex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;

    return emailRegex.test(value);
}

const nameIsValid = (value?: string | null): boolean => {
    const nameRegex = /^[А-ЯЁ][а-яё]+$/gi;

    return nameRegex.test(value!)
}

const passwordRepeatMismatchTest = (value: string, schema: any): boolean => {
    return !schema.parent.password || (!!schema.parent.password && schema.parent.password === value)
}

const passwordMismatchTest = (value: string, schema: any): boolean => {
    return !schema.parent.password_repeat || (!!schema.parent.password_repeat && schema.parent.password_repeat === value)
}

const urlIsValid = (value: string): boolean => {
    const urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i
    
    return urlRegex.test(value)
}   

function oneOfEnum<T extends Object>(enumObject: T) {
    return yup.mixed<T>().oneOf(Object.values(enumObject));
}

export enum UserRoles {
    DOCTOR = 1,
    SUPERUSER = 2,
    USER = 3,
}

const genderField = yup.string()
    .required('Поле пола пациента не указано.')
    .oneOf(
        ['male', 'female'],
        'Указано неверное значение для пола.'
    )

export type TDiagnosis = {
    id: number,
    name: string,
}

export type TSpeciality = {
    id: number,
    name: string,
}

export type TUser = {
    id: number,
    first_name: string,
    last_name: string,
    surname?: string,
    username: string,
    password?: string,
    photo: string,
    date_joined: string | Date,
    last_login?: string | Date,
    speciality: TSpeciality,
    email: string,
    visits?: TVisit[],
    meetings?: TMeeting[], 
}

export type TMedCard = {
    id: number,
    date_created: string | Date,
    date_expires: string | Date,
}

export type TInsuranceCompany = {
    id: number,
    name: string,
}

export type TInsurancePolicy = {
    id: number,
    date_created: string | Date,
    date_expires: string | Date,
    number: number,
    company: TInsuranceCompany,
}

export type TPassport = {
    id: number,
    issued_by: string,
    issued_date: string | Date,
    first_name: string,
    last_name: string,
    surname?: string,
    department_code: number,
    gender: 'male' | 'female',
    date_of_birth: string | Date,
    birth_address: string,
    serias_number: number,
}


export type TPatient = {
    id: number,
    first_name: string,
    last_name: string,
    surname?: string,
    gender: 'male' | 'female',
    address: string,
    email: string,
    med_card: TMedCard,
    insurance_policy: TInsurancePolicy,
    passport: TPassport,
    date_of_birth: string | Date,
}

export type TVisit = {
    id: number,
    doctor: TUser,
    patient: TPatient,
    diagnosis: TDiagnosis,
    status: 'closed' | 'opened' | 'not_came' | 'canceled' | 'rescheduled' | 'reopened',
    date_created: string | Date,
    date_to_visit: string | Date,
}

export type TMeeting = {
    id: number,
    name: string,
    date_created: string | Date,
    type: 'laboratory_test' | 'instrumental_diagnostics' | 'drug_therapy' | 'physiotherapy' | 'surgery',
    doctor: TUser,
    patients: TPatient[],
    data: any
}

export const SpecialtyModel = yup.object({
    name: yup.string().required(
        'Поле названия специальности не указано.'
    )
})

export const InsuranceCompanyModel = yup.object({
    name: yup.string().required(
        'Поле название страховой компании не указано.'
    )
});

export const PatientInsurancePolicyModel = yup.object({
    date_created: yup.date().required(
        'Поле создания мед. полиса не указано.'
    ),

    date_expires: yup.date().required(
        'Поле срока окончания действия мед. полиса не найдено.'
    ),

    number: yup.number().required(
        'Номер мед. полиса не указан.'
    ),

    company: InsuranceCompanyModel.required(
        'Поле страховой компании не указано.'
    )
})

export const PatientPassportModel = yup.object({
    issued_by: yup.string().required(
        'Поле "выдан кем" не указано.'
    ),

    first_name: yup.string().required(
        'Поле имени доктора не указано.'
    ),

    last_name: yup.string().required(
        'Поле фамилии доктора не указано.'
    ),

    surname: yup.string().notRequired(),

    issued_date: yup.date().required(
        'Поле даты выдачи паспорта не указано.'
    ),

    department_code: yup.number().required(
        'Поле кода подразделения не указано.'
    ),

    gender: genderField,

    date_of_birth: yup.date().required(
        'Поле даты рождения не указано.'
    ),

    birth_address: yup.string().required(
        'Поле места рождения не указано.'
    ),

    serias_number: yup.number().required(
        'Поле серии и номера паспорта не указано.'
    )
})

export const PatientModel = yup.object({
    first_name: yup.string().required(
        'Поле имени доктора не указано.'
    ),

    last_name: yup.string().required(
        'Поле фамилии доктора не указано.'
    ),

    surname: yup.string().notRequired(),

    gender: genderField,

    address: yup.string().required(
        'Поле адреса проживания пациента не указано!'
    ),

    email: yup.string()
        .required(
            'Поле эл. почты пациента не указано.'
        )
        .test(
            'email-validation',
            'Указан неверный формат эл. почты!',
            emailTestFunction,
        ),

    insurance_policy: PatientInsurancePolicyModel.required(
        'Мед. полис пациента не указан.'
    ),

    passport: PatientPassportModel.required(
        'Паспортные данные пациента не указаны.'
    ),

    date_of_birth: yup.date().required(
        'Поле даты рождения пациента не указано.'
    )
})

export const DiagnosisModel = yup.object({
    name: yup.string().required(
        'Поле названия диагноза не найдено!'
    )
})

export const VisitModel = yup.object({
    date_to_visit: yup.date().required(
        'Поле даты создания '
    ),

    diagnosis: DiagnosisModel.required(
        'Диагноз пациента не указан.'
    ),

    status: yup.string().notRequired().oneOf(
        [
            'opened',  
            'closed',  
            'reopened',  
            'canceled', 
            'rescheduled',
        ],
        'Указан некорректный статус визита пациента.'
    ),
})

export const MeetingModel = yup.object({
    name: yup.string().required(
        'Поле название мероприятия не указано.',
    ),

    type: yup.string()
        .required(
            'Поле типа мероприятия не указано.'
        )
        .oneOf(
            [
                'laboratory_test',
                'instrumental_diagnostics',
                'drug_therapy',
                'physiotherapy',
                'surgery',
            ]
        )
})

export const LoginModel = yup.object({
    username: yup.string()
        .required(
            'Данное поле обязательно для заполнения.'
        ),
    password: yup.string().required(
        'Данное поле обязательно для заполнения.'
    )
})

export const RegistrationModel = yup.object({
    username: yup.string().required(
        'Данное поле обязательно для заполнения.'
    ),

    first_name: yup.string()
        .required(
            'Поле имени не заполнено.'
        )
        .test(
            'fisrt-name-validation',
            'Указано неверное имя.',
            nameIsValid,
        ),

    last_name: yup.string()
        .required(
            'Поле фамилии не указано.'
        )
        .test(
            'last-name-validation',
            'Указано неверная фамилия.',
            nameIsValid,
        ),
    
    email: yup.string()
        .required(
            'Поле эл. почты не указано.'
        )
        .test(
            'email-validation',
            'Указан неверный формат эл. почты!',
            emailTestFunction,
        ),

    password: yup.string()
        .required(
            'Данное поле обязательно для заполнения.'
        )
        .test(
            'password-mismatch',
            'Введенные пароли не совпадают.',
            passwordMismatchTest,
        ),

    password_repeat: yup.string()
        .required(
            'Данное поле обязательно для заполнения.'
        )
        .test(
            'password-mismatch',
            'Введенные пароли не совпадают.',
            passwordRepeatMismatchTest,
        ),

    speciality: SpecialtyModel.required(
        'Поле специальности не указано.'
    )
})


export type TCreatePatient = yup.InferType<typeof PatientModel>
export type TCreateMeeting = yup.InferType<typeof MeetingModel>
export type TLoginModel = yup.InferType<typeof LoginModel>
export type TRegistrationModel = yup.InferType<typeof RegistrationModel>