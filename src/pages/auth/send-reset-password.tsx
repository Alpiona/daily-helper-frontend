import { useApi } from "@/hooks/useApi";
import { UserService } from "@/services/User/UserService";
import { Box, Button, Input, useToast } from "@chakra-ui/react";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const SendResetPassword: React.FC = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
  });
  const toast = useToast();
  const sendResetPasswordApi = useApi(UserService.sendResetPassword);
  const t = useTranslations("page.auth.send-reset-password");

  useEffect(() => {
    if (sendResetPasswordApi.success && !sendResetPasswordApi.loading) {
      toast({
        title: t("success-toast.title"),
        description: t("success-toast.description"),
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [sendResetPasswordApi.success]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendResetPasswordApi.request({
      email: signUpForm.email,
    });
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
        <Button width="100%" height="36px" mt={2} mb={2} type="submit">
          {t("confirmation-button")}
        </Button>
      </form>
    </Box>
  );
};

export default SendResetPassword;

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../lang/${context.locale}.json`)).default,
    },
  };
}
