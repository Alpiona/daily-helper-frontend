import BillModal from "@/components/Modal/Bill/BillModal";
import { BillService } from "@/services/BillService";
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
import { GetServerSideProps } from "next";
import { useState } from "react";

type Bill = {
  name: string;
  due_day: number;
  paidAt?: Date;
};

interface Props {
  bills: Bill[];
}

const BillsPage: React.FC<Props> = ({ bills = [] }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["token"];

  const res = await BillService.getList({}, token!);

  console.log(res);

  if (res.status === 401) {
    context.res.setHeader(
      "Set-Cookie",
      "token=delete; Max-Age=0; HttpOnly=true; SameSite=Lax"
    );
  }

  return {
    props: { bills: res.data }, // will be passed to the page component as props
  };
};

export default BillsPage;
