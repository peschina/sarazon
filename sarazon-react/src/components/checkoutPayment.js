import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import CheckoutSteps from "./checkoutSteps";

const CheckoutPayment = (props) => {
  const [showNewPaymentInputs, setShowNewPaymentInputs] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newPaymentMethod, setNewPaymentMethod] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
	
	useEffect(() => {
    setPaymentMethods(["Paypal", "Credit card"]);
  }, []);

  const footer = (
    <Link className="p-col-12" to={{
		pathname: 'checkout-confirmation',
		state: {
			address: props.location.state.address,
			paymentMethod: selectedPayment
		}
	}}>
      <Button label="Choose this payment method" />
    </Link>
  );

  const handleAddNewPayment = () => {
    // call server to add new address
    const allPaymentMethods = [...paymentMethods, newPaymentMethod];
    setPaymentMethods(allPaymentMethods);
  };

  const handleShowNewPaymentInput = () => setShowNewPaymentInputs(true);
 
  const handleCancelNewAddress = () => {
	setNewPaymentMethod('');
	setShowNewPaymentInputs(false);
  }
  

  const newPaymentInputs = () => {
    const visible = showNewPaymentInputs ? "" : "none";
    return (
      <div style={{ display: visible }}>
        <InputText
          value={newPaymentMethod}
          className="p-col-12"
          onChange={e => setNewPaymentMethod(e.target.value)}
        />
        <div className="p-col-12">
          <Button
            label="Save"
            icon="pi pi-check"
            onClick={handleAddNewPayment}
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
        <CheckoutSteps activeIndex={1} />
          <div className="p-col-12">Choose payment method</div>
          <Card footer={footer} className="p-col-12">
            <ul className="p-col-12">
              {paymentMethods.map(i => renderPaymentRadioButton(i))}
            </ul>
            <hr></hr>
            <div className="p-col-12" onClick={handleShowNewPaymentInput}>
              <i className="pi pi-plus"></i>Add new payment method
            </div>
            {newPaymentInputs()}
          </Card>
      </div>
    </div>
  );
};

export default CheckoutPayment;
