import { Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

type AuthButtonsProps = {};

const AuthButtons: React.FC<AuthButtonsProps> = () => {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [token, setToken] = useState("");

  const logout = async () => {
    removeCookie("token");
    setToken("");
  };

  useEffect(() => {
    if (cookies.token) {
      setToken(cookies.token);
    }
  }, [cookies.token]);

  return (
    <>
      <Flex align="center">
        {token ? (
          <Button size="sm" mr={2} onClick={logout}>
            Log Out
          </Button>
        ) : (
          <>
            <Link as={NextLink} href="/auth/log-in">
              <Button size="sm" mr={2} onClick={logout}>
                Log In
              </Button>
            </Link>
            <Link as={NextLink} href="/auth/sign-up">
              <Button size="sm">Sign Up</Button>
            </Link>
          </>
        )}
      </Flex>
    </>
  );
};

export default AuthButtons;
