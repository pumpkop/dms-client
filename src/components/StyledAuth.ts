import styled from "styled-components";

interface WidthProps {
  width?: string;
}
export const Wrapper = styled.div<WidthProps>`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: 50px 0;
`;
export const Title = styled.h1`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0 10px;
  font-size: 25px;
`;
export const Logo = styled.img``;
export const Form = styled.form<WidthProps>`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: ${(props) => (props.width ? props.width : "100%")};
`;
export const Input = styled.input<WidthProps>`
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #bbb;
  width: ${(props) => (props.width ? props.width : "100%")};
  font-size: 16px;
  outline: none;

  &:focus,
  &:active {
    border-color: #233f71;
  }

  &[name="code"] {
    margin-bottom: 20px;
  }
`;

interface SubmitInputProps {
  display: string;
}
export const SubmitInput = styled(Input)<SubmitInputProps>`
  display: ${(props) => props.display || "initial"};
  cursor: pointer;
  background-color: #233f71;
  color: #fff;
  font-size: 20px;
  height: 40px;
  line-height: 20px;

  &:hover {
    opacity: 0.8;
  }
`;
export const Checkbox = styled(Input)`
  display: inline;
  flex: 0 0 30px;
  width: 30px;
`;
export const ErrorText = styled.span`
  //margin-top: 15px;
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #bbb;
  }
`;
export const Text = styled.span``;

interface LabelProps {
  flex?: string;
}
export const Label = styled.label<LabelProps>`
  width: 100px;
  cursor: pointer;
  flex: ${(props) => props.flex || "initial"};
`;

interface RememberProps {
  mt?: string;
  mb?: string;
}
export const Remember = styled.div<RememberProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: ${(props) => props.mt || 0};
  margin-bottom: ${(props) => props.mb || 0};
`;
