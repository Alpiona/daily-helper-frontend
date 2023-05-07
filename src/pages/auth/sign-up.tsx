import { UserService } from "@/services/User/UserService";
import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { default as NextLink } from "next/link";
import React, { useState } from "react";

const SignUp: React.FC = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const toast = useToast();

  //Firebase logic
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (signUpForm.password !== signUpForm.confirmPassword) {
      toast({
        title: "Invalid data",
        description: "Passwords do not match",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const { errors } = await UserService.signUp({
      email: signUpForm.email,
      password: signUpForm.password,
      passwordConfirmation: signUpForm.confirmPassword,
    });

    if (errors && errors[0]) {
      toast({
        title: "Fail to sign up",
        description: errors[0].message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setError(errors[0].message);
    } else {
      toast({
        title: "Sign up successfully",
        description: "Confirmation email has been sent",
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
        <Text textAlign="center" color="red" fontSize="10pt">
          {error}
        </Text>
        <Button width="100%" height="36px" mt={2} mb={2} type="submit">
          Sign Up
        </Button>
        <Flex fontSize="9pt" justifyContent="center">
          <Text mr={1}>Already registered?</Text>
          <Text
            as={NextLink}
            href="/auth/log-in"
            color="blue.500"
            fontWeight={700}
            cursor="pointer"
          >
            Log In
          </Text>
        </Flex>
      </form>
    </Box>
  );
};

export default SignUp;
