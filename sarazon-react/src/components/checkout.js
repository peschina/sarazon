import React, { useState, useEffect } from "react";
import { Steps } from "primereact/steps";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";

const Checkout = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [showNewAddressInputs, setShowNewAddressInputs] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
    "Paypal",
    "Credit card"
  ]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    setAddresses(["address1", "address2", "address3"]);
  }, []);

  const stepItems = [
    { label: "Address" },
    { label: "Payment" },
    { label: "Confirmation" }
  ];

  const handleSaveChoice = () => setActiveIndex(activeIndex + 1);

  const footer = (
    <div className="p-col-12">
      <Button label="Deliver to this address" onClick={handleSaveChoice} />
    </div>
  );

  const paymentFooter = (
    <div className="p-col-12">
      <Button label="Choose this payment method" onClick={handleSaveChoice} />
    </div>
  );

  const confirmationFooter = (
    <div className="p-col-12">
      <Button label="Pay and confirm order" onClick={handleSaveChoice} />
    </div>
  );

  const handleAddNewAddress = () => {
    // call server to add new address
    const allAddresses = [...addresses, newAddress];
    setAddresses(allAddresses);
  };

  const handleShowNewAddressInput = () => setShowNewAddressInputs(true);

  const newAddressInputs = () => {
    const visible = showNewAddressInputs ? "" : "none";
    return (
      <div style={{ display: visible }}>
        <InputText
          value={newAddress}
          className="p-col-12"
          onChange={e => setNewAddress(e.target.value)}
        />
        <div className="p-col-12">
          <Button
            label="Save"
            icon="pi pi-check"
            onClick={handleAddNewAddress}
            style={{ marginRight: ".25em" }}
          />
          <Button
            label="Cancel"
            icon="pi pi-times"
            className="p-button-secondary"
          />
        </div>
      </div>
    );
  };

  const renderAddressRadioButton = value => (
    <div className="p-col-12" key={value}>
      <RadioButton
        id={value}
        value={value}
        name="selectedAddress"
        onChange={e => setSelectedAddress(e.target.value)}
        checked={selectedAddress === value}
      />
      <label htmlFor={value} className="p-radiobutton-label">
        {value}
      </label>
    </div>
  );

  const renderPaymentRadioButton = value => (
    <div className="p-col-12" key={value}>
      <RadioButton
        id={value}
        value={value}
        name="selectedPayment"
        onChange={e => setSelectedPayment(e.target.value)}
        checked={selectedPayment === value}
      />
      <label htmlFor={value} className="p-radiobutton-label">
        {value}
      </label>
    </div>
  );

  return (
    <div className="p-grid p-justify-center">
      <div className="p-col-12 p-md-10 p-lg-8">
        <Steps model={stepItems} activeIndex={activeIndex} />
        <div className={activeIndex === 0 ? "p-col-12" : "hidden"}>
          <div className="p-col-12">Select delivery address</div>
          <Card footer={footer} className="p-col-12">
            <ul className="p-col-12">
              {addresses.map(a => renderAddressRadioButton(a))}
            </ul>
            <hr></hr>
            <div className="p-col-12" onClick={handleShowNewAddressInput}>
              <i className="pi pi-plus"></i>Add new address
            </div>
            {newAddressInputs()}
          </Card>
        </div>

        <div className={activeIndex === 1 ? "p-col-12" : "hidden"}>
          <div className="p-col-12">Choose payment method</div>
          <Card footer={paymentFooter} className="p-col-12">
            <ul className="p-col-12">
              {paymentMethods.map(i => renderPaymentRadioButton(i))}
            </ul>
          </Card>
        </div>

        <div className={activeIndex === 2 ? "p-col-12" : "hidden"}>
          <div className="p-col-12">Order recap</div>
          <Card footer={confirmationFooter} className="p-col-12">
            <div>display products in cart and total amount</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
