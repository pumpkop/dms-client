import {useEffect, useState} from "react"
import {RouterProvider} from "react-router-dom"
import styled, {createGlobalStyle} from "styled-components"
import reset from "styled-reset"
import router from "./router/router.tsx"
import {authStateFetch} from "./fetch/authFetch.ts"
import Loading from "./components/Loading.tsx"
import {tokenStore} from "./store/tokenStore.ts"
import './App.css'

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;


function App() {
    const {token, isLogin, removeToken, changeLoginState, changeToken} = tokenStore();
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const isAuth = async () => {
        //로그인 체크
        try {
            const isLogin = await authStateFetch({token})
            if (!isLogin) {
                removeToken();
            } else {
                changeLoginState()
            }
            console.log(isLogin)
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message)
                return (
                    setError(e.message)
                )
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        isAuth()
    }, [token])

    return (
        <Wrapper>
            <GlobalStyles/>
            {isLoading ? <Loading/> : <RouterProvider router={router}/>}
        </Wrapper>
    )
}

export default App
