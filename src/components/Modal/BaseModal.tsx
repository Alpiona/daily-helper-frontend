import { modalState } from "@/atoms/modalAtom";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import CreateBill from "./Bill/CreateBill";
import EditBill from "./Bill/EditBill";
import CreatePayment from "./Payment/CreatePayment";
import DeletePayment from "./Payment/DeletePayment";
import EditPayment from "./Payment/EditPayment";

const BaseModal: React.FC = () => {
  const [modal] = useRecoilState(modalState);
  const resetModal = useResetRecoilState(modalState);
  const t = useTranslations("modal");

  const handleClose = () => {
    resetModal();
  };

  return (
    <>
      <Modal isOpen={modal.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {modal.view === "createBill" && t("bill-create.title")}
            {modal.view === "editBill" && t("bill-edit.title")}
            {modal.view === "createPayment" && t("payment-create.title")}
            {modal.view === "editPayment" && t("payment-edit.title")}
            {modal.view === "deletePayment" && t("payment-delete.title")}
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
              {modal.view === "createBill" && (
                <CreateBill handleCreateBill={modal.handleAction} />
              )}
              {modal.view === "editBill" && (
                <EditBill
                  handleEditBill={modal.handleAction}
                  data={modal.data}
                />
              )}
              {modal.view === "createPayment" && (
                <CreatePayment
                  handleCreatePayment={modal.handleAction}
                  data={modal.data}
                />
              )}
              {modal.view === "editPayment" && (
                <EditPayment
                  handleEditPayment={modal.handleAction}
                  data={modal.data}
                />
              )}
              {modal.view === "deletePayment" && (
                <DeletePayment
                  handleDeletePayment={modal.handleAction}
                  data={modal.data}
                />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BaseModal;
