import React from "react";
import Modal from "./Modal";
import { PricingTabel } from ".";
import { Product } from "../types/paddle";

interface BuyTokenModalProps {
  products?: Product[];
  isOpen: boolean;
  onClose: () => void;
  heading?: string;
}

const BuyTokenModal: React.FC<BuyTokenModalProps> = ({
  products,
  isOpen,
  onClose,
  heading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <PricingTabel onClose={onClose} products={products} heading={heading} />
    </Modal>
  );
};

export default BuyTokenModal;
