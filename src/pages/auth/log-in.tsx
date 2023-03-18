import { UserService } from "@/services/UserService";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { default as NextLink } from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

const Login: React.FC = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const [, setCookie] = useCookies(["token"]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const { data, errors } = await UserService.logIn({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (errors && errors[0]) {
        const errorMessage = errors[0].message;
        setError(errorMessage);
      } else if (data) {
        setCookie("token", data.token, {
          path: "/",
          expires: new Date(data.expiresAt),
        });
        router.push("/");
      }
    } catch (err) {
      setError("Error unexpected, try again later");
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Box
      marginX="auto"
      marginTop="30pt"
      bg="gray.200"
      width="50%"
      borderRadius={10}
    >
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
          <Text textAlign="center" color="red" fontSize="10pt">
            {error}
          </Text>
          <Button width="100%" height="36px" mt={2} mb={2} type="submit">
            Log In
          </Button>
          <Flex justifyContent="center" mb={2}>
            <Text fontSize="9pt" mr={1}>
              Forgot your password?
            </Text>
            <Text
              fontSize="9pt"
              color="blue.500"
              cursor="pointer"
              onClick={() => {}}
            >
              Reset
            </Text>
          </Flex>
          <Flex fontSize="9pt" justifyContent="center">
            <Text mr={1}>New here?</Text>
            <Text
              as={NextLink}
              href="/auth/sign-up"
              color="blue.500"
              fontWeight={700}
              cursor="pointer"
            >
              Sign Up
            </Text>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
