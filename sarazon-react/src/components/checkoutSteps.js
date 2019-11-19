import React from "react";
import { Steps } from "primereact/steps";

const Checkout = ({activeIndex}) => {
	
  const stepItems = [
    { label: "Address" },
    { label: "Payment" },
    { label: "Confirmation" }
  ];

  return (
        <Steps model={stepItems} activeIndex={activeIndex} />
  );
};

export default Checkout;
