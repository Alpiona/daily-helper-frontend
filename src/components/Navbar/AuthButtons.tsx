import { Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

type AuthButtonsProps = {};

const AuthButtons: React.FC<AuthButtonsProps> = () => {
  return (
    <>
      <Flex align="center">
        <Link as={NextLink} href="/auth/log-in">
          <Button size="sm" mr={2}>
            Log In
          </Button>
        </Link>
        <Link as={NextLink} href="/auth/sign-up">
          <Button size="sm">Sign Up</Button>
        </Link>
      </Flex>
    </>
  );
};

export default AuthButtons;
