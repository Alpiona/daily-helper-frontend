import { Box, Button, Icon, Link, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { MdAttachMoney } from "react-icons/md";

const menuOptions = [
  {
    title: "Bills",
    icon: MdAttachMoney,
    redirect: "/bills",
    isActive: true,
  },
  // {
  //   title: "Notes",
  //   icon: CgNotes,
  //   redirect: "/notes",
  //   isActive: false,
  // },
  // {
  //   title: "Checklist",
  //   icon: BsCardChecklist,
  //   redirect: "/checklists",
  //   isActive: false,
  // },
];

const SideNavbar: React.FC = () => {
  return (
    <Box position="fixed" bg="gray.600" width="10%" minWidth={30} height="100%">
      <VStack spacing="10px" align="center">
        {menuOptions.map((mo) => (
          <Link key={mo.title} as={NextLink} href={mo.redirect}>
            <Button
              rounded={10}
              key={mo.title}
              flexDirection="column"
              mt={4}
              height={14}
              bgColor="gray.200"
              borderColor="gray.500"
              borderWidth={3}
            >
              <Icon boxSize={7} as={mo.icon} color="black" />
              <Text as="b" width={20}>
                {mo.title}
              </Text>
            </Button>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default SideNavbar;
