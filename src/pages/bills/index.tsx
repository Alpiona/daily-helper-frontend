import { modalState } from "@/atoms/modalAtom";
import BillsTable from "@/components/Bill/BillsTable";
import { useApi } from "@/hooks/useApi";
import { BillService } from "@/services/Bill/BillService";
import { Bill } from "@/services/Bill/BillTypes";
import { Button, Flex, Text } from "@chakra-ui/react";
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
      console.log("useEffect", bills, createBillApi.data);

      setBills([...bills, createBillApi.data]);
      console.log("passou do setBills", bills);
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
          <b>Bills Control</b>
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
