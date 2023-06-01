import { Payment } from "@/services/Payment/PaymentTypes";
import { Button, Input, Text, useToast } from "@chakra-ui/react";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

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
    paidAt: new Date().toISOString(),
    referenceDate: new Date().toISOString(),
  });
  const toast = useToast();
  const actualMonthYear = format(new Date(), "MM-yyyy");
  const t = useTranslations("modal.payment-create");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!createPaymentForm.paidAt) {
      toast({
        title: "Invalid data",
        description: "Field 'Paid At' is empty",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

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
        <Text fontSize={14} as="b">
          {t("paidAt-text")}
        </Text>
        <Input
          name="paidAt"
          placeholder={t("paidAt-placeholder")}
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
        <Text fontSize={14} as="b">
          {t("referenceMonth-text")}
        </Text>
        <Input
          required
          defaultValue={actualMonthYear}
          name="referenceDate"
          placeholder={t("referenceMonth-placeholder")}
          type="month"
          mb={2}
          onChange={onChange}
          pattern="[0-9]{2}-[0-9]{4}"
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
        <Text fontSize={14} as="b">
          {t("value-text")}
        </Text>
        <Input
          name="value"
          placeholder={t("value-placeholder")}
          defaultValue={0}
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
        <Button width="100%" height="36px" mt={2} mb={2} type="submit">
          {t("confirm-button")}
        </Button>
      </form>
    </>
  );
};

export default CreatePayment;
