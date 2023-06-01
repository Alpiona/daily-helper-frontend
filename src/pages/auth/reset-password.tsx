import { useApi } from "@/hooks/useApi";
import { UserService } from "@/services/User/UserService";
import { Box, Button, Input, useToast } from "@chakra-ui/react";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ResetPassword: React.FC = () => {
  const [signUpForm, setSignUpForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const toast = useToast();
  const token = router.query.token as string | undefined;
  const resetPasswordApi = useApi(UserService.resetPassword);
  const t = useTranslations("page.auth.reset-password");

  useEffect(() => {
    if (!resetPasswordApi.loading && resetPasswordApi.success) {
      toast({
        title: t("success-toast.title"),
        description: t("success-toast.description"),
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [resetPasswordApi.success]);

  useEffect(() => {
    if (!token) {
      toast({
        title: t("token-error-toast.title"),
        description: t("token-error-toast.description"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [router.isReady]);

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

    await resetPasswordApi.request(
      {
        password: signUpForm.password,
        passwordConfirmation: signUpForm.confirmPassword,
      },
      token!
    );
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Box margin={6}>
      <form onSubmit={onSubmit}>
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
          placeholder={t("confirmPassword-placeholder")}
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
          {t("confirm-button")}
        </Button>
      </form>
    </Box>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../lang/${context.locale}.json`)).default,
    },
  };
}

export default ResetPassword;
