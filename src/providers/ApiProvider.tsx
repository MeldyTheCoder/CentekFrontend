import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { TDoctor, TLoginModel, TReview, TSpecialty, TUser, TRegistrationModel } from '../Types';

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

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    withCredentials: true,
})

const getToken = () => {
    return JSON.parse(localStorage.getItem('token')!)
}

function authorizationIntercepter(config: any) {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
}

api.interceptors.request.use(authorizationIntercepter)

export function fetchApi<Request, Response>(options: TFetchOptions<Request>): ResponseType<Response> {
    return api<any, Response, Request>(options)
}

export function ApiProvider({children}: IApiProvider) {
    const POLLING_INTERVAL = 4000;

    function useRequest<Request, Response>(options: TFetchOptions<Request>): [Response | undefined, boolean] {
        const [loading, setLoading] = useState<boolean>(true);
        const [data, setData] = useState<Response>();

        function pollUpdates() {
            fetchApi<Request, Response>(options)
                .then(
                    (response: Response) => {
                        setData(response);
                        setLoading(false);
                    }
                )
                .catch(
                    (error: AxiosError) => {
                        setLoading(false);
                        console.log(error)
                    }
                )
        }

        useEffect(() => {
            pollUpdates()

            const intervalId = setInterval(() => {
                pollUpdates()
            }, POLLING_INTERVAL)

            return () => clearInterval(intervalId)
        }, [])

        return [data, loading]
    }

    function useLogin(options: TLoginModel) {
        return useRequest<TLoginModel, TUser>({
            url: 'token/',
            method: HttpMethods.POST,
            data: options
        })
    }

    function useRegistration(options: TRegistrationModel) {
        return useRequest<TRegistrationModel, TUser>({
            url: 'registration/',
            method: HttpMethods.POST,
            data: options
        })
    }

    function useDoctors(options: ModelOptionsType<TDoctor>) {
        return useRequest<ModelOptionsType<TDoctor>, TDoctor[]>({
            url: 'doctors/',
            method: HttpMethods.GET,
            data: options,
        })
    }

    function useDoctor(doctorId: number) {
        return useRequest<any, TDoctor>({
            url: `doctors/${doctorId}`,
            method: HttpMethods.GET,
        })
    }

    function useSpecialties(options: ModelOptionsType<TSpecialty>) {
        return useRequest<ModelOptionsType<TSpecialty>, TSpecialty[]>({
            url: 'specialties/',
            method: HttpMethods.GET,
            data: options
        })
    }

    function useSpecialty(specialtyId: number) {
        return useRequest<any, TSpecialty>({
            url: `specialties/${specialtyId}`,
            method: HttpMethods.GET
        })
    }

    function useReviews(options: ModelOptionsType<TReview>) {
        return useRequest<ModelOptionsType<TReview>, TReview[]>({
            url: 'reviews/',
            method: HttpMethods.GET,
            data: options
        })
    }

    return (
        <ApiContext.Provider value={{
            useDoctor,
            useDoctors,
            useSpecialties,
            useSpecialty,
            useReviews,
            fetchApi,
        }}>
            {children}
        </ApiContext.Provider>
    )
}