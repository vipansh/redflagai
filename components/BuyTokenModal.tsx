import React, { useState } from "react";
import axios from "axios";
import Stripe from "stripe";
import Modal from "./Modal";
import { PricingTabel } from ".";

interface BuyTokenModalProps {
  products?: Stripe.Price[];
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
