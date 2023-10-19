import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Checkbox,
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
import styled from "styled-components";
import { useLoginStore } from "../store/useLoginStore.ts";
import { useForm, useWatch } from "react-hook-form";
import { useQuery } from "react-query";
import { fetchAuthJoin } from "../fetch/fetchAuth.ts";
import useNiceAuth from "../hooks/useNiceAuth.ts";
import { AxiosError } from "axios";

const NiceAuth = styled.div`
  display: flex;
  align-items: center;
`;
const NiceAuthButton = styled.button`
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
  flex: 0 0 100px;
  height: 40px;
  cursor: pointer;
`;
const Remembers = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface IJoinForm {
  code: string;
  id: string;
  password: string;
  password_check: string;
  phone: string;
  email: string;
  remember1: boolean;
  remember2: boolean;
  extraError: string;
}
interface IToken {
  accessToken: string;
  refreshToken: string;
}
interface IJoinResponse {
  code: string;
  message: string;
  token: IToken;
}

export default function Join() {
  const navigate = useNavigate();
  const [niceAuth] = useNiceAuth({ val: "", phone: "", name: "", birth: "" });
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    control,
  } = useForm<IJoinForm>({
    mode: "onSubmit",
    defaultValues: {
      code: "",
      id: "",
      password: "",
      phone: "",
      email: "",
    },
  });

  const { isLogin, setToken, setIsLogin } = useLoginStore((state) => ({
    isLogin: state.isLogin,
    setToken: state.setToken,
    setIsLogin: state.setIsLogin,
  }));
  const { code, id, password, phone, email, extraError } = useWatch({
    control,
  });

  const { refetch, remove } = useQuery(
    ["fetchAuthJoin", id],
    () => fetchAuthJoin({ code, id, password, phone, email }),
    {
      retry: false,
      enabled: false,
    },
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //공백 제거
    e.preventDefault();
    const { name, value } = e.target;
    if (
      name === "code" ||
      name === "id" ||
      name === "password" ||
      name === "password_check" ||
      name === "phone" ||
      name === "email"
    ) {
      setValue(name, value.replace(/\s/, ""));
    }
  };

  const onRemember = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, checked },
    } = e;
    if (name === "remember1" || name === "remember2") {
      setValue(name, checked);
    }
  };

  const onAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(e);
    window.name = "popupParent";
    window.open(
      "https://webtest.softcity.co.kr/nice?kind=nice",
      "안심본인인증",
      "width=490, height=800",
    ); //shop2 본인인증
  };
  const onSubmit = async () => {
    const { isError, error, data } = await refetch();
    if (isError) {
      if (error instanceof AxiosError) {
        remove();
        setValue("extraError", error.message);
        return;
      }
    }
    console.log(data);
    const { code }: IJoinResponse = data;
    if (code == "200") {
      setIsLogin(true);
      setValue("extraError", "");
      // setToken(accessToken);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (isLogin) {
      //로그인 상태에서 url 접속시 로그인 해제
      setIsLogin(false);
      setToken("");
    }
  }, []);

  return (
    <Wrapper width={"800px"}>
      <Title>
        <Logo
          src="https://softcity.blob.core.windows.net/public/images/logo_qna_logo.png"
          alt="경영박사"
        />
        <Text>회원 정보 입력</Text>
      </Title>
      <Form onSubmit={handleSubmit(onSubmit)} width="420px">
        <Input
          {...register("code", {
            onChange: onChange,
            required: "딜러코드를 입력해 주세요",
          })}
          width="420px"
          placeholder="딜러코드"
          maxLength={50}
        />
        {errors.code ? <ErrorText>{errors.code.message}</ErrorText> : null}
        <Input
          {...register("id", {
            onChange: onChange,
            required: "아이디를 입력해 주세요",
          })}
          width="420px"
          placeholder="아이디"
          maxLength={50}
        />
        {errors.id ? <ErrorText>{errors.id.message}</ErrorText> : null}
        <Input
          {...register("password", {
            onChange: onChange,
            required: "비밀번호를 입력해 주세요",
          })}
          type="password"
          width="420px"
          placeholder="비밀번호"
          maxLength={50}
        />
        {errors.password ? (
          <ErrorText>{errors.password.message}</ErrorText>
        ) : null}
        <Input
          {...register("password_check", {
            onChange: onChange,
            required: "확인용 비밀번호를 입력해 주세요",
            validate: (password_check) => {
              if (getValues("password") !== password_check) {
                return "비밀번호가 일치하지 않습니다";
              }
            },
          })}
          type="password"
          width="420px"
          placeholder="비밀번호 확인"
          maxLength={50}
        />
        {errors.password_check ? (
          <ErrorText>{errors.password_check.message}</ErrorText>
        ) : null}
        <NiceAuth>
          <Input
            {...register("phone", {
              onChange: onChange,
              required: "휴대폰번호를 입력해 주세요",
              // pattern: {
              //   value: /^\d{3}-\d{3,4}-\d{4}$/,
              //   message: "휴대폰 형식에 맞게 입력해주세요",
              // },
              validate: (phone) => {
                // if (niceAuth.phone === "") {
                //   return "본인인증을 진행하셔야 합니다.";
                // }
                // if (niceAuth.phone !== phone) {
                //   return "본인인증이 일치하지 않습니다.";
                // }
              },
            })}
            width="420px"
            placeholder="휴대폰번호"
            maxLength={13}
          />
          <NiceAuthButton onClick={onAuth}>본인인증</NiceAuthButton>
        </NiceAuth>
        {errors.phone ? <ErrorText>{errors.phone.message}</ErrorText> : null}
        <Input
          {...register("email", {
            onChange: onChange,
            required: "이메일을 입력해 주세요",
            // pattern: {
            //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            //   message: "이메일을 형식에 맞게 입력해주세요.",
            // },
          })}
          type="text"
          width="420px"
          placeholder="이메일"
          maxLength={70}
        />
        {errors.email ? <ErrorText>{errors.email.message}</ErrorText> : null}
        <Remembers>
          <Remember mb="5px">
            <Checkbox
              {...register("remember1", {
                onChange: onRemember,
                required: "이용약관에 동의하셔야 서비스 이용이 가능합니다",
                validate: (remember) => {
                  if (!remember) {
                    return "이용약관에 동의하셔야 서비스 이용이 가능합니다";
                  }
                },
              })}
              id="remember1"
              type="checkbox"
              defaultChecked={false}
            />
            <Label htmlFor="remember1" flex="0 0 770px">
              (필수) 회원 가입 시 등록 정보가 본사와 해당 딜러 관리자에게
              전송되며, 승인 후 로그인 가능합니다
            </Label>
          </Remember>
          {errors.remember1 ? (
            <ErrorText>{errors.remember1.message}</ErrorText>
          ) : null}
          <Remember>
            <Checkbox
              {...register("remember2", {
                onChange: onRemember,
                required: "개인정보약관에 동의하셔야 서비스 이용이 가능합니다",
                validate: (remember) => {
                  if (!remember) {
                    return "이용약관에 동의하셔야 서비스 이용이 가능합니다";
                  }
                },
              })}
              id="remember2"
              type="checkbox"
              defaultChecked={false}
            />
            <Label htmlFor="remember2" flex="0 0 770px">
              (필수) 개인정보 약관 동의
            </Label>
          </Remember>
          {errors.remember2 ? (
            <ErrorText>{errors.remember2.message}</ErrorText>
          ) : null}
        </Remembers>
        <SubmitInput type="submit" value="회원가입" />
      </Form>
      {extraError ? <ErrorText>{extraError}</ErrorText> : null}
      <Switcher>
        <Link to="/login">로그인</Link>
      </Switcher>
    </Wrapper>
  );
}
