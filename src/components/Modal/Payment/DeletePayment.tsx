import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React from "react";
import { FiCheck } from "react-icons/fi";

type DeletePaymentProps = {
  handleDeletePayment: (paymentId: string) => void;
  data: { paymentId: string };
};

const DeletePayment: React.FC<DeletePaymentProps> = ({
  handleDeletePayment,
  data: { paymentId },
}) => {
  const t = useTranslations("modal.payment-delete");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleDeletePayment(paymentId);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Text textAlign="center" width="100%" fontSize="lg">
          Deleting the bill will also delete all payments on it, and it will not
          be possible to recover the data. Do you still want to delete?
        </Text>
        <Flex align="center" justify="center">
          <Button mt={6} type="submit" backgroundColor="green.100">
            <Icon as={FiCheck} mx={10} color="black" />
          </Button>
        </Flex>
      </form>
    </>
  );
};
export default DeletePayment;
