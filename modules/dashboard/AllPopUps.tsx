import React from "react";
import { ActionAlert } from "../../components";

type Props = {
  showAlertId: string;
  closeAlert: () => void;
};

const AllPopUps = ({ showAlertId, closeAlert }: Props) => {
  return (
    <>
      <ActionAlert
        open={showAlertId === "confirm"}
        onClose={closeAlert}
        secondaryButtonAction={closeAlert}
        primaryAction={() => {}}
        para="Are you sure you want to confirm your booking? "
        primaryButtonText="Confirm"
        heading="Booking confirmation"
      />
    </>
  );
};

export default AllPopUps;
