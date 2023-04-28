import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";

const UserSpace: React.FC = () => {
  return (
    <>
      <Flex align="center">
        <AuthButtons />
      </Flex>
    </>
  );
};
export default UserSpace;
