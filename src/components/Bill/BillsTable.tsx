import { Bill } from "@/services/Bill/BillTypes";
import {
  Center,
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
import { useTranslations } from "next-intl";
import { default as NextLink } from "next/link";
import React from "react";
import { FiCheck, FiClock, FiX } from "react-icons/fi";

type BillsTableProps = {
  bills: Bill[];
};

const BillsTable: React.FC<BillsTableProps> = ({ bills }) => {
  const t = useTranslations("component.bill.billsTable");

  const renderPaidRow = (dueDay: number, paid: boolean) => {
    const today = new Date().getDate();
    const type = paid ? "success" : today <= dueDay ? "warning" : "problem";

    switch (type) {
      case "success":
        return (
          <Flex alignItems="center">
            <Center bg="green.100" borderRadius="md" w={10} marginX="auto">
              <Icon as={FiCheck} boxSize={4} color="green" mx="auto" />
            </Center>
          </Flex>
        );

      case "warning":
        return (
          <Flex alignItems="center">
            <Center bg="yellow.100" borderRadius="md" w={10} marginX="auto">
              <Icon as={FiClock} boxSize={4} color="yellow.300" mx="auto" />
            </Center>
          </Flex>
        );

      case "problem":
        return (
          <Flex alignItems="center">
            <Center bg="red.100" borderRadius="md" w={10} marginX="auto">
              <Icon as={FiX} boxSize={4} color="red" mx="auto" />
            </Center>
          </Flex>
        );
    }
  };

  return (
    <TableContainer margin={4} borderRadius={3}>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th width="50%">{t("table.name")}</Th>
            <Th width="25%" textAlign="center">
              {t("table.dueDay")}
            </Th>
            <Th width="25%" textAlign="center">
              {t("table.paid")}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {bills.map((b) => (
            <Tr key={b.id}>
              <Td>
                <Text as={NextLink} href={`/bills/${b.id}`}>
                  {b.name}
                </Text>
              </Td>
              <Td textAlign="center">
                {b.dueDay > 9 ? b.dueDay : `0${b.dueDay}`}
              </Td>
              <Td textAlign="center">{renderPaidRow(b.dueDay, b.monthPaid)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default BillsTable;
