import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import CheckoutSteps from "./checkoutSteps";

const CheckoutAddress = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [showNewAddressInputs, setShowNewAddressInputs] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setAddresses(["address1", "address2", "address3"]);
  }, []);

  const footer = (
    <Link
      className="p-col-12"
      to={{
        pathname: selectedAddress ? "/checkout-payment" : "/checkout-address",
        state: { address: selectedAddress }
      }}
    >
      <Button
        label="Deliver to this address"
        onClick={() => {
          if (!selectedAddress) setError(true);
        }}
      />
    </Link>
  );

  const handleAddNewAddress = () => {
    // call server to add new address
    const allAddresses = [...addresses, newAddress];
    setAddresses(allAddresses);
  };

  const handleShowNewAddressInput = () => setShowNewAddressInputs(true);

  const handleCancelNewAddress = () => {
    setNewAddress("");
    setShowNewAddressInputs(false);
  };

  const handleSelectAddress = ({ target }) => setSelectedAddress(target.value);

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
            onClick={handleCancelNewAddress}
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
        onChange={handleSelectAddress}
        checked={selectedAddress === value}
      />
      <label htmlFor={value} className="p-radiobutton-label">
        {value}
      </label>
    </div>
  );

  return (
    <div className="p-grid p-justify-center">
      <div className="p-col-12 p-md-10 p-lg-8">
        <CheckoutSteps />
        <div className="p-col-12">Select delivery address</div>
        <Card footer={footer} className="p-col-12">
          {error && (
            <Message
              severity="error"
              text={"Select one address to continue checkout process"}
            ></Message>
          )}
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
    </div>
  );
};

export default CheckoutAddress;
