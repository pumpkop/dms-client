// import { Navigate } from 'react-router-dom';
// import React from 'react';
// import { useQuery } from 'react-query';
// import { authStateFetch } from '../fetch/authFetch.ts';
// import { ShowError } from './ShowError.tsx';

interface IProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: IProps) {
    // const token: string = window.localStorage.getItem('token') ?? '';
    // const { isLoading, isError, error, data } = useQuery('isLogin', () => {
    //     return authStateFetch(token);
    // });

    // if (!token) {
    //     return <Navigate to="/login" />;
    // }
    // if (isError) {
    //     return <ShowError />;
    // }
    // const isAuth = async () => {
    //     const isLogin = await authStateFetch({token});
    //     if (!isLogin) {
    //         return <Navigate to="/login"/>
    //     }
    // }
    // useEffect(() => {
    //     isAuth();
    // }, []);
    return children;
}
