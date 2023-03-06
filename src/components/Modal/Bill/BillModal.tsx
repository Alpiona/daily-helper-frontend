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

type BillModalProps = {
  handleClose: () => void;
  isOpenState: boolean;
};

const BillModal: React.FC<BillModalProps> = ({ handleClose, isOpenState }) => {
  return (
    <>
      <Modal isOpen={isOpenState} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">New Bill</ModalHeader>
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
            ></Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BillModal;
