import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("page.index");

  return <div>{t("title")}</div>;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../lang/${context.locale}.json`)).default,
    },
  };
}
