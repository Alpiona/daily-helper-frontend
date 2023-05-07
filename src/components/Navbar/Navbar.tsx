import { sideNavbarState } from "@/atoms/sideNavbarAtom";
import { Flex, Icon } from "@chakra-ui/react";
import { ScriptProps } from "next/script";
import React from "react";
import { FiAlignJustify } from "react-icons/fi";
import { IoImageOutline } from "react-icons/io5";
import { useRecoilState } from "recoil";
import UserSpace from "./UserSpace";

const Navbar: React.FC<ScriptProps> = () => {
  const [modal, setModal] = useRecoilState(sideNavbarState);

  const handleOpenSideNavbar = () => {
    console.log(modal, !modal.isOpen);
    setModal((prev) => ({ ...prev, isOpen: !modal.isOpen }));
  };

  return (
    <Flex
      padding="6px 12px"
      bg="gray.400"
      height="44px"
      align="center"
      justifyContent={{ md: "space-between" }}
    >
      <Icon
        as={FiAlignJustify}
        fontSize={24}
        mr={4}
        onClick={handleOpenSideNavbar}
        color="black"
        cursor="pointer"
      />
      <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color="black"
        cursor="pointer"
      />
      <UserSpace />
    </Flex>
  );
};
export default Navbar;
