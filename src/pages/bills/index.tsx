import { tokenState } from "@/atoms/tokenAtom";
import BillModal from "@/components/Modal/Bill/BillModal";
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
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";

const BillsPage: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [bills, setBills] = useState<Bill[]>([]);
  const [, setToken] = useRecoilState(tokenState);
  const [cookies, , removeCookie] = useCookies(["token"]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, errors } = await BillService.getList(
        { orderBy: undefined, orderByDirection: undefined },
        cookies.token
      );

      if (errors && errors[0]) {
        const errorMessage = errors[0].message;
        setError(errorMessage);
      } else if (data) {
        setBills(data);
      }
    };

    fetchData().catch(() => setError("Error unexpected, try again later"));
  }, [cookies.token]);

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
                  <Td>{b.due_day}</Td>
                  <Td>
                    {b.paid_at
                      ? format(new Date(b.paid_at), "dd/MM/yyyy")
                      : "--"}
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
