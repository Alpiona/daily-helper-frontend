import { Payment } from "@/services/PaymentTypes";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

type CreatePaymentProps = {
  handleCreatePayment: (newPayment: Omit<Payment, "id">) => void;
  data: { billId: string };
};

const CreatePayment: React.FC<CreatePaymentProps> = ({
  handleCreatePayment,
  data: { billId },
}) => {
  const [createPaymentForm, setCreatePaymentForm] = useState<
    Omit<Payment, "id" | "billId">
  >({
    referenceDate: new Date().toISOString(),
  });
  const [error, setError] = useState("");
  const [cookies, , removeCookie] = useCookies(["token"]);

  const actualMonthYear = format(new Date(), "yyyy-MM");

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
        <InputGroup>
          <InputLeftAddon>
            <Text fontSize={15}>
              <b>Paid At</b>
            </Text>
          </InputLeftAddon>
          <Input
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
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>
            <Text fontSize={15}>
              <b>Reference Month</b>
            </Text>
          </InputLeftAddon>
          <Input
            required
            defaultValue={actualMonthYear}
            name="referenceDate"
            placeholder="reference date"
            type="month"
            mb={2}
            onChange={onChange}
            pattern="[0-9]{4}-[0-9]{2}"
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
        </InputGroup>
        <Input
          name="value"
          placeholder="value"
          type="number"
          min="0.00"
          max="10000.00"
          step="0.01"
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
          Create Payment
        </Button>
      </form>
    </>
  );
};

export default CreatePayment;
