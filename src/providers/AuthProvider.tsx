import { useContext, createContext, useEffect, useState } from 'react';
import { TLoginModel, TUser, TRegistrationModel } from '../Types';
import { fetchApi, HttpMethods } from './ApiProvider';
import { json } from 'stream/consumers';
import { AxiosError } from 'axios';
import { log } from 'console';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext<any>(null);


export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            'AuthContext вызван не внутри AuthProvider.'
        );
    }

    return context;
}

interface IAuthProvider {
    children: React.ReactElement | React.ReactElement[]
}


export function RequiresAuth({children}: IAuthProvider) {
    const { loggedIn } = useAuth();

    if (!loggedIn) {
        return <Navigate to='/login/' />
    }

    return children
}

export function AuthProvider ({children}: IAuthProvider) {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userData, setUserData] = useState<TUser>();

    function saveToLocalStorage(tokenData: any) {
        localStorage.setItem('site', JSON.stringify(tokenData))
    }

    function getFromLocalStorage() {
        return JSON.parse(localStorage.getItem('site')!);
    }

    function clearLocalStorage() {
        return localStorage.removeItem('site')
    }

    async function getMe() {
        const token = getFromLocalStorage()?.token
        
        return await fetchApi<any, TUser>({
            url: 'http://localhost:8000/me/',
            method: HttpMethods.GET,
        })
    }

    async function getToken(data: TLoginModel) {
        return await fetchApi<TLoginModel, TUser>({
            url: 'token/',
            method: HttpMethods.POST,
            data: data
        })
    }

    async function authenticate(data: any) {
        saveToLocalStorage(data);
        setLoggedIn(true);
        
        getMe()
            .then(
                (response: TUser) => {
                    setUserData(response)
                }
            )
            .catch(
                (_: AxiosError) => {
                    logout()
                }
            )       
    }

    async function registration(data: TRegistrationModel) {
        return await fetchApi<TRegistrationModel, TUser>({
            url: 'registration/',
            method: HttpMethods.POST,
            data: data
        })
    }

    async function logout() {
        clearLocalStorage();
        setLoggedIn(false);
        setUserData(undefined);

    }

    useEffect(() => {
        const localData = getFromLocalStorage();

        if (!localData) {
            logout();
            return;
        }

        const intervalId = setInterval(() => {
            getMe()
                .catch(
                    (_: AxiosError) => {
                       logout()
                    }
                )
                .then(
                    (response: any) => {
                        setLoggedIn(true);
                        setUserData(response);
                    }
                )
        }, 5000) 

        return () => clearInterval(intervalId)
    }, [])

    return (
        <AuthContext.Provider value={{
            getToken,
            registration,
            loggedIn,
            userData
        }}>
            {children}
        </AuthContext.Provider>
    )
}