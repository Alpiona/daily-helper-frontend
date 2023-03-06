import { Flex } from "@chakra-ui/react";
import { ScriptProps } from "next/script";
import React from "react";
import Navbar from "../Navbar/Navbar";

const Layout: React.FC<ScriptProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Flex height="100%">
        {/* <SideNavbar /> */}
        {children}
      </Flex>
    </>
  );
};
export default Layout;
