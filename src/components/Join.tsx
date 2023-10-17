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
import styled from "styled-components";
import useNiceAuth from "../hooks/useNiceAuth.ts";
import { tokenStore } from "../store/tokenStore.ts";
import { fetchAuthJoin } from "../fetch/fetchAuth.ts";
import { useQuery } from "react-query";

const NiceAuth = styled.div`
  display: flex;
  align-items: center;
`;
const NiceInput = styled(Input)`
  flex: 0 0 420px;
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

const SubmitButton = styled.label`
  width: 420px;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #bbb;
  cursor: pointer;
  background-color: #233f71;
  color: #fff;
  font-size: 20px;
  height: 40px;
  line-height: 20px;
  text-align: center;
`;

export default function Join() {
  const [niceAuth] = useNiceAuth({ val: "", phone: "", name: "", birth: "" });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [remember1, setRemember1] = useState(false);
  const [remember2, setRemember2] = useState(false);
  const [error, setError] = useState("");
  const { changeToken } = tokenStore((state) => ({
    changeToken: state.changeToken,
  }));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    let noWhiteSpace = value;
    noWhiteSpace = noWhiteSpace.replace(/\s/, "");

    if (name === "code") {
      setCode(value);
    } else if (name === "id") {
      setId(noWhiteSpace);
    } else if (name === "password") {
      setPassword(noWhiteSpace);
    } else if (name === "password-check") {
      setPasswordCheck(noWhiteSpace);
    } else if (name === "phone") {
      setPhone(noWhiteSpace);
    } else if (name === "email") {
      setEmail(noWhiteSpace);
    }
    console.log(code, email, password);
  };

  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name },
    } = e;
    if (name === "remember1") {
      setRemember1(!remember1);
    } else if (name === "remember2") {
      setRemember2(!remember2);
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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || code === "" || email === "" || password === "") return;
    if (password !== passwordCheck) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!(remember1 && remember2)) {
      setError("약관에 모두 동의하셔야 합니다.");
      return;
    }
    if (niceAuth.phone === "") {
      setError("본인인증을 진행하셔야 합니다.");
      return;
    }
    if (niceAuth.phone !== phone) {
      setError("본인인증이 일치하지 않습니다.");
      return;
    }
    try {
      setIsLoading(true);
      const { isLoading, isError, data, error } = useQuery(
        ["authLogin", id],
        () => fetchAuthJoin({ code, id, password, phone, email }),
        {
          retry: false,
          enabled: !!id,
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
    console.log(email, password);
  };

  useEffect(() => {
    changeToken("");
  }, []);

  // removeToken();
  return (
    <Wrapper w={"800px"}>
      <Title>
        <Logo
          src="https://softcity.blob.core.windows.net/public/images/logo_qna_logo.png"
          alt="경영박사"
        />
        <Text>회원 정보 입력</Text>
      </Title>
      <Form onSubmit={onSubmit} w="420px">
        <Input
          w="420px"
          onChange={onChange}
          name="code"
          value={code}
          placeholder="딜러코드"
          required
        />
        <Input
          w="420px"
          onChange={onChange}
          name="id"
          value={id}
          placeholder="아이디 (담당자명)"
          required
        />
        <Input
          w="420px"
          onChange={onChange}
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호"
          required
        />
        <Input
          w="420px"
          onChange={onChange}
          type="password"
          name="password-check"
          value={passwordCheck}
          placeholder="비밀번호 확인"
          required
        />
        <NiceAuth>
          <NiceInput
            onChange={onChange}
            name="phone"
            value={phone}
            placeholder="휴대폰번호"
            required
          />
          <NiceAuthButton onClick={onAuth}>본인인증</NiceAuthButton>
        </NiceAuth>
        <Input
          onChange={onChange}
          type="email"
          name="email"
          value={email}
          placeholder="이메일"
          required
        />
        <SubmitInput type="submit" id="submit" style={{ display: "none" }} />
      </Form>
      <Remembers>
        <Remember mb="5px">
          <CheckboxInput
            onClick={onClick}
            type="checkbox"
            id="remember1"
            name="remember1"
          />
          <Label htmlFor="remember1" flex="0 0 770px">
            (필수) 회원 가입 시 등록 정보가 본사와 해당 딜러 관리자에게
            전송되며, 승인 후 로그인 가능합니다
          </Label>
        </Remember>
        <Remember mb="20px">
          <CheckboxInput
            onClick={onClick}
            type="checkbox"
            id="remember2"
            name="remember2"
          />
          <Label htmlFor="remember2" flex="0 0 770px">
            (필수) 개인정보 약관 동의
          </Label>
        </Remember>
      </Remembers>
      <SubmitButton htmlFor="submit">가입하기</SubmitButton>
      {error !== "" ? <ErrorText>{error}</ErrorText> : null}
      <Switcher>
        <Link to="/login">로그인</Link>
      </Switcher>
    </Wrapper>
  );
}
