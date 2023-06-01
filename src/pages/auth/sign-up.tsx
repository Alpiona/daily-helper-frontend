import { useApi } from "@/hooks/useApi";
import { UserService } from "@/services/User/UserService";
import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { default as NextLink } from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SignUp: React.FC = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toast = useToast();
  const { locale } = useRouter();
  const signUpApi = useApi(UserService.signUp);
  const t = useTranslations("page.auth.sign-up");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (signUpForm.password !== signUpForm.confirmPassword) {
      toast({
        title: t("password-error-toast.title"),
        description: t("password-error-toast.description"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    await signUpApi.request({
      email: signUpForm.email,
      password: signUpForm.password,
      passwordConfirmation: signUpForm.confirmPassword,
      locale: locale || "en",
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(()=>{
    if(!signUpApi.loading && signUpApi.success){
      toast({
        title: t("success-toast.title"),
        description: t("success-toast.description"),
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [signUpApi.success])

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
        <Input
          required
          name="confirmPassword"
          placeholder={t("confirm-password-placeholder")}
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
        <Button width="100%" height="36px" mt={2} mb={2} type="submit">
          {t("confirmation-button")}
        </Button>
        <Flex fontSize="9pt" justifyContent="center">
          <Text mr={1}>{t("log-in-text")}</Text>
          <Text
            as={NextLink}
            href="/auth/log-in"
            color="blue.500"
            fontWeight={700}
            cursor="pointer"
          >
            {t("log-in-button")}
          </Text>
        </Flex>
      </form>
    </Box>
  );
};

export default SignUp;

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../lang/${context.locale}.json`)).default,
    },
  };
}
