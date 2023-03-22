import { modalState } from "@/atoms/modalAtom";
import { BillService } from "@/services/BillService";
import { Bill } from "@/services/BillTypes";
import { PaymentService } from "@/services/PaymentService";
import { Payment } from "@/services/PaymentTypes";
import {
  Box,
  Button,
  Divider,
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
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FiEdit, FiPlusSquare, FiTrash2 } from "react-icons/fi";
import { useRecoilState, useResetRecoilState } from "recoil";

const BillDetails: React.FC = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const resetModal = useResetRecoilState(modalState);
  const [bill, setBill] = useState<Bill>();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState("");
  const [cookies, , removeCookie] = useCookies(["token"]);
  const router = useRouter();
  const billId = router.query.id;

  const handleEditBill = async (updatedBill: Bill) => {
    const { errors: fetchErrors } = await BillService.update(
      updatedBill,
      cookies.token
    );

    if (fetchErrors && fetchErrors[0].message === "Access unauthorized") {
      removeCookie("token");
      router.push("/auth/log-in");
    } else if (fetchErrors && fetchErrors.length > 0) {
      setError(fetchErrors[0].message);
    } else {
      setBill(updatedBill);
    }

    resetModal();
  };

  const handleDeleteBill = async (billId: string) => {
    const { errors: fetchErrors } = await BillService.deleteOne(
      { billId },
      cookies.token
    );

    if (fetchErrors && fetchErrors[0].message === "Access unauthorized") {
      removeCookie("token");
      router.push("/auth/log-in");
    } else if (fetchErrors && fetchErrors.length > 0) {
      setError(fetchErrors[0].message);
    }

    router.push("/bills");
  };

  const handleCreatePayment = async (newPayment: Payment) => {
    const { errors: fetchErrors } = await PaymentService.create(
      newPayment,
      cookies.token
    );

    if (fetchErrors && fetchErrors[0].message === "Access unauthorized") {
      removeCookie("token");
      router.push("/auth/log-in");
    } else if (fetchErrors && fetchErrors.length > 0) {
      setError(fetchErrors[0].message);
    }

    setPayments([...payments, newPayment]);
  };

  useEffect(() => {
    const fetchBillData = async () => {
      const { data, errors } = await BillService.getOne(
        { billId: String(billId) },
        cookies.token
      );

      if (errors && errors[0]) {
        const errorMessage = errors[0].message;
        setError(errorMessage);
      } else if (data) {
        setBill(data);
      }
    };

    const fetchPaymentsData = async () => {
      const { data, errors } = await PaymentService.getList({}, cookies.token);

      if (errors && errors[0]) {
        const errorMessage = errors[0].message;
        setError(errorMessage);
      } else if (data) {
        setPayments(data);
      }
    };

    fetchPaymentsData().catch(() => setError("fetchPayments error"));
    fetchBillData().catch(() => setError("fetchBill error"));
  }, [billId, cookies]);

  return (
    <>
      <Box marginX="auto" marginTop="30pt" bg="white" width="50%" padding={2}>
        <Flex justifyContent="center" margin={3}>
          <Text>
            <b>Bill Details</b>
          </Text>
        </Flex>
        {bill && (
          <Flex marginY={3} marginX={5} fontSize={15}>
            <Flex width="35%" justifyContent="start">
              <Text>
                <b>Name:</b>
              </Text>
              <Text>{bill.name}</Text>
            </Flex>
            <Flex width="50%" justifyContent="start">
              <Text>
                <b>Description:</b>
              </Text>
              <Text>{bill.description}</Text>
            </Flex>
            <Flex width="15%" justifyContent="start">
              <Text>
                <b>Due Day:</b>
              </Text>
              <Text>{bill.dueDay}</Text>
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
              </Tr>
            </Thead>
            <Tbody>
              {payments.map((p) => (
                <Tr key={p.id}>
                  <Td>{format(new Date(p.referenceDate), "MM/yyyy")}</Td>
                  <Td>
                    {p.paidAt ? format(new Date(p.paidAt), "dd/MM/yyyy") : "--"}
                  </Td>
                  <Td>{p.value}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex justifyContent="end">
          <Button size="sm" marginX={3} marginBottom={3} onClick={() => {}}>
            <Icon as={FiPlusSquare} color="black" />
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default BillDetails;
