import {Form, Switcher, Title, Wrapper, Error, Logo, Input, Text, Label, Remember} from "./StyledAuth.js";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export default function Login() {
    console.log('login')
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const {target: {name, value}} = e;
        let noWhiteSpace = value
        noWhiteSpace = noWhiteSpace.replace(/\s/, '')

        if (name === 'code') {
            setCode(noWhiteSpace)
        } else if (name === 'id') {
            setId(noWhiteSpace)
        } else if (name === 'password') {
            setPassword(noWhiteSpace)
        }
        console.log(code, password)
    }
    const onClick = (e) => {
        console.log(e)
        setRemember(!remember)
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (isLoading || code === "" || password === "") return;
        try {
            setIsLoading(true);
            // await signInWithEmailAndPassword(auth, code, password);
            navigate("/");
        } catch (e) {
            console.log(e);
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
        console.log(code, password)
    }
    return (
        <Wrapper>
            <Title>
                <Logo src="https://softcity.blob.core.windows.net/public/images/logo_qna_logo.png" alt="경영박사"/>
                <Text>로그인</Text>
            </Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} type='code' name='code' value={code} placeholder='딜러코드' required/>
                <Input onChange={onChange} type='id' name='id' value={id} placeholder='아이디' required/>
                <Input onChange={onChange} type='password' name='password' value={password} placeholder='비밀번호'
                       required/>
                <Remember>
                    <Input onClick={onClick} type='checkbox' id='remember' name='remember'/>
                    <Label htmlFor='remember'>아이디저장</Label>
                </Remember>
                <Input type='submit' value='로그인'/>
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                <Link to='/join'>회원가입</Link>
            </Switcher>
        </Wrapper>
    );
}
