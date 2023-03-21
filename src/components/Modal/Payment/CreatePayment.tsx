import { Payment } from "@/services/PaymentTypes";
import { Button, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

type CreatePaymentProps = {
  handleCreatePayment: (newPayment: Omit<Payment, "id">) => void;
  billId: string;
};

const CreatePayment: React.FC<CreatePaymentProps> = ({
  handleCreatePayment,
  billId,
}) => {
  const [createPaymentForm, setCreatePaymentForm] = useState<
    Omit<Payment, "id" | "billId">
  >({
    referenceDate: new Date(),
  });
  const [error, setError] = useState("");
  const [cookies, , removeCookie] = useCookies(["token"]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleCreatePayment({
      billId,
      value: createPaymentForm.value,
      referenceDate: createPaymentForm.referenceDate,
      paidAt: createPaymentForm.paidAt,
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreatePaymentForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          required
          name="paidAt"
          placeholder="paid at"
          type="date"
          mb={2}
          onChange={onChange}
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          bg="gray.50"
        />
        <Input
          required
          name="referenceDate"
          placeholder="reference date"
          type="date"
          mb={2}
          onChange={onChange}
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          bg="gray.50"
        />
        <Input
          name="value"
          placeholder="value"
          type="number"
          min="1"
          max="31"
          mb={2}
          onChange={onChange}
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          bg="gray.50"
        />
        <Text textAlign="center" color="red" fontSize="10pt">
          {error}
        </Text>
        <Button width="100%" height="36px" mt={2} mb={2} type="submit">
          Create Bill
        </Button>
      </form>
    </>
  );
};

export default CreatePayment;
