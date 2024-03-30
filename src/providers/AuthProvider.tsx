import { useContext, createContext, useEffect, useState } from 'react';
import { TLoginModel, TUser, TRegistrationModel } from '../Types';
import { fetchApi, HttpMethods } from './ApiProvider';
import { json } from 'stream/consumers';
import { AxiosError } from 'axios';
import { log } from 'console';
import { Navigate } from 'react-router-dom';
import { wait } from '@testing-library/user-event/dist/utils';

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

    return <>
        {children}
    </>
}

export function RestrictAuthenticated({children}: IAuthProvider) {
    const { loggedIn } = useAuth();

    if (loggedIn) {
        return <Navigate to='/profile/' />
    }

    return <>
        {children}
    </>
}
export function AuthProvider ({children}: IAuthProvider) {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    function saveToLocalStorage(token: string) {
        localStorage.setItem('site', token)
    }

    function getFromLocalStorage() {
        return localStorage.getItem('site')
    }

    function clearLocalStorage() {
        return localStorage.removeItem('site')
    }

    async function getMe() {
        const token = getFromLocalStorage()
        
        return await fetchApi<any, TUser>({
            url: 'api/v1/authenticated_users/',
            method: HttpMethods.GET,
            headers: {
                'Authorization': `Token ${token}`
            }
        })
    }

    async function validateToken() {
        try {
            const response = await getMe();
            return true;
        } catch (error) {
            return false;
        }
    }

    async function getToken(data: TLoginModel) {
        return await fetchApi<TLoginModel, TUser>({
            url: 'auth/token/login',
            method: HttpMethods.POST,
            data: data,
            headers: {}
        })
    }

    function authenticate(token: string) {
        saveToLocalStorage(token);
    }

    async function registration(data: TRegistrationModel) {
        return await fetchApi<TRegistrationModel, TUser>({
            url: 'auth/users/',
            method: HttpMethods.POST,
            data: data
        })
    }

    async function logout() {
        setLoggedIn(false);
        clearLocalStorage();

    }

    useEffect(() => {
        const localData = getFromLocalStorage();

        if (!localData) {
            logout();
        
        } else {
            setLoggedIn(true);

            validateToken().then(
                (isValid: boolean) => {
                    if (!isValid) {
                        logout()
                    }
                }
            )
        }
       
    }, [])

    return (
        <AuthContext.Provider value={{
            getToken,
            registration,
            authenticate,
            logout,
            loggedIn,
        }}>
            {children}
        </AuthContext.Provider>
    )
}