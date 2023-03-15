import { BillService } from "@/services/BillService";
import { Bill } from "@/services/BillTypes";
import {
  Box,
  Button,
  Divider,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const BillDetails: React.FC = () => {
  const [bill, setBill] = useState<Bill>();
  // const [payments, setPayments] = useState<Payment[]>()
  const [error, setError] = useState("");
  const [cookies, , removeCookie] = useCookies(["token"]);
  const router = useRouter();
  const billId = router.query.id;

  useEffect(() => {
    const fetchData = async () => {
      console.log(billId);
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

    fetchData().catch(() => setError("Error unexpected, try again later"));
  }, [billId, cookies]);

  return (
    <>
      {/* <BillModal
        handleClose={() => setIsOpenModal(false)}
        isOpenState={isOpenModal}
        handleNewBill={onNewBill}
      /> */}
      <Box marginX="auto" marginTop="30pt" bg="white" width="50%">
        <Flex justifyContent="center" margin={3}>
          <Text>
            <b>Bill Details</b>
          </Text>
        </Flex>
        <Divider />
        {bill && (
          <Flex justifyContent="center" margin={3}>
            <Text>
              <b>Name:</b>
            </Text>
            <Text>{bill.name}</Text>
            <Text>
              <b>Description:</b>
            </Text>
            <Text>{bill.description}</Text>
            <Text>
              <b>Due Day:</b>
            </Text>
            <Text>{bill.due_day}</Text>
          </Flex>
        )}

        <Divider />
        <TableContainer margin={4} borderRadius={3}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Due Day</Th>
                <Th>Paid</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* {bills.map((b) => (
                <Tr key={b.name}>
                  <Td>{b.name}</Td>
                  <Td>{b.due_day}</Td>
                  <Td>
                    {b.paid_at
                      ? format(new Date(b.paid_at), "dd/MM/yyyy")
                      : "--"}
                  </Td>
                </Tr>
              ))} */}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex justifyContent="end">
          <Button marginX={3} marginBottom={3} onClick={() => {}}>
            +
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default BillDetails;
