import { modalState } from "@/atoms/modalAtom";
import { useApi } from "@/hooks/useApi";
import { PaymentService } from "@/services/Payment/PaymentService";
import { Payment } from "@/services/Payment/PaymentTypes";
import {
  Button,
  Flex,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FiEdit, FiPlusSquare, FiTrash2 } from "react-icons/fi";
import { useRecoilState, useResetRecoilState } from "recoil";

type PaymentsListProps = {
  billId: string;
};

const PaymentsList: React.FC<PaymentsListProps> = ({ billId }) => {
  const [, setModal] = useRecoilState(modalState);
  const resetModal = useResetRecoilState(modalState);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [cookies] = useCookies(["token"]);
  const paymentsListApi = useApi(PaymentService.getList);
  const createPaymentApi = useApi(PaymentService.create);
  const updatePaymentApi = useApi(PaymentService.update);
  const deletePaymentApi = useApi(PaymentService.deleteOne);

  useEffect(() => {
    if (cookies.token) {
      paymentsListApi.request({ billId }, cookies.token);
    }
  }, [cookies.token]);

  useEffect(() => {
    if (paymentsListApi.data) {
      setPayments(paymentsListApi.data);
    }
  }, [paymentsListApi.data]);

  useEffect(() => {
    if (createPaymentApi.data) {
      const updatedPayments = [...payments, createPaymentApi.data].sort(
        (a, b) => Date.parse(b.referenceDate) - Date.parse(a.referenceDate)
      );

      setPayments(updatedPayments);
    }
  }, [createPaymentApi.data]);

  useEffect(() => {
    if (updatePaymentApi.data) {
      const paymentIndex = payments.findIndex(
        (p) => p.id === updatePaymentApi.data?.id
      );

      const paymentsUpdated = payments;
      paymentsUpdated[paymentIndex] = updatePaymentApi.data;

      setPayments(paymentsUpdated);
    }
  }, [updatePaymentApi.data]);

  const handleCreatePayment = async (newPayment: Payment) => {
    await createPaymentApi.request(newPayment, cookies.token);

    resetModal();
  };

  const handleEditPayment = async (updatedPayment: Payment) => {
    await updatePaymentApi.request(updatedPayment, cookies.token);

    resetModal();
  };

  const handleDeletePayment = async (paymentId: string) => {
    await deletePaymentApi.request({ paymentId }, cookies.token);

    setPayments(payments.filter((p) => p.id !== paymentId));

    resetModal();
  };

  return (
    <>
      <Flex justifyContent="center" marginTop={4}>
        <Text>
          <b>Payments</b>
        </Text>
      </Flex>

      <TableContainer margin={4} borderRadius={3}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Reference Date</Th>
              <Th>Paid At</Th>
              <Th>Value</Th>
              <Th width="15%"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {payments.map((payment) => (
              <Tr key={payment.id}>
                <Td>{format(new Date(payment.referenceDate), "MM/yyyy")}</Td>
                <Td>
                  {payment.paidAt
                    ? format(new Date(payment.paidAt), "dd/MM/yyyy")
                    : "--"}
                </Td>
                <Td>{payment.value || payment.value?.toFixed(2)}</Td>
                <Td>
                  <Flex align="center">
                    <Button
                      size="xs"
                      onClick={() =>
                        setModal((prev) => ({
                          ...prev,
                          open: true,
                          handleAction: handleEditPayment,
                          data: payment,
                          view: "editPayment",
                        }))
                      }
                      marginRight={3}
                    >
                      <Icon as={FiEdit} color="black" />
                    </Button>
                    <Button
                      size="xs"
                      onClick={() =>
                        setModal((prev) => ({
                          ...prev,
                          open: true,
                          handleAction: handleDeletePayment,
                          data: { paymentId: payment.id },
                          view: "deletePayment",
                        }))
                      }
                    >
                      <Icon as={FiTrash2} color="black" />
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justifyContent="end">
        <Button
          size="sm"
          marginX={3}
          marginBottom={3}
          onClick={() =>
            setModal((prev) => ({
              ...prev,
              open: true,
              handleAction: handleCreatePayment,
              data: { billId },
              view: "createPayment",
            }))
          }
        >
          <Icon as={FiPlusSquare} color="black" />
        </Button>
      </Flex>
    </>
  );
};

export default PaymentsList;
