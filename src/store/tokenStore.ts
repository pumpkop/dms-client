import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface tokenStoreProps {
  token: string;
  isLogin: boolean;
  changeLoginState: () => void;
  changeToken: (t: string) => void;
}

export const tokenStore = create<tokenStoreProps>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        isLogin: false,
        changeLoginState: () => set((state) => ({ isLogin: !state.isLogin })),
        changeToken: (t: string) => set(() => ({ token: t })),
      }),
      {
        name: "token-storage",
      },
    ),
  ),
);
