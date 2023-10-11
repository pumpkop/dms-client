import {isRouteErrorResponse, useRouteError} from "react-router-dom"
import styled from "styled-components"

interface ErrorProps {
    code? : number,
    message? : string
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;


export function ShowError({ code = 404, message = '페이지를 찾을 수 없습니다'} : ErrorProps) {
    const error = useRouteError()
    let c : number = code
    let m : string = message
    console.error(error)

    if(error){
        if(isRouteErrorResponse(error)){
            c = error.status
            m = error.data
        } else if (error instanceof Error) {
            c = 500
            m = error.message
        }
    }

    return (
        <Wrapper>{c}, {m}</Wrapper>
    )
}