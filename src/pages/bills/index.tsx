import { billModalState } from "@/atoms/billModalAtom";
import BillModal from "@/components/Modal/Bill/BillModal";
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
import { format } from "date-fns";
import { default as NextLink } from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";

const BillsPage: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(billModalState);
  const [error, setError] = useState("");
  const router = useRouter();
  const [bills, setBills] = useState<Bill[]>([]);
  const [cookies, , removeCookie] = useCookies(["token"]);

  const handleCreateBill = async (newBill: Omit<Bill, "id">) => {
    const {
      data,
      errors: fetchErrors,
      status,
    } = await BillService.create(newBill, cookies.token);
    if (status === 401) {
      removeCookie("token");
      router.push("/auth/log-in");
    } else if (fetchErrors && fetchErrors.length > 0) {
      setError(fetchErrors[0].message);
    } else {
      setBills([...bills, { ...newBill, id: data.id }]);
      setModalState((prev) => ({ ...prev, open: false }));
    }
  };

  const handleEditBill = (editedBill: Bill) => {
    const billIndex = bills.findIndex((b) => b.id === editedBill.id);
    bills[billIndex] = editedBill;
    setBills(bills);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, errors, status } = await BillService.getList(
        { orderBy: undefined, orderByDirection: undefined },
        cookies.token
      );

      if (errors && errors[0]) {
        const errorMessage = errors[0].message;
        setError(errorMessage);
      } else if (data) {
        setBills(data);
      }

      if (status === 401) {
        removeCookie("token");
        router.push("/auth/log-in");
      }
    };

    fetchData().catch(() => setError("Error unexpected, try again later"));
  }, [cookies.token, removeCookie, router]);

  return (
    <>
      <BillModal
        handleCreateBill={handleCreateBill}
        handleEditBill={handleEditBill}
      />
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
                  <Td>
                    {b.paidAt ? format(new Date(b.paidAt), "dd/MM/yyyy") : "--"}
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
              setModalState((prev) => ({
                ...prev,
                open: true,
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
