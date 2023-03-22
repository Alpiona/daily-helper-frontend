import { modalState } from "@/atoms/modalAtom";
import { BillService } from "@/services/BillService";
import { Bill } from "@/services/BillTypes";
import {
  Box,
  Button,
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
import { default as NextLink } from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRecoilState, useResetRecoilState } from "recoil";

const BillsPage: React.FC = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const resetModal = useResetRecoilState(modalState);
  const [error, setError] = useState("");
  const router = useRouter();
  const [bills, setBills] = useState<Bill[]>([]);
  const [cookies, , removeCookie] = useCookies(["token"]);

  const handleCreateBill = async (newBill: Omit<Bill, "id">) => {
    const { data, errors: fetchErrors } = await BillService.create(
      newBill,
      cookies.token
    );
    if (fetchErrors && fetchErrors[0].message === "Access unauthorized") {
      removeCookie("token");
      router.push("/auth/log-in");
    } else if (fetchErrors && fetchErrors.length > 0) {
      setError(fetchErrors[0].message);
    } else {
      setBills([...bills, { ...newBill, id: data.id }]);
    }

    resetModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, errors: fetchErrors } = await BillService.getList(
        { orderBy: undefined, orderByDirection: undefined },
        cookies.token
      );

      if (fetchErrors && fetchErrors[0]) {
        const errorMessage = fetchErrors[0].message;
        setError(errorMessage);
      } else if (data) {
        setBills(data);
      }

      if (fetchErrors && fetchErrors[0].message === "Access unauthorized") {
        removeCookie("token");
        router.push("/auth/log-in");
      }
    };

    fetchData().catch(() => setError("Error unexpected, try again later"));
  }, [cookies.token, removeCookie, router]);

  return (
    <>
      <Box marginX="auto" marginTop="30pt" bg="white" width="50%">
        <Flex justifyContent="center" margin={3}>
          <Text>
            <b>Bills Control</b>
          </Text>
        </Flex>
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
                <Tr key={b.id}>
                  <Td>
                    <Text as={NextLink} href={`/bills/${b.id}`}>
                      {b.name}
                    </Text>
                  </Td>
                  <Td>{b.dueDay}</Td>
                  <Td>{b.monthPaid}</Td>
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
      </Box>
    </>
  );
};

export default BillsPage;
