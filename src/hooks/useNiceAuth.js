import {useEffect, useState} from "react";

export default function useNiceAuth(initValue = null) {
    const [niceAuth, setNiceAuth] = useState(initValue);
    useEffect(() => {
        console.log('useNiceAuth')
        const authPopup = function (e) {
            // 팝업에서 온 메시지가 아니라면 아무 작업도 하지 않는다.
            if (e.data.message === undefined) return;
            console.log(e);
            // if (e.origin !== "https://b2b.softcity.co.kr") return;
            // if (e.data.message !== "nice") return;
            if (e.data.params === undefined) return;
            const {data: {params: {val, phone, name, birth}}} = e;
            setNiceAuth({val, phone, name, birth});
            // niceVal == "Y"
            return false;
        };
        window.addEventListener("message", authPopup);
        return () => {
            window.removeEventListener("message", authPopup)
        }
    }, []);
    return [niceAuth];
}