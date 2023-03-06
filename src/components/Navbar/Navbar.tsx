import { userState } from "@/atoms/userAtom";
import { Flex, Icon } from "@chakra-ui/react";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import { ScriptProps } from "next/script";
import React, { useEffect } from "react";
import { IoImageOutline } from "react-icons/io5";
import { useRecoilState } from "recoil";
import UserSpace from "./UserSpace";

const Navbar: React.FC<ScriptProps> = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (!user) {
      if (hasCookie("token") && hasCookie("email")) {
        setUser({
          email: getCookie("email") as string,
          token: getCookie("token") as string,
        });
      }
    } else {
      if (!hasCookie("token")) {
        setCookie("token", user.token, { httpOnly: true });
      }

      if (!hasCookie("email")) {
        setCookie("email", user.email, { httpOnly: true });
      }
    }
  }, [user, setUser]);

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
      <UserSpace user={user} />
    </Flex>
  );
};
export default Navbar;
