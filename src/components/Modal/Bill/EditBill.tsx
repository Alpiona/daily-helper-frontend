import { Bill } from "@/services/BillTypes";
import { Button, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";

type EditBillProps = {
  data: Bill;
  handleEditBill: (bill: Bill) => void;
};

const EditBill: React.FC<EditBillProps> = ({ data, handleEditBill }) => {
  const [editBillForm, setEditBillForm] = useState({
    name: data.name,
    description: data.description,
    dueDay: data.dueDay,
  });
  const [error, setError] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleEditBill({
      id: data.id,
      name: editBillForm.name,
      description: editBillForm.description,
      dueDay: editBillForm.dueDay,
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditBillForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <Input
          required
          name="name"
          placeholder="name"
          type="text"
          defaultValue={data.name}
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
          defaultValue={data.description}
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
          defaultValue={data.dueDay}
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
          Edit Bill
        </Button>
      </form>
    </>
  );
};

export default EditBill;
