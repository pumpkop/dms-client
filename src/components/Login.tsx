import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckboxInput,
  ErrorText,
  Form,
  Input,
  Label,
  Logo,
  Remember,
  SubmitInput,
  Switcher,
  Text,
  Title,
  Wrapper,
} from "./StyledAuth.ts";
import { fetchAuthLogin } from "../fetch/fetchAuth.ts";
import { useQuery } from "react-query";
import { useLoginStore } from "../store/useLoginStore.ts";
import { useForm } from "react-hook-form";

interface ILoginForm {
  code: string;
  id: string;
  password: string;
}
interface IToken {
  accessToken: string;
  refreshToken: string;
}
interface ILoginResponse {
  code: string;
  message: string;
  token: IToken;
}
export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<ILoginForm>({
    mode: "onSubmit",
    defaultValues: {
      code: "",
      password: "",
    },
  });
  const {
    isLogin,
    setToken,
    setIsLogin,
    loginId,
    setLoginId,
    isRemember,
    setRemember,
  } = useLoginStore((state) => ({
    isLogin: state.isLogin,
    setToken: state.setToken,
    setIsLogin: state.setIsLogin,
    loginId: state.loginId,
    setLoginId: state.setLoginId,
    isRemember: state.isRemember,
    setRemember: state.setRemember,
  }));
  const { code, id, password } = getValues();
  const { isError, error, refetch, remove } = useQuery(
    ["authLogin", id],
    () => fetchAuthLogin({ code, id, password }),
    {
      retry: false,
      enabled: false,
    },
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //공백 제거
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setValue(name, value.replace(/\s/, ""));
  };
  const onRemember = () => {
    //아이디 저장
    const id = getValues("id");
    !isRemember ? setLoginId(id) : setLoginId("");
    setRemember(!isRemember);
  };
  const onSubmit = async () => {
    console.log("onSumbit");

    //로그인 전송
    const { isError, data } = await refetch();
    if (isError || !data) {
      remove();
      return;
    }
    const {
      code,
      token: { accessToken },
    }: ILoginResponse = data.data;
    if (code == "200" && accessToken !== "") {
      setIsLogin(true);
      setToken(accessToken);
      navigate("/");
    }
    console.log(data);
  };

  useEffect(() => {
    if (isLogin) {
      //로그인 상태에서 url 접속시 로그인 해제
      setIsLogin(false);
      setToken("");
    }
  }, []);

  return (
    <Wrapper width="420px">
      <Title>
        <Logo
          src="https://softcity.blob.core.windows.net/public/images/logo_qna_logo.png"
          alt="경영박사"
        />
        <Text>로그인</Text>
      </Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("code", {
            onChange: onChange,
            required: "딜러코드를 입력해 주세요",
          })}
          placeholder="딜러코드"
          maxLength={50}
        />
        {errors.code ? <ErrorText>{errors.code.message}</ErrorText> : null}

        <Input
          {...register("id", {
            onChange: onChange,
            required: "아이디를 입력해 주세요",
          })}
          defaultValue={isRemember ? loginId : ""}
          placeholder="아이디"
          maxLength={50}
        />
        {errors.id ? <ErrorText>{errors.id.message}</ErrorText> : null}

        <Input
          {...register("password", {
            onChange: onChange,
            required: "비밀번호를 입력해 주세요",
            minLength: {
              value: 4,
              message: "비밀번호는 최소 4자리 이상입력해야 합니다",
            },
          })}
          placeholder="비밀번호"
          maxLength={50}
        />
        {errors.password ? (
          <ErrorText>{errors.password.message}</ErrorText>
        ) : null}

        <Remember mt="20px">
          <CheckboxInput
            onChange={onRemember}
            type="checkbox"
            id="remember"
            name="remember"
            checked={isRemember}
          />
          <Label htmlFor="remember">아이디저장</Label>
        </Remember>
        <SubmitInput type="submit" value="로그인" />
      </Form>
      {isError ? (
        <ErrorText>
          {error.response.data.code}, {error.response.data.message}
        </ErrorText>
      ) : null}
      <Switcher>
        <Link to="/join">회원가입</Link>
      </Switcher>
    </Wrapper>
  );
}
