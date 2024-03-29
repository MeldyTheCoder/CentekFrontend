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

export const User = yup.object({
    id: yup.number()
        .required(
            'Поле ID не указано'
        ),

    first_name: yup.string()
        .required(
            'Поле имени не указано.'
        ),

    last_name: yup.string().notRequired(),

    email: yup.string()
        .required(
            'Поле эл.почты не указано.'
        )
        .test(
            'email-validation',
            'Указана неверная эл. почта.',
            emailTestFunction,
        ),

    password: yup.string()
        .required(
            'Поле пароля пользователя не указано.'
        ),

    role: oneOfEnum<UserRoles>(
        (UserRoles as any)
    ),

    date_joined: yup.date().notRequired(),
    
    last_login: yup.date().notRequired(),
})

export const Specialty = yup.object({
    id: yup.number().required(
        'Поле ID не указано'
    ),

    name: yup.string().required(
        'Поле названия специальности не указано.'
    )
})

export const Doctor = yup.object({
    id: yup.number().required(
        'Поле ID не указано'
    ),
    
    user: User.required(
        'Поле пользователя не указано.'
    ),

    specialty: Specialty.required(
        'Специальность доктора не указана.'
    ),

    first_name: yup.string().required(
        'Поле имени доктора не указано.'
    ),

    last_name: yup.string().required(
        'Поле фамилии доктора не указано.'
    ),

    surname: yup.string().notRequired(),

    description: yup.string()
        .notRequired()
        .max(256, 'Длина описания должна быть не более 256 символов.')
    
})

export const Consultation = yup.object({
    id: yup.number().required(
        'Поле ID не было указано.'
    ),

    from_doctor: Doctor.required(
        'Доктор не указан.'
    ),

    to_user: User.required(
        'Пользователь не указан.'
    ),

    date_created: yup.date().required(
        'Поле даты создания консультации не указано.'
    )
})

export const ConsulatationMessage = yup.object({
    id: yup.number().required(
        'Поле ID не было указано.'
    ),

    from_user: User.required(
        'Отправитель сообщения не был указан.'
    ),

    consulatation: Consultation.required(
        'Консультация не была указана.'
    ),

    message: yup.string().notRequired(),

    attachments: yup.array(
        yup.string()
            .required()
            .test(
                'url-validation',
                'Указана неверная ссылка на вложение.',
                urlIsValid,
            )
    )
})


export const Review = yup.object({
    id: yup.number().required(
        'Поле ID не было указано.'
    ),

    from_user: User.required(
        'Поле пользователя не указано.'
    ),

    to_doctor: Doctor.required(
        'Поле доктора не указано.'
    ),

    rate: yup.number()
        .required(
            'Поле оценки доктора не указано.'
        )
        .min(1, 'Минимальная оценка - 1.')
        .max(5, 'Максимальная оценка - 5'),

    message: yup.string().notRequired()
})


export const LoginModel = yup.object({
    email: yup.string()
        .required(
            'Данное поле обязательно для заполнения.'
        )
        .test(
            'email-validation',
            'Указан неверный адрес эл.почты.',
            emailTestFunction
        ),
    password: yup.string().required(
        'Данное поле обязательно для заполнения.'
    )
})

export const RegistrationModel = yup.object({
    email: yup.string()
        .required(
            'Данное поле обязательно для заполнения.'
        )
        .test(
            'email-validation',
            'Указан неверный адрес эл.почты.',
            emailTestFunction
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
        .notRequired()
        .test(
            'fisrt-name-validation',
            'Указано неверное имя.',
            nameIsValid,
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
        )
})

type TDoctor = yup.InferType<typeof Doctor>
type TUser = yup.InferType<typeof User>
type TSpecialty = yup.InferType<typeof Specialty>
type TConsultation = yup.InferType<typeof Consultation>
type TConsultationMessage = yup.InferType<typeof ConsulatationMessage>
type TReview = yup.InferType<typeof Review>

type TLoginModel = yup.InferType<typeof LoginModel>
type TRegistrationModel = yup.InferType<typeof RegistrationModel>

export type {TDoctor, TUser, TSpecialty, TConsultation, TConsultationMessage, TReview, TLoginModel, TRegistrationModel}