import { TLoginModel, TRegistrationModel, TUser } from '../Types';
import { Navigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { fetchApi, HttpMethods } from './ApiProvider';
import ts from 'typescript';
import { useEffect } from 'react';

export function useAuth() {
    const signInHook = useSignIn();
    const signOutHook = useSignOut();
    const authUserHook = useAuthUser<TUser>();
    const isAuthenticatedHook = useIsAuthenticated();
    const authHeaderHook = useAuthHeader();

    const signIn = (token: string, user: TUser) => {
        user.photo = user.photo.replaceAll('\\', '/');

        return signInHook({
            auth: {
                token: token,
                type: 'Bearer'
            },
            userState: user
        })
    }

    const signOut = () => {
        return signOutHook();
    }

    async function refreshUser() {
        if (!authHeaderHook || !isAuthenticatedHook) {
            return
        }

        const data = await fetchApi<any, any>({
            url: 'users/me',
            method: HttpMethods.GET,
        })

        if (!!data) {
            signIn(
                authHeaderHook.split(' ')[1],
                data
            )
        }
    }

    async function authorize(data: TLoginModel) {
        const formData = new FormData()

        Object.keys(data).forEach((key: any) => {
            // @ts-ignore
            formData.append(key, data[key])
        })

        const tokenData = await fetchApi<any, any>({
            url: `users/token`,
            method: HttpMethods.POST,
            data: formData,
            headers: {}
        })

        const authToken = tokenData.access_token;

        const userData = await fetchApi<any, TUser>({
            url: 'users/me',
            method: HttpMethods.GET,
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })

        return {authToken, userData}
    }

    async function registration(data: TRegistrationModel) {
        return await fetchApi<TRegistrationModel, TUser>({
            url: 'users/register',
            method: HttpMethods.POST,
            data: data
        })
    }

    useEffect(() => {
        refreshUser()
    }, [])

    return {
        signIn,
        signOut,
        authorize,
        registration,
        refreshUser,
        user: authUserHook,
        isAuthenticated: isAuthenticatedHook,
        token: authHeaderHook?.split(' ')?.[1],
    }
}

interface IRestrictAuthenticated {
    children: React.ReactElement | React.ReactElement[]
}

export function RestrictAuthenticated({children}: IRestrictAuthenticated) {
    const { isAuthenticated } = useAuth();
    
    if (!!isAuthenticated) {
        return <Navigate to='/profile/' />
    }

    return <>
        {children}
    </>
}