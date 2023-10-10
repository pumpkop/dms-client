import {createBrowserRouter, RouterProvider} from "react-router-dom";
import styled, {createGlobalStyle} from "styled-components";
import reset from "styled-reset";
import './App.css';
import Layout from "./components/Layout.jsx";
import Members from "./components/Members.jsx";
import Login from "./components/Login.jsx";
import Join from "./components/Join.jsx";
import Board from "./components/Board.jsx";
import {useEffect, useState} from "react";
import Loading from "./components/Loading.jsx";
import {auth} from "../firebase.client.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {Error} from "./components/Error.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute><Layout/></ProtectedRoute>,
        children: [
            {
                path: '',
                element: <Board/>
            },
            {
                path: 'members',
                element: <Members/>
            }
        ],
        errorElement : <Error />
    },
    {
        path: 'login',
        element: <Login/>,
        errorElement : <Error />
    },
    {
        path: 'join',
        element: <Join/>,
        errorElement : <Error />
    }
])

const GlobalStyles = createGlobalStyle`
  ${reset}

  ;

  * {
    box-sizing: border-box;
  }
`
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const isAuth = async () => {
        //로그인 체크
        await auth.authStateReady();
        setIsLoading(false);
    }
    useEffect(() => {
        isAuth();
    }, []);
    return (
        <Wrapper>
            <GlobalStyles/>
            {isLoading ? <Loading/> : <RouterProvider router={router}/>}
        </Wrapper>
    )
}

export default App
