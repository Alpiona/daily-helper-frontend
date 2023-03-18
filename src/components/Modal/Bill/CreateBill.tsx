import { Bill } from "@/services/BillTypes";
import { Button, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

type CreateBillProps = {
  handleCreateBill: (newBill: Omit<Bill, "id">) => void;
};

const CreateBill: React.FC<CreateBillProps> = ({ handleCreateBill }) => {
  const [createBillForm, setCreateBillForm] = useState({
    name: "",
    description: "",
    dueDay: undefined,
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const [cookies, , removeCookie] = useCookies(["token"]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleCreateBill({
      name: createBillForm.name,
      description: createBillForm.description,
      dueDay: createBillForm.dueDay,
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateBillForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          required
          name="name"
          placeholder="name"
          type="text"
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
          name="description"
          placeholder="description"
          type="text"
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
          name="dueDay"
          placeholder="due day"
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

export default CreateBill;
