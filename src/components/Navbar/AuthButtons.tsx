import { Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useCookies } from "react-cookie";

type AuthButtonsProps = {};

const AuthButtons: React.FC<AuthButtonsProps> = () => {
  const [cookies, , removeCookie] = useCookies(["token"]);
  let { token } = cookies;

  const logout = async () => {
    removeCookie("token");
    token = "";
  };

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
