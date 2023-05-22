import { useApi } from "@/hooks/useApi";
import { UserService } from "@/services/User/UserService";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { default as NextLink } from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [, setCookie] = useCookies(["token"]);
  const logInApi = useApi(UserService.logIn);
  const t = useTranslations("page.auth.log-in");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await logInApi.request({
      email: loginForm.email,
      password: loginForm.password,
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (logInApi.data) {
      setCookie("token", logInApi.data.token, {
        path: "/",
        expires: new Date(logInApi.data.expiresAt),
      });

      router.push("/");
    }
  }, [logInApi.data]);

  return (
    <Box margin={6}>
      <form onSubmit={onSubmit}>
        <Input
          required
          name="email"
          placeholder={t("email-placeholder")}
          type="email"
          mb={2}
          onChange={onChange}
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          bg="gray.50"
        />
        <Input
          required
          name="password"
          placeholder={t("password-placeholder")}
          type="password"
          mb={2}
          onChange={onChange}
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          bg="gray.50"
        />
        <Button
          isLoading={logInApi.loading}
          width="100%"
          height="36px"
          mt={2}
          mb={2}
          type="submit"
        >
          {t("confirm-button")}
        </Button>
        <Flex justifyContent="center" mb={2}>
          <Text fontSize="9pt" mr={1}>
            {t("forgot-password-text")}
          </Text>
          <Text
            as={NextLink}
            href="/auth/send-reset-password"
            color="blue.500"
            fontSize="9pt"
            fontWeight={700}
            cursor="pointer"
          >
            {t("reset-password-button")}
          </Text>
        </Flex>
        <Flex fontSize="9pt" justifyContent="center">
          <Text mr={1}>{t("new-user-text")}</Text>
          <Text
            as={NextLink}
            href="/auth/sign-up"
            color="blue.500"
            fontWeight={700}
            cursor="pointer"
          >
            {t("sign-up-button")}
          </Text>
        </Flex>
      </form>
    </Box>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../lang/${context.locale}.json`)).default,
    },
  };
}
