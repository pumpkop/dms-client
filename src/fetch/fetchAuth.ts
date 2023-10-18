import axios from "axios";

export const fetchAuthState = async (token: string) => {
  if (token === "") return;
  return await axios({
    method: "GET",
    url: "http://localhost:15004/api/auth/status",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    timeout: 5000,
    responseType: "json",
  }).then((response) => response);
};

interface ILoginInfo {
  code: string;
  id: string;
  password: string;
}

export const fetchAuthLogin = async ({ code, id, password }: ILoginInfo) => {
  return await axios({
    method: "POST",
    url: `http://localhost:15004/api/auth/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      dealerCode: code,
      dealerId: id,
      dealerPw: password,
    }),
    timeout: 5000,
    responseType: "json",
  }).then((response) => response);
};

interface IJoinInfo {
  code: string;
  id: string;
  password: string;
  phone: string;
  email: string;
}

export const fetchAuthJoin = async ({
  code,
  id,
  password,
  phone,
  email,
}: IJoinInfo) => {
  return await axios({
    method: "POST",
    url: "http://localhost:15004/api/auth/join",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      dealerCode: code,
      dealerId: id,
      dealerPw: password,
      dealerPhone: phone,
      dealerEmail: email,
    }),
    timeout: 5000,
    responseType: "json",
  }).then((response) => response);
};
