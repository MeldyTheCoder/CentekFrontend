import { TLoginModel, TRegistrationModel, TUser } from '../Types';
import { Navigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { fetchApi, HttpMethods } from './ApiProvider';

export function useAuth() {
    const signInHook = useSignIn();
    const signOutHook = useSignOut();
    const authUserHook = useAuthUser<TUser>();
    const isAuthenticatedHook = useIsAuthenticated();
    const authHeaderHook = useAuthHeader();

    const signIn = (token: string, user: TUser, refresh: string) => {
        return signInHook({
            auth: {
                token: token,
                type: 'Bearer'
            },
            refresh: refresh,
            userState: user
        })
    }

    const signOut = () => {
        return signOutHook();
    }

    async function authorize(data: TLoginModel) {
        const tokenData = await fetchApi<TLoginModel, any>({
            url: 'auth/jwt/create',
            method: HttpMethods.POST,
            data: data,
            headers: {}
        })

        const authToken = tokenData.access;
        const refreshToken = tokenData.refresh;

        const userData = await fetchApi<any, TUser>({
            url: 'auth/users/me',
            method: HttpMethods.GET,
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })

        return {authToken, userData, refreshToken}
    }

    async function registration(data: TRegistrationModel) {
        return await fetchApi<TRegistrationModel, TUser>({
            url: 'auth/users/',
            method: HttpMethods.POST,
            data: data
        })
    }

    return {
        signIn,
        signOut,
        authorize,
        registration,
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