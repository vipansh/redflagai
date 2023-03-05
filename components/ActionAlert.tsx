import Modal from "./Modal";

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
