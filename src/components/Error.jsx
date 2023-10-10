import styled from "styled-components";
import PropTypes from "prop-types";
import {isRouteErrorResponse, useRouteError} from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;


export function Error({ code = 404, message = '페이지를 찾을 수 없습니다'}) {
    let error = useRouteError();
    let c = code;
    let m = message;
    console.error(error);

    if(error){
        if(isRouteErrorResponse(error)){
            c = error.status;
            m = error.data;
        } else {
            c = 500;
            m = error.message;
        }
    }

    return (
        <Wrapper>{c}, {m}</Wrapper>
    )
}

Error.propTypes = {
    code : PropTypes.number,
    message : PropTypes.string
}