import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";

type SideNavbarProps = {};

const SideNavbar: React.FC<SideNavbarProps> = () => {
  return (
    <Box position="fixed" bg="gray.600" width="10%" height="100%">
      <VStack height="100%" justifyContent="center" spacing="20px">
        <Text>Teste</Text>
        <Text>Teste</Text>
      </VStack>
    </Box>
  );
};

export default SideNavbar;
