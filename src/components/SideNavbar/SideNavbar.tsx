import { sideNavbarState } from "@/atoms/sideNavbarAtom";
import { Box, Button, Icon, Link, Slide, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { MdAttachMoney } from "react-icons/md";
import { useRecoilState } from "recoil";

const menuOptions = [
  {
    id: "bills",
    i18nTitle: "bills-title",
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
  const [sideNavbar, setSideNavbar] = useRecoilState(sideNavbarState);
  const t = useTranslations("component.sideNavbar");

  return (
    <Slide
      in={sideNavbar.isOpen}
      style={{
        zIndex: 10,
        height: "100%",
        top: "44px",
        position: "fixed",
        width: "150px",
        bottom: 0,
      }}
      direction="left"
    >
      <Box
        position="fixed"
        bg="gray.600"
        width="150px"
        bottom="0"
        height="100%"
        onClick={() =>
          setSideNavbar((prev) => ({
            ...prev,
            isOpen: false,
          }))
        }
      >
        <VStack spacing="10px" align="center">
          {menuOptions.map((mo) => {
            return (
              <Link key={mo.id} as={NextLink} href={mo.redirect}>
                <Button
                  rounded={10}
                  key={mo.id}
                  flexDirection="column"
                  mt={4}
                  height={14}
                  bgColor="gray.200"
                  borderColor="gray.500"
                  borderWidth={3}
                >
                  <Icon boxSize={7} as={mo.icon} color="black" />
                  <Text as="b" width={20}>
                    {t(mo.i18nTitle)}
                  </Text>
                </Button>
              </Link>
            );
          })}
        </VStack>
      </Box>
    </Slide>
  );
};

export default SideNavbar;
