export const authStateFetch = async (token: string) => {
  return await fetch("http://localhost:15004/api/auth/status", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
};

interface ILoginInfo {
  code: string;
  id: string;
  password: string;
}

export const authLoginFetch = async ({ code, id, password }: ILoginInfo) => {
  return await fetch(`http://localhost:15004/api/auth/login/${code}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, id, password }),
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

export const authJoinFetch = async ({
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
