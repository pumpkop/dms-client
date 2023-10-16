import React from "react";
import { useQuery } from "react-query";
import { fetchAuthState } from "../fetch/fetchAuth.ts";
import { tokenStore } from "../store/tokenStore.ts";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading.tsx";

interface IProps {
  children: React.ReactNode;
}

// interface IResponse {
//   code: number;
//   message: string;
// }
//
// interface IAuthState {
//   isLoading: boolean;
//   isError: boolean;
//   error: IResponse;
//   data: object;
// }

export default function ProtectedRoute({ children }: IProps) {
  const navigate = useNavigate();
  const { token, changeToken, isLogin, changeLoginState } = tokenStore(
    (state) => ({
      token: state.token,
      changeToken: state.changeToken,
      isLogin: state.isLogin,
      changeLoginState: state.changeLoginState,
    }),
  );
  //fetch
  if (!token) navigate("/login");

  const { isLoading, isError, data } = useQuery(
    ["authState", "test57"],
    () =>
      fetchAuthState(
        "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ0ZXN0NTciLCJhdXRoIjoiUk9MRV9TT0ZUQ0lUWSxST0xFX1VTRVIiLCJleHAiOjE2OTc0NDUyMzZ9.gfdofnafP-SKKF26mTatn2MjoAcpujxh4HKZ-vLPdCe11mSXgeUFUdVrjd3KIlGNiUAHsCytM4dtX4f7LFx16zCFoAIU1dY-wxfuEwKHgZq-_1_-VBcolhpQyXazvrYOC7IFIIAFtqyS55gudsZsQGxSl3x7lTtLyu1TI7bLQoL3MG-RB6Z6cA4EICuuskto5um2dzBXQLR3T8dykklYca-RAKpvsnWSAD5LN68v2rNPV3ySpHqvHMG2YJ-cfRZuOK8FBgr70OWTddlx1B9ZBvkSbCPpAhxPd0YsxCKT5JPBVEm07zWagsX-hGSV-jbIORTGLHj1ISjs0XA-uhw-YA",
      ),
    {
      retry: false,
      enabled: false,
    },
  );
  if (isError) {
    changeToken("");
    navigate("/login");
  }

  return <>{isLoading ? <Loading /> : children}</>;
}
