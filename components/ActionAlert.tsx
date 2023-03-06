import { CrossSvg } from "../svgs";
import Modal from "./Modal";
import { motion } from "framer-motion";

interface ActionAlertProps {
  open: boolean;
  primaryAction?: () => void;
  onClose: () => void;
  para?: string;
  heading?: string;
  secondaryButtonText?: string;
  primaryButtonText?: string;
  secondaryButtonAction?: () => void;
}

const ActionAlert = ({
  open,
  primaryAction,
  onClose,
  para,
  heading,
  secondaryButtonText,
  primaryButtonText,
  secondaryButtonAction,
}: ActionAlertProps) => {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <motion.div
        className="absolute cursor-pointer -top-1 -right-1 rounded-full border border-gray-300 bg-gray-100 p-1 "
        onClick={onClose}
        tabIndex={0}
        initial={{ top: 40, opacity: 0 }}
        animate={{ top: -50, opacity: 1 }}
        exit={{ top: 40, opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <CrossSvg />
      </motion.div>
      <h2 className="text-lg font-bold">{heading}</h2>
      <p className="mt-2 text-sm text-gray-500">{para}</p>
      <div className="mt-4 flex gap-2 justify-end">
        {secondaryButtonAction && (
          <button
            type="button"
            className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
            onClick={secondaryButtonAction}
          >
            {secondaryButtonText || "  No, go back"}
          </button>
        )}
        {primaryAction && (
          <button
            type="button"
            className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
            onClick={primaryAction}
          >
            {primaryButtonText || " Yes, I'm sure"}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default ActionAlert;
