import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
    TLoginModel, 
    TUser, 
    TRegistrationModel, 
    TSpeciality, 
    TVisit, 
    TDiagnosis, 
    TPatient, 
    TInsuranceCompany, 
    TMeeting,
    TCreatePatient,
    TCreateMeeting
} from '../Types';

// @ts-ignore
import Cookies from 'js-cookie';
import { error } from 'console';

export const enum HttpMethods {
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
    PUT = 'put'
}

type HeadersType = Record<string, any>
type ResponseType<Reponse> = Promise<Reponse>
type ModelOptionsType<Model> = Partial<Model>

type TFetchOptions<Data extends any> = {
    url: string,
    method: HttpMethods,
    data?: Data,
    headers?: HeadersType | AxiosHeaders
}

const ApiContext = createContext<any>(null);

interface IApiProvider {
    children: React.ReactElement | React.ReactElement[]
}

export function useApiContext() {
    const context = useContext(ApiContext);

    if (!context) {
        throw new Error(
            'Данный контекс исполузется вне ApiProvider!'
        )
    }

    return context;
}

export const getToken = () => {
    const token: string = Cookies.get('_auth')
    return token
}

const api = axios.create({
    baseURL: 'http://localhost:8080/',
    withCredentials: false,
})

api.interceptors.request.use(
    (config) => {
        const token: string = getToken();

        if (!!token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        console.log('Interceptor Error: ', error);
    }
)

export async function fetchApi<Request extends any, Response extends any>(
    options: TFetchOptions<Request>
): Promise<Response> {
    const response = await api.request<any, Response, Request>(options);

    return (response as any).data;
}

export function ApiProvider({children}: IApiProvider) {
    function useRequest<Request, Response>(options: TFetchOptions<Request>): [Response | undefined, boolean, string | undefined] {
        const [loading, setLoading] = useState<boolean>(true);
        const [data, setData] = useState<Response>();
        const [error, setError] = useState<string>();

        function pollUpdates() {
            fetchApi<Request, Response>(options)
                .then(
                    (response: any) => {
                        setData(response);
                        setLoading(false);
                    }
                )
                .catch(
                    (error: AxiosError<any, any>) => {
                        setLoading(false);
                        setError(error.response?.data?.detail || error.message)
                        console.log(error)
                    }
                )
        }

        useEffect(() => {
            pollUpdates()
        }, [])

        return [data, loading, error]
    }

    async function handledRequest<Request, Response>(options: TFetchOptions<Request>): Promise<[Response | null, string | null]> {
        try {
            const response = await fetchApi<Request, Response>(options);
            return [response, null];
        } catch (error: any) {
            const errorMessage: string = error.response?.data?.detail! || error.message! || 'Произошла неизвестная ошибка.'
            return [null, errorMessage]
        }
    }

    function useMe() {
        return useRequest<any, TUser>({
            url: 'users/me',
            method: HttpMethods.GET,
        })
    }

    function useDoctors(options: ModelOptionsType<TUser>) {
        return useRequest<ModelOptionsType<TUser>, TUser[]>({
            url: 'doctors',
            method: HttpMethods.GET,
            data: options,
        })
    }

    function useDoctor(doctorId: number) {
        return useRequest<any, TUser>({
            url: `doctors/${doctorId}`,
            method: HttpMethods.GET,
        })
    }

    function useSpecialities(options: ModelOptionsType<TSpeciality>) {
        return useRequest<ModelOptionsType<TSpeciality>, TSpeciality[]>({
            url: 'doctors/specialities',
            method: HttpMethods.GET,
        })
    }

    function useSpeciality(specialtyId: number) {
        return useRequest<any, TSpeciality>({
            url: `doctors/specialities/${specialtyId}`,
            method: HttpMethods.GET
        })
    }

    function useMeetings(options: ModelOptionsType<TMeeting>) {
        return useRequest<ModelOptionsType<TMeeting>, TMeeting[]>({
            url: 'meetings/',
            method: HttpMethods.GET,
            data: options
        })
    }


    function usePatientDiagnosis(options: {patientId: number}) {
        return useRequest<any, TDiagnosis[]>({
            url: `patients/${options.patientId}/diagnosis`,
            method: HttpMethods.GET,
        })
    }

    
    function usePatients(options: ModelOptionsType<TPatient>) {
        return useRequest<ModelOptionsType<TPatient>, TPatient[]>({
            url: `patients`,
            method: HttpMethods.GET,
        })
    }

    function useDoctorMeetings(doctorId?: number) {
        return useRequest<any, TMeeting[]>({
            url: !!doctorId ? 'doctors/meetings' : `doctors/${doctorId}/meetings`,
            method: HttpMethods.GET,
        })
    }

    function useDoctorVisits(doctorId?: number) {
        return useRequest<any, TMeeting[]>({
            url: !!doctorId ? 'doctors/visits' : `doctors/${doctorId}/visits`,
            method: HttpMethods.GET,
        })
    }

    function useDoctorPatients(doctorId?: number) {
        return useRequest<any, TMeeting[]>({
            url: !!doctorId ? 'doctors/patients' : `doctors/${doctorId}/patients`,
            method: HttpMethods.GET,
        })
    }

    async function createMeeting(options: TCreateMeeting) {
        return await handledRequest<TCreateMeeting, TMeeting>({
            url: `meetings/create`,
            method: HttpMethods.POST,
            data: options,
        })
    }

    async function deleteMeeting(meetingId: number) {
        return await handledRequest<any, TMeeting>({
            url: `meetings/${meetingId}/delete`,
            method: HttpMethods.DELETE,
        })
    }

    async function editMeeting(meetingId: number, data: ModelOptionsType<TMeeting>) {
        return await handledRequest<ModelOptionsType<TCreateMeeting>, TMeeting>({
            url: `meetings/${meetingId}/delete`,
            method: HttpMethods.PUT,
            data: data,
        })
    }

    async function addMeetingPatient(meetingId: number, patientId: number) {
        return await handledRequest<any, TMeeting>({
            url: `meetings/${meetingId}/patients/add`,
            method: HttpMethods.PUT,
            data: {
                patient_id: patientId,
            },
        })
    }

    async function removeMeetingPatient(meetingId: number, patientId: number) {
        return await handledRequest<any, TMeeting>({
            url: `meetings/${meetingId}/patients/delete`,
            method: HttpMethods.DELETE,
            data: {
                patient_id: patientId,
            }
        })
    }

    async function createPatient(options: TCreatePatient) {
        return await handledRequest<TCreatePatient, TPatient>({
            url: `patients/create`,
            method: HttpMethods.POST,
            data: options
        })
    }

    async function removePatient(patientId: number) {
        return await handledRequest<any, TPatient>({
            url: `patients/${patientId}/delete`,
            method: HttpMethods.DELETE,
        })
    }

    



    return (
        <ApiContext.Provider value={{
            useMe,
            useDoctor,
            useDoctors,
            useMeetings,
            useSpecialities,
            useSpeciality,
            usePatientDiagnosis,
            usePatients,
            useDoctorMeetings,
            useDoctorVisits,
            useDoctorPatients,
            createMeeting,
            deleteMeeting,
            editMeeting,
            addMeetingPatient,
            removeMeetingPatient,
            createPatient,
            removePatient,
            fetchApi,
        }}>
            {children}
        </ApiContext.Provider>
    )
}