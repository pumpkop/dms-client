import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 420px;
  padding: 50px 0;
`
export const Title = styled.h1`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0 10px;
  font-size: 25px;
`
export const Logo = styled.img`
`
export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

`
export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #bbb;
  width: 100%;
  font-size: 16px;
  outline: none;
  
  &:focus, &:active {
    border-color: #233F71;
  }
  
  &[name=code]{
    margin-bottom: 20px;
  }

  &[type=submit] {
    cursor: pointer;
    background-color: #233F71;
    color: #fff;
    font-size: 20px;
    height: 40px;
    line-height: 20px;

    &:hover {
      opacity: 0.8;
    }
  }

  &[type=checkbox] {
    display: inline;
    width: 30px;
  }
`
export const Error = styled.span`
  margin-top : 15px;
  font-weight: 600;
  color: tomato;
`

export const Switcher = styled.span`
  margin-top: 20px;

  a {
    color: #bbb;
  }
`
export const Text = styled.span`
`

export const Label = styled.label`
  width: 100px;
  cursor: pointer;
`
export const Remember = styled.div`
    margin-top : 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`