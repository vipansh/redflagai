import React from "react";
import Modal from "./Modal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      FeedbackModal
    </Modal>
  );
};

export default FeedbackModal;
