import { Flex, Icon } from "@chakra-ui/react";
import { ScriptProps } from "next/script";
import React from "react";
import { IoImageOutline } from "react-icons/io5";
import UserSpace from "./UserSpace";

const Navbar: React.FC<ScriptProps> = () => {
  return (
    <Flex
      padding="6px 12px"
      bg="gray.400"
      height="44px"
      align="center"
      justifyContent={{ md: "space-between" }}
    >
      <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color="black"
        cursor="pointer"
      />
      <UserSpace user={undefined} />
    </Flex>
  );
};
export default Navbar;
