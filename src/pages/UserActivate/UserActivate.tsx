import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import { useNavigate, useParams } from 'react-router-dom';
import { HttpMethods, fetchApi } from '../../providers/ApiProvider';

export function ActivateAccount() {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    
    const validateUrl = async () => { 
        try { 
            await fetchApi<any, any>({
                url: `/api/v1/auth/users/activation/`,
                data: {
                    uid,
                    token
                },
                method: HttpMethods.POST
            })

            return navigate('/login/');
        } catch (error) {
            console.log(error);
            return <p>Ошибка активации аккаунта</p>
        } 
    }

    useEffect(() => {
        validateUrl()
    }, [])

    return null;
} 