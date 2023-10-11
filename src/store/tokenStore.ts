import {create} from 'zustand'
import {devtools, persist} from "zustand/middleware";

interface tokenStoreProps {
    token: string,
    isLogin: boolean,
    removeToken: () => void,
    changeLoginState: () => void,
    changeToken: (t: string) => void
}

export const tokenStore = create<tokenStoreProps>()(
    devtools(
        persist(
            (set) => ({
                token: "",
                removeToken: () => set(() => ({token: ""})),
                isLogin: false,
                changeLoginState: () => set((state) => ({isLogin: !state.isLogin})),
                changeToken: (t: string) => set(() => ({token: t})),
            }),
            {
                name: 'token-storage',
            }
        )
    ))
