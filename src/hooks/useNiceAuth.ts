import { useEffect, useState } from "react";

interface Auth {
  val: string;
  phone: string;
  name: string;
  birth: string;
}

export default function useNiceAuth(initValue: Auth): Auth[] {
  const [niceAuth, setNiceAuth] = useState(initValue);
  useEffect(() => {
    const authPopup = function (e: MessageEvent) {
      // 팝업에서 온 메시지가 아니라면 아무 작업도 하지 않는다.
      if (e.data.message === undefined) return;
      console.log(e);
      // if (e.origin !== "https://b2b.softcity.co.kr") return;
      // if (e.data.message !== "nice") return;
      if (e.data.params === undefined) return;

      setNiceAuth(e.data.params);
      // niceVal == "Y"
      return false;
    };
    window.addEventListener("message", authPopup);
    return () => {
      window.removeEventListener("message", authPopup);
    };
  }, []);
  return [niceAuth];
}
