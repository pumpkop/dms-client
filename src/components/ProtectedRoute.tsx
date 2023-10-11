import {Navigate} from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode
}

export default function ProtectedRoute({children}: ProtectedRouteProps) {
    const token = window.sessionStorage.getItem("token") || "";
    if(!token) {
        return <Navigate to="/login"/>
    }
    // const isAuth = async () => {
    //     const isLogin = await authStateFetch({token});
    //     if (!isLogin) {
    //         return <Navigate to="/login"/>
    //     }
    // }
    // useEffect(() => {
    //     isAuth();
    // }, []);
    return children
}