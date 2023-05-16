import { modalState } from "@/atoms/modalAtom";
import PaymentsList from "@/components/Bill/PaymentsList";
import { useApi } from "@/hooks/useApi";
import { BillService } from "@/services/Bill/BillService";
import { Bill } from "@/services/Bill/BillTypes";
import { Button, Divider, Flex, Icon, Spacer, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useRecoilState, useResetRecoilState } from "recoil";

const BillDetails: React.FC = () => {
  const [, setModal] = useRecoilState(modalState);
  const resetModal = useResetRecoilState(modalState);
  const [bill, setBill] = useState<Bill>();
  const [cookies] = useCookies(["token"]);
  const router = useRouter();
  const billId = String(router.query.id);
  const editBillApi = useApi(BillService.update);
  const deleteBillApi = useApi(BillService.deleteOne);
  const getBillApi = useApi(BillService.getOne);

  const handleEditBill = async (updatedBill: Bill) => {
    await editBillApi.request(
      { ...updatedBill, billId: updatedBill.id },
      cookies.token
    );

    setBill(updatedBill);

    resetModal();
  };

  const handleDeleteBill = async (billId: string) => {
    await deleteBillApi.request({ billId }, cookies.token);

    router.push("/bills");
  };

  useEffect(() => {
    if (cookies.token && billId) {
      getBillApi.request({ billId: String(billId) }, cookies.token);
    }
  }, [billId, cookies.token]);

  useEffect(() => {
    if (getBillApi.data) {
      setBill(getBillApi.data);
    }
  }, [getBillApi.data]);

  return (
    <>
      <Flex justifyContent="center" margin={3}>
        <Text>
          <b>Bill Details</b>
        </Text>
      </Flex>
      {bill && (
        <Flex marginY={3} marginX={5} fontSize={15} flexWrap="wrap">
          <Flex width="150px" justifyContent="start">
            <Text>
              <b>Name:</b>
            </Text>
            <Text>{bill.name}</Text>
          </Flex>
          <Spacer />
          <Flex width="100px" justifyContent="start">
            <Text>
              <b>Due Day:</b>
            </Text>
            <Text>{bill.dueDay < 10 ? `0${bill.dueDay}` : bill.dueDay}</Text>
          </Flex>
          <Spacer />
          <Flex width="300px" justifyContent="start">
            <Text>
              <b>Description:</b>
            </Text>
            <Text>{bill.description}</Text>
          </Flex>
        </Flex>
      )}

      <Flex justifyContent="end">
        <Button
          size="sm"
          marginX={3}
          marginBottom={3}
          onClick={() =>
            setModal((prev) => ({
              ...prev,
              open: true,
              handleAction: handleEditBill,
              data: bill,
              view: "editBill",
            }))
          }
        >
          <Icon as={FiEdit} color="black" />
        </Button>
        <Button
          size="sm"
          marginX={3}
          marginBottom={3}
          onClick={() => handleDeleteBill(bill?.id!)}
        >
          <Icon as={FiTrash2} color="black" />
        </Button>
      </Flex>

      <Divider />

      <PaymentsList billId={billId} />
    </>
  );
};

export default BillDetails;
