import { authModalState } from "@/atoms/authModalAtom";
import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";

type AuthButtonsProps = {};

const AuthButtons: React.FC<AuthButtonsProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <>
      <Flex align="center">
        <Button
          size="sm"
          mr={2}
          onClick={() => setAuthModalState({ open: true, view: "login" })}
        >
          Log In
        </Button>
        <Button
          size="sm"
          onClick={() => setAuthModalState({ open: true, view: "signUp" })}
        >
          Sign Up
        </Button>
      </Flex>
    </>
  );
};
export default AuthButtons;
