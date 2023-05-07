import { UserService } from "@/services/User/UserService";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SignUpConfirmation: React.FC = () => {
  const [mainText, setMainText] = useState("");
  const router = useRouter();
  const token = router.query.token as string | undefined;
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsSuccess(false);
      setMainText("Invalid registration URL! Please try sign up again");
      return;
    }

    const fetchUserActivation = async () => {
      const { errors } = await UserService.activate(token);

      if (errors && errors[0]) {
        throw errors;
      }
    };

    fetchUserActivation()
      .then(() => {
        setIsSuccess(true);
        setMainText("Welcome to Organezee! Registration was successful");
      })
      .catch((errors) => {
        setIsSuccess(false);
        setMainText(errors[0].message);
      });
  }, [token]);

  return (
    <Box margin={6}>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1} fontSize={15} textColor={isSuccess ? "green" : "red"}>
          {mainText}
        </Text>
      </Flex>
    </Box>
  );
};

export default SignUpConfirmation;
