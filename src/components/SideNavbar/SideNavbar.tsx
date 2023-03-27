import { Box, Button, Icon, Link, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { MdAttachMoney } from "react-icons/md";

const menuOptions = [
  {
    title: "Bills",
    icon: MdAttachMoney,
    redirect: "/bills",
  },
];

const SideNavbar: React.FC = () => {
  return (
    <Box position="fixed" bg="gray.600" width="10%" height="100%">
      <VStack spacing="20px" align="center">
        {menuOptions.map((mo) => (
          <Link key={mo.title} as={NextLink} href={mo.redirect}>
            <Button
              rounded={10}
              key={mo.title}
              flexDirection="column"
              mt={4}
              height={14}
              size="lg"
              bgColor="gray.200"
              borderColor="gray.500"
              borderWidth={3}
            >
              <Icon boxSize={7} as={mo.icon} color="black" />
              <Text as="b">{mo.title}</Text>
            </Button>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default SideNavbar;
