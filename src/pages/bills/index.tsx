import { modalState } from "@/atoms/modalAtom";
import BillsTable from "@/components/Bill/BillsTable";
import { useApi } from "@/hooks/useApi";
import { BillService } from "@/services/Bill/BillService";
import { Bill } from "@/services/Bill/BillTypes";
import { Button, Flex, Text } from "@chakra-ui/react";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRecoilState, useResetRecoilState } from "recoil";

const BillsPage: React.FC = () => {
  const [, setModal] = useRecoilState(modalState);
  const resetModal = useResetRecoilState(modalState);
  const [bills, setBills] = useState<Bill[]>([]);
  const [cookies] = useCookies(["token"]);
  const getBillsApi = useApi(BillService.getList);
  const createBillApi = useApi(BillService.create);
  const t = useTranslations("page.bills.index");

  useEffect(() => {
    if (cookies.token) {
      getBillsApi.request({}, cookies.token);
    }
  }, [cookies.token]);

  useEffect(() => {
    if (getBillsApi.data) {
      setBills(getBillsApi.data);
    }
  }, [getBillsApi.data]);

  useEffect(() => {
    if (createBillApi.data) {
      setBills([...bills, createBillApi.data]);
    }
  }, [createBillApi.data]);

  const handleCreateBill = async (newBill: Omit<Bill, "id">) => {
    await createBillApi.request(newBill, cookies.token);

    resetModal();
  };

  return (
    <>
      <Flex justifyContent="center" margin={3}>
        <Text>
          <b>{t("title")}</b>
        </Text>
      </Flex>
      <BillsTable bills={bills} />
      <Flex justifyContent="end">
        <Button
          marginX={3}
          marginBottom={3}
          onClick={() =>
            setModal((prev) => ({
              ...prev,
              open: true,
              handleAction: handleCreateBill,
              view: "createBill",
            }))
          }
        >
          +
        </Button>
      </Flex>
    </>
  );
};

export default BillsPage;

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended pattern
      // is to put them in JSON files separated by locale (e.g. `en.json`).
      messages: (await import(`../../lang/${context.locale}.json`)).default,
    },
  };
}
