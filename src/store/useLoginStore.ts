import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ITokenStoreProps {
  token: string;
  setToken: (t: string) => void;
  isLogin: boolean;
  setIsLogin: (login: boolean) => void;
  loginId: string;
  setLoginId: (id: string) => void;
  isRemember: boolean;
  setRemember: (remember: boolean) => void;
}

export const useLoginStore = create<ITokenStoreProps>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (t: string) => set(() => ({ token: t })),
        isLogin: false,
        setIsLogin: (login: boolean) => set(() => ({ isLogin: login })),
        loginId: "",
        setLoginId: (loginId: string) => set(() => ({ loginId: loginId })),
        isRemember: false,
        setRemember: (remember: boolean) =>
          set(() => ({ isRemember: remember })),
      }),
      {
        name: "DealerToken",
      },
    ),
  ),
);
