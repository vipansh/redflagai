import React from "react";
import Stripe from "stripe";
import { ActionAlert, BuyTokenModal } from "../../components";

type Props = {
  showAlertId: string;
  closeAlert: () => void;
  products?: Stripe.Price[];
  extraData?: any;
  generateBio: () => Promise<void>;
};

const AllPopUps = ({
  showAlertId,
  closeAlert,
  products,
  extraData,
  generateBio,
}: Props) => {
  return (
    <>
      <ActionAlert
        open={showAlertId === "confirm"}
        onClose={closeAlert}
        secondaryButtonAction={closeAlert}
        primaryAction={generateBio}
        para={`Your this order will required ${extraData?.token} tokens. Do you wish to proceed`}
        primaryButtonText="Confirm"
        heading="Order confirmation"
      />
      <BuyTokenModal
        isOpen={showAlertId === "buyTokenModal"}
        onClose={closeAlert}
        products={products}
        heading={extraData?.heading}
      />
    </>
  );
};

export default AllPopUps;
