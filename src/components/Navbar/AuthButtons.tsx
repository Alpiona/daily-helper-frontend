import { Button, Flex, Link } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

type AuthButtonsProps = {};

const AuthButtons: React.FC<AuthButtonsProps> = () => {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [token, setToken] = useState<String>();
  const router = useRouter();
  const t = useTranslations("component.navbar.auth-buttons");

  const logout = async () => {
    removeCookie("token");
    setToken("");
    router.push("/");
  };

  useEffect(() => {
    if (router.isReady) {
      setToken(cookies.token);
    }
  }, [router.isReady]);

  return (
    <>
      <Flex align="center">
        {token ? (
          <Button size="sm" mr={2} onClick={logout}>
            {t("log-out-button")}
          </Button>
        ) : (
          <>
            <Link as={NextLink} href="/auth/log-in">
              <Button size="sm" mr={2} onClick={logout}>
                {t("log-in-button")}
              </Button>
            </Link>
            <Link as={NextLink} href="/auth/sign-up">
              <Button size="sm">{t("sign-up-button")}</Button>
            </Link>
          </>
        )}
      </Flex>
    </>
  );
};

export default AuthButtons;
