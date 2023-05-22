import { Payment } from "@/services/Payment/PaymentTypes";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

type EditPaymentProps = {
  handleEditPayment: (updatedPayment: Payment) => void;
  data: Payment;
};

const EditPayment: React.FC<EditPaymentProps> = ({
  handleEditPayment,
  data,
}) => {
  const [editPaymentForm, setEditPaymentForm] = useState<Payment>(data);
  const t = useTranslations("payment-edit");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleEditPayment(editPaymentForm);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditPaymentForm((prev) => ({
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
              <b>{t("paidAt-text")}</b>
            </Text>
          </InputLeftAddon>
          <Input
            name="paidAt"
            placeholder={t("paidAt-placeholder")}
            type="date"
            defaultValue={data.paidAt}
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
              <b>{t("referenceMonth-text")}</b>
            </Text>
          </InputLeftAddon>
          <Input
            required
            defaultValue={format(new Date(data.referenceDate), "yyyy-MM")}
            name="referenceDate"
            placeholder={t("referenceMonth-placeholder")}
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
          placeholder={t("value-placeholder")}
          type="number"
          min="0.00"
          max="10000.00"
          step="0.01"
          mb={2}
          onChange={onChange}
          defaultValue={data.value}
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
        <Button width="100%" height="36px" mt={2} mb={2} type="submit">
          {t("confirm-button")}
        </Button>
      </form>
    </>
  );
};

export default EditPayment;
