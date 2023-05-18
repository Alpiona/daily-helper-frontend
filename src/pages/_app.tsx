import Layout from "@/components/Layout/Layout";
import BaseModal from "@/components/Modal/BaseModal";
import { ChakraProvider } from "@chakra-ui/react";
import { NextIntlProvider } from "next-intl";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { theme } from "../chakra/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <BaseModal />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </RecoilRoot>
    </NextIntlProvider>
  );
}
