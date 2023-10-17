import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchAuthState } from "../fetch/fetchAuth.ts";
import { tokenStore } from "../store/tokenStore.ts";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading.tsx";

interface IProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: IProps) {
  const navigate = useNavigate();

  //token 값 불러오기
  const { token, changeToken, isLogin, setIsLogin } = tokenStore((state) => ({
    token: state.token,
    changeToken: state.changeToken,
    isLogin: state.isLogin,
    setIsLogin: state.setIsLogin,
  }));
  const { isLoading, isError, data } = useQuery(
    ["authState", token],
    () => fetchAuthState(token),
    {
      retry: false,
      enabled: true,
    },
  );
  useEffect(() => {
    console.log("data:", data);
    console.log("isLoading : ", isLoading);
    //로그인 정상 상태가 아닐떄
    if (isError || token === "") {
      console.log(isError);
      changeToken(""); //토큰 삭제
      isLogin ? setIsLogin(false) : null; //로그인 상태 해제
      // navigate("/login"); //로그인 페이지 이동
    }
  }, []);

  return <>{isLoading || isError || token === "" ? <Loading /> : children}</>;
}
