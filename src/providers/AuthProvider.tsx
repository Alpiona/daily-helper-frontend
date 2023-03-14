import { tokenState } from "@/atoms/tokenAtom";
import { ScriptProps } from "next/script";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";

const AuthProvider: React.FC<ScriptProps> = ({ children }) => {
  const [token, setToken] = useRecoilState(tokenState);
  const [cookies, , removeCookie] = useCookies(["token"]);

  useEffect(() => {
    if (!token && cookies.token) {
      setToken(cookies.token);
    } else if (token && !cookies.token) {
      removeCookie("token");
    }
  }, [cookies, removeCookie, setToken, token]);

  return <>{children}</>;
};
export default AuthProvider;
