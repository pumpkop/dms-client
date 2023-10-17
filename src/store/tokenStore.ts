import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface tokenStoreProps {
  token: string;
  isLogin: boolean;
  setIsLogin: (login: boolean) => void;
  toggleLogin: () => void;
  changeToken: (t: string) => void;
}

export const tokenStore = create<tokenStoreProps>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        isLogin: false,
        setIsLogin: (login: boolean) => set(() => ({ isLogin: login })),
        toggleLogin: () => set((state) => ({ isLogin: !state.isLogin })),
        changeToken: (t: string) => set(() => ({ token: t })),
      }),
      {
        name: "DealerToken",
      },
    ),
  ),
);
