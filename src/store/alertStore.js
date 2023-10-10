import {create} from 'zustand'

export const userAlertStore = create((set) => ({
    isAlert: false,
    text: '',
    changeState: () => set((state) => ({ isAlert: !state.isAlert })),
    setText: text => set({text})
}));
