import { UserService } from "@/services/User/UserService";
import { Box, Button, Input, useToast } from "@chakra-ui/react";
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

  useEffect(() => {
    if (!token && router.isReady) {
      toast({
        title: "Error",
        description: "Please, make another reset password request",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [token, router.isReady, toast]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      toast({
        title: "Error",
        description: "Please, make another reset password request",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    } else if (signUpForm.password !== signUpForm.confirmPassword) {
      toast({
        title: "Invalid data",
        description: "Confirm your password",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const { errors } = await UserService.resetPassword(
      {
        password: signUpForm.password,
        passwordConfirmation: signUpForm.confirmPassword,
      },
      token
    );

    if (errors && errors[0]) {
      toast({
        title: "Error",
        description: errors[0].message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Password updated",
        description: "You can log in with the new password",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
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
          placeholder="password"
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
          placeholder="confirm password"
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
          Reset Password
        </Button>
      </form>
    </Box>
  );
};

export default ResetPassword;
