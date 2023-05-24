import { Flex, IconButton, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import brazilFlag from "../../assets/br.svg";
import usaFlag from "../../assets/us.svg";

const LanguageButtons: React.FC = () => {
  const { locale, push, query, pathname, asPath } = useRouter();

  const handleLocaleChange = (newLocale: string) => {
    push(
      {
        pathname,
        query,
      },
      asPath,
      { locale: newLocale }
    );
  };

  return (
    <Flex gap="10px">
      <IconButton
        aria-label="BR Flag"
        borderColor="gray.500"
        borderWidth={locale === "pt" ? "3px" : 0}
        height="30px"
        onClick={() => handleLocaleChange("pt")}
        icon={<Image src={brazilFlag.src} borderRadius={3} alt="BR Flag" />}
      />
      <IconButton
        aria-label="USA Flag"
        borderColor="gray.500"
        borderWidth={locale === "en" ? "3px" : 0}
        height="30px"
        onClick={() => handleLocaleChange("en")}
        icon={<Image src={usaFlag.src} borderRadius={3} alt="US Flag" />}
      />
    </Flex>
  );
};

export default LanguageButtons;
