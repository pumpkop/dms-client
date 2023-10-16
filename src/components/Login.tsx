import React, { useEffect, useState } from "react";
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
import { tokenStore } from "../store/tokenStore.ts";
import { fetchAuthLogin } from "../fetch/fetchAuth.ts";
import { useQuery } from "react-query";

export default function Login() {
  const { removeToken } = tokenStore((state) => ({
    removeToken: state.removeToken,
  }));

  useEffect(() => {
    removeToken();
  }, []);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    let noWhiteSpace = value;
    noWhiteSpace = noWhiteSpace.replace(/\s/, "");

    if (name === "code") {
      setCode(noWhiteSpace);
    } else if (name === "id") {
      setId(noWhiteSpace);
    } else if (name === "password") {
      setPassword(noWhiteSpace);
    }
    console.log(code, id, password);
  };
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log(e);
    setRemember(!remember);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || code || id === "" || password === "") return;
    try {
      setIsLoading(true);

      useQuery(
        ["authLogin", id],
        () => fetchAuthLogin({ code, id, password }),
        {
          retry: false,
          enabled: false,
        },
      );

      navigate("/");
    } catch (e) {
      console.log(e);
      const result = (e as Error).message;
      setError(result);
    } finally {
      setIsLoading(false);
    }
    console.log(code, id, password);
  };
  return (
    <Wrapper w="420px">
      <Title>
        <Logo
          src="https://softcity.blob.core.windows.net/public/images/logo_qna_logo.png"
          alt="경영박사"
        />
        <Text>로그인</Text>
      </Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="code"
          placeholder="딜러코드"
          // required
        />
        <Input
          onChange={onChange}
          name="id"
          value={id}
          placeholder="아이디"
          required
        />
        <Input
          onChange={onChange}
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호"
          required
        />
        <Remember mt="20px">
          <CheckboxInput
            onClick={onClick}
            type="checkbox"
            id="remember"
            name="remember"
          />
          <Label htmlFor="remember">아이디저장</Label>
        </Remember>
        <SubmitInput type="submit" value="로그인" />
      </Form>
      {error !== "" ? <ErrorText>{error}</ErrorText> : null}
      <Switcher>
        <Link to="/join">회원가입</Link>
      </Switcher>
    </Wrapper>
  );
}
