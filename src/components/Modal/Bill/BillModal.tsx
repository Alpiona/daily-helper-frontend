import { BillService } from "@/services/BillService";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

type BillModalProps = {
  handleClose: () => void;
  isOpenState: boolean;
};

const BillModal: React.FC<BillModalProps> = ({ handleClose, isOpenState }) => {
  const [createBillForm, setCreateBillForm] = useState({
    name: "",
    description: "",
    dueDay: undefined,
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await BillService.create(
        {
          name: createBillForm.name,
          description: createBillForm.description,
          dueDay: createBillForm.dueDay,
        },
        cookies.token
      );

      console.log(response);

      if (response.errors) {
        if (response.errors[0].message === "Access unauthorized") {
          removeCookie("token");
          router.push("/auth/log-in");
        } else {
          setError(response.errors[0].message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateBillForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <Modal isOpen={isOpenState} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Add a new bill</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={6}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="70%"
            >
              <form onSubmit={onSubmit} style={{ width: "100%" }}>
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
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BillModal;
