import { billModalState } from "@/atoms/billModalAtom";
import { Bill } from "@/services/BillTypes";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import CreateBill from "./CreateBill";

type BillModalProps = {
  handleCreateBill: (newBill: Omit<Bill, "id">) => void;
  handleEditBill: (bill: Bill) => void;
};

const BillModal: React.FC<BillModalProps> = ({
  handleCreateBill,
  handleEditBill,
}) => {
  const [modalState, setModalState] = useRecoilState(billModalState);

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {modalState.view === "createBill" && "Create Bill"}
            {modalState.view === "editBill" && "Edit Bill"}
          </ModalHeader>
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
              {modalState.view === "createBill" && (
                <CreateBill handleCreateBill={handleCreateBill} />
              )}
              {/* {modalState.view === "editBill" && <EditBill />} */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BillModal;
