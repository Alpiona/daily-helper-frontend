import { UserService } from "@/services/User/UserService";
import { Box, Button, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";

const SendResetPassword: React.FC = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
  });
  const toast = useToast();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { errors } = await UserService.sendResetPassword({
      email: signUpForm.email,
    });

    if (errors && errors[0]) {
      toast({
        title: "Failure when trying to request reset password",
        description: errors[0].message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Password reset request successful",
        description: "Confirmation email has been sent",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      // router.push("/auth/log-in");
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
          name="email"
          placeholder="email"
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
          Reset Password
        </Button>
      </form>
    </Box>
  );
};

export default SendResetPassword;
