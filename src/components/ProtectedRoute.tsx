import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchAuthState } from "../fetch/fetchAuth.ts";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading.tsx";
import { useLoginStore } from "../store/useLoginStore.ts";

interface IProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: IProps) {
  const navigate = useNavigate();

  //token 값 불러오기
  const { token, setToken, isLogin, setIsLogin } = useLoginStore((state) => ({
    token: state.token,
    setToken: state.setToken,
    isLogin: state.isLogin,
    setIsLogin: state.setIsLogin,
  }));
  const { isLoading, isError } = useQuery(
    ["authState", token],
    () => fetchAuthState(token),
    {
      retry: false,
      enabled: !!token,
    },
  );
  useEffect(() => {
    console.log(token);
    if (token === "") navigate("/login");
    if (isError) {
      console.log("isError !!", isError);
      setToken(""); //토큰 삭제
      isLogin ? setIsLogin(false) : null; //로그인 상태 해제
      navigate("/login"); //로그인 페이지 이동
    }
    //로그인 정상 상태가 아닐떄
  }, [isLoading]);

  return <>{isLoading || isError || token === "" ? <Loading /> : children}</>;
}
