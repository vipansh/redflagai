import React from "react";
import Stripe from "stripe";
import { ActionAlert, BuyTokenModal } from "../../components";

type Props = {
  showAlertId: string;
  closeAlert: () => void;
  products?: Stripe.Price[];
};

const AllPopUps = ({ showAlertId, closeAlert, products }: Props) => {
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
      <BuyTokenModal
        isOpen={showAlertId === "buyTokenModal"}
        onClose={closeAlert}
        products={products}
      />
    </>
  );
};

export default AllPopUps;
