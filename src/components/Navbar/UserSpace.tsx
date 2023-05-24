import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";
import LanguageButtons from "./LanguageButtons";

const UserSpace: React.FC = () => {
  return (
    <>
      <Flex align="center" gap="30px">
        <LanguageButtons />
        <AuthButtons />
      </Flex>
    </>
  );
};
export default UserSpace;
