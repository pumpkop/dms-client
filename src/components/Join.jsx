import {Form, Switcher, Title, Wrapper, Error, Logo, Input, Text, Label, Remember} from "./StyledAuth.js";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import styled from "styled-components";
import useNiceAuth from "../hooks/useNiceAuth.js";

const Wrapper800 = styled(Wrapper)`
  width: 800px;
`
const Form420 = styled(Form)`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 420px;
`
const Input420 = styled(Input)`
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #bbb;
  width: 100%;
  font-size: 16px;
  outline: none;

  &:focus, &:active {
    border-color: #233F71;
  }

  &[type=submit] {
    cursor: pointer;
    background-color: #233F71;
    color: #fff;
    font-size: 20px;
    width: 420px;

    &:hover {
      opacity: 0.8;
    }
  }

  &[type=checkbox] {
    display: inline;
    width: 30px;
  }
`
const NiceAuth = styled.div`
  display: flex;
  align-items: center;

`
const NiceAuthButton = styled.button`
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
  flex: 0 0 100px;
  height: 40px;
  cursor: pointer;
`
const Remembers = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Remember700 = styled(Remember)`
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 700px;
  &:first-child{
    margin-bottom: 5px;
  }
`
const SubmitButton = styled.label`
  width: 420px;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #bbb;
  cursor: pointer;
  background-color: #233F71;
  color: #fff;
  font-size: 20px;
  height: 40px;
  line-height: 20px;
  text-align: center;
`

export default function Join() {
    console.log('join')
    const [niceAuth] = useNiceAuth(null);
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

    const onChange = (e) => {
        const {target: {name, value}} = e;
        let noWhiteSpace = value
        noWhiteSpace = noWhiteSpace.replace(/\s/, '')

        if (name === 'code') {
            setCode(value)
        } else if (name === 'id') {
            setId(noWhiteSpace)
        } else if (name === 'password') {
            setPassword(noWhiteSpace)
        } else if (name === 'password-check') {
            setPasswordCheck(noWhiteSpace)
        } else if (name === 'phone') {
            setPhone(noWhiteSpace)
        } else if (name === 'email') {
            setEmail(noWhiteSpace)
        }
        console.log(code, email, password)
    }

    const onClick = (e) => {
        const {target: {name}} = e;
        if (name === 'remember1') {
            setRemember1(!remember1)
        } else if (name === 'remember2') {
            setRemember2(!remember2)
        }
    }
    const onAuth = (e) => {
        e.preventDefault();
        console.log(e)
        window.name = "popupParent";
        window.open("https://webtest.softcity.co.kr/nice?kind=nice", "안심본인인증", "width=490, height=800"); //shop2 본인인증
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (isLoading || code === "" || email === "" || password === "") return;
        if (password !== passwordCheck) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }
        if(!(remember1 && remember2)){
            setError('약관에 모두 동의하셔야 합니다.');
            return;
        }
        try {
            setIsLoading(true);
            // const credentials = await createUserWithEmailAndPassword(auth, email, password);
            // console.log(credentials.user);
            // await updateProfile(credentials.user, {
            //     displayName: code
            // });

            navigate("/");
        } catch (e) {
            console.log(e);
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
        console.log(email, password)
    }
    return (
        <Wrapper800>
            <Title>
                <Logo src="https://softcity.blob.core.windows.net/public/images/logo_qna_logo.png" alt="경영박사"/>
                <Text>회원 정보 입력</Text>
            </Title>
            <Form420 onSubmit={onSubmit}>
                <Input420 onChange={onChange} type='code' name='code' value={code} placeholder='딜러코드' required/>
                <Input420 onChange={onChange} type='id' name='id' value={id} placeholder='아이디 (담당자명)' required/>
                <Input420 onChange={onChange} type='password' name='password' value={password} placeholder='비밀번호'
                       required/>
                <Input420 onChange={onChange} type='password' name='password-check' value={passwordCheck}
                       placeholder='비밀번호 확인' required/>
                <NiceAuth>
                    <Input420 onChange={onChange} name='phone' value={phone} placeholder='휴대폰번호' required
                           style={{flex: '0 0 420px'}}/>
                    <NiceAuthButton onClick={onAuth}>본인인증</NiceAuthButton>
                </NiceAuth>
                <Input420 onChange={onChange} type='email' name='email' value={email} placeholder='이메일' required/>
                <Input420 type="submit" id='submit' style={{display: 'none'}}/>
            </Form420>
            <Remembers>
                <Remember700>
                    <Input420 onClick={onClick} type='checkbox' id='remember1' name='remember1'
                           style={{flex: '0 0 30px'}}/>
                    <Label htmlFor='remember1' style={{flex: '0 0 770px'}}>(필수) 회원 가입 시 등록 정보가 본사와 해당 딜러 관리자에게 전송되며, 승인
                        후 로그인 가능합니다</Label>
                </Remember700>
                <Remember700>
                    <Input420 onClick={onClick} type='checkbox' id='remember2' name='remember2'
                           style={{flex: '0 0 30px'}}/>
                    <Label htmlFor='remember2' style={{flex: '0 0 770px'}}>(필수) 개인정보 약관 동의</Label>
                </Remember700>
            </Remembers>
            <SubmitButton htmlFor='submit'>가입하기</SubmitButton>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                <Link to='/login'>로그인</Link>
            </Switcher>
        </Wrapper800>
    );
}
