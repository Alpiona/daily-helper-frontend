import { modalState } from "@/atoms/modalAtom";
import { BillService } from "@/services/Bill/BillService";
import { Bill } from "@/services/Bill/BillTypes";
import {
  Button,
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
import { default as NextLink } from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FiCheck, FiClock, FiX } from "react-icons/fi";
import { useRecoilState, useResetRecoilState } from "recoil";

const BillsPage: React.FC = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const resetModal = useResetRecoilState(modalState);
  const router = useRouter();
  const [bills, setBills] = useState<Bill[]>([]);
  const [cookies, , removeCookie] = useCookies(["token"]);

  const handleCreateBill = async (newBill: Omit<Bill, "id">) => {
    const { data, errors: fetchErrors } = await BillService.create(
      newBill,
      cookies.token
    );
    if (fetchErrors && fetchErrors[0]) {
    } else {
      setBills([...bills, { ...newBill, id: data.id }]);
    }

    resetModal();
  };

  const renderPaidRow = (dueDay: number, paid: boolean) => {
    const today = new Date().getDay();
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

  useEffect(() => {
    const fetchData = async () => {
      const { data, errors } = await BillService.getList(
        { orderBy: undefined, orderByDirection: undefined },
        cookies.token
      );

      if (errors && errors[0]) {
      } else if (data) {
        setBills(data);
      }
    };
    fetchData().catch(() => {});
  }, [cookies.token]);

  return (
    <>
      <Flex justifyContent="center" margin={3}>
        <Text>
          <b>Bills Control</b>
        </Text>
      </Flex>
      <TableContainer margin={4} borderRadius={3}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th width="50%">Name</Th>
              <Th width="25%" textAlign="center">
                Due Day
              </Th>
              <Th width="25%" textAlign="center">
                Paid
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
                <Td textAlign="center">
                  {renderPaidRow(b.dueDay, b.monthPaid)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
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
