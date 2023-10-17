export const fetchAuthState = async (token: string) => {
  if (token === "") return;
  return await fetch("http://localhost:15004/api/auth/status", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
};

interface ILoginInfo {
  code: string;
  id: string;
  password: string;
}

export const fetchAuthLogin = async ({ code, id, password }: ILoginInfo) => {
  return await fetch(`http://localhost:15004/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      managerCode: code,
      managerId: id,
      managerPw: password,
    }),
  }).then((response) => {
    return response.json();
  });
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
  return await fetch("http://localhost:15004/api/auth/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, id, password, phone, email }),
  }).then((response) => {
    return response.json();
  });
};
