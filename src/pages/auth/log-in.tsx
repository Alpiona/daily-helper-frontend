import { UserService } from "@/services/UserService";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await UserService.logIn({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (response.token) {
        setCookie("token", response.token, { path: "/" });
        router.push("/home");
      } else {
        setError(response.errors[0].message);
      }
    } catch (err) {
      console.log(err);
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
              color="blue.500"
              fontWeight={700}
              cursor="pointer"
              onClick={() => {}}
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
