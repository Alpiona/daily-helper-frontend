import { useApi } from "@/hooks/useApi";
import { UserService } from "@/services/User/UserService";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SignUpConfirmation: React.FC = () => {
  const [mainText, setMainText] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const router = useRouter();
  const token = router.query.token as string | undefined;
  const activateApi = useApi(UserService.activate);
  const t = useTranslations("page.auth.sign-up-confirmation");

  useEffect(() => {
    if (token) {
      const fetchApi = async () => {
        await activateApi.request({}, token);
      };

      fetchApi()
        .then(() => {
          setIsSuccess(true);
          setMainText(t("success-text"));
          setInterval(() => {}, 1500);
        })
        .catch(() => {
          setIsSuccess(false);
          setMainText(t("request-error-text"));
        });
    } else {
      setIsSuccess(false);
      setMainText(t("token-error-text"));
    }
  }, [router.isReady]);

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
