import { UserState } from "@/atoms/userAtom";
import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";

type UserSpaceProps = {
  user?: UserState;
};

const UserSpace: React.FC<UserSpaceProps> = ({ user }) => {
  return (
    <>
      <Flex align="center">
        {user ? <UserMenu user={user} /> : <AuthButtons />}
      </Flex>
    </>
  );
};
export default UserSpace;
