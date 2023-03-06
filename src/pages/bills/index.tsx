import BillModal from "@/components/Modal/Bill/BillModal";
import {
  Box,
  Button,
  Divider,
  Flex,
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

type Bill = {
  name: string;
  dueDay: number;
  paidAt?: Date;
};

const billsListExample: Bill[] = [
  { name: "CESAN", dueDay: 5, paidAt: undefined },
  { name: "EDP", dueDay: 8, paidAt: new Date() },
  { name: "Aluguel", dueDay: 2, paidAt: undefined },
];

const BillsPage: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  useEffect(() => {
    setBills(billsListExample);
  }, []);

  return (
    <>
      <BillModal
        handleClose={() => setIsOpenModal(false)}
        isOpenState={isOpenModal}
      />
      <Box marginX="auto" marginTop="30pt" bg="white" width="50%">
        <Flex justifyContent="center" margin={3}>
          <Text>
            <b>Bills Control</b>
          </Text>
        </Flex>
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
              {bills.map((b) => (
                <Tr key={b.name}>
                  <Td>{b.name}</Td>
                  <Td>{b.dueDay}</Td>
                  <Td>{b.paidAt ? format(b.paidAt, "dd/MM/yyyy") : "--"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex justifyContent="end">
          <Button
            marginX={3}
            marginBottom={3}
            onClick={() => setIsOpenModal(true)}
          >
            +
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default BillsPage;
