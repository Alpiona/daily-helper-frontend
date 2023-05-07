import { Box, Flex } from "@chakra-ui/react";
import { ScriptProps } from "next/script";
import React from "react";
import Navbar from "../Navbar/Navbar";
import SideNavbar from "../SideNavbar/SideNavbar";

const Layout: React.FC<ScriptProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Flex>
        <SideNavbar />
        <Box
          marginX="auto"
          marginTop="30pt"
          bg="white"
          width="50%"
          minWidth="300px"
          borderRadius={10}
        >
          {children}
        </Box>
      </Flex>
    </>
  );
};
export default Layout;
