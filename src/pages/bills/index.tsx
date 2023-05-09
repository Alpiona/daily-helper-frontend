import { modalState } from "@/atoms/modalAtom";
import BillsTable from "@/components/Bill/BillsTable";
import { BillService } from "@/services/Bill/BillService";
import { Bill } from "@/services/Bill/BillTypes";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useRecoilState, useResetRecoilState } from "recoil";

const BillsPage: React.FC = () => {
  const [, setModal] = useRecoilState(modalState);
  const resetModal = useResetRecoilState(modalState);
  const [bills, setBills] = useState<Bill[]>([]);
  const [cookies, , removeCookie] = useCookies(["token"]);

  const handleCreateBill = async (newBill: Omit<Bill, "id">) => {
    const { data, errors } = await BillService.create(newBill, cookies.token);

    if (errors && errors[0]) {
    } else {
      setBills([...bills, { ...newBill, id: data.id }]);
    }

    resetModal();
  };

  return (
    <>
      <Flex justifyContent="center" margin={3}>
        <Text>
          <b>Bills Control</b>
        </Text>
      </Flex>
      <BillsTable />
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
